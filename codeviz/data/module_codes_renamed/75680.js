Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.decodeLocation =
  exports.encodeLocation =
  exports.completionContextForDocument =
  exports.CompletionContext =
  exports.completionTypeToString =
  exports.CompletionType =
    undefined;
const M_Path_Parsing_Utils_maybe = require("Path-Parsing-Utils");
const M_LocationFactoryModule_maybe = require("LocationFactoryModule");
const M_CopilotConstants_maybe = require("CopilotConstants");
var s;
!(function (e) {
  e[(e.OPEN_COPILOT = 2)] = "OPEN_COPILOT";
})((s = exports.CompletionType || (exports.CompletionType = {})));
exports.completionTypeToString = function (e) {
  return e === s.OPEN_COPILOT ? "open copilot" : "unknown";
};
class CompletionContext {
  constructor(e, t, r) {
    this.prependToCompletion = "";
    this.appendToCompletion = "";
    this.indentation = null;
    this.completionType = s.OPEN_COPILOT;
    this.insertPosition = e
      .get(M_LocationFactoryModule_maybe.LocationFactory)
      .position(t.line, t.character);
    this.completionType = r;
  }
  static fromJSONParse(e, t) {
    const r = e
      .get(M_LocationFactoryModule_maybe.LocationFactory)
      .position(t.insertPosition.line, t.insertPosition.character);
    const n = new CompletionContext(e, r, t.completionType);
    n.prependToCompletion = t.prependToCompletion;
    n.appendToCompletion = t.appendToCompletion;
    n.indentation = t.indentation;
    return n;
  }
}
exports.CompletionContext = CompletionContext;
exports.completionContextForDocument = function (e, t, r) {
  let n = r;
  const i = t.lineAt(r.line);
  if (i.isEmptyOrWhitespace) {
    n = i.range.end;
  }
  return new CompletionContext(e, n, s.OPEN_COPILOT);
};
let c = 0;
exports.encodeLocation = function (e, t) {
  const r = e.toString().split("#");
  const i = r.length > 1 ? r[1] : "";
  const s = JSON.stringify([r[0], t, i]);
  return M_Path_Parsing_Utils_maybe.URI.parse(
    `${M_CopilotConstants_maybe.CopilotScheme}:GitHub%20Copilot?${s}#${c++}`
  );
};
exports.decodeLocation = function (e, t) {
  const [r, i, o] = JSON.parse(t.query);
  return [
    M_Path_Parsing_Utils_maybe.URI.parse(o.length > 0 ? r + "#" + o : r),
    CompletionContext.fromJSONParse(e, i),
  ];
};
