var n = require(56105);
require(10017);
require(46572);
require(593);
require(56827);
var i = require(89796);
var o = i.publicKeyValidator;
var s = i.privateKeyValidator;
if (undefined === a) var a = n.jsbn.BigInteger;
var c = n.util.ByteBuffer;
var l = "undefined" == typeof Buffer ? Uint8Array : Buffer;
n.pki = n.pki || {};
module.exports = n.pki.ed25519 = n.ed25519 = n.ed25519 || {};
var u = n.ed25519;
function d(e) {
  var t = e.message;
  if (t instanceof Uint8Array || t instanceof l) return t;
  var r = e.encoding;
  if (undefined === t) {
    if (!e.md)
      throw new TypeError('"options.message" or "options.md" not specified.');
    t = e.md.digest().getBytes();
    r = "binary";
  }
  if ("string" == typeof t && !r)
    throw new TypeError('"options.encoding" must be "binary" or "utf8".');
  if ("string" == typeof t) {
    if ("undefined" != typeof Buffer) return Buffer.from(t, r);
    t = new c(t, r);
  } else if (!(t instanceof c))
    throw new TypeError(
      '"options.message" must be a node.js Buffer, a Uint8Array, a forge ByteBuffer, or a string with "options.encoding" specifying its encoding.'
    );
  for (n = new l(t.length()), i = 0, undefined; i < n.length; ++i) {
    var n;
    var i;
    n[i] = t.at(i);
  }
  return n;
}
u.constants = {};
u.constants.PUBLIC_KEY_BYTE_LENGTH = 32;
u.constants.PRIVATE_KEY_BYTE_LENGTH = 64;
u.constants.SEED_BYTE_LENGTH = 32;
u.constants.SIGN_BYTE_LENGTH = 64;
u.constants.HASH_BYTE_LENGTH = 64;
u.generateKeyPair = function (e) {
  var t = (e = e || {}).seed;
  if (undefined === t) t = n.random.getBytesSync(u.constants.SEED_BYTE_LENGTH);
  else if ("string" == typeof t) {
    if (t.length !== u.constants.SEED_BYTE_LENGTH)
      throw new TypeError(
        '"seed" must be ' + u.constants.SEED_BYTE_LENGTH + " bytes in length."
      );
  } else if (!(t instanceof Uint8Array))
    throw new TypeError(
      '"seed" must be a node.js Buffer, Uint8Array, or a binary string.'
    );
  t = d({
    message: t,
    encoding: "binary",
  });
  for (
    r = new l(u.constants.PUBLIC_KEY_BYTE_LENGTH),
      i = new l(u.constants.PRIVATE_KEY_BYTE_LENGTH),
      o = 0,
      undefined;
    o < 32;
    ++o
  ) {
    var r;
    var i;
    var o;
    i[o] = t[o];
  }
  (function (e, t) {
    var r;
    var n = [D(), D(), D(), D()];
    var i = b(t, 32);
    for (
      i[0] &= 248, i[31] &= 127, i[31] |= 64, R(n, i), S(e, n), r = 0;
      r < 32;
      ++r
    )
      t[r + 32] = e[r];
  })(r, i);
  return {
    publicKey: r,
    privateKey: i,
  };
};
u.privateKeyFromAsn1 = function (e) {
  var t = {};
  var r = [];
  if (!n.asn1.validate(e, s, t, r)) {
    var i = new Error("Invalid Key.");
    throw ((i.errors = r), i);
  }
  var o = n.asn1.derToOid(t.privateKeyOid);
  var a = n.oids.EdDSA25519;
  if (o !== a)
    throw new Error('Invalid OID "' + o + '"; OID must be "' + a + '".');
  var c = t.privateKey;
  return {
    privateKeyBytes: d({
      message: n.asn1.fromDer(c).value,
      encoding: "binary",
    }),
  };
};
u.publicKeyFromAsn1 = function (e) {
  var t = {};
  var r = [];
  if (!n.asn1.validate(e, o, t, r)) {
    var i = new Error("Invalid Key.");
    throw ((i.errors = r), i);
  }
  var s = n.asn1.derToOid(t.publicKeyOid);
  var a = n.oids.EdDSA25519;
  if (s !== a)
    throw new Error('Invalid OID "' + s + '"; OID must be "' + a + '".');
  var c = t.ed25519PublicKey;
  if (c.length !== u.constants.PUBLIC_KEY_BYTE_LENGTH)
    throw new Error("Key length is invalid.");
  return d({
    message: c,
    encoding: "binary",
  });
};
u.publicKeyFromPrivateKey = function (e) {
  var t = d({
    message: (e = e || {}).privateKey,
    encoding: "binary",
  });
  if (t.length !== u.constants.PRIVATE_KEY_BYTE_LENGTH)
    throw new TypeError(
      '"options.privateKey" must have a byte length of ' +
        u.constants.PRIVATE_KEY_BYTE_LENGTH
    );
  for (
    r = new l(u.constants.PUBLIC_KEY_BYTE_LENGTH), n = 0, undefined;
    n < r.length;
    ++n
  ) {
    var r;
    var n;
    r[n] = t[32 + n];
  }
  return r;
};
u.sign = function (e) {
  var t = d((e = e || {}));
  var r = d({
    message: e.privateKey,
    encoding: "binary",
  });
  if (r.length === u.constants.SEED_BYTE_LENGTH)
    r = u.generateKeyPair({
      seed: r,
    }).privateKey;
  else if (r.length !== u.constants.PRIVATE_KEY_BYTE_LENGTH)
    throw new TypeError(
      '"options.privateKey" must have a byte length of ' +
        u.constants.SEED_BYTE_LENGTH +
        " or " +
        u.constants.PRIVATE_KEY_BYTE_LENGTH
    );
  var n = new l(u.constants.SIGN_BYTE_LENGTH + t.length);
  !(function (e, t, r, n) {
    var i;
    var o;
    var s = new Float64Array(64);
    var a = [D(), D(), D(), D()];
    var c = b(n, 32);
    c[0] &= 248;
    c[31] &= 127;
    c[31] |= 64;
    for (i = 0; i < r; ++i) e[64 + i] = t[i];
    for (i = 0; i < 32; ++i) e[32 + i] = c[32 + i];
    var l = b(e.subarray(32), r + 32);
    for (C(l), R(a, l), S(e, a), i = 32; i < 64; ++i) e[i] = n[i];
    var u = b(e, r + 64);
    for (C(u), i = 32; i < 64; ++i) s[i] = 0;
    for (i = 0; i < 32; ++i) s[i] = l[i];
    for (i = 0; i < 32; ++i) for (o = 0; o < 32; o++) s[i + o] += u[i] * c[o];
    w(e.subarray(32), s);
  })(n, t, t.length, r);
  for (
    i = new l(u.constants.SIGN_BYTE_LENGTH), o = 0, undefined;
    o < i.length;
    ++o
  ) {
    var i;
    var o;
    i[o] = n[o];
  }
  return i;
};
u.verify = function (e) {
  var t = d((e = e || {}));
  if (undefined === e.signature)
    throw new TypeError(
      '"options.signature" must be a node.js Buffer, a Uint8Array, a forge ByteBuffer, or a binary string.'
    );
  var r = d({
    message: e.signature,
    encoding: "binary",
  });
  if (r.length !== u.constants.SIGN_BYTE_LENGTH)
    throw new TypeError(
      '"options.signature" must have a byte length of ' +
        u.constants.SIGN_BYTE_LENGTH
    );
  var n = d({
    message: e.publicKey,
    encoding: "binary",
  });
  if (n.length !== u.constants.PUBLIC_KEY_BYTE_LENGTH)
    throw new TypeError(
      '"options.publicKey" must have a byte length of ' +
        u.constants.PUBLIC_KEY_BYTE_LENGTH
    );
  var i;
  var o = new l(u.constants.SIGN_BYTE_LENGTH + t.length);
  var s = new l(u.constants.SIGN_BYTE_LENGTH + t.length);
  for (i = 0; i < u.constants.SIGN_BYTE_LENGTH; ++i) o[i] = r[i];
  for (i = 0; i < t.length; ++i) o[i + u.constants.SIGN_BYTE_LENGTH] = t[i];
  return (
    (function (e, t, r, n) {
      var i;
      var o = new l(32);
      var s = [D(), D(), D(), D()];
      var a = [D(), D(), D(), D()];
      if (r < 64) return -1;
      if (
        (function (e, t) {
          var r = D();
          var n = D();
          var i = D();
          var o = D();
          var s = D();
          var a = D();
          var c = D();
          N(e[2], h);
          (function (e, t) {
            var r;
            for (r = 0; r < 16; ++r) e[r] = t[2 * r] + (t[2 * r + 1] << 8);
            e[15] &= 32767;
          })(e[1], t);
          F(i, e[1]);
          j(o, i, f);
          B(i, i, e[2]);
          M(o, e[2], o);
          F(s, o);
          F(a, s);
          j(c, a, s);
          j(r, c, i);
          j(r, r, o);
          (function (e, t) {
            var r;
            var n = D();
            for (r = 0; r < 16; ++r) n[r] = t[r];
            for (r = 250; r >= 0; --r) {
              F(n, n);
              if (1 !== r) {
                j(n, n, t);
              }
            }
            for (r = 0; r < 16; ++r) e[r] = n[r];
          })(r, r);
          j(r, r, i);
          j(r, r, o);
          j(r, r, o);
          j(e[0], r, o);
          F(n, e[0]);
          j(n, n, o);
          if (k(n, i)) {
            j(e[0], e[0], _);
          }
          F(n, e[0]);
          j(n, n, o);
          return k(n, i)
            ? -1
            : (A(e[0]) === t[31] >> 7 && B(e[0], p, e[0]),
              j(e[3], e[0], e[1]),
              0);
        })(a, n)
      )
        return -1;
      for (i = 0; i < r; ++i) e[i] = t[i];
      for (i = 0; i < 32; ++i) e[i + 32] = n[i];
      var c = b(e, r);
      C(c);
      P(s, a, c);
      R(a, t.subarray(32));
      E(s, a);
      S(o, s);
      r -= 64;
      if (I(t, 0, o, 0)) {
        for (i = 0; i < r; ++i) e[i] = 0;
        return -1;
      }
      for (i = 0; i < r; ++i) e[i] = t[i + 64];
      return r;
    })(s, o, o.length, n) >= 0
  );
};
var p = D();
var h = D([1]);
var f = D([
  30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505,
  36039, 65139, 11119, 27886, 20995,
]);
var g = D([
  61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542,
  64743, 22239, 55772, 9222,
]);
var m = D([
  54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905,
  49316, 21502, 52590, 14035, 8553,
]);
var y = D([
  26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214,
  26214, 26214, 26214, 26214, 26214,
]);
var v = new Float64Array([
  237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16,
]);
var _ = D([
  41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153,
  11085, 57099, 20417, 9344, 11139,
]);
function b(e, t) {
  var r = n.md.sha512.create();
  var i = new c(e);
  r.update(i.getBytes(t), "binary");
  var o = r.digest().getBytes();
  if ("undefined" != typeof Buffer) return Buffer.from(o, "binary");
  for (s = new l(u.constants.HASH_BYTE_LENGTH), a = 0, undefined; a < 64; ++a) {
    var s;
    var a;
    s[a] = o.charCodeAt(a);
  }
  return s;
}
function w(e, t) {
  var r;
  var n;
  var i;
  var o;
  for (n = 63; n >= 32; --n) {
    for (r = 0, i = n - 32, o = n - 12; i < o; ++i) {
      t[i] += r - 16 * t[n] * v[i - (n - 32)];
      r = (t[i] + 128) >> 8;
      t[i] -= 256 * r;
    }
    t[i] += r;
    t[n] = 0;
  }
  for (r = 0, i = 0; i < 32; ++i) {
    t[i] += r - (t[31] >> 4) * v[i];
    r = t[i] >> 8;
    t[i] &= 255;
  }
  for (i = 0; i < 32; ++i) t[i] -= r * v[i];
  for (n = 0; n < 32; ++n) {
    t[n + 1] += t[n] >> 8;
    e[n] = 255 & t[n];
  }
}
function C(e) {
  for (t = new Float64Array(64), r = 0, undefined; r < 64; ++r) {
    var t;
    var r;
    t[r] = e[r];
    e[r] = 0;
  }
  w(e, t);
}
function E(e, t) {
  var r = D();
  var n = D();
  var i = D();
  var o = D();
  var s = D();
  var a = D();
  var c = D();
  var l = D();
  var u = D();
  B(r, e[1], e[0]);
  B(u, t[1], t[0]);
  j(r, r, u);
  M(n, e[0], e[1]);
  M(u, t[0], t[1]);
  j(n, n, u);
  j(i, e[3], t[3]);
  j(i, i, g);
  j(o, e[2], t[2]);
  M(o, o, o);
  B(s, n, r);
  B(a, o, i);
  M(c, o, i);
  M(l, n, r);
  j(e[0], s, a);
  j(e[1], l, c);
  j(e[2], c, a);
  j(e[3], s, l);
}
function T(e, t, r) {
  for (var n = 0; n < 4; ++n) L(e[n], t[n], r);
}
function S(e, t) {
  var r = D();
  var n = D();
  var i = D();
  !(function (e, t) {
    var r;
    var n = D();
    for (r = 0; r < 16; ++r) n[r] = t[r];
    for (r = 253; r >= 0; --r) {
      F(n, n);
      if (2 !== r && 4 !== r) {
        j(n, n, t);
      }
    }
    for (r = 0; r < 16; ++r) e[r] = n[r];
  })(i, t[2]);
  j(r, t[0], i);
  j(n, t[1], i);
  x(e, n);
  e[31] ^= A(r) << 7;
}
function x(e, t) {
  var r;
  var n;
  var i;
  var o = D();
  var s = D();
  for (r = 0; r < 16; ++r) s[r] = t[r];
  for (O(s), O(s), O(s), n = 0; n < 2; ++n) {
    for (o[0] = s[0] - 65517, r = 1; r < 15; ++r) {
      o[r] = s[r] - 65535 - ((o[r - 1] >> 16) & 1);
      o[r - 1] &= 65535;
    }
    o[15] = s[15] - 32767 - ((o[14] >> 16) & 1);
    i = (o[15] >> 16) & 1;
    o[14] &= 65535;
    L(s, o, 1 - i);
  }
  for (r = 0; r < 16; r++) {
    e[2 * r] = 255 & s[r];
    e[2 * r + 1] = s[r] >> 8;
  }
}
function k(e, t) {
  var r = new l(32);
  var n = new l(32);
  x(r, e);
  x(n, t);
  return I(r, 0, n, 0);
}
function I(e, t, r, n) {
  return (function (e, t, r, n, i) {
    var o;
    var s = 0;
    for (o = 0; o < 32; ++o) s |= e[t + o] ^ r[n + o];
    return (1 & ((s - 1) >>> 8)) - 1;
  })(e, t, r, n);
}
function A(e) {
  var t = new l(32);
  x(t, e);
  return 1 & t[0];
}
function P(e, t, r) {
  var n;
  var i;
  for (N(e[0], p), N(e[1], h), N(e[2], h), N(e[3], p), i = 255; i >= 0; --i) {
    T(e, t, (n = (r[(i / 8) | 0] >> (7 & i)) & 1));
    E(t, e);
    E(e, e);
    T(e, t, n);
  }
}
function R(e, t) {
  var r = [D(), D(), D(), D()];
  N(r[0], m);
  N(r[1], y);
  N(r[2], h);
  j(r[3], m, y);
  P(e, r, t);
}
function N(e, t) {
  var r;
  for (r = 0; r < 16; r++) e[r] = 0 | t[r];
}
function O(e) {
  var t;
  var r;
  var n = 1;
  for (t = 0; t < 16; ++t) {
    r = e[t] + n + 65535;
    n = Math.floor(r / 65536);
    e[t] = r - 65536 * n;
  }
  e[0] += n - 1 + 37 * (n - 1);
}
function L(e, t, r) {
  for (i = ~(r - 1), o = 0, undefined; o < 16; ++o) {
    var n;
    var i;
    var o;
    n = i & (e[o] ^ t[o]);
    e[o] ^= n;
    t[o] ^= n;
  }
}
function D(e) {
  var t;
  var r = new Float64Array(16);
  if (e) for (t = 0; t < e.length; ++t) r[t] = e[t];
  return r;
}
function M(e, t, r) {
  for (var n = 0; n < 16; ++n) e[n] = t[n] + r[n];
}
function B(e, t, r) {
  for (var n = 0; n < 16; ++n) e[n] = t[n] - r[n];
}
function F(e, t) {
  j(e, t, t);
}
function j(e, t, r) {
  var n;
  var i;
  var o = 0;
  var s = 0;
  var a = 0;
  var c = 0;
  var l = 0;
  var u = 0;
  var d = 0;
  var p = 0;
  var h = 0;
  var f = 0;
  var g = 0;
  var m = 0;
  var y = 0;
  var v = 0;
  var _ = 0;
  var b = 0;
  var w = 0;
  var C = 0;
  var E = 0;
  var T = 0;
  var S = 0;
  var x = 0;
  var k = 0;
  var I = 0;
  var A = 0;
  var P = 0;
  var R = 0;
  var N = 0;
  var O = 0;
  var L = 0;
  var D = 0;
  var M = r[0];
  var B = r[1];
  var F = r[2];
  var j = r[3];
  var U = r[4];
  var $ = r[5];
  var q = r[6];
  var H = r[7];
  var V = r[8];
  var z = r[9];
  var K = r[10];
  var W = r[11];
  var G = r[12];
  var Q = r[13];
  var J = r[14];
  var Y = r[15];
  o += (n = t[0]) * M;
  s += n * B;
  a += n * F;
  c += n * j;
  l += n * U;
  u += n * $;
  d += n * q;
  p += n * H;
  h += n * V;
  f += n * z;
  g += n * K;
  m += n * W;
  y += n * G;
  v += n * Q;
  _ += n * J;
  b += n * Y;
  s += (n = t[1]) * M;
  a += n * B;
  c += n * F;
  l += n * j;
  u += n * U;
  d += n * $;
  p += n * q;
  h += n * H;
  f += n * V;
  g += n * z;
  m += n * K;
  y += n * W;
  v += n * G;
  _ += n * Q;
  b += n * J;
  w += n * Y;
  a += (n = t[2]) * M;
  c += n * B;
  l += n * F;
  u += n * j;
  d += n * U;
  p += n * $;
  h += n * q;
  f += n * H;
  g += n * V;
  m += n * z;
  y += n * K;
  v += n * W;
  _ += n * G;
  b += n * Q;
  w += n * J;
  C += n * Y;
  c += (n = t[3]) * M;
  l += n * B;
  u += n * F;
  d += n * j;
  p += n * U;
  h += n * $;
  f += n * q;
  g += n * H;
  m += n * V;
  y += n * z;
  v += n * K;
  _ += n * W;
  b += n * G;
  w += n * Q;
  C += n * J;
  E += n * Y;
  l += (n = t[4]) * M;
  u += n * B;
  d += n * F;
  p += n * j;
  h += n * U;
  f += n * $;
  g += n * q;
  m += n * H;
  y += n * V;
  v += n * z;
  _ += n * K;
  b += n * W;
  w += n * G;
  C += n * Q;
  E += n * J;
  T += n * Y;
  u += (n = t[5]) * M;
  d += n * B;
  p += n * F;
  h += n * j;
  f += n * U;
  g += n * $;
  m += n * q;
  y += n * H;
  v += n * V;
  _ += n * z;
  b += n * K;
  w += n * W;
  C += n * G;
  E += n * Q;
  T += n * J;
  S += n * Y;
  d += (n = t[6]) * M;
  p += n * B;
  h += n * F;
  f += n * j;
  g += n * U;
  m += n * $;
  y += n * q;
  v += n * H;
  _ += n * V;
  b += n * z;
  w += n * K;
  C += n * W;
  E += n * G;
  T += n * Q;
  S += n * J;
  x += n * Y;
  p += (n = t[7]) * M;
  h += n * B;
  f += n * F;
  g += n * j;
  m += n * U;
  y += n * $;
  v += n * q;
  _ += n * H;
  b += n * V;
  w += n * z;
  C += n * K;
  E += n * W;
  T += n * G;
  S += n * Q;
  x += n * J;
  k += n * Y;
  h += (n = t[8]) * M;
  f += n * B;
  g += n * F;
  m += n * j;
  y += n * U;
  v += n * $;
  _ += n * q;
  b += n * H;
  w += n * V;
  C += n * z;
  E += n * K;
  T += n * W;
  S += n * G;
  x += n * Q;
  k += n * J;
  I += n * Y;
  f += (n = t[9]) * M;
  g += n * B;
  m += n * F;
  y += n * j;
  v += n * U;
  _ += n * $;
  b += n * q;
  w += n * H;
  C += n * V;
  E += n * z;
  T += n * K;
  S += n * W;
  x += n * G;
  k += n * Q;
  I += n * J;
  A += n * Y;
  g += (n = t[10]) * M;
  m += n * B;
  y += n * F;
  v += n * j;
  _ += n * U;
  b += n * $;
  w += n * q;
  C += n * H;
  E += n * V;
  T += n * z;
  S += n * K;
  x += n * W;
  k += n * G;
  I += n * Q;
  A += n * J;
  P += n * Y;
  m += (n = t[11]) * M;
  y += n * B;
  v += n * F;
  _ += n * j;
  b += n * U;
  w += n * $;
  C += n * q;
  E += n * H;
  T += n * V;
  S += n * z;
  x += n * K;
  k += n * W;
  I += n * G;
  A += n * Q;
  P += n * J;
  R += n * Y;
  y += (n = t[12]) * M;
  v += n * B;
  _ += n * F;
  b += n * j;
  w += n * U;
  C += n * $;
  E += n * q;
  T += n * H;
  S += n * V;
  x += n * z;
  k += n * K;
  I += n * W;
  A += n * G;
  P += n * Q;
  R += n * J;
  N += n * Y;
  v += (n = t[13]) * M;
  _ += n * B;
  b += n * F;
  w += n * j;
  C += n * U;
  E += n * $;
  T += n * q;
  S += n * H;
  x += n * V;
  k += n * z;
  I += n * K;
  A += n * W;
  P += n * G;
  R += n * Q;
  N += n * J;
  O += n * Y;
  _ += (n = t[14]) * M;
  b += n * B;
  w += n * F;
  C += n * j;
  E += n * U;
  T += n * $;
  S += n * q;
  x += n * H;
  k += n * V;
  I += n * z;
  A += n * K;
  P += n * W;
  R += n * G;
  N += n * Q;
  O += n * J;
  L += n * Y;
  b += (n = t[15]) * M;
  s += 38 * (C += n * F);
  a += 38 * (E += n * j);
  c += 38 * (T += n * U);
  l += 38 * (S += n * $);
  u += 38 * (x += n * q);
  d += 38 * (k += n * H);
  p += 38 * (I += n * V);
  h += 38 * (A += n * z);
  f += 38 * (P += n * K);
  g += 38 * (R += n * W);
  m += 38 * (N += n * G);
  y += 38 * (O += n * Q);
  v += 38 * (L += n * J);
  _ += 38 * (D += n * Y);
  o =
    (n = (o += 38 * (w += n * B)) + (i = 1) + 65535) -
    65536 * (i = Math.floor(n / 65536));
  s = (n = s + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  a = (n = a + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  c = (n = c + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  l = (n = l + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  u = (n = u + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  d = (n = d + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  p = (n = p + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  h = (n = h + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  f = (n = f + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  g = (n = g + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  m = (n = m + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  y = (n = y + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  v = (n = v + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  _ = (n = _ + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  b = (n = b + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  o =
    (n = (o += i - 1 + 37 * (i - 1)) + (i = 1) + 65535) -
    65536 * (i = Math.floor(n / 65536));
  s = (n = s + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  a = (n = a + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  c = (n = c + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  l = (n = l + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  u = (n = u + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  d = (n = d + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  p = (n = p + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  h = (n = h + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  f = (n = f + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  g = (n = g + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  m = (n = m + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  y = (n = y + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  v = (n = v + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  _ = (n = _ + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  b = (n = b + i + 65535) - 65536 * (i = Math.floor(n / 65536));
  o += i - 1 + 37 * (i - 1);
  e[0] = o;
  e[1] = s;
  e[2] = a;
  e[3] = c;
  e[4] = l;
  e[5] = u;
  e[6] = d;
  e[7] = p;
  e[8] = h;
  e[9] = f;
  e[10] = g;
  e[11] = m;
  e[12] = y;
  e[13] = v;
  e[14] = _;
  e[15] = b;
}