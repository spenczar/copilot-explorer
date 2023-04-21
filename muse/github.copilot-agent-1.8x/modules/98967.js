var n = require(56105);
require(91183);
require(56827);
var i = (module.exports = n.sha1 = n.sha1 || {});
n.md.sha1 = n.md.algorithms.sha1 = i;
i.create = function () {
  if (s) {
    o = String.fromCharCode(128);
    o += n.util.fillString(String.fromCharCode(0), 64);
    s = true;
  }
  var e = null;
  var t = n.util.createBuffer();
  var r = new Array(80);
  var i = {
    algorithm: "sha1",
    blockLength: 64,
    digestLength: 20,
    messageLength: 0,
    fullMessageLength: null,
    messageLengthSize: 8,
    start: function () {
      i.messageLength = 0;
      i.fullMessageLength = i.messageLength64 = [];
      for (r = i.messageLengthSize / 4, o = 0, undefined; o < r; ++o) {
        var r;
        var o;
        i.fullMessageLength.push(0);
      }
      t = n.util.createBuffer();
      e = {
        h0: 1732584193,
        h1: 4023233417,
        h2: 2562383102,
        h3: 271733878,
        h4: 3285377520,
      };
      return i;
    },
  };
  i.start();
  i.update = function (o, s) {
    if ("utf8" === s) {
      o = n.util.encodeUtf8(o);
    }
    var c = o.length;
    i.messageLength += c;
    c = [(c / 4294967296) >>> 0, c >>> 0];
    for (var l = i.fullMessageLength.length - 1; l >= 0; --l) {
      i.fullMessageLength[l] += c[1];
      c[1] = c[0] + ((i.fullMessageLength[l] / 4294967296) >>> 0);
      i.fullMessageLength[l] = i.fullMessageLength[l] >>> 0;
      c[0] = (c[1] / 4294967296) >>> 0;
    }
    t.putBytes(o);
    a(e, r, t);
    if (t.read > 2048 || 0 === t.length()) {
      t.compact();
    }
    return i;
  };
  i.digest = function () {
    var s = n.util.createBuffer();
    s.putBytes(t.bytes());
    var c;
    var l =
      (i.fullMessageLength[i.fullMessageLength.length - 1] +
        i.messageLengthSize) &
      (i.blockLength - 1);
    s.putBytes(o.substr(0, i.blockLength - l));
    for (
      u = 8 * i.fullMessageLength[0], d = 0, undefined;
      d < i.fullMessageLength.length - 1;
      ++d
    ) {
      var u;
      var d;
      u += ((c = 8 * i.fullMessageLength[d + 1]) / 4294967296) >>> 0;
      s.putInt32(u >>> 0);
      u = c >>> 0;
    }
    s.putInt32(u);
    var p = {
      h0: e.h0,
      h1: e.h1,
      h2: e.h2,
      h3: e.h3,
      h4: e.h4,
    };
    a(p, r, s);
    var h = n.util.createBuffer();
    h.putInt32(p.h0);
    h.putInt32(p.h1);
    h.putInt32(p.h2);
    h.putInt32(p.h3);
    h.putInt32(p.h4);
    return h;
  };
  return i;
};
var o = null;
var s = false;
function a(e, t, r) {
  for (u = r.length(), undefined; u >= 64; ) {
    var n;
    var i;
    var o;
    var s;
    var a;
    var c;
    var l;
    var u;
    for (i = e.h0, o = e.h1, s = e.h2, a = e.h3, c = e.h4, l = 0; l < 16; ++l) {
      n = r.getInt32();
      t[l] = n;
      n = ((i << 5) | (i >>> 27)) + (a ^ (o & (s ^ a))) + c + 1518500249 + n;
      c = a;
      a = s;
      s = ((o << 30) | (o >>> 2)) >>> 0;
      o = i;
      i = n;
    }
    for (; l < 20; ++l) {
      n = ((n = t[l - 3] ^ t[l - 8] ^ t[l - 14] ^ t[l - 16]) << 1) | (n >>> 31);
      t[l] = n;
      n = ((i << 5) | (i >>> 27)) + (a ^ (o & (s ^ a))) + c + 1518500249 + n;
      c = a;
      a = s;
      s = ((o << 30) | (o >>> 2)) >>> 0;
      o = i;
      i = n;
    }
    for (; l < 32; ++l) {
      n = ((n = t[l - 3] ^ t[l - 8] ^ t[l - 14] ^ t[l - 16]) << 1) | (n >>> 31);
      t[l] = n;
      n = ((i << 5) | (i >>> 27)) + (o ^ s ^ a) + c + 1859775393 + n;
      c = a;
      a = s;
      s = ((o << 30) | (o >>> 2)) >>> 0;
      o = i;
      i = n;
    }
    for (; l < 40; ++l) {
      n =
        ((n = t[l - 6] ^ t[l - 16] ^ t[l - 28] ^ t[l - 32]) << 2) | (n >>> 30);
      t[l] = n;
      n = ((i << 5) | (i >>> 27)) + (o ^ s ^ a) + c + 1859775393 + n;
      c = a;
      a = s;
      s = ((o << 30) | (o >>> 2)) >>> 0;
      o = i;
      i = n;
    }
    for (; l < 60; ++l) {
      n =
        ((n = t[l - 6] ^ t[l - 16] ^ t[l - 28] ^ t[l - 32]) << 2) | (n >>> 30);
      t[l] = n;
      n =
        ((i << 5) | (i >>> 27)) +
        ((o & s) | (a & (o ^ s))) +
        c +
        2400959708 +
        n;
      c = a;
      a = s;
      s = ((o << 30) | (o >>> 2)) >>> 0;
      o = i;
      i = n;
    }
    for (; l < 80; ++l) {
      n =
        ((n = t[l - 6] ^ t[l - 16] ^ t[l - 28] ^ t[l - 32]) << 2) | (n >>> 30);
      t[l] = n;
      n = ((i << 5) | (i >>> 27)) + (o ^ s ^ a) + c + 3395469782 + n;
      c = a;
      a = s;
      s = ((o << 30) | (o >>> 2)) >>> 0;
      o = i;
      i = n;
    }
    e.h0 = (e.h0 + i) | 0;
    e.h1 = (e.h1 + o) | 0;
    e.h2 = (e.h2 + s) | 0;
    e.h3 = (e.h3 + a) | 0;
    e.h4 = (e.h4 + c) | 0;
    u -= 64;
  }
}