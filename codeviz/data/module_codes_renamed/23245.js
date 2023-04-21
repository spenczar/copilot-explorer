var M_OptionsManager_maybe = require("OptionsManager");
require("ASN1-Parser-Utils");
require("Crypto_OID_Mapping");
require("EncryptedPrivateKeyInfoManager");
require("pem-encoding-utils");
require("PBKDF2-Crypto-Module");
require("PKCS12-Parser");
require("pss-encryption-manager");
require("RSA-Encryption-Utils");
require("binary-data-reader");
require("Certificate-Validator");
var i = M_OptionsManager_maybe.asn1;
var o =
  (module.exports =
  M_OptionsManager_maybe.pki =
    M_OptionsManager_maybe.pki || {});
o.pemToDer = function (e) {
  var t = M_OptionsManager_maybe.pem.decode(e)[0];
  if (t.procType && "ENCRYPTED" === t.procType.type)
    throw new Error("Could not convert PEM to DER; PEM is encrypted.");
  return M_OptionsManager_maybe.util.createBuffer(t.body);
};
o.privateKeyFromPem = function (e) {
  var t = M_OptionsManager_maybe.pem.decode(e)[0];
  if ("PRIVATE KEY" !== t.type && "RSA PRIVATE KEY" !== t.type) {
    var r = new Error(
      'Could not convert private key from PEM; PEM header type is not "PRIVATE KEY" or "RSA PRIVATE KEY".'
    );
    throw ((r.headerType = t.type), r);
  }
  if (t.procType && "ENCRYPTED" === t.procType.type)
    throw new Error(
      "Could not convert private key from PEM; PEM is encrypted."
    );
  var s = i.fromDer(t.body);
  return o.privateKeyFromAsn1(s);
};
o.privateKeyToPem = function (e, t) {
  var r = {
    type: "RSA PRIVATE KEY",
    body: i.toDer(o.privateKeyToAsn1(e)).getBytes(),
  };
  return M_OptionsManager_maybe.pem.encode(r, {
    maxline: t,
  });
};
o.privateKeyInfoToPem = function (e, t) {
  var r = {
    type: "PRIVATE KEY",
    body: i.toDer(e).getBytes(),
  };
  return M_OptionsManager_maybe.pem.encode(r, {
    maxline: t,
  });
};
