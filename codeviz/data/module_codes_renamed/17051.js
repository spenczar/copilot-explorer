var M_SecureRandomNumberGenerator_maybe;
M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator");
require("CipherModule");
M_SecureRandomNumberGenerator_maybe.pad.Iso10126 = {
  pad: function (e, t) {
    var r = 4 * t;
    var i = r - (e.sigBytes % r);
    e.concat(
      M_SecureRandomNumberGenerator_maybe.lib.WordArray.random(i - 1)
    ).concat(
      M_SecureRandomNumberGenerator_maybe.lib.WordArray.create([i << 24], 1)
    );
  },
  unpad: function (e) {
    var t = 255 & e.words[(e.sigBytes - 1) >>> 2];
    e.sigBytes -= t;
  },
};
module.exports = M_SecureRandomNumberGenerator_maybe.pad.Iso10126;
