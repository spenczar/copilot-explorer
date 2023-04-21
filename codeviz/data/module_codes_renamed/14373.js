var M_SecureRandomNumberGenerator_maybe;
M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator");
require("CipherModule");
M_SecureRandomNumberGenerator_maybe.mode.CTRGladman = (function () {
  var e = M_SecureRandomNumberGenerator_maybe.lib.BlockCipherMode.extend();
  function t(e) {
    if (255 == ((e >> 24) & 255)) {
      var t = (e >> 16) & 255;
      var r = (e >> 8) & 255;
      var n = 255 & e;
      if (255 === t) {
        t = 0;
        if (255 === r) {
          r = 0;
          if (255 === n) {
            n = 0;
          } else {
            ++n;
          }
        } else {
          ++r;
        }
      } else {
        ++t;
      }
      e = 0;
      e += t << 16;
      e += r << 8;
      e += n;
    } else e += 1 << 24;
    return e;
  }
  var r = (e.Encryptor = e.extend({
    processBlock: function (e, r) {
      var n = this._cipher;
      var i = n.blockSize;
      var o = this._iv;
      var s = this._counter;
      if (o) {
        s = this._counter = o.slice(0);
        this._iv = undefined;
      }
      (function (e) {
        if (0 === (e[0] = t(e[0]))) {
          e[1] = t(e[1]);
        }
      })(s);
      var a = s.slice(0);
      n.encryptBlock(a, 0);
      for (var c = 0; c < i; c++) e[r + c] ^= a[c];
    },
  }));
  e.Decryptor = r;
  return e;
})();
module.exports = M_SecureRandomNumberGenerator_maybe.mode.CTRGladman;
