var n = require(56105);
require(56827);
n.mgf = n.mgf || {};
(module.exports = n.mgf.mgf1 = n.mgf1 = n.mgf1 || {}).create = function (e) {
  return {
    generate: function (t, r) {
      for (
        i = new n.util.ByteBuffer(),
          o = Math.ceil(r / e.digestLength),
          s = 0,
          undefined;
        s < o;
        s++
      ) {
        var i;
        var o;
        var s;
        var a = new n.util.ByteBuffer();
        a.putInt32(s);
        e.start();
        e.update(t + a.getBytes());
        i.putBuffer(e.digest());
      }
      i.truncate(i.length() - r);
      return i.getBytes();
    },
  };
};