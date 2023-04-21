var n;
var i;
var o;
var M_SecureRandomNumberGenerator_maybe;
M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator");
require("CipherModule");
i = (n = M_SecureRandomNumberGenerator_maybe).lib.CipherParams;
o = n.enc.Hex;
n.format.Hex = {
  stringify: function (e) {
    return e.ciphertext.toString(o);
  },
  parse: function (e) {
    var t = o.parse(e);
    return i.create({
      ciphertext: t,
    });
  },
};
module.exports = M_SecureRandomNumberGenerator_maybe.format.Hex;
