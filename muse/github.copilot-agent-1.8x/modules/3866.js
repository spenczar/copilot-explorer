var n;
n = require(58112);
require(78976);
n.pad.AnsiX923 = {
  pad: function (e, t) {
    var r = e.sigBytes;
    var n = 4 * t;
    var i = n - (r % n);
    var o = r + i - 1;
    e.clamp();
    e.words[o >>> 2] |= i << (24 - (o % 4) * 8);
    e.sigBytes += i;
  },
  unpad: function (e) {
    var t = 255 & e.words[(e.sigBytes - 1) >>> 2];
    e.sigBytes -= t;
  },
};
module.exports = n.pad.Ansix923;