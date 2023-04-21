Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.FoldingRangeRequest = exports.FoldingRangeKind = undefined;
const M_ProtocolTypeConstants_maybe = require("ProtocolTypeConstants");
var i;
var o;
(o = exports.FoldingRangeKind || (exports.FoldingRangeKind = {})).Comment =
  "comment";
o.Imports = "imports";
o.Region = "region";
(i = exports.FoldingRangeRequest || (exports.FoldingRangeRequest = {})).method =
  "textDocument/foldingRange";
i.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(i.method);
