var n = require(56105);
require(61057);
require(81877);
require(4173);
require(25661);
require(72299);
require(88577);
require(51242);
require(69597);
require(56827);
require(46461);
var i = n.asn1;
var o = (module.exports = n.pki = n.pki || {});
o.pemToDer = function (e) {
  var t = n.pem.decode(e)[0];
  if (t.procType && "ENCRYPTED" === t.procType.type)
    throw new Error("Could not convert PEM to DER; PEM is encrypted.");
  return n.util.createBuffer(t.body);
};
o.privateKeyFromPem = function (e) {
  var t = n.pem.decode(e)[0];
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
  return n.pem.encode(r, {
    maxline: t,
  });
};
o.privateKeyInfoToPem = function (e, t) {
  var r = {
    type: "PRIVATE KEY",
    body: i.toDer(e).getBytes(),
  };
  return n.pem.encode(r, {
    maxline: t,
  });
};