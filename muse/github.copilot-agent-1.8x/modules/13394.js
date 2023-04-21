Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.FoldingRangeRequest = exports.FoldingRangeKind = undefined;
const n = require(66140);
var i;
var o;
(o = exports.FoldingRangeKind || (exports.FoldingRangeKind = {})).Comment =
  "comment";
o.Imports = "imports";
o.Region = "region";
(i = exports.FoldingRangeRequest || (exports.FoldingRangeRequest = {})).method =
  "textDocument/foldingRange";
i.type = new n.ProtocolRequestType(i.method);