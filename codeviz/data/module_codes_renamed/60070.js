var M_OptionsManager_maybe = require("OptionsManager");
function i(e, t) {
  M_OptionsManager_maybe.cipher.registerAlgorithm(e, function () {
    return new M_OptionsManager_maybe.aes.Algorithm(e, t);
  });
}
require("Cipher-Algorithm-Manager");
require("CipherModesModule");
require("binary-data-reader");
module.exports = M_OptionsManager_maybe.aes = M_OptionsManager_maybe.aes || {};
M_OptionsManager_maybe.aes.startEncrypting = function (e, t, r, n) {
  var i = f({
    key: e,
    output: r,
    decrypt: false,
    mode: n,
  });
  i.start(t);
  return i;
};
M_OptionsManager_maybe.aes.createEncryptionCipher = function (e, t) {
  return f({
    key: e,
    output: null,
    decrypt: false,
    mode: t,
  });
};
M_OptionsManager_maybe.aes.startDecrypting = function (e, t, r, n) {
  var i = f({
    key: e,
    output: r,
    decrypt: true,
    mode: n,
  });
  i.start(t);
  return i;
};
M_OptionsManager_maybe.aes.createDecryptionCipher = function (e, t) {
  return f({
    key: e,
    output: null,
    decrypt: true,
    mode: t,
  });
};
M_OptionsManager_maybe.aes.Algorithm = function (e, t) {
  if (u) {
    d();
  }
  var r = this;
  r.name = e;
  r.mode = new t({
    blockSize: 16,
    cipher: {
      encrypt: function (e, t) {
        return h(r._w, e, t, false);
      },
      decrypt: function (e, t) {
        return h(r._w, e, t, true);
      },
    },
  });
  r._init = false;
};
M_OptionsManager_maybe.aes.Algorithm.prototype.initialize = function (e) {
  if (!this._init) {
    var t;
    var r = e.key;
    if (
      "string" != typeof r ||
      (16 !== r.length && 24 !== r.length && 32 !== r.length)
    ) {
      if (
        M_OptionsManager_maybe.util.isArray(r) &&
        (16 === r.length || 24 === r.length || 32 === r.length)
      ) {
        t = r;
        r = M_OptionsManager_maybe.util.createBuffer();
        for (var i = 0; i < t.length; ++i) r.putByte(t[i]);
      }
    } else r = M_OptionsManager_maybe.util.createBuffer(r);
    if (!M_OptionsManager_maybe.util.isArray(r)) {
      t = r;
      r = [];
      var o = t.length();
      if (16 === o || 24 === o || 32 === o)
        for (o >>>= 2, i = 0; i < o; ++i) r.push(t.getInt32());
    }
    if (
      !M_OptionsManager_maybe.util.isArray(r) ||
      (4 !== r.length && 6 !== r.length && 8 !== r.length)
    )
      throw new Error("Invalid key parameter.");
    var s = this.mode.name;
    var a = -1 !== ["CFB", "OFB", "CTR", "GCM"].indexOf(s);
    this._w = p(r, e.decrypt && !a);
    this._init = true;
  }
};
M_OptionsManager_maybe.aes._expandKey = function (e, t) {
  if (u) {
    d();
  }
  return p(e, t);
};
M_OptionsManager_maybe.aes._updateBlock = h;
i("AES-ECB", M_OptionsManager_maybe.cipher.modes.ecb);
i("AES-CBC", M_OptionsManager_maybe.cipher.modes.cbc);
i("AES-CFB", M_OptionsManager_maybe.cipher.modes.cfb);
i("AES-OFB", M_OptionsManager_maybe.cipher.modes.ofb);
i("AES-CTR", M_OptionsManager_maybe.cipher.modes.ctr);
i("AES-GCM", M_OptionsManager_maybe.cipher.modes.gcm);
var o;
var s;
var a;
var c;
var l;
var u = false;
function d() {
  u = true;
  a = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
  for (e = new Array(256), t = 0, undefined; t < 128; ++t) {
    var e;
    var t;
    e[t] = t << 1;
    e[t + 128] = ((t + 128) << 1) ^ 283;
  }
  for (
    o = new Array(256),
      s = new Array(256),
      c = new Array(4),
      l = new Array(4),
      t = 0;
    t < 4;
    ++t
  ) {
    c[t] = new Array(256);
    l[t] = new Array(256);
  }
  var r;
  var n;
  var i;
  var d;
  var p;
  var h;
  var f;
  var g = 0;
  var m = 0;
  for (t = 0; t < 256; ++t) {
    d =
      ((d = m ^ (m << 1) ^ (m << 2) ^ (m << 3) ^ (m << 4)) >> 8) ^
      (255 & d) ^
      99;
    o[g] = d;
    s[d] = g;
    h = ((p = e[d]) << 24) ^ (d << 16) ^ (d << 8) ^ d ^ p;
    f =
      (((r = e[g]) ^ (n = e[r]) ^ (i = e[n])) << 24) ^
      ((g ^ i) << 16) ^
      ((g ^ n ^ i) << 8) ^
      g ^
      r ^
      i;
    for (var y = 0; y < 4; ++y) {
      c[y][g] = h;
      l[y][d] = f;
      h = (h << 24) | (h >>> 8);
      f = (f << 24) | (f >>> 8);
    }
    if (0 === g) {
      g = m = 1;
    } else {
      g = r ^ e[e[e[r ^ i]]];
      m ^= e[e[m]];
    }
  }
}
function p(e, t) {
  for (
    n = e.slice(0), i = 1, s = n.length, c = 4 * (s + 6 + 1), u = s, undefined;
    u < c;
    ++u
  ) {
    var r;
    var n;
    var i;
    var s;
    var c;
    var u;
    r = n[u - 1];
    if (u % s == 0) {
      r =
        (o[(r >>> 16) & 255] << 24) ^
        (o[(r >>> 8) & 255] << 16) ^
        (o[255 & r] << 8) ^
        o[r >>> 24] ^
        (a[i] << 24);
      i++;
    } else {
      if (s > 6 && u % s == 4) {
        r =
          (o[r >>> 24] << 24) ^
          (o[(r >>> 16) & 255] << 16) ^
          (o[(r >>> 8) & 255] << 8) ^
          o[255 & r];
      }
    }
    n[u] = n[u - s] ^ r;
  }
  if (t) {
    for (
      p = l[0],
        h = l[1],
        f = l[2],
        g = l[3],
        m = n.slice(0),
        y = ((u = 0), (c = n.length) - 4),
        undefined;
      u < c;
      u += 4, y -= 4
    ) {
      var d;
      var p;
      var h;
      var f;
      var g;
      var m;
      var y;
      if (0 === u || u === c - 4) {
        m[u] = n[y];
        m[u + 1] = n[y + 3];
        m[u + 2] = n[y + 2];
        m[u + 3] = n[y + 1];
      } else
        for (var v = 0; v < 4; ++v) {
          d = n[y + v];
          m[u + (3 & -v)] =
            p[o[d >>> 24]] ^
            h[o[(d >>> 16) & 255]] ^
            f[o[(d >>> 8) & 255]] ^
            g[o[255 & d]];
        }
    }
    n = m;
  }
  return n;
}
function h(e, t, r, n) {
  var i;
  var a;
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
  var b = e.length / 4 - 1;
  if (n) {
    i = l[0];
    a = l[1];
    u = l[2];
    d = l[3];
    p = s;
  } else {
    i = c[0];
    a = c[1];
    u = c[2];
    d = c[3];
    p = o;
  }
  h = t[0] ^ e[0];
  f = t[n ? 3 : 1] ^ e[1];
  g = t[2] ^ e[2];
  m = t[n ? 1 : 3] ^ e[3];
  for (w = 3, C = 1, undefined; C < b; ++C) {
    var w;
    var C;
    y =
      i[h >>> 24] ^
      a[(f >>> 16) & 255] ^
      u[(g >>> 8) & 255] ^
      d[255 & m] ^
      e[++w];
    v =
      i[f >>> 24] ^
      a[(g >>> 16) & 255] ^
      u[(m >>> 8) & 255] ^
      d[255 & h] ^
      e[++w];
    _ =
      i[g >>> 24] ^
      a[(m >>> 16) & 255] ^
      u[(h >>> 8) & 255] ^
      d[255 & f] ^
      e[++w];
    m =
      i[m >>> 24] ^
      a[(h >>> 16) & 255] ^
      u[(f >>> 8) & 255] ^
      d[255 & g] ^
      e[++w];
    h = y;
    f = v;
    g = _;
  }
  r[0] =
    (p[h >>> 24] << 24) ^
    (p[(f >>> 16) & 255] << 16) ^
    (p[(g >>> 8) & 255] << 8) ^
    p[255 & m] ^
    e[++w];
  r[n ? 3 : 1] =
    (p[f >>> 24] << 24) ^
    (p[(g >>> 16) & 255] << 16) ^
    (p[(m >>> 8) & 255] << 8) ^
    p[255 & h] ^
    e[++w];
  r[2] =
    (p[g >>> 24] << 24) ^
    (p[(m >>> 16) & 255] << 16) ^
    (p[(h >>> 8) & 255] << 8) ^
    p[255 & f] ^
    e[++w];
  r[n ? 1 : 3] =
    (p[m >>> 24] << 24) ^
    (p[(h >>> 16) & 255] << 16) ^
    (p[(f >>> 8) & 255] << 8) ^
    p[255 & g] ^
    e[++w];
}
function f(e) {
  var t;
  var r = "AES-" + ((e = e || {}).mode || "CBC").toUpperCase();
  var i = (t = e.decrypt
    ? M_OptionsManager_maybe.cipher.createDecipher(r, e.key)
    : M_OptionsManager_maybe.cipher.createCipher(r, e.key)).start;
  t.start = function (e, r) {
    var o = null;
    if (r instanceof M_OptionsManager_maybe.util.ByteBuffer) {
      o = r;
      r = {};
    }
    (r = r || {}).output = o;
    r.iv = e;
    i.call(t, r);
  };
  return t;
}
