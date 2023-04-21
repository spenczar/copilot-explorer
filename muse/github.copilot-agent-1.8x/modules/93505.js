const { AbortSignal: n } = require(64346);
const { Body: i, cloneStream: o, guessContentType: s } = require(54214);
const { Headers: a } = require(48226);
const { isPlainObject: c } = require(45591);
const { isFormData: l, FormDataSerializer: u } = require(86029);
const d = Symbol("Request internals");
class p extends i {
  constructor(e, t = {}) {
    const r = e instanceof p ? e : null;
    const i = r ? new URL(r.url) : new URL(e);
    let h = t.method || (r && r.method) || "GET";
    h = h.toUpperCase();
    if (
      (null != t.body || (r && null !== r.body)) &&
      ["GET", "HEAD"].includes(h)
    )
      throw new TypeError("Request with GET/HEAD method cannot have body");
    let f = t.body || (r && r.body ? o(r) : null);
    const g = new a(t.headers || (r && r.headers) || {});
    if (l(f) && !g.has("content-type")) {
      const e = new u(f);
      f = e.stream();
      g.set("content-type", e.contentType());
      if (g.has("transfer-encoding") || g.has("content-length")) {
        g.set("content-length", e.length());
      }
    }
    if (!g.has("content-type"))
      if (c(f)) {
        f = JSON.stringify(f);
        g.set("content-type", "application/json");
      } else {
        const e = s(f);
        if (e) {
          g.set("content-type", e);
        }
      }
    super(f);
    let m = r ? r.signal : null;
    if ("signal" in t) {
      m = t.signal;
    }
    if (m && !(m instanceof n))
      throw new TypeError("signal needs to be an instance of AbortSignal");
    const y = t.redirect || (r && r.redirect) || "follow";
    if (!["follow", "error", "manual"].includes(y))
      throw new TypeError(`'${y}' is not a valid redirect option`);
    const v = t.cache || (r && r.cache) || "default";
    if (
      ![
        "default",
        "no-store",
        "reload",
        "no-cache",
        "force-cache",
        "only-if-cached",
      ].includes(v)
    )
      throw new TypeError(`'${v}' is not a valid cache option`);
    this[d] = {
      init: {
        ...t,
      },
      method: h,
      redirect: y,
      cache: v,
      headers: g,
      parsedURL: i,
      signal: m,
    };
    if (undefined === t.follow) {
      if (r && undefined !== r.follow) {
        this.follow = r.follow;
      } else {
        this.follow = 20;
      }
    } else {
      this.follow = t.follow;
    }
    this.counter = t.counter || (r && r.counter) || 0;
    if (undefined === t.compress) {
      if (r && undefined !== r.compress) {
        this.compress = r.compress;
      } else {
        this.compress = true;
      }
    } else {
      this.compress = t.compress;
    }
    if (undefined === t.decode) {
      if (r && undefined !== r.decode) {
        this.decode = r.decode;
      } else {
        this.decode = true;
      }
    } else {
      this.decode = t.decode;
    }
  }
  get method() {
    return this[d].method;
  }
  get url() {
    return this[d].parsedURL.toString();
  }
  get headers() {
    return this[d].headers;
  }
  get redirect() {
    return this[d].redirect;
  }
  get cache() {
    return this[d].cache;
  }
  get signal() {
    return this[d].signal;
  }
  clone() {
    return new p(this);
  }
  get init() {
    return this[d].init;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
}
Object.defineProperties(p.prototype, {
  method: {
    enumerable: true,
  },
  url: {
    enumerable: true,
  },
  headers: {
    enumerable: true,
  },
  redirect: {
    enumerable: true,
  },
  cache: {
    enumerable: true,
  },
  clone: {
    enumerable: true,
  },
  signal: {
    enumerable: true,
  },
});
module.exports = {
  Request: p,
};