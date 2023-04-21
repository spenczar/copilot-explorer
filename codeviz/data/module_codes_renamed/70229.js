var M_https;
var M_tls;
var M_X509CertificateUtils_maybe;
var s;
var a;
var c;
var l;
var u;
function d(e) {
  h(e, []);
  return p;
}
function p(e) {
  c.push(s(e));
}
function h(e, t) {
  if (t) {
    c.length = 0;
    c.push.apply(c, t);
  }
  if ((e = "+" === e ? 2 : e ? 1 : 0) !== l) {
    switch (l) {
      case 1:
        a.ca === c && delete a.ca;
        break;
      case 2:
        M_tls.createSecureContext === f &&
          ((M_tls.createSecureContext = u), (u = void 0));
    }
    switch ((l = e)) {
      case 1:
        a.ca = c;
        break;
      case 2:
        u || ((u = M_tls.createSecureContext), (M_tls.createSecureContext = f));
    }
  }
}
function f(e) {
  var t;
  var r;
  var n;
  var i;
  var o;
  t = u.apply(this, arguments);
  if (2 === l && (null == e || !e.ca))
    for (r = 0, i = (n = c).length; r < i; ++r)
      (o = n[r]), t.context.addCACert(o);
  return t;
}
M_https = require("https");
M_tls = require("tls");
M_X509CertificateUtils_maybe = require("X509CertificateUtils");
module.exports = d;
d.inject = h;
s = M_X509CertificateUtils_maybe(M_X509CertificateUtils_maybe.pem);
a = M_https.globalAgent.options;
c = [];
l = 0;
