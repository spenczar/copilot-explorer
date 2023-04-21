var n = require(56105);
require(56827);
require(46572);
require(10017);
module.exports = n.kem = n.kem || {};
var i = n.jsbn.BigInteger;
function o(e, t, r, i) {
  e.generate = function (e, o) {
    for (
      s = new n.util.ByteBuffer(),
        a = Math.ceil(o / i) + r,
        c = new n.util.ByteBuffer(),
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
n.kem.rsa = {};
n.kem.rsa.create = function (e, t) {
  var r = (t = t || {}).prng || n.random;
  return {
    encrypt: function (t, o) {
      var s;
      var a = Math.ceil(t.n.bitLength() / 8);
      do {
        s = new i(n.util.bytesToHex(r.getBytesSync(a)), 16).mod(t.n);
      } while (s.compareTo(i.ONE) <= 0);
      var c = a - (s = n.util.hexToBytes(s.toString(16))).length;
      if (c > 0) {
        s = n.util.fillString(String.fromCharCode(0), c) + s;
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
n.kem.kdf1 = function (e, t) {
  o(this, e, 0, t || e.digestLength);
};
n.kem.kdf2 = function (e, t) {
  o(this, e, 1, t || e.digestLength);
};