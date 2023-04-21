var n;
n = require(58112);
require(78976);
n.pad.Iso10126 = {
  pad: function (e, t) {
    var r = 4 * t;
    var i = r - (e.sigBytes % r);
    e.concat(n.lib.WordArray.random(i - 1)).concat(
      n.lib.WordArray.create([i << 24], 1)
    );
  },
  unpad: function (e) {
    var t = 255 & e.words[(e.sigBytes - 1) >>> 2];
    e.sigBytes -= t;
  },
};
module.exports = n.pad.Iso10126;