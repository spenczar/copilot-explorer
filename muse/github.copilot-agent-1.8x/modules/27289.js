Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getNeighborSnippets =
  exports.neighborOptionToSelection =
  exports.NeighboringSnippetType =
  exports.NeighboringTabsOption =
    undefined;
const n = require(91186);
const i = require(8748);
var o;
var s;
(s =
  exports.NeighboringTabsOption || (exports.NeighboringTabsOption = {})).None =
  "none";
s.Conservative = "conservative";
s.Medium = "medium";
s.Eager = "eager";
s.EagerButLittle = "eagerButLittle";
s.EagerButMedium = "eagerButMedium";
(function (e) {
  e.NeighboringFunctions = "neighboringFunction";
  e.NeighboringSnippets = "neighboringSnippet";
})(
  (o = exports.NeighboringSnippetType || (exports.NeighboringSnippetType = {}))
);
exports.neighborOptionToSelection = {
  none: {
    snippetLength: 1,
    threshold: -1,
    numberOfSnippets: 0,
  },
  conservative: {
    snippetLength: 10,
    threshold: 0.3,
    numberOfSnippets: 1,
  },
  medium: {
    snippetLength: 20,
    threshold: 0.1,
    numberOfSnippets: 2,
  },
  eager: {
    snippetLength: 60,
    threshold: 0,
    numberOfSnippets: 4,
  },
  eagerButLittle: {
    snippetLength: 10,
    threshold: 0,
    numberOfSnippets: 1,
  },
  eagerButMedium: {
    snippetLength: 20,
    threshold: 0,
    numberOfSnippets: 4,
  },
};
exports.getNeighborSnippets = async function (e, r, s, a, c, l, u, d) {
  const p = {
    ...exports.neighborOptionToSelection[a],
  };
  const h = (function (e, t, r, i, s) {
    let a;
    a =
      t === o.NeighboringSnippets
        ? undefined !== i && undefined !== s
          ? n.IndentationBasedJaccardMatcher.FACTORY(i, s)
          : n.FixedWindowSizeJaccardMatcher.FACTORY(r.snippetLength)
        : n.FunctionJaccardMatcher.FACTORY(r.snippetLength);
    return a.to(e);
  })(e, s, p, c, l);
  return (
    await r
      .filter((e) => e.source.length < 1e4 && e.source.length > 0)
      .slice(0, 20)
      .reduce(
        async (e, t) =>
          (
            await e
          ).concat(
            (
              await h.findMatches(t, u, d)
            ).map((e) => ({
              relativePath: t.relativePath,
              ...e,
            }))
          ),
        Promise.resolve([])
      )
  )
    .filter((e) => e.score && e.snippet && e.score > p.threshold)
    .sort((e, t) => e.score - t.score)
    .slice(-p.numberOfSnippets)
    .map((e) => ({
      ...e,
      provider: i.SnippetProvider.NeighboringTabs,
      semantics:
        s == o.NeighboringFunctions
          ? i.SnippetSemantics.Function
          : i.SnippetSemantics.Snippet,
    }));
};