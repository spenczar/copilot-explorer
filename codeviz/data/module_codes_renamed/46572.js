var M_OptionsManager_maybe = require("OptionsManager");
require("AES-Encryption-Module");
require("sha256-module");
require("PrngCreatorModule");
require("binary-data-reader");
if (M_OptionsManager_maybe.random && M_OptionsManager_maybe.random.getBytes) {
  module.exports = M_OptionsManager_maybe.random;
} else {
  (function (t) {
    var r = {};
    var i = new Array(4);
    var o = M_OptionsManager_maybe.util.createBuffer();
    function s() {
      var e = M_OptionsManager_maybe.prng.create(r);
      e.getBytes = function (t, r) {
        return e.generate(t, r);
      };
      e.getBytesSync = function (t) {
        return e.generate(t);
      };
      return e;
    }
    r.formatKey = function (e) {
      var t = M_OptionsManager_maybe.util.createBuffer(e);
      (e = new Array(4))[0] = t.getInt32();
      e[1] = t.getInt32();
      e[2] = t.getInt32();
      e[3] = t.getInt32();
      return M_OptionsManager_maybe.aes._expandKey(e, false);
    };
    r.formatSeed = function (e) {
      var t = M_OptionsManager_maybe.util.createBuffer(e);
      (e = new Array(4))[0] = t.getInt32();
      e[1] = t.getInt32();
      e[2] = t.getInt32();
      e[3] = t.getInt32();
      return e;
    };
    r.cipher = function (e, t) {
      M_OptionsManager_maybe.aes._updateBlock(e, t, i, false);
      o.putInt32(i[0]);
      o.putInt32(i[1]);
      o.putInt32(i[2]);
      o.putInt32(i[3]);
      return o.getBytes();
    };
    r.increment = function (e) {
      ++e[3];
      return e;
    };
    r.md = M_OptionsManager_maybe.md.sha256;
    var a = s();
    var c = null;
    var l = M_OptionsManager_maybe.util.globalScope;
    var u = l.crypto || l.msCrypto;
    if (u && u.getRandomValues) {
      c = function (e) {
        return u.getRandomValues(e);
      };
    }
    if (
      M_OptionsManager_maybe.options.usePureJavaScript ||
      (!M_OptionsManager_maybe.util.isNodejs && !c)
    ) {
      if (
        ("undefined" == typeof window || window.document,
        a.collectInt(+new Date(), 32),
        "undefined" != typeof navigator)
      ) {
        var d = "";
        for (var p in navigator)
          try {
            "string" == typeof navigator[p] && (d += navigator[p]);
          } catch (e) {}
        a.collect(d), (d = null);
      }
      t &&
        (t().mousemove(function (e) {
          a.collectInt(e.clientX, 16), a.collectInt(e.clientY, 16);
        }),
        t().keypress(function (e) {
          a.collectInt(e.charCode, 8);
        }));
    }
    if (M_OptionsManager_maybe.random)
      for (var p in a) M_OptionsManager_maybe.random[p] = a[p];
    else M_OptionsManager_maybe.random = a;
    M_OptionsManager_maybe.random.createInstance = s;
    module.exports = M_OptionsManager_maybe.random;
  })("undefined" != typeof jQuery ? jQuery : null);
}
