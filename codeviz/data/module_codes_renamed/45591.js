const {
  constants: { MAX_LENGTH: n },
} = require("buffer");
const { pipeline: i, PassThrough: o } = require("stream");
const { promisify: s } = require("util");
const {
  createGunzip: a,
  createInflate: c,
  createBrotliDecompress: l,
  constants: { Z_SYNC_FLUSH: u },
} = require("zlib");
const d = require("Environment-Dependent-Module")("helix-fetch:utils");
const p = s(i);
const h = (e, t) => {
  if (Buffer.isBuffer(e)) return e.length;
  switch (typeof e) {
    case "string":
      return 2 * e.length;
    case "boolean":
      return 4;
    case "number":
      return 8;
    case "symbol":
      return Symbol.keyFor(e)
        ? 2 * Symbol.keyFor(e).length
        : 2 * (e.toString().length - 8);
    case "object":
      return Array.isArray(e) ? f(e, t) : g(e, t);
    default:
      return 0;
  }
};
const f = (e, t) => (
  t.add(e), e.map((e) => (t.has(e) ? 0 : h(e, t))).reduce((e, t) => e + t, 0)
);
const g = (e, t) => {
  if (null == e) return 0;
  t.add(e);
  let r = 0;
  const n = [];
  for (const t in e) n.push(t);
  n.push(...Object.getOwnPropertySymbols(e));
  n.forEach((n) => {
    r += h(n, t);
    if ("object" == typeof e[n] && null !== e[n]) {
      if (t.has(e[n])) return;
      t.add(e[n]);
    }
    r += h(e[n], t);
  });
  return r;
};
module.exports = {
  decodeStream: (e, t, r, n) => {
    if (
      !((e, t) =>
        204 !== e &&
        304 !== e &&
        0 != +t["content-length"] &&
        /^\s*(?:(x-)?deflate|(x-)?gzip|br)\s*$/.test(t["content-encoding"]))(
        e,
        t
      )
    )
      return r;
    const o = (e) => {
      if (e) {
        d(`encountered error while decoding stream: ${e}`);
        n(e);
      }
    };
    switch (t["content-encoding"].trim()) {
      case "gzip":
      case "x-gzip":
        return i(
          r,
          a({
            flush: u,
            finishFlush: u,
          }),
          o
        );
      case "deflate":
      case "x-deflate":
        return i(r, c(), o);
      case "br":
        return i(r, l(), o);
      default:
        return r;
    }
  },
  isPlainObject: (e) => {
    if (!e || "object" != typeof e) return false;
    if ("[object Object]" !== Object.prototype.toString.call(e)) return false;
    if (null === Object.getPrototypeOf(e)) return true;
    let t = e;
    for (; null !== Object.getPrototypeOf(t); ) t = Object.getPrototypeOf(t);
    return Object.getPrototypeOf(e) === t;
  },
  sizeof: (e) => h(e, new WeakSet()),
  streamToBuffer: async (e) => {
    const t = new o();
    let r = 0;
    const i = [];
    t.on("data", (e) => {
      if (r + e.length > n)
        throw new Error("Buffer.constants.MAX_SIZE exceeded");
      i.push(e);
      r += e.length;
    });
    await p(e, t);
    return Buffer.concat(i, r);
  },
};
