Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.MonikerRequest =
  exports.MonikerKind =
  exports.UniquenessLevel =
    undefined;
const M_ProtocolTypeConstants_maybe = require("ProtocolTypeConstants");
var i;
var o;
var s;
(s = exports.UniquenessLevel || (exports.UniquenessLevel = {})).document =
  "document";
s.project = "project";
s.group = "group";
s.scheme = "scheme";
s.global = "global";
(o = exports.MonikerKind || (exports.MonikerKind = {})).import = "import";
o.export = "export";
o.local = "local";
(i = exports.MonikerRequest || (exports.MonikerRequest = {})).method =
  "textDocument/moniker";
i.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(i.method);
