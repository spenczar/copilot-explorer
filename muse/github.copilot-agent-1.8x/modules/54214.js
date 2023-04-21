const { PassThrough: n, Readable: i } = require("stream");
const {
  types: { isAnyArrayBuffer: o },
} = require("util");
const { FetchError: s, FetchBaseError: a } = require(2501);
const { streamToBuffer: c } = require(45591);
const l = Buffer.alloc(0);
const u = Symbol("Body internals");
const d = async (e) => {
  if (e[u].disturbed) throw new TypeError("Already read");
  if (e[u].error)
    throw new TypeError(`Stream had error: ${e[u].error.message}`);
  e[u].disturbed = true;
  const { stream: t } = e[u];
  return null === t ? l : c(t);
};
class p {
  constructor(e) {
    let t;
    t =
      null == e
        ? null
        : e instanceof URLSearchParams
        ? i.from(e.toString())
        : e instanceof i
        ? e
        : Buffer.isBuffer(e)
        ? i.from(e)
        : o(e)
        ? i.from(Buffer.from(e))
        : "string" == typeof e || e instanceof String
        ? i.from(e)
        : i.from(String(e));
    this[u] = {
      stream: t,
      disturbed: false,
      error: null,
    };
    if (e instanceof i) {
      t.on("error", (e) => {
        const t =
          e instanceof a
            ? e
            : new s(
                `Invalid response body while trying to fetch ${this.url}: ${e.message}`,
                "system",
                e
              );
        this[u].error = t;
      });
    }
  }
  get body() {
    return this[u].stream;
  }
  get bodyUsed() {
    return this[u].disturbed;
  }
  async buffer() {
    return d(this);
  }
  async arrayBuffer() {
    return (e = await this.buffer()).buffer.slice(
      e.byteOffset,
      e.byteOffset + e.byteLength
    );
    var e;
  }
  async text() {
    return (await d(this)).toString();
  }
  async json() {
    return JSON.parse(await this.text());
  }
}
Object.defineProperties(p.prototype, {
  body: {
    enumerable: true,
  },
  bodyUsed: {
    enumerable: true,
  },
  arrayBuffer: {
    enumerable: true,
  },
  json: {
    enumerable: true,
  },
  text: {
    enumerable: true,
  },
});
module.exports = {
  Body: p,
  cloneStream: (e) => {
    if (e[u].disturbed) throw new TypeError("Cannot clone: already read");
    const { stream: t } = e[u];
    let r = t;
    if (t instanceof i) {
      r = new n();
      const i = new n();
      t.pipe(r);
      t.pipe(i);
      e[u].stream = i;
    }
    return r;
  },
  guessContentType: (e) =>
    null === e
      ? null
      : "string" == typeof e
      ? "text/plain; charset=utf-8"
      : e instanceof URLSearchParams
      ? "application/x-www-form-urlencoded; charset=utf-8"
      : Buffer.isBuffer(e) || o(e) || e instanceof i
      ? null
      : "text/plain; charset=utf-8",
};