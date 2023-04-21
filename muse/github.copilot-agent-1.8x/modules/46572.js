var n = require(56105);
require(60070);
require(12262);
require(26759);
require(56827);
if (n.random && n.random.getBytes) {
  module.exports = n.random;
} else {
  (function (t) {
    var r = {};
    var i = new Array(4);
    var o = n.util.createBuffer();
    function s() {
      var e = n.prng.create(r);
      e.getBytes = function (t, r) {
        return e.generate(t, r);
      };
      e.getBytesSync = function (t) {
        return e.generate(t);
      };
      return e;
    }
    r.formatKey = function (e) {
      var t = n.util.createBuffer(e);
      (e = new Array(4))[0] = t.getInt32();
      e[1] = t.getInt32();
      e[2] = t.getInt32();
      e[3] = t.getInt32();
      return n.aes._expandKey(e, false);
    };
    r.formatSeed = function (e) {
      var t = n.util.createBuffer(e);
      (e = new Array(4))[0] = t.getInt32();
      e[1] = t.getInt32();
      e[2] = t.getInt32();
      e[3] = t.getInt32();
      return e;
    };
    r.cipher = function (e, t) {
      n.aes._updateBlock(e, t, i, false);
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
    r.md = n.md.sha256;
    var a = s();
    var c = null;
    var l = n.util.globalScope;
    var u = l.crypto || l.msCrypto;
    if (u && u.getRandomValues) {
      c = function (e) {
        return u.getRandomValues(e);
      };
    }
    if (n.options.usePureJavaScript || (!n.util.isNodejs && !c)) {
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
    if (n.random) for (var p in a) n.random[p] = a[p];
    else n.random = a;
    n.random.createInstance = s;
    module.exports = n.random;
  })("undefined" != typeof jQuery ? jQuery : null);
}