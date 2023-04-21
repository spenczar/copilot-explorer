var n;
var i;
var o;
var s;
var a;
var c;
n = require(58112);
o = (i = n).lib;
s = o.Base;
a = o.WordArray;
(c = i.x64 = {}).Word = s.extend({
  init: function (e, t) {
    this.high = e;
    this.low = t;
  },
});
c.WordArray = s.extend({
  init: function (e, t) {
    e = this.words = e || [];
    this.sigBytes = null != t ? t : 8 * e.length;
  },
  toX32: function () {
    for (e = this.words, t = e.length, r = [], n = 0, undefined; n < t; n++) {
      var e;
      var t;
      var r;
      var n;
      var i = e[n];
      r.push(i.high);
      r.push(i.low);
    }
    return a.create(r, this.sigBytes);
  },
  clone: function () {
    for (
      e = s.clone.call(this),
        t = e.words = this.words.slice(0),
        r = t.length,
        n = 0,
        undefined;
      n < r;
      n++
    ) {
      var e;
      var t;
      var r;
      var n;
      t[n] = t[n].clone();
    }
    return e;
  },
});
module.exports = n;