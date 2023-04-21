Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.WriteableStreamMessageWriter =
  exports.AbstractMessageWriter =
  exports.MessageWriter =
    undefined;
const n = require(30147);
const i = require(67574);
const o = require(80142);
const s = require(27135);
var a;
(exports.MessageWriter || (exports.MessageWriter = {})).is = function (e) {
  let t = e;
  return (
    t &&
    i.func(t.dispose) &&
    i.func(t.onClose) &&
    i.func(t.onError) &&
    i.func(t.write)
  );
};
class AbstractMessageWriter {
  constructor() {
    this.errorEmitter = new s.Emitter();
    this.closeEmitter = new s.Emitter();
  }
  dispose() {
    this.errorEmitter.dispose();
    this.closeEmitter.dispose();
  }
  get onError() {
    return this.errorEmitter.event;
  }
  fireError(e, t, r) {
    this.errorEmitter.fire([this.asError(e), t, r]);
  }
  get onClose() {
    return this.closeEmitter.event;
  }
  fireClose() {
    this.closeEmitter.fire(undefined);
  }
  asError(e) {
    return e instanceof Error
      ? e
      : new Error(
          `Writer received error. Reason: ${
            i.string(e.message) ? e.message : "unknown"
          }`
        );
  }
}
exports.AbstractMessageWriter = AbstractMessageWriter;
(function (e) {
  e.fromOptions = function (e) {
    var t;
    var r;
    return undefined === e || "string" == typeof e
      ? {
          charset: null != e ? e : "utf-8",
          contentTypeEncoder: n.default().applicationJson.encoder,
        }
      : {
          charset: null !== (t = e.charset) && undefined !== t ? t : "utf-8",
          contentEncoder: e.contentEncoder,
          contentTypeEncoder:
            null !== (r = e.contentTypeEncoder) && undefined !== r
              ? r
              : n.default().applicationJson.encoder,
        };
  };
})(a || (a = {}));
exports.WriteableStreamMessageWriter = class extends AbstractMessageWriter {
  constructor(e, t) {
    super();
    this.writable = e;
    this.options = a.fromOptions(t);
    this.errorCount = 0;
    this.writeSemaphore = new o.Semaphore(1);
    this.writable.onError((e) => this.fireError(e));
    this.writable.onClose(() => this.fireClose());
  }
  async write(e) {
    return this.writeSemaphore.lock(async () =>
      this.options.contentTypeEncoder
        .encode(e, this.options)
        .then((e) =>
          undefined !== this.options.contentEncoder
            ? this.options.contentEncoder.encode(e)
            : e
        )
        .then(
          (t) => {
            const r = [];
            r.push("Content-Length: ", t.byteLength.toString(), "\r\n");
            r.push("\r\n");
            return this.doWrite(e, r, t);
          },
          (e) => {
            throw (this.fireError(e), e);
          }
        )
    );
  }
  async doWrite(e, t, r) {
    try {
      await this.writable.write(t.join(""), "ascii");
      return this.writable.write(r);
    } catch (t) {
      this.handleError(t, e);
      return Promise.reject(t);
    }
  }
  handleError(e, t) {
    this.errorCount++;
    this.fireError(e, t, this.errorCount);
  }
  end() {
    this.writable.end();
  }
};