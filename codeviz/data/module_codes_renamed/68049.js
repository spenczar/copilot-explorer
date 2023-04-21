var M_get_url_protocol_parts_maybe = require("get-url-protocol-parts");
module.exports = function e(t) {
  if (Array.isArray(t))
    return -1 !== t.indexOf("ssh") || -1 !== t.indexOf("rsync");
  if ("string" != typeof t) return false;
  var r = M_get_url_protocol_parts_maybe(t);
  t = t.substring(t.indexOf("://") + 3);
  if (e(r)) return !0;
  var i = new RegExp(".([a-zA-Z\\d]+):(\\d+)/");
  return !t.match(i) && t.indexOf("@") < t.indexOf(":");
};
