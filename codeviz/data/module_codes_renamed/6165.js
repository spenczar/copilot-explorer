var n;
var i;
var o;
var s;
var a;
var c;
var l;
var M_SecureRandomNumberGenerator_maybe;
M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator");
require("SHA1-Hasher-Module");
require("HMAC-Algorithm-Module");
o = (i = (n = M_SecureRandomNumberGenerator_maybe).lib).Base;
s = i.WordArray;
c = (a = n.algo).MD5;
l = a.EvpKDF = o.extend({
  cfg: o.extend({
    keySize: 4,
    hasher: c,
    iterations: 1,
  }),
  init: function (e) {
    this.cfg = this.cfg.extend(e);
  },
  compute: function (e, t) {
    for (
      n = this.cfg,
        i = n.hasher.create(),
        o = s.create(),
        a = o.words,
        c = n.keySize,
        l = n.iterations,
        undefined;
      a.length < c;

    ) {
      var r;
      var n;
      var i;
      var o;
      var a;
      var c;
      var l;
      if (r) {
        i.update(r);
      }
      r = i.update(e).finalize(t);
      i.reset();
      for (var u = 1; u < l; u++) {
        r = i.finalize(r);
        i.reset();
      }
      o.concat(r);
    }
    o.sigBytes = 4 * c;
    return o;
  },
});
n.EvpKDF = function (e, t, r) {
  return l.create(r).compute(e, t);
};
module.exports = M_SecureRandomNumberGenerator_maybe.EvpKDF;
