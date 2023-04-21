var M_SecureRandomNumberGenerator_maybe;
var i;
var o;
M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator");
o = (i = M_SecureRandomNumberGenerator_maybe).lib.WordArray;
i.enc.Base64 = {
  stringify: function (e) {
    var t = e.words;
    var r = e.sigBytes;
    var n = this._map;
    e.clamp();
    for (i = [], o = 0, undefined; o < r; o += 3) {
      var i;
      var o;
      for (
        s =
          (((t[o >>> 2] >>> (24 - (o % 4) * 8)) & 255) << 16) |
          (((t[(o + 1) >>> 2] >>> (24 - ((o + 1) % 4) * 8)) & 255) << 8) |
          ((t[(o + 2) >>> 2] >>> (24 - ((o + 2) % 4) * 8)) & 255),
          a = 0,
          undefined;
        a < 4 && o + 0.75 * a < r;
        a++
      ) {
        var s;
        var a;
        i.push(n.charAt((s >>> (6 * (3 - a))) & 63));
      }
    }
    var c = n.charAt(64);
    if (c) for (; i.length % 4; ) i.push(c);
    return i.join("");
  },
  parse: function (e) {
    var t = e.length;
    var r = this._map;
    var n = this._reverseMap;
    if (!n) {
      n = this._reverseMap = [];
      for (var i = 0; i < r.length; i++) n[r.charCodeAt(i)] = i;
    }
    var s = r.charAt(64);
    if (s) {
      var a = e.indexOf(s);
      if (-1 !== a) {
        t = a;
      }
    }
    return (function (e, t, r) {
      for (n = [], i = 0, s = 0, undefined; s < t; s++) {
        var n;
        var i;
        var s;
        if (s % 4) {
          var a =
            (r[e.charCodeAt(s - 1)] << ((s % 4) * 2)) |
            (r[e.charCodeAt(s)] >>> (6 - (s % 4) * 2));
          n[i >>> 2] |= a << (24 - (i % 4) * 8);
          i++;
        }
      }
      return o.create(n, i);
    })(e, t, n);
  },
  _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
};
module.exports = M_SecureRandomNumberGenerator_maybe.enc.Base64;
