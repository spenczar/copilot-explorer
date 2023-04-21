Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getPrompt =
  exports.newLineEnded =
  exports.normalizeLanguageId =
  exports.PromptOptions =
  exports.SuffixStartMode =
  exports.SuffixMatchOption =
  exports.SuffixOption =
  exports.LineEndingOptions =
  exports.LocalImportContextOption =
  exports.SnippetSelectionOption =
  exports.SnippetPositionOption =
  exports.SiblingOption =
  exports.PathMarkerOption =
  exports.LanguageMarkerOption =
  exports.TOKENS_RESERVED_FOR_SUFFIX_ENCODING =
  exports.MAX_EDIT_DISTANCE_LENGTH =
  exports.MAX_PROMPT_LENGTH =
    undefined;
const n = require(23272);
const i = require(41986);
const o = require(27289);
const s = require(41729);
const a = require(83542);
const c = require(17503);
const l = require(6885);
const u = require(8748);
let d = {
  text: "",
  tokens: [],
};
var p;
var h;
var f;
var g;
var m;
var y;
var v;
var _;
var b;
var w;
exports.MAX_PROMPT_LENGTH = 1500;
exports.MAX_EDIT_DISTANCE_LENGTH = 50;
exports.TOKENS_RESERVED_FOR_SUFFIX_ENCODING = 5;
(function (e) {
  e.NoMarker = "nomarker";
  e.Top = "top";
  e.Always = "always";
})((p = exports.LanguageMarkerOption || (exports.LanguageMarkerOption = {})));
(function (e) {
  e.NoMarker = "nomarker";
  e.Top = "top";
  e.Always = "always";
})((h = exports.PathMarkerOption || (exports.PathMarkerOption = {})));
(function (e) {
  e.NoSiblings = "nosiblings";
  e.SiblingsOverContext = "siblingabove";
  e.ContextOverSiblings = "contextabove";
})((f = exports.SiblingOption || (exports.SiblingOption = {})));
(function (e) {
  e.TopOfText = "top";
  e.DirectlyAboveCursor = "aboveCursor";
  e.AfterSiblings = "afterSiblings";
})((g = exports.SnippetPositionOption || (exports.SnippetPositionOption = {})));
(function (e) {
  e.BestMatch = "bestMatch";
  e.TopK = "topK";
})(
  (m = exports.SnippetSelectionOption || (exports.SnippetSelectionOption = {}))
);
(function (e) {
  e.NoContext = "nocontext";
  e.Declarations = "declarations";
})(
  (y =
    exports.LocalImportContextOption || (exports.LocalImportContextOption = {}))
);
(function (e) {
  e.ConvertToUnix = "unix";
  e.KeepOriginal = "keep";
})((v = exports.LineEndingOptions || (exports.LineEndingOptions = {})));
(w = exports.SuffixOption || (exports.SuffixOption = {})).None = "none";
w.FifteenPercent = "fifteenPercent";
(function (e) {
  e.Equal = "equal";
  e.Levenshtein = "levenshteineditdistance";
})((_ = exports.SuffixMatchOption || (exports.SuffixMatchOption = {})));
(function (e) {
  e.Cursor = "cursor";
  e.CursorTrimStart = "cursortrimstart";
  e.SiblingBlock = "siblingblock";
  e.SiblingBlockTrimStart = "siblingblocktrimstart";
})((b = exports.SuffixStartMode || (exports.SuffixStartMode = {})));
class PromptOptions {
  constructor(e, r) {
    this.fs = e;
    this.maxPromptLength = exports.MAX_PROMPT_LENGTH;
    this.languageMarker = p.Top;
    this.pathMarker = h.Top;
    this.includeSiblingFunctions = f.ContextOverSiblings;
    this.localImportContext = y.Declarations;
    this.snippetPosition = g.TopOfText;
    this.numberOfSnippets = 4;
    this.neighboringTabs = o.NeighboringTabsOption.Eager;
    this.neighboringSnippetTypes = o.NeighboringSnippetType.NeighboringSnippets;
    this.lineEnding = v.ConvertToUnix;
    this.suffixPercent = 0;
    this.suffixStartMode = b.Cursor;
    this.tokenizerName = a.TokenizerName.cushman001;
    this.suffixMatchThreshold = 0;
    this.suffixMatchCriteria = _.Levenshtein;
    this.fimSuffixLengthThreshold = 0;
    if (r) for (const e in r) this[e] = r[e];
    if (this.suffixPercent < 0 || this.suffixPercent > 100)
      throw new Error(
        `suffixPercent must be between 0 and 100, but was ${this.suffixPercent}`
      );
    if (this.suffixPercent > 0 && this.includeSiblingFunctions != f.NoSiblings)
      throw new Error(
        `Invalid option combination. Cannot set suffixPercent > 0 (${this.suffixPercent}) and includeSiblingFunctions ${this.includeSiblingFunctions}`
      );
    if (this.suffixMatchThreshold < 0 || this.suffixMatchThreshold > 100)
      throw new Error(
        `suffixMatchThreshold must be at between 0 and 100, but was ${this.suffixMatchThreshold}`
      );
    if (this.fimSuffixLengthThreshold < -1)
      throw new Error(
        `fimSuffixLengthThreshold must be at least -1, but was ${this.fimSuffixLengthThreshold}`
      );
    if (
      null != this.indentationMinLength &&
      null != this.indentationMaxLength &&
      this.indentationMinLength > this.indentationMaxLength
    )
      throw new Error(
        `indentationMinLength must be less than or equal to indentationMaxLength, but was ${this.indentationMinLength} and ${this.indentationMaxLength}`
      );
    if (
      this.snippetSelection === m.TopK &&
      undefined === this.snippetSelectionK
    )
      throw new Error("snippetSelectionK must be defined.");
    if (
      this.snippetSelection === m.TopK &&
      this.snippetSelectionK &&
      this.snippetSelectionK <= 0
    )
      throw new Error(
        `snippetSelectionK must be greater than 0, but was ${this.snippetSelectionK}`
      );
  }
}
exports.PromptOptions = PromptOptions;
const E = {
  javascriptreact: "javascript",
  jsx: "javascript",
  typescriptreact: "typescript",
  jade: "pug",
  cshtml: "razor",
};
function normalizeLanguageId(e) {
  e = e.toLowerCase();
  return E[e] ?? e;
}
function newLineEnded(e) {
  return "" == e || e.endsWith("\n") ? e : e + "\n";
}
exports.normalizeLanguageId = normalizeLanguageId;
exports.newLineEnded = newLineEnded;
exports.getPrompt = async function (e, r, m = {}, v = [], w = []) {
  const E = new PromptOptions(e, m);
  const x = a.getTokenizer(E.tokenizerName);
  let k = false;
  const { source: I, offset: A } = r;
  if (A < 0 || A > I.length) throw new Error(`Offset ${A} is out of range.`);
  r.languageId = normalizeLanguageId(r.languageId);
  const P = new c.Priorities();
  const R = P.justBelow(c.Priorities.TOP);
  const N =
    E.languageMarker == p.Always
      ? P.justBelow(c.Priorities.TOP)
      : P.justBelow(R);
  const O =
    E.pathMarker == h.Always ? P.justBelow(c.Priorities.TOP) : P.justBelow(R);
  const L =
    E.includeSiblingFunctions == f.ContextOverSiblings
      ? P.justBelow(R)
      : P.justAbove(R);
  const D = P.justBelow(R, L);
  const M = P.justBelow(D);
  const B = new c.PromptWishlist(x, E.lineEnding);
  let F;
  let j;
  if (E.languageMarker != p.NoMarker) {
    const e = newLineEnded(n.getLanguageMarker(r));
    F = B.append(e, c.PromptElementKind.LanguageMarker, N);
  }
  if (E.pathMarker != h.NoMarker) {
    const e = newLineEnded(n.getPathMarker(r));
    if (e.length > 0) {
      j = B.append(e, c.PromptElementKind.PathMarker, O);
    }
  }
  if (E.localImportContext != y.NoContext)
    for (const e of await i.extractLocalImportContext(r, E.fs))
      B.append(newLineEnded(e), c.PromptElementKind.ImportedFile, D);
  const U =
    E.neighboringTabs == o.NeighboringTabsOption.None || 0 == v.length
      ? []
      : await o.getNeighborSnippets(
          r,
          v,
          E.neighboringSnippetTypes,
          E.neighboringTabs,
          E.indentationMinLength,
          E.indentationMaxLength,
          E.snippetSelectionOption,
          E.snippetSelectionK
        );
  w = w.concat(U);
  if (new Set(w.map((e) => e.provider)).size > 1)
    throw new Error("Cannot combine snippets from different providers.");
  function $() {
    w.map(u.normalizeSnippetScore)
      .sort((e, t) => e.score - t.score)
      .slice(-E.numberOfSnippets)
      .map((e) => ({
        score: e.score,
        snippet: u
          .announceSnippet(e)
          .map((e) => n.comment(e, r.languageId) + "\n")
          .join(""),
        startLine: e.startLine,
        endLine: e.endLine,
      }))
      .forEach((e) => {
        B.append(
          e.snippet,
          c.PromptElementKind.SimilarFile,
          M,
          x.tokenLength(e.snippet),
          e.score
        );
      });
  }
  if (E.snippetPosition == g.TopOfText) {
    $();
  }
  const q = [];
  let H;
  if (E.includeSiblingFunctions == f.NoSiblings) H = I.substring(0, A);
  else {
    const {
      siblings: e,
      beforeInsertion: t,
      afterInsertion: n,
    } = await s.getSiblingFunctions(r);
    B.appendLineForLine(t, c.PromptElementKind.BeforeCursor, R).forEach((e) =>
      q.push(e)
    );
    let i = L;
    e.forEach((e) => {
      B.append(e, c.PromptElementKind.AfterCursor, i);
      i = P.justBelow(i);
    });
    if (E.snippetPosition == g.AfterSiblings) {
      $();
    }
    H = n;
  }
  if (E.snippetPosition == g.DirectlyAboveCursor) {
    const e = H.lastIndexOf("\n") + 1;
    const t = H.substring(0, e);
    const r = H.substring(e);
    B.appendLineForLine(t, c.PromptElementKind.BeforeCursor, R).forEach((e) =>
      q.push(e)
    );
    $();
    if (r.length > 0) {
      q.push(B.append(r, c.PromptElementKind.AfterCursor, R));
      if (q.length > 1) {
        B.require(q[q.length - 2], q[q.length - 1]);
      }
    }
  } else
    B.appendLineForLine(H, c.PromptElementKind.BeforeCursor, R).forEach((e) =>
      q.push(e)
    );
  if (p.Top == E.languageMarker && q.length > 0 && undefined !== F) {
    B.require(F, q[0]);
  }
  if (h.Top == E.pathMarker && q.length > 0 && undefined !== j) {
    if (F) {
      B.require(j, F);
    } else {
      B.require(j, q[0]);
    }
  }
  if (undefined !== F && undefined !== j) {
    B.exclude(j, F);
  }
  let V = I.slice(A);
  if (0 == E.suffixPercent || V.length <= E.fimSuffixLengthThreshold)
    return B.fulfill(E.maxPromptLength);
  {
    let e = r.offset;
    if (
      E.suffixStartMode !== b.Cursor &&
      E.suffixStartMode !== b.CursorTrimStart
    ) {
      e = await s.getSiblingFunctionStart(r);
    }
    const n = E.maxPromptLength - exports.TOKENS_RESERVED_FOR_SUFFIX_ENCODING;
    let i = Math.floor((n * (100 - E.suffixPercent)) / 100);
    let o = B.fulfill(i);
    const a = n - o.prefixLength;
    let c = I.slice(e);
    if (
      E.suffixStartMode != b.SiblingBlockTrimStart &&
      E.suffixStartMode != b.CursorTrimStart
    ) {
      c = c.trimStart();
    }
    const u = x.takeFirstTokens(c, a);
    if (u.tokens.length <= a - 3) {
      i = n - u.tokens.length;
      o = B.fulfill(i);
    }
    if (E.suffixMatchCriteria == _.Equal)
      u.tokens.length === d.tokens.length &&
        u.tokens.every((e, t) => e === d.tokens[t]) &&
        (k = !0);
    else if (
      E.suffixMatchCriteria == _.Levenshtein &&
      u.tokens.length > 0 &&
      E.suffixMatchThreshold > 0
    ) {
      const e = (0, l.findEditDistanceScore)(
        u.tokens.slice(0, exports.MAX_EDIT_DISTANCE_LENGTH),
        d.tokens.slice(0, exports.MAX_EDIT_DISTANCE_LENGTH)
      )?.score;
      100 * e <
        E.suffixMatchThreshold *
          Math.min(exports.MAX_EDIT_DISTANCE_LENGTH, u.tokens.length) &&
        (k = !0);
    }
    if (true === k && d.tokens.length <= a) {
      if (d.tokens.length <= a - 3) {
        i = n - d.tokens.length;
        o = B.fulfill(i);
      }
      o.suffix = d.text;
      o.suffixLength = d.tokens.length;
    } else {
      o.suffix = u.text;
      o.suffixLength = u.tokens.length;
      d = u;
    }
    return o;
  }
};