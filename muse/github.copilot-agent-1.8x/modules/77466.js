var n = require(56105);
require(56827);
require(10017);
require(46572);
(function () {
  if (n.prime) module.exports = n.prime;
  else {
    var t = (module.exports = n.prime = n.prime || {});
    var r = n.jsbn.BigInteger;
    var i = [6, 4, 2, 4, 2, 4, 6, 2];
    var o = new r(null);
    o.fromInt(30);
    var s = function (e, t) {
      return e | t;
    };
    t.generateProbablePrime = function (e, t, i) {
      if ("function" == typeof t) {
        i = t;
        t = {};
      }
      var o = (t = t || {}).algorithm || "PRIMEINC";
      if ("string" == typeof o) {
        o = {
          name: o,
        };
      }
      o.options = o.options || {};
      var s = t.prng || n.random;
      var c = {
        nextBytes: function (e) {
          for (
            t = s.getBytesSync(e.length), r = 0, undefined;
            r < e.length;
            ++r
          ) {
            var t;
            var r;
            e[r] = t.charCodeAt(r);
          }
        },
      };
      if ("PRIMEINC" === o.name)
        return (function (e, t, i, o) {
          return "workers" in i
            ? (function (e, t, i, o) {
                if ("undefined" == typeof Worker) return a(e, t, i, o);
                var s = l(e, t);
                var c = i.workers;
                var u = i.workLoad || 100;
                var d = (30 * u) / 8;
                var p = i.workerScript || "forge/prime.worker.js";
                if (-1 === c)
                  return n.util.estimateCores(function (e, t) {
                    if (e) {
                      t = 2;
                    }
                    c = t - 1;
                    h();
                  });
                function h() {
                  c = Math.max(1, c);
                  for (n = [], i = 0, undefined; i < c; ++i) {
                    var n;
                    var i;
                    n[i] = new Worker(p);
                  }
                  for (i = 0; i < c; ++i) n[i].addEventListener("message", h);
                  var a = false;
                  function h(i) {
                    if (!a) {
                      var c = i.data;
                      if (c.found) {
                        for (var p = 0; p < n.length; ++p) n[p].terminate();
                        a = true;
                        return o(null, new r(c.prime, 16));
                      }
                      if (s.bitLength() > e) {
                        s = l(e, t);
                      }
                      var h = s.toString(16);
                      i.target.postMessage({
                        hex: h,
                        workLoad: u,
                      });
                      s.dAddOffset(d, 0);
                    }
                  }
                }
                h();
              })(e, t, i, o)
            : a(e, t, i, o);
        })(e, c, o.options, i);
      throw new Error("Invalid prime generation algorithm: " + o.name);
    };
  }
  function a(e, t, r, n) {
    var i = l(e, t);
    var o = (function (e) {
      return e <= 100
        ? 27
        : e <= 150
        ? 18
        : e <= 200
        ? 15
        : e <= 250
        ? 12
        : e <= 300
        ? 9
        : e <= 350
        ? 8
        : e <= 400
        ? 7
        : e <= 500
        ? 6
        : e <= 600
        ? 5
        : e <= 800
        ? 4
        : e <= 1250
        ? 3
        : 2;
    })(i.bitLength());
    if ("millerRabinTests" in r) {
      o = r.millerRabinTests;
    }
    var s = 10;
    if ("maxBlockTime" in r) {
      s = r.maxBlockTime;
    }
    c(i, e, t, 0, o, s, n);
  }
  function c(e, t, r, o, s, a, u) {
    var d = +new Date();
    do {
      if (e.bitLength() > t) {
        e = l(t, r);
      }
      if (e.isProbablePrime(s)) return u(null, e);
      e.dAddOffset(i[o++ % 8], 0);
    } while (a < 0 || +new Date() - d < a);
    n.util.setImmediate(function () {
      c(e, t, r, o, s, a, u);
    });
  }
  function l(e, t) {
    var n = new r(e, t);
    var i = e - 1;
    if (n.testBit(i)) {
      n.bitwiseTo(r.ONE.shiftLeft(i), s, n);
    }
    n.dAddOffset(31 - n.mod(o).byteValue(), 0);
    return n;
  }
})();