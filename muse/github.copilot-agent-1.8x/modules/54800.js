var n;
var i;
i = require(58112);
require(78976);
(n = i.lib.BlockCipherMode.extend()).Encryptor = n.extend({
  processBlock: function (e, t) {
    this._cipher.encryptBlock(e, t);
  },
});
n.Decryptor = n.extend({
  processBlock: function (e, t) {
    this._cipher.decryptBlock(e, t);
  },
});
i.mode.ECB = n;
module.exports = i.mode.ECB;