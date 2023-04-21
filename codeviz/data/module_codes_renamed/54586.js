var M_crypto;
var M_OIDMapper_maybe;
var M_X509CertificateUtils_maybe;
var s;
var a;
var c;
function l(e) {
  var t;
  t = M_crypto.createHash("sha1");
  a(e).subject.value.forEach(function (e) {
    var r;
    var n;
    if ((r = (e = s.copy(e)).value[0].value[1]).value) {
      r.type = s.Type.UTF8;
      n = (n = c(r.value, "binary").toString("utf8"))
        .trim()
        .replace(/[A-Z]+/g, function (e) {
          return e.toLowerCase();
        })
        .replace(/\s+/g, " ");
      r.value = c(n, "utf8").toString("binary");
      t.update(s.toDer(e).getBytes(), "binary");
    }
  });
  return d(t);
}
function u(e) {
  var t;
  var r;
  t = M_crypto.createHash("md5");
  r = a(e).subject;
  t.update(s.toDer(r).getBytes(), "binary");
  return d(t);
}
function d(e) {
  (e = e.digest().slice(0, 4)).writeUInt32LE(e.readUInt32BE(0), 0);
  return e.toString("hex");
}
M_crypto = require("crypto");
M_OIDMapper_maybe = require("OIDMapper");
M_X509CertificateUtils_maybe = require("X509CertificateUtils");
s = M_OIDMapper_maybe().asn1;
a = M_X509CertificateUtils_maybe(M_X509CertificateUtils_maybe.asn1);
module.exports = function (e, t) {
  var r;
  r = 0 === e ? u : l;
  return null != t ? r(t) : r;
};
c =
  Buffer.from ||
  function (e, t) {
    return new Buffer(e, t);
  };
