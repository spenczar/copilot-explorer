var n;
n = require(58112);
require(58885);
require(74678);
require(6165);
require(78976);
(function () {
  var e = n;
  var t = e.lib.StreamCipher;
  var r = e.algo;
  var i = [];
  var o = [];
  var s = [];
  var a = (r.Rabbit = t.extend({
    _doReset: function () {
      for (e = this._key.words, t = this.cfg.iv, r = 0, undefined; r < 4; r++) {
        var e;
        var t;
        var r;
        e[r] =
          (16711935 & ((e[r] << 8) | (e[r] >>> 24))) |
          (4278255360 & ((e[r] << 24) | (e[r] >>> 8)));
      }
      var n = (this._X = [
        e[0],
        (e[3] << 16) | (e[2] >>> 16),
        e[1],
        (e[0] << 16) | (e[3] >>> 16),
        e[2],
        (e[1] << 16) | (e[0] >>> 16),
        e[3],
        (e[2] << 16) | (e[1] >>> 16),
      ]);
      var i = (this._C = [
        (e[2] << 16) | (e[2] >>> 16),
        (4294901760 & e[0]) | (65535 & e[1]),
        (e[3] << 16) | (e[3] >>> 16),
        (4294901760 & e[1]) | (65535 & e[2]),
        (e[0] << 16) | (e[0] >>> 16),
        (4294901760 & e[2]) | (65535 & e[3]),
        (e[1] << 16) | (e[1] >>> 16),
        (4294901760 & e[3]) | (65535 & e[0]),
      ]);
      for (this._b = 0, r = 0; r < 4; r++) c.call(this);
      for (r = 0; r < 8; r++) i[r] ^= n[(r + 4) & 7];
      if (t) {
        var o = t.words;
        var s = o[0];
        var a = o[1];
        var l =
          (16711935 & ((s << 8) | (s >>> 24))) |
          (4278255360 & ((s << 24) | (s >>> 8)));
        var u =
          (16711935 & ((a << 8) | (a >>> 24))) |
          (4278255360 & ((a << 24) | (a >>> 8)));
        var d = (l >>> 16) | (4294901760 & u);
        var p = (u << 16) | (65535 & l);
        for (
          i[0] ^= l,
            i[1] ^= d,
            i[2] ^= u,
            i[3] ^= p,
            i[4] ^= l,
            i[5] ^= d,
            i[6] ^= u,
            i[7] ^= p,
            r = 0;
          r < 4;
          r++
        )
          c.call(this);
      }
    },
    _doProcessBlock: function (e, t) {
      var r = this._X;
      c.call(this);
      i[0] = r[0] ^ (r[5] >>> 16) ^ (r[3] << 16);
      i[1] = r[2] ^ (r[7] >>> 16) ^ (r[5] << 16);
      i[2] = r[4] ^ (r[1] >>> 16) ^ (r[7] << 16);
      i[3] = r[6] ^ (r[3] >>> 16) ^ (r[1] << 16);
      for (var n = 0; n < 4; n++) {
        i[n] =
          (16711935 & ((i[n] << 8) | (i[n] >>> 24))) |
          (4278255360 & ((i[n] << 24) | (i[n] >>> 8)));
        e[t + n] ^= i[n];
      }
    },
    blockSize: 4,
    ivSize: 2,
  }));
  function c() {
    for (e = this._X, t = this._C, r = 0, undefined; r < 8; r++) {
      var e;
      var t;
      var r;
      o[r] = t[r];
    }
    for (
      t[0] = (t[0] + 1295307597 + this._b) | 0,
        t[1] = (t[1] + 3545052371 + (t[0] >>> 0 < o[0] >>> 0 ? 1 : 0)) | 0,
        t[2] = (t[2] + 886263092 + (t[1] >>> 0 < o[1] >>> 0 ? 1 : 0)) | 0,
        t[3] = (t[3] + 1295307597 + (t[2] >>> 0 < o[2] >>> 0 ? 1 : 0)) | 0,
        t[4] = (t[4] + 3545052371 + (t[3] >>> 0 < o[3] >>> 0 ? 1 : 0)) | 0,
        t[5] = (t[5] + 886263092 + (t[4] >>> 0 < o[4] >>> 0 ? 1 : 0)) | 0,
        t[6] = (t[6] + 1295307597 + (t[5] >>> 0 < o[5] >>> 0 ? 1 : 0)) | 0,
        t[7] = (t[7] + 3545052371 + (t[6] >>> 0 < o[6] >>> 0 ? 1 : 0)) | 0,
        this._b = t[7] >>> 0 < o[7] >>> 0 ? 1 : 0,
        r = 0;
      r < 8;
      r++
    ) {
      var n = e[r] + t[r];
      var i = 65535 & n;
      var a = n >>> 16;
      var c = ((((i * i) >>> 17) + i * a) >>> 15) + a * a;
      var l = (((4294901760 & n) * n) | 0) + (((65535 & n) * n) | 0);
      s[r] = c ^ l;
    }
    e[0] =
      (s[0] + ((s[7] << 16) | (s[7] >>> 16)) + ((s[6] << 16) | (s[6] >>> 16))) |
      0;
    e[1] = (s[1] + ((s[0] << 8) | (s[0] >>> 24)) + s[7]) | 0;
    e[2] =
      (s[2] + ((s[1] << 16) | (s[1] >>> 16)) + ((s[0] << 16) | (s[0] >>> 16))) |
      0;
    e[3] = (s[3] + ((s[2] << 8) | (s[2] >>> 24)) + s[1]) | 0;
    e[4] =
      (s[4] + ((s[3] << 16) | (s[3] >>> 16)) + ((s[2] << 16) | (s[2] >>> 16))) |
      0;
    e[5] = (s[5] + ((s[4] << 8) | (s[4] >>> 24)) + s[3]) | 0;
    e[6] =
      (s[6] + ((s[5] << 16) | (s[5] >>> 16)) + ((s[4] << 16) | (s[4] >>> 16))) |
      0;
    e[7] = (s[7] + ((s[6] << 8) | (s[6] >>> 24)) + s[5]) | 0;
  }
  e.Rabbit = t._createHelper(a);
})();
module.exports = n.Rabbit;