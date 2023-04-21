const { Readable: n } = require("stream");
const i = require("tls");
const {
  types: { isAnyArrayBuffer: o },
} = require("util");
const s = require(39941);
const a = require(41241)("helix-fetch:core");
const { RequestAbortedError: c } = require(75899);
const l = require(84751);
const u = require(57652);
const d = require(93430);
const { isPlainObject: p } = require(45591);
const { isFormData: h, FormDataSerializer: f } = require(86029);
const { version: g } = require(93180);
const m = "h2";
const y = "h2c";
const v = "http/1.0";
const _ = "http/1.1";
const b = 100;
const w = 36e5;
const C = [m, _, v];
const E = `helix-fetch/${g}`;
const T = {
  method: "GET",
  compress: true,
  decode: true,
};
let S = 0;
const x = d();
const k = (e, t) =>
  new Promise((r, n) => {
    const { signal: o } = t;
    let s;
    const l = () => {
      o.removeEventListener("abort", l);
      const e = new c();
      n(e);
      if (s) {
        s.destroy(e);
      }
    };
    if (o) {
      if (o.aborted) return void n(new c());
      o.addEventListener("abort", l);
    }
    const u = +e.port || 443;
    const d = (t) => {
      if (o) {
        o.removeEventListener("abort", l);
      }
      if (t instanceof c) {
        a(`connecting to ${e.hostname}:${u} failed with: ${t.message}`);
        n(t);
      }
    };
    s = i.connect(u, e.hostname, t);
    s.once("secureConnect", () => {
      if (o) {
        o.removeEventListener("abort", l);
      }
      s.off("error", d);
      S += 1;
      s.id = S;
      s.secureConnecting = false;
      a(`established TLS connection: #${s.id} (${s.servername})`);
      r(s);
    });
    s.once("error", d);
  });
module.exports = {
  request: async (e, t, r) => {
    const i = new URL(t);
    const s = {
      ...T,
      ...(r || {}),
    };
    let c;
    if ("string" == typeof s.method) {
      s.method = s.method.toUpperCase();
    }
    s.headers = ((e) => {
      const t = {};
      Object.keys(e).forEach((r) => {
        t[r.toLowerCase()] = e[r];
      });
      return t;
    })(s.headers || {});
    if (undefined === s.headers.host) {
      s.headers.host = i.host;
    }
    if (e.userAgent && undefined === s.headers["user-agent"]) {
      s.headers["user-agent"] = e.userAgent;
    }
    if (s.body instanceof URLSearchParams)
      (c = "application/x-www-form-urlencoded; charset=utf-8"),
        (s.body = s.body.toString());
    else if (h(s.body)) {
      const e = new f(s.body);
      (c = e.contentType()),
        (s.body = e.stream()),
        void 0 === s.headers["transfer-encoding"] &&
          void 0 === s.headers["content-length"] &&
          (s.headers["content-length"] = String(e.length()));
    } else
      "string" == typeof s.body || s.body instanceof String
        ? (c = "text/plain; charset=utf-8")
        : p(s.body)
        ? ((s.body = JSON.stringify(s.body)), (c = "application/json"))
        : o(s.body) && (s.body = Buffer.from(s.body));
    if (undefined === s.headers["content-type"] && undefined !== c) {
      s.headers["content-type"] = c;
    }
    if (null != s.body) {
      if (s.body instanceof n) {
        if (
          "string" == typeof s.body ||
          s.body instanceof String ||
          Buffer.isBuffer(s.body)
        ) {
          s.body = String(s.body);
        }
        if (
          undefined === s.headers["transfer-encoding"] &&
          undefined === s.headers["content-length"]
        ) {
          s.headers["content-length"] = String(
            Buffer.isBuffer(s.body)
              ? s.body.length
              : Buffer.byteLength(s.body, "utf-8")
          );
        }
      }
    }
    if (undefined === s.headers.accept) {
      s.headers.accept = "*/*";
    }
    if (null == s.body && ["POST", "PUT"].includes(s.method)) {
      s.headers["content-length"] = "0";
    }
    if (s.compress && undefined === s.headers["accept-encoding"]) {
      s.headers["accept-encoding"] = "gzip,deflate,br";
    }
    const { signal: d } = s;
    const { protocol: g, socket: b = null } = e.socketFactory
      ? await (async (e, t, r, n) => {
          const i = "https:" === t.protocol;
          let o;
          o = t.port ? t.port : i ? 443 : 80;
          const s = {
            ...r,
            host: t.host,
            port: o,
          };
          const a = await e(s);
          if (i) {
            const e = {
              ...s,
              ALPNProtocols: n,
            };
            e.socket = a;
            const r = await k(t, e);
            return {
              protocol: r.alpnProtocol || _,
              socket: r,
            };
          }
          return {
            protocol: a.alpnProtocol || _,
            socket: a,
          };
        })(e.socketFactory, i, s, e.alpnProtocols)
      : await (async (e, t, r) => {
          const n = `${t.protocol}//${t.host}`;
          let i = e.alpnCache.get(n);
          if (i)
            return {
              protocol: i,
            };
          switch (t.protocol) {
            case "http:":
              i = _;
              e.alpnCache.set(n, i);
              return {
                protocol: i,
              };
            case "http2:":
              i = y;
              e.alpnCache.set(n, i);
              return {
                protocol: i,
              };
            case "https:":
              break;
            default:
              throw new TypeError(`unsupported protocol: ${t.protocol}`);
          }
          const {
            options: { rejectUnauthorized: o, h1: s = {}, h2: a = {} },
          } = e;
          const c = !(
            false === o ||
            false === s.rejectUnauthorized ||
            false === a.rejectUnauthorized
          );
          const l = {
            servername: t.hostname,
            ALPNProtocols: e.alpnProtocols,
            signal: r,
            rejectUnauthorized: c,
          };
          const u = await (async (e, t) => {
            let r = await x.acquire(e.origin);
            try {
              if (r) {
                r = await k(e, t);
              }
              return r;
            } finally {
              x.release(e.origin, r);
            }
          })(t, l);
          i = u.alpnProtocol;
          if (i) {
            i = _;
          }
          e.alpnCache.set(n, i);
          return {
            protocol: i,
            socket: u,
          };
        })(e, i, d);
    switch ((a(`${i.host} -> ${g}`), g)) {
      case m:
        try {
          return await u.request(
            e,
            i,
            b
              ? {
                  ...s,
                  socket: b,
                }
              : s
          );
        } catch (t) {
          const { code: r, message: n } = t;
          throw (
            ("ERR_HTTP2_ERROR" === r &&
              "Protocol error" === n &&
              e.alpnCache.delete(`${i.protocol}//${i.host}`),
            t)
          );
        }
      case y:
        return u.request(
          e,
          new URL(`http://${i.host}${i.pathname}${i.hash}${i.search}`),
          b
            ? {
                ...s,
                socket: b,
              }
            : s
        );
      case v:
      case _:
        return l.request(
          e,
          i,
          b
            ? {
                ...s,
                socket: b,
              }
            : s
        );
      default:
        throw new TypeError(`unsupported protocol: ${g}`);
    }
  },
  setupContext: (e) => {
    const {
      options: {
        alpnProtocols: t = C,
        alpnCacheTTL: r = w,
        alpnCacheSize: n = b,
        userAgent: i = E,
        socketFactory: o,
      },
    } = e;
    e.alpnProtocols = t;
    e.alpnCache = new s({
      max: n,
      ttl: r,
    });
    e.userAgent = i;
    e.socketFactory = o;
    l.setupContext(e);
    u.setupContext(e);
  },
  resetContext: async (e) => (
    e.alpnCache.clear(), Promise.all([l.resetContext(e), u.resetContext(e)])
  ),
  RequestAbortedError: c,
  ALPN_HTTP2: m,
  ALPN_HTTP2C: y,
  ALPN_HTTP1_1: _,
  ALPN_HTTP1_0: v,
};