var M_OptionsManager_maybe = require("OptionsManager");
require("binary-data-reader");
require("RandomNumberGenerator");
require("BigIntegerModule");
module.exports = M_OptionsManager_maybe.kem = M_OptionsManager_maybe.kem || {};
var i = M_OptionsManager_maybe.jsbn.BigInteger;
function o(e, t, r, i) {
  e.generate = function (e, o) {
    for (
      s = new M_OptionsManager_maybe.util.ByteBuffer(),
        a = Math.ceil(o / i) + r,
        c = new M_OptionsManager_maybe.util.ByteBuffer(),
        l = r,
        undefined;
      l < a;
      ++l
    ) {
      var s;
      var a;
      var c;
      var l;
      c.putInt32(l);
      t.start();
      t.update(e + c.getBytes());
      var u = t.digest();
      s.putBytes(u.getBytes(i));
    }
    s.truncate(s.length() - o);
    return s.getBytes();
  };
}
M_OptionsManager_maybe.kem.rsa = {};
M_OptionsManager_maybe.kem.rsa.create = function (e, t) {
  var r = (t = t || {}).prng || M_OptionsManager_maybe.random;
  return {
    encrypt: function (t, o) {
      var s;
      var a = Math.ceil(t.n.bitLength() / 8);
      do {
        s = new i(
          M_OptionsManager_maybe.util.bytesToHex(r.getBytesSync(a)),
          16
        ).mod(t.n);
      } while (s.compareTo(i.ONE) <= 0);
      var c =
        a - (s = M_OptionsManager_maybe.util.hexToBytes(s.toString(16))).length;
      if (c > 0) {
        s =
          M_OptionsManager_maybe.util.fillString(String.fromCharCode(0), c) + s;
      }
      return {
        encapsulation: t.encrypt(s, "NONE"),
        key: e.generate(s, o),
      };
    },
    decrypt: function (t, r, n) {
      var i = t.decrypt(r, "NONE");
      return e.generate(i, n);
    },
  };
};
M_OptionsManager_maybe.kem.kdf1 = function (e, t) {
  o(this, e, 0, t || e.digestLength);
};
M_OptionsManager_maybe.kem.kdf2 = function (e, t) {
  o(this, e, 1, t || e.digestLength);
};
