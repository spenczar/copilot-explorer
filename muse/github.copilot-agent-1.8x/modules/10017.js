var n;
var i = require(56105);
function o(e, t, r) {
  this.data = [];
  if (null != e) {
    if ("number" == typeof e) {
      this.fromNumber(e, t, r);
    } else {
      if (null == t && "string" != typeof e) {
        this.fromString(e, 256);
      } else {
        this.fromString(e, t);
      }
    }
  }
}
function s() {
  return new o(null);
}
function a(e, t, r, n, i, o) {
  for (s = 16383 & t, a = t >> 14, undefined; --o >= 0; ) {
    var s;
    var a;
    var c = 16383 & this.data[e];
    var l = this.data[e++] >> 14;
    var u = a * c + l * s;
    i =
      ((c = s * c + ((16383 & u) << 14) + r.data[n] + i) >> 28) +
      (u >> 14) +
      a * l;
    r.data[n++] = 268435455 & c;
  }
  return i;
}
module.exports = i.jsbn = i.jsbn || {};
i.jsbn.BigInteger = o;
if ("undefined" == typeof navigator) {
  o.prototype.am = a;
  n = 28;
} else {
  if ("Microsoft Internet Explorer" == navigator.appName) {
    o.prototype.am = function (e, t, r, n, i, o) {
      for (s = 32767 & t, a = t >> 15, undefined; --o >= 0; ) {
        var s;
        var a;
        var c = 32767 & this.data[e];
        var l = this.data[e++] >> 15;
        var u = a * c + l * s;
        i =
          ((c = s * c + ((32767 & u) << 15) + r.data[n] + (1073741823 & i)) >>>
            30) +
          (u >>> 15) +
          a * l +
          (i >>> 30);
        r.data[n++] = 1073741823 & c;
      }
      return i;
    };
    n = 30;
  } else {
    if ("Netscape" != navigator.appName) {
      o.prototype.am = function (e, t, r, n, i, o) {
        for (; --o >= 0; ) {
          var s = t * this.data[e++] + r.data[n] + i;
          i = Math.floor(s / 67108864);
          r.data[n++] = 67108863 & s;
        }
        return i;
      };
      n = 26;
    } else {
      o.prototype.am = a;
      n = 28;
    }
  }
}
o.prototype.DB = n;
o.prototype.DM = (1 << n) - 1;
o.prototype.DV = 1 << n;
o.prototype.FV = Math.pow(2, 52);
o.prototype.F1 = 52 - n;
o.prototype.F2 = 2 * n - 52;
var c;
var l;
var u = new Array();
for (c = "0".charCodeAt(0), l = 0; l <= 9; ++l) u[c++] = l;
for (c = "a".charCodeAt(0), l = 10; l < 36; ++l) u[c++] = l;
for (c = "A".charCodeAt(0), l = 10; l < 36; ++l) u[c++] = l;
function d(e) {
  return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(e);
}
function p(e, t) {
  var r = u[e.charCodeAt(t)];
  return null == r ? -1 : r;
}
function h(e) {
  var t = s();
  t.fromInt(e);
  return t;
}
function f(e) {
  var t;
  var r = 1;
  if (0 != (t = e >>> 16)) {
    e = t;
    r += 16;
  }
  if (0 != (t = e >> 8)) {
    e = t;
    r += 8;
  }
  if (0 != (t = e >> 4)) {
    e = t;
    r += 4;
  }
  if (0 != (t = e >> 2)) {
    e = t;
    r += 2;
  }
  if (0 != (t = e >> 1)) {
    e = t;
    r += 1;
  }
  return r;
}
function g(e) {
  this.m = e;
}
function m(e) {
  this.m = e;
  this.mp = e.invDigit();
  this.mpl = 32767 & this.mp;
  this.mph = this.mp >> 15;
  this.um = (1 << (e.DB - 15)) - 1;
  this.mt2 = 2 * e.t;
}
function y(e, t) {
  return e & t;
}
function v(e, t) {
  return e | t;
}
function _(e, t) {
  return e ^ t;
}
function b(e, t) {
  return e & ~t;
}
function w(e) {
  if (0 == e) return -1;
  var t = 0;
  if (0 == (65535 & e)) {
    e >>= 16;
    t += 16;
  }
  if (0 == (255 & e)) {
    e >>= 8;
    t += 8;
  }
  if (0 == (15 & e)) {
    e >>= 4;
    t += 4;
  }
  if (0 == (3 & e)) {
    e >>= 2;
    t += 2;
  }
  if (0 == (1 & e)) {
    ++t;
  }
  return t;
}
function C(e) {
  for (var t = 0; 0 != e; ) {
    e &= e - 1;
    ++t;
  }
  return t;
}
function E() {}
function T(e) {
  return e;
}
function S(e) {
  this.r2 = s();
  this.q3 = s();
  o.ONE.dlShiftTo(2 * e.t, this.r2);
  this.mu = this.r2.divide(e);
  this.m = e;
}
g.prototype.convert = function (e) {
  return e.s < 0 || e.compareTo(this.m) >= 0 ? e.mod(this.m) : e;
};
g.prototype.revert = function (e) {
  return e;
};
g.prototype.reduce = function (e) {
  e.divRemTo(this.m, null, e);
};
g.prototype.mulTo = function (e, t, r) {
  e.multiplyTo(t, r);
  this.reduce(r);
};
g.prototype.sqrTo = function (e, t) {
  e.squareTo(t);
  this.reduce(t);
};
m.prototype.convert = function (e) {
  var t = s();
  e.abs().dlShiftTo(this.m.t, t);
  t.divRemTo(this.m, null, t);
  if (e.s < 0 && t.compareTo(o.ZERO) > 0) {
    this.m.subTo(t, t);
  }
  return t;
};
m.prototype.revert = function (e) {
  var t = s();
  e.copyTo(t);
  this.reduce(t);
  return t;
};
m.prototype.reduce = function (e) {
  for (; e.t <= this.mt2; ) e.data[e.t++] = 0;
  for (var t = 0; t < this.m.t; ++t) {
    var r = 32767 & e.data[t];
    var n =
      (r * this.mpl +
        (((r * this.mph + (e.data[t] >> 15) * this.mpl) & this.um) << 15)) &
      e.DM;
    for (
      r = t + this.m.t, e.data[r] += this.m.am(0, n, e, t, 0, this.m.t);
      e.data[r] >= e.DV;

    ) {
      e.data[r] -= e.DV;
      e.data[++r]++;
    }
  }
  e.clamp();
  e.drShiftTo(this.m.t, e);
  if (e.compareTo(this.m) >= 0) {
    e.subTo(this.m, e);
  }
};
m.prototype.mulTo = function (e, t, r) {
  e.multiplyTo(t, r);
  this.reduce(r);
};
m.prototype.sqrTo = function (e, t) {
  e.squareTo(t);
  this.reduce(t);
};
o.prototype.copyTo = function (e) {
  for (var t = this.t - 1; t >= 0; --t) e.data[t] = this.data[t];
  e.t = this.t;
  e.s = this.s;
};
o.prototype.fromInt = function (e) {
  this.t = 1;
  this.s = e < 0 ? -1 : 0;
  if (e > 0) {
    this.data[0] = e;
  } else {
    if (e < -1) {
      this.data[0] = e + this.DV;
    } else {
      this.t = 0;
    }
  }
};
o.prototype.fromString = function (e, t) {
  var r;
  if (16 == t) r = 4;
  else if (8 == t) r = 3;
  else if (256 == t) r = 8;
  else if (2 == t) r = 1;
  else if (32 == t) r = 5;
  else {
    if (4 != t) return void this.fromRadix(e, t);
    r = 2;
  }
  this.t = 0;
  this.s = 0;
  for (n = e.length, i = false, s = 0, undefined; --n >= 0; ) {
    var n;
    var i;
    var s;
    var a = 8 == r ? 255 & e[n] : p(e, n);
    if (a < 0) {
      if ("-" == e.charAt(n)) {
        i = true;
      }
    } else {
      i = false;
      if (0 == s) {
        this.data[this.t++] = a;
      } else {
        if (s + r > this.DB) {
          this.data[this.t - 1] |= (a & ((1 << (this.DB - s)) - 1)) << s;
          this.data[this.t++] = a >> (this.DB - s);
        } else {
          this.data[this.t - 1] |= a << s;
        }
      }
      if ((s += r) >= this.DB) {
        s -= this.DB;
      }
    }
  }
  if (8 == r && 0 != (128 & e[0])) {
    this.s = -1;
    if (s > 0) {
      this.data[this.t - 1] |= ((1 << (this.DB - s)) - 1) << s;
    }
  }
  this.clamp();
  if (i) {
    o.ZERO.subTo(this, this);
  }
};
o.prototype.clamp = function () {
  for (var e = this.s & this.DM; this.t > 0 && this.data[this.t - 1] == e; )
    --this.t;
};
o.prototype.dlShiftTo = function (e, t) {
  var r;
  for (r = this.t - 1; r >= 0; --r) t.data[r + e] = this.data[r];
  for (r = e - 1; r >= 0; --r) t.data[r] = 0;
  t.t = this.t + e;
  t.s = this.s;
};
o.prototype.drShiftTo = function (e, t) {
  for (var r = e; r < this.t; ++r) t.data[r - e] = this.data[r];
  t.t = Math.max(this.t - e, 0);
  t.s = this.s;
};
o.prototype.lShiftTo = function (e, t) {
  var r;
  var n = e % this.DB;
  var i = this.DB - n;
  var o = (1 << i) - 1;
  var s = Math.floor(e / this.DB);
  var a = (this.s << n) & this.DM;
  for (r = this.t - 1; r >= 0; --r) {
    t.data[r + s + 1] = (this.data[r] >> i) | a;
    a = (this.data[r] & o) << n;
  }
  for (r = s - 1; r >= 0; --r) t.data[r] = 0;
  t.data[s] = a;
  t.t = this.t + s + 1;
  t.s = this.s;
  t.clamp();
};
o.prototype.rShiftTo = function (e, t) {
  t.s = this.s;
  var r = Math.floor(e / this.DB);
  if (r >= this.t) t.t = 0;
  else {
    var n = e % this.DB;
    var i = this.DB - n;
    var o = (1 << n) - 1;
    t.data[0] = this.data[r] >> n;
    for (var s = r + 1; s < this.t; ++s) {
      t.data[s - r - 1] |= (this.data[s] & o) << i;
      t.data[s - r] = this.data[s] >> n;
    }
    if (n > 0) {
      t.data[this.t - r - 1] |= (this.s & o) << i;
    }
    t.t = this.t - r;
    t.clamp();
  }
};
o.prototype.subTo = function (e, t) {
  for (r = 0, n = 0, i = Math.min(e.t, this.t), undefined; r < i; ) {
    var r;
    var n;
    var i;
    n += this.data[r] - e.data[r];
    t.data[r++] = n & this.DM;
    n >>= this.DB;
  }
  if (e.t < this.t) {
    for (n -= e.s; r < this.t; ) {
      n += this.data[r];
      t.data[r++] = n & this.DM;
      n >>= this.DB;
    }
    n += this.s;
  } else {
    for (n += this.s; r < e.t; ) {
      n -= e.data[r];
      t.data[r++] = n & this.DM;
      n >>= this.DB;
    }
    n -= e.s;
  }
  t.s = n < 0 ? -1 : 0;
  if (n < -1) {
    t.data[r++] = this.DV + n;
  } else {
    if (n > 0) {
      t.data[r++] = n;
    }
  }
  t.t = r;
  t.clamp();
};
o.prototype.multiplyTo = function (e, t) {
  var r = this.abs();
  var n = e.abs();
  var i = r.t;
  for (t.t = i + n.t; --i >= 0; ) t.data[i] = 0;
  for (i = 0; i < n.t; ++i) t.data[i + r.t] = r.am(0, n.data[i], t, i, 0, r.t);
  t.s = 0;
  t.clamp();
  if (this.s != e.s) {
    o.ZERO.subTo(t, t);
  }
};
o.prototype.squareTo = function (e) {
  for (t = this.abs(), r = e.t = 2 * t.t, undefined; --r >= 0; ) {
    var t;
    var r;
    e.data[r] = 0;
  }
  for (r = 0; r < t.t - 1; ++r) {
    var n = t.am(r, t.data[r], e, 2 * r, 0, 1);
    if (
      (e.data[r + t.t] += t.am(
        r + 1,
        2 * t.data[r],
        e,
        2 * r + 1,
        n,
        t.t - r - 1
      )) >= t.DV
    ) {
      e.data[r + t.t] -= t.DV;
      e.data[r + t.t + 1] = 1;
    }
  }
  if (e.t > 0) {
    e.data[e.t - 1] += t.am(r, t.data[r], e, 2 * r, 0, 1);
  }
  e.s = 0;
  e.clamp();
};
o.prototype.divRemTo = function (e, t, r) {
  var n = e.abs();
  if (!(n.t <= 0)) {
    var i = this.abs();
    if (i.t < n.t) {
      if (null != t) {
        t.fromInt(0);
      }
      return void (null != r && this.copyTo(r));
    }
    if (null == r) {
      r = s();
    }
    var a = s();
    var c = this.s;
    var l = e.s;
    var u = this.DB - f(n.data[n.t - 1]);
    if (u > 0) {
      n.lShiftTo(u, a);
      i.lShiftTo(u, r);
    } else {
      n.copyTo(a);
      i.copyTo(r);
    }
    var d = a.t;
    var p = a.data[d - 1];
    if (0 != p) {
      var h = p * (1 << this.F1) + (d > 1 ? a.data[d - 2] >> this.F2 : 0);
      var g = this.FV / h;
      var m = (1 << this.F1) / h;
      var y = 1 << this.F2;
      var v = r.t;
      var _ = v - d;
      var b = null == t ? s() : t;
      for (
        a.dlShiftTo(_, b),
          r.compareTo(b) >= 0 && ((r.data[r.t++] = 1), r.subTo(b, r)),
          o.ONE.dlShiftTo(d, b),
          b.subTo(a, a);
        a.t < d;

      )
        a.data[a.t++] = 0;
      for (; --_ >= 0; ) {
        var w =
          r.data[--v] == p
            ? this.DM
            : Math.floor(r.data[v] * g + (r.data[v - 1] + y) * m);
        if ((r.data[v] += a.am(0, w, r, _, 0, d)) < w)
          for (a.dlShiftTo(_, b), r.subTo(b, r); r.data[v] < --w; )
            r.subTo(b, r);
      }
      if (null != t) {
        r.drShiftTo(d, t);
        if (c != l) {
          o.ZERO.subTo(t, t);
        }
      }
      r.t = d;
      r.clamp();
      if (u > 0) {
        r.rShiftTo(u, r);
      }
      if (c < 0) {
        o.ZERO.subTo(r, r);
      }
    }
  }
};
o.prototype.invDigit = function () {
  if (this.t < 1) return 0;
  var e = this.data[0];
  if (0 == (1 & e)) return 0;
  var t = 3 & e;
  return (t =
    ((t =
      ((t = ((t = (t * (2 - (15 & e) * t)) & 15) * (2 - (255 & e) * t)) & 255) *
        (2 - (((65535 & e) * t) & 65535))) &
      65535) *
      (2 - ((e * t) % this.DV))) %
    this.DV) > 0
    ? this.DV - t
    : -t;
};
o.prototype.isEven = function () {
  return 0 == (this.t > 0 ? 1 & this.data[0] : this.s);
};
o.prototype.exp = function (e, t) {
  if (e > 4294967295 || e < 1) return o.ONE;
  var r = s();
  var n = s();
  var i = t.convert(this);
  var a = f(e) - 1;
  for (i.copyTo(r); --a >= 0; ) {
    t.sqrTo(r, n);
    if ((e & (1 << a)) > 0) t.mulTo(n, i, r);
    else {
      var c = r;
      r = n;
      n = c;
    }
  }
  return t.revert(r);
};
o.prototype.toString = function (e) {
  if (this.s < 0) return "-" + this.negate().toString(e);
  var t;
  if (16 == e) t = 4;
  else if (8 == e) t = 3;
  else if (2 == e) t = 1;
  else if (32 == e) t = 5;
  else {
    if (4 != e) return this.toRadix(e);
    t = 2;
  }
  var r;
  var n = (1 << t) - 1;
  var i = false;
  var o = "";
  var s = this.t;
  var a = this.DB - ((s * this.DB) % t);
  if (s-- > 0)
    for (
      a < this.DB && (r = this.data[s] >> a) > 0 && ((i = true), (o = d(r)));
      s >= 0;

    ) {
      if (a < t) {
        r = (this.data[s] & ((1 << a) - 1)) << (t - a);
        r |= this.data[--s] >> (a += this.DB - t);
      } else {
        r = (this.data[s] >> (a -= t)) & n;
        if (a <= 0) {
          a += this.DB;
          --s;
        }
      }
      if (r > 0) {
        i = true;
      }
      if (i) {
        o += d(r);
      }
    }
  return i ? o : "0";
};
o.prototype.negate = function () {
  var e = s();
  o.ZERO.subTo(this, e);
  return e;
};
o.prototype.abs = function () {
  return this.s < 0 ? this.negate() : this;
};
o.prototype.compareTo = function (e) {
  var t = this.s - e.s;
  if (0 != t) return t;
  var r = this.t;
  if (0 != (t = r - e.t)) return this.s < 0 ? -t : t;
  for (; --r >= 0; ) if (0 != (t = this.data[r] - e.data[r])) return t;
  return 0;
};
o.prototype.bitLength = function () {
  return this.t <= 0
    ? 0
    : this.DB * (this.t - 1) + f(this.data[this.t - 1] ^ (this.s & this.DM));
};
o.prototype.mod = function (e) {
  var t = s();
  this.abs().divRemTo(e, null, t);
  if (this.s < 0 && t.compareTo(o.ZERO) > 0) {
    e.subTo(t, t);
  }
  return t;
};
o.prototype.modPowInt = function (e, t) {
  var r;
  r = e < 256 || t.isEven() ? new g(t) : new m(t);
  return this.exp(e, r);
};
o.ZERO = h(0);
o.ONE = h(1);
E.prototype.convert = T;
E.prototype.revert = T;
E.prototype.mulTo = function (e, t, r) {
  e.multiplyTo(t, r);
};
E.prototype.sqrTo = function (e, t) {
  e.squareTo(t);
};
S.prototype.convert = function (e) {
  if (e.s < 0 || e.t > 2 * this.m.t) return e.mod(this.m);
  if (e.compareTo(this.m) < 0) return e;
  var t = s();
  e.copyTo(t);
  this.reduce(t);
  return t;
};
S.prototype.revert = function (e) {
  return e;
};
S.prototype.reduce = function (e) {
  for (
    e.drShiftTo(this.m.t - 1, this.r2),
      e.t > this.m.t + 1 && ((e.t = this.m.t + 1), e.clamp()),
      this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
      this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
    e.compareTo(this.r2) < 0;

  )
    e.dAddOffset(1, this.m.t + 1);
  for (e.subTo(this.r2, e); e.compareTo(this.m) >= 0; ) e.subTo(this.m, e);
};
S.prototype.mulTo = function (e, t, r) {
  e.multiplyTo(t, r);
  this.reduce(r);
};
S.prototype.sqrTo = function (e, t) {
  e.squareTo(t);
  this.reduce(t);
};
var x = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
  157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
  239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,
  331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419,
  421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503,
  509,
];
var k = (1 << 26) / x[x.length - 1];
o.prototype.chunkSize = function (e) {
  return Math.floor((Math.LN2 * this.DB) / Math.log(e));
};
o.prototype.toRadix = function (e) {
  if (null == e) {
    e = 10;
  }
  if (0 == this.signum() || e < 2 || e > 36) return "0";
  var t = this.chunkSize(e);
  var r = Math.pow(e, t);
  var n = h(r);
  var i = s();
  var o = s();
  var a = "";
  for (this.divRemTo(n, i, o); i.signum() > 0; ) {
    a = (r + o.intValue()).toString(e).substr(1) + a;
    i.divRemTo(n, i, o);
  }
  return o.intValue().toString(e) + a;
};
o.prototype.fromRadix = function (e, t) {
  this.fromInt(0);
  if (null == t) {
    t = 10;
  }
  for (
    r = this.chunkSize(t),
      n = Math.pow(t, r),
      i = false,
      s = 0,
      a = 0,
      c = 0,
      undefined;
    c < e.length;
    ++c
  ) {
    var r;
    var n;
    var i;
    var s;
    var a;
    var c;
    var l = p(e, c);
    if (l < 0) {
      if ("-" == e.charAt(c) && 0 == this.signum()) {
        i = true;
      }
    } else {
      a = t * a + l;
      if (++s >= r) {
        this.dMultiply(n);
        this.dAddOffset(a, 0);
        s = 0;
        a = 0;
      }
    }
  }
  if (s > 0) {
    this.dMultiply(Math.pow(t, s));
    this.dAddOffset(a, 0);
  }
  if (i) {
    o.ZERO.subTo(this, this);
  }
};
o.prototype.fromNumber = function (e, t, r) {
  if ("number" == typeof t) {
    if (e < 2) this.fromInt(1);
    else
      for (
        this.fromNumber(e, r),
          this.testBit(e - 1) ||
            this.bitwiseTo(o.ONE.shiftLeft(e - 1), v, this),
          this.isEven() && this.dAddOffset(1, 0);
        !this.isProbablePrime(t);

      ) {
        this.dAddOffset(2, 0);
        if (this.bitLength() > e) {
          this.subTo(o.ONE.shiftLeft(e - 1), this);
        }
      }
  } else {
    var n = new Array();
    var i = 7 & e;
    n.length = 1 + (e >> 3);
    t.nextBytes(n);
    if (i > 0) {
      n[0] &= (1 << i) - 1;
    } else {
      n[0] = 0;
    }
    this.fromString(n, 256);
  }
};
o.prototype.bitwiseTo = function (e, t, r) {
  var n;
  var i;
  var o = Math.min(e.t, this.t);
  for (n = 0; n < o; ++n) r.data[n] = t(this.data[n], e.data[n]);
  if (e.t < this.t) {
    for (i = e.s & this.DM, n = o; n < this.t; ++n)
      r.data[n] = t(this.data[n], i);
    r.t = this.t;
  } else {
    for (i = this.s & this.DM, n = o; n < e.t; ++n) r.data[n] = t(i, e.data[n]);
    r.t = e.t;
  }
  r.s = t(this.s, e.s);
  r.clamp();
};
o.prototype.changeBit = function (e, t) {
  var r = o.ONE.shiftLeft(e);
  this.bitwiseTo(r, t, r);
  return r;
};
o.prototype.addTo = function (e, t) {
  for (r = 0, n = 0, i = Math.min(e.t, this.t), undefined; r < i; ) {
    var r;
    var n;
    var i;
    n += this.data[r] + e.data[r];
    t.data[r++] = n & this.DM;
    n >>= this.DB;
  }
  if (e.t < this.t) {
    for (n += e.s; r < this.t; ) {
      n += this.data[r];
      t.data[r++] = n & this.DM;
      n >>= this.DB;
    }
    n += this.s;
  } else {
    for (n += this.s; r < e.t; ) {
      n += e.data[r];
      t.data[r++] = n & this.DM;
      n >>= this.DB;
    }
    n += e.s;
  }
  t.s = n < 0 ? -1 : 0;
  if (n > 0) {
    t.data[r++] = n;
  } else {
    if (n < -1) {
      t.data[r++] = this.DV + n;
    }
  }
  t.t = r;
  t.clamp();
};
o.prototype.dMultiply = function (e) {
  this.data[this.t] = this.am(0, e - 1, this, 0, 0, this.t);
  ++this.t;
  this.clamp();
};
o.prototype.dAddOffset = function (e, t) {
  if (0 != e) {
    for (; this.t <= t; ) this.data[this.t++] = 0;
    for (this.data[t] += e; this.data[t] >= this.DV; ) {
      this.data[t] -= this.DV;
      if (++t >= this.t) {
        this.data[this.t++] = 0;
      }
      ++this.data[t];
    }
  }
};
o.prototype.multiplyLowerTo = function (e, t, r) {
  var n;
  var i = Math.min(this.t + e.t, t);
  for (r.s = 0, r.t = i; i > 0; ) r.data[--i] = 0;
  for (n = r.t - this.t; i < n; ++i)
    r.data[i + this.t] = this.am(0, e.data[i], r, i, 0, this.t);
  for (n = Math.min(e.t, t); i < n; ++i) this.am(0, e.data[i], r, i, 0, t - i);
  r.clamp();
};
o.prototype.multiplyUpperTo = function (e, t, r) {
  --t;
  var n = (r.t = this.t + e.t - t);
  for (r.s = 0; --n >= 0; ) r.data[n] = 0;
  for (n = Math.max(t - this.t, 0); n < e.t; ++n)
    r.data[this.t + n - t] = this.am(t - n, e.data[n], r, 0, 0, this.t + n - t);
  r.clamp();
  r.drShiftTo(1, r);
};
o.prototype.modInt = function (e) {
  if (e <= 0) return 0;
  var t = this.DV % e;
  var r = this.s < 0 ? e - 1 : 0;
  if (this.t > 0)
    if (0 == t) r = this.data[0] % e;
    else for (var n = this.t - 1; n >= 0; --n) r = (t * r + this.data[n]) % e;
  return r;
};
o.prototype.millerRabin = function (e) {
  var t = this.subtract(o.ONE);
  var r = t.getLowestSetBit();
  if (r <= 0) return false;
  for (
    i = t.shiftRight(r),
      s = {
        nextBytes: function (e) {
          for (var t = 0; t < e.length; ++t)
            e[t] = Math.floor(256 * Math.random());
        },
      },
      a = 0,
      undefined;
    a < e;
    ++a
  ) {
    var n;
    var i;
    var s;
    var a;
    do {
      n = new o(this.bitLength(), s);
    } while (n.compareTo(o.ONE) <= 0 || n.compareTo(t) >= 0);
    var c = n.modPow(i, this);
    if (0 != c.compareTo(o.ONE) && 0 != c.compareTo(t)) {
      for (var l = 1; l++ < r && 0 != c.compareTo(t); )
        if (0 == (c = c.modPowInt(2, this)).compareTo(o.ONE)) return false;
      if (0 != c.compareTo(t)) return false;
    }
  }
  return true;
};
o.prototype.clone = function () {
  var e = s();
  this.copyTo(e);
  return e;
};
o.prototype.intValue = function () {
  if (this.s < 0) {
    if (1 == this.t) return this.data[0] - this.DV;
    if (0 == this.t) return -1;
  } else {
    if (1 == this.t) return this.data[0];
    if (0 == this.t) return 0;
  }
  return (
    ((this.data[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this.data[0]
  );
};
o.prototype.byteValue = function () {
  return 0 == this.t ? this.s : (this.data[0] << 24) >> 24;
};
o.prototype.shortValue = function () {
  return 0 == this.t ? this.s : (this.data[0] << 16) >> 16;
};
o.prototype.signum = function () {
  return this.s < 0
    ? -1
    : this.t <= 0 || (1 == this.t && this.data[0] <= 0)
    ? 0
    : 1;
};
o.prototype.toByteArray = function () {
  var e = this.t;
  var t = new Array();
  t[0] = this.s;
  var r;
  var n = this.DB - ((e * this.DB) % 8);
  var i = 0;
  if (e-- > 0)
    for (
      n < this.DB &&
      (r = this.data[e] >> n) != (this.s & this.DM) >> n &&
      (t[i++] = r | (this.s << (this.DB - n)));
      e >= 0;

    ) {
      if (n < 8) {
        r = (this.data[e] & ((1 << n) - 1)) << (8 - n);
        r |= this.data[--e] >> (n += this.DB - 8);
      } else {
        r = (this.data[e] >> (n -= 8)) & 255;
        if (n <= 0) {
          n += this.DB;
          --e;
        }
      }
      if (0 != (128 & r)) {
        r |= -256;
      }
      if (0 == i && (128 & this.s) != (128 & r)) {
        ++i;
      }
      if (i > 0 || r != this.s) {
        t[i++] = r;
      }
    }
  return t;
};
o.prototype.equals = function (e) {
  return 0 == this.compareTo(e);
};
o.prototype.min = function (e) {
  return this.compareTo(e) < 0 ? this : e;
};
o.prototype.max = function (e) {
  return this.compareTo(e) > 0 ? this : e;
};
o.prototype.and = function (e) {
  var t = s();
  this.bitwiseTo(e, y, t);
  return t;
};
o.prototype.or = function (e) {
  var t = s();
  this.bitwiseTo(e, v, t);
  return t;
};
o.prototype.xor = function (e) {
  var t = s();
  this.bitwiseTo(e, _, t);
  return t;
};
o.prototype.andNot = function (e) {
  var t = s();
  this.bitwiseTo(e, b, t);
  return t;
};
o.prototype.not = function () {
  for (e = s(), t = 0, undefined; t < this.t; ++t) {
    var e;
    var t;
    e.data[t] = this.DM & ~this.data[t];
  }
  e.t = this.t;
  e.s = ~this.s;
  return e;
};
o.prototype.shiftLeft = function (e) {
  var t = s();
  if (e < 0) {
    this.rShiftTo(-e, t);
  } else {
    this.lShiftTo(e, t);
  }
  return t;
};
o.prototype.shiftRight = function (e) {
  var t = s();
  if (e < 0) {
    this.lShiftTo(-e, t);
  } else {
    this.rShiftTo(e, t);
  }
  return t;
};
o.prototype.getLowestSetBit = function () {
  for (var e = 0; e < this.t; ++e)
    if (0 != this.data[e]) return e * this.DB + w(this.data[e]);
  return this.s < 0 ? this.t * this.DB : -1;
};
o.prototype.bitCount = function () {
  for (e = 0, t = this.s & this.DM, r = 0, undefined; r < this.t; ++r) {
    var e;
    var t;
    var r;
    e += C(this.data[r] ^ t);
  }
  return e;
};
o.prototype.testBit = function (e) {
  var t = Math.floor(e / this.DB);
  return t >= this.t ? 0 != this.s : 0 != (this.data[t] & (1 << e % this.DB));
};
o.prototype.setBit = function (e) {
  return this.changeBit(e, v);
};
o.prototype.clearBit = function (e) {
  return this.changeBit(e, b);
};
o.prototype.flipBit = function (e) {
  return this.changeBit(e, _);
};
o.prototype.add = function (e) {
  var t = s();
  this.addTo(e, t);
  return t;
};
o.prototype.subtract = function (e) {
  var t = s();
  this.subTo(e, t);
  return t;
};
o.prototype.multiply = function (e) {
  var t = s();
  this.multiplyTo(e, t);
  return t;
};
o.prototype.divide = function (e) {
  var t = s();
  this.divRemTo(e, t, null);
  return t;
};
o.prototype.remainder = function (e) {
  var t = s();
  this.divRemTo(e, null, t);
  return t;
};
o.prototype.divideAndRemainder = function (e) {
  var t = s();
  var r = s();
  this.divRemTo(e, t, r);
  return new Array(t, r);
};
o.prototype.modPow = function (e, t) {
  var r;
  var n;
  var i = e.bitLength();
  var o = h(1);
  if (i <= 0) return o;
  r = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6;
  n = i < 8 ? new g(t) : t.isEven() ? new S(t) : new m(t);
  var a = new Array();
  var c = 3;
  var l = r - 1;
  var u = (1 << r) - 1;
  a[1] = n.convert(this);
  if (r > 1) {
    var d = s();
    for (n.sqrTo(a[1], d); c <= u; )
      (a[c] = s()), n.mulTo(d, a[c - 2], a[c]), (c += 2);
  }
  var p;
  var y;
  var v = e.t - 1;
  var _ = true;
  var b = s();
  for (i = f(e.data[v]) - 1; v >= 0; ) {
    for (
      i >= l
        ? (p = (e.data[v] >> (i - l)) & u)
        : ((p = (e.data[v] & ((1 << (i + 1)) - 1)) << (l - i)),
          v > 0 && (p |= e.data[v - 1] >> (this.DB + i - l))),
        c = r;
      0 == (1 & p);

    ) {
      p >>= 1;
      --c;
    }
    if ((i -= c) < 0) {
      i += this.DB;
      --v;
    }
    if (_) a[p].copyTo(o), (_ = !1);
    else {
      for (; c > 1; ) n.sqrTo(o, b), n.sqrTo(b, o), (c -= 2);
      c > 0 ? n.sqrTo(o, b) : ((y = o), (o = b), (b = y)), n.mulTo(b, a[p], o);
    }
    for (; v >= 0 && 0 == (e.data[v] & (1 << i)); ) {
      n.sqrTo(o, b);
      y = o;
      o = b;
      b = y;
      if (--i < 0) {
        i = this.DB - 1;
        --v;
      }
    }
  }
  return n.revert(o);
};
o.prototype.modInverse = function (e) {
  var t = e.isEven();
  if ((this.isEven() && t) || 0 == e.signum()) return o.ZERO;
  for (
    r = e.clone(),
      n = this.clone(),
      i = h(1),
      s = h(0),
      a = h(0),
      c = h(1),
      undefined;
    0 != r.signum();

  ) {
    var r;
    var n;
    var i;
    var s;
    var a;
    var c;
    for (; r.isEven(); ) {
      r.rShiftTo(1, r);
      if (t) {
        if (i.isEven() && s.isEven()) {
          i.addTo(this, i);
          s.subTo(e, s);
        }
        i.rShiftTo(1, i);
      } else {
        if (s.isEven()) {
          s.subTo(e, s);
        }
      }
      s.rShiftTo(1, s);
    }
    for (; n.isEven(); ) {
      n.rShiftTo(1, n);
      if (t) {
        if (a.isEven() && c.isEven()) {
          a.addTo(this, a);
          c.subTo(e, c);
        }
        a.rShiftTo(1, a);
      } else {
        if (c.isEven()) {
          c.subTo(e, c);
        }
      }
      c.rShiftTo(1, c);
    }
    if (r.compareTo(n) >= 0) {
      r.subTo(n, r);
      if (t) {
        i.subTo(a, i);
      }
      s.subTo(c, s);
    } else {
      n.subTo(r, n);
      if (t) {
        a.subTo(i, a);
      }
      c.subTo(s, c);
    }
  }
  return 0 != n.compareTo(o.ONE)
    ? o.ZERO
    : c.compareTo(e) >= 0
    ? c.subtract(e)
    : c.signum() < 0
    ? (c.addTo(e, c), c.signum() < 0 ? c.add(e) : c)
    : c;
};
o.prototype.pow = function (e) {
  return this.exp(e, new E());
};
o.prototype.gcd = function (e) {
  var t = this.s < 0 ? this.negate() : this.clone();
  var r = e.s < 0 ? e.negate() : e.clone();
  if (t.compareTo(r) < 0) {
    var n = t;
    t = r;
    r = n;
  }
  var i = t.getLowestSetBit();
  var o = r.getLowestSetBit();
  if (o < 0) return t;
  for (
    i < o && (o = i), o > 0 && (t.rShiftTo(o, t), r.rShiftTo(o, r));
    t.signum() > 0;

  ) {
    if ((i = t.getLowestSetBit()) > 0) {
      t.rShiftTo(i, t);
    }
    if ((i = r.getLowestSetBit()) > 0) {
      r.rShiftTo(i, r);
    }
    if (t.compareTo(r) >= 0) {
      t.subTo(r, t);
      t.rShiftTo(1, t);
    } else {
      r.subTo(t, r);
      r.rShiftTo(1, r);
    }
  }
  if (o > 0) {
    r.lShiftTo(o, r);
  }
  return r;
};
o.prototype.isProbablePrime = function (e) {
  var t;
  var r = this.abs();
  if (1 == r.t && r.data[0] <= x[x.length - 1]) {
    for (t = 0; t < x.length; ++t) if (r.data[0] == x[t]) return true;
    return false;
  }
  if (r.isEven()) return false;
  for (t = 1; t < x.length; ) {
    for (n = x[t], i = t + 1, undefined; i < x.length && n < k; ) {
      var n;
      var i;
      n *= x[i++];
    }
    for (n = r.modInt(n); t < i; ) if (n % x[t++] == 0) return false;
  }
  return r.millerRabin(e);
};