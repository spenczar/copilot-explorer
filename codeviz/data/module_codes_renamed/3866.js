var M_SecureRandomNumberGenerator_maybe;
M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator");
require("CipherModule");
M_SecureRandomNumberGenerator_maybe.pad.AnsiX923 = {
  pad: function (e, t) {
    var r = e.sigBytes;
    var n = 4 * t;
    var i = n - (r % n);
    var o = r + i - 1;
    e.clamp();
    e.words[o >>> 2] |= i << (24 - (o % 4) * 8);
    e.sigBytes += i;
  },
  unpad: function (e) {
    var t = 255 & e.words[(e.sigBytes - 1) >>> 2];
    e.sigBytes -= t;
  },
};
module.exports = M_SecureRandomNumberGenerator_maybe.pad.Ansix923;
