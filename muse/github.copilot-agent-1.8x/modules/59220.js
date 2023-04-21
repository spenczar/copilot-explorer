var n;
var i;
var o;
var s;
var a;
var c;
var l;
var u;
var d;
d = require(58112);
require(31284);
require(73456);
o = (i = (n = d).lib).Base;
s = i.WordArray;
c = (a = n.algo).SHA1;
l = a.HMAC;
u = a.PBKDF2 = o.extend({
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
      r = this.cfg,
        n = l.create(r.hasher, e),
        i = s.create(),
        o = s.create([1]),
        a = i.words,
        c = o.words,
        u = r.keySize,
        d = r.iterations,
        undefined;
      a.length < u;

    ) {
      var r;
      var n;
      var i;
      var o;
      var a;
      var c;
      var u;
      var d;
      var p = n.update(t).finalize(o);
      n.reset();
      for (h = p.words, f = h.length, g = p, m = 1, undefined; m < d; m++) {
        var h;
        var f;
        var g;
        var m;
        g = n.finalize(g);
        n.reset();
        for (y = g.words, v = 0, undefined; v < f; v++) {
          var y;
          var v;
          h[v] ^= y[v];
        }
      }
      i.concat(p);
      c[0]++;
    }
    i.sigBytes = 4 * u;
    return i;
  },
});
n.PBKDF2 = function (e, t, r) {
  return u.create(r).compute(e, t);
};
module.exports = d.PBKDF2;