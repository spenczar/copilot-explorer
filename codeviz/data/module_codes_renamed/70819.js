Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.TextDocumentManager = exports.getRelativePath = undefined;
const M_path = require("path");
exports.getRelativePath = function (e, t) {
  for (const r of e) {
    const e = r.fsPath;
    if (t.startsWith(e + M_path.sep)) return M_path.relative(e, t);
  }
};
exports.TextDocumentManager = class {};
