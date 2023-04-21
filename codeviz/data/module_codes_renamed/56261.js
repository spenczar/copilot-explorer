var M_SecureRandomNumberGenerator_maybe;
M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator");
require("CipherModule");
M_SecureRandomNumberGenerator_maybe.pad.NoPadding = {
  pad: function () {},
  unpad: function () {},
};
module.exports = M_SecureRandomNumberGenerator_maybe.pad.NoPadding;
