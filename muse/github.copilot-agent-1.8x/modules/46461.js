var n = require(56105);
require(60070);
require(61057);
require(62148);
require(91183);
require(9370);
require(81877);
require(25661);
require(51242);
require(69597);
require(56827);
var i = n.asn1;
var o = (module.exports = n.pki = n.pki || {});
var s = o.oids;
var a = {};
a.CN = s.commonName;
a.commonName = "CN";
a.C = s.countryName;
a.countryName = "C";
a.L = s.localityName;
a.localityName = "L";
a.ST = s.stateOrProvinceName;
a.stateOrProvinceName = "ST";
a.O = s.organizationName;
a.organizationName = "O";
a.OU = s.organizationalUnitName;
a.organizationalUnitName = "OU";
a.E = s.emailAddress;
a.emailAddress = "E";
var c = n.pki.rsa.publicKeyValidator;
var l = {
  name: "Certificate",
  tagClass: i.Class.UNIVERSAL,
  type: i.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "Certificate.TBSCertificate",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.SEQUENCE,
      constructed: true,
      captureAsn1: "tbsCertificate",
      value: [
        {
          name: "Certificate.TBSCertificate.version",
          tagClass: i.Class.CONTEXT_SPECIFIC,
          type: 0,
          constructed: true,
          optional: true,
          value: [
            {
              name: "Certificate.TBSCertificate.version.integer",
              tagClass: i.Class.UNIVERSAL,
              type: i.Type.INTEGER,
              constructed: false,
              capture: "certVersion",
            },
          ],
        },
        {
          name: "Certificate.TBSCertificate.serialNumber",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.INTEGER,
          constructed: false,
          capture: "certSerialNumber",
        },
        {
          name: "Certificate.TBSCertificate.signature",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.SEQUENCE,
          constructed: true,
          value: [
            {
              name: "Certificate.TBSCertificate.signature.algorithm",
              tagClass: i.Class.UNIVERSAL,
              type: i.Type.OID,
              constructed: false,
              capture: "certinfoSignatureOid",
            },
            {
              name: "Certificate.TBSCertificate.signature.parameters",
              tagClass: i.Class.UNIVERSAL,
              optional: true,
              captureAsn1: "certinfoSignatureParams",
            },
          ],
        },
        {
          name: "Certificate.TBSCertificate.issuer",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.SEQUENCE,
          constructed: true,
          captureAsn1: "certIssuer",
        },
        {
          name: "Certificate.TBSCertificate.validity",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.SEQUENCE,
          constructed: true,
          value: [
            {
              name: "Certificate.TBSCertificate.validity.notBefore (utc)",
              tagClass: i.Class.UNIVERSAL,
              type: i.Type.UTCTIME,
              constructed: false,
              optional: true,
              capture: "certValidity1UTCTime",
            },
            {
              name: "Certificate.TBSCertificate.validity.notBefore (generalized)",
              tagClass: i.Class.UNIVERSAL,
              type: i.Type.GENERALIZEDTIME,
              constructed: false,
              optional: true,
              capture: "certValidity2GeneralizedTime",
            },
            {
              name: "Certificate.TBSCertificate.validity.notAfter (utc)",
              tagClass: i.Class.UNIVERSAL,
              type: i.Type.UTCTIME,
              constructed: false,
              optional: true,
              capture: "certValidity3UTCTime",
            },
            {
              name: "Certificate.TBSCertificate.validity.notAfter (generalized)",
              tagClass: i.Class.UNIVERSAL,
              type: i.Type.GENERALIZEDTIME,
              constructed: false,
              optional: true,
              capture: "certValidity4GeneralizedTime",
            },
          ],
        },
        {
          name: "Certificate.TBSCertificate.subject",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.SEQUENCE,
          constructed: true,
          captureAsn1: "certSubject",
        },
        c,
        {
          name: "Certificate.TBSCertificate.issuerUniqueID",
          tagClass: i.Class.CONTEXT_SPECIFIC,
          type: 1,
          constructed: true,
          optional: true,
          value: [
            {
              name: "Certificate.TBSCertificate.issuerUniqueID.id",
              tagClass: i.Class.UNIVERSAL,
              type: i.Type.BITSTRING,
              constructed: false,
              captureBitStringValue: "certIssuerUniqueId",
            },
          ],
        },
        {
          name: "Certificate.TBSCertificate.subjectUniqueID",
          tagClass: i.Class.CONTEXT_SPECIFIC,
          type: 2,
          constructed: true,
          optional: true,
          value: [
            {
              name: "Certificate.TBSCertificate.subjectUniqueID.id",
              tagClass: i.Class.UNIVERSAL,
              type: i.Type.BITSTRING,
              constructed: false,
              captureBitStringValue: "certSubjectUniqueId",
            },
          ],
        },
        {
          name: "Certificate.TBSCertificate.extensions",
          tagClass: i.Class.CONTEXT_SPECIFIC,
          type: 3,
          constructed: true,
          captureAsn1: "certExtensions",
          optional: true,
        },
      ],
    },
    {
      name: "Certificate.signatureAlgorithm",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.SEQUENCE,
      constructed: true,
      value: [
        {
          name: "Certificate.signatureAlgorithm.algorithm",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.OID,
          constructed: false,
          capture: "certSignatureOid",
        },
        {
          name: "Certificate.TBSCertificate.signature.parameters",
          tagClass: i.Class.UNIVERSAL,
          optional: true,
          captureAsn1: "certSignatureParams",
        },
      ],
    },
    {
      name: "Certificate.signatureValue",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.BITSTRING,
      constructed: false,
      captureBitStringValue: "certSignature",
    },
  ],
};
var u = {
  name: "rsapss",
  tagClass: i.Class.UNIVERSAL,
  type: i.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "rsapss.hashAlgorithm",
      tagClass: i.Class.CONTEXT_SPECIFIC,
      type: 0,
      constructed: true,
      value: [
        {
          name: "rsapss.hashAlgorithm.AlgorithmIdentifier",
          tagClass: i.Class.UNIVERSAL,
          type: i.Class.SEQUENCE,
          constructed: true,
          optional: true,
          value: [
            {
              name: "rsapss.hashAlgorithm.AlgorithmIdentifier.algorithm",
              tagClass: i.Class.UNIVERSAL,
              type: i.Type.OID,
              constructed: false,
              capture: "hashOid",
            },
          ],
        },
      ],
    },
    {
      name: "rsapss.maskGenAlgorithm",
      tagClass: i.Class.CONTEXT_SPECIFIC,
      type: 1,
      constructed: true,
      value: [
        {
          name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier",
          tagClass: i.Class.UNIVERSAL,
          type: i.Class.SEQUENCE,
          constructed: true,
          optional: true,
          value: [
            {
              name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.algorithm",
              tagClass: i.Class.UNIVERSAL,
              type: i.Type.OID,
              constructed: false,
              capture: "maskGenOid",
            },
            {
              name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.params",
              tagClass: i.Class.UNIVERSAL,
              type: i.Type.SEQUENCE,
              constructed: true,
              value: [
                {
                  name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.params.algorithm",
                  tagClass: i.Class.UNIVERSAL,
                  type: i.Type.OID,
                  constructed: false,
                  capture: "maskGenHashOid",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "rsapss.saltLength",
      tagClass: i.Class.CONTEXT_SPECIFIC,
      type: 2,
      optional: true,
      value: [
        {
          name: "rsapss.saltLength.saltLength",
          tagClass: i.Class.UNIVERSAL,
          type: i.Class.INTEGER,
          constructed: false,
          capture: "saltLength",
        },
      ],
    },
    {
      name: "rsapss.trailerField",
      tagClass: i.Class.CONTEXT_SPECIFIC,
      type: 3,
      optional: true,
      value: [
        {
          name: "rsapss.trailer.trailer",
          tagClass: i.Class.UNIVERSAL,
          type: i.Class.INTEGER,
          constructed: false,
          capture: "trailer",
        },
      ],
    },
  ],
};
var d = {
  name: "CertificationRequestInfo",
  tagClass: i.Class.UNIVERSAL,
  type: i.Type.SEQUENCE,
  constructed: true,
  captureAsn1: "certificationRequestInfo",
  value: [
    {
      name: "CertificationRequestInfo.integer",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.INTEGER,
      constructed: false,
      capture: "certificationRequestInfoVersion",
    },
    {
      name: "CertificationRequestInfo.subject",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.SEQUENCE,
      constructed: true,
      captureAsn1: "certificationRequestInfoSubject",
    },
    c,
    {
      name: "CertificationRequestInfo.attributes",
      tagClass: i.Class.CONTEXT_SPECIFIC,
      type: 0,
      constructed: true,
      optional: true,
      capture: "certificationRequestInfoAttributes",
      value: [
        {
          name: "CertificationRequestInfo.attributes",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.SEQUENCE,
          constructed: true,
          value: [
            {
              name: "CertificationRequestInfo.attributes.type",
              tagClass: i.Class.UNIVERSAL,
              type: i.Type.OID,
              constructed: false,
            },
            {
              name: "CertificationRequestInfo.attributes.value",
              tagClass: i.Class.UNIVERSAL,
              type: i.Type.SET,
              constructed: true,
            },
          ],
        },
      ],
    },
  ],
};
var p = {
  name: "CertificationRequest",
  tagClass: i.Class.UNIVERSAL,
  type: i.Type.SEQUENCE,
  constructed: true,
  captureAsn1: "csr",
  value: [
    d,
    {
      name: "CertificationRequest.signatureAlgorithm",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.SEQUENCE,
      constructed: true,
      value: [
        {
          name: "CertificationRequest.signatureAlgorithm.algorithm",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.OID,
          constructed: false,
          capture: "csrSignatureOid",
        },
        {
          name: "CertificationRequest.signatureAlgorithm.parameters",
          tagClass: i.Class.UNIVERSAL,
          optional: true,
          captureAsn1: "csrSignatureParams",
        },
      ],
    },
    {
      name: "CertificationRequest.signature",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.BITSTRING,
      constructed: false,
      captureBitStringValue: "csrSignature",
    },
  ],
};
function h(e, t) {
  if ("string" == typeof t) {
    t = {
      shortName: t,
    };
  }
  for (n = null, i = 0, undefined; null === n && i < e.attributes.length; ++i) {
    var r;
    var n;
    var i;
    r = e.attributes[i];
    if (
      (t.type && t.type === r.type) ||
      (t.name && t.name === r.name) ||
      (t.shortName && t.shortName === r.shortName)
    ) {
      n = r;
    }
  }
  return n;
}
o.RDNAttributesAsArray = function (e, t) {
  for (c = [], l = 0, undefined; l < e.value.length; ++l) {
    var r;
    var n;
    var o;
    var c;
    var l;
    r = e.value[l];
    for (var u = 0; u < r.value.length; ++u) {
      o = {};
      n = r.value[u];
      o.type = i.derToOid(n.value[0].value);
      o.value = n.value[1].value;
      o.valueTagClass = n.value[1].type;
      if (o.type in s) {
        o.name = s[o.type];
        if (o.name in a) {
          o.shortName = a[o.name];
        }
      }
      if (t) {
        t.update(o.type);
        t.update(o.value);
      }
      c.push(o);
    }
  }
  return c;
};
o.CRIAttributesAsArray = function (e) {
  for (t = [], r = 0, undefined; r < e.length; ++r) {
    var t;
    var r;
    for (
      n = e[r],
        c = i.derToOid(n.value[0].value),
        l = n.value[1].value,
        u = 0,
        undefined;
      u < l.length;
      ++u
    ) {
      var n;
      var c;
      var l;
      var u;
      var d = {};
      d.type = c;
      d.value = l[u].value;
      d.valueTagClass = l[u].type;
      if (d.type in s) {
        d.name = s[d.type];
        if (d.name in a) {
          d.shortName = a[d.name];
        }
      }
      if (d.type === s.extensionRequest) {
        d.extensions = [];
        for (var p = 0; p < d.value.length; ++p)
          d.extensions.push(o.certificateExtensionFromAsn1(d.value[p]));
      }
      t.push(d);
    }
  }
  return t;
};
var f = function (e, t, r) {
  var n = {};
  if (e !== s["RSASSA-PSS"]) return n;
  if (r) {
    n = {
      hash: {
        algorithmOid: s.sha1,
      },
      mgf: {
        algorithmOid: s.mgf1,
        hash: {
          algorithmOid: s.sha1,
        },
      },
      saltLength: 20,
    };
  }
  var o = {};
  var a = [];
  if (!i.validate(t, u, o, a)) {
    var c = new Error("Cannot read RSASSA-PSS parameter block.");
    throw ((c.errors = a), c);
  }
  if (undefined !== o.hashOid) {
    n.hash = n.hash || {};
    n.hash.algorithmOid = i.derToOid(o.hashOid);
  }
  if (undefined !== o.maskGenOid) {
    n.mgf = n.mgf || {};
    n.mgf.algorithmOid = i.derToOid(o.maskGenOid);
    n.mgf.hash = n.mgf.hash || {};
    n.mgf.hash.algorithmOid = i.derToOid(o.maskGenHashOid);
  }
  if (undefined !== o.saltLength) {
    n.saltLength = o.saltLength.charCodeAt(0);
  }
  return n;
};
var g = function (e) {
  switch (s[e.signatureOid]) {
    case "sha1WithRSAEncryption":
    case "sha1WithRSASignature":
      return n.md.sha1.create();
    case "md5WithRSAEncryption":
      return n.md.md5.create();
    case "sha256WithRSAEncryption":
    case "RSASSA-PSS":
      return n.md.sha256.create();
    case "sha384WithRSAEncryption":
      return n.md.sha384.create();
    case "sha512WithRSAEncryption":
      return n.md.sha512.create();
    default:
      var t = new Error(
        "Could not compute " + e.type + " digest. Unknown signature OID."
      );
      throw ((t.signatureOid = e.signatureOid), t);
  }
};
var m = function (e) {
  var t;
  var r = e.certificate;
  switch (r.signatureOid) {
    case s.sha1WithRSAEncryption:
    case s.sha1WithRSASignature:
      break;
    case s["RSASSA-PSS"]:
      var i;
      var o;
      var a;
      if (
        undefined === (i = s[r.signatureParameters.mgf.hash.algorithmOid]) ||
        undefined === n.md[i]
      )
        throw (
          (((a = new Error("Unsupported MGF hash function.")).oid =
            r.signatureParameters.mgf.hash.algorithmOid),
          (a.name = i),
          a)
        );
      if (
        undefined === (o = s[r.signatureParameters.mgf.algorithmOid]) ||
        undefined === n.mgf[o]
      )
        throw (
          (((a = new Error("Unsupported MGF function.")).oid =
            r.signatureParameters.mgf.algorithmOid),
          (a.name = o),
          a)
        );
      o = n.mgf[o].create(n.md[i].create());
      if (
        void 0 === (i = s[r.signatureParameters.hash.algorithmOid]) ||
        void 0 === n.md[i]
      )
        throw (
          (((a = new Error("Unsupported RSASSA-PSS hash function.")).oid =
            r.signatureParameters.hash.algorithmOid),
          (a.name = i),
          a)
        );
      t = n.pss.create(n.md[i].create(), o, r.signatureParameters.saltLength);
  }
  return r.publicKey.verify(e.md.digest().getBytes(), e.signature, t);
};
function y(e) {
  for (
    o = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, []),
      s = e.attributes,
      a = 0,
      undefined;
    a < s.length;
    ++a
  ) {
    var t;
    var r;
    var o;
    var s;
    var a;
    var c = (t = s[a]).value;
    var l = i.Type.PRINTABLESTRING;
    if ("valueTagClass" in t && (l = t.valueTagClass) === i.Type.UTF8) {
      c = n.util.encodeUtf8(c);
    }
    r = i.create(i.Class.UNIVERSAL, i.Type.SET, true, [
      i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
        i.create(
          i.Class.UNIVERSAL,
          i.Type.OID,
          false,
          i.oidToDer(t.type).getBytes()
        ),
        i.create(i.Class.UNIVERSAL, l, false, c),
      ]),
    ]);
    o.value.push(r);
  }
  return o;
}
function v(e) {
  for (r = 0, undefined; r < e.length; ++r) {
    var t;
    var r;
    if (undefined === (t = e[r]).name) {
      if (t.type && t.type in o.oids) {
        t.name = o.oids[t.type];
      } else {
        if (t.shortName && t.shortName in a) {
          t.name = o.oids[a[t.shortName]];
        }
      }
    }
    if (void 0 === t.type) {
      if (!t.name || !(t.name in o.oids))
        throw (
          (((c = new Error("Attribute type not specified.")).attribute = t), c)
        );
      t.type = o.oids[t.name];
    }
    if (undefined === t.shortName && t.name && t.name in a) {
      t.shortName = a[t.name];
    }
    if (
      t.type === s.extensionRequest &&
      ((t.valueConstructed = !0),
      (t.valueTagClass = i.Type.SEQUENCE),
      !t.value && t.extensions)
    ) {
      t.value = [];
      for (var n = 0; n < t.extensions.length; ++n)
        t.value.push(o.certificateExtensionToAsn1(_(t.extensions[n])));
    }
    var c;
    if (undefined === t.value)
      throw (
        (((c = new Error("Attribute value not specified.")).attribute = t), c)
      );
  }
}
function _(e, t) {
  t = t || {};
  if (undefined === e.name && e.id && e.id in o.oids) {
    e.name = o.oids[e.id];
  }
  if (void 0 === e.id) {
    if (!e.name || !(e.name in o.oids))
      throw (((w = new Error("Extension ID not specified.")).extension = e), w);
    e.id = o.oids[e.name];
  }
  if (undefined !== e.value) return e;
  if ("keyUsage" === e.name) {
    var r = 0;
    var a = 0;
    var c = 0;
    if (e.digitalSignature) {
      a |= 128;
      r = 7;
    }
    if (e.nonRepudiation) {
      a |= 64;
      r = 6;
    }
    if (e.keyEncipherment) {
      a |= 32;
      r = 5;
    }
    if (e.dataEncipherment) {
      a |= 16;
      r = 4;
    }
    if (e.keyAgreement) {
      a |= 8;
      r = 3;
    }
    if (e.keyCertSign) {
      a |= 4;
      r = 2;
    }
    if (e.cRLSign) {
      a |= 2;
      r = 1;
    }
    if (e.encipherOnly) {
      a |= 1;
      r = 0;
    }
    if (e.decipherOnly) {
      c |= 128;
      r = 7;
    }
    var l = String.fromCharCode(r);
    if (0 !== c) {
      l += String.fromCharCode(a) + String.fromCharCode(c);
    } else {
      if (0 !== a) {
        l += String.fromCharCode(a);
      }
    }
    e.value = i.create(i.Class.UNIVERSAL, i.Type.BITSTRING, false, l);
  } else if ("basicConstraints" === e.name) {
    e.value = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, []);
    if (e.cA) {
      e.value.value.push(
        i.create(
          i.Class.UNIVERSAL,
          i.Type.BOOLEAN,
          false,
          String.fromCharCode(255)
        )
      );
    }
    if ("pathLenConstraint" in e) {
      e.value.value.push(
        i.create(
          i.Class.UNIVERSAL,
          i.Type.INTEGER,
          false,
          i.integerToDer(e.pathLenConstraint).getBytes()
        )
      );
    }
  } else if ("extKeyUsage" === e.name) {
    e.value = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, []);
    var u = e.value.value;
    for (var d in e)
      if (true === e[d]) {
        if (d in s) {
          u.push(
            i.create(
              i.Class.UNIVERSAL,
              i.Type.OID,
              false,
              i.oidToDer(s[d]).getBytes()
            )
          );
        } else {
          if (-1 !== d.indexOf(".")) {
            u.push(
              i.create(
                i.Class.UNIVERSAL,
                i.Type.OID,
                false,
                i.oidToDer(d).getBytes()
              )
            );
          }
        }
      }
  } else if ("nsCertType" === e.name) {
    r = 0;
    a = 0;
    if (e.client) {
      a |= 128;
      r = 7;
    }
    if (e.server) {
      a |= 64;
      r = 6;
    }
    if (e.email) {
      a |= 32;
      r = 5;
    }
    if (e.objsign) {
      a |= 16;
      r = 4;
    }
    if (e.reserved) {
      a |= 8;
      r = 3;
    }
    if (e.sslCA) {
      a |= 4;
      r = 2;
    }
    if (e.emailCA) {
      a |= 2;
      r = 1;
    }
    if (e.objCA) {
      a |= 1;
      r = 0;
    }
    l = String.fromCharCode(r);
    if (0 !== a) {
      l += String.fromCharCode(a);
    }
    e.value = i.create(i.Class.UNIVERSAL, i.Type.BITSTRING, false, l);
  } else if ("subjectAltName" === e.name || "issuerAltName" === e.name) {
    e.value = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, []);
    for (var p = 0; p < e.altNames.length; ++p) {
      l = (v = e.altNames[p]).value;
      if (7 === v.type && v.ip) {
        if (null === (l = n.util.bytesFromIP(v.ip)))
          throw (
            (((w = new Error(
              'Extension "ip" value is not a valid IPv4 or IPv6 address.'
            )).extension = e),
            w)
          );
      } else
        8 === v.type &&
          (l = v.oid ? i.oidToDer(i.oidToDer(v.oid)) : i.oidToDer(l));
      e.value.value.push(i.create(i.Class.CONTEXT_SPECIFIC, v.type, false, l));
    }
  } else if ("nsComment" === e.name && t.cert) {
    if (
      !/^[\x00-\x7F]*$/.test(e.comment) ||
      e.comment.length < 1 ||
      e.comment.length > 128
    )
      throw new Error('Invalid "nsComment" content.');
    e.value = i.create(i.Class.UNIVERSAL, i.Type.IA5STRING, false, e.comment);
  } else if ("subjectKeyIdentifier" === e.name && t.cert) {
    var h = t.cert.generateSubjectKeyIdentifier();
    e.subjectKeyIdentifier = h.toHex();
    e.value = i.create(
      i.Class.UNIVERSAL,
      i.Type.OCTETSTRING,
      false,
      h.getBytes()
    );
  } else if ("authorityKeyIdentifier" === e.name && t.cert) {
    e.value = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, []);
    u = e.value.value;
    if (e.keyIdentifier) {
      var f =
        !0 === e.keyIdentifier
          ? t.cert.generateSubjectKeyIdentifier().getBytes()
          : e.keyIdentifier;
      u.push(i.create(i.Class.CONTEXT_SPECIFIC, 0, !1, f));
    }
    if (e.authorityCertIssuer) {
      var g = [
        i.create(i.Class.CONTEXT_SPECIFIC, 4, true, [
          y(
            true === e.authorityCertIssuer
              ? t.cert.issuer
              : e.authorityCertIssuer
          ),
        ]),
      ];
      u.push(i.create(i.Class.CONTEXT_SPECIFIC, 1, true, g));
    }
    if (e.serialNumber) {
      var m = n.util.hexToBytes(
        true === e.serialNumber ? t.cert.serialNumber : e.serialNumber
      );
      u.push(i.create(i.Class.CONTEXT_SPECIFIC, 2, false, m));
    }
  } else if ("cRLDistributionPoints" === e.name) {
    e.value = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, []);
    u = e.value.value;
    var v;
    var _ = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, []);
    var b = i.create(i.Class.CONTEXT_SPECIFIC, 0, true, []);
    for (p = 0; p < e.altNames.length; ++p) {
      l = (v = e.altNames[p]).value;
      if (7 === v.type && v.ip) {
        if (null === (l = n.util.bytesFromIP(v.ip)))
          throw (
            (((w = new Error(
              'Extension "ip" value is not a valid IPv4 or IPv6 address.'
            )).extension = e),
            w)
          );
      } else
        8 === v.type &&
          (l = v.oid ? i.oidToDer(i.oidToDer(v.oid)) : i.oidToDer(l));
      b.value.push(i.create(i.Class.CONTEXT_SPECIFIC, v.type, false, l));
    }
    _.value.push(i.create(i.Class.CONTEXT_SPECIFIC, 0, true, [b]));
    u.push(_);
  }
  var w;
  if (undefined === e.value)
    throw (
      (((w = new Error("Extension value not specified.")).extension = e), w)
    );
  return e;
}
function b(e, t) {
  if (e === s["RSASSA-PSS"]) {
    var r = [];
    if (undefined !== t.hash.algorithmOid) {
      r.push(
        i.create(i.Class.CONTEXT_SPECIFIC, 0, true, [
          i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
            i.create(
              i.Class.UNIVERSAL,
              i.Type.OID,
              false,
              i.oidToDer(t.hash.algorithmOid).getBytes()
            ),
            i.create(i.Class.UNIVERSAL, i.Type.NULL, false, ""),
          ]),
        ])
      );
    }
    if (undefined !== t.mgf.algorithmOid) {
      r.push(
        i.create(i.Class.CONTEXT_SPECIFIC, 1, true, [
          i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
            i.create(
              i.Class.UNIVERSAL,
              i.Type.OID,
              false,
              i.oidToDer(t.mgf.algorithmOid).getBytes()
            ),
            i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
              i.create(
                i.Class.UNIVERSAL,
                i.Type.OID,
                false,
                i.oidToDer(t.mgf.hash.algorithmOid).getBytes()
              ),
              i.create(i.Class.UNIVERSAL, i.Type.NULL, false, ""),
            ]),
          ]),
        ])
      );
    }
    if (undefined !== t.saltLength) {
      r.push(
        i.create(i.Class.CONTEXT_SPECIFIC, 2, true, [
          i.create(
            i.Class.UNIVERSAL,
            i.Type.INTEGER,
            false,
            i.integerToDer(t.saltLength).getBytes()
          ),
        ])
      );
    }
    return i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, r);
  }
  return i.create(i.Class.UNIVERSAL, i.Type.NULL, false, "");
}
function w(e) {
  var t = i.create(i.Class.CONTEXT_SPECIFIC, 0, true, []);
  if (0 === e.attributes.length) return t;
  for (r = e.attributes, o = 0, undefined; o < r.length; ++o) {
    var r;
    var o;
    var s = r[o];
    var a = s.value;
    var c = i.Type.UTF8;
    if ("valueTagClass" in s) {
      c = s.valueTagClass;
    }
    if (c === i.Type.UTF8) {
      a = n.util.encodeUtf8(a);
    }
    var l = false;
    if ("valueConstructed" in s) {
      l = s.valueConstructed;
    }
    var u = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
      i.create(
        i.Class.UNIVERSAL,
        i.Type.OID,
        false,
        i.oidToDer(s.type).getBytes()
      ),
      i.create(i.Class.UNIVERSAL, i.Type.SET, true, [
        i.create(i.Class.UNIVERSAL, c, l, a),
      ]),
    ]);
    t.value.push(u);
  }
  return t;
}
o.certificateFromPem = function (e, t, r) {
  var s = n.pem.decode(e)[0];
  if (
    "CERTIFICATE" !== s.type &&
    "X509 CERTIFICATE" !== s.type &&
    "TRUSTED CERTIFICATE" !== s.type
  ) {
    var a = new Error(
      'Could not convert certificate from PEM; PEM header type is not "CERTIFICATE", "X509 CERTIFICATE", or "TRUSTED CERTIFICATE".'
    );
    throw ((a.headerType = s.type), a);
  }
  if (s.procType && "ENCRYPTED" === s.procType.type)
    throw new Error(
      "Could not convert certificate from PEM; PEM is encrypted."
    );
  var c = i.fromDer(s.body, r);
  return o.certificateFromAsn1(c, t);
};
o.certificateToPem = function (e, t) {
  var r = {
    type: "CERTIFICATE",
    body: i.toDer(o.certificateToAsn1(e)).getBytes(),
  };
  return n.pem.encode(r, {
    maxline: t,
  });
};
o.publicKeyFromPem = function (e) {
  var t = n.pem.decode(e)[0];
  if ("PUBLIC KEY" !== t.type && "RSA PUBLIC KEY" !== t.type) {
    var r = new Error(
      'Could not convert public key from PEM; PEM header type is not "PUBLIC KEY" or "RSA PUBLIC KEY".'
    );
    throw ((r.headerType = t.type), r);
  }
  if (t.procType && "ENCRYPTED" === t.procType.type)
    throw new Error("Could not convert public key from PEM; PEM is encrypted.");
  var s = i.fromDer(t.body);
  return o.publicKeyFromAsn1(s);
};
o.publicKeyToPem = function (e, t) {
  var r = {
    type: "PUBLIC KEY",
    body: i.toDer(o.publicKeyToAsn1(e)).getBytes(),
  };
  return n.pem.encode(r, {
    maxline: t,
  });
};
o.publicKeyToRSAPublicKeyPem = function (e, t) {
  var r = {
    type: "RSA PUBLIC KEY",
    body: i.toDer(o.publicKeyToRSAPublicKey(e)).getBytes(),
  };
  return n.pem.encode(r, {
    maxline: t,
  });
};
o.getPublicKeyFingerprint = function (e, t) {
  var r;
  var s = (t = t || {}).md || n.md.sha1.create();
  switch (t.type || "RSAPublicKey") {
    case "RSAPublicKey":
      r = i.toDer(o.publicKeyToRSAPublicKey(e)).getBytes();
      break;
    case "SubjectPublicKeyInfo":
      r = i.toDer(o.publicKeyToAsn1(e)).getBytes();
      break;
    default:
      throw new Error('Unknown fingerprint type "' + t.type + '".');
  }
  s.start();
  s.update(r);
  var a = s.digest();
  if ("hex" === t.encoding) {
    var c = a.toHex();
    return t.delimiter ? c.match(/.{2}/g).join(t.delimiter) : c;
  }
  if ("binary" === t.encoding) return a.getBytes();
  if (t.encoding) throw new Error('Unknown encoding "' + t.encoding + '".');
  return a;
};
o.certificationRequestFromPem = function (e, t, r) {
  var s = n.pem.decode(e)[0];
  if ("CERTIFICATE REQUEST" !== s.type) {
    var a = new Error(
      'Could not convert certification request from PEM; PEM header type is not "CERTIFICATE REQUEST".'
    );
    throw ((a.headerType = s.type), a);
  }
  if (s.procType && "ENCRYPTED" === s.procType.type)
    throw new Error(
      "Could not convert certification request from PEM; PEM is encrypted."
    );
  var c = i.fromDer(s.body, r);
  return o.certificationRequestFromAsn1(c, t);
};
o.certificationRequestToPem = function (e, t) {
  var r = {
    type: "CERTIFICATE REQUEST",
    body: i.toDer(o.certificationRequestToAsn1(e)).getBytes(),
  };
  return n.pem.encode(r, {
    maxline: t,
  });
};
o.createCertificate = function () {
  var e = {
    version: 2,
    serialNumber: "00",
    signatureOid: null,
    signature: null,
    siginfo: {},
  };
  e.siginfo.algorithmOid = null;
  e.validity = {};
  e.validity.notBefore = new Date();
  e.validity.notAfter = new Date();
  e.issuer = {};
  e.issuer.getField = function (t) {
    return h(e.issuer, t);
  };
  e.issuer.addField = function (t) {
    v([t]);
    e.issuer.attributes.push(t);
  };
  e.issuer.attributes = [];
  e.issuer.hash = null;
  e.subject = {};
  e.subject.getField = function (t) {
    return h(e.subject, t);
  };
  e.subject.addField = function (t) {
    v([t]);
    e.subject.attributes.push(t);
  };
  e.subject.attributes = [];
  e.subject.hash = null;
  e.extensions = [];
  e.publicKey = null;
  e.md = null;
  e.setSubject = function (t, r) {
    v(t);
    e.subject.attributes = t;
    delete e.subject.uniqueId;
    if (r) {
      e.subject.uniqueId = r;
    }
    e.subject.hash = null;
  };
  e.setIssuer = function (t, r) {
    v(t);
    e.issuer.attributes = t;
    delete e.issuer.uniqueId;
    if (r) {
      e.issuer.uniqueId = r;
    }
    e.issuer.hash = null;
  };
  e.setExtensions = function (t) {
    for (var r = 0; r < t.length; ++r)
      _(t[r], {
        cert: e,
      });
    e.extensions = t;
  };
  e.getExtension = function (t) {
    if ("string" == typeof t) {
      t = {
        name: t,
      };
    }
    for (
      n = null, i = 0, undefined;
      null === n && i < e.extensions.length;
      ++i
    ) {
      var r;
      var n;
      var i;
      r = e.extensions[i];
      if ((t.id && r.id === t.id) || (t.name && r.name === t.name)) {
        n = r;
      }
    }
    return n;
  };
  e.sign = function (t, r) {
    e.md = r || n.md.sha1.create();
    var a = s[e.md.algorithm + "WithRSAEncryption"];
    if (!a) {
      var c = new Error(
        "Could not compute certificate digest. Unknown message digest algorithm OID."
      );
      throw ((c.algorithm = e.md.algorithm), c);
    }
    e.signatureOid = e.siginfo.algorithmOid = a;
    e.tbsCertificate = o.getTBSCertificate(e);
    var l = i.toDer(e.tbsCertificate);
    e.md.update(l.getBytes());
    e.signature = t.sign(e.md);
  };
  e.verify = function (t) {
    var r = false;
    if (!e.issued(t)) {
      var n = t.issuer;
      var s = e.subject;
      var a = new Error(
        "The parent certificate did not issue the given child certificate; the child certificate's issuer does not match the parent's subject."
      );
      throw (
        ((a.expectedIssuer = s.attributes), (a.actualIssuer = n.attributes), a)
      );
    }
    var c = t.md;
    if (null === c) {
      c = g({
        signatureOid: t.signatureOid,
        type: "certificate",
      });
      var l = t.tbsCertificate || o.getTBSCertificate(t);
      var u = i.toDer(l);
      c.update(u.getBytes());
    }
    if (null !== c) {
      r = m({
        certificate: e,
        md: c,
        signature: t.signature,
      });
    }
    return r;
  };
  e.isIssuer = function (t) {
    var r = false;
    var n = e.issuer;
    var i = t.subject;
    if (n.hash && i.hash) r = n.hash === i.hash;
    else if (n.attributes.length === i.attributes.length) {
      var o;
      var s;
      r = true;
      for (var a = 0; r && a < n.attributes.length; ++a) {
        o = n.attributes[a];
        s = i.attributes[a];
        if (o.type === s.type && o.value === s.value) {
          r = false;
        }
      }
    }
    return r;
  };
  e.issued = function (t) {
    return t.isIssuer(e);
  };
  e.generateSubjectKeyIdentifier = function () {
    return o.getPublicKeyFingerprint(e.publicKey, {
      type: "RSAPublicKey",
    });
  };
  e.verifySubjectKeyIdentifier = function () {
    for (
      t = s.subjectKeyIdentifier, r = 0, undefined;
      r < e.extensions.length;
      ++r
    ) {
      var t;
      var r;
      var i = e.extensions[r];
      if (i.id === t) {
        var o = e.generateSubjectKeyIdentifier().getBytes();
        return n.util.hexToBytes(i.subjectKeyIdentifier) === o;
      }
    }
    return false;
  };
  return e;
};
o.certificateFromAsn1 = function (e, t) {
  var r = {};
  var s = [];
  if (!i.validate(e, l, r, s)) {
    var a = new Error(
      "Cannot read X.509 certificate. ASN.1 object is not an X509v3 Certificate."
    );
    throw ((a.errors = s), a);
  }
  if (i.derToOid(r.publicKeyOid) !== o.oids.rsaEncryption)
    throw new Error("Cannot read public key. OID is not RSA.");
  var c = o.createCertificate();
  c.version = r.certVersion ? r.certVersion.charCodeAt(0) : 0;
  var u = n.util.createBuffer(r.certSerialNumber);
  c.serialNumber = u.toHex();
  c.signatureOid = n.asn1.derToOid(r.certSignatureOid);
  c.signatureParameters = f(c.signatureOid, r.certSignatureParams, true);
  c.siginfo.algorithmOid = n.asn1.derToOid(r.certinfoSignatureOid);
  c.siginfo.parameters = f(
    c.siginfo.algorithmOid,
    r.certinfoSignatureParams,
    false
  );
  c.signature = r.certSignature;
  var d = [];
  if (undefined !== r.certValidity1UTCTime) {
    d.push(i.utcTimeToDate(r.certValidity1UTCTime));
  }
  if (undefined !== r.certValidity2GeneralizedTime) {
    d.push(i.generalizedTimeToDate(r.certValidity2GeneralizedTime));
  }
  if (undefined !== r.certValidity3UTCTime) {
    d.push(i.utcTimeToDate(r.certValidity3UTCTime));
  }
  if (undefined !== r.certValidity4GeneralizedTime) {
    d.push(i.generalizedTimeToDate(r.certValidity4GeneralizedTime));
  }
  if (d.length > 2)
    throw new Error(
      "Cannot read notBefore/notAfter validity times; more than two times were provided in the certificate."
    );
  if (d.length < 2)
    throw new Error(
      "Cannot read notBefore/notAfter validity times; they were not provided as either UTCTime or GeneralizedTime."
    );
  c.validity.notBefore = d[0];
  c.validity.notAfter = d[1];
  c.tbsCertificate = r.tbsCertificate;
  if (t) {
    c.md = g({
      signatureOid: c.signatureOid,
      type: "certificate",
    });
    var p = i.toDer(c.tbsCertificate);
    c.md.update(p.getBytes());
  }
  var m = n.md.sha1.create();
  var y = i.toDer(r.certIssuer);
  m.update(y.getBytes());
  c.issuer.getField = function (e) {
    return h(c.issuer, e);
  };
  c.issuer.addField = function (e) {
    v([e]);
    c.issuer.attributes.push(e);
  };
  c.issuer.attributes = o.RDNAttributesAsArray(r.certIssuer);
  if (r.certIssuerUniqueId) {
    c.issuer.uniqueId = r.certIssuerUniqueId;
  }
  c.issuer.hash = m.digest().toHex();
  var _ = n.md.sha1.create();
  var b = i.toDer(r.certSubject);
  _.update(b.getBytes());
  c.subject.getField = function (e) {
    return h(c.subject, e);
  };
  c.subject.addField = function (e) {
    v([e]);
    c.subject.attributes.push(e);
  };
  c.subject.attributes = o.RDNAttributesAsArray(r.certSubject);
  if (r.certSubjectUniqueId) {
    c.subject.uniqueId = r.certSubjectUniqueId;
  }
  c.subject.hash = _.digest().toHex();
  if (r.certExtensions) {
    c.extensions = o.certificateExtensionsFromAsn1(r.certExtensions);
  } else {
    c.extensions = [];
  }
  c.publicKey = o.publicKeyFromAsn1(r.subjectPublicKeyInfo);
  return c;
};
o.certificateExtensionsFromAsn1 = function (e) {
  for (t = [], r = 0, undefined; r < e.value.length; ++r) {
    var t;
    var r;
    for (n = e.value[r], i = 0, undefined; i < n.value.length; ++i) {
      var n;
      var i;
      t.push(o.certificateExtensionFromAsn1(n.value[i]));
    }
  }
  return t;
};
o.certificateExtensionFromAsn1 = function (e) {
  var t = {};
  t.id = i.derToOid(e.value[0].value);
  t.critical = false;
  if (e.value[1].type === i.Type.BOOLEAN) {
    t.critical = 0 !== e.value[1].value.charCodeAt(0);
    t.value = e.value[2].value;
  } else {
    t.value = e.value[1].value;
  }
  if (t.id in s)
    if (((t.name = s[t.id]), "keyUsage" === t.name)) {
      var r = 0,
        o = 0;
      (c = i.fromDer(t.value)).value.length > 1 &&
        ((r = c.value.charCodeAt(1)),
        (o = c.value.length > 2 ? c.value.charCodeAt(2) : 0)),
        (t.digitalSignature = 128 == (128 & r)),
        (t.nonRepudiation = 64 == (64 & r)),
        (t.keyEncipherment = 32 == (32 & r)),
        (t.dataEncipherment = 16 == (16 & r)),
        (t.keyAgreement = 8 == (8 & r)),
        (t.keyCertSign = 4 == (4 & r)),
        (t.cRLSign = 2 == (2 & r)),
        (t.encipherOnly = 1 == (1 & r)),
        (t.decipherOnly = 128 == (128 & o));
    } else if ("basicConstraints" === t.name) {
      (c = i.fromDer(t.value)).value.length > 0 &&
      c.value[0].type === i.Type.BOOLEAN
        ? (t.cA = 0 !== c.value[0].value.charCodeAt(0))
        : (t.cA = !1);
      var a = null;
      c.value.length > 0 && c.value[0].type === i.Type.INTEGER
        ? (a = c.value[0].value)
        : c.value.length > 1 && (a = c.value[1].value),
        null !== a && (t.pathLenConstraint = i.derToInteger(a));
    } else if ("extKeyUsage" === t.name)
      for (var c = i.fromDer(t.value), l = 0; l < c.value.length; ++l) {
        var u = i.derToOid(c.value[l].value);
        u in s ? (t[s[u]] = !0) : (t[u] = !0);
      }
    else if ("nsCertType" === t.name)
      (r = 0),
        (c = i.fromDer(t.value)).value.length > 1 &&
          (r = c.value.charCodeAt(1)),
        (t.client = 128 == (128 & r)),
        (t.server = 64 == (64 & r)),
        (t.email = 32 == (32 & r)),
        (t.objsign = 16 == (16 & r)),
        (t.reserved = 8 == (8 & r)),
        (t.sslCA = 4 == (4 & r)),
        (t.emailCA = 2 == (2 & r)),
        (t.objCA = 1 == (1 & r));
    else if ("subjectAltName" === t.name || "issuerAltName" === t.name) {
      var d;
      (t.altNames = []), (c = i.fromDer(t.value));
      for (var p = 0; p < c.value.length; ++p) {
        var h = {
          type: (d = c.value[p]).type,
          value: d.value,
        };
        switch ((t.altNames.push(h), d.type)) {
          case 1:
          case 2:
          case 6:
            break;
          case 7:
            h.ip = n.util.bytesToIP(d.value);
            break;
          case 8:
            h.oid = i.derToOid(d.value);
        }
      }
    } else
      "subjectKeyIdentifier" === t.name &&
        ((c = i.fromDer(t.value)),
        (t.subjectKeyIdentifier = n.util.bytesToHex(c.value)));
  return t;
};
o.certificationRequestFromAsn1 = function (e, t) {
  var r = {};
  var s = [];
  if (!i.validate(e, p, r, s)) {
    var a = new Error(
      "Cannot read PKCS#10 certificate request. ASN.1 object is not a PKCS#10 CertificationRequest."
    );
    throw ((a.errors = s), a);
  }
  if (i.derToOid(r.publicKeyOid) !== o.oids.rsaEncryption)
    throw new Error("Cannot read public key. OID is not RSA.");
  var c = o.createCertificationRequest();
  c.version = r.csrVersion ? r.csrVersion.charCodeAt(0) : 0;
  c.signatureOid = n.asn1.derToOid(r.csrSignatureOid);
  c.signatureParameters = f(c.signatureOid, r.csrSignatureParams, true);
  c.siginfo.algorithmOid = n.asn1.derToOid(r.csrSignatureOid);
  c.siginfo.parameters = f(c.siginfo.algorithmOid, r.csrSignatureParams, false);
  c.signature = r.csrSignature;
  c.certificationRequestInfo = r.certificationRequestInfo;
  if (t) {
    c.md = g({
      signatureOid: c.signatureOid,
      type: "certification request",
    });
    var l = i.toDer(c.certificationRequestInfo);
    c.md.update(l.getBytes());
  }
  var u = n.md.sha1.create();
  c.subject.getField = function (e) {
    return h(c.subject, e);
  };
  c.subject.addField = function (e) {
    v([e]);
    c.subject.attributes.push(e);
  };
  c.subject.attributes = o.RDNAttributesAsArray(
    r.certificationRequestInfoSubject,
    u
  );
  c.subject.hash = u.digest().toHex();
  c.publicKey = o.publicKeyFromAsn1(r.subjectPublicKeyInfo);
  c.getAttribute = function (e) {
    return h(c, e);
  };
  c.addAttribute = function (e) {
    v([e]);
    c.attributes.push(e);
  };
  c.attributes = o.CRIAttributesAsArray(
    r.certificationRequestInfoAttributes || []
  );
  return c;
};
o.createCertificationRequest = function () {
  var e = {
    version: 0,
    signatureOid: null,
    signature: null,
    siginfo: {},
  };
  e.siginfo.algorithmOid = null;
  e.subject = {};
  e.subject.getField = function (t) {
    return h(e.subject, t);
  };
  e.subject.addField = function (t) {
    v([t]);
    e.subject.attributes.push(t);
  };
  e.subject.attributes = [];
  e.subject.hash = null;
  e.publicKey = null;
  e.attributes = [];
  e.getAttribute = function (t) {
    return h(e, t);
  };
  e.addAttribute = function (t) {
    v([t]);
    e.attributes.push(t);
  };
  e.md = null;
  e.setSubject = function (t) {
    v(t);
    e.subject.attributes = t;
    e.subject.hash = null;
  };
  e.setAttributes = function (t) {
    v(t);
    e.attributes = t;
  };
  e.sign = function (t, r) {
    e.md = r || n.md.sha1.create();
    var a = s[e.md.algorithm + "WithRSAEncryption"];
    if (!a) {
      var c = new Error(
        "Could not compute certification request digest. Unknown message digest algorithm OID."
      );
      throw ((c.algorithm = e.md.algorithm), c);
    }
    e.signatureOid = e.siginfo.algorithmOid = a;
    e.certificationRequestInfo = o.getCertificationRequestInfo(e);
    var l = i.toDer(e.certificationRequestInfo);
    e.md.update(l.getBytes());
    e.signature = t.sign(e.md);
  };
  e.verify = function () {
    var t = false;
    var r = e.md;
    if (null === r) {
      r = g({
        signatureOid: e.signatureOid,
        type: "certification request",
      });
      var n = e.certificationRequestInfo || o.getCertificationRequestInfo(e);
      var s = i.toDer(n);
      r.update(s.getBytes());
    }
    if (null !== r) {
      t = m({
        certificate: e,
        md: r,
        signature: e.signature,
      });
    }
    return t;
  };
  return e;
};
var C = new Date("1950-01-01T00:00:00Z");
var E = new Date("2050-01-01T00:00:00Z");
function T(e) {
  return e >= C && e < E
    ? i.create(i.Class.UNIVERSAL, i.Type.UTCTIME, false, i.dateToUtcTime(e))
    : i.create(
        i.Class.UNIVERSAL,
        i.Type.GENERALIZEDTIME,
        false,
        i.dateToGeneralizedTime(e)
      );
}
o.getTBSCertificate = function (e) {
  var t = T(e.validity.notBefore);
  var r = T(e.validity.notAfter);
  var s = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
    i.create(i.Class.CONTEXT_SPECIFIC, 0, true, [
      i.create(
        i.Class.UNIVERSAL,
        i.Type.INTEGER,
        false,
        i.integerToDer(e.version).getBytes()
      ),
    ]),
    i.create(
      i.Class.UNIVERSAL,
      i.Type.INTEGER,
      false,
      n.util.hexToBytes(e.serialNumber)
    ),
    i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
      i.create(
        i.Class.UNIVERSAL,
        i.Type.OID,
        false,
        i.oidToDer(e.siginfo.algorithmOid).getBytes()
      ),
      b(e.siginfo.algorithmOid, e.siginfo.parameters),
    ]),
    y(e.issuer),
    i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [t, r]),
    y(e.subject),
    o.publicKeyToAsn1(e.publicKey),
  ]);
  if (e.issuer.uniqueId) {
    s.value.push(
      i.create(i.Class.CONTEXT_SPECIFIC, 1, true, [
        i.create(
          i.Class.UNIVERSAL,
          i.Type.BITSTRING,
          false,
          String.fromCharCode(0) + e.issuer.uniqueId
        ),
      ])
    );
  }
  if (e.subject.uniqueId) {
    s.value.push(
      i.create(i.Class.CONTEXT_SPECIFIC, 2, true, [
        i.create(
          i.Class.UNIVERSAL,
          i.Type.BITSTRING,
          false,
          String.fromCharCode(0) + e.subject.uniqueId
        ),
      ])
    );
  }
  if (e.extensions.length > 0) {
    s.value.push(o.certificateExtensionsToAsn1(e.extensions));
  }
  return s;
};
o.getCertificationRequestInfo = function (e) {
  return i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
    i.create(
      i.Class.UNIVERSAL,
      i.Type.INTEGER,
      false,
      i.integerToDer(e.version).getBytes()
    ),
    y(e.subject),
    o.publicKeyToAsn1(e.publicKey),
    w(e),
  ]);
};
o.distinguishedNameToAsn1 = function (e) {
  return y(e);
};
o.certificateToAsn1 = function (e) {
  var t = e.tbsCertificate || o.getTBSCertificate(e);
  return i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
    t,
    i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
      i.create(
        i.Class.UNIVERSAL,
        i.Type.OID,
        false,
        i.oidToDer(e.signatureOid).getBytes()
      ),
      b(e.signatureOid, e.signatureParameters),
    ]),
    i.create(
      i.Class.UNIVERSAL,
      i.Type.BITSTRING,
      false,
      String.fromCharCode(0) + e.signature
    ),
  ]);
};
o.certificateExtensionsToAsn1 = function (e) {
  var t = i.create(i.Class.CONTEXT_SPECIFIC, 3, true, []);
  var r = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, []);
  t.value.push(r);
  for (var n = 0; n < e.length; ++n)
    r.value.push(o.certificateExtensionToAsn1(e[n]));
  return t;
};
o.certificateExtensionToAsn1 = function (e) {
  var t = i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, []);
  t.value.push(
    i.create(i.Class.UNIVERSAL, i.Type.OID, false, i.oidToDer(e.id).getBytes())
  );
  if (e.critical) {
    t.value.push(
      i.create(
        i.Class.UNIVERSAL,
        i.Type.BOOLEAN,
        false,
        String.fromCharCode(255)
      )
    );
  }
  var r = e.value;
  if ("string" != typeof e.value) {
    r = i.toDer(r).getBytes();
  }
  t.value.push(i.create(i.Class.UNIVERSAL, i.Type.OCTETSTRING, false, r));
  return t;
};
o.certificationRequestToAsn1 = function (e) {
  var t = e.certificationRequestInfo || o.getCertificationRequestInfo(e);
  return i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
    t,
    i.create(i.Class.UNIVERSAL, i.Type.SEQUENCE, true, [
      i.create(
        i.Class.UNIVERSAL,
        i.Type.OID,
        false,
        i.oidToDer(e.signatureOid).getBytes()
      ),
      b(e.signatureOid, e.signatureParameters),
    ]),
    i.create(
      i.Class.UNIVERSAL,
      i.Type.BITSTRING,
      false,
      String.fromCharCode(0) + e.signature
    ),
  ]);
};
o.createCaStore = function (e) {
  var t = {
    certs: {},
  };
  function r(e) {
    s(e);
    return t.certs[e.hash] || null;
  }
  function s(e) {
    if (!e.hash) {
      var t = n.md.sha1.create();
      e.attributes = o.RDNAttributesAsArray(y(e), t);
      e.hash = t.digest().toHex();
    }
  }
  t.getIssuer = function (e) {
    return r(e.issuer);
  };
  t.addCertificate = function (e) {
    if ("string" == typeof e) {
      e = n.pki.certificateFromPem(e);
    }
    s(e.subject);
    if (!t.hasCertificate(e))
      if (e.subject.hash in t.certs) {
        var r = t.certs[e.subject.hash];
        n.util.isArray(r) || (r = [r]),
          r.push(e),
          (t.certs[e.subject.hash] = r);
      } else t.certs[e.subject.hash] = e;
  };
  t.hasCertificate = function (e) {
    if ("string" == typeof e) {
      e = n.pki.certificateFromPem(e);
    }
    var t = r(e.subject);
    if (!t) return false;
    if (n.util.isArray(t)) {
      t = [t];
    }
    for (
      s = i.toDer(o.certificateToAsn1(e)).getBytes(), a = 0, undefined;
      a < t.length;
      ++a
    ) {
      var s;
      var a;
      if (s === i.toDer(o.certificateToAsn1(t[a])).getBytes()) return true;
    }
    return false;
  };
  t.listAllCertificates = function () {
    var e = [];
    for (var r in t.certs)
      if (t.certs.hasOwnProperty(r)) {
        var i = t.certs[r];
        if (n.util.isArray(i)) for (var o = 0; o < i.length; ++o) e.push(i[o]);
        else e.push(i);
      }
    return e;
  };
  t.removeCertificate = function (e) {
    var a;
    if ("string" == typeof e) {
      e = n.pki.certificateFromPem(e);
    }
    s(e.subject);
    if (!t.hasCertificate(e)) return null;
    var c = r(e.subject);
    if (!n.util.isArray(c)) {
      a = t.certs[e.subject.hash];
      delete t.certs[e.subject.hash];
      return a;
    }
    for (
      l = i.toDer(o.certificateToAsn1(e)).getBytes(), u = 0, undefined;
      u < c.length;
      ++u
    ) {
      var l;
      var u;
      if (l === i.toDer(o.certificateToAsn1(c[u])).getBytes()) {
        a = c[u];
        c.splice(u, 1);
      }
    }
    if (0 === c.length) {
      delete t.certs[e.subject.hash];
    }
    return a;
  };
  if (e)
    for (var a = 0; a < e.length; ++a) {
      var c = e[a];
      t.addCertificate(c);
    }
  return t;
};
o.certificateError = {
  bad_certificate: "forge.pki.BadCertificate",
  unsupported_certificate: "forge.pki.UnsupportedCertificate",
  certificate_revoked: "forge.pki.CertificateRevoked",
  certificate_expired: "forge.pki.CertificateExpired",
  certificate_unknown: "forge.pki.CertificateUnknown",
  unknown_ca: "forge.pki.UnknownCertificateAuthority",
};
o.verifyCertificateChain = function (e, t, r) {
  if ("function" == typeof r) {
    r = {
      verify: r,
    };
  }
  r = r || {};
  var i = (t = t.slice(0)).slice(0);
  var s = r.validityCheckDate;
  if (undefined === s) {
    s = new Date();
  }
  var a = true;
  var c = null;
  var l = 0;
  do {
    var u = t.shift();
    var d = null;
    var p = false;
    if (s && (s < u.validity.notBefore || s > u.validity.notAfter)) {
      c = {
        message: "Certificate is not valid yet or has expired.",
        error: o.certificateError.certificate_expired,
        notBefore: u.validity.notBefore,
        notAfter: u.validity.notAfter,
        now: s,
      };
    }
    if (null === c) {
      if (
        (null === (d = t[0] || e.getIssuer(u)) &&
          u.isIssuer(u) &&
          ((p = !0), (d = u)),
        d)
      ) {
        var h = d;
        n.util.isArray(h) || (h = [h]);
        for (var f = !1; !f && h.length > 0; ) {
          d = h.shift();
          try {
            f = d.verify(u);
          } catch (e) {}
        }
        f ||
          (c = {
            message: "Certificate signature is invalid.",
            error: o.certificateError.bad_certificate,
          });
      }
      null !== c ||
        (d && !p) ||
        e.hasCertificate(u) ||
        (c = {
          message: "Certificate is not trusted.",
          error: o.certificateError.unknown_ca,
        });
    }
    if (null === c && d && !u.isIssuer(d)) {
      c = {
        message: "Certificate issuer is invalid.",
        error: o.certificateError.bad_certificate,
      };
    }
    if (null === c)
      for (
        var g = {
            keyUsage: !0,
            basicConstraints: !0,
          },
          m = 0;
        null === c && m < u.extensions.length;
        ++m
      ) {
        var y = u.extensions[m];
        y.critical &&
          !(y.name in g) &&
          (c = {
            message: "Certificate has an unsupported critical extension.",
            error: o.certificateError.unsupported_certificate,
          });
      }
    if (null === c && (!a || (0 === t.length && (!d || p)))) {
      var v = u.getExtension("basicConstraints");
      var _ = u.getExtension("keyUsage");
      if (null !== _) {
        if (_.keyCertSign && null !== v) {
          c = {
            message:
              "Certificate keyUsage or basicConstraints conflict or indicate that the certificate is not a CA. If the certificate is the only one in the chain or isn't the first then the certificate must be a valid CA.",
            error: o.certificateError.bad_certificate,
          };
        }
      }
      if (null !== c || null === v || v.cA) {
        c = {
          message:
            "Certificate basicConstraints indicates the certificate is not a CA.",
          error: o.certificateError.bad_certificate,
        };
      }
      if (
        null === c &&
        null !== _ &&
        "pathLenConstraint" in v &&
        l - 1 > v.pathLenConstraint
      ) {
        c = {
          message: "Certificate basicConstraints pathLenConstraint violated.",
          error: o.certificateError.bad_certificate,
        };
      }
    }
    var b = null === c || c.error;
    var w = r.verify ? r.verify(b, l, i) : b;
    if (true !== w)
      throw (
        (true === b &&
          (c = {
            message: "The application rejected the certificate.",
            error: o.certificateError.bad_certificate,
          }),
        (w || 0 === w) &&
          ("object" != typeof w || n.util.isArray(w)
            ? "string" == typeof w && (c.error = w)
            : (w.message && (c.message = w.message),
              w.error && (c.error = w.error))),
        c)
      );
    c = null;
    a = false;
    ++l;
  } while (t.length > 0);
  return true;
};