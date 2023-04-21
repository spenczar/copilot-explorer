var n = require(56105);
require(61057);
var i = n.asn1;
exports.privateKeyValidator = {
  name: "PrivateKeyInfo",
  tagClass: i.Class.UNIVERSAL,
  type: i.Type.SEQUENCE,
  constructed: true,
  value: [
    {
      name: "PrivateKeyInfo.version",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.INTEGER,
      constructed: false,
      capture: "privateKeyVersion",
    },
    {
      name: "PrivateKeyInfo.privateKeyAlgorithm",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.SEQUENCE,
      constructed: true,
      value: [
        {
          name: "AlgorithmIdentifier.algorithm",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.OID,
          constructed: false,
          capture: "privateKeyOid",
        },
      ],
    },
    {
      name: "PrivateKeyInfo",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.OCTETSTRING,
      constructed: false,
      capture: "privateKey",
    },
  ],
};
exports.publicKeyValidator = {
  name: "SubjectPublicKeyInfo",
  tagClass: i.Class.UNIVERSAL,
  type: i.Type.SEQUENCE,
  constructed: true,
  captureAsn1: "subjectPublicKeyInfo",
  value: [
    {
      name: "SubjectPublicKeyInfo.AlgorithmIdentifier",
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.SEQUENCE,
      constructed: true,
      value: [
        {
          name: "AlgorithmIdentifier.algorithm",
          tagClass: i.Class.UNIVERSAL,
          type: i.Type.OID,
          constructed: false,
          capture: "publicKeyOid",
        },
      ],
    },
    {
      tagClass: i.Class.UNIVERSAL,
      type: i.Type.BITSTRING,
      constructed: false,
      composed: true,
      captureBitStringValue: "ed25519PublicKey",
    },
  ],
};