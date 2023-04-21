var M_url_parser_utils_maybe = require("url-parser-utils");
var M_protocol_validator_maybe = require("protocol-validator");
module.exports = function (e) {
  var t = M_url_parser_utils_maybe(e);
  t.token = "";
  if ("x-oauth-basic" === t.password) {
    t.token = t.user;
  } else {
    if ("x-token-auth" === t.user) {
      t.token = t.password;
    }
  }
  if (
    M_protocol_validator_maybe(t.protocols) ||
    (0 === t.protocols.length && M_protocol_validator_maybe(e))
  ) {
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
