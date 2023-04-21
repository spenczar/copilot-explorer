var M_OptionsManager_maybe = require("OptionsManager");
require("md-algorithms-module");
require("binary-data-reader");
var i =
  (module.exports =
  M_OptionsManager_maybe.sha512 =
    M_OptionsManager_maybe.sha512 || {});
M_OptionsManager_maybe.md.sha512 = M_OptionsManager_maybe.md.algorithms.sha512 =
  i;
var o =
  (M_OptionsManager_maybe.sha384 =
  M_OptionsManager_maybe.sha512.sha384 =
    M_OptionsManager_maybe.sha512.sha384 || {});
o.create = function () {
  return i.create("SHA-384");
};
M_OptionsManager_maybe.md.sha384 = M_OptionsManager_maybe.md.algorithms.sha384 =
  o;
M_OptionsManager_maybe.sha512.sha256 = M_OptionsManager_maybe.sha512.sha256 || {
  create: function () {
    return i.create("SHA-512/256");
  },
};
M_OptionsManager_maybe.md["sha512/256"] = M_OptionsManager_maybe.md.algorithms[
  "sha512/256"
] = M_OptionsManager_maybe.sha512.sha256;
M_OptionsManager_maybe.sha512.sha224 = M_OptionsManager_maybe.sha512.sha224 || {
  create: function () {
    return i.create("SHA-512/224");
  },
};
M_OptionsManager_maybe.md["sha512/224"] = M_OptionsManager_maybe.md.algorithms[
  "sha512/224"
] = M_OptionsManager_maybe.sha512.sha224;
i.create = function (e) {
  if (a) {
    s = String.fromCharCode(128);
    s += M_OptionsManager_maybe.util.fillString(String.fromCharCode(0), 128);
    c = [
      [1116352408, 3609767458],
      [1899447441, 602891725],
      [3049323471, 3964484399],
      [3921009573, 2173295548],
      [961987163, 4081628472],
      [1508970993, 3053834265],
      [2453635748, 2937671579],
      [2870763221, 3664609560],
      [3624381080, 2734883394],
      [310598401, 1164996542],
      [607225278, 1323610764],
      [1426881987, 3590304994],
      [1925078388, 4068182383],
      [2162078206, 991336113],
      [2614888103, 633803317],
      [3248222580, 3479774868],
      [3835390401, 2666613458],
      [4022224774, 944711139],
      [264347078, 2341262773],
      [604807628, 2007800933],
      [770255983, 1495990901],
      [1249150122, 1856431235],
      [1555081692, 3175218132],
      [1996064986, 2198950837],
      [2554220882, 3999719339],
      [2821834349, 766784016],
      [2952996808, 2566594879],
      [3210313671, 3203337956],
      [3336571891, 1034457026],
      [3584528711, 2466948901],
      [113926993, 3758326383],
      [338241895, 168717936],
      [666307205, 1188179964],
      [773529912, 1546045734],
      [1294757372, 1522805485],
      [1396182291, 2643833823],
      [1695183700, 2343527390],
      [1986661051, 1014477480],
      [2177026350, 1206759142],
      [2456956037, 344077627],
      [2730485921, 1290863460],
      [2820302411, 3158454273],
      [3259730800, 3505952657],
      [3345764771, 106217008],
      [3516065817, 3606008344],
      [3600352804, 1432725776],
      [4094571909, 1467031594],
      [275423344, 851169720],
      [430227734, 3100823752],
      [506948616, 1363258195],
      [659060556, 3750685593],
      [883997877, 3785050280],
      [958139571, 3318307427],
      [1322822218, 3812723403],
      [1537002063, 2003034995],
      [1747873779, 3602036899],
      [1955562222, 1575990012],
      [2024104815, 1125592928],
      [2227730452, 2716904306],
      [2361852424, 442776044],
      [2428436474, 593698344],
      [2756734187, 3733110249],
      [3204031479, 2999351573],
      [3329325298, 3815920427],
      [3391569614, 3928383900],
      [3515267271, 566280711],
      [3940187606, 3454069534],
      [4118630271, 4000239992],
      [116418474, 1914138554],
      [174292421, 2731055270],
      [289380356, 3203993006],
      [460393269, 320620315],
      [685471733, 587496836],
      [852142971, 1086792851],
      [1017036298, 365543100],
      [1126000580, 2618297676],
      [1288033470, 3409855158],
      [1501505948, 4234509866],
      [1607167915, 987167468],
      [1816402316, 1246189591],
    ];
    (l = {})["SHA-512"] = [
      [1779033703, 4089235720],
      [3144134277, 2227873595],
      [1013904242, 4271175723],
      [2773480762, 1595750129],
      [1359893119, 2917565137],
      [2600822924, 725511199],
      [528734635, 4215389547],
      [1541459225, 327033209],
    ];
    l["SHA-384"] = [
      [3418070365, 3238371032],
      [1654270250, 914150663],
      [2438529370, 812702999],
      [355462360, 4144912697],
      [1731405415, 4290775857],
      [2394180231, 1750603025],
      [3675008525, 1694076839],
      [1203062813, 3204075428],
    ];
    l["SHA-512/256"] = [
      [573645204, 4230739756],
      [2673172387, 3360449730],
      [596883563, 1867755857],
      [2520282905, 1497426621],
      [2519219938, 2827943907],
      [3193839141, 1401305490],
      [721525244, 746961066],
      [246885852, 2177182882],
    ];
    l["SHA-512/224"] = [
      [2352822216, 424955298],
      [1944164710, 2312950998],
      [502970286, 855612546],
      [1738396948, 1479516111],
      [258812777, 2077511080],
      [2011393907, 79989058],
      [1067287976, 1780299464],
      [286451373, 2446758561],
    ];
    a = true;
  }
  if (undefined === e) {
    e = "SHA-512";
  }
  if (!(e in l)) throw new Error("Invalid SHA-512 algorithm: " + e);
  for (
    t = l[e],
      r = null,
      i = M_OptionsManager_maybe.util.createBuffer(),
      o = new Array(80),
      d = 0,
      undefined;
    d < 80;
    ++d
  ) {
    var t;
    var r;
    var i;
    var o;
    var d;
    o[d] = new Array(2);
  }
  var p = 64;
  switch (e) {
    case "SHA-384":
      p = 48;
      break;
    case "SHA-512/256":
      p = 32;
      break;
    case "SHA-512/224":
      p = 28;
  }
  var h = {
    algorithm: e.replace("-", "").toLowerCase(),
    blockLength: 128,
    digestLength: p,
    messageLength: 0,
    fullMessageLength: null,
    messageLengthSize: 16,
    start: function () {
      h.messageLength = 0;
      h.fullMessageLength = h.messageLength128 = [];
      for (e = h.messageLengthSize / 4, o = 0, undefined; o < e; ++o) {
        var e;
        var o;
        h.fullMessageLength.push(0);
      }
      for (
        i = M_OptionsManager_maybe.util.createBuffer(),
          r = new Array(t.length),
          o = 0;
        o < t.length;
        ++o
      )
        r[o] = t[o].slice(0);
      return h;
    },
  };
  h.start();
  h.update = function (e, t) {
    if ("utf8" === t) {
      e = M_OptionsManager_maybe.util.encodeUtf8(e);
    }
    var s = e.length;
    h.messageLength += s;
    s = [(s / 4294967296) >>> 0, s >>> 0];
    for (var a = h.fullMessageLength.length - 1; a >= 0; --a) {
      h.fullMessageLength[a] += s[1];
      s[1] = s[0] + ((h.fullMessageLength[a] / 4294967296) >>> 0);
      h.fullMessageLength[a] = h.fullMessageLength[a] >>> 0;
      s[0] = (s[1] / 4294967296) >>> 0;
    }
    i.putBytes(e);
    u(r, o, i);
    if (i.read > 2048 || 0 === i.length()) {
      i.compact();
    }
    return h;
  };
  h.digest = function () {
    var t = M_OptionsManager_maybe.util.createBuffer();
    t.putBytes(i.bytes());
    var a;
    var c =
      (h.fullMessageLength[h.fullMessageLength.length - 1] +
        h.messageLengthSize) &
      (h.blockLength - 1);
    t.putBytes(s.substr(0, h.blockLength - c));
    for (
      l = 8 * h.fullMessageLength[0], d = 0, undefined;
      d < h.fullMessageLength.length - 1;
      ++d
    ) {
      var l;
      var d;
      l += ((a = 8 * h.fullMessageLength[d + 1]) / 4294967296) >>> 0;
      t.putInt32(l >>> 0);
      l = a >>> 0;
    }
    t.putInt32(l);
    var p = new Array(r.length);
    for (d = 0; d < r.length; ++d) p[d] = r[d].slice(0);
    u(p, o, t);
    var f;
    var g = M_OptionsManager_maybe.util.createBuffer();
    for (
      f =
        "SHA-512" === e
          ? p.length
          : "SHA-384" === e
          ? p.length - 2
          : p.length - 4,
        d = 0;
      d < f;
      ++d
    ) {
      g.putInt32(p[d][0]);
      if (d === f - 1 && "SHA-512/224" === e) {
        g.putInt32(p[d][1]);
      }
    }
    return g;
  };
  return h;
};
var s = null;
var a = false;
var c = null;
var l = null;
function u(e, t, r) {
  for (B = r.length(), undefined; B >= 128; ) {
    var n;
    var i;
    var o;
    var s;
    var a;
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
    var b;
    var w;
    var C;
    var E;
    var T;
    var S;
    var x;
    var k;
    var I;
    var A;
    var P;
    var R;
    var N;
    var O;
    var L;
    var D;
    var M;
    var B;
    for (P = 0; P < 16; ++P) {
      t[P][0] = r.getInt32() >>> 0;
      t[P][1] = r.getInt32() >>> 0;
    }
    for (; P < 80; ++P) {
      n =
        ((((R = (O = t[P - 2])[0]) >>> 19) | ((N = O[1]) << 13)) ^
          ((N >>> 29) | (R << 3)) ^
          (R >>> 6)) >>>
        0;
      i =
        (((R << 13) | (N >>> 19)) ^
          ((N << 3) | (R >>> 29)) ^
          ((R << 26) | (N >>> 6))) >>>
        0;
      o =
        ((((R = (D = t[P - 15])[0]) >>> 1) | ((N = D[1]) << 31)) ^
          ((R >>> 8) | (N << 24)) ^
          (R >>> 7)) >>>
        0;
      s =
        (((R << 31) | (N >>> 1)) ^
          ((R << 24) | (N >>> 8)) ^
          ((R << 25) | (N >>> 7))) >>>
        0;
      L = t[P - 7];
      M = t[P - 16];
      N = i + L[1] + s + M[1];
      t[P][0] = (n + L[0] + o + M[0] + ((N / 4294967296) >>> 0)) >>> 0;
      t[P][1] = N >>> 0;
    }
    for (
      f = e[0][0],
        g = e[0][1],
        m = e[1][0],
        y = e[1][1],
        v = e[2][0],
        _ = e[2][1],
        b = e[3][0],
        w = e[3][1],
        C = e[4][0],
        E = e[4][1],
        T = e[5][0],
        S = e[5][1],
        x = e[6][0],
        k = e[6][1],
        I = e[7][0],
        A = e[7][1],
        P = 0;
      P < 80;
      ++P
    ) {
      u =
        (((C >>> 14) | (E << 18)) ^
          ((C >>> 18) | (E << 14)) ^
          ((E >>> 9) | (C << 23))) >>>
        0;
      d = (x ^ (C & (T ^ x))) >>> 0;
      a =
        (((f >>> 28) | (g << 4)) ^
          ((g >>> 2) | (f << 30)) ^
          ((g >>> 7) | (f << 25))) >>>
        0;
      l =
        (((f << 4) | (g >>> 28)) ^
          ((g << 30) | (f >>> 2)) ^
          ((g << 25) | (f >>> 7))) >>>
        0;
      p = ((f & m) | (v & (f ^ m))) >>> 0;
      h = ((g & y) | (_ & (g ^ y))) >>> 0;
      N =
        A +
        ((((C << 18) | (E >>> 14)) ^
          ((C << 14) | (E >>> 18)) ^
          ((E << 23) | (C >>> 9))) >>>
          0) +
        ((k ^ (E & (S ^ k))) >>> 0) +
        c[P][1] +
        t[P][1];
      n = (I + u + d + c[P][0] + t[P][0] + ((N / 4294967296) >>> 0)) >>> 0;
      i = N >>> 0;
      o = (a + p + (((N = l + h) / 4294967296) >>> 0)) >>> 0;
      s = N >>> 0;
      I = x;
      A = k;
      x = T;
      k = S;
      T = C;
      S = E;
      C = (b + n + (((N = w + i) / 4294967296) >>> 0)) >>> 0;
      E = N >>> 0;
      b = v;
      w = _;
      v = m;
      _ = y;
      m = f;
      y = g;
      f = (n + o + (((N = i + s) / 4294967296) >>> 0)) >>> 0;
      g = N >>> 0;
    }
    N = e[0][1] + g;
    e[0][0] = (e[0][0] + f + ((N / 4294967296) >>> 0)) >>> 0;
    e[0][1] = N >>> 0;
    N = e[1][1] + y;
    e[1][0] = (e[1][0] + m + ((N / 4294967296) >>> 0)) >>> 0;
    e[1][1] = N >>> 0;
    N = e[2][1] + _;
    e[2][0] = (e[2][0] + v + ((N / 4294967296) >>> 0)) >>> 0;
    e[2][1] = N >>> 0;
    N = e[3][1] + w;
    e[3][0] = (e[3][0] + b + ((N / 4294967296) >>> 0)) >>> 0;
    e[3][1] = N >>> 0;
    N = e[4][1] + E;
    e[4][0] = (e[4][0] + C + ((N / 4294967296) >>> 0)) >>> 0;
    e[4][1] = N >>> 0;
    N = e[5][1] + S;
    e[5][0] = (e[5][0] + T + ((N / 4294967296) >>> 0)) >>> 0;
    e[5][1] = N >>> 0;
    N = e[6][1] + k;
    e[6][0] = (e[6][0] + x + ((N / 4294967296) >>> 0)) >>> 0;
    e[6][1] = N >>> 0;
    N = e[7][1] + A;
    e[7][0] = (e[7][0] + I + ((N / 4294967296) >>> 0)) >>> 0;
    e[7][1] = N >>> 0;
    B -= 128;
  }
}
