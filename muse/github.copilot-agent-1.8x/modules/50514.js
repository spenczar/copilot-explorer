var n = require(56105);
require(56827);
var i = [
  217, 120, 249, 196, 25, 221, 181, 237, 40, 233, 253, 121, 74, 160, 216, 157,
  198, 126, 55, 131, 43, 118, 83, 142, 98, 76, 100, 136, 68, 139, 251, 162, 23,
  154, 89, 245, 135, 179, 79, 19, 97, 69, 109, 141, 9, 129, 125, 50, 189, 143,
  64, 235, 134, 183, 123, 11, 240, 149, 33, 34, 92, 107, 78, 130, 84, 214, 101,
  147, 206, 96, 178, 28, 115, 86, 192, 20, 167, 140, 241, 220, 18, 117, 202, 31,
  59, 190, 228, 209, 66, 61, 212, 48, 163, 60, 182, 38, 111, 191, 14, 218, 70,
  105, 7, 87, 39, 242, 29, 155, 188, 148, 67, 3, 248, 17, 199, 246, 144, 239,
  62, 231, 6, 195, 213, 47, 200, 102, 30, 215, 8, 232, 234, 222, 128, 82, 238,
  247, 132, 170, 114, 172, 53, 77, 106, 42, 150, 26, 210, 113, 90, 21, 73, 116,
  75, 159, 208, 94, 4, 24, 164, 236, 194, 224, 65, 110, 15, 81, 203, 204, 36,
  145, 175, 80, 161, 244, 112, 57, 153, 124, 58, 133, 35, 184, 180, 122, 252, 2,
  54, 91, 37, 85, 151, 49, 45, 93, 250, 152, 227, 138, 146, 174, 5, 223, 41, 16,
  103, 108, 186, 201, 211, 0, 230, 207, 225, 158, 168, 44, 99, 22, 1, 63, 88,
  226, 137, 169, 13, 56, 52, 27, 171, 51, 255, 176, 187, 72, 12, 95, 185, 177,
  205, 46, 197, 243, 219, 71, 229, 165, 156, 119, 10, 166, 32, 104, 254, 127,
  193, 173,
];
var o = [1, 2, 3, 5];
var s = function (e, t) {
  return ((e << t) & 65535) | ((65535 & e) >> (16 - t));
};
var a = function (e, t) {
  return ((65535 & e) >> t) | ((e << (16 - t)) & 65535);
};
module.exports = n.rc2 = n.rc2 || {};
n.rc2.expandKey = function (e, t) {
  if ("string" == typeof e) {
    e = n.util.createBuffer(e);
  }
  t = t || 128;
  var r;
  var o = e;
  var s = e.length();
  var a = t;
  var c = Math.ceil(a / 8);
  var l = 255 >> (7 & a);
  for (r = s; r < 128; r++) o.putByte(i[(o.at(r - 1) + o.at(r - s)) & 255]);
  for (o.setAt(128 - c, i[o.at(128 - c) & l]), r = 127 - c; r >= 0; r--)
    o.setAt(r, i[o.at(r + 1) ^ o.at(r + c)]);
  return o;
};
var c = function (e, t, r) {
  var i;
  var c;
  var l;
  var u;
  var d = false;
  var p = null;
  var h = null;
  var f = null;
  var g = [];
  for (e = n.rc2.expandKey(e, t), l = 0; l < 64; l++) g.push(e.getInt16Le());
  if (r) {
    i = function (e) {
      for (l = 0; l < 4; l++) {
        e[l] +=
          g[u] +
          (e[(l + 3) % 4] & e[(l + 2) % 4]) +
          (~e[(l + 3) % 4] & e[(l + 1) % 4]);
        e[l] = s(e[l], o[l]);
        u++;
      }
    };
    c = function (e) {
      for (l = 0; l < 4; l++) e[l] += g[63 & e[(l + 3) % 4]];
    };
  } else {
    i = function (e) {
      for (l = 3; l >= 0; l--) {
        e[l] = a(e[l], o[l]);
        e[l] -=
          g[u] +
          (e[(l + 3) % 4] & e[(l + 2) % 4]) +
          (~e[(l + 3) % 4] & e[(l + 1) % 4]);
        u--;
      }
    };
    c = function (e) {
      for (l = 3; l >= 0; l--) e[l] -= g[63 & e[(l + 3) % 4]];
    };
  }
  var m = function (e) {
    var t = [];
    for (l = 0; l < 4; l++) {
      var n = p.getInt16Le();
      if (null !== f) {
        if (r) {
          n ^= f.getInt16Le();
        } else {
          f.putInt16Le(n);
        }
      }
      t.push(65535 & n);
    }
    u = r ? 0 : 63;
    for (var i = 0; i < e.length; i++)
      for (var o = 0; o < e[i][0]; o++) e[i][1](t);
    for (l = 0; l < 4; l++) {
      if (null !== f) {
        if (r) {
          f.putInt16Le(t[l]);
        } else {
          t[l] ^= f.getInt16Le();
        }
      }
      h.putInt16Le(t[l]);
    }
  };
  var y = null;
  return (y = {
    start: function (e, t) {
      if (e && "string" == typeof e) {
        e = n.util.createBuffer(e);
      }
      d = false;
      p = n.util.createBuffer();
      h = t || new n.util.createBuffer();
      f = e;
      y.output = h;
    },
    update: function (e) {
      for (d || p.putBuffer(e); p.length() >= 8; )
        m([
          [5, i],
          [1, c],
          [6, i],
          [1, c],
          [5, i],
        ]);
    },
    finish: function (e) {
      var t = true;
      if (r)
        if (e) t = e(8, p, !r);
        else {
          var n = 8 === p.length() ? 8 : 8 - p.length();
          p.fillWithByte(n, n);
        }
      if (t) {
        d = true;
        y.update();
      }
      if (!r && (t = 0 === p.length()))
        if (e) t = e(8, h, !r);
        else {
          var i = h.length(),
            o = h.at(i - 1);
          o > i ? (t = !1) : h.truncate(o);
        }
      return t;
    },
  });
};
n.rc2.startEncrypting = function (e, t, r) {
  var i = n.rc2.createEncryptionCipher(e, 128);
  i.start(t, r);
  return i;
};
n.rc2.createEncryptionCipher = function (e, t) {
  return c(e, t, true);
};
n.rc2.startDecrypting = function (e, t, r) {
  var i = n.rc2.createDecryptionCipher(e, 128);
  i.start(t, r);
  return i;
};
n.rc2.createDecryptionCipher = function (e, t) {
  return c(e, t, false);
};