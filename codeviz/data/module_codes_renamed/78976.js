var M_SecureRandomNumberGenerator_maybe;
var i;
var o;
var s;
var a;
var c;
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
M_SecureRandomNumberGenerator_maybe = require("SecureRandomNumberGenerator");
require("EvpKDF-Module");
module.exports = void (
  M_SecureRandomNumberGenerator_maybe.lib.Cipher ||
  ((i = M_SecureRandomNumberGenerator_maybe),
  (o = i.lib),
  (s = o.Base),
  (a = o.WordArray),
  (c = o.BufferedBlockAlgorithm),
  (l = i.enc),
  l.Utf8,
  (u = l.Base64),
  (d = i.algo.EvpKDF),
  (p = o.Cipher =
    c.extend({
      cfg: s.extend(),
      createEncryptor: function (e, t) {
        return this.create(this._ENC_XFORM_MODE, e, t);
      },
      createDecryptor: function (e, t) {
        return this.create(this._DEC_XFORM_MODE, e, t);
      },
      init: function (e, t, r) {
        (this.cfg = this.cfg.extend(r)),
          (this._xformMode = e),
          (this._key = t),
          this.reset();
      },
      reset: function () {
        c.reset.call(this), this._doReset();
      },
      process: function (e) {
        return this._append(e), this._process();
      },
      finalize: function (e) {
        return e && this._append(e), this._doFinalize();
      },
      keySize: 4,
      ivSize: 4,
      _ENC_XFORM_MODE: 1,
      _DEC_XFORM_MODE: 2,
      _createHelper: (function () {
        function e(e) {
          return "string" == typeof e ? w : _;
        }
        return function (t) {
          return {
            encrypt: function (r, n, i) {
              return e(n).encrypt(t, r, n, i);
            },
            decrypt: function (r, n, i) {
              return e(n).decrypt(t, r, n, i);
            },
          };
        };
      })(),
    })),
  (o.StreamCipher = p.extend({
    _doFinalize: function () {
      return this._process(!0);
    },
    blockSize: 1,
  })),
  (h = i.mode = {}),
  (f = o.BlockCipherMode =
    s.extend({
      createEncryptor: function (e, t) {
        return this.Encryptor.create(e, t);
      },
      createDecryptor: function (e, t) {
        return this.Decryptor.create(e, t);
      },
      init: function (e, t) {
        (this._cipher = e), (this._iv = t);
      },
    })),
  (g = h.CBC =
    (function () {
      var e = f.extend();
      function t(e, t, r) {
        var n,
          i = this._iv;
        i ? ((n = i), (this._iv = void 0)) : (n = this._prevBlock);
        for (var o = 0; o < r; o++) e[t + o] ^= n[o];
      }
      return (
        (e.Encryptor = e.extend({
          processBlock: function (e, r) {
            var n = this._cipher,
              i = n.blockSize;
            t.call(this, e, r, i),
              n.encryptBlock(e, r),
              (this._prevBlock = e.slice(r, r + i));
          },
        })),
        (e.Decryptor = e.extend({
          processBlock: function (e, r) {
            var n = this._cipher,
              i = n.blockSize,
              o = e.slice(r, r + i);
            n.decryptBlock(e, r), t.call(this, e, r, i), (this._prevBlock = o);
          },
        })),
        e
      );
    })()),
  (m = (i.pad = {}).Pkcs7 =
    {
      pad: function (e, t) {
        for (
          var r = 4 * t,
            n = r - (e.sigBytes % r),
            i = (n << 24) | (n << 16) | (n << 8) | n,
            o = [],
            s = 0;
          s < n;
          s += 4
        )
          o.push(i);
        var c = a.create(o, n);
        e.concat(c);
      },
      unpad: function (e) {
        var t = 255 & e.words[(e.sigBytes - 1) >>> 2];
        e.sigBytes -= t;
      },
    }),
  (o.BlockCipher = p.extend({
    cfg: p.cfg.extend({
      mode: g,
      padding: m,
    }),
    reset: function () {
      var e;
      p.reset.call(this);
      var t = this.cfg,
        r = t.iv,
        n = t.mode;
      this._xformMode == this._ENC_XFORM_MODE
        ? (e = n.createEncryptor)
        : ((e = n.createDecryptor), (this._minBufferSize = 1)),
        this._mode && this._mode.__creator == e
          ? this._mode.init(this, r && r.words)
          : ((this._mode = e.call(n, this, r && r.words)),
            (this._mode.__creator = e));
    },
    _doProcessBlock: function (e, t) {
      this._mode.processBlock(e, t);
    },
    _doFinalize: function () {
      var e,
        t = this.cfg.padding;
      return (
        this._xformMode == this._ENC_XFORM_MODE
          ? (t.pad(this._data, this.blockSize), (e = this._process(!0)))
          : ((e = this._process(!0)), t.unpad(e)),
        e
      );
    },
    blockSize: 4,
  })),
  (y = o.CipherParams =
    s.extend({
      init: function (e) {
        this.mixIn(e);
      },
      toString: function (e) {
        return (e || this.formatter).stringify(this);
      },
    })),
  (v = (i.format = {}).OpenSSL =
    {
      stringify: function (e) {
        var t = e.ciphertext,
          r = e.salt;
        return (
          r ? a.create([1398893684, 1701076831]).concat(r).concat(t) : t
        ).toString(u);
      },
      parse: function (e) {
        var t,
          r = u.parse(e),
          n = r.words;
        return (
          1398893684 == n[0] &&
            1701076831 == n[1] &&
            ((t = a.create(n.slice(2, 4))), n.splice(0, 4), (r.sigBytes -= 16)),
          y.create({
            ciphertext: r,
            salt: t,
          })
        );
      },
    }),
  (_ = o.SerializableCipher =
    s.extend({
      cfg: s.extend({
        format: v,
      }),
      encrypt: function (e, t, r, n) {
        n = this.cfg.extend(n);
        var i = e.createEncryptor(r, n),
          o = i.finalize(t),
          s = i.cfg;
        return y.create({
          ciphertext: o,
          key: r,
          iv: s.iv,
          algorithm: e,
          mode: s.mode,
          padding: s.padding,
          blockSize: e.blockSize,
          formatter: n.format,
        });
      },
      decrypt: function (e, t, r, n) {
        return (
          (n = this.cfg.extend(n)),
          (t = this._parse(t, n.format)),
          e.createDecryptor(r, n).finalize(t.ciphertext)
        );
      },
      _parse: function (e, t) {
        return "string" == typeof e ? t.parse(e, this) : e;
      },
    })),
  (b = (i.kdf = {}).OpenSSL =
    {
      execute: function (e, t, r, n) {
        n || (n = a.random(8));
        var i = d
            .create({
              keySize: t + r,
            })
            .compute(e, n),
          o = a.create(i.words.slice(t), 4 * r);
        return (
          (i.sigBytes = 4 * t),
          y.create({
            key: i,
            iv: o,
            salt: n,
          })
        );
      },
    }),
  (w = o.PasswordBasedCipher =
    _.extend({
      cfg: _.cfg.extend({
        kdf: b,
      }),
      encrypt: function (e, t, r, n) {
        var i = (n = this.cfg.extend(n)).kdf.execute(r, e.keySize, e.ivSize);
        n.iv = i.iv;
        var o = _.encrypt.call(this, e, t, i.key, n);
        return o.mixIn(i), o;
      },
      decrypt: function (e, t, r, n) {
        (n = this.cfg.extend(n)), (t = this._parse(t, n.format));
        var i = n.kdf.execute(r, e.keySize, e.ivSize, t.salt);
        return (n.iv = i.iv), _.decrypt.call(this, e, t, i.key, n);
      },
    })))
);
