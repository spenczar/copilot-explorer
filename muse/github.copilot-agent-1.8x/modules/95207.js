var n;
var i;
var o;
o = require(58112);
require(78976);
i = (n = o.lib.BlockCipherMode.extend()).Encryptor = n.extend({
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
o.mode.OFB = n;
module.exports = o.mode.OFB;