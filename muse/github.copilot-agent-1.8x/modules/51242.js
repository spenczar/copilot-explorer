var n = require(56105);
require(46572);
require(56827);
(module.exports = n.pss = n.pss || {}).create = function (e) {
  if (3 === arguments.length) {
    e = {
      md: arguments[0],
      mgf: arguments[1],
      saltLength: arguments[2],
    };
  }
  var t;
  var r = e.md;
  var i = e.mgf;
  var o = r.digestLength;
  var s = e.salt || null;
  if ("string" == typeof s) {
    s = n.util.createBuffer(s);
  }
  if ("saltLength" in e) t = e.saltLength;
  else {
    if (null === s)
      throw new Error("Salt length not specified or specific salt not given.");
    t = s.length();
  }
  if (null !== s && s.length() !== t)
    throw new Error("Given salt length does not match length of given salt.");
  var a = e.prng || n.random;
  var c = {
    encode: function (e, c) {
      var l;
      var u;
      var d = c - 1;
      var p = Math.ceil(d / 8);
      var h = e.digest().getBytes();
      if (p < o + t + 2) throw new Error("Message is too long to encrypt.");
      u = null === s ? a.getBytesSync(t) : s.bytes();
      var f = new n.util.ByteBuffer();
      f.fillWithByte(0, 8);
      f.putBytes(h);
      f.putBytes(u);
      r.start();
      r.update(f.getBytes());
      var g = r.digest().getBytes();
      var m = new n.util.ByteBuffer();
      m.fillWithByte(0, p - t - o - 2);
      m.putByte(1);
      m.putBytes(u);
      var y = m.getBytes();
      var v = p - o - 1;
      var _ = i.generate(g, v);
      var b = "";
      for (l = 0; l < v; l++)
        b += String.fromCharCode(y.charCodeAt(l) ^ _.charCodeAt(l));
      var w = (65280 >> (8 * p - d)) & 255;
      return (
        (b = String.fromCharCode(b.charCodeAt(0) & ~w) + b.substr(1)) +
        g +
        String.fromCharCode(188)
      );
    },
    verify: function (e, s, a) {
      var c;
      var l = a - 1;
      var u = Math.ceil(l / 8);
      s = s.substr(-u);
      if (u < o + t + 2)
        throw new Error(
          "Inconsistent parameters to PSS signature verification."
        );
      if (188 !== s.charCodeAt(u - 1))
        throw new Error("Encoded message does not end in 0xBC.");
      var d = u - o - 1;
      var p = s.substr(0, d);
      var h = s.substr(d, o);
      var f = (65280 >> (8 * u - l)) & 255;
      if (0 != (p.charCodeAt(0) & f))
        throw new Error("Bits beyond keysize not zero as expected.");
      var g = i.generate(h, d);
      var m = "";
      for (c = 0; c < d; c++)
        m += String.fromCharCode(p.charCodeAt(c) ^ g.charCodeAt(c));
      m = String.fromCharCode(m.charCodeAt(0) & ~f) + m.substr(1);
      var y = u - o - t - 2;
      for (c = 0; c < y; c++)
        if (0 !== m.charCodeAt(c))
          throw new Error("Leftmost octets not zero as expected");
      if (1 !== m.charCodeAt(y))
        throw new Error("Inconsistent PSS signature, 0x01 marker not found");
      var v = m.substr(-t);
      var _ = new n.util.ByteBuffer();
      _.fillWithByte(0, 8);
      _.putBytes(e);
      _.putBytes(v);
      r.start();
      r.update(_.getBytes());
      return h === r.digest().getBytes();
    },
  };
  return c;
};