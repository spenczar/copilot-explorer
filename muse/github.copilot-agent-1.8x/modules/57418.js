var n = require(91320);
var i = require(68049);
module.exports = function (e) {
  var t = n(e);
  t.token = "";
  if ("x-oauth-basic" === t.password) {
    t.token = t.user;
  } else {
    if ("x-token-auth" === t.user) {
      t.token = t.password;
    }
  }
  if (i(t.protocols) || (0 === t.protocols.length && i(e))) {
    t.protocol = "ssh";
  } else {
    if (t.protocols.length) {
      t.protocol = t.protocols[0];
    } else {
      t.protocol = "file";
      t.protocols = ["file"];
    }
  }
  t.href = t.href.replace(/\/$/, "");
  return t;
};