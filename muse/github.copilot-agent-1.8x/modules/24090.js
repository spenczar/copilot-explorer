Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.extractPrompt =
  exports.trimLastLine =
  exports._contextTooShort =
  exports.MIN_PROMPT_CHARS =
    undefined;
const n = require(44617);
const i = require(39800);
const o = require(16905);
const s = require(70819);
const a = require(29975);
const c = require(2273);
const l = require(3591);
function trimLastLine(e) {
  const t = e.split("\n");
  const r = t[t.length - 1];
  const n = r.length - r.trimRight().length;
  const i = e.slice(0, e.length - n);
  const o = e.substr(i.length);
  return [r.length == n ? i : e, o];
}
async function d(e, r, d, p, h, f) {
  const g = l.extractRepoInfoInBackground(e, h.fsPath);
  const m = l.tryGetGitHubNWO(g) ?? "";
  const y = await l.getUserKind(e);
  const v = l.getDogFood(g);
  const _ = await i.suffixPercent(e, m, f, y, v);
  const b = await i.fimSuffixLengthThreshold(e, m, f, y, v);
  if ((_ > 0 ? r.length : d) < exports.MIN_PROMPT_CHARS)
    return exports._contextTooShort;
  const w = Date.now();
  const {
    prefix: C,
    suffix: E,
    promptChoices: T,
    promptBackground: S,
    promptElementRanges: x,
    neighborSource: k,
  } = await (async function (e, t, r, u, d, p) {
    const h = {
      uri: d.toString(),
      source: t,
      offset: r,
      relativePath: u,
      languageId: p,
    };
    const f = l.extractRepoInfoInBackground(e, d.fsPath);
    const g = l.tryGetGitHubNWO(f) ?? "";
    const m = await l.getUserKind(e);
    const y = l.getDogFood(f);
    const v = 2048 - i.getConfig(e, i.ConfigKey.SolutionLength);
    const _ = await e.get(o.Features).neighboringTabsOption(g, p, m, y);
    const b = await e.get(o.Features).neighboringSnippetTypes(g, p, m, y);
    let w = {
      maxPromptLength: v,
      neighboringTabs: _,
      suffixStartMode: await e.get(o.Features).suffixStartMode(g, p, m, y),
      tokenizerName: await e.get(o.Features).tokenizerName(g, m),
      neighboringSnippetTypes: b,
      indentationMinLength: await e
        .get(o.Features)
        .indentationMinLength(g, p, y, m),
      indentationMaxLength: await e
        .get(o.Features)
        .indentationMaxLength(g, p, y, m),
    };
    const C = await e.get(o.Features).openFileStrategy(g, m, p);
    const E = await e.get(o.Features).cursorHistoryStrategy(g, m, p);
    const { docs: T, neighborSource: S } = await new a.NeighborSource(
      C,
      E
    ).getNeighborFiles(e.get(s.TextDocumentManager), d, p);
    const x = await i.suffixPercent(e, g, p, m, y);
    const k = await i.suffixMatchThreshold(e, g, p, m, y);
    const I = await i.fimSuffixLengthThreshold(e, g, p, m, y);
    if (x > 0) {
      w = {
        ...w,
        includeSiblingFunctions: n.SiblingOption.NoSiblings,
        suffixPercent: x,
        suffixMatchThreshold: k,
        fimSuffixLengthThreshold: I,
      };
    }
    const A = e.get(n.FileSystem);
    return {
      neighborSource: S,
      ...(await c.getPrompt(A, h, w, T)),
    };
  })(e, r, d, p, h, f);
  const [I, A] = trimLastLine(C);
  const P = Date.now();
  return {
    type: "prompt",
    prompt: {
      prefix: I,
      suffix: E,
      isFimEnabled: _ > 0 && E.length > b,
      promptElementRanges: x.ranges,
    },
    trailingWs: A,
    promptChoices: T,
    computeTimeMs: P - w,
    promptBackground: S,
    neighborSource: k,
  };
}
async function p(e, t, r) {
  const n = await e.get(s.TextDocumentManager).getRelativePath(t);
  return d(e, t.getText(), t.offsetAt(r), n, t.uri, t.languageId);
}
exports.MIN_PROMPT_CHARS = 10;
exports._contextTooShort = {
  type: "contextTooShort",
};
exports.trimLastLine = trimLastLine;
exports.extractPrompt = function (e, t, r) {
  const n = e.get(s.TextDocumentManager).findNotebook(t);
  return undefined === n
    ? p(e, t, r)
    : (async function (e, t, r, n) {
        const i = r.getCells().find((e) => e.document.uri === t.uri);
        if (i) {
          const o = r
            .getCells()
            .filter(
              (e) =>
                e.index < i.index &&
                e.document.languageId === i.document.languageId
            );
          const a =
            o.length > 0
              ? o.map((e) => e.document.getText()).join("\n\n") + "\n\n"
              : "";
          const c = a + t.getText();
          const l = a.length + t.offsetAt(n);
          const u = await e.get(s.TextDocumentManager).getRelativePath(t);
          return d(e, c, l, u, t.uri, i.document.languageId);
        }
        return p(e, t, n);
      })(e, t, n, r);
};