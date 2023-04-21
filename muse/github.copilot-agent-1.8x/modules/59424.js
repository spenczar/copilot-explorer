var n;
var i;
var o;
var s;
var a;
var c;
var l;
for (s in ((module.exports = u),
(n = require(98094)),
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
    return n().pki.certificateFromAsn1(n().asn1.fromDer(e.toString("binary")));
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
  t = n().asn1;
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