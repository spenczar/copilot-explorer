var r;
var n;
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.extensions =
  exports.workspace =
  exports.env =
  exports.UIKind =
  exports.EndOfLine =
    undefined;
(n = exports.EndOfLine || (exports.EndOfLine = {}))[(n.LF = 1)] = "LF";
n[(n.CRLF = 2)] = "CRLF";
(function (e) {
  e[(e.Web = 0)] = "Web";
  e[(e.Desktop = 1)] = "Desktop";
})((r = exports.UIKind || (exports.UIKind = {})));
exports.env = {
  isTelemetryEnabled: true,
  uiKind: r.Desktop,
  appRoot: "/non-existent-path",
};
exports.workspace = {
  onDidChangeConfiguration: () => {},
  getConfiguration: () => ({}),
};
exports.extensions = {
  getExtension: (e) => {},
};