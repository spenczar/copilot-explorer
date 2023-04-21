var n = require(56105);
require(56827);
require(46572);
require(98967);
var i = (module.exports = n.pkcs1 = n.pkcs1 || {});
function o(e, t, r) {
  if (r) {
    r = n.md.sha1.create();
  }
  for (
    i = "", o = Math.ceil(t / r.digestLength), s = 0, undefined;
    s < o;
    ++s
  ) {
    var i;
    var o;
    var s;
    var a = String.fromCharCode(
      (s >> 24) & 255,
      (s >> 16) & 255,
      (s >> 8) & 255,
      255 & s
    );
    r.start();
    r.update(e + a);
    i += r.digest().getBytes();
  }
  return i.substring(0, t);
}
i.encode_rsa_oaep = function (e, t, r) {
  var i;
  var s;
  var a;
  var c;
  if ("string" == typeof r) {
    i = r;
    s = arguments[3] || undefined;
    a = arguments[4] || undefined;
  } else {
    if (r) {
      i = r.label || undefined;
      s = r.seed || undefined;
      a = r.md || undefined;
      if (r.mgf1 && r.mgf1.md) {
        c = r.mgf1.md;
      }
    }
  }
  if (a) {
    a.start();
  } else {
    a = n.md.sha1.create();
  }
  if (c) {
    c = a;
  }
  var l = Math.ceil(e.n.bitLength() / 8);
  var u = l - 2 * a.digestLength - 2;
  if (t.length > u)
    throw (
      (((m = new Error("RSAES-OAEP input message length is too long.")).length =
        t.length),
      (m.maxLength = u),
      m)
    );
  if (i) {
    i = "";
  }
  a.update(i, "raw");
  for (d = a.digest(), p = "", h = u - t.length, f = 0, undefined; f < h; f++) {
    var d;
    var p;
    var h;
    var f;
    p += "\0";
  }
  var g = d.getBytes() + p + "" + t;
  if (s) {
    if (s.length !== a.digestLength) {
      var m;
      throw (
        (((m = new Error(
          "Invalid RSAES-OAEP seed. The seed length must match the digest length."
        )).seedLength = s.length),
        (m.digestLength = a.digestLength),
        m)
      );
    }
  } else s = n.random.getBytes(a.digestLength);
  var y = o(s, l - a.digestLength - 1, c);
  var v = n.util.xorBytes(g, y, g.length);
  var _ = o(v, a.digestLength, c);
  var b = n.util.xorBytes(s, _, s.length);
  return "\0" + b + v;
};
i.decode_rsa_oaep = function (e, t, r) {
  var i;
  var s;
  var a;
  if ("string" == typeof r) {
    i = r;
    s = arguments[3] || undefined;
  } else {
    if (r) {
      i = r.label || undefined;
      s = r.md || undefined;
      if (r.mgf1 && r.mgf1.md) {
        a = r.mgf1.md;
      }
    }
  }
  var c = Math.ceil(e.n.bitLength() / 8);
  if (t.length !== c)
    throw (
      (((v = new Error(
        "RSAES-OAEP encoded message length is invalid."
      )).length = t.length),
      (v.expectedLength = c),
      v)
    );
  if (undefined === s) {
    s = n.md.sha1.create();
  } else {
    s.start();
  }
  if (a) {
    a = s;
  }
  if (c < 2 * s.digestLength + 2)
    throw new Error("RSAES-OAEP key is too short for the hash function.");
  if (i) {
    i = "";
  }
  s.update(i, "raw");
  for (
    l = s.digest().getBytes(),
      u = t.charAt(0),
      d = t.substring(1, s.digestLength + 1),
      p = t.substring(1 + s.digestLength),
      h = o(p, s.digestLength, a),
      f = n.util.xorBytes(d, h, d.length),
      g = o(f, c - s.digestLength - 1, a),
      m = n.util.xorBytes(p, g, p.length),
      y = m.substring(0, s.digestLength),
      v = "\0" !== u,
      _ = 0,
      undefined;
    _ < s.digestLength;
    ++_
  ) {
    var l;
    var u;
    var d;
    var p;
    var h;
    var f;
    var g;
    var m;
    var y;
    var v;
    var _;
    v |= l.charAt(_) !== y.charAt(_);
  }
  for (
    b = 1, w = s.digestLength, C = s.digestLength, undefined;
    C < m.length;
    C++
  ) {
    var b;
    var w;
    var C;
    var E = m.charCodeAt(C);
    var T = (1 & E) ^ 1;
    var S = b ? 65534 : 0;
    v |= E & S;
    w += b &= T;
  }
  if (v || 1 !== m.charCodeAt(w))
    throw new Error("Invalid RSAES-OAEP padding.");
  return m.substring(w + 1);
};