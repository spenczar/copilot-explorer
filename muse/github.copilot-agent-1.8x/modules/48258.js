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
    var o = this._counter;
    if (i) {
      o = this._counter = i.slice(0);
      this._iv = undefined;
    }
    var s = o.slice(0);
    r.encryptBlock(s, 0);
    o[n - 1] = (o[n - 1] + 1) | 0;
    for (var a = 0; a < n; a++) e[t + a] ^= s[a];
  },
});
n.Decryptor = i;
o.mode.CTR = n;
module.exports = o.mode.CTR;