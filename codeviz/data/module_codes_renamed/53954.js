var M_SecureRandomNumberGenerator_maybe;
M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator");
require("Base64EncodingUtils");
require("MD5-Hasher-Module");
require("EvpKDF-Module");
require("CipherModule");
(function () {
  var e = M_SecureRandomNumberGenerator_maybe;
  var t = e.lib.StreamCipher;
  var r = e.algo;
  var i = (r.RC4 = t.extend({
    _doReset: function () {
      for (
        e = this._key,
          t = e.words,
          r = e.sigBytes,
          n = this._S = [],
          i = 0,
          undefined;
        i < 256;
        i++
      ) {
        var e;
        var t;
        var r;
        var n;
        var i;
        n[i] = i;
      }
      i = 0;
      for (var o = 0; i < 256; i++) {
        var s = i % r;
        var a = (t[s >>> 2] >>> (24 - (s % 4) * 8)) & 255;
        o = (o + n[i] + a) % 256;
        var c = n[i];
        n[i] = n[o];
        n[o] = c;
      }
      this._i = this._j = 0;
    },
    _doProcessBlock: function (e, t) {
      e[t] ^= o.call(this);
    },
    keySize: 8,
    ivSize: 0,
  }));
  function o() {
    for (
      e = this._S, t = this._i, r = this._j, n = 0, i = 0, undefined;
      i < 4;
      i++
    ) {
      var e;
      var t;
      var r;
      var n;
      var i;
      r = (r + e[(t = (t + 1) % 256)]) % 256;
      var o = e[t];
      e[t] = e[r];
      e[r] = o;
      n |= e[(e[t] + e[r]) % 256] << (24 - 8 * i);
    }
    this._i = t;
    this._j = r;
    return n;
  }
  e.RC4 = t._createHelper(i);
  var s = (r.RC4Drop = i.extend({
    cfg: i.cfg.extend({
      drop: 192,
    }),
    _doReset: function () {
      i._doReset.call(this);
      for (var e = this.cfg.drop; e > 0; e--) o.call(this);
    },
  }));
  e.RC4Drop = t._createHelper(s);
})();
module.exports = M_SecureRandomNumberGenerator_maybe.RC4;
