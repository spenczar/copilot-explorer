var n;
n = require(58112);
require(78976);
n.pad.Iso97971 = {
  pad: function (e, t) {
    e.concat(n.lib.WordArray.create([2147483648], 1));
    n.pad.ZeroPadding.pad(e, t);
  },
  unpad: function (e) {
    n.pad.ZeroPadding.unpad(e);
    e.sigBytes--;
  },
};
module.exports = n.pad.Iso97971;