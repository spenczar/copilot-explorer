require.r(exports);
require.d(exports, {
  NIL: () => C,
  parse: () => y,
  stringify: () => d,
  v1: () => m,
  v3: () => _,
  v4: () => b,
  v5: () => w,
  validate: () => l,
  version: () => E,
});
var n = require("crypto");
var i = require.n(n);
const o = new Uint8Array(256);
let s = o.length;
function a() {
  if (s > o.length - 16) {
    i().randomFillSync(o);
    s = 0;
  }
  return o.slice(s, (s += 16));
}
const c =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
const l = function (e) {
  return "string" == typeof e && c.test(e);
};
const u = [];
for (let e = 0; e < 256; ++e) u.push((e + 256).toString(16).substr(1));
const d = function (e, t = 0) {
  const r = (
    u[e[t + 0]] +
    u[e[t + 1]] +
    u[e[t + 2]] +
    u[e[t + 3]] +
    "-" +
    u[e[t + 4]] +
    u[e[t + 5]] +
    "-" +
    u[e[t + 6]] +
    u[e[t + 7]] +
    "-" +
    u[e[t + 8]] +
    u[e[t + 9]] +
    "-" +
    u[e[t + 10]] +
    u[e[t + 11]] +
    u[e[t + 12]] +
    u[e[t + 13]] +
    u[e[t + 14]] +
    u[e[t + 15]]
  ).toLowerCase();
  if (!l(r)) throw TypeError("Stringified UUID is invalid");
  return r;
};
let p;
let h;
let f = 0;
let g = 0;
const m = function (e, t, r) {
  let n = (t && r) || 0;
  const i = t || new Array(16);
  let o = (e = e || {}).node || p;
  let s = undefined !== e.clockseq ? e.clockseq : h;
  if (null == o || null == s) {
    const t = e.random || (e.rng || a)();
    if (null == o) {
      o = p = [1 | t[0], t[1], t[2], t[3], t[4], t[5]];
    }
    if (null == s) {
      s = h = 16383 & ((t[6] << 8) | t[7]);
    }
  }
  let c = undefined !== e.msecs ? e.msecs : Date.now();
  let l = undefined !== e.nsecs ? e.nsecs : g + 1;
  const u = c - f + (l - g) / 1e4;
  if (u < 0 && undefined === e.clockseq) {
    s = (s + 1) & 16383;
  }
  if ((u < 0 || c > f) && undefined === e.nsecs) {
    l = 0;
  }
  if (l >= 1e4)
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  f = c;
  g = l;
  h = s;
  c += 122192928e5;
  const m = (1e4 * (268435455 & c) + l) % 4294967296;
  i[n++] = (m >>> 24) & 255;
  i[n++] = (m >>> 16) & 255;
  i[n++] = (m >>> 8) & 255;
  i[n++] = 255 & m;
  const y = ((c / 4294967296) * 1e4) & 268435455;
  i[n++] = (y >>> 8) & 255;
  i[n++] = 255 & y;
  i[n++] = ((y >>> 24) & 15) | 16;
  i[n++] = (y >>> 16) & 255;
  i[n++] = (s >>> 8) | 128;
  i[n++] = 255 & s;
  for (let e = 0; e < 6; ++e) i[n + e] = o[e];
  return t || d(i);
};
const y = function (e) {
  if (!l(e)) throw TypeError("Invalid UUID");
  let t;
  const r = new Uint8Array(16);
  r[0] = (t = parseInt(e.slice(0, 8), 16)) >>> 24;
  r[1] = (t >>> 16) & 255;
  r[2] = (t >>> 8) & 255;
  r[3] = 255 & t;
  r[4] = (t = parseInt(e.slice(9, 13), 16)) >>> 8;
  r[5] = 255 & t;
  r[6] = (t = parseInt(e.slice(14, 18), 16)) >>> 8;
  r[7] = 255 & t;
  r[8] = (t = parseInt(e.slice(19, 23), 16)) >>> 8;
  r[9] = 255 & t;
  r[10] = ((t = parseInt(e.slice(24, 36), 16)) / 1099511627776) & 255;
  r[11] = (t / 4294967296) & 255;
  r[12] = (t >>> 24) & 255;
  r[13] = (t >>> 16) & 255;
  r[14] = (t >>> 8) & 255;
  r[15] = 255 & t;
  return r;
};
function v(e, t, r) {
  function n(e, n, i, o) {
    if ("string" == typeof e) {
      e = (function (e) {
        e = unescape(encodeURIComponent(e));
        const t = [];
        for (let r = 0; r < e.length; ++r) t.push(e.charCodeAt(r));
        return t;
      })(e);
    }
    if ("string" == typeof n) {
      n = y(n);
    }
    if (16 !== n.length)
      throw TypeError(
        "Namespace must be array-like (16 iterable integer values, 0-255)"
      );
    let s = new Uint8Array(16 + e.length);
    s.set(n);
    s.set(e, n.length);
    s = r(s);
    s[6] = (15 & s[6]) | t;
    s[8] = (63 & s[8]) | 128;
    if (i) {
      o = o || 0;
      for (let e = 0; e < 16; ++e) i[o + e] = s[e];
      return i;
    }
    return d(s);
  }
  try {
    n.name = e;
  } catch (e) {}
  n.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
  n.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  return n;
}
const _ = v("v3", 48, function (e) {
  if (Array.isArray(e)) {
    e = Buffer.from(e);
  } else {
    if ("string" == typeof e) {
      e = Buffer.from(e, "utf8");
    }
  }
  return i().createHash("md5").update(e).digest();
});
const b = function (e, t, r) {
  const n = (e = e || {}).random || (e.rng || a)();
  n[6] = (15 & n[6]) | 64;
  n[8] = (63 & n[8]) | 128;
  if (t) {
    r = r || 0;
    for (let e = 0; e < 16; ++e) t[r + e] = n[e];
    return t;
  }
  return d(n);
};
const w = v("v5", 80, function (e) {
  if (Array.isArray(e)) {
    e = Buffer.from(e);
  } else {
    if ("string" == typeof e) {
      e = Buffer.from(e, "utf8");
    }
  }
  return i().createHash("sha1").update(e).digest();
});
const C = "00000000-0000-0000-0000-000000000000";
const E = function (e) {
  if (!l(e)) throw TypeError("Invalid UUID");
  return parseInt(e.substr(14, 1), 16);
};