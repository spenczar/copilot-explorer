var r;
var n;
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.normalizeSnippetScore =
  exports.announceSnippet =
  exports.SnippetSemantics =
  exports.SnippetProvider =
    undefined;
(function (e) {
  e.NeighboringTabs = "neighboring-tabs";
  e.Retrieval = "retrieval";
})((r = exports.SnippetProvider || (exports.SnippetProvider = {})));
(function (e) {
  e.Function = "function";
  e.Snippet = "snippet";
})((n = exports.SnippetSemantics || (exports.SnippetSemantics = {})));
const i = {
  [n.Function]: "function",
  [n.Snippet]: "snippet",
};
exports.announceSnippet = function (e) {
  const t = i[e.semantics];
  return [
    e.relativePath
      ? `Compare this ${t} from ${e.relativePath}:`
      : `Compare this ${t}:`,
  ].concat(e.snippet.split("\n"));
};
exports.normalizeSnippetScore = function (e) {
  var t;
  if (e.provider === r.Retrieval) t = -e.score;
  else {
    if (e.provider !== r.NeighboringTabs)
      throw new Error("Unknown snippet source");
    t = e.score;
  }
  return {
    ...e,
    score: t,
  };
};
