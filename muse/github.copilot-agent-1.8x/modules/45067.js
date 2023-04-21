var n = require(56105);
require(60070);
require(61057);
require(62148);
require(81877);
require(25661);
require(44207);
require(46572);
require(56827);
require(46461);
var i = n.asn1;
var o = (module.exports = n.pkcs7 = n.pkcs7 || {});
function s(e) {
  var t = {};
  var r = [];
  if (!i.validate(e, o.asn1.recipientInfoValidator, t, r)) {
    var s = new Error(
      "Cannot read PKCS#7 RecipientInfo. ASN.1 object is not an PKCS#7 RecipientInfo."
    );
    throw ((s.errors = r), s);
  }
  return {
    version: t.version.charCodeAt(0),
    issuer: n.pki.RDNAttributesAsArray(t.issuer),
    serialNumber: n.util.createBuffer(t.serial).toHex(),
    encryptedContent: {
      algorithm: i.derToOid(t.encAlgorithm),
      parameter: t.encParameter ? t.encParameter.value : undefined,
      content: t.encKey,
    },
  };
}
function a(e) {
  for (r = [], o = 0, undefined; o < e.length; ++o) {
    var t;
    var r;
    var o;
    r.push(
      ((t = e[o]),
      i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
        i.create(
          i.Class.UNIVERSAL,
          i.Type.INTEGER,
          false,
          i.integerToDer(t.version).getBytes()
        ),
        i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
          n.pki.distinguishedNameToAsn1({
            attributes: t.issuer,
          }),
          i.create(
            i.Class.UNIVERSAL,
            i.Type.INTEGER,
            false,
            n.util.hexToBytes(t.serialNumber)
          ),
        ]),
        i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
          i.create(
            i.Class.UNIVERSAL,
            i.Type.OID,
            false,
            i.oidToDer(t.encryptedContent.algorithm).getBytes()
          ),
          i.create(i.Class.UNIVERSAL, i.Type.NULL, false, ""),
        ]),
        i.create(
          i.Class.UNIVERSAL,
          i.Type.OCTETSTRING,
          false,
          t.encryptedContent.content
        ),
      ]))
    );
  }
  return r;
}
function c(e) {
  var t = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
    i.create(
      i.Class.UNIVERSAL,
      i.Type.INTEGER,
      false,
      i.integerToDer(e.version).getBytes()
    ),
    i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
      n.pki.distinguishedNameToAsn1({
        attributes: e.issuer,
      }),
      i.create(
        i.Class.UNIVERSAL,
        i.Type.INTEGER,
        false,
        n.util.hexToBytes(e.serialNumber)
      ),
    ]),
    i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
      i.create(
        i.Class.UNIVERSAL,
        i.Type.OID,
        false,
        i.oidToDer(e.digestAlgorithm).getBytes()
      ),
      i.create(i.Class.UNIVERSAL, i.Type.NULL, false, ""),
    ]),
  ]);
  if (e.authenticatedAttributesAsn1) {
    t.value.push(e.authenticatedAttributesAsn1);
  }
  t.value.push(
    i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
      i.create(
        i.Class.UNIVERSAL,
        i.Type.OID,
        false,
        i.oidToDer(e.signatureAlgorithm).getBytes()
      ),
      i.create(i.Class.UNIVERSAL, i.Type.NULL, false, ""),
    ])
  );
  t.value.push(
    i.create(i.Class.UNIVERSAL, i.Type.OCTETSTRING, false, e.signature)
  );
  if (e.unauthenticatedAttributes.length > 0) {
    for (
      var r = i.create(i.Class.CONTEXT_SPECIFIC, 1, !0, []), o = 0;
      o < e.unauthenticatedAttributes.length;
      ++o
    ) {
      var s = e.unauthenticatedAttributes[o];
      r.values.push(l(s));
    }
    t.value.push(r);
  }
  return t;
}
function l(e) {
  var t;
  if (e.type === n.pki.oids.contentType)
    t = i.create(
      i.Class.UNIVERSAL,
      i.Type.OID,
      false,
      i.oidToDer(e.value).getBytes()
    );
  else if (e.type === n.pki.oids.messageDigest)
    t = i.create(i.Class.UNIVERSAL, i.Type.OCTETSTRING, false, e.value.bytes());
  else if (e.type === n.pki.oids.signingTime) {
    var r = new Date("1950-01-01T00:00:00Z");
    var o = new Date("2050-01-01T00:00:00Z");
    var s = e.value;
    if ("string" == typeof s) {
      var a = Date.parse(s);
      s = isNaN(a)
        ? 13 === s.length
          ? i.utcTimeToDate(s)
          : i.generalizedTimeToDate(s)
        : new Date(a);
    }
    t =
      s >= r && s < o
        ? i.create(i.Class.UNIVERSAL, i.Type.UTCTIME, false, i.dateToUtcTime(s))
        : i.create(
            i.Class.UNIVERSAL,
            i.Type.GENERALIZEDTIME,
            false,
            i.dateToGeneralizedTime(s)
          );
  }
  return i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
    i.create(
      i.Class.UNIVERSAL,
      i.Type.OID,
      false,
      i.oidToDer(e.type).getBytes()
    ),
    i.create(i.Class.UNIVERSAL, i.Type.SET, true, [t]),
  ]);
}
function u(e, t, r) {
  var o = {};
  if (!i.validate(t, r, o, [])) {
    var s = new Error(
      "Cannot read PKCS#7 message. ASN.1 object is not a supported PKCS#7 message."
    );
    throw ((s.errors = s), s);
  }
  if (i.derToOid(o.contentType) !== n.pki.oids.data)
    throw new Error(
      "Unsupported PKCS#7 message. Only wrapped ContentType Data supported."
    );
  if (o.encryptedContent) {
    var a = "";
    if (n.util.isArray(o.encryptedContent))
      for (var c = 0; c < o.encryptedContent.length; ++c) {
        if (o.encryptedContent[c].type !== i.Type.OCTETSTRING)
          throw new Error(
            "Malformed PKCS#7 message, expecting encrypted content constructed of only OCTET STRING objects."
          );
        a += o.encryptedContent[c].value;
      }
    else a = o.encryptedContent;
    e.encryptedContent = {
      algorithm: i.derToOid(o.encAlgorithm),
      parameter: n.util.createBuffer(o.encParameter.value),
      content: n.util.createBuffer(a),
    };
  }
  if (o.content) {
    a = "";
    if (n.util.isArray(o.content))
      for (c = 0; c < o.content.length; ++c) {
        if (o.content[c].type !== i.Type.OCTETSTRING)
          throw new Error(
            "Malformed PKCS#7 message, expecting content constructed of only OCTET STRING objects."
          );
        a += o.content[c].value;
      }
    else a = o.content;
    e.content = n.util.createBuffer(a);
  }
  e.version = o.version.charCodeAt(0);
  e.rawCapture = o;
  return o;
}
function d(e) {
  if (undefined === e.encryptedContent.key)
    throw new Error("Symmetric key not available.");
  if (undefined === e.content) {
    var t;
    switch (e.encryptedContent.algorithm) {
      case n.pki.oids["aes128-CBC"]:
      case n.pki.oids["aes192-CBC"]:
      case n.pki.oids["aes256-CBC"]:
        t = n.aes.createDecryptionCipher(e.encryptedContent.key);
        break;
      case n.pki.oids.desCBC:
      case n.pki.oids["des-EDE3-CBC"]:
        t = n.des.createDecryptionCipher(e.encryptedContent.key);
        break;
      default:
        throw new Error(
          "Unsupported symmetric cipher, OID " + e.encryptedContent.algorithm
        );
    }
    t.start(e.encryptedContent.parameter);
    t.update(e.encryptedContent.content);
    if (!t.finish()) throw new Error("Symmetric decryption failed.");
    e.content = t.output;
  }
}
o.messageFromPem = function (e) {
  var t = n.pem.decode(e)[0];
  if ("PKCS7" !== t.type) {
    var r = new Error(
      'Could not convert PKCS#7 message from PEM; PEM header type is not "PKCS#7".'
    );
    throw ((r.headerType = t.type), r);
  }
  if (t.procType && "ENCRYPTED" === t.procType.type)
    throw new Error(
      "Could not convert PKCS#7 message from PEM; PEM is encrypted."
    );
  var s = i.fromDer(t.body);
  return o.messageFromAsn1(s);
};
o.messageToPem = function (e, t) {
  var r = {
    type: "PKCS7",
    body: i.toDer(e.toAsn1()).getBytes(),
  };
  return n.pem.encode(r, {
    maxline: t,
  });
};
o.messageFromAsn1 = function (e) {
  var t = {};
  var r = [];
  if (!i.validate(e, o.asn1.contentInfoValidator, t, r)) {
    var s = new Error(
      "Cannot read PKCS#7 message. ASN.1 object is not an PKCS#7 ContentInfo."
    );
    throw ((s.errors = r), s);
  }
  var a;
  var c = i.derToOid(t.contentType);
  switch (c) {
    case n.pki.oids.envelopedData:
      a = o.createEnvelopedData();
      break;
    case n.pki.oids.encryptedData:
      a = o.createEncryptedData();
      break;
    case n.pki.oids.signedData:
      a = o.createSignedData();
      break;
    default:
      throw new Error(
        "Cannot read PKCS#7 message. ContentType with OID " +
          c +
          " is not (yet) supported."
      );
  }
  a.fromAsn1(t.content.value[0]);
  return a;
};
o.createSignedData = function () {
  var e = null;
  return (e = {
    type: n.pki.oids.signedData,
    version: 1,
    certificates: [],
    crls: [],
    signers: [],
    digestAlgorithmIdentifiers: [],
    contentInfo: null,
    signerInfos: [],
    fromAsn1: function (t) {
      u(e, t, o.asn1.signedDataValidator);
      e.certificates = [];
      e.crls = [];
      e.digestAlgorithmIdentifiers = [];
      e.contentInfo = null;
      e.signerInfos = [];
      if (e.rawCapture.certificates)
        for (var r = e.rawCapture.certificates.value, i = 0; i < r.length; ++i)
          e.certificates.push(n.pki.certificateFromAsn1(r[i]));
    },
    toAsn1: function () {
      if (e.contentInfo) {
        e.sign();
      }
      for (t = [], r = 0, undefined; r < e.certificates.length; ++r) {
        var t;
        var r;
        t.push(n.pki.certificateToAsn1(e.certificates[r]));
      }
      var o = [];
      var s = i.create(i.Class.CONTEXT_SPECIFIC, 0, true, [
        i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
          i.create(
            i.Class.UNIVERSAL,
            i.Type.INTEGER,
            false,
            i.integerToDer(e.version).getBytes()
          ),
          i.create(
            i.Class.UNIVERSAL,
            i.Type.SET,
            true,
            e.digestAlgorithmIdentifiers
          ),
          e.contentInfo,
        ]),
      ]);
      if (t.length > 0) {
        s.value[0].value.push(i.create(i.Class.CONTEXT_SPECIFIC, 0, true, t));
      }
      if (o.length > 0) {
        s.value[0].value.push(i.create(i.Class.CONTEXT_SPECIFIC, 1, true, o));
      }
      s.value[0].value.push(
        i.create(i.Class.UNIVERSAL, i.Type.SET, true, e.signerInfos)
      );
      return i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
        i.create(
          i.Class.UNIVERSAL,
          i.Type.OID,
          false,
          i.oidToDer(e.type).getBytes()
        ),
        s,
      ]);
    },
    addSigner: function (t) {
      var r = t.issuer;
      var i = t.serialNumber;
      if (t.certificate) {
        var o = t.certificate;
        if ("string" == typeof o) {
          o = n.pki.certificateFromPem(o);
        }
        r = o.issuer.attributes;
        i = o.serialNumber;
      }
      var s = t.key;
      if (!s)
        throw new Error(
          "Could not add PKCS#7 signer; no private key specified."
        );
      if ("string" == typeof s) {
        s = n.pki.privateKeyFromPem(s);
      }
      var a = t.digestAlgorithm || n.pki.oids.sha1;
      switch (a) {
        case n.pki.oids.sha1:
        case n.pki.oids.sha256:
        case n.pki.oids.sha384:
        case n.pki.oids.sha512:
        case n.pki.oids.md5:
          break;
        default:
          throw new Error(
            "Could not add PKCS#7 signer; unknown message digest algorithm: " +
              a
          );
      }
      var c = t.authenticatedAttributes || [];
      if (c.length > 0) {
        for (l = false, u = false, d = 0, undefined; d < c.length; ++d) {
          var l;
          var u;
          var d;
          var p = c[d];
          if (l || p.type !== n.pki.oids.contentType) {
            if (u || p.type !== n.pki.oids.messageDigest);
            else {
              u = true;
              if (l) break;
            }
          } else {
            l = true;
            if (u) break;
          }
        }
        if (!l || !u)
          throw new Error(
            "Invalid signer.authenticatedAttributes. If signer.authenticatedAttributes is specified, then it must contain at least two attributes, PKCS #9 content-type and PKCS #9 message-digest."
          );
      }
      e.signers.push({
        key: s,
        version: 1,
        issuer: r,
        serialNumber: i,
        digestAlgorithm: a,
        signatureAlgorithm: n.pki.oids.rsaEncryption,
        signature: null,
        authenticatedAttributes: c,
        unauthenticatedAttributes: [],
      });
    },
    sign: function (t) {
      var r;
      t = t || {};
      if ("object" != typeof e.content || null === e.contentInfo) {
        e.contentInfo = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
          i.create(
            i.Class.UNIVERSAL,
            i.Type.OID,
            false,
            i.oidToDer(n.pki.oids.data).getBytes()
          ),
        ]);
        if ("content" in e) {
          if (e.content instanceof n.util.ByteBuffer) {
            r = e.content.bytes();
          } else {
            if ("string" == typeof e.content) {
              r = n.util.encodeUtf8(e.content);
            }
          }
          if (t.detached) {
            e.detachedContent = i.create(
              i.Class.UNIVERSAL,
              i.Type.OCTETSTRING,
              false,
              r
            );
          } else {
            e.contentInfo.value.push(
              i.create(i.Class.CONTEXT_SPECIFIC, 0, true, [
                i.create(i.Class.UNIVERSAL, i.Type.OCTETSTRING, false, r),
              ])
            );
          }
        }
      }
      if (0 !== e.signers.length) {
        (function (t) {
          var r;
          if (
            !(r = e.detachedContent
              ? e.detachedContent
              : (r = e.contentInfo.value[1]).value[0])
          )
            throw new Error(
              "Could not sign PKCS#7 message; there is no content to sign."
            );
          var o = i.derToOid(e.contentInfo.value[0].value);
          var s = i.toDer(r);
          for (var a in (s.getByte(),
          i.getBerValueLength(s),
          (s = s.getBytes()),
          t))
            t[a].start().update(s);
          for (u = new Date(), d = 0, undefined; d < e.signers.length; ++d) {
            var u;
            var d;
            var p = e.signers[d];
            if (0 === p.authenticatedAttributes.length) {
              if (o !== n.pki.oids.data)
                throw new Error(
                  "Invalid signer; authenticatedAttributes must be present when the ContentInfo content type is not PKCS#7 Data."
                );
            } else {
              p.authenticatedAttributesAsn1 = i.create(
                i.Class.CONTEXT_SPECIFIC,
                0,
                true,
                []
              );
              for (
                h = i.create(i.Class.UNIVERSAL, i.Type.SET, true, []),
                  f = 0,
                  undefined;
                f < p.authenticatedAttributes.length;
                ++f
              ) {
                var h;
                var f;
                var g = p.authenticatedAttributes[f];
                if (g.type === n.pki.oids.messageDigest) {
                  g.value = t[p.digestAlgorithm].digest();
                } else {
                  if (g.type === n.pki.oids.signingTime) {
                    if (g.value) {
                      g.value = u;
                    }
                  }
                }
                h.value.push(l(g));
                p.authenticatedAttributesAsn1.value.push(l(g));
              }
              s = i.toDer(h).getBytes();
              p.md.start().update(s);
            }
            p.signature = p.key.sign(p.md, "RSASSA-PKCS1-V1_5");
          }
          e.signerInfos = (function (e) {
            for (t = [], r = 0, undefined; r < e.length; ++r) {
              var t;
              var r;
              t.push(c(e[r]));
            }
            return t;
          })(e.signers);
        })(
          (function () {
            for (t = {}, r = 0, undefined; r < e.signers.length; ++r) {
              var t;
              var r;
              var o = e.signers[r];
              if ((s = o.digestAlgorithm) in t) {
                t[s] = n.md[n.pki.oids[s]].create();
              }
              if (0 === o.authenticatedAttributes.length) {
                o.md = t[s];
              } else {
                o.md = n.md[n.pki.oids[s]].create();
              }
            }
            for (var s in ((e.digestAlgorithmIdentifiers = []), t))
              e.digestAlgorithmIdentifiers.push(
                i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
                  i.create(
                    i.Class.UNIVERSAL,
                    i.Type.OID,
                    false,
                    i.oidToDer(s).getBytes()
                  ),
                  i.create(i.Class.UNIVERSAL, i.Type.NULL, false, ""),
                ])
              );
            return t;
          })()
        );
      }
    },
    verify: function () {
      throw new Error("PKCS#7 signature verification not yet implemented.");
    },
    addCertificate: function (t) {
      if ("string" == typeof t) {
        t = n.pki.certificateFromPem(t);
      }
      e.certificates.push(t);
    },
    addCertificateRevokationList: function (e) {
      throw new Error("PKCS#7 CRL support not yet implemented.");
    },
  });
};
o.createEncryptedData = function () {
  var e = null;
  return (e = {
    type: n.pki.oids.encryptedData,
    version: 0,
    encryptedContent: {
      algorithm: n.pki.oids["aes256-CBC"],
    },
    fromAsn1: function (t) {
      u(e, t, o.asn1.encryptedDataValidator);
    },
    decrypt: function (t) {
      if (undefined !== t) {
        e.encryptedContent.key = t;
      }
      d(e);
    },
  });
};
o.createEnvelopedData = function () {
  var e = null;
  return (e = {
    type: n.pki.oids.envelopedData,
    version: 0,
    recipients: [],
    encryptedContent: {
      algorithm: n.pki.oids["aes256-CBC"],
    },
    fromAsn1: function (t) {
      var r = u(e, t, o.asn1.envelopedDataValidator);
      e.recipients = (function (e) {
        for (t = [], r = 0, undefined; r < e.length; ++r) {
          var t;
          var r;
          t.push(s(e[r]));
        }
        return t;
      })(r.recipientInfos.value);
    },
    toAsn1: function () {
      return i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
        i.create(
          i.Class.UNIVERSAL,
          i.Type.OID,
          false,
          i.oidToDer(e.type).getBytes()
        ),
        i.create(i.Class.CONTEXT_SPECIFIC, 0, true, [
          i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
            i.create(
              i.Class.UNIVERSAL,
              i.Type.INTEGER,
              false,
              i.integerToDer(e.version).getBytes()
            ),
            i.create(i.Class.UNIVERSAL, i.Type.SET, true, a(e.recipients)),
            i.create(
              i.Class.UNIVERSAL,
              i.Type.SEQUENCE,
              true,
              ((t = e.encryptedContent),
              [
                i.create(
                  i.Class.UNIVERSAL,
                  i.Type.OID,
                  false,
                  i.oidToDer(n.pki.oids.data).getBytes()
                ),
                i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
                  i.create(
                    i.Class.UNIVERSAL,
                    i.Type.OID,
                    false,
                    i.oidToDer(t.algorithm).getBytes()
                  ),
                  t.parameter
                    ? i.create(
                        i.Class.UNIVERSAL,
                        i.Type.OCTETSTRING,
                        false,
                        t.parameter.getBytes()
                      )
                    : undefined,
                ]),
                i.create(i.Class.CONTEXT_SPECIFIC, 0, true, [
                  i.create(
                    i.Class.UNIVERSAL,
                    i.Type.OCTETSTRING,
                    false,
                    t.content.getBytes()
                  ),
                ]),
              ])
            ),
          ]),
        ]),
      ]);
      var t;
    },
    findRecipient: function (t) {
      for (
        r = t.issuer.attributes, n = 0, undefined;
        n < e.recipients.length;
        ++n
      ) {
        var r;
        var n;
        var i = e.recipients[n];
        var o = i.issuer;
        if (i.serialNumber === t.serialNumber && o.length === r.length) {
          for (s = true, a = 0, undefined; a < r.length; ++a) {
            var s;
            var a;
            if (o[a].type !== r[a].type || o[a].value !== r[a].value) {
              s = false;
              break;
            }
          }
          if (s) return i;
        }
      }
      return null;
    },
    decrypt: function (t, r) {
      if (
        undefined === e.encryptedContent.key &&
        undefined !== t &&
        undefined !== r
      )
        switch (t.encryptedContent.algorithm) {
          case n.pki.oids.rsaEncryption:
          case n.pki.oids.desCBC:
            var i = r.decrypt(t.encryptedContent.content);
            e.encryptedContent.key = n.util.createBuffer(i);
            break;
          default:
            throw new Error(
              "Unsupported asymmetric cipher, OID " +
                t.encryptedContent.algorithm
            );
        }
      d(e);
    },
    addRecipient: function (t) {
      e.recipients.push({
        version: 0,
        issuer: t.issuer.attributes,
        serialNumber: t.serialNumber,
        encryptedContent: {
          algorithm: n.pki.oids.rsaEncryption,
          key: t.publicKey,
        },
      });
    },
    encrypt: function (t, r) {
      if (undefined === e.encryptedContent.content) {
        var i;
        var o;
        var s;
        switch (
          ((r = r || e.encryptedContent.algorithm),
          (t = t || e.encryptedContent.key),
          r)
        ) {
          case n.pki.oids["aes128-CBC"]:
            i = 16;
            o = 16;
            s = n.aes.createEncryptionCipher;
            break;
          case n.pki.oids["aes192-CBC"]:
            i = 24;
            o = 16;
            s = n.aes.createEncryptionCipher;
            break;
          case n.pki.oids["aes256-CBC"]:
            i = 32;
            o = 16;
            s = n.aes.createEncryptionCipher;
            break;
          case n.pki.oids["des-EDE3-CBC"]:
            i = 24;
            o = 8;
            s = n.des.createEncryptionCipher;
            break;
          default:
            throw new Error("Unsupported symmetric cipher, OID " + r);
        }
        if (undefined === t) t = n.util.createBuffer(n.random.getBytes(i));
        else if (t.length() != i)
          throw new Error(
            "Symmetric key has wrong length; got " +
              t.length() +
              " bytes, expected " +
              i +
              "."
          );
        e.encryptedContent.algorithm = r;
        e.encryptedContent.key = t;
        e.encryptedContent.parameter = n.util.createBuffer(
          n.random.getBytes(o)
        );
        var a = s(t);
        a.start(e.encryptedContent.parameter.copy());
        a.update(e.content);
        if (!a.finish()) throw new Error("Symmetric encryption failed.");
        e.encryptedContent.content = a.output;
      }
      for (var c = 0; c < e.recipients.length; ++c) {
        var l = e.recipients[c];
        if (undefined === l.encryptedContent.content) {
          if (l.encryptedContent.algorithm !== n.pki.oids.rsaEncryption)
            throw new Error(
              "Unsupported asymmetric cipher, OID " +
                l.encryptedContent.algorithm
            );
          l.encryptedContent.content = l.encryptedContent.key.encrypt(
            e.encryptedContent.key.data
          );
        }
      }
    },
  });
};