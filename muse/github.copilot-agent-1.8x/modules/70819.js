Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.TextDocumentManager = exports.getRelativePath = undefined;
const n = require("path");
exports.getRelativePath = function (e, t) {
  for (const r of e) {
    const e = r.fsPath;
    if (t.startsWith(e + n.sep)) return n.relative(e, t);
  }
};
exports.TextDocumentManager = class {};