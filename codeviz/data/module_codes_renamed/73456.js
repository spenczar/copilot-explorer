var M_SecureRandomNumberGenerator_maybe;
var i;
var o;
i =
  (M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator"))
    .lib.Base;
o = M_SecureRandomNumberGenerator_maybe.enc.Utf8;
module.exports = void (M_SecureRandomNumberGenerator_maybe.algo.HMAC = i.extend(
  {
    init: function (e, t) {
      (e = this._hasher = new e.init()),
        "string" == typeof t && (t = o.parse(t));
      var r = e.blockSize,
        n = 4 * r;
      t.sigBytes > n && (t = e.finalize(t)), t.clamp();
      for (
        var i = (this._oKey = t.clone()),
          s = (this._iKey = t.clone()),
          a = i.words,
          c = s.words,
          l = 0;
        l < r;
        l++
      )
        (a[l] ^= 1549556828), (c[l] ^= 909522486);
      (i.sigBytes = s.sigBytes = n), this.reset();
    },
    reset: function () {
      var e = this._hasher;
      e.reset(), e.update(this._iKey);
    },
    update: function (e) {
      return this._hasher.update(e), this;
    },
    finalize: function (e) {
      var t = this._hasher,
        r = t.finalize(e);
      return t.reset(), t.finalize(this._oKey.clone().concat(r));
    },
  }
));
