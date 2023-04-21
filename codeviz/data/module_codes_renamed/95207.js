var n;
var i;
var M_SecureRandomNumberGenerator_maybe;
M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator");
require("CipherModule");
i = (n =
  M_SecureRandomNumberGenerator_maybe.lib.BlockCipherMode.extend()).Encryptor =
  n.extend({
    processBlock: function (e, t) {
      var r = this._cipher;
      var n = r.blockSize;
      var i = this._iv;
      var o = this._keystream;
      if (i) {
        o = this._keystream = i.slice(0);
        this._iv = undefined;
      }
      r.encryptBlock(o, 0);
      for (var s = 0; s < n; s++) e[t + s] ^= o[s];
    },
  });
n.Decryptor = i;
M_SecureRandomNumberGenerator_maybe.mode.OFB = n;
module.exports = M_SecureRandomNumberGenerator_maybe.mode.OFB;
