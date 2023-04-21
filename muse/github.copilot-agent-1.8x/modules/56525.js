Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.ReadableStreamMessageReader =
  exports.AbstractMessageReader =
  exports.MessageReader =
    undefined;
const n = require(30147);
const i = require(67574);
const o = require(27135);
var s;
(exports.MessageReader || (exports.MessageReader = {})).is = function (e) {
  let t = e;
  return (
    t &&
    i.func(t.listen) &&
    i.func(t.dispose) &&
    i.func(t.onError) &&
    i.func(t.onClose) &&
    i.func(t.onPartialMessage)
  );
};
class AbstractMessageReader {
  constructor() {
    this.errorEmitter = new o.Emitter();
    this.closeEmitter = new o.Emitter();
    this.partialMessageEmitter = new o.Emitter();
  }
  dispose() {
    this.errorEmitter.dispose();
    this.closeEmitter.dispose();
  }
  get onError() {
    return this.errorEmitter.event;
  }
  fireError(e) {
    this.errorEmitter.fire(this.asError(e));
  }
  get onClose() {
    return this.closeEmitter.event;
  }
  fireClose() {
    this.closeEmitter.fire(undefined);
  }
  get onPartialMessage() {
    return this.partialMessageEmitter.event;
  }
  firePartialMessage(e) {
    this.partialMessageEmitter.fire(e);
  }
  asError(e) {
    return e instanceof Error
      ? e
      : new Error(
          `Reader received error. Reason: ${
            i.string(e.message) ? e.message : "unknown"
          }`
        );
  }
}
exports.AbstractMessageReader = AbstractMessageReader;
(function (e) {
  e.fromOptions = function (e) {
    var t;
    let r;
    let i;
    const o = new Map();
    let s;
    const a = new Map();
    if (undefined === e || "string" == typeof e) r = null != e ? e : "utf-8";
    else {
      r = null !== (t = e.charset) && undefined !== t ? t : "utf-8";
      if (undefined !== e.contentDecoder) {
        i = e.contentDecoder;
        o.set(i.name, i);
      }
      if (void 0 !== e.contentDecoders)
        for (const t of e.contentDecoders) o.set(t.name, t);
      if (undefined !== e.contentTypeDecoder) {
        s = e.contentTypeDecoder;
        a.set(s.name, s);
      }
      if (void 0 !== e.contentTypeDecoders)
        for (const t of e.contentTypeDecoders) a.set(t.name, t);
    }
    if (undefined === s) {
      s = n.default().applicationJson.decoder;
      a.set(s.name, s);
    }
    return {
      charset: r,
      contentDecoder: i,
      contentDecoders: o,
      contentTypeDecoder: s,
      contentTypeDecoders: a,
    };
  };
})(s || (s = {}));
exports.ReadableStreamMessageReader = class extends AbstractMessageReader {
  constructor(e, t) {
    super();
    this.readable = e;
    this.options = s.fromOptions(t);
    this.buffer = n.default().messageBuffer.create(this.options.charset);
    this._partialMessageTimeout = 1e4;
    this.nextMessageLength = -1;
    this.messageToken = 0;
  }
  set partialMessageTimeout(e) {
    this._partialMessageTimeout = e;
  }
  get partialMessageTimeout() {
    return this._partialMessageTimeout;
  }
  listen(e) {
    this.nextMessageLength = -1;
    this.messageToken = 0;
    this.partialMessageTimer = undefined;
    this.callback = e;
    const t = this.readable.onData((e) => {
      this.onData(e);
    });
    this.readable.onError((e) => this.fireError(e));
    this.readable.onClose(() => this.fireClose());
    return t;
  }
  onData(e) {
    for (this.buffer.append(e); ; ) {
      if (-1 === this.nextMessageLength) {
        const e = this.buffer.tryReadHeaders();
        if (!e) return;
        const t = e.get("Content-Length");
        if (!t)
          throw new Error("Header must provide a Content-Length property.");
        const r = parseInt(t);
        if (isNaN(r)) throw new Error("Content-Length value must be a number.");
        this.nextMessageLength = r;
      }
      const e = this.buffer.tryReadBody(this.nextMessageLength);
      if (undefined === e) return void this.setPartialMessageTimer();
      let t;
      this.clearPartialMessageTimer();
      this.nextMessageLength = -1;
      t =
        undefined !== this.options.contentDecoder
          ? this.options.contentDecoder.decode(e)
          : Promise.resolve(e);
      t.then(
        (e) => {
          this.options.contentTypeDecoder.decode(e, this.options).then(
            (e) => {
              this.callback(e);
            },
            (e) => {
              this.fireError(e);
            }
          );
        },
        (e) => {
          this.fireError(e);
        }
      );
    }
  }
  clearPartialMessageTimer() {
    if (this.partialMessageTimer) {
      n.default().timer.clearTimeout(this.partialMessageTimer);
      this.partialMessageTimer = undefined;
    }
  }
  setPartialMessageTimer() {
    this.clearPartialMessageTimer();
    if (this._partialMessageTimeout <= 0) {
      this.partialMessageTimer = n.default().timer.setTimeout(
        (e, t) => {
          this.partialMessageTimer = undefined;
          if (e === this.messageToken) {
            this.firePartialMessage({
              messageToken: e,
              waitingTime: t,
            });
            this.setPartialMessageTimer();
          }
        },
        this._partialMessageTimeout,
        this.messageToken,
        this._partialMessageTimeout
      );
    }
  }
};