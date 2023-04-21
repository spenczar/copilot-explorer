var n = require(38173);
module.exports = function (e) {
  var t = {
    protocols: [],
    protocol: null,
    port: null,
    resource: "",
    host: "",
    user: "",
    password: "",
    pathname: "",
    hash: "",
    search: "",
    href: e,
    query: {},
    parse_failed: false,
  };
  try {
    var r = new URL(e);
    t.protocols = n(r);
    t.protocol = t.protocols[0];
    t.port = r.port;
    t.resource = r.hostname;
    t.host = r.host;
    t.user = r.username || "";
    t.password = r.password || "";
    t.pathname = r.pathname;
    t.hash = r.hash.slice(1);
    t.search = r.search.slice(1);
    t.href = r.href;
    t.query = Object.fromEntries(r.searchParams);
  } catch (r) {
    t.protocols = ["file"];
    t.protocol = t.protocols[0];
    t.port = "";
    t.resource = "";
    t.user = "";
    t.pathname = "";
    t.hash = "";
    t.search = "";
    t.href = e;
    t.query = {};
    t.parse_failed = true;
  }
  return t;
};