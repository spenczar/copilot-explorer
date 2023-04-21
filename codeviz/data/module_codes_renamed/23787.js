var M_SecureRandomNumberGenerator_maybe;
M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator");
(function (e) {
  var t = M_SecureRandomNumberGenerator_maybe;
  var r = t.lib;
  var i = r.WordArray;
  var o = r.Hasher;
  var s = t.algo;
  var a = i.create([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6,
    15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13,
    11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9,
    7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
  ]);
  var c = i.create([
    5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5,
    10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10,
    0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10,
    4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
  ]);
  var l = i.create([
    11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9,
    7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13,
    6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9,
    15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6,
  ]);
  var u = i.create([
    8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8,
    9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14,
    13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5,
    12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
  ]);
  var d = i.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
  var p = i.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
  var h = (s.RIPEMD160 = o.extend({
    _doReset: function () {
      this._hash = i.create([
        1732584193, 4023233417, 2562383102, 271733878, 3285377520,
      ]);
    },
    _doProcessBlock: function (e, t) {
      for (var r = 0; r < 16; r++) {
        var n = t + r;
        var i = e[n];
        e[n] =
          (16711935 & ((i << 8) | (i >>> 24))) |
          (4278255360 & ((i << 24) | (i >>> 8)));
      }
      var o;
      var s;
      var h;
      var b;
      var w;
      var C;
      var E;
      var T;
      var S;
      var x;
      var k;
      var I = this._hash.words;
      var A = d.words;
      var P = p.words;
      var R = a.words;
      var N = c.words;
      var O = l.words;
      var L = u.words;
      for (
        C = o = I[0],
          E = s = I[1],
          T = h = I[2],
          S = b = I[3],
          x = w = I[4],
          r = 0;
        r < 80;
        r += 1
      ) {
        k = (o + e[t + R[r]]) | 0;
        k +=
          r < 16
            ? f(s, h, b) + A[0]
            : r < 32
            ? g(s, h, b) + A[1]
            : r < 48
            ? m(s, h, b) + A[2]
            : r < 64
            ? y(s, h, b) + A[3]
            : v(s, h, b) + A[4];
        k = ((k = _((k |= 0), O[r])) + w) | 0;
        o = w;
        w = b;
        b = _(h, 10);
        h = s;
        s = k;
        k = (C + e[t + N[r]]) | 0;
        k +=
          r < 16
            ? v(E, T, S) + P[0]
            : r < 32
            ? y(E, T, S) + P[1]
            : r < 48
            ? m(E, T, S) + P[2]
            : r < 64
            ? g(E, T, S) + P[3]
            : f(E, T, S) + P[4];
        k = ((k = _((k |= 0), L[r])) + x) | 0;
        C = x;
        x = S;
        S = _(T, 10);
        T = E;
        E = k;
      }
      k = (I[1] + h + S) | 0;
      I[1] = (I[2] + b + x) | 0;
      I[2] = (I[3] + w + C) | 0;
      I[3] = (I[4] + o + E) | 0;
      I[4] = (I[0] + s + T) | 0;
      I[0] = k;
    },
    _doFinalize: function () {
      var e = this._data;
      var t = e.words;
      var r = 8 * this._nDataBytes;
      var n = 8 * e.sigBytes;
      t[n >>> 5] |= 128 << (24 - (n % 32));
      t[14 + (((n + 64) >>> 9) << 4)] =
        (16711935 & ((r << 8) | (r >>> 24))) |
        (4278255360 & ((r << 24) | (r >>> 8)));
      e.sigBytes = 4 * (t.length + 1);
      this._process();
      for (i = this._hash, o = i.words, s = 0, undefined; s < 5; s++) {
        var i;
        var o;
        var s;
        var a = o[s];
        o[s] =
          (16711935 & ((a << 8) | (a >>> 24))) |
          (4278255360 & ((a << 24) | (a >>> 8)));
      }
      return i;
    },
    clone: function () {
      var e = o.clone.call(this);
      e._hash = this._hash.clone();
      return e;
    },
  }));
  function f(e, t, r) {
    return e ^ t ^ r;
  }
  function g(e, t, r) {
    return (e & t) | (~e & r);
  }
  function m(e, t, r) {
    return (e | ~t) ^ r;
  }
  function y(e, t, r) {
    return (e & r) | (t & ~r);
  }
  function v(e, t, r) {
    return e ^ (t | ~r);
  }
  function _(e, t) {
    return (e << t) | (e >>> (32 - t));
  }
  t.RIPEMD160 = o._createHelper(h);
  t.HmacRIPEMD160 = o._createHmacHelper(h);
})(Math);
module.exports = M_SecureRandomNumberGenerator_maybe.RIPEMD160;
