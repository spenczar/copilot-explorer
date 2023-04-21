var n = require(56105);
require(61057);
require(10017);
require(81877);
require(30585);
require(77466);
require(46572);
require(56827);
if (void 0 === i) var i = n.jsbn.BigInteger;
var o = n.util.isNodejs ? require("crypto") : null;
var s = n.asn1;
var a = n.util;
n.pki = n.pki || {};
module.exports = n.pki.rsa = n.rsa = n.rsa || {};
var c = n.pki;
var l = [6, 4, 2, 4, 2, 4, 6, 2];
var u = {
  name: "PrivateKeyInfo",
  tagClass: s.Class.UNIVERSAL,
  type: s.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "PrivateKeyInfo.version",
      tagClass: s.Class.UNIVERSAL,
      type: s.Type.INTEGER,
      constructed: false,
      capture: "privateKeyVersion",
    },
    {
      name: "PrivateKeyInfo.privateKeyAlgorithm",
      tagClass: s.Class.UNIVERSAL,
      type: s.Type.SEQUENCE,
      constructed: true,
      value: [
        {
          name: "AlgorithmIdentifier.algorithm",
          tagClass: s.Class.UNIVERSAL,
          type: s.Type.OID,
          constructed: false,
          capture: "privateKeyOid",
        },
      ],
    },
    {
      name: "PrivateKeyInfo",
      tagClass: s.Class.UNIVERSAL,
      type: s.Type.OCTETSTRING,
      constructed: false,
      capture: "privateKey",
    },
  ],
};
var d = {
  name: "RSAPrivateKey",
  tagClass: s.Class.UNIVERSAL,
  type: s.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "RSAPrivateKey.version",
      tagClass: s.Class.UNIVERSAL,
      type: s.Type.INTEGER,
      constructed: false,
      capture: "privateKeyVersion",
    },
    {
      name: "RSAPrivateKey.modulus",
      tagClass: s.Class.UNIVERSAL,
      type: s.Type.INTEGER,
      constructed: false,
      capture: "privateKeyModulus",
    },
    {
      name: "RSAPrivateKey.publicExponent",
      tagClass: s.Class.UNIVERSAL,
      type: s.Type.INTEGER,
      constructed: false,
      capture: "privateKeyPublicExponent",
    },
    {
      name: "RSAPrivateKey.privateExponent",
      tagClass: s.Class.UNIVERSAL,
      type: s.Type.INTEGER,
      constructed: false,
      capture: "privateKeyPrivateExponent",
    },
    {
      name: "RSAPrivateKey.prime1",
      tagClass: s.Class.UNIVERSAL,
      type: s.Type.INTEGER,
      constructed: false,
      capture: "privateKeyPrime1",
    },
    {
      name: "RSAPrivateKey.prime2",
      tagClass: s.Class.UNIVERSAL,
      type: s.Type.INTEGER,
      constructed: false,
      capture: "privateKeyPrime2",
    },
    {
      name: "RSAPrivateKey.exponent1",
      tagClass: s.Class.UNIVERSAL,
      type: s.Type.INTEGER,
      constructed: false,
      capture: "privateKeyExponent1",
    },
    {
      name: "RSAPrivateKey.exponent2",
      tagClass: s.Class.UNIVERSAL,
      type: s.Type.INTEGER,
      constructed: false,
      capture: "privateKeyExponent2",
    },
    {
      name: "RSAPrivateKey.coefficient",
      tagClass: s.Class.UNIVERSAL,
      type: s.Type.INTEGER,
      constructed: false,
      capture: "privateKeyCoefficient",
    },
  ],
};
var p = {
  name: "RSAPublicKey",
  tagClass: s.Class.UNIVERSAL,
  type: s.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "RSAPublicKey.modulus",
      tagClass: s.Class.UNIVERSAL,
      type: s.Type.INTEGER,
      constructed: false,
      capture: "publicKeyModulus",
    },
    {
      name: "RSAPublicKey.exponent",
      tagClass: s.Class.UNIVERSAL,
      type: s.Type.INTEGER,
      constructed: false,
      capture: "publicKeyExponent",
    },
  ],
};
var h = (n.pki.rsa.publicKeyValidator = {
  name: "SubjectPublicKeyInfo",
  tagClass: s.Class.UNIVERSAL,
  type: s.Type.SEQUENCE,
  constructed: true,
  captureAsn1: "subjectPublicKeyInfo",
  value: [
    {
      name: "SubjectPublicKeyInfo.AlgorithmIdentifier",
      tagClass: s.Class.UNIVERSAL,
      type: s.Type.SEQUENCE,
      constructed: true,
      value: [
        {
          name: "AlgorithmIdentifier.algorithm",
          tagClass: s.Class.UNIVERSAL,
          type: s.Type.OID,
          constructed: false,
          capture: "publicKeyOid",
        },
      ],
    },
    {
      name: "SubjectPublicKeyInfo.subjectPublicKey",
      tagClass: s.Class.UNIVERSAL,
      type: s.Type.BITSTRING,
      constructed: false,
      value: [
        {
          name: "SubjectPublicKeyInfo.subjectPublicKey.RSAPublicKey",
          tagClass: s.Class.UNIVERSAL,
          type: s.Type.SEQUENCE,
          constructed: true,
          optional: true,
          captureAsn1: "rsaPublicKey",
        },
      ],
    },
  ],
});
var f = {
  name: "DigestInfo",
  tagClass: s.Class.UNIVERSAL,
  type: s.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "DigestInfo.DigestAlgorithm",
      tagClass: s.Class.UNIVERSAL,
      type: s.Type.SEQUENCE,
      constructed: true,
      value: [
        {
          name: "DigestInfo.DigestAlgorithm.algorithmIdentifier",
          tagClass: s.Class.UNIVERSAL,
          type: s.Type.OID,
          constructed: false,
          capture: "algorithmIdentifier",
        },
        {
          name: "DigestInfo.DigestAlgorithm.parameters",
          tagClass: s.Class.UNIVERSAL,
          type: s.Type.NULL,
          capture: "parameters",
          optional: true,
          constructed: false,
        },
      ],
    },
    {
      name: "DigestInfo.digest",
      tagClass: s.Class.UNIVERSAL,
      type: s.Type.OCTETSTRING,
      constructed: false,
      capture: "digest",
    },
  ],
};
var g = function (e) {
  var t;
  if (!(e.algorithm in c.oids)) {
    var r = new Error("Unknown message digest algorithm.");
    throw ((r.algorithm = e.algorithm), r);
  }
  t = c.oids[e.algorithm];
  var n = s.oidToDer(t).getBytes();
  var i = s.create(s.Class.UNIVERSAL, s.Type.SEQUENCE, true, []);
  var o = s.create(s.Class.UNIVERSAL, s.Type.SEQUENCE, true, []);
  o.value.push(s.create(s.Class.UNIVERSAL, s.Type.OID, false, n));
  o.value.push(s.create(s.Class.UNIVERSAL, s.Type.NULL, false, ""));
  var a = s.create(
    s.Class.UNIVERSAL,
    s.Type.OCTETSTRING,
    false,
    e.digest().getBytes()
  );
  i.value.push(o);
  i.value.push(a);
  return s.toDer(i).getBytes();
};
var m = function (e, t, r) {
  if (r) return e.modPow(t.e, t.n);
  if (!t.p || !t.q) return e.modPow(t.d, t.n);
  var o;
  if (t.dP) {
    t.dP = t.d.mod(t.p.subtract(i.ONE));
  }
  if (t.dQ) {
    t.dQ = t.d.mod(t.q.subtract(i.ONE));
  }
  if (t.qInv) {
    t.qInv = t.q.modInverse(t.p);
  }
  do {
    o = new i(n.util.bytesToHex(n.random.getBytes(t.n.bitLength() / 8)), 16);
  } while (o.compareTo(t.n) >= 0 || !o.gcd(t.n).equals(i.ONE));
  for (
    s = (e = e.multiply(o.modPow(t.e, t.n)).mod(t.n))
      .mod(t.p)
      .modPow(t.dP, t.p),
      a = e.mod(t.q).modPow(t.dQ, t.q),
      undefined;
    s.compareTo(a) < 0;

  ) {
    var s;
    var a;
    s = s.add(t.p);
  }
  var c = s.subtract(a).multiply(t.qInv).mod(t.p).multiply(t.q).add(a);
  return c.multiply(o.modInverse(t.n)).mod(t.n);
};
function y(e, t, r) {
  var i = n.util.createBuffer();
  var o = Math.ceil(t.n.bitLength() / 8);
  if (e.length > o - 11) {
    var s = new Error("Message is too long for PKCS#1 v1.5 padding.");
    throw ((s.length = e.length), (s.max = o - 11), s);
  }
  i.putByte(0);
  i.putByte(r);
  var a;
  var c = o - 3 - e.length;
  if (0 === r || 1 === r) {
    a = 0 === r ? 0 : 255;
    for (var l = 0; l < c; ++l) i.putByte(a);
  } else
    for (; c > 0; ) {
      var u = 0;
      var d = n.random.getBytes(c);
      for (l = 0; l < c; ++l)
        if (0 === (a = d.charCodeAt(l))) {
          ++u;
        } else {
          i.putByte(a);
        }
      c = u;
    }
  i.putByte(0);
  i.putBytes(e);
  return i;
}
function v(e, t, r, i) {
  var o = Math.ceil(t.n.bitLength() / 8);
  var s = n.util.createBuffer(e);
  var a = s.getByte();
  var c = s.getByte();
  if (
    0 !== a ||
    (r && 0 !== c && 1 !== c) ||
    (!r && 2 != c) ||
    (r && 0 === c && undefined === i)
  )
    throw new Error("Encryption block is invalid.");
  var l = 0;
  if (0 === c) {
    l = o - 3 - i;
    for (var u = 0; u < l; ++u)
      if (0 !== s.getByte()) throw new Error("Encryption block is invalid.");
  } else if (1 === c)
    for (l = 0; s.length() > 1; ) {
      if (255 !== s.getByte()) {
        --s.read;
        break;
      }
      ++l;
    }
  else if (2 === c)
    for (l = 0; s.length() > 1; ) {
      if (0 === s.getByte()) {
        --s.read;
        break;
      }
      ++l;
    }
  if (0 !== s.getByte() || l !== o - 3 - s.length())
    throw new Error("Encryption block is invalid.");
  return s.getBytes();
}
function _(e, t, r) {
  if ("function" == typeof t) {
    r = t;
    t = {};
  }
  var o = {
    algorithm: {
      name: (t = t || {}).algorithm || "PRIMEINC",
      options: {
        workers: t.workers || 2,
        workLoad: t.workLoad || 100,
        workerScript: t.workerScript,
      },
    },
  };
  function s() {
    a(e.pBits, function (t, n) {
      return t
        ? r(t)
        : ((e.p = n), null !== e.q ? l(t, e.q) : void a(e.qBits, l));
    });
  }
  function a(e, t) {
    n.prime.generateProbablePrime(e, o, t);
  }
  function l(t, n) {
    if (t) return r(t);
    e.q = n;
    if (e.p.compareTo(e.q) < 0) {
      var o = e.p;
      (e.p = e.q), (e.q = o);
    }
    if (0 !== e.p.subtract(i.ONE).gcd(e.e).compareTo(i.ONE)) {
      e.p = null;
      return void s();
    }
    if (0 !== e.q.subtract(i.ONE).gcd(e.e).compareTo(i.ONE)) {
      e.q = null;
      return void a(e.qBits, l);
    }
    e.p1 = e.p.subtract(i.ONE);
    e.q1 = e.q.subtract(i.ONE);
    e.phi = e.p1.multiply(e.q1);
    if (0 !== e.phi.gcd(e.e).compareTo(i.ONE))
      return (e.p = e.q = null), void s();
    e.n = e.p.multiply(e.q);
    if (e.n.bitLength() !== e.bits) return (e.q = null), void a(e.qBits, l);
    var u = e.e.modInverse(e.phi);
    e.keys = {
      privateKey: c.rsa.setPrivateKey(
        e.n,
        e.e,
        u,
        e.p,
        e.q,
        u.mod(e.p1),
        u.mod(e.q1),
        e.q.modInverse(e.p)
      ),
      publicKey: c.rsa.setPublicKey(e.n, e.e),
    };
    r(null, e.keys);
  }
  if ("prng" in t) {
    o.prng = t.prng;
  }
  s();
}
function b(e) {
  var t = e.toString(16);
  if (t[0] >= "8") {
    t = "00" + t;
  }
  var r = n.util.hexToBytes(t);
  return r.length > 1 &&
    ((0 === r.charCodeAt(0) && 0 == (128 & r.charCodeAt(1))) ||
      (255 === r.charCodeAt(0) && 128 == (128 & r.charCodeAt(1))))
    ? r.substr(1)
    : r;
}
function w(e) {
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
}
function C(e) {
  return n.util.isNodejs && "function" == typeof o[e];
}
function E(e) {
  return (
    undefined !== a.globalScope &&
    "object" == typeof a.globalScope.crypto &&
    "object" == typeof a.globalScope.crypto.subtle &&
    "function" == typeof a.globalScope.crypto.subtle[e]
  );
}
function T(e) {
  return (
    undefined !== a.globalScope &&
    "object" == typeof a.globalScope.msCrypto &&
    "object" == typeof a.globalScope.msCrypto.subtle &&
    "function" == typeof a.globalScope.msCrypto.subtle[e]
  );
}
function S(e) {
  for (
    t = n.util.hexToBytes(e.toString(16)),
      r = new Uint8Array(t.length),
      i = 0,
      undefined;
    i < t.length;
    ++i
  ) {
    var t;
    var r;
    var i;
    r[i] = t.charCodeAt(i);
  }
  return r;
}
c.rsa.encrypt = function (e, t, r) {
  var o;
  var s = r;
  var a = Math.ceil(t.n.bitLength() / 8);
  if (false !== r && true !== r) {
    s = 2 === r;
    o = y(e, t, r);
  } else {
    (o = n.util.createBuffer()).putBytes(e);
  }
  for (
    c = new i(o.toHex(), 16),
      l = m(c, t, s).toString(16),
      u = n.util.createBuffer(),
      d = a - Math.ceil(l.length / 2),
      undefined;
    d > 0;

  ) {
    var c;
    var l;
    var u;
    var d;
    u.putByte(0);
    --d;
  }
  u.putBytes(n.util.hexToBytes(l));
  return u.getBytes();
};
c.rsa.decrypt = function (e, t, r, o) {
  var s = Math.ceil(t.n.bitLength() / 8);
  if (e.length !== s) {
    var a = new Error("Encrypted message length is invalid.");
    throw ((a.length = e.length), (a.expected = s), a);
  }
  var c = new i(n.util.createBuffer(e).toHex(), 16);
  if (c.compareTo(t.n) >= 0) throw new Error("Encrypted message is invalid.");
  for (
    l = m(c, t, r).toString(16),
      u = n.util.createBuffer(),
      d = s - Math.ceil(l.length / 2),
      undefined;
    d > 0;

  ) {
    var l;
    var u;
    var d;
    u.putByte(0);
    --d;
  }
  u.putBytes(n.util.hexToBytes(l));
  return false !== o ? v(u.getBytes(), t, r) : u.getBytes();
};
c.rsa.createKeyPairGenerationState = function (e, t, r) {
  if ("string" == typeof e) {
    e = parseInt(e, 10);
  }
  e = e || 2048;
  var o;
  var s = (r = r || {}).prng || n.random;
  var a = {
    nextBytes: function (e) {
      for (t = s.getBytesSync(e.length), r = 0, undefined; r < e.length; ++r) {
        var t;
        var r;
        e[r] = t.charCodeAt(r);
      }
    },
  };
  var c = r.algorithm || "PRIMEINC";
  if ("PRIMEINC" !== c)
    throw new Error("Invalid key generation algorithm: " + c);
  (o = {
    algorithm: c,
    state: 0,
    bits: e,
    rng: a,
    eInt: t || 65537,
    e: new i(null),
    p: null,
    q: null,
    qBits: e >> 1,
    pBits: e - (e >> 1),
    pqState: 0,
    num: null,
    keys: null,
  }).e.fromInt(o.eInt);
  return o;
};
c.rsa.stepKeyPairGenerationState = function (e, t) {
  if ("algorithm" in e) {
    e.algorithm = "PRIMEINC";
  }
  var r = new i(null);
  r.fromInt(30);
  for (
    o = 0,
      s = function (e, t) {
        return e | t;
      },
      a = +new Date(),
      u = 0,
      undefined;
    null === e.keys && (t <= 0 || u < t);

  ) {
    var n;
    var o;
    var s;
    var a;
    var u;
    if (0 === e.state) {
      var d = null === e.p ? e.pBits : e.qBits;
      var p = d - 1;
      if (0 === e.pqState) {
        e.num = new i(d, e.rng);
        if (e.num.testBit(p)) {
          e.num.bitwiseTo(i.ONE.shiftLeft(p), s, e.num);
        }
        e.num.dAddOffset(31 - e.num.mod(r).byteValue(), 0);
        o = 0;
        ++e.pqState;
      } else {
        if (1 === e.pqState) {
          if (e.num.bitLength() > d) {
            e.pqState = 0;
          } else {
            if (e.num.isProbablePrime(w(e.num.bitLength()))) {
              ++e.pqState;
            } else {
              e.num.dAddOffset(l[o++ % 8], 0);
            }
          }
        } else {
          if (2 === e.pqState) {
            e.pqState =
              0 === e.num.subtract(i.ONE).gcd(e.e).compareTo(i.ONE) ? 3 : 0;
          } else {
            if (3 === e.pqState) {
              e.pqState = 0;
              if (null === e.p) {
                e.p = e.num;
              } else {
                e.q = e.num;
              }
              if (null !== e.p && null !== e.q) {
                ++e.state;
              }
              e.num = null;
            }
          }
        }
      }
    } else if (1 === e.state) {
      if (e.p.compareTo(e.q) < 0) {
        e.num = e.p;
        e.p = e.q;
        e.q = e.num;
      }
      ++e.state;
    } else if (2 === e.state) {
      e.p1 = e.p.subtract(i.ONE);
      e.q1 = e.q.subtract(i.ONE);
      e.phi = e.p1.multiply(e.q1);
      ++e.state;
    } else if (3 === e.state) {
      if (0 === e.phi.gcd(e.e).compareTo(i.ONE)) {
        ++e.state;
      } else {
        e.p = null;
        e.q = null;
        e.state = 0;
      }
    } else if (4 === e.state) {
      e.n = e.p.multiply(e.q);
      if (e.n.bitLength() === e.bits) {
        ++e.state;
      } else {
        e.q = null;
        e.state = 0;
      }
    } else if (5 === e.state) {
      var h = e.e.modInverse(e.phi);
      e.keys = {
        privateKey: c.rsa.setPrivateKey(
          e.n,
          e.e,
          h,
          e.p,
          e.q,
          h.mod(e.p1),
          h.mod(e.q1),
          e.q.modInverse(e.p)
        ),
        publicKey: c.rsa.setPublicKey(e.n, e.e),
      };
    }
    u += (n = +new Date()) - a;
    a = n;
  }
  return null !== e.keys;
};
c.rsa.generateKeyPair = function (e, t, r, i) {
  if (1 === arguments.length) {
    if ("object" == typeof e) {
      r = e;
      e = undefined;
    } else {
      if ("function" == typeof e) {
        i = e;
        e = undefined;
      }
    }
  } else {
    if (2 === arguments.length) {
      if ("number" == typeof e) {
        if ("function" == typeof t) {
          i = t;
          t = undefined;
        } else {
          if ("number" != typeof t) {
            r = t;
            t = undefined;
          }
        }
      } else {
        r = e;
        i = t;
        e = undefined;
        t = undefined;
      }
    } else {
      if (3 === arguments.length) {
        if ("number" == typeof t) {
          if ("function" == typeof r) {
            i = r;
            r = undefined;
          }
        } else {
          i = r;
          r = t;
          t = undefined;
        }
      }
    }
  }
  r = r || {};
  if (undefined === e) {
    e = r.bits || 2048;
  }
  if (undefined === t) {
    t = r.e || 65537;
  }
  if (
    !n.options.usePureJavaScript &&
    !r.prng &&
    e >= 256 &&
    e <= 16384 &&
    (65537 === t || 3 === t)
  )
    if (i) {
      if (C("generateKeyPair"))
        return o.generateKeyPair(
          "rsa",
          {
            modulusLength: e,
            publicExponent: t,
            publicKeyEncoding: {
              type: "spki",
              format: "pem",
            },
            privateKeyEncoding: {
              type: "pkcs8",
              format: "pem",
            },
          },
          function (e, t, r) {
            if (e) return i(e);
            i(null, {
              privateKey: c.privateKeyFromPem(r),
              publicKey: c.publicKeyFromPem(t),
            });
          }
        );
      if (E("generateKey") && E("exportKey"))
        return a.globalScope.crypto.subtle
          .generateKey(
            {
              name: "RSASSA-PKCS1-v1_5",
              modulusLength: e,
              publicExponent: S(t),
              hash: {
                name: "SHA-256",
              },
            },
            !0,
            ["sign", "verify"]
          )
          .then(function (e) {
            return a.globalScope.crypto.subtle.exportKey("pkcs8", e.privateKey);
          })
          .then(void 0, function (e) {
            i(e);
          })
          .then(function (e) {
            if (e) {
              var t = c.privateKeyFromAsn1(s.fromDer(n.util.createBuffer(e)));
              i(null, {
                privateKey: t,
                publicKey: c.setRsaPublicKey(t.n, t.e),
              });
            }
          });
      if (T("generateKey") && T("exportKey")) {
        var l = a.globalScope.msCrypto.subtle.generateKey(
          {
            name: "RSASSA-PKCS1-v1_5",
            modulusLength: e,
            publicExponent: S(t),
            hash: {
              name: "SHA-256",
            },
          },
          !0,
          ["sign", "verify"]
        );
        return (
          (l.oncomplete = function (e) {
            var t = e.target.result,
              r = a.globalScope.msCrypto.subtle.exportKey(
                "pkcs8",
                t.privateKey
              );
            (r.oncomplete = function (e) {
              var t = e.target.result,
                r = c.privateKeyFromAsn1(s.fromDer(n.util.createBuffer(t)));
              i(null, {
                privateKey: r,
                publicKey: c.setRsaPublicKey(r.n, r.e),
              });
            }),
              (r.onerror = function (e) {
                i(e);
              });
          }),
          void (l.onerror = function (e) {
            i(e);
          })
        );
      }
    } else if (C("generateKeyPairSync")) {
      var u = o.generateKeyPairSync("rsa", {
        modulusLength: e,
        publicExponent: t,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      });
      return {
        privateKey: c.privateKeyFromPem(u.privateKey),
        publicKey: c.publicKeyFromPem(u.publicKey),
      };
    }
  var d = c.rsa.createKeyPairGenerationState(e, t, r);
  if (!i) {
    c.rsa.stepKeyPairGenerationState(d, 0);
    return d.keys;
  }
  _(d, r, i);
};
c.setRsaPublicKey = c.rsa.setPublicKey = function (e, t) {
  var r = {
    n: e,
    e: t,
    encrypt: function (e, t, i) {
      if ("string" == typeof t) {
        t = t.toUpperCase();
      } else {
        if (undefined === t) {
          t = "RSAES-PKCS1-V1_5";
        }
      }
      if ("RSAES-PKCS1-V1_5" === t)
        t = {
          encode: function (e, t, r) {
            return y(e, t, 2).getBytes();
          },
        };
      else if ("RSA-OAEP" === t || "RSAES-OAEP" === t)
        t = {
          encode: function (e, t) {
            return n.pkcs1.encode_rsa_oaep(t, e, i);
          },
        };
      else if (-1 !== ["RAW", "NONE", "NULL", null].indexOf(t))
        t = {
          encode: function (e) {
            return e;
          },
        };
      else if ("string" == typeof t)
        throw new Error('Unsupported encryption scheme: "' + t + '".');
      var o = t.encode(e, r, true);
      return c.rsa.encrypt(o, r, true);
    },
    verify: function (e, t, i, o) {
      if ("string" == typeof i) {
        i = i.toUpperCase();
      } else {
        if (undefined === i) {
          i = "RSASSA-PKCS1-V1_5";
        }
      }
      if (undefined === o) {
        o = {
          _parseAllDigestBytes: true,
        };
      }
      if ("_parseAllDigestBytes" in o) {
        o._parseAllDigestBytes = true;
      }
      if ("RSASSA-PKCS1-V1_5" === i) {
        i = {
          verify: function (e, t) {
            t = v(t, r, true);
            var i = s.fromDer(t, {
              parseAllBytes: o._parseAllDigestBytes,
            });
            var a = {};
            var c = [];
            if (!s.validate(i, f, a, c))
              throw (
                (((l = new Error(
                  "ASN.1 object does not contain a valid RSASSA-PKCS1-v1_5 DigestInfo value."
                )).errors = c),
                l)
              );
            var l;
            var u = s.derToOid(a.algorithmIdentifier);
            if (
              u !== n.oids.md2 &&
              u !== n.oids.md5 &&
              u !== n.oids.sha1 &&
              u !== n.oids.sha224 &&
              u !== n.oids.sha256 &&
              u !== n.oids.sha384 &&
              u !== n.oids.sha512 &&
              u !== n.oids["sha512-224"] &&
              u !== n.oids["sha512-256"]
            )
              throw (
                (((l = new Error(
                  "Unknown RSASSA-PKCS1-v1_5 DigestAlgorithm identifier."
                )).oid = u),
                l)
              );
            if ((u === n.oids.md2 || u === n.oids.md5) && !("parameters" in a))
              throw new Error(
                "ASN.1 object does not contain a valid RSASSA-PKCS1-v1_5 DigestInfo value. Missing algorithm identifer NULL parameters."
              );
            return e === a.digest;
          },
        };
      } else {
        if ("NONE" !== i && "NULL" !== i && null !== i) {
          i = {
            verify: function (e, t) {
              return e === v(t, r, true);
            },
          };
        }
      }
      var a = c.rsa.decrypt(t, r, true, false);
      return i.verify(e, a, r.n.bitLength());
    },
  };
  return r;
};
c.setRsaPrivateKey = c.rsa.setPrivateKey = function (e, t, r, i, o, s, a, l) {
  var u = {
    n: e,
    e: t,
    d: r,
    p: i,
    q: o,
    dP: s,
    dQ: a,
    qInv: l,
    decrypt: function (e, t, r) {
      if ("string" == typeof t) {
        t = t.toUpperCase();
      } else {
        if (undefined === t) {
          t = "RSAES-PKCS1-V1_5";
        }
      }
      var i = c.rsa.decrypt(e, u, false, false);
      if ("RSAES-PKCS1-V1_5" === t)
        t = {
          decode: v,
        };
      else if ("RSA-OAEP" === t || "RSAES-OAEP" === t)
        t = {
          decode: function (e, t) {
            return n.pkcs1.decode_rsa_oaep(t, e, r);
          },
        };
      else {
        if (-1 === ["RAW", "NONE", "NULL", null].indexOf(t))
          throw new Error('Unsupported encryption scheme: "' + t + '".');
        t = {
          decode: function (e) {
            return e;
          },
        };
      }
      return t.decode(i, u, false);
    },
    sign: function (e, t) {
      var r = false;
      if ("string" == typeof t) {
        t = t.toUpperCase();
      }
      if (undefined === t || "RSASSA-PKCS1-V1_5" === t) {
        t = {
          encode: g,
        };
        r = 1;
      } else {
        if ("NONE" !== t && "NULL" !== t && null !== t) {
          t = {
            encode: function () {
              return e;
            },
          };
          r = 1;
        }
      }
      var n = t.encode(e, u.n.bitLength());
      return c.rsa.encrypt(n, u, r);
    },
  };
  return u;
};
c.wrapRsaPrivateKey = function (e) {
  return s.create(s.Class.UNIVERSAL, s.Type.SEQUENCE, true, [
    s.create(
      s.Class.UNIVERSAL,
      s.Type.INTEGER,
      false,
      s.integerToDer(0).getBytes()
    ),
    s.create(s.Class.UNIVERSAL, s.Type.SEQUENCE, true, [
      s.create(
        s.Class.UNIVERSAL,
        s.Type.OID,
        false,
        s.oidToDer(c.oids.rsaEncryption).getBytes()
      ),
      s.create(s.Class.UNIVERSAL, s.Type.NULL, false, ""),
    ]),
    s.create(
      s.Class.UNIVERSAL,
      s.Type.OCTETSTRING,
      false,
      s.toDer(e).getBytes()
    ),
  ]);
};
c.privateKeyFromAsn1 = function (e) {
  var t;
  var r;
  var o;
  var a;
  var l;
  var p;
  var h;
  var f;
  var g = {};
  var m = [];
  if (s.validate(e, u, g, m)) {
    e = s.fromDer(n.util.createBuffer(g.privateKey));
  }
  g = {};
  m = [];
  if (!s.validate(e, d, g, m)) {
    var y = new Error(
      "Cannot read private key. ASN.1 object does not contain an RSAPrivateKey."
    );
    throw ((y.errors = m), y);
  }
  t = n.util.createBuffer(g.privateKeyModulus).toHex();
  r = n.util.createBuffer(g.privateKeyPublicExponent).toHex();
  o = n.util.createBuffer(g.privateKeyPrivateExponent).toHex();
  a = n.util.createBuffer(g.privateKeyPrime1).toHex();
  l = n.util.createBuffer(g.privateKeyPrime2).toHex();
  p = n.util.createBuffer(g.privateKeyExponent1).toHex();
  h = n.util.createBuffer(g.privateKeyExponent2).toHex();
  f = n.util.createBuffer(g.privateKeyCoefficient).toHex();
  return c.setRsaPrivateKey(
    new i(t, 16),
    new i(r, 16),
    new i(o, 16),
    new i(a, 16),
    new i(l, 16),
    new i(p, 16),
    new i(h, 16),
    new i(f, 16)
  );
};
c.privateKeyToAsn1 = c.privateKeyToRSAPrivateKey = function (e) {
  return s.create(s.Class.UNIVERSAL, s.Type.SEQUENCE, true, [
    s.create(
      s.Class.UNIVERSAL,
      s.Type.INTEGER,
      false,
      s.integerToDer(0).getBytes()
    ),
    s.create(s.Class.UNIVERSAL, s.Type.INTEGER, false, b(e.n)),
    s.create(s.Class.UNIVERSAL, s.Type.INTEGER, false, b(e.e)),
    s.create(s.Class.UNIVERSAL, s.Type.INTEGER, false, b(e.d)),
    s.create(s.Class.UNIVERSAL, s.Type.INTEGER, false, b(e.p)),
    s.create(s.Class.UNIVERSAL, s.Type.INTEGER, false, b(e.q)),
    s.create(s.Class.UNIVERSAL, s.Type.INTEGER, false, b(e.dP)),
    s.create(s.Class.UNIVERSAL, s.Type.INTEGER, false, b(e.dQ)),
    s.create(s.Class.UNIVERSAL, s.Type.INTEGER, false, b(e.qInv)),
  ]);
};
c.publicKeyFromAsn1 = function (e) {
  var t = {};
  var r = [];
  if (s.validate(e, h, t, r)) {
    var o;
    var a = s.derToOid(t.publicKeyOid);
    if (a !== c.oids.rsaEncryption)
      throw (
        (((o = new Error("Cannot read public key. Unknown OID.")).oid = a), o)
      );
    e = t.rsaPublicKey;
  }
  r = [];
  if (!s.validate(e, p, t, r))
    throw (
      (((o = new Error(
        "Cannot read public key. ASN.1 object does not contain an RSAPublicKey."
      )).errors = r),
      o)
    );
  var l = n.util.createBuffer(t.publicKeyModulus).toHex();
  var u = n.util.createBuffer(t.publicKeyExponent).toHex();
  return c.setRsaPublicKey(new i(l, 16), new i(u, 16));
};
c.publicKeyToAsn1 = c.publicKeyToSubjectPublicKeyInfo = function (e) {
  return s.create(s.Class.UNIVERSAL, s.Type.SEQUENCE, true, [
    s.create(s.Class.UNIVERSAL, s.Type.SEQUENCE, true, [
      s.create(
        s.Class.UNIVERSAL,
        s.Type.OID,
        false,
        s.oidToDer(c.oids.rsaEncryption).getBytes()
      ),
      s.create(s.Class.UNIVERSAL, s.Type.NULL, false, ""),
    ]),
    s.create(s.Class.UNIVERSAL, s.Type.BITSTRING, false, [
      c.publicKeyToRSAPublicKey(e),
    ]),
  ]);
};
c.publicKeyToRSAPublicKey = function (e) {
  return s.create(s.Class.UNIVERSAL, s.Type.SEQUENCE, true, [
    s.create(s.Class.UNIVERSAL, s.Type.INTEGER, false, b(e.n)),
    s.create(s.Class.UNIVERSAL, s.Type.INTEGER, false, b(e.e)),
  ]);
};