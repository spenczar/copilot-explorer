var n;
n = require(58112);
(function (e) {
  var t = n;
  var r = t.lib;
  var i = r.WordArray;
  var o = r.Hasher;
  var s = t.algo;
  var a = [];
  !(function () {
    for (var t = 0; t < 64; t++) a[t] = (4294967296 * e.abs(e.sin(t + 1))) | 0;
  })();
  var c = (s.MD5 = o.extend({
    _doReset: function () {
      this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878]);
    },
    _doProcessBlock: function (e, t) {
      for (var r = 0; r < 16; r++) {
        var n = t + r;
        var i = e[n];
        e[n] =
          (16711935 & ((i << 8) | (i >>> 24))) |
          (4278255360 & ((i << 24) | (i >>> 8)));
      }
      var o = this._hash.words;
      var s = e[t + 0];
      var c = e[t + 1];
      var h = e[t + 2];
      var f = e[t + 3];
      var g = e[t + 4];
      var m = e[t + 5];
      var y = e[t + 6];
      var v = e[t + 7];
      var _ = e[t + 8];
      var b = e[t + 9];
      var w = e[t + 10];
      var C = e[t + 11];
      var E = e[t + 12];
      var T = e[t + 13];
      var S = e[t + 14];
      var x = e[t + 15];
      var k = o[0];
      var I = o[1];
      var A = o[2];
      var P = o[3];
      k = l(k, I, A, P, s, 7, a[0]);
      P = l(P, k, I, A, c, 12, a[1]);
      A = l(A, P, k, I, h, 17, a[2]);
      I = l(I, A, P, k, f, 22, a[3]);
      k = l(k, I, A, P, g, 7, a[4]);
      P = l(P, k, I, A, m, 12, a[5]);
      A = l(A, P, k, I, y, 17, a[6]);
      I = l(I, A, P, k, v, 22, a[7]);
      k = l(k, I, A, P, _, 7, a[8]);
      P = l(P, k, I, A, b, 12, a[9]);
      A = l(A, P, k, I, w, 17, a[10]);
      I = l(I, A, P, k, C, 22, a[11]);
      k = l(k, I, A, P, E, 7, a[12]);
      P = l(P, k, I, A, T, 12, a[13]);
      A = l(A, P, k, I, S, 17, a[14]);
      k = u(k, (I = l(I, A, P, k, x, 22, a[15])), A, P, c, 5, a[16]);
      P = u(P, k, I, A, y, 9, a[17]);
      A = u(A, P, k, I, C, 14, a[18]);
      I = u(I, A, P, k, s, 20, a[19]);
      k = u(k, I, A, P, m, 5, a[20]);
      P = u(P, k, I, A, w, 9, a[21]);
      A = u(A, P, k, I, x, 14, a[22]);
      I = u(I, A, P, k, g, 20, a[23]);
      k = u(k, I, A, P, b, 5, a[24]);
      P = u(P, k, I, A, S, 9, a[25]);
      A = u(A, P, k, I, f, 14, a[26]);
      I = u(I, A, P, k, _, 20, a[27]);
      k = u(k, I, A, P, T, 5, a[28]);
      P = u(P, k, I, A, h, 9, a[29]);
      A = u(A, P, k, I, v, 14, a[30]);
      k = d(k, (I = u(I, A, P, k, E, 20, a[31])), A, P, m, 4, a[32]);
      P = d(P, k, I, A, _, 11, a[33]);
      A = d(A, P, k, I, C, 16, a[34]);
      I = d(I, A, P, k, S, 23, a[35]);
      k = d(k, I, A, P, c, 4, a[36]);
      P = d(P, k, I, A, g, 11, a[37]);
      A = d(A, P, k, I, v, 16, a[38]);
      I = d(I, A, P, k, w, 23, a[39]);
      k = d(k, I, A, P, T, 4, a[40]);
      P = d(P, k, I, A, s, 11, a[41]);
      A = d(A, P, k, I, f, 16, a[42]);
      I = d(I, A, P, k, y, 23, a[43]);
      k = d(k, I, A, P, b, 4, a[44]);
      P = d(P, k, I, A, E, 11, a[45]);
      A = d(A, P, k, I, x, 16, a[46]);
      k = p(k, (I = d(I, A, P, k, h, 23, a[47])), A, P, s, 6, a[48]);
      P = p(P, k, I, A, v, 10, a[49]);
      A = p(A, P, k, I, S, 15, a[50]);
      I = p(I, A, P, k, m, 21, a[51]);
      k = p(k, I, A, P, E, 6, a[52]);
      P = p(P, k, I, A, f, 10, a[53]);
      A = p(A, P, k, I, w, 15, a[54]);
      I = p(I, A, P, k, c, 21, a[55]);
      k = p(k, I, A, P, _, 6, a[56]);
      P = p(P, k, I, A, x, 10, a[57]);
      A = p(A, P, k, I, y, 15, a[58]);
      I = p(I, A, P, k, T, 21, a[59]);
      k = p(k, I, A, P, g, 6, a[60]);
      P = p(P, k, I, A, C, 10, a[61]);
      A = p(A, P, k, I, h, 15, a[62]);
      I = p(I, A, P, k, b, 21, a[63]);
      o[0] = (o[0] + k) | 0;
      o[1] = (o[1] + I) | 0;
      o[2] = (o[2] + A) | 0;
      o[3] = (o[3] + P) | 0;
    },
    _doFinalize: function () {
      var t = this._data;
      var r = t.words;
      var n = 8 * this._nDataBytes;
      var i = 8 * t.sigBytes;
      r[i >>> 5] |= 128 << (24 - (i % 32));
      var o = e.floor(n / 4294967296);
      var s = n;
      r[15 + (((i + 64) >>> 9) << 4)] =
        (16711935 & ((o << 8) | (o >>> 24))) |
        (4278255360 & ((o << 24) | (o >>> 8)));
      r[14 + (((i + 64) >>> 9) << 4)] =
        (16711935 & ((s << 8) | (s >>> 24))) |
        (4278255360 & ((s << 24) | (s >>> 8)));
      t.sigBytes = 4 * (r.length + 1);
      this._process();
      for (a = this._hash, c = a.words, l = 0, undefined; l < 4; l++) {
        var a;
        var c;
        var l;
        var u = c[l];
        c[l] =
          (16711935 & ((u << 8) | (u >>> 24))) |
          (4278255360 & ((u << 24) | (u >>> 8)));
      }
      return a;
    },
    clone: function () {
      var e = o.clone.call(this);
      e._hash = this._hash.clone();
      return e;
    },
  }));
  function l(e, t, r, n, i, o, s) {
    var a = e + ((t & r) | (~t & n)) + i + s;
    return ((a << o) | (a >>> (32 - o))) + t;
  }
  function u(e, t, r, n, i, o, s) {
    var a = e + ((t & n) | (r & ~n)) + i + s;
    return ((a << o) | (a >>> (32 - o))) + t;
  }
  function d(e, t, r, n, i, o, s) {
    var a = e + (t ^ r ^ n) + i + s;
    return ((a << o) | (a >>> (32 - o))) + t;
  }
  function p(e, t, r, n, i, o, s) {
    var a = e + (r ^ (t | ~n)) + i + s;
    return ((a << o) | (a >>> (32 - o))) + t;
  }
  t.MD5 = o._createHelper(c);
  t.HmacMD5 = o._createHmacHelper(c);
})(Math);
module.exports = n.MD5;