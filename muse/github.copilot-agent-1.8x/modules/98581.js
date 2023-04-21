var n;
n = require(58112);
require(78976);
n.mode.CFB = (function () {
  var e = n.lib.BlockCipherMode.extend();
  function t(e, t, r, n) {
    var i;
    var o = this._iv;
    if (o) {
      i = o.slice(0);
      this._iv = undefined;
    } else {
      i = this._prevBlock;
    }
    n.encryptBlock(i, 0);
    for (var s = 0; s < r; s++) e[t + s] ^= i[s];
  }
  e.Encryptor = e.extend({
    processBlock: function (e, r) {
      var n = this._cipher;
      var i = n.blockSize;
      t.call(this, e, r, i, n);
      this._prevBlock = e.slice(r, r + i);
    },
  });
  e.Decryptor = e.extend({
    processBlock: function (e, r) {
      var n = this._cipher;
      var i = n.blockSize;
      var o = e.slice(r, r + i);
      t.call(this, e, r, i, n);
      this._prevBlock = o;
    },
  });
  return e;
})();
module.exports = n.mode.CFB;