var M_OptionsManager_maybe = require("OptionsManager");
require("ASN1-Parser-Utils");
require("binary-data-reader");
var i = M_OptionsManager_maybe.asn1;
var o =
  (module.exports =
  M_OptionsManager_maybe.pkcs7asn1 =
    M_OptionsManager_maybe.pkcs7asn1 || {});
M_OptionsManager_maybe.pkcs7 = M_OptionsManager_maybe.pkcs7 || {};
M_OptionsManager_maybe.pkcs7.asn1 = o;
var s = {
  name: "ContentInfo",
  tagClass: i.Class.UNIVERSAL,
  type: i.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "ContentInfo.ContentType",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.OID,
      constructed: false,
      capture: "contentType",
    },
    {
      name: "ContentInfo.content",
      tagClass: i.Class.CONTEXT_SPECIFIC,
      type: 0,
      constructed: true,
      optional: true,
      captureAsn1: "content",
    },
  ],
};
o.contentInfoValidator = s;
var a = {
  name: "EncryptedContentInfo",
  tagClass: i.Class.UNIVERSAL,
  type: i.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "EncryptedContentInfo.contentType",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.OID,
      constructed: false,
      capture: "contentType",
    },
    {
      name: "EncryptedContentInfo.contentEncryptionAlgorithm",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.SEQUENCE,
      constructed: true,
      value: [
        {
          name: "EncryptedContentInfo.contentEncryptionAlgorithm.algorithm",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.OID,
          constructed: false,
          capture: "encAlgorithm",
        },
        {
          name: "EncryptedContentInfo.contentEncryptionAlgorithm.parameter",
          tagClass: i.Class.UNIVERSAL,
          captureAsn1: "encParameter",
        },
      ],
    },
    {
      name: "EncryptedContentInfo.encryptedContent",
      tagClass: i.Class.CONTEXT_SPECIFIC,
      type: 0,
      capture: "encryptedContent",
      captureAsn1: "encryptedContentAsn1",
    },
  ],
};
o.envelopedDataValidator = {
  name: "EnvelopedData",
  tagClass: i.Class.UNIVERSAL,
  type: i.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "EnvelopedData.Version",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.INTEGER,
      constructed: false,
      capture: "version",
    },
    {
      name: "EnvelopedData.RecipientInfos",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.SET,
      constructed: true,
      captureAsn1: "recipientInfos",
    },
  ].concat(a),
};
o.encryptedDataValidator = {
  name: "EncryptedData",
  tagClass: i.Class.UNIVERSAL,
  type: i.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "EncryptedData.Version",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.INTEGER,
      constructed: false,
      capture: "version",
    },
  ].concat(a),
};
var c = {
  name: "SignerInfo",
  tagClass: i.Class.UNIVERSAL,
  type: i.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "SignerInfo.version",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.INTEGER,
      constructed: false,
    },
    {
      name: "SignerInfo.issuerAndSerialNumber",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.SEQUENCE,
      constructed: true,
      value: [
        {
          name: "SignerInfo.issuerAndSerialNumber.issuer",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.SEQUENCE,
          constructed: true,
          captureAsn1: "issuer",
        },
        {
          name: "SignerInfo.issuerAndSerialNumber.serialNumber",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.INTEGER,
          constructed: false,
          capture: "serial",
        },
      ],
    },
    {
      name: "SignerInfo.digestAlgorithm",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.SEQUENCE,
      constructed: true,
      value: [
        {
          name: "SignerInfo.digestAlgorithm.algorithm",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.OID,
          constructed: false,
          capture: "digestAlgorithm",
        },
        {
          name: "SignerInfo.digestAlgorithm.parameter",
          tagClass: i.Class.UNIVERSAL,
          constructed: false,
          captureAsn1: "digestParameter",
          optional: true,
        },
      ],
    },
    {
      name: "SignerInfo.authenticatedAttributes",
      tagClass: i.Class.CONTEXT_SPECIFIC,
      type: 0,
      constructed: true,
      optional: true,
      capture: "authenticatedAttributes",
    },
    {
      name: "SignerInfo.digestEncryptionAlgorithm",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.SEQUENCE,
      constructed: true,
      capture: "signatureAlgorithm",
    },
    {
      name: "SignerInfo.encryptedDigest",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.OCTETSTRING,
      constructed: false,
      capture: "signature",
    },
    {
      name: "SignerInfo.unauthenticatedAttributes",
      tagClass: i.Class.CONTEXT_SPECIFIC,
      type: 1,
      constructed: true,
      optional: true,
      capture: "unauthenticatedAttributes",
    },
  ],
};
o.signedDataValidator = {
  name: "SignedData",
  tagClass: i.Class.UNIVERSAL,
  type: i.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "SignedData.Version",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.INTEGER,
      constructed: false,
      capture: "version",
    },
    {
      name: "SignedData.DigestAlgorithms",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.SET,
      constructed: true,
      captureAsn1: "digestAlgorithms",
    },
    s,
    {
      name: "SignedData.Certificates",
      tagClass: i.Class.CONTEXT_SPECIFIC,
      type: 0,
      optional: true,
      captureAsn1: "certificates",
    },
    {
      name: "SignedData.CertificateRevocationLists",
      tagClass: i.Class.CONTEXT_SPECIFIC,
      type: 1,
      optional: true,
      captureAsn1: "crls",
    },
    {
      name: "SignedData.SignerInfos",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.SET,
      capture: "signerInfos",
      optional: true,
      value: [c],
    },
  ],
};
o.recipientInfoValidator = {
  name: "RecipientInfo",
  tagClass: i.Class.UNIVERSAL,
  type: i.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "RecipientInfo.version",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.INTEGER,
      constructed: false,
      capture: "version",
    },
    {
      name: "RecipientInfo.issuerAndSerial",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.SEQUENCE,
      constructed: true,
      value: [
        {
          name: "RecipientInfo.issuerAndSerial.issuer",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.SEQUENCE,
          constructed: true,
          captureAsn1: "issuer",
        },
        {
          name: "RecipientInfo.issuerAndSerial.serialNumber",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.INTEGER,
          constructed: false,
          capture: "serial",
        },
      ],
    },
    {
      name: "RecipientInfo.keyEncryptionAlgorithm",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.SEQUENCE,
      constructed: true,
      value: [
        {
          name: "RecipientInfo.keyEncryptionAlgorithm.algorithm",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.OID,
          constructed: false,
          capture: "encAlgorithm",
        },
        {
          name: "RecipientInfo.keyEncryptionAlgorithm.parameter",
          tagClass: i.Class.UNIVERSAL,
          constructed: false,
          captureAsn1: "encParameter",
          optional: true,
        },
      ],
    },
    {
      name: "RecipientInfo.encryptedKey",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.OCTETSTRING,
      constructed: false,
      capture: "encKey",
    },
  ],
};
