var M_OptionsManager_maybe = require("OptionsManager");
require("ASN1-Parser-Utils");
require("HMAC-Crypto-Utils");
require("Crypto_OID_Mapping");
require("pkcs7asn1-validator");
require("EncryptedPrivateKeyInfoManager");
require("RandomNumberGenerator");
require("RSA-Encryption-Utils");
require("sha1-module");
require("binary-data-reader");
require("Certificate-Validator");
var i = M_OptionsManager_maybe.asn1;
var o = M_OptionsManager_maybe.pki;
var s =
  (module.exports =
  M_OptionsManager_maybe.pkcs12 =
    M_OptionsManager_maybe.pkcs12 || {});
var a = {
  name: "ContentInfo",
  tagClass: i.Class.UNIVERSAL,
  type: i.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "ContentInfo.contentType",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.OID,
      constructed: false,
      capture: "contentType",
    },
    {
      name: "ContentInfo.content",
      tagClass: i.Class.CONTEXT_SPECIFIC,
      constructed: true,
      captureAsn1: "content",
    },
  ],
};
var c = {
  name: "PFX",
  tagClass: i.Class.UNIVERSAL,
  type: i.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "PFX.version",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.INTEGER,
      constructed: false,
      capture: "version",
    },
    a,
    {
      name: "PFX.macData",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.SEQUENCE,
      constructed: true,
      optional: true,
      captureAsn1: "mac",
      value: [
        {
          name: "PFX.macData.mac",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.SEQUENCE,
          constructed: true,
          value: [
            {
              name: "PFX.macData.mac.digestAlgorithm",
              tagClass: i.Class.UNIVERSAL,
              type: i.Type.SEQUENCE,
              constructed: true,
              value: [
                {
                  name: "PFX.macData.mac.digestAlgorithm.algorithm",
                  tagClass: i.Class.UNIVERSAL,
                  type: i.Type.OID,
                  constructed: false,
                  capture: "macAlgorithm",
                },
                {
                  name: "PFX.macData.mac.digestAlgorithm.parameters",
                  tagClass: i.Class.UNIVERSAL,
                  captureAsn1: "macAlgorithmParameters",
                },
              ],
            },
            {
              name: "PFX.macData.mac.digest",
              tagClass: i.Class.UNIVERSAL,
              type: i.Type.OCTETSTRING,
              constructed: false,
              capture: "macDigest",
            },
          ],
        },
        {
          name: "PFX.macData.macSalt",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.OCTETSTRING,
          constructed: false,
          capture: "macSalt",
        },
        {
          name: "PFX.macData.iterations",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.INTEGER,
          constructed: false,
          optional: true,
          capture: "macIterations",
        },
      ],
    },
  ],
};
var l = {
  name: "SafeBag",
  tagClass: i.Class.UNIVERSAL,
  type: i.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "SafeBag.bagId",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.OID,
      constructed: false,
      capture: "bagId",
    },
    {
      name: "SafeBag.bagValue",
      tagClass: i.Class.CONTEXT_SPECIFIC,
      constructed: true,
      captureAsn1: "bagValue",
    },
    {
      name: "SafeBag.bagAttributes",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.SET,
      constructed: true,
      optional: true,
      capture: "bagAttributes",
    },
  ],
};
var u = {
  name: "Attribute",
  tagClass: i.Class.UNIVERSAL,
  type: i.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "Attribute.attrId",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.OID,
      constructed: false,
      capture: "oid",
    },
    {
      name: "Attribute.attrValues",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.SET,
      constructed: true,
      capture: "values",
    },
  ],
};
var d = {
  name: "CertBag",
  tagClass: i.Class.UNIVERSAL,
  type: i.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "CertBag.certId",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.OID,
      constructed: false,
      capture: "certId",
    },
    {
      name: "CertBag.certValue",
      tagClass: i.Class.CONTEXT_SPECIFIC,
      constructed: true,
      value: [
        {
          name: "CertBag.certValue[0]",
          tagClass: i.Class.UNIVERSAL,
          type: i.Class.OCTETSTRING,
          constructed: false,
          capture: "cert",
        },
      ],
    },
  ],
};
function p(e, t, r, n) {
  for (i = [], o = 0, undefined; o < e.length; o++) {
    var i;
    var o;
    for (var s = 0; s < e[o].safeBags.length; s++) {
      var a = e[o].safeBags[s];
      if (undefined !== n && a.type !== n) {
        if (null !== t) {
          if (
            undefined !== a.attributes[t] &&
            a.attributes[t].indexOf(r) >= 0
          ) {
            i.push(a);
          }
        } else {
          i.push(a);
        }
      }
    }
  }
  return i;
}
function h(e) {
  if (e.composed || e.constructed) {
    for (
      t = M_OptionsManager_maybe.util.createBuffer(), r = 0, undefined;
      r < e.value.length;
      ++r
    ) {
      var t;
      var r;
      t.putBytes(e.value[r].value);
    }
    e.composed = e.constructed = false;
    e.value = t.getBytes();
  }
  return e;
}
function f(e, t) {
  var r = {};
  var s = [];
  if (
    !i.validate(
      e,
      M_OptionsManager_maybe.pkcs7.asn1.encryptedDataValidator,
      r,
      s
    )
  )
    throw (
      (((a = new Error("Cannot read EncryptedContentInfo.")).errors = s), a)
    );
  var a;
  var c = i.derToOid(r.contentType);
  if (c !== o.oids.data)
    throw (
      (((a = new Error(
        "PKCS#12 EncryptedContentInfo ContentType is not Data."
      )).oid = c),
      a)
    );
  c = i.derToOid(r.encAlgorithm);
  var l = o.pbe.getCipher(c, r.encParameter, t);
  var u = h(r.encryptedContentAsn1);
  var d = M_OptionsManager_maybe.util.createBuffer(u.value);
  l.update(d);
  if (!l.finish()) throw new Error("Failed to decrypt PKCS#12 SafeContents.");
  return l.output.getBytes();
}
function g(e, t, r) {
  if (!t && 0 === e.length) return [];
  if (
    (e = i.fromDer(e, t)).tagClass !== i.Class.UNIVERSAL ||
    e.type !== i.Type.SEQUENCE ||
    true !== e.constructed
  )
    throw new Error(
      "PKCS#12 SafeContents expected to be a SEQUENCE OF SafeBag."
    );
  for (n = [], s = 0, undefined; s < e.value.length; s++) {
    var n;
    var s;
    var a = e.value[s];
    var c = {};
    var u = [];
    if (!i.validate(a, l, c, u))
      throw (((y = new Error("Cannot read SafeBag.")).errors = u), y);
    var p;
    var h;
    var f = {
      type: i.derToOid(c.bagId),
      attributes: m(c.bagAttributes),
    };
    n.push(f);
    var g = c.bagValue.value[0];
    switch (f.type) {
      case o.oids.pkcs8ShroudedKeyBag:
        if (null === (g = o.decryptPrivateKeyInfo(g, r)))
          throw new Error(
            "Unable to decrypt PKCS#8 ShroudedKeyBag, wrong password?"
          );
      case o.oids.keyBag:
        try {
          f.key = o.privateKeyFromAsn1(g);
        } catch (e) {
          f.key = null;
          f.asn1 = g;
        }
        continue;
      case o.oids.certBag:
        p = d;
        h = function () {
          if (i.derToOid(c.certId) !== o.oids.x509Certificate) {
            var e = new Error(
              "Unsupported certificate type, only X.509 supported."
            );
            throw ((e.oid = i.derToOid(c.certId)), e);
          }
          var r = i.fromDer(c.cert, t);
          try {
            f.cert = o.certificateFromAsn1(r, true);
          } catch (e) {
            f.cert = null;
            f.asn1 = r;
          }
        };
        break;
      default:
        var y;
        throw (
          (((y = new Error("Unsupported PKCS#12 SafeBag type.")).oid = f.type),
          y)
        );
    }
    if (undefined !== p && !i.validate(g, p, c, u))
      throw (((y = new Error("Cannot read PKCS#12 " + p.name)).errors = u), y);
    h();
  }
  return n;
}
function m(e) {
  var t = {};
  if (undefined !== e)
    for (var r = 0; r < e.length; ++r) {
      var n = {};
      var s = [];
      if (!i.validate(e[r], u, n, s)) {
        var a = new Error("Cannot read PKCS#12 BagAttribute.");
        throw ((a.errors = s), a);
      }
      var c = i.derToOid(n.oid);
      if (undefined !== o.oids[c]) {
        t[o.oids[c]] = [];
        for (var l = 0; l < n.values.length; ++l)
          t[o.oids[c]].push(n.values[l].value);
      }
    }
  return t;
}
s.pkcs12FromAsn1 = function (e, t, r) {
  if ("string" == typeof t) {
    r = t;
    t = true;
  } else {
    if (undefined === t) {
      t = true;
    }
  }
  var l = {};
  if (!i.validate(e, c, l, []))
    throw (
      (((u = new Error(
        "Cannot read PKCS#12 PFX. ASN.1 object is not an PKCS#12 PFX."
      )).errors = u),
      u)
    );
  var u;
  var d = {
    version: l.version.charCodeAt(0),
    safeContents: [],
    getBags: function (e) {
      var t;
      var r = {};
      if ("localKeyId" in e) {
        t = e.localKeyId;
      } else {
        if ("localKeyIdHex" in e) {
          t = M_OptionsManager_maybe.util.hexToBytes(e.localKeyIdHex);
        }
      }
      if (undefined === t && !("friendlyName" in e) && "bagType" in e) {
        r[e.bagType] = p(d.safeContents, null, null, e.bagType);
      }
      if (undefined !== t) {
        r.localKeyId = p(d.safeContents, "localKeyId", t, e.bagType);
      }
      if ("friendlyName" in e) {
        r.friendlyName = p(
          d.safeContents,
          "friendlyName",
          e.friendlyName,
          e.bagType
        );
      }
      return r;
    },
    getBagsByFriendlyName: function (e, t) {
      return p(d.safeContents, "friendlyName", e, t);
    },
    getBagsByLocalKeyId: function (e, t) {
      return p(d.safeContents, "localKeyId", e, t);
    },
  };
  if (3 !== l.version.charCodeAt(0))
    throw (
      (((u = new Error(
        "PKCS#12 PFX of version other than 3 not supported."
      )).version = l.version.charCodeAt(0)),
      u)
    );
  if (i.derToOid(l.contentType) !== o.oids.data)
    throw (
      (((u = new Error(
        "Only PKCS#12 PFX in password integrity mode supported."
      )).oid = i.derToOid(l.contentType)),
      u)
    );
  var m = l.content.value[0];
  if (m.tagClass !== i.Class.UNIVERSAL || m.type !== i.Type.OCTETSTRING)
    throw new Error("PKCS#12 authSafe content data is not an OCTET STRING.");
  m = h(m);
  if (l.mac) {
    var y = null,
      v = 0,
      _ = i.derToOid(l.macAlgorithm);
    switch (_) {
      case o.oids.sha1:
        (y = M_OptionsManager_maybe.md.sha1.create()), (v = 20);
        break;
      case o.oids.sha256:
        (y = M_OptionsManager_maybe.md.sha256.create()), (v = 32);
        break;
      case o.oids.sha384:
        (y = M_OptionsManager_maybe.md.sha384.create()), (v = 48);
        break;
      case o.oids.sha512:
        (y = M_OptionsManager_maybe.md.sha512.create()), (v = 64);
        break;
      case o.oids.md5:
        (y = M_OptionsManager_maybe.md.md5.create()), (v = 16);
    }
    if (null === y)
      throw new Error("PKCS#12 uses unsupported MAC algorithm: " + _);
    var b = new M_OptionsManager_maybe.util.ByteBuffer(l.macSalt),
      w =
        "macIterations" in l
          ? parseInt(
              M_OptionsManager_maybe.util.bytesToHex(l.macIterations),
              16
            )
          : 1,
      C = s.generateKey(r, b, 3, w, v, y),
      E = M_OptionsManager_maybe.hmac.create();
    if (
      (E.start(y, C), E.update(m.value), E.getMac().getBytes() !== l.macDigest)
    )
      throw new Error("PKCS#12 MAC could not be verified. Invalid password?");
  }
  (function (e, t, r, n) {
    if (
      (t = i.fromDer(t, r)).tagClass !== i.Class.UNIVERSAL ||
      t.type !== i.Type.SEQUENCE ||
      true !== t.constructed
    )
      throw new Error(
        "PKCS#12 AuthenticatedSafe expected to be a SEQUENCE OF ContentInfo"
      );
    for (var s = 0; s < t.value.length; s++) {
      var c = t.value[s];
      var l = {};
      var u = [];
      if (!i.validate(c, a, l, u))
        throw (((y = new Error("Cannot read ContentInfo.")).errors = u), y);
      var d = {
        encrypted: false,
      };
      var p = null;
      var m = l.content.value[0];
      switch (i.derToOid(l.contentType)) {
        case o.oids.data:
          if (m.tagClass !== i.Class.UNIVERSAL || m.type !== i.Type.OCTETSTRING)
            throw new Error(
              "PKCS#12 SafeContents Data is not an OCTET STRING."
            );
          p = h(m).value;
          break;
        case o.oids.encryptedData:
          p = f(m, n);
          d.encrypted = true;
          break;
        default:
          var y;
          throw (
            (((y = new Error("Unsupported PKCS#12 contentType.")).contentType =
              i.derToOid(l.contentType)),
            y)
          );
      }
      d.safeBags = g(p, r, n);
      e.safeContents.push(d);
    }
  })(d, m.value, t, r);
  return d;
};
s.toPkcs12Asn1 = function (e, t, r, a) {
  (a = a || {}).saltSize = a.saltSize || 8;
  a.count = a.count || 2048;
  a.algorithm = a.algorithm || a.encAlgorithm || "aes128";
  if ("useMac" in a) {
    a.useMac = true;
  }
  if ("localKeyId" in a) {
    a.localKeyId = null;
  }
  if ("generateLocalKeyId" in a) {
    a.generateLocalKeyId = true;
  }
  var c;
  var l = a.localKeyId;
  if (null !== l) l = M_OptionsManager_maybe.util.hexToBytes(l);
  else if (a.generateLocalKeyId)
    if (t) {
      var u = M_OptionsManager_maybe.util.isArray(t) ? t[0] : t;
      if ("string" == typeof u) {
        u = o.certificateFromPem(u);
      }
      (k = M_OptionsManager_maybe.md.sha1.create()).update(
        i.toDer(o.certificateToAsn1(u)).getBytes()
      );
      l = k.digest().getBytes();
    } else l = M_OptionsManager_maybe.random.getBytes(20);
  var d = [];
  if (null !== l) {
    d.push(
      i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
        i.create(
          i.Class.UNIVERSAL,
          i.Type.OID,
          false,
          i.oidToDer(o.oids.localKeyId).getBytes()
        ),
        i.create(i.Class.UNIVERSAL, i.Type.SET, true, [
          i.create(i.Class.UNIVERSAL, i.Type.OCTETSTRING, false, l),
        ]),
      ])
    );
  }
  if ("friendlyName" in a) {
    d.push(
      i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
        i.create(
          i.Class.UNIVERSAL,
          i.Type.OID,
          false,
          i.oidToDer(o.oids.friendlyName).getBytes()
        ),
        i.create(i.Class.UNIVERSAL, i.Type.SET, true, [
          i.create(i.Class.UNIVERSAL, i.Type.BMPSTRING, false, a.friendlyName),
        ]),
      ])
    );
  }
  if (d.length > 0) {
    c = i.create(i.Class.UNIVERSAL, i.Type.SET, true, d);
  }
  var p = [];
  var h = [];
  if (null !== t) {
    h = M_OptionsManager_maybe.util.isArray(t) ? t : [t];
  }
  for (f = [], g = 0, undefined; g < h.length; ++g) {
    var f;
    var g;
    if ("string" == typeof (t = h[g])) {
      t = o.certificateFromPem(t);
    }
    var m = 0 === g ? c : undefined;
    var y = o.certificateToAsn1(t);
    var v = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
      i.create(
        i.Class.UNIVERSAL,
        i.Type.OID,
        false,
        i.oidToDer(o.oids.certBag).getBytes()
      ),
      i.create(i.Class.CONTEXT_SPECIFIC, 0, true, [
        i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
          i.create(
            i.Class.UNIVERSAL,
            i.Type.OID,
            false,
            i.oidToDer(o.oids.x509Certificate).getBytes()
          ),
          i.create(i.Class.CONTEXT_SPECIFIC, 0, true, [
            i.create(
              i.Class.UNIVERSAL,
              i.Type.OCTETSTRING,
              false,
              i.toDer(y).getBytes()
            ),
          ]),
        ]),
      ]),
      m,
    ]);
    f.push(v);
  }
  if (f.length > 0) {
    var _ = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, f);
    var b = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
      i.create(
        i.Class.UNIVERSAL,
        i.Type.OID,
        false,
        i.oidToDer(o.oids.data).getBytes()
      ),
      i.create(i.Class.CONTEXT_SPECIFIC, 0, true, [
        i.create(
          i.Class.UNIVERSAL,
          i.Type.OCTETSTRING,
          false,
          i.toDer(_).getBytes()
        ),
      ]),
    ]);
    p.push(b);
  }
  var w = null;
  if (null !== e) {
    var C = o.wrapRsaPrivateKey(o.privateKeyToAsn1(e));
    w =
      null === r
        ? i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
            i.create(
              i.Class.UNIVERSAL,
              i.Type.OID,
              false,
              i.oidToDer(o.oids.keyBag).getBytes()
            ),
            i.create(i.Class.CONTEXT_SPECIFIC, 0, true, [C]),
            c,
          ])
        : i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
            i.create(
              i.Class.UNIVERSAL,
              i.Type.OID,
              false,
              i.oidToDer(o.oids.pkcs8ShroudedKeyBag).getBytes()
            ),
            i.create(i.Class.CONTEXT_SPECIFIC, 0, true, [
              o.encryptPrivateKeyInfo(C, r, a),
            ]),
            c,
          ]);
    var E = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [w]);
    var T = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
      i.create(
        i.Class.UNIVERSAL,
        i.Type.OID,
        false,
        i.oidToDer(o.oids.data).getBytes()
      ),
      i.create(i.Class.CONTEXT_SPECIFIC, 0, true, [
        i.create(
          i.Class.UNIVERSAL,
          i.Type.OCTETSTRING,
          false,
          i.toDer(E).getBytes()
        ),
      ]),
    ]);
    p.push(T);
  }
  var S;
  var x = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, p);
  if (a.useMac) {
    var k = M_OptionsManager_maybe.md.sha1.create();
    var I = new M_OptionsManager_maybe.util.ByteBuffer(
      M_OptionsManager_maybe.random.getBytes(a.saltSize)
    );
    var A = a.count;
    var P =
      ((e = s.generateKey(r, I, 3, A, 20)),
      M_OptionsManager_maybe.hmac.create());
    P.start(k, e);
    P.update(i.toDer(x).getBytes());
    var R = P.getMac();
    S = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
      i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
        i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
          i.create(
            i.Class.UNIVERSAL,
            i.Type.OID,
            false,
            i.oidToDer(o.oids.sha1).getBytes()
          ),
          i.create(i.Class.UNIVERSAL, i.Type.NULL, false, ""),
        ]),
        i.create(i.Class.UNIVERSAL, i.Type.OCTETSTRING, false, R.getBytes()),
      ]),
      i.create(i.Class.UNIVERSAL, i.Type.OCTETSTRING, false, I.getBytes()),
      i.create(
        i.Class.UNIVERSAL,
        i.Type.INTEGER,
        false,
        i.integerToDer(A).getBytes()
      ),
    ]);
  }
  return i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
    i.create(
      i.Class.UNIVERSAL,
      i.Type.INTEGER,
      false,
      i.integerToDer(3).getBytes()
    ),
    i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
      i.create(
        i.Class.UNIVERSAL,
        i.Type.OID,
        false,
        i.oidToDer(o.oids.data).getBytes()
      ),
      i.create(i.Class.CONTEXT_SPECIFIC, 0, true, [
        i.create(
          i.Class.UNIVERSAL,
          i.Type.OCTETSTRING,
          false,
          i.toDer(x).getBytes()
        ),
      ]),
    ]),
    S,
  ]);
};
s.generateKey = M_OptionsManager_maybe.pbe.generatePkcs12Key;
