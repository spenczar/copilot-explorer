var M_SecureRandomNumberGenerator_maybe;
M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator");
require("x64WordArrayModule");
(function (e) {
  var t = M_SecureRandomNumberGenerator_maybe;
  var r = t.lib;
  var i = r.WordArray;
  var o = r.Hasher;
  var s = t.x64.Word;
  var a = t.algo;
  var c = [];
  var l = [];
  var u = [];
  !(function () {
    for (e = 1, t = 0, r = 0, undefined; r < 24; r++) {
      var e;
      var t;
      var r;
      c[e + 5 * t] = (((r + 1) * (r + 2)) / 2) % 64;
      var n = (2 * e + 3 * t) % 5;
      e = t % 5;
      t = n;
    }
    for (e = 0; e < 5; e++)
      for (t = 0; t < 5; t++) l[e + 5 * t] = t + ((2 * e + 3 * t) % 5) * 5;
    for (i = 1, o = 0, undefined; o < 24; o++) {
      var i;
      var o;
      for (a = 0, d = 0, p = 0, undefined; p < 7; p++) {
        var a;
        var d;
        var p;
        if (1 & i) {
          var h = (1 << p) - 1;
          if (h < 32) {
            d ^= 1 << h;
          } else {
            a ^= 1 << (h - 32);
          }
        }
        if (128 & i) {
          i = (i << 1) ^ 113;
        } else {
          i <<= 1;
        }
      }
      u[o] = s.create(a, d);
    }
  })();
  var d = [];
  !(function () {
    for (var e = 0; e < 25; e++) d[e] = s.create();
  })();
  var p = (a.SHA3 = o.extend({
    cfg: o.cfg.extend({
      outputLength: 512,
    }),
    _doReset: function () {
      for (e = this._state = [], t = 0, undefined; t < 25; t++) {
        var e;
        var t;
        e[t] = new s.init();
      }
      this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
    },
    _doProcessBlock: function (e, t) {
      for (
        r = this._state, n = this.blockSize / 2, i = 0, undefined;
        i < n;
        i++
      ) {
        var r;
        var n;
        var i;
        var o = e[t + 2 * i];
        var s = e[t + 2 * i + 1];
        o =
          (16711935 & ((o << 8) | (o >>> 24))) |
          (4278255360 & ((o << 24) | (o >>> 8)));
        s =
          (16711935 & ((s << 8) | (s >>> 24))) |
          (4278255360 & ((s << 24) | (s >>> 8)));
        (I = r[i]).high ^= s;
        I.low ^= o;
      }
      for (var a = 0; a < 24; a++) {
        for (var p = 0; p < 5; p++) {
          for (h = 0, f = 0, g = 0, undefined; g < 5; g++) {
            var h;
            var f;
            var g;
            h ^= (I = r[p + 5 * g]).high;
            f ^= I.low;
          }
          var m = d[p];
          m.high = h;
          m.low = f;
        }
        for (p = 0; p < 5; p++) {
          var y = d[(p + 4) % 5];
          var v = d[(p + 1) % 5];
          var _ = v.high;
          var b = v.low;
          for (
            h = y.high ^ ((_ << 1) | (b >>> 31)),
              f = y.low ^ ((b << 1) | (_ >>> 31)),
              g = 0;
            g < 5;
            g++
          ) {
            (I = r[p + 5 * g]).high ^= h;
            I.low ^= f;
          }
        }
        for (var w = 1; w < 25; w++) {
          var C = (I = r[w]).high;
          var E = I.low;
          var T = c[w];
          if (T < 32) {
            h = (C << T) | (E >>> (32 - T));
            f = (E << T) | (C >>> (32 - T));
          } else {
            h = (E << (T - 32)) | (C >>> (64 - T));
            f = (C << (T - 32)) | (E >>> (64 - T));
          }
          var S = d[l[w]];
          S.high = h;
          S.low = f;
        }
        var x = d[0];
        var k = r[0];
        for (x.high = k.high, x.low = k.low, p = 0; p < 5; p++)
          for (g = 0; g < 5; g++) {
            var I = r[(w = p + 5 * g)];
            var A = d[w];
            var P = d[((p + 1) % 5) + 5 * g];
            var R = d[((p + 2) % 5) + 5 * g];
            I.high = A.high ^ (~P.high & R.high);
            I.low = A.low ^ (~P.low & R.low);
          }
        I = r[0];
        var N = u[a];
        I.high ^= N.high;
        I.low ^= N.low;
      }
    },
    _doFinalize: function () {
      var t = this._data;
      var r = t.words;
      var n = (this._nDataBytes, 8 * t.sigBytes);
      var o = 32 * this.blockSize;
      r[n >>> 5] |= 1 << (24 - (n % 32));
      r[((e.ceil((n + 1) / o) * o) >>> 5) - 1] |= 128;
      t.sigBytes = 4 * r.length;
      this._process();
      for (
        s = this._state,
          a = this.cfg.outputLength / 8,
          c = a / 8,
          l = [],
          u = 0,
          undefined;
        u < c;
        u++
      ) {
        var s;
        var a;
        var c;
        var l;
        var u;
        var d = s[u];
        var p = d.high;
        var h = d.low;
        p =
          (16711935 & ((p << 8) | (p >>> 24))) |
          (4278255360 & ((p << 24) | (p >>> 8)));
        h =
          (16711935 & ((h << 8) | (h >>> 24))) |
          (4278255360 & ((h << 24) | (h >>> 8)));
        l.push(h);
        l.push(p);
      }
      return new i.init(l, a);
    },
    clone: function () {
      for (
        e = o.clone.call(this),
          t = e._state = this._state.slice(0),
          r = 0,
          undefined;
        r < 25;
        r++
      ) {
        var e;
        var t;
        var r;
        t[r] = t[r].clone();
      }
      return e;
    },
  }));
  t.SHA3 = o._createHelper(p);
  t.HmacSHA3 = o._createHmacHelper(p);
})(Math);
module.exports = M_SecureRandomNumberGenerator_maybe.SHA3;
