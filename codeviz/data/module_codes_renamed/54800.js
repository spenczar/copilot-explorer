var n;
var M_SecureRandomNumberGenerator_maybe;
M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator");
require("CipherModule");
(n =
  M_SecureRandomNumberGenerator_maybe.lib.BlockCipherMode.extend()).Encryptor =
  n.extend({
    processBlock: function (e, t) {
      this._cipher.encryptBlock(e, t);
    },
  });
n.Decryptor = n.extend({
  processBlock: function (e, t) {
    this._cipher.decryptBlock(e, t);
  },
});
M_SecureRandomNumberGenerator_maybe.mode.ECB = n;
module.exports = M_SecureRandomNumberGenerator_maybe.mode.ECB;
