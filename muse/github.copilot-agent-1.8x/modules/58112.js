var n;
n =
  n ||
  (function (e, t) {
    var n;
    if ("undefined" != typeof window && window.crypto) {
      n = window.crypto;
    }
    if (!n && "undefined" != typeof window && window.msCrypto) {
      n = window.msCrypto;
    }
    if (!n && "undefined" != typeof global && global.crypto) {
      n = global.crypto;
    }
    if (!n)
      try {
        n = require("crypto");
      } catch (e) {}
    var i = function () {
      if (n) {
        if ("function" == typeof n.getRandomValues)
          try {
            return n.getRandomValues(new Uint32Array(1))[0];
          } catch (e) {}
        if ("function" == typeof n.randomBytes)
          try {
            return n.randomBytes(4).readInt32LE();
          } catch (e) {}
      }
      throw new Error(
        "Native crypto module could not be used to get secure random number."
      );
    };
    var o =
      Object.create ||
      (function () {
        function e() {}
        return function (t) {
          var r;
          e.prototype = t;
          r = new e();
          e.prototype = null;
          return r;
        };
      })();
    var s = {};
    var a = (s.lib = {});
    var c = (a.Base = {
      extend: function (e) {
        var t = o(this);
        if (e) {
          t.mixIn(e);
        }
        if (t.hasOwnProperty("init") && this.init !== t.init) {
          t.init = function () {
            t.$super.init.apply(this, arguments);
          };
        }
        t.init.prototype = t;
        t.$super = this;
        return t;
      },
      create: function () {
        var e = this.extend();
        e.init.apply(e, arguments);
        return e;
      },
      init: function () {},
      mixIn: function (e) {
        for (var t in e)
          if (e.hasOwnProperty(t)) {
            this[t] = e[t];
          }
        if (e.hasOwnProperty("toString")) {
          this.toString = e.toString;
        }
      },
      clone: function () {
        return this.init.prototype.extend(this);
      },
    });
    var l = (a.WordArray = c.extend({
      init: function (e, t) {
        e = this.words = e || [];
        this.sigBytes = null != t ? t : 4 * e.length;
      },
      toString: function (e) {
        return (e || d).stringify(this);
      },
      concat: function (e) {
        var t = this.words;
        var r = e.words;
        var n = this.sigBytes;
        var i = e.sigBytes;
        this.clamp();
        if (n % 4)
          for (var o = 0; o < i; o++) {
            var s = (r[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
            t[(n + o) >>> 2] |= s << (24 - ((n + o) % 4) * 8);
          }
        else for (o = 0; o < i; o += 4) t[(n + o) >>> 2] = r[o >>> 2];
        this.sigBytes += i;
        return this;
      },
      clamp: function () {
        var t = this.words;
        var r = this.sigBytes;
        t[r >>> 2] &= 4294967295 << (32 - (r % 4) * 8);
        t.length = e.ceil(r / 4);
      },
      clone: function () {
        var e = c.clone.call(this);
        e.words = this.words.slice(0);
        return e;
      },
      random: function (e) {
        for (t = [], r = 0, undefined; r < e; r += 4) {
          var t;
          var r;
          t.push(i());
        }
        return new l.init(t, e);
      },
    }));
    var u = (s.enc = {});
    var d = (u.Hex = {
      stringify: function (e) {
        for (
          t = e.words, r = e.sigBytes, n = [], i = 0, undefined;
          i < r;
          i++
        ) {
          var t;
          var r;
          var n;
          var i;
          var o = (t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
          n.push((o >>> 4).toString(16));
          n.push((15 & o).toString(16));
        }
        return n.join("");
      },
      parse: function (e) {
        for (t = e.length, r = [], n = 0, undefined; n < t; n += 2) {
          var t;
          var r;
          var n;
          r[n >>> 3] |= parseInt(e.substr(n, 2), 16) << (24 - (n % 8) * 4);
        }
        return new l.init(r, t / 2);
      },
    });
    var p = (u.Latin1 = {
      stringify: function (e) {
        for (
          t = e.words, r = e.sigBytes, n = [], i = 0, undefined;
          i < r;
          i++
        ) {
          var t;
          var r;
          var n;
          var i;
          var o = (t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
          n.push(String.fromCharCode(o));
        }
        return n.join("");
      },
      parse: function (e) {
        for (t = e.length, r = [], n = 0, undefined; n < t; n++) {
          var t;
          var r;
          var n;
          r[n >>> 2] |= (255 & e.charCodeAt(n)) << (24 - (n % 4) * 8);
        }
        return new l.init(r, t);
      },
    });
    var h = (u.Utf8 = {
      stringify: function (e) {
        try {
          return decodeURIComponent(escape(p.stringify(e)));
        } catch (e) {
          throw new Error("Malformed UTF-8 data");
        }
      },
      parse: function (e) {
        return p.parse(unescape(encodeURIComponent(e)));
      },
    });
    var f = (a.BufferedBlockAlgorithm = c.extend({
      reset: function () {
        this._data = new l.init();
        this._nDataBytes = 0;
      },
      _append: function (e) {
        if ("string" == typeof e) {
          e = h.parse(e);
        }
        this._data.concat(e);
        this._nDataBytes += e.sigBytes;
      },
      _process: function (t) {
        var r;
        var n = this._data;
        var i = n.words;
        var o = n.sigBytes;
        var s = this.blockSize;
        var a = o / (4 * s);
        var c =
          (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * s;
        var u = e.min(4 * c, o);
        if (c) {
          for (var d = 0; d < c; d += s) this._doProcessBlock(i, d);
          r = i.splice(0, c);
          n.sigBytes -= u;
        }
        return new l.init(r, u);
      },
      clone: function () {
        var e = c.clone.call(this);
        e._data = this._data.clone();
        return e;
      },
      _minBufferSize: 0,
    }));
    var g =
      ((a.Hasher = f.extend({
        cfg: c.extend(),
        init: function (e) {
          this.cfg = this.cfg.extend(e);
          this.reset();
        },
        reset: function () {
          f.reset.call(this);
          this._doReset();
        },
        update: function (e) {
          this._append(e);
          this._process();
          return this;
        },
        finalize: function (e) {
          if (e) {
            this._append(e);
          }
          return this._doFinalize();
        },
        blockSize: 16,
        _createHelper: function (e) {
          return function (t, r) {
            return new e.init(r).finalize(t);
          };
        },
        _createHmacHelper: function (e) {
          return function (t, r) {
            return new g.HMAC.init(e, r).finalize(t);
          };
        },
      })),
      (s.algo = {}));
    return s;
  })(Math);
module.exports = n;