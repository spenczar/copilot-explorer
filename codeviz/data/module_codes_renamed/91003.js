var M_OptionsManager_maybe = require("OptionsManager");
require("binary-data-reader");
M_OptionsManager_maybe.mgf = M_OptionsManager_maybe.mgf || {};
(module.exports =
  M_OptionsManager_maybe.mgf.mgf1 =
  M_OptionsManager_maybe.mgf1 =
    M_OptionsManager_maybe.mgf1 || {}).create = function (e) {
  return {
    generate: function (t, r) {
      for (
        i = new M_OptionsManager_maybe.util.ByteBuffer(),
          o = Math.ceil(r / e.digestLength),
          s = 0,
          undefined;
        s < o;
        s++
      ) {
        var i;
        var o;
        var s;
        var a = new M_OptionsManager_maybe.util.ByteBuffer();
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
