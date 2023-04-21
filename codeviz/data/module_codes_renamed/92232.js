var M_SecureRandomNumberGenerator_maybe;
M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator");
(function (e) {
  var t = M_SecureRandomNumberGenerator_maybe;
  var r = t.lib;
  var i = r.WordArray;
  var o = r.Hasher;
  var s = t.algo;
  var a = [];
  var c = [];
  !(function () {
    function t(t) {
      for (r = e.sqrt(t), n = 2, undefined; n <= r; n++) {
        var r;
        var n;
        if (!(t % n)) return false;
      }
      return true;
    }
    function r(e) {
      return (4294967296 * (e - (0 | e))) | 0;
    }
    for (n = 2, i = 0, undefined; i < 64; ) {
      var n;
      var i;
      if (t(n)) {
        if (i < 8) {
          a[i] = r(e.pow(n, 0.5));
        }
        c[i] = r(e.pow(n, 1 / 3));
        i++;
      }
      n++;
    }
  })();
  var l = [];
  var u = (s.SHA256 = o.extend({
    _doReset: function () {
      this._hash = new i.init(a.slice(0));
    },
    _doProcessBlock: function (e, t) {
      for (
        r = this._hash.words,
          n = r[0],
          i = r[1],
          o = r[2],
          s = r[3],
          a = r[4],
          u = r[5],
          d = r[6],
          p = r[7],
          h = 0,
          undefined;
        h < 64;
        h++
      ) {
        var r;
        var n;
        var i;
        var o;
        var s;
        var a;
        var u;
        var d;
        var p;
        var h;
        if (h < 16) l[h] = 0 | e[t + h];
        else {
          var f = l[h - 15];
          var g =
            ((f << 25) | (f >>> 7)) ^ ((f << 14) | (f >>> 18)) ^ (f >>> 3);
          var m = l[h - 2];
          var y =
            ((m << 15) | (m >>> 17)) ^ ((m << 13) | (m >>> 19)) ^ (m >>> 10);
          l[h] = g + l[h - 7] + y + l[h - 16];
        }
        var v = (n & i) ^ (n & o) ^ (i & o);
        var _ =
          ((n << 30) | (n >>> 2)) ^
          ((n << 19) | (n >>> 13)) ^
          ((n << 10) | (n >>> 22));
        var b =
          p +
          (((a << 26) | (a >>> 6)) ^
            ((a << 21) | (a >>> 11)) ^
            ((a << 7) | (a >>> 25))) +
          ((a & u) ^ (~a & d)) +
          c[h] +
          l[h];
        p = d;
        d = u;
        u = a;
        a = (s + b) | 0;
        s = o;
        o = i;
        i = n;
        n = (b + (_ + v)) | 0;
      }
      r[0] = (r[0] + n) | 0;
      r[1] = (r[1] + i) | 0;
      r[2] = (r[2] + o) | 0;
      r[3] = (r[3] + s) | 0;
      r[4] = (r[4] + a) | 0;
      r[5] = (r[5] + u) | 0;
      r[6] = (r[6] + d) | 0;
      r[7] = (r[7] + p) | 0;
    },
    _doFinalize: function () {
      var t = this._data;
      var r = t.words;
      var n = 8 * this._nDataBytes;
      var i = 8 * t.sigBytes;
      r[i >>> 5] |= 128 << (24 - (i % 32));
      r[14 + (((i + 64) >>> 9) << 4)] = e.floor(n / 4294967296);
      r[15 + (((i + 64) >>> 9) << 4)] = n;
      t.sigBytes = 4 * r.length;
      this._process();
      return this._hash;
    },
    clone: function () {
      var e = o.clone.call(this);
      e._hash = this._hash.clone();
      return e;
    },
  }));
  t.SHA256 = o._createHelper(u);
  t.HmacSHA256 = o._createHmacHelper(u);
})(Math);
module.exports = M_SecureRandomNumberGenerator_maybe.SHA256;
