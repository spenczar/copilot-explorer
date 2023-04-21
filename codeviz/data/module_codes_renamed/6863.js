var M_SecureRandomNumberGenerator_maybe;
M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator");
require("CipherModule");
M_SecureRandomNumberGenerator_maybe.pad.Iso97971 = {
  pad: function (e, t) {
    e.concat(
      M_SecureRandomNumberGenerator_maybe.lib.WordArray.create([2147483648], 1)
    );
    M_SecureRandomNumberGenerator_maybe.pad.ZeroPadding.pad(e, t);
  },
  unpad: function (e) {
    M_SecureRandomNumberGenerator_maybe.pad.ZeroPadding.unpad(e);
    e.sigBytes--;
  },
};
module.exports = M_SecureRandomNumberGenerator_maybe.pad.Iso97971;
