const { Body: n, cloneStream: i, guessContentType: o } = require(54214);
const { Headers: s } = require(48226);
const { isPlainObject: a } = require(45591);
const { isFormData: c, FormDataSerializer: l } = require(86029);
const u = Symbol("Response internals");
class d extends n {
  constructor(e = null, t = {}) {
    const r = new s(t.headers);
    let n = e;
    if (c(n) && !r.has("content-type")) {
      const e = new l(n);
      n = e.stream();
      r.set("content-type", e.contentType());
      if (r.has("transfer-encoding") || r.has("content-length")) {
        r.set("content-length", e.length());
      }
    }
    if (null !== n && !r.has("content-type"))
      if (a(n)) {
        n = JSON.stringify(n);
        r.set("content-type", "application/json");
      } else {
        const e = o(n);
        if (e) {
          r.set("content-type", e);
        }
      }
    super(n);
    this[u] = {
      url: t.url,
      status: t.status || 200,
      statusText: t.statusText || "",
      headers: r,
      httpVersion: t.httpVersion,
      decoded: t.decoded,
      counter: t.counter,
    };
  }
  get url() {
    return this[u].url || "";
  }
  get status() {
    return this[u].status;
  }
  get statusText() {
    return this[u].statusText;
  }
  get ok() {
    return this[u].status >= 200 && this[u].status < 300;
  }
  get redirected() {
    return this[u].counter > 0;
  }
  get headers() {
    return this[u].headers;
  }
  get httpVersion() {
    return this[u].httpVersion;
  }
  get decoded() {
    return this[u].decoded;
  }
  static redirect(e, t = 302) {
    if (![301, 302, 303, 307, 308].includes(t))
      throw new RangeError("Invalid status code");
    return new d(null, {
      headers: {
        location: new URL(e).toString(),
      },
      status: t,
    });
  }
  clone() {
    if (this.bodyUsed) throw new TypeError("Cannot clone: already read");
    return new d(i(this), {
      ...this[u],
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
}
Object.defineProperties(d.prototype, {
  url: {
    enumerable: true,
  },
  status: {
    enumerable: true,
  },
  ok: {
    enumerable: true,
  },
  redirected: {
    enumerable: true,
  },
  statusText: {
    enumerable: true,
  },
  headers: {
    enumerable: true,
  },
  clone: {
    enumerable: true,
  },
});
module.exports = {
  Response: d,
};