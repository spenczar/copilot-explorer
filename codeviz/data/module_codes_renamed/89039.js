var M_SecureRandomNumberGenerator_maybe;
M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator");
require("x64WordArrayModule");
(function () {
  var e = M_SecureRandomNumberGenerator_maybe;
  var t = e.lib.Hasher;
  var r = e.x64;
  var i = r.Word;
  var o = r.WordArray;
  var s = e.algo;
  function a() {
    return i.create.apply(i, arguments);
  }
  var c = [
    a(1116352408, 3609767458),
    a(1899447441, 602891725),
    a(3049323471, 3964484399),
    a(3921009573, 2173295548),
    a(961987163, 4081628472),
    a(1508970993, 3053834265),
    a(2453635748, 2937671579),
    a(2870763221, 3664609560),
    a(3624381080, 2734883394),
    a(310598401, 1164996542),
    a(607225278, 1323610764),
    a(1426881987, 3590304994),
    a(1925078388, 4068182383),
    a(2162078206, 991336113),
    a(2614888103, 633803317),
    a(3248222580, 3479774868),
    a(3835390401, 2666613458),
    a(4022224774, 944711139),
    a(264347078, 2341262773),
    a(604807628, 2007800933),
    a(770255983, 1495990901),
    a(1249150122, 1856431235),
    a(1555081692, 3175218132),
    a(1996064986, 2198950837),
    a(2554220882, 3999719339),
    a(2821834349, 766784016),
    a(2952996808, 2566594879),
    a(3210313671, 3203337956),
    a(3336571891, 1034457026),
    a(3584528711, 2466948901),
    a(113926993, 3758326383),
    a(338241895, 168717936),
    a(666307205, 1188179964),
    a(773529912, 1546045734),
    a(1294757372, 1522805485),
    a(1396182291, 2643833823),
    a(1695183700, 2343527390),
    a(1986661051, 1014477480),
    a(2177026350, 1206759142),
    a(2456956037, 344077627),
    a(2730485921, 1290863460),
    a(2820302411, 3158454273),
    a(3259730800, 3505952657),
    a(3345764771, 106217008),
    a(3516065817, 3606008344),
    a(3600352804, 1432725776),
    a(4094571909, 1467031594),
    a(275423344, 851169720),
    a(430227734, 3100823752),
    a(506948616, 1363258195),
    a(659060556, 3750685593),
    a(883997877, 3785050280),
    a(958139571, 3318307427),
    a(1322822218, 3812723403),
    a(1537002063, 2003034995),
    a(1747873779, 3602036899),
    a(1955562222, 1575990012),
    a(2024104815, 1125592928),
    a(2227730452, 2716904306),
    a(2361852424, 442776044),
    a(2428436474, 593698344),
    a(2756734187, 3733110249),
    a(3204031479, 2999351573),
    a(3329325298, 3815920427),
    a(3391569614, 3928383900),
    a(3515267271, 566280711),
    a(3940187606, 3454069534),
    a(4118630271, 4000239992),
    a(116418474, 1914138554),
    a(174292421, 2731055270),
    a(289380356, 3203993006),
    a(460393269, 320620315),
    a(685471733, 587496836),
    a(852142971, 1086792851),
    a(1017036298, 365543100),
    a(1126000580, 2618297676),
    a(1288033470, 3409855158),
    a(1501505948, 4234509866),
    a(1607167915, 987167468),
    a(1816402316, 1246189591),
  ];
  var l = [];
  !(function () {
    for (var e = 0; e < 80; e++) l[e] = a();
  })();
  var u = (s.SHA512 = t.extend({
    _doReset: function () {
      this._hash = new o.init([
        new i.init(1779033703, 4089235720),
        new i.init(3144134277, 2227873595),
        new i.init(1013904242, 4271175723),
        new i.init(2773480762, 1595750129),
        new i.init(1359893119, 2917565137),
        new i.init(2600822924, 725511199),
        new i.init(528734635, 4215389547),
        new i.init(1541459225, 327033209),
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
          u = r[5],
          d = r[6],
          p = r[7],
          h = n.high,
          f = n.low,
          g = i.high,
          m = i.low,
          y = o.high,
          v = o.low,
          _ = s.high,
          b = s.low,
          w = a.high,
          C = a.low,
          E = u.high,
          T = u.low,
          S = d.high,
          x = d.low,
          k = p.high,
          I = p.low,
          A = h,
          P = f,
          R = g,
          N = m,
          O = y,
          L = v,
          D = _,
          M = b,
          B = w,
          F = C,
          j = E,
          U = T,
          $ = S,
          q = x,
          H = k,
          V = I,
          z = 0,
          undefined;
        z < 80;
        z++
      ) {
        var r;
        var n;
        var i;
        var o;
        var s;
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
        var F;
        var j;
        var U;
        var $;
        var q;
        var H;
        var V;
        var z;
        var K;
        var W;
        var G = l[z];
        if (z < 16) {
          W = G.high = 0 | e[t + 2 * z];
          K = G.low = 0 | e[t + 2 * z + 1];
        } else {
          var Q = l[z - 15];
          var J = Q.high;
          var Y = Q.low;
          var X = ((J >>> 1) | (Y << 31)) ^ ((J >>> 8) | (Y << 24)) ^ (J >>> 7);
          var Z =
            ((Y >>> 1) | (J << 31)) ^
            ((Y >>> 8) | (J << 24)) ^
            ((Y >>> 7) | (J << 25));
          var ee = l[z - 2];
          var te = ee.high;
          var re = ee.low;
          var ne =
            ((te >>> 19) | (re << 13)) ^ ((te << 3) | (re >>> 29)) ^ (te >>> 6);
          var ie =
            ((re >>> 19) | (te << 13)) ^
            ((re << 3) | (te >>> 29)) ^
            ((re >>> 6) | (te << 26));
          var oe = l[z - 7];
          var se = oe.high;
          var ae = oe.low;
          var ce = l[z - 16];
          var le = ce.high;
          var ue = ce.low;
          W =
            (W =
              (W = X + se + ((K = Z + ae) >>> 0 < Z >>> 0 ? 1 : 0)) +
              ne +
              ((K += ie) >>> 0 < ie >>> 0 ? 1 : 0)) +
            le +
            ((K += ue) >>> 0 < ue >>> 0 ? 1 : 0);
          G.high = W;
          G.low = K;
        }
        var de;
        var pe = (B & j) ^ (~B & $);
        var he = (F & U) ^ (~F & q);
        var fe = (A & R) ^ (A & O) ^ (R & O);
        var ge = (P & N) ^ (P & L) ^ (N & L);
        var me =
          ((A >>> 28) | (P << 4)) ^
          ((A << 30) | (P >>> 2)) ^
          ((A << 25) | (P >>> 7));
        var ye =
          ((P >>> 28) | (A << 4)) ^
          ((P << 30) | (A >>> 2)) ^
          ((P << 25) | (A >>> 7));
        var ve =
          ((B >>> 14) | (F << 18)) ^
          ((B >>> 18) | (F << 14)) ^
          ((B << 23) | (F >>> 9));
        var _e =
          ((F >>> 14) | (B << 18)) ^
          ((F >>> 18) | (B << 14)) ^
          ((F << 23) | (B >>> 9));
        var be = c[z];
        var we = be.high;
        var Ce = be.low;
        var Ee = H + ve + ((de = V + _e) >>> 0 < V >>> 0 ? 1 : 0);
        var Te = ye + ge;
        H = $;
        V = q;
        $ = j;
        q = U;
        j = B;
        U = F;
        B =
          (D +
            (Ee =
              (Ee =
                (Ee = Ee + pe + ((de += he) >>> 0 < he >>> 0 ? 1 : 0)) +
                we +
                ((de += Ce) >>> 0 < Ce >>> 0 ? 1 : 0)) +
              W +
              ((de += K) >>> 0 < K >>> 0 ? 1 : 0)) +
            ((F = (M + de) | 0) >>> 0 < M >>> 0 ? 1 : 0)) |
          0;
        D = O;
        M = L;
        O = R;
        L = N;
        R = A;
        N = P;
        A =
          (Ee +
            (me + fe + (Te >>> 0 < ye >>> 0 ? 1 : 0)) +
            ((P = (de + Te) | 0) >>> 0 < de >>> 0 ? 1 : 0)) |
          0;
      }
      f = n.low = f + P;
      n.high = h + A + (f >>> 0 < P >>> 0 ? 1 : 0);
      m = i.low = m + N;
      i.high = g + R + (m >>> 0 < N >>> 0 ? 1 : 0);
      v = o.low = v + L;
      o.high = y + O + (v >>> 0 < L >>> 0 ? 1 : 0);
      b = s.low = b + M;
      s.high = _ + D + (b >>> 0 < M >>> 0 ? 1 : 0);
      C = a.low = C + F;
      a.high = w + B + (C >>> 0 < F >>> 0 ? 1 : 0);
      T = u.low = T + U;
      u.high = E + j + (T >>> 0 < U >>> 0 ? 1 : 0);
      x = d.low = x + q;
      d.high = S + $ + (x >>> 0 < q >>> 0 ? 1 : 0);
      I = p.low = I + V;
      p.high = k + H + (I >>> 0 < V >>> 0 ? 1 : 0);
    },
    _doFinalize: function () {
      var e = this._data;
      var t = e.words;
      var r = 8 * this._nDataBytes;
      var n = 8 * e.sigBytes;
      t[n >>> 5] |= 128 << (24 - (n % 32));
      t[30 + (((n + 128) >>> 10) << 5)] = Math.floor(r / 4294967296);
      t[31 + (((n + 128) >>> 10) << 5)] = r;
      e.sigBytes = 4 * t.length;
      this._process();
      return this._hash.toX32();
    },
    clone: function () {
      var e = t.clone.call(this);
      e._hash = this._hash.clone();
      return e;
    },
    blockSize: 32,
  }));
  e.SHA512 = t._createHelper(u);
  e.HmacSHA512 = t._createHmacHelper(u);
})();
module.exports = M_SecureRandomNumberGenerator_maybe.SHA512;
