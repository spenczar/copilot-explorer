Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(30147);
const i = require("util");
const o = require(83911);
const s = require(75530);
class a extends s.AbstractMessageBuffer {
  constructor(e = "utf-8") {
    super(e);
  }
  emptyBuffer() {
    return a.emptyBuffer;
  }
  fromString(e, t) {
    return Buffer.from(e, t);
  }
  toString(e, t) {
    return e instanceof Buffer ? e.toString(t) : new i.TextDecoder(t).decode(e);
  }
  asNative(e, t) {
    return undefined === t
      ? e instanceof Buffer
        ? e
        : Buffer.from(e)
      : e instanceof Buffer
      ? e.slice(0, t)
      : Buffer.from(e, 0, t);
  }
  allocNative(e) {
    return Buffer.allocUnsafe(e);
  }
}
a.emptyBuffer = Buffer.allocUnsafe(0);
class c {
  constructor(e) {
    this.stream = e;
  }
  onClose(e) {
    this.stream.on("close", e);
    return o.Disposable.create(() => this.stream.off("close", e));
  }
  onError(e) {
    this.stream.on("error", e);
    return o.Disposable.create(() => this.stream.off("error", e));
  }
  onEnd(e) {
    this.stream.on("end", e);
    return o.Disposable.create(() => this.stream.off("end", e));
  }
  onData(e) {
    this.stream.on("data", e);
    return o.Disposable.create(() => this.stream.off("data", e));
  }
}
class l {
  constructor(e) {
    this.stream = e;
  }
  onClose(e) {
    this.stream.on("close", e);
    return o.Disposable.create(() => this.stream.off("close", e));
  }
  onError(e) {
    this.stream.on("error", e);
    return o.Disposable.create(() => this.stream.off("error", e));
  }
  onEnd(e) {
    this.stream.on("end", e);
    return o.Disposable.create(() => this.stream.off("end", e));
  }
  write(e, t) {
    return new Promise((r, n) => {
      const i = (e) => {
        if (null == e) {
          r();
        } else {
          n(e);
        }
      };
      if ("string" == typeof e) {
        this.stream.write(e, t, i);
      } else {
        this.stream.write(e, i);
      }
    });
  }
  end() {
    this.stream.end();
  }
}
const u = Object.freeze({
  messageBuffer: Object.freeze({
    create: (e) => new a(e),
  }),
  applicationJson: Object.freeze({
    encoder: Object.freeze({
      name: "application/json",
      encode: (e, t) => {
        try {
          return Promise.resolve(
            Buffer.from(JSON.stringify(e, undefined, 0), t.charset)
          );
        } catch (e) {
          return Promise.reject(e);
        }
      },
    }),
    decoder: Object.freeze({
      name: "application/json",
      decode: (e, t) => {
        try {
          return e instanceof Buffer
            ? Promise.resolve(JSON.parse(e.toString(t.charset)))
            : Promise.resolve(
                JSON.parse(new i.TextDecoder(t.charset).decode(e))
              );
        } catch (e) {
          return Promise.reject(e);
        }
      },
    }),
  }),
  stream: Object.freeze({
    asReadableStream: (e) => new c(e),
    asWritableStream: (e) => new l(e),
  }),
  console,
  timer: Object.freeze({
    setTimeout: (e, t, ...r) => setTimeout(e, t, ...r),
    clearTimeout(e) {
      clearTimeout(e);
    },
    setImmediate: (e, ...t) => setImmediate(e, ...t),
    clearImmediate(e) {
      clearImmediate(e);
    },
  }),
});
function d() {
  return u;
}
!(function (e) {
  e.install = function () {
    n.default.install(u);
  };
})(d || (d = {}));
exports.default = d;