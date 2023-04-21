var n;
n = require("crypto");
module.exports = function () {
  var e;
  e = new Set();
  return function (t) {
    var r;
    r = n.createHash("sha256").update(t).digest("base64");
    if (!e.has(r)) return e.add(r), !0;
  };
};