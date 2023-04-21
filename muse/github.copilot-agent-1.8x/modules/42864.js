var n;
n = require(58112);
require(78976);
n.pad.ZeroPadding = {
  pad: function (e, t) {
    var r = 4 * t;
    e.clamp();
    e.sigBytes += r - (e.sigBytes % r || r);
  },
  unpad: function (e) {
    var t = e.words;
    var r = e.sigBytes - 1;
    for (r = e.sigBytes - 1; r >= 0; r--)
      if ((t[r >>> 2] >>> (24 - (r % 4) * 8)) & 255) {
        e.sigBytes = r + 1;
        break;
      }
  },
};
module.exports = n.pad.ZeroPadding;