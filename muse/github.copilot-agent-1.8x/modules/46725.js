var n;
n = require(58112);
require(58885);
require(74678);
require(6165);
require(78976);
(function () {
  var e = n;
  var t = e.lib.BlockCipher;
  var r = e.algo;
  var i = [];
  var o = [];
  var s = [];
  var a = [];
  var c = [];
  var l = [];
  var u = [];
  var d = [];
  var p = [];
  var h = [];
  !(function () {
    for (e = [], t = 0, undefined; t < 256; t++) {
      var e;
      var t;
      e[t] = t < 128 ? t << 1 : (t << 1) ^ 283;
    }
    var r = 0;
    var n = 0;
    for (t = 0; t < 256; t++) {
      var f = n ^ (n << 1) ^ (n << 2) ^ (n << 3) ^ (n << 4);
      f = (f >>> 8) ^ (255 & f) ^ 99;
      i[r] = f;
      o[f] = r;
      var g = e[r];
      var m = e[g];
      var y = e[m];
      var v = (257 * e[f]) ^ (16843008 * f);
      s[r] = (v << 24) | (v >>> 8);
      a[r] = (v << 16) | (v >>> 16);
      c[r] = (v << 8) | (v >>> 24);
      l[r] = v;
      v = (16843009 * y) ^ (65537 * m) ^ (257 * g) ^ (16843008 * r);
      u[f] = (v << 24) | (v >>> 8);
      d[f] = (v << 16) | (v >>> 16);
      p[f] = (v << 8) | (v >>> 24);
      h[f] = v;
      if (r) {
        r = g ^ e[e[e[y ^ g]]];
        n ^= e[e[n]];
      } else {
        r = n = 1;
      }
    }
  })();
  var f = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
  var g = (r.AES = t.extend({
    _doReset: function () {
      if (!this._nRounds || this._keyPriorReset !== this._key) {
        for (
          e = this._keyPriorReset = this._key,
            t = e.words,
            r = e.sigBytes / 4,
            n = 4 * ((this._nRounds = r + 6) + 1),
            o = this._keySchedule = [],
            s = 0,
            undefined;
          s < n;
          s++
        ) {
          var e;
          var t;
          var r;
          var n;
          var o;
          var s;
          if (s < r) {
            o[s] = t[s];
          } else {
            l = o[s - 1];
            if (s % r) {
              if (r > 6 && s % r == 4) {
                l =
                  (i[l >>> 24] << 24) |
                  (i[(l >>> 16) & 255] << 16) |
                  (i[(l >>> 8) & 255] << 8) |
                  i[255 & l];
              }
            } else {
              l =
                (i[(l = (l << 8) | (l >>> 24)) >>> 24] << 24) |
                (i[(l >>> 16) & 255] << 16) |
                (i[(l >>> 8) & 255] << 8) |
                i[255 & l];
              l ^= f[(s / r) | 0] << 24;
            }
            o[s] = o[s - r] ^ l;
          }
        }
        for (a = this._invKeySchedule = [], c = 0, undefined; c < n; c++) {
          var a;
          var c;
          s = n - c;
          if (c % 4) var l = o[s];
          else l = o[s - 4];
          a[c] =
            c < 4 || s <= 4
              ? l
              : u[i[l >>> 24]] ^
                d[i[(l >>> 16) & 255]] ^
                p[i[(l >>> 8) & 255]] ^
                h[i[255 & l]];
        }
      }
    },
    encryptBlock: function (e, t) {
      this._doCryptBlock(e, t, this._keySchedule, s, a, c, l, i);
    },
    decryptBlock: function (e, t) {
      var r = e[t + 1];
      e[t + 1] = e[t + 3];
      e[t + 3] = r;
      this._doCryptBlock(e, t, this._invKeySchedule, u, d, p, h, o);
      r = e[t + 1];
      e[t + 1] = e[t + 3];
      e[t + 3] = r;
    },
    _doCryptBlock: function (e, t, r, n, i, o, s, a) {
      for (
        c = this._nRounds,
          l = e[t] ^ r[0],
          u = e[t + 1] ^ r[1],
          d = e[t + 2] ^ r[2],
          p = e[t + 3] ^ r[3],
          h = 4,
          f = 1,
          undefined;
        f < c;
        f++
      ) {
        var c;
        var l;
        var u;
        var d;
        var p;
        var h;
        var f;
        var g =
          n[l >>> 24] ^
          i[(u >>> 16) & 255] ^
          o[(d >>> 8) & 255] ^
          s[255 & p] ^
          r[h++];
        var m =
          n[u >>> 24] ^
          i[(d >>> 16) & 255] ^
          o[(p >>> 8) & 255] ^
          s[255 & l] ^
          r[h++];
        var y =
          n[d >>> 24] ^
          i[(p >>> 16) & 255] ^
          o[(l >>> 8) & 255] ^
          s[255 & u] ^
          r[h++];
        var v =
          n[p >>> 24] ^
          i[(l >>> 16) & 255] ^
          o[(u >>> 8) & 255] ^
          s[255 & d] ^
          r[h++];
        l = g;
        u = m;
        d = y;
        p = v;
      }
      g =
        ((a[l >>> 24] << 24) |
          (a[(u >>> 16) & 255] << 16) |
          (a[(d >>> 8) & 255] << 8) |
          a[255 & p]) ^
        r[h++];
      m =
        ((a[u >>> 24] << 24) |
          (a[(d >>> 16) & 255] << 16) |
          (a[(p >>> 8) & 255] << 8) |
          a[255 & l]) ^
        r[h++];
      y =
        ((a[d >>> 24] << 24) |
          (a[(p >>> 16) & 255] << 16) |
          (a[(l >>> 8) & 255] << 8) |
          a[255 & u]) ^
        r[h++];
      v =
        ((a[p >>> 24] << 24) |
          (a[(l >>> 16) & 255] << 16) |
          (a[(u >>> 8) & 255] << 8) |
          a[255 & d]) ^
        r[h++];
      e[t] = g;
      e[t + 1] = m;
      e[t + 2] = y;
      e[t + 3] = v;
    },
    keySize: 8,
  }));
  e.AES = t._createHelper(g);
})();
module.exports = n.AES;