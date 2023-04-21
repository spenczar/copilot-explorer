var n;
var i;
var o;
var s;
var a;
var M_SecureRandomNumberGenerator_maybe;
M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator");
require("SHA256-Hasher-Module");
i = (n = M_SecureRandomNumberGenerator_maybe).lib.WordArray;
o = n.algo;
s = o.SHA256;
a = o.SHA224 = s.extend({
  _doReset: function () {
    this._hash = new i.init([
      3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025,
      1694076839, 3204075428,
    ]);
  },
  _doFinalize: function () {
    var e = s._doFinalize.call(this);
    e.sigBytes -= 4;
    return e;
  },
});
n.SHA224 = s._createHelper(a);
n.HmacSHA224 = s._createHmacHelper(a);
module.exports = M_SecureRandomNumberGenerator_maybe.SHA224;
