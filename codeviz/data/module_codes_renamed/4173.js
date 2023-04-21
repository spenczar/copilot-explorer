var M_OptionsManager_maybe = require("OptionsManager");
require("AES-Encryption-Module");
require("ASN1-Parser-Utils");
require("des-cipher-module");
require("md-algorithms-module");
require("Crypto_OID_Mapping");
require("PBKDF2-Crypto-Module");
require("pem-encoding-utils");
require("RandomNumberGenerator");
require("RC2_Key_Expansion_Module");
require("RSA-Encryption-Utils");
require("binary-data-reader");
if (void 0 === i) var i = M_OptionsManager_maybe.jsbn.BigInteger;
var o = M_OptionsManager_maybe.asn1;
var s = (M_OptionsManager_maybe.pki = M_OptionsManager_maybe.pki || {});
module.exports =
  s.pbe =
  M_OptionsManager_maybe.pbe =
    M_OptionsManager_maybe.pbe || {};
var a = s.oids;
var c = {
  name: "EncryptedPrivateKeyInfo",
  tagClass: o.Class.UNIVERSAL,
  type: o.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "EncryptedPrivateKeyInfo.encryptionAlgorithm",
      tagClass: o.Class.UNIVERSAL,
      type: o.Type.SEQUENCE,
      constructed: true,
      value: [
        {
          name: "AlgorithmIdentifier.algorithm",
          tagClass: o.Class.UNIVERSAL,
          type: o.Type.OID,
          constructed: false,
          capture: "encryptionOid",
        },
        {
          name: "AlgorithmIdentifier.parameters",
          tagClass: o.Class.UNIVERSAL,
          type: o.Type.SEQUENCE,
          constructed: true,
          captureAsn1: "encryptionParams",
        },
      ],
    },
    {
      name: "EncryptedPrivateKeyInfo.encryptedData",
      tagClass: o.Class.UNIVERSAL,
      type: o.Type.OCTETSTRING,
      constructed: false,
      capture: "encryptedData",
    },
  ],
};
var l = {
  name: "PBES2Algorithms",
  tagClass: o.Class.UNIVERSAL,
  type: o.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "PBES2Algorithms.keyDerivationFunc",
      tagClass: o.Class.UNIVERSAL,
      type: o.Type.SEQUENCE,
      constructed: true,
      value: [
        {
          name: "PBES2Algorithms.keyDerivationFunc.oid",
          tagClass: o.Class.UNIVERSAL,
          type: o.Type.OID,
          constructed: false,
          capture: "kdfOid",
        },
        {
          name: "PBES2Algorithms.params",
          tagClass: o.Class.UNIVERSAL,
          type: o.Type.SEQUENCE,
          constructed: true,
          value: [
            {
              name: "PBES2Algorithms.params.salt",
              tagClass: o.Class.UNIVERSAL,
              type: o.Type.OCTETSTRING,
              constructed: false,
              capture: "kdfSalt",
            },
            {
              name: "PBES2Algorithms.params.iterationCount",
              tagClass: o.Class.UNIVERSAL,
              type: o.Type.INTEGER,
              constructed: false,
              capture: "kdfIterationCount",
            },
            {
              name: "PBES2Algorithms.params.keyLength",
              tagClass: o.Class.UNIVERSAL,
              type: o.Type.INTEGER,
              constructed: false,
              optional: true,
              capture: "keyLength",
            },
            {
              name: "PBES2Algorithms.params.prf",
              tagClass: o.Class.UNIVERSAL,
              type: o.Type.SEQUENCE,
              constructed: true,
              optional: true,
              value: [
                {
                  name: "PBES2Algorithms.params.prf.algorithm",
                  tagClass: o.Class.UNIVERSAL,
                  type: o.Type.OID,
                  constructed: false,
                  capture: "prfOid",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "PBES2Algorithms.encryptionScheme",
      tagClass: o.Class.UNIVERSAL,
      type: o.Type.SEQUENCE,
      constructed: true,
      value: [
        {
          name: "PBES2Algorithms.encryptionScheme.oid",
          tagClass: o.Class.UNIVERSAL,
          type: o.Type.OID,
          constructed: false,
          capture: "encOid",
        },
        {
          name: "PBES2Algorithms.encryptionScheme.iv",
          tagClass: o.Class.UNIVERSAL,
          type: o.Type.OCTETSTRING,
          constructed: false,
          capture: "encIv",
        },
      ],
    },
  ],
};
var u = {
  name: "pkcs-12PbeParams",
  tagClass: o.Class.UNIVERSAL,
  type: o.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "pkcs-12PbeParams.salt",
      tagClass: o.Class.UNIVERSAL,
      type: o.Type.OCTETSTRING,
      constructed: false,
      capture: "salt",
    },
    {
      name: "pkcs-12PbeParams.iterations",
      tagClass: o.Class.UNIVERSAL,
      type: o.Type.INTEGER,
      constructed: false,
      capture: "iterations",
    },
  ],
};
function d(e, t) {
  return e.start().update(t).digest().getBytes();
}
function p(e) {
  var t;
  if (e) {
    if (!(t = s.oids[o.derToOid(e)])) {
      var r = new Error("Unsupported PRF OID.");
      throw (
        ((r.oid = e),
        (r.supported = [
          "hmacWithSHA1",
          "hmacWithSHA224",
          "hmacWithSHA256",
          "hmacWithSHA384",
          "hmacWithSHA512",
        ]),
        r)
      );
    }
  } else t = "hmacWithSHA1";
  return h(t);
}
function h(e) {
  var t = M_OptionsManager_maybe.md;
  switch (e) {
    case "hmacWithSHA224":
      t = M_OptionsManager_maybe.md.sha512;
    case "hmacWithSHA1":
    case "hmacWithSHA256":
    case "hmacWithSHA384":
    case "hmacWithSHA512":
      e = e.substr(8).toLowerCase();
      break;
    default:
      var r = new Error("Unsupported PRF algorithm.");
      throw (
        ((r.algorithm = e),
        (r.supported = [
          "hmacWithSHA1",
          "hmacWithSHA224",
          "hmacWithSHA256",
          "hmacWithSHA384",
          "hmacWithSHA512",
        ]),
        r)
      );
  }
  if (!t || !(e in t)) throw new Error("Unknown hash algorithm: " + e);
  return t[e].create();
}
s.encryptPrivateKeyInfo = function (e, t, r) {
  (r = r || {}).saltSize = r.saltSize || 8;
  r.count = r.count || 2048;
  r.algorithm = r.algorithm || "aes128";
  r.prfAlgorithm = r.prfAlgorithm || "sha1";
  var i;
  var c;
  var l;
  var u = M_OptionsManager_maybe.random.getBytesSync(r.saltSize);
  var d = r.count;
  var p = o.integerToDer(d);
  if (0 === r.algorithm.indexOf("aes") || "des" === r.algorithm) {
    var f;
    var g;
    var m;
    switch (r.algorithm) {
      case "aes128":
        i = 16;
        f = 16;
        g = a["aes128-CBC"];
        m = M_OptionsManager_maybe.aes.createEncryptionCipher;
        break;
      case "aes192":
        i = 24;
        f = 16;
        g = a["aes192-CBC"];
        m = M_OptionsManager_maybe.aes.createEncryptionCipher;
        break;
      case "aes256":
        i = 32;
        f = 16;
        g = a["aes256-CBC"];
        m = M_OptionsManager_maybe.aes.createEncryptionCipher;
        break;
      case "des":
        i = 8;
        f = 8;
        g = a.desCBC;
        m = M_OptionsManager_maybe.des.createEncryptionCipher;
        break;
      default:
        throw (
          (((C = new Error(
            "Cannot encrypt private key. Unknown encryption algorithm."
          )).algorithm = r.algorithm),
          C)
        );
    }
    var y = "hmacWith" + r.prfAlgorithm.toUpperCase();
    var v = h(y);
    var _ = M_OptionsManager_maybe.pkcs5.pbkdf2(t, u, d, i, v);
    var b = M_OptionsManager_maybe.random.getBytesSync(f);
    (E = m(_)).start(b);
    E.update(o.toDer(e));
    E.finish();
    l = E.output.getBytes();
    var w = (function (e, t, r, i) {
      var a = o.create(o.Class.UNIVERSAL, o.Type.SEQUENCE, true, [
        o.create(o.Class.UNIVERSAL, o.Type.OCTETSTRING, false, e),
        o.create(o.Class.UNIVERSAL, o.Type.INTEGER, false, t.getBytes()),
      ]);
      if ("hmacWithSHA1" !== i) {
        a.value.push(
          o.create(
            o.Class.UNIVERSAL,
            o.Type.INTEGER,
            false,
            M_OptionsManager_maybe.util.hexToBytes(r.toString(16))
          ),
          o.create(o.Class.UNIVERSAL, o.Type.SEQUENCE, true, [
            o.create(
              o.Class.UNIVERSAL,
              o.Type.OID,
              false,
              o.oidToDer(s.oids[i]).getBytes()
            ),
            o.create(o.Class.UNIVERSAL, o.Type.NULL, false, ""),
          ])
        );
      }
      return a;
    })(u, p, i, y);
    c = o.create(o.Class.UNIVERSAL, o.Type.SEQUENCE, true, [
      o.create(
        o.Class.UNIVERSAL,
        o.Type.OID,
        false,
        o.oidToDer(a.pkcs5PBES2).getBytes()
      ),
      o.create(o.Class.UNIVERSAL, o.Type.SEQUENCE, true, [
        o.create(o.Class.UNIVERSAL, o.Type.SEQUENCE, true, [
          o.create(
            o.Class.UNIVERSAL,
            o.Type.OID,
            false,
            o.oidToDer(a.pkcs5PBKDF2).getBytes()
          ),
          w,
        ]),
        o.create(o.Class.UNIVERSAL, o.Type.SEQUENCE, true, [
          o.create(
            o.Class.UNIVERSAL,
            o.Type.OID,
            false,
            o.oidToDer(g).getBytes()
          ),
          o.create(o.Class.UNIVERSAL, o.Type.OCTETSTRING, false, b),
        ]),
      ]),
    ]);
  } else {
    var C;
    if ("3des" !== r.algorithm)
      throw (
        (((C = new Error(
          "Cannot encrypt private key. Unknown encryption algorithm."
        )).algorithm = r.algorithm),
        C)
      );
    i = 24;
    var E;
    var T = new M_OptionsManager_maybe.util.ByteBuffer(u);
    _ = s.pbe.generatePkcs12Key(t, T, 1, d, i);
    b = s.pbe.generatePkcs12Key(t, T, 2, d, i);
    (E = M_OptionsManager_maybe.des.createEncryptionCipher(_)).start(b);
    E.update(o.toDer(e));
    E.finish();
    l = E.output.getBytes();
    c = o.create(o.Class.UNIVERSAL, o.Type.SEQUENCE, true, [
      o.create(
        o.Class.UNIVERSAL,
        o.Type.OID,
        false,
        o.oidToDer(a["pbeWithSHAAnd3-KeyTripleDES-CBC"]).getBytes()
      ),
      o.create(o.Class.UNIVERSAL, o.Type.SEQUENCE, true, [
        o.create(o.Class.UNIVERSAL, o.Type.OCTETSTRING, false, u),
        o.create(o.Class.UNIVERSAL, o.Type.INTEGER, false, p.getBytes()),
      ]),
    ]);
  }
  return o.create(o.Class.UNIVERSAL, o.Type.SEQUENCE, true, [
    c,
    o.create(o.Class.UNIVERSAL, o.Type.OCTETSTRING, false, l),
  ]);
};
s.decryptPrivateKeyInfo = function (e, t) {
  var r = null;
  var i = {};
  var a = [];
  if (!o.validate(e, c, i, a)) {
    var l = new Error(
      "Cannot read encrypted private key. ASN.1 object is not a supported EncryptedPrivateKeyInfo."
    );
    throw ((l.errors = a), l);
  }
  var u = o.derToOid(i.encryptionOid);
  var d = s.pbe.getCipher(u, i.encryptionParams, t);
  var p = M_OptionsManager_maybe.util.createBuffer(i.encryptedData);
  d.update(p);
  if (d.finish()) {
    r = o.fromDer(d.output);
  }
  return r;
};
s.encryptedPrivateKeyToPem = function (e, t) {
  var r = {
    type: "ENCRYPTED PRIVATE KEY",
    body: o.toDer(e).getBytes(),
  };
  return M_OptionsManager_maybe.pem.encode(r, {
    maxline: t,
  });
};
s.encryptedPrivateKeyFromPem = function (e) {
  var t = M_OptionsManager_maybe.pem.decode(e)[0];
  if ("ENCRYPTED PRIVATE KEY" !== t.type) {
    var r = new Error(
      'Could not convert encrypted private key from PEM; PEM header type is "ENCRYPTED PRIVATE KEY".'
    );
    throw ((r.headerType = t.type), r);
  }
  if (t.procType && "ENCRYPTED" === t.procType.type)
    throw new Error(
      "Could not convert encrypted private key from PEM; PEM is encrypted."
    );
  return o.fromDer(t.body);
};
s.encryptRsaPrivateKey = function (e, t, r) {
  if (!(r = r || {}).legacy) {
    var i = s.wrapRsaPrivateKey(s.privateKeyToAsn1(e));
    i = s.encryptPrivateKeyInfo(i, t, r);
    return s.encryptedPrivateKeyToPem(i);
  }
  var a;
  var c;
  var l;
  var u;
  switch (r.algorithm) {
    case "aes128":
      a = "AES-128-CBC";
      l = 16;
      c = M_OptionsManager_maybe.random.getBytesSync(16);
      u = M_OptionsManager_maybe.aes.createEncryptionCipher;
      break;
    case "aes192":
      a = "AES-192-CBC";
      l = 24;
      c = M_OptionsManager_maybe.random.getBytesSync(16);
      u = M_OptionsManager_maybe.aes.createEncryptionCipher;
      break;
    case "aes256":
      a = "AES-256-CBC";
      l = 32;
      c = M_OptionsManager_maybe.random.getBytesSync(16);
      u = M_OptionsManager_maybe.aes.createEncryptionCipher;
      break;
    case "3des":
      a = "DES-EDE3-CBC";
      l = 24;
      c = M_OptionsManager_maybe.random.getBytesSync(8);
      u = M_OptionsManager_maybe.des.createEncryptionCipher;
      break;
    case "des":
      a = "DES-CBC";
      l = 8;
      c = M_OptionsManager_maybe.random.getBytesSync(8);
      u = M_OptionsManager_maybe.des.createEncryptionCipher;
      break;
    default:
      var d = new Error(
        'Could not encrypt RSA private key; unsupported encryption algorithm "' +
          r.algorithm +
          '".'
      );
      throw ((d.algorithm = r.algorithm), d);
  }
  var p = u(
    M_OptionsManager_maybe.pbe.opensslDeriveBytes(t, c.substr(0, 8), l)
  );
  p.start(c);
  p.update(o.toDer(s.privateKeyToAsn1(e)));
  p.finish();
  var h = {
    type: "RSA PRIVATE KEY",
    procType: {
      version: "4",
      type: "ENCRYPTED",
    },
    dekInfo: {
      algorithm: a,
      parameters: M_OptionsManager_maybe.util.bytesToHex(c).toUpperCase(),
    },
    body: p.output.getBytes(),
  };
  return M_OptionsManager_maybe.pem.encode(h);
};
s.decryptRsaPrivateKey = function (e, t) {
  var r = null;
  var i = M_OptionsManager_maybe.pem.decode(e)[0];
  if (
    "ENCRYPTED PRIVATE KEY" !== i.type &&
    "PRIVATE KEY" !== i.type &&
    "RSA PRIVATE KEY" !== i.type
  )
    throw (
      (((l = new Error(
        'Could not convert private key from PEM; PEM header type is not "ENCRYPTED PRIVATE KEY", "PRIVATE KEY", or "RSA PRIVATE KEY".'
      )).headerType = l),
      l)
    );
  if (i.procType && "ENCRYPTED" === i.procType.type) {
    var a;
    var c;
    switch (i.dekInfo.algorithm) {
      case "DES-CBC":
        a = 8;
        c = M_OptionsManager_maybe.des.createDecryptionCipher;
        break;
      case "DES-EDE3-CBC":
        a = 24;
        c = M_OptionsManager_maybe.des.createDecryptionCipher;
        break;
      case "AES-128-CBC":
        a = 16;
        c = M_OptionsManager_maybe.aes.createDecryptionCipher;
        break;
      case "AES-192-CBC":
        a = 24;
        c = M_OptionsManager_maybe.aes.createDecryptionCipher;
        break;
      case "AES-256-CBC":
        a = 32;
        c = M_OptionsManager_maybe.aes.createDecryptionCipher;
        break;
      case "RC2-40-CBC":
        a = 5;
        c = function (e) {
          return M_OptionsManager_maybe.rc2.createDecryptionCipher(e, 40);
        };
        break;
      case "RC2-64-CBC":
        a = 8;
        c = function (e) {
          return M_OptionsManager_maybe.rc2.createDecryptionCipher(e, 64);
        };
        break;
      case "RC2-128-CBC":
        a = 16;
        c = function (e) {
          return M_OptionsManager_maybe.rc2.createDecryptionCipher(e, 128);
        };
        break;
      default:
        var l;
        throw (
          (((l = new Error(
            'Could not decrypt private key; unsupported encryption algorithm "' +
              i.dekInfo.algorithm +
              '".'
          )).algorithm = i.dekInfo.algorithm),
          l)
        );
    }
    var u = M_OptionsManager_maybe.util.hexToBytes(i.dekInfo.parameters);
    var d = c(
      M_OptionsManager_maybe.pbe.opensslDeriveBytes(t, u.substr(0, 8), a)
    );
    d.start(u);
    d.update(M_OptionsManager_maybe.util.createBuffer(i.body));
    if (!d.finish()) return r;
    r = d.output.getBytes();
  } else r = i.body;
  if (
    null !==
    (r =
      "ENCRYPTED PRIVATE KEY" === i.type
        ? s.decryptPrivateKeyInfo(o.fromDer(r), t)
        : o.fromDer(r))
  ) {
    r = s.privateKeyFromAsn1(r);
  }
  return r;
};
s.pbe.generatePkcs12Key = function (e, t, r, i, o, s) {
  var a;
  var c;
  if (null == s) {
    if (!("sha1" in M_OptionsManager_maybe.md))
      throw new Error('"sha1" hash algorithm unavailable.');
    s = M_OptionsManager_maybe.md.sha1.create();
  }
  var l = s.digestLength;
  var u = s.blockLength;
  var d = new M_OptionsManager_maybe.util.ByteBuffer();
  var p = new M_OptionsManager_maybe.util.ByteBuffer();
  if (null != e) {
    for (c = 0; c < e.length; c++) p.putInt16(e.charCodeAt(c));
    p.putInt16(0);
  }
  var h = p.length();
  var f = t.length();
  var g = new M_OptionsManager_maybe.util.ByteBuffer();
  g.fillWithByte(r, u);
  var m = u * Math.ceil(f / u);
  var y = new M_OptionsManager_maybe.util.ByteBuffer();
  for (c = 0; c < m; c++) y.putByte(t.at(c % f));
  var v = u * Math.ceil(h / u);
  var _ = new M_OptionsManager_maybe.util.ByteBuffer();
  for (c = 0; c < v; c++) _.putByte(p.at(c % h));
  var b = y;
  b.putBuffer(_);
  for (w = Math.ceil(o / l), C = 1, undefined; C <= w; C++) {
    var w;
    var C;
    var E = new M_OptionsManager_maybe.util.ByteBuffer();
    E.putBytes(g.bytes());
    E.putBytes(b.bytes());
    for (var T = 0; T < i; T++) {
      s.start();
      s.update(E.getBytes());
      E = s.digest();
    }
    var S = new M_OptionsManager_maybe.util.ByteBuffer();
    for (c = 0; c < u; c++) S.putByte(E.at(c % l));
    var x = Math.ceil(f / u) + Math.ceil(h / u);
    var k = new M_OptionsManager_maybe.util.ByteBuffer();
    for (a = 0; a < x; a++) {
      var I = new M_OptionsManager_maybe.util.ByteBuffer(b.getBytes(u));
      var A = 511;
      for (c = S.length() - 1; c >= 0; c--) {
        A >>= 8;
        A += S.at(c) + I.at(c);
        I.setAt(c, 255 & A);
      }
      k.putBuffer(I);
    }
    b = k;
    d.putBuffer(E);
  }
  d.truncate(d.length() - o);
  return d;
};
s.pbe.getCipher = function (e, t, r) {
  switch (e) {
    case s.oids.pkcs5PBES2:
      return s.pbe.getCipherForPBES2(e, t, r);
    case s.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
    case s.oids["pbewithSHAAnd40BitRC2-CBC"]:
      return s.pbe.getCipherForPKCS12PBE(e, t, r);
    default:
      var n = new Error(
        "Cannot read encrypted PBE data block. Unsupported OID."
      );
      throw (
        ((n.oid = e),
        (n.supportedOids = [
          "pkcs5PBES2",
          "pbeWithSHAAnd3-KeyTripleDES-CBC",
          "pbewithSHAAnd40BitRC2-CBC",
        ]),
        n)
      );
  }
};
s.pbe.getCipherForPBES2 = function (e, t, r) {
  var i;
  var a = {};
  var c = [];
  if (!o.validate(t, l, a, c))
    throw (
      (((i = new Error(
        "Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo."
      )).errors = c),
      i)
    );
  if ((e = o.derToOid(a.kdfOid)) !== s.oids.pkcs5PBKDF2)
    throw (
      (((i = new Error(
        "Cannot read encrypted private key. Unsupported key derivation function OID."
      )).oid = e),
      (i.supportedOids = ["pkcs5PBKDF2"]),
      i)
    );
  if (
    (e = o.derToOid(a.encOid)) !== s.oids["aes128-CBC"] &&
    e !== s.oids["aes192-CBC"] &&
    e !== s.oids["aes256-CBC"] &&
    e !== s.oids["des-EDE3-CBC"] &&
    e !== s.oids.desCBC
  )
    throw (
      (((i = new Error(
        "Cannot read encrypted private key. Unsupported encryption scheme OID."
      )).oid = e),
      (i.supportedOids = [
        "aes128-CBC",
        "aes192-CBC",
        "aes256-CBC",
        "des-EDE3-CBC",
        "desCBC",
      ]),
      i)
    );
  var u;
  var d;
  var h = a.kdfSalt;
  var f = M_OptionsManager_maybe.util.createBuffer(a.kdfIterationCount);
  switch (((f = f.getInt(f.length() << 3)), s.oids[e])) {
    case "aes128-CBC":
      u = 16;
      d = M_OptionsManager_maybe.aes.createDecryptionCipher;
      break;
    case "aes192-CBC":
      u = 24;
      d = M_OptionsManager_maybe.aes.createDecryptionCipher;
      break;
    case "aes256-CBC":
      u = 32;
      d = M_OptionsManager_maybe.aes.createDecryptionCipher;
      break;
    case "des-EDE3-CBC":
      u = 24;
      d = M_OptionsManager_maybe.des.createDecryptionCipher;
      break;
    case "desCBC":
      u = 8;
      d = M_OptionsManager_maybe.des.createDecryptionCipher;
  }
  var g = p(a.prfOid);
  var m = M_OptionsManager_maybe.pkcs5.pbkdf2(r, h, f, u, g);
  var y = a.encIv;
  var v = d(m);
  v.start(y);
  return v;
};
s.pbe.getCipherForPKCS12PBE = function (e, t, r) {
  var i = {};
  var a = [];
  if (!o.validate(t, u, i, a))
    throw (
      (((g = new Error(
        "Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo."
      )).errors = a),
      g)
    );
  var c;
  var l;
  var d;
  var h = M_OptionsManager_maybe.util.createBuffer(i.salt);
  var f = M_OptionsManager_maybe.util.createBuffer(i.iterations);
  switch (((f = f.getInt(f.length() << 3)), e)) {
    case s.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
      c = 24;
      l = 8;
      d = M_OptionsManager_maybe.des.startDecrypting;
      break;
    case s.oids["pbewithSHAAnd40BitRC2-CBC"]:
      c = 5;
      l = 8;
      d = function (e, t) {
        var r = M_OptionsManager_maybe.rc2.createDecryptionCipher(e, 40);
        r.start(t, null);
        return r;
      };
      break;
    default:
      var g;
      throw (
        (((g = new Error(
          "Cannot read PKCS #12 PBE data block. Unsupported OID."
        )).oid = e),
        g)
      );
  }
  var m = p(i.prfOid);
  var y = s.pbe.generatePkcs12Key(r, h, 1, f, c, m);
  m.start();
  return d(y, s.pbe.generatePkcs12Key(r, h, 2, f, l, m));
};
s.pbe.opensslDeriveBytes = function (e, t, r, i) {
  if (null == i) {
    if (!("md5" in M_OptionsManager_maybe.md))
      throw new Error('"md5" hash algorithm unavailable.');
    i = M_OptionsManager_maybe.md.md5.create();
  }
  if (null === t) {
    t = "";
  }
  for (o = [d(i, e + t)], s = 16, a = 1, undefined; s < r; ++a, s += 16) {
    var o;
    var s;
    var a;
    o.push(d(i, o[a - 1] + e + t));
  }
  return o.join("").substr(0, r);
};
