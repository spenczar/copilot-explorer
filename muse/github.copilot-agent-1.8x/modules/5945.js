var n = require(56105);
require(91183);
require(56827);
(module.exports = n.hmac = n.hmac || {}).create = function () {
  var e = null;
  var t = null;
  var r = null;
  var i = null;
  var o = {
    start: function (o, s) {
      if (null !== o)
        if ("string" == typeof o) {
          if (!((o = o.toLowerCase()) in n.md.algorithms))
            throw new Error('Unknown hash algorithm "' + o + '"');
          t = n.md.algorithms[o].create();
        } else t = o;
      if (null === s) s = e;
      else {
        if ("string" == typeof s) s = n.util.createBuffer(s);
        else if (n.util.isArray(s)) {
          var a = s;
          s = n.util.createBuffer();
          for (var c = 0; c < a.length; ++c) s.putByte(a[c]);
        }
        var l = s.length();
        for (
          l > t.blockLength &&
            (t.start(), t.update(s.bytes()), (s = t.digest())),
            r = n.util.createBuffer(),
            i = n.util.createBuffer(),
            l = s.length(),
            c = 0;
          c < l;
          ++c
        ) {
          a = s.at(c);
          r.putByte(54 ^ a);
          i.putByte(92 ^ a);
        }
        if (l < t.blockLength)
          for (a = t.blockLength - l, c = 0; c < a; ++c) {
            r.putByte(54);
            i.putByte(92);
          }
        e = s;
        r = r.bytes();
        i = i.bytes();
      }
      t.start();
      t.update(r);
    },
    update: function (e) {
      t.update(e);
    },
    getMac: function () {
      var e = t.digest().bytes();
      t.start();
      t.update(i);
      t.update(e);
      return t.digest();
    },
  };
  o.digest = o.getMac;
  return o;
};