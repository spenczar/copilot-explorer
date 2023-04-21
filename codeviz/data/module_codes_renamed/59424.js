var M_OIDMapper_maybe;
var i;
var o;
var s;
var a;
var c;
var l;
for (s in ((module.exports = u),
(M_OIDMapper_maybe = require("OIDMapper")),
(o = []),
(i = {
  der: d,
  pem: p,
  txt: function (e) {
    var t;
    return (
      "Subject\t" +
      (t = h(e)).subject.value
        .map(function (e) {
          return l(e.value[0].value[1].value, "binary").toString("utf8");
        })
        .join("/") +
      "\nValid\t" +
      t.valid.value
        .map(function (e) {
          return e.value;
        })
        .join(" - ") +
      "\n" +
      p(e)
    );
  },
  asn1: h,
  x509: function (e) {
    return M_OIDMapper_maybe().pki.certificateFromAsn1(
      M_OIDMapper_maybe().asn1.fromDer(e.toString("binary"))
    );
  },
}))) {
  a = i[s];
  u[s] = o.length;
  o.push(a);
}
function u(e, t) {
  var r;
  r = o[e] || o[0];
  return null != t ? r(t) : r;
}
function d(e) {
  return c(e) ? e : l(e, "binary");
}
function p(e) {
  var t;
  var r;
  var n;
  var i;
  for (
    t = ["-----BEGIN CERTIFICATE-----"],
      r = 0,
      n = (e = d(e).toString("base64")).length;
    r < n;
    r += 64
  ) {
    i = r;
    t.push(e.substr(i, 64));
  }
  t.push("-----END CERTIFICATE-----", "");
  return t.join("\r\n");
}
function h(e) {
  var t;
  var r;
  var i;
  var o;
  t = M_OIDMapper_maybe().asn1;
  e = e.toString("binary");
  o =
    (i = (r = t.fromDer(e).value[0].value)[0]).tagClass ===
      t.Class.CONTEXT_SPECIFIC &&
    0 === i.type &&
    i.constructed;
  return {
    serial: (r = r.slice(o))[0],
    valid: r[3],
    issuer: r[2],
    subject: r[4],
  };
}
u.forge = u.x509;
c = Buffer.isBuffer;
l =
  Buffer.from ||
  function (e, t) {
    return new Buffer(e, t);
  };
