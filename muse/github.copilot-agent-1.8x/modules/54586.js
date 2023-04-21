var n;
var i;
var o;
var s;
var a;
var c;
function l(e) {
  var t;
  t = n.createHash("sha1");
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
  t = n.createHash("md5");
  r = a(e).subject;
  t.update(s.toDer(r).getBytes(), "binary");
  return d(t);
}
function d(e) {
  (e = e.digest().slice(0, 4)).writeUInt32LE(e.readUInt32BE(0), 0);
  return e.toString("hex");
}
n = require("crypto");
i = require(98094);
o = require(59424);
s = i().asn1;
a = o(o.asn1);
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