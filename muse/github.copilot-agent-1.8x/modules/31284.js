var n;
var i;
var o;
var s;
var a;
var c;
var l;
var u;
i = (n = u = require(58112)).lib;
o = i.WordArray;
s = i.Hasher;
a = n.algo;
c = [];
l = a.SHA1 = s.extend({
  _doReset: function () {
    this._hash = new o.init([
      1732584193, 4023233417, 2562383102, 271733878, 3285377520,
    ]);
  },
  _doProcessBlock: function (e, t) {
    for (
      r = this._hash.words,
        n = r[0],
        i = r[1],
        o = r[2],
        s = r[3],
        a = r[4],
        l = 0,
        undefined;
      l < 80;
      l++
    ) {
      var r;
      var n;
      var i;
      var o;
      var s;
      var a;
      var l;
      if (l < 16) c[l] = 0 | e[t + l];
      else {
        var u = c[l - 3] ^ c[l - 8] ^ c[l - 14] ^ c[l - 16];
        c[l] = (u << 1) | (u >>> 31);
      }
      var d = ((n << 5) | (n >>> 27)) + a + c[l];
      d +=
        l < 20
          ? 1518500249 + ((i & o) | (~i & s))
          : l < 40
          ? 1859775393 + (i ^ o ^ s)
          : l < 60
          ? ((i & o) | (i & s) | (o & s)) - 1894007588
          : (i ^ o ^ s) - 899497514;
      a = s;
      s = o;
      o = (i << 30) | (i >>> 2);
      i = n;
      n = d;
    }
    r[0] = (r[0] + n) | 0;
    r[1] = (r[1] + i) | 0;
    r[2] = (r[2] + o) | 0;
    r[3] = (r[3] + s) | 0;
    r[4] = (r[4] + a) | 0;
  },
  _doFinalize: function () {
    var e = this._data;
    var t = e.words;
    var r = 8 * this._nDataBytes;
    var n = 8 * e.sigBytes;
    t[n >>> 5] |= 128 << (24 - (n % 32));
    t[14 + (((n + 64) >>> 9) << 4)] = Math.floor(r / 4294967296);
    t[15 + (((n + 64) >>> 9) << 4)] = r;
    e.sigBytes = 4 * t.length;
    this._process();
    return this._hash;
  },
  clone: function () {
    var e = s.clone.call(this);
    e._hash = this._hash.clone();
    return e;
  },
});
n.SHA1 = s._createHelper(l);
n.HmacSHA1 = s._createHmacHelper(l);
module.exports = u.SHA1;