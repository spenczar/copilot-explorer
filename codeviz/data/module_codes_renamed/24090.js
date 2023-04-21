Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.extractPrompt =
  exports.trimLastLine =
  exports._contextTooShort =
  exports.MIN_PROMPT_CHARS =
    undefined;
const M_TreeNodeUtils_maybe = require("TreeNodeUtils");
const M_editor_config_constants_maybe = require("editor-config-constants");
const M_ExperimentCacheManager_maybe = require("ExperimentCacheManager");
const M_PathUtilsManager_maybe = require("PathUtilsManager");
const M_NeighborFileManager_maybe = require("NeighborFileManager");
const M_LanguageParserUtils_maybe = require("LanguageParserUtils");
const M_RepoInfoManager_maybe = require("RepoInfoManager");
function trimLastLine(e) {
  const t = e.split("\n");
  const r = t[t.length - 1];
  const n = r.length - r.trimRight().length;
  const i = e.slice(0, e.length - n);
  const o = e.substr(i.length);
  return [r.length == n ? i : e, o];
}
async function d(e, r, d, p, h, f) {
  const g = M_RepoInfoManager_maybe.extractRepoInfoInBackground(e, h.fsPath);
  const m = M_RepoInfoManager_maybe.tryGetGitHubNWO(g) ?? "";
  const y = await M_RepoInfoManager_maybe.getUserKind(e);
  const v = M_RepoInfoManager_maybe.getDogFood(g);
  const _ = await M_editor_config_constants_maybe.suffixPercent(e, m, f, y, v);
  const b = await M_editor_config_constants_maybe.fimSuffixLengthThreshold(
    e,
    m,
    f,
    y,
    v
  );
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
    const f = M_RepoInfoManager_maybe.extractRepoInfoInBackground(e, d.fsPath);
    const g = M_RepoInfoManager_maybe.tryGetGitHubNWO(f) ?? "";
    const m = await M_RepoInfoManager_maybe.getUserKind(e);
    const y = M_RepoInfoManager_maybe.getDogFood(f);
    const v =
      2048 -
      M_editor_config_constants_maybe.getConfig(
        e,
        M_editor_config_constants_maybe.ConfigKey.SolutionLength
      );
    const _ = await e
      .get(M_ExperimentCacheManager_maybe.Features)
      .neighboringTabsOption(g, p, m, y);
    const b = await e
      .get(M_ExperimentCacheManager_maybe.Features)
      .neighboringSnippetTypes(g, p, m, y);
    let w = {
      maxPromptLength: v,
      neighboringTabs: _,
      suffixStartMode: await e
        .get(M_ExperimentCacheManager_maybe.Features)
        .suffixStartMode(g, p, m, y),
      tokenizerName: await e
        .get(M_ExperimentCacheManager_maybe.Features)
        .tokenizerName(g, m),
      neighboringSnippetTypes: b,
      indentationMinLength: await e
        .get(M_ExperimentCacheManager_maybe.Features)
        .indentationMinLength(g, p, y, m),
      indentationMaxLength: await e
        .get(M_ExperimentCacheManager_maybe.Features)
        .indentationMaxLength(g, p, y, m),
    };
    const C = await e
      .get(M_ExperimentCacheManager_maybe.Features)
      .openFileStrategy(g, m, p);
    const E = await e
      .get(M_ExperimentCacheManager_maybe.Features)
      .cursorHistoryStrategy(g, m, p);
    const { docs: T, neighborSource: S } =
      await new M_NeighborFileManager_maybe.NeighborSource(
        C,
        E
      ).getNeighborFiles(
        e.get(M_PathUtilsManager_maybe.TextDocumentManager),
        d,
        p
      );
    const x = await M_editor_config_constants_maybe.suffixPercent(
      e,
      g,
      p,
      m,
      y
    );
    const k = await M_editor_config_constants_maybe.suffixMatchThreshold(
      e,
      g,
      p,
      m,
      y
    );
    const I = await M_editor_config_constants_maybe.fimSuffixLengthThreshold(
      e,
      g,
      p,
      m,
      y
    );
    if (x > 0) {
      w = {
        ...w,
        includeSiblingFunctions: M_TreeNodeUtils_maybe.SiblingOption.NoSiblings,
        suffixPercent: x,
        suffixMatchThreshold: k,
        fimSuffixLengthThreshold: I,
      };
    }
    const A = e.get(M_TreeNodeUtils_maybe.FileSystem);
    return {
      neighborSource: S,
      ...(await M_LanguageParserUtils_maybe.getPrompt(A, h, w, T)),
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
  const n = await e
    .get(M_PathUtilsManager_maybe.TextDocumentManager)
    .getRelativePath(t);
  return d(e, t.getText(), t.offsetAt(r), n, t.uri, t.languageId);
}
exports.MIN_PROMPT_CHARS = 10;
exports._contextTooShort = {
  type: "contextTooShort",
};
exports.trimLastLine = trimLastLine;
exports.extractPrompt = function (e, t, r) {
  const n = e.get(M_PathUtilsManager_maybe.TextDocumentManager).findNotebook(t);
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
          const u = await e
            .get(M_PathUtilsManager_maybe.TextDocumentManager)
            .getRelativePath(t);
          return d(e, c, l, u, t.uri, i.document.languageId);
        }
        return p(e, t, n);
      })(e, t, n, r);
};
