const M_SemVer_Parser_maybe = require("SemVer-Parser");
if (process && M_SemVer_Parser_maybe.gte(process.versions.node, "8.0.0")) {
  module.exports = require("NamespaceManager");
} else {
  module.exports = require("NamespaceManager");
}
