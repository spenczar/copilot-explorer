var n;
var i;
var o;
var s;
s = require(58112);
require(78976);
i = (n = s).lib.CipherParams;
o = n.enc.Hex;
n.format.Hex = {
  stringify: function (e) {
    return e.ciphertext.toString(o);
  },
  parse: function (e) {
    var t = o.parse(e);
    return i.create({
      ciphertext: t,
    });
  },
};
module.exports = s.format.Hex;