var M_OptionsManager_maybe = require("OptionsManager");
require("HMAC-Crypto-Utils");
require("md-algorithms-module");
require("binary-data-reader");
var M_crypto;
var o = (M_OptionsManager_maybe.pkcs5 = M_OptionsManager_maybe.pkcs5 || {});
if (
  M_OptionsManager_maybe.util.isNodejs &&
  !M_OptionsManager_maybe.options.usePureJavaScript
) {
  M_crypto = require("crypto");
}
module.exports =
  M_OptionsManager_maybe.pbkdf2 =
  o.pbkdf2 =
    function (e, t, r, o, s, a) {
      if ("function" == typeof s) {
        a = s;
        s = null;
      }
      if (
        M_OptionsManager_maybe.util.isNodejs &&
        !M_OptionsManager_maybe.options.usePureJavaScript &&
        M_crypto.pbkdf2 &&
        (null === s || "object" != typeof s) &&
        (M_crypto.pbkdf2Sync.length > 4 || !s || "sha1" === s)
      )
        return (
          "string" != typeof s && (s = "sha1"),
          (e = Buffer.from(e, "binary")),
          (t = Buffer.from(t, "binary")),
          a
            ? 4 === M_crypto.pbkdf2Sync.length
              ? M_crypto.pbkdf2(e, t, r, o, function (e, t) {
                  if (e) return a(e);
                  a(null, t.toString("binary"));
                })
              : M_crypto.pbkdf2(e, t, r, o, s, function (e, t) {
                  if (e) return a(e);
                  a(null, t.toString("binary"));
                })
            : 4 === M_crypto.pbkdf2Sync.length
            ? M_crypto.pbkdf2Sync(e, t, r, o).toString("binary")
            : M_crypto.pbkdf2Sync(e, t, r, o, s).toString("binary")
        );
      if (null == s) {
        s = "sha1";
      }
      if ("string" == typeof s) {
        if (!(s in M_OptionsManager_maybe.md.algorithms))
          throw new Error("Unknown hash algorithm: " + s);
        s = M_OptionsManager_maybe.md[s].create();
      }
      var c = s.digestLength;
      if (o > 4294967295 * c) {
        var l = new Error("Derived key is too long.");
        if (a) return a(l);
        throw l;
      }
      var u = Math.ceil(o / c);
      var d = o - (u - 1) * c;
      var p = M_OptionsManager_maybe.hmac.create();
      p.start(s, e);
      var h;
      var f;
      var g;
      var m = "";
      if (!a) {
        for (var y = 1; y <= u; ++y) {
          p.start(null, null);
          p.update(t);
          p.update(M_OptionsManager_maybe.util.int32ToBytes(y));
          h = g = p.digest().getBytes();
          for (var v = 2; v <= r; ++v) {
            p.start(null, null);
            p.update(g);
            f = p.digest().getBytes();
            h = M_OptionsManager_maybe.util.xorBytes(h, f, c);
            g = f;
          }
          m += y < u ? h : h.substr(0, d);
        }
        return m;
      }
      function _() {
        if (y > u) return a(null, m);
        p.start(null, null);
        p.update(t);
        p.update(M_OptionsManager_maybe.util.int32ToBytes(y));
        h = g = p.digest().getBytes();
        v = 2;
        b();
      }
      function b() {
        if (v <= r) {
          p.start(null, null);
          p.update(g);
          f = p.digest().getBytes();
          h = M_OptionsManager_maybe.util.xorBytes(h, f, c);
          g = f;
          ++v;
          return M_OptionsManager_maybe.util.setImmediate(b);
        }
        m += y < u ? h : h.substr(0, d);
        ++y;
        _();
      }
      y = 1;
      _();
    };
