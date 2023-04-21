var n;
var i;
var o;
var s;
var a;
var c;
var l;
var M_SecureRandomNumberGenerator_maybe;
M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator");
require("x64WordArrayModule");
require("Hash_Constants_Module");
i = (n = M_SecureRandomNumberGenerator_maybe).x64;
o = i.Word;
s = i.WordArray;
a = n.algo;
c = a.SHA512;
l = a.SHA384 = c.extend({
  _doReset: function () {
    this._hash = new s.init([
      new o.init(3418070365, 3238371032),
      new o.init(1654270250, 914150663),
      new o.init(2438529370, 812702999),
      new o.init(355462360, 4144912697),
      new o.init(1731405415, 4290775857),
      new o.init(2394180231, 1750603025),
      new o.init(3675008525, 1694076839),
      new o.init(1203062813, 3204075428),
    ]);
  },
  _doFinalize: function () {
    var e = c._doFinalize.call(this);
    e.sigBytes -= 16;
    return e;
  },
});
n.SHA384 = c._createHelper(l);
n.HmacSHA384 = c._createHmacHelper(l);
module.exports = M_SecureRandomNumberGenerator_maybe.SHA384;
