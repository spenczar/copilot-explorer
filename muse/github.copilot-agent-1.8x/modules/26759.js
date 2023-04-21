var n = require(56105);
require(56827);
var i = null;
if (
  !n.util.isNodejs ||
  n.options.usePureJavaScript ||
  process.versions["node-webkit"]
) {
  i = require("crypto");
}
(module.exports = n.prng = n.prng || {}).create = function (e) {
  for (
    t = {
      plugin: e,
      key: null,
      seed: null,
      time: null,
      reseeds: 0,
      generated: 0,
      keyBytes: "",
    },
      r = e.md,
      o = new Array(32),
      s = 0,
      undefined;
    s < 32;
    ++s
  ) {
    var t;
    var r;
    var o;
    var s;
    o[s] = r.create();
  }
  function a() {
    if (t.pools[0].messageLength >= 32) return c();
    var e = (32 - t.pools[0].messageLength) << 5;
    t.collect(t.seedFileSync(e));
    c();
  }
  function c() {
    t.reseeds = 4294967295 === t.reseeds ? 0 : t.reseeds + 1;
    var e = t.plugin.md.create();
    e.update(t.keyBytes);
    for (r = 1, n = 0, undefined; n < 32; ++n) {
      var r;
      var n;
      if (t.reseeds % r == 0) {
        e.update(t.pools[n].digest().getBytes());
        t.pools[n].start();
      }
      r <<= 1;
    }
    t.keyBytes = e.digest().getBytes();
    e.start();
    e.update(t.keyBytes);
    var i = e.digest().getBytes();
    t.key = t.plugin.formatKey(t.keyBytes);
    t.seed = t.plugin.formatSeed(i);
    t.generated = 0;
  }
  function l(e) {
    var t = null;
    var r = n.util.globalScope;
    var i = r.crypto || r.msCrypto;
    if (i && i.getRandomValues) {
      t = function (e) {
        return i.getRandomValues(e);
      };
    }
    var o = n.util.createBuffer();
    if (t)
      for (; o.length() < e; ) {
        var s = Math.max(1, Math.min(e - o.length(), 65536) / 4);
        var a = new Uint32Array(Math.floor(s));
        try {
          t(a);
          for (var c = 0; c < a.length; ++c) o.putInt32(a[c]);
        } catch (e) {
          if (
            !(
              "undefined" != typeof QuotaExceededError &&
              e instanceof QuotaExceededError
            )
          )
            throw e;
        }
      }
    if (o.length() < e)
      for (p = Math.floor(65536 * Math.random()), undefined; o.length() < e; ) {
        var l;
        var u;
        var d;
        var p;
        for (
          u = 16807 * (65535 & p),
            u += (32767 & (l = 16807 * (p >> 16))) << 16,
            p = 4294967295 & (u = (2147483647 & (u += l >> 15)) + (u >> 31)),
            c = 0;
          c < 3;
          ++c
        ) {
          d = p >>> (c << 3);
          d ^= Math.floor(256 * Math.random());
          o.putByte(255 & d);
        }
      }
    return o.getBytes(e);
  }
  t.pools = o;
  t.pool = 0;
  t.generate = function (e, r) {
    if (!r) return t.generateSync(e);
    var i = t.plugin.cipher;
    var o = t.plugin.increment;
    var s = t.plugin.formatKey;
    var a = t.plugin.formatSeed;
    var l = n.util.createBuffer();
    t.key = null;
    (function u(d) {
      if (d) return r(d);
      if (l.length() >= e) return r(null, l.getBytes(e));
      if (t.generated > 1048575) {
        t.key = null;
      }
      if (null === t.key)
        return n.util.nextTick(function () {
          !(function (e) {
            if (t.pools[0].messageLength >= 32) return c(), e();
            var r = (32 - t.pools[0].messageLength) << 5;
            t.seedFile(r, function (r, n) {
              if (r) return e(r);
              t.collect(n), c(), e();
            });
          })(u);
        });
      var p = i(t.key, t.seed);
      t.generated += p.length;
      l.putBytes(p);
      t.key = s(i(t.key, o(t.seed)));
      t.seed = a(i(t.key, t.seed));
      n.util.setImmediate(u);
    })();
  };
  t.generateSync = function (e) {
    var r = t.plugin.cipher;
    var i = t.plugin.increment;
    var o = t.plugin.formatKey;
    var s = t.plugin.formatSeed;
    t.key = null;
    for (var c = n.util.createBuffer(); c.length() < e; ) {
      if (t.generated > 1048575) {
        t.key = null;
      }
      if (null === t.key) {
        a();
      }
      var l = r(t.key, t.seed);
      t.generated += l.length;
      c.putBytes(l);
      t.key = o(r(t.key, i(t.seed)));
      t.seed = s(r(t.key, t.seed));
    }
    return c.getBytes(e);
  };
  if (i) {
    t.seedFile = function (e, t) {
      i.randomBytes(e, function (e, r) {
        if (e) return t(e);
        t(null, r.toString());
      });
    };
    t.seedFileSync = function (e) {
      return i.randomBytes(e).toString();
    };
  } else {
    t.seedFile = function (e, t) {
      try {
        t(null, l(e));
      } catch (e) {
        t(e);
      }
    };
    t.seedFileSync = l;
  }
  t.collect = function (e) {
    for (r = e.length, n = 0, undefined; n < r; ++n) {
      var r;
      var n;
      t.pools[t.pool].update(e.substr(n, 1));
      t.pool = 31 === t.pool ? 0 : t.pool + 1;
    }
  };
  t.collectInt = function (e, r) {
    for (n = "", i = 0, undefined; i < r; i += 8) {
      var n;
      var i;
      n += String.fromCharCode((e >> i) & 255);
    }
    t.collect(n);
  };
  t.registerWorker = function (e) {
    if (e === self) {
      t.seedFile = function (e, t) {
        self.addEventListener("message", function e(r) {
          var n = r.data;
          if (n.forge && n.forge.prng) {
            self.removeEventListener("message", e);
            t(n.forge.prng.err, n.forge.prng.bytes);
          }
        });
        self.postMessage({
          forge: {
            prng: {
              needed: e,
            },
          },
        });
      };
    } else {
      e.addEventListener("message", function (r) {
        var n = r.data;
        if (n.forge && n.forge.prng) {
          t.seedFile(n.forge.prng.needed, function (t, r) {
            e.postMessage({
              forge: {
                prng: {
                  err: t,
                  bytes: r,
                },
              },
            });
          });
        }
      });
    }
  };
  return t;
};