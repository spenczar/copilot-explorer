var M_SecureRandomNumberGenerator_maybe;
M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator");
(function () {
  var e = M_SecureRandomNumberGenerator_maybe;
  var t = e.lib.WordArray;
  var r = e.enc;
  function i(e) {
    return ((e << 8) & 4278255360) | ((e >>> 8) & 16711935);
  }
  r.Utf16 = r.Utf16BE = {
    stringify: function (e) {
      for (
        t = e.words, r = e.sigBytes, n = [], i = 0, undefined;
        i < r;
        i += 2
      ) {
        var t;
        var r;
        var n;
        var i;
        var o = (t[i >>> 2] >>> (16 - (i % 4) * 8)) & 65535;
        n.push(String.fromCharCode(o));
      }
      return n.join("");
    },
    parse: function (e) {
      for (r = e.length, n = [], i = 0, undefined; i < r; i++) {
        var r;
        var n;
        var i;
        n[i >>> 1] |= e.charCodeAt(i) << (16 - (i % 2) * 16);
      }
      return t.create(n, 2 * r);
    },
  };
  r.Utf16LE = {
    stringify: function (e) {
      for (
        t = e.words, r = e.sigBytes, n = [], o = 0, undefined;
        o < r;
        o += 2
      ) {
        var t;
        var r;
        var n;
        var o;
        var s = i((t[o >>> 2] >>> (16 - (o % 4) * 8)) & 65535);
        n.push(String.fromCharCode(s));
      }
      return n.join("");
    },
    parse: function (e) {
      for (r = e.length, n = [], o = 0, undefined; o < r; o++) {
        var r;
        var n;
        var o;
        n[o >>> 1] |= i(e.charCodeAt(o) << (16 - (o % 2) * 16));
      }
      return t.create(n, 2 * r);
    },
  };
})();
module.exports = M_SecureRandomNumberGenerator_maybe.enc.Utf16;
