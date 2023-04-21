const { EventEmitter: n } = require("events");
const { Readable: i } = require("stream");
const o = require(41241)("helix-fetch");
const s = require(39941);
const { Body: a } = require(54214);
const { Headers: c } = require(48226);
const { Request: l } = require(93505);
const { Response: u } = require(28327);
const { FetchBaseError: d, FetchError: p, AbortError: h } = require(2501);
const { AbortController: f, AbortSignal: g, TimeoutSignal: m } = require(64346);
const y = require(7619);
const { cacheableResponse: v } = require(98941);
const { sizeof: _ } = require(45591);
const { isFormData: b } = require(86029);
const { context: w, RequestAbortedError: C } = require(44673);
const E = ["GET", "HEAD"];
const T = "push";
const S = async (e, t, r) => {
  const { request: n } = e.context;
  const o = t instanceof l && undefined === r ? t : new l(t, r);
  const {
    method: s,
    body: a,
    signal: d,
    compress: f,
    decode: g,
    follow: m,
    redirect: y,
    init: { body: v },
  } = o;
  let _;
  if (d && d.aborted) {
    const e = new h("The operation was aborted.");
    throw (o.init.body instanceof i && o.init.body.destroy(e), e);
  }
  try {
    _ = await n(o.url, {
      ...r,
      method: s,
      headers: o.headers.plain(),
      body: !v || v instanceof i || b(v) ? a : v,
      compress: f,
      decode: g,
      follow: m,
      redirect: y,
      signal: d,
    });
  } catch (e) {
    if (v instanceof i) {
      v.destroy(e);
    }
    if (e instanceof TypeError) throw e;
    if (e instanceof C) throw new h("The operation was aborted.");
    throw new p(e.message, "system", e);
  }
  const w = () => {
    d.removeEventListener("abort", w);
    const e = new h("The operation was aborted.");
    if (o.init.body instanceof i) {
      o.init.body.destroy(e);
    }
    _.readable.emit("error", e);
  };
  if (d) {
    d.addEventListener("abort", w);
  }
  const {
    statusCode: E,
    statusText: T,
    httpVersion: x,
    headers: k,
    readable: I,
    decoded: A,
  } = _;
  if ([301, 302, 303, 307, 308].includes(E)) {
    const { location: t } = k;
    const r = null == t ? null : new URL(t, o.url);
    switch (o.redirect) {
      case "manual":
        break;
      case "error":
        throw (
          (d && d.removeEventListener("abort", w),
          new p(
            `uri requested responds with a redirect, redirect mode is set to 'error': ${o.url}`,
            "no-redirect"
          ))
        );
      case "follow": {
        if (null === r) break;
        if (o.counter >= o.follow)
          throw (
            (d && d.removeEventListener("abort", w),
            new p(`maximum redirect reached at: ${o.url}`, "max-redirect"))
          );
        const t = {
          headers: new c(o.headers),
          follow: o.follow,
          compress: o.compress,
          decode: o.decode,
          counter: o.counter + 1,
          method: o.method,
          body: o.body,
          signal: o.signal,
        };
        if (303 !== E && o.body && o.init.body instanceof i)
          throw (
            (d && d.removeEventListener("abort", w),
            new p(
              "Cannot follow redirect with body being a readable stream",
              "unsupported-redirect"
            ))
          );
        if (303 !== E && ((301 !== E && 302 !== E) || "POST" !== o.method)) {
          t.method = "GET";
          t.body = undefined;
          t.headers.delete("content-length");
        }
        if (d) {
          d.removeEventListener("abort", w);
        }
        return S(e, new l(r, t));
      }
    }
  }
  if (d) {
    I.once("end", () => {
      d.removeEventListener("abort", w);
    });
    I.once("error", () => {
      d.removeEventListener("abort", w);
    });
  }
  return new u(I, {
    url: o.url,
    status: E,
    statusText: T,
    headers: k,
    httpVersion: x,
    decoded: A,
    counter: o.counter,
  });
};
const x = async (e, t, r) => {
  if (0 === e.options.maxCacheSize) return r;
  if (!E.includes(t.method)) return r;
  const n = new y(t, r, {
    shared: false,
  });
  if (n.storable()) {
    const i = await v(r);
    e.cache.set(
      t.url,
      {
        policy: n,
        response: i,
      },
      n.timeToLive()
    );
    return i;
  }
  return r;
};
const k = (e, t = {}) => {
  const r = new URL(e);
  if ("object" != typeof t || Array.isArray(t))
    throw new TypeError("qs: object expected");
  Object.entries(t).forEach(([e, t]) => {
    if (Array.isArray(t)) {
      t.forEach((t) => r.searchParams.append(e, t));
    } else {
      r.searchParams.append(e, t);
    }
  });
  return r.href;
};
const I = (e) => new m(e);
class A {
  constructor(e) {
    this.options = {
      ...e,
    };
    const { maxCacheSize: t } = this.options;
    let r = "number" == typeof t && t >= 0 ? t : 104857600;
    let i = 500;
    if (0 === r) {
      r = 1;
      i = 1;
    }
    this.cache = new s({
      max: i,
      maxSize: r,
      sizeCalculation: ({ response: e }, t) => _(e),
    });
    this.eventEmitter = new n();
    this.options.h2 = this.options.h2 || {};
    if (undefined === this.options.h2.enablePush) {
      this.options.h2.enablePush = true;
    }
    const { enablePush: o } = this.options.h2;
    if (o) {
      this.options.h2.pushPromiseHandler = (e, t, r) => {
        const n = {
          ...t,
        };
        Object.keys(n)
          .filter((e) => e.startsWith(":"))
          .forEach((e) => delete n[e]);
        this.pushPromiseHandler(e, n, r);
      };
      this.options.h2.pushHandler = (e, t, r) => {
        const n = {
          ...t,
        };
        Object.keys(n)
          .filter((e) => e.startsWith(":"))
          .forEach((e) => delete n[e]);
        const {
          statusCode: i,
          statusText: o,
          httpVersion: s,
          headers: a,
          readable: c,
          decoded: l,
        } = r;
        this.pushHandler(
          e,
          n,
          new u(c, {
            url: e,
            status: i,
            statusText: o,
            headers: a,
            httpVersion: s,
            decoded: l,
          })
        );
      };
    }
    this.context = w(this.options);
  }
  api() {
    return {
      fetch: async (e, t) => this.fetch(e, t),
      Body: a,
      Headers: c,
      Request: l,
      Response: u,
      AbortController: f,
      AbortSignal: g,
      FetchBaseError: d,
      FetchError: p,
      AbortError: h,
      context: (e = {}) => new A(e).api(),
      noCache: (e = {}) =>
        new A({
          ...e,
          maxCacheSize: 0,
        }).api(),
      h1: (e = {}) =>
        new A({
          ...e,
          alpnProtocols: [this.context.ALPN_HTTP1_1],
        }).api(),
      keepAlive: (e = {}) =>
        new A({
          ...e,
          alpnProtocols: [this.context.ALPN_HTTP1_1],
          h1: {
            keepAlive: true,
          },
        }).api(),
      h1NoCache: (e = {}) =>
        new A({
          ...e,
          maxCacheSize: 0,
          alpnProtocols: [this.context.ALPN_HTTP1_1],
        }).api(),
      keepAliveNoCache: (e = {}) =>
        new A({
          ...e,
          maxCacheSize: 0,
          alpnProtocols: [this.context.ALPN_HTTP1_1],
          h1: {
            keepAlive: true,
          },
        }).api(),
      reset: async () => this.context.reset(),
      onPush: (e) => this.onPush(e),
      offPush: (e) => this.offPush(e),
      createUrl: k,
      timeoutSignal: I,
      clearCache: () => this.clearCache(),
      cacheStats: () => this.cacheStats(),
      ALPN_HTTP2: this.context.ALPN_HTTP2,
      ALPN_HTTP2C: this.context.ALPN_HTTP2C,
      ALPN_HTTP1_1: this.context.ALPN_HTTP1_1,
      ALPN_HTTP1_0: this.context.ALPN_HTTP1_0,
    };
  }
  async fetch(e, t) {
    return (async (e, t, r) => {
      const n = new l(t, r);
      if (
        0 !== e.options.maxCacheSize &&
        E.includes(n.method) &&
        !["no-store", "reload"].includes(n.cache)
      ) {
        const { policy: t, response: r } = e.cache.get(n.url) || {};
        if (t && t.satisfiesWithoutRevalidation(n)) {
          r.headers = new c(t.responseHeaders(r));
          const e = r.clone();
          e.fromCache = true;
          return e;
        }
      }
      const i = await S(e, n);
      return "no-store" !== n.cache ? x(e, n, i) : i;
    })(this, e, t);
  }
  onPush(e) {
    return this.eventEmitter.on(T, e);
  }
  offPush(e) {
    return this.eventEmitter.off(T, e);
  }
  clearCache() {
    this.cache.clear();
  }
  cacheStats() {
    return {
      size: this.cache.calculatedSize,
      count: this.cache.size,
    };
  }
  pushPromiseHandler(e, t, r) {
    o(`received server push promise: ${e}, headers: ${JSON.stringify(t)}`);
    const n = new l(e, {
      headers: t,
    });
    const { policy: i } = this.cache.get(e) || {};
    if (i && i.satisfiesWithoutRevalidation(n)) {
      o(
        `already cached, reject push promise: ${e}, headers: ${JSON.stringify(
          t
        )}`
      );
      r();
    }
  }
  async pushHandler(e, t, r) {
    o(
      `caching resource pushed by server: ${e}, reqHeaders: ${JSON.stringify(
        t
      )}, status: ${r.status}, respHeaders: ${JSON.stringify(r.headers)}`
    );
    const n = await x(
      this,
      new l(e, {
        headers: t,
      }),
      r
    );
    this.eventEmitter.emit(T, e, n);
  }
}
module.exports = new A().api();