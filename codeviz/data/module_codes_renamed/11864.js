Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.splitIntoWords =
  exports.FunctionalMatcher =
  exports.WindowedMatcher =
  exports.SortOptions =
    undefined;
const M_PromptParsingUtils_maybe = require("PromptParsingUtils");
const M_language_parser_utils_maybe = require("language-parser-utils");
var o;
!(function (e) {
  e.Ascending = "ascending";
  e.Descending = "descending";
  e.None = "none";
})((o = exports.SortOptions || (exports.SortOptions = {})));
class s {
  constructor(e) {
    this.stopsForLanguage = p.get(e.languageId) ?? d;
  }
  tokenize(e) {
    return new Set(
      splitIntoWords(e).filter((e) => !this.stopsForLanguage.has(e))
    );
  }
}
const a = new (class {
  constructor(e) {
    this.keys = [];
    this.cache = {};
    this.size = e;
  }
  put(e, t) {
    this.cache[e] = t;
    if (this.keys.length > this.size) {
      this.keys.push(e);
      const t = this.keys.shift() ?? "";
      delete this.cache[t];
    }
  }
  get(e) {
    return this.cache[e];
  }
})(20);
class WindowedMatcher {
  constructor(e) {
    this.tokenizer = new s(e);
    this.referenceTokens = this.tokenizer.tokenize(this.trimDocument(e));
  }
  sortScoredSnippets(e, t = o.Descending) {
    return t == o.Ascending
      ? e.sort((e, t) => (e.score > t.score ? 1 : -1))
      : t == o.Descending
      ? e.sort((e, t) => (e.score > t.score ? -1 : 1))
      : e;
  }
  retrieveAllSnippets(e, t = o.Descending) {
    const r = [];
    if (0 === e.source.length || 0 === this.referenceTokens.size) return r;
    const n = e.source.split("\n");
    const i = this.id() + ":" + e.source;
    const s = a.get(i) ?? [];
    const c = 0 == s.length;
    const l = c ? n.map(this.tokenizer.tokenize, this.tokenizer) : [];
    for (const [e, [t, i]] of this.getWindowsDelineations(n).entries()) {
      if (c) {
        const e = new Set();
        l.slice(t, i).forEach((t) => t.forEach(e.add, e));
        s.push(e);
      }
      const n = s[e];
      const o = this.similarityScore(n, this.referenceTokens);
      r.push({
        score: o,
        startLine: t,
        endLine: i,
      });
    }
    if (c) {
      a.put(i, s);
    }
    return this.sortScoredSnippets(r, t);
  }
  async findMatches(
    e,
    t = M_PromptParsingUtils_maybe.SnippetSelectionOption.BestMatch,
    r
  ) {
    if (t == M_PromptParsingUtils_maybe.SnippetSelectionOption.BestMatch) {
      const t = await this.findBestMatch(e);
      return t ? [t] : [];
    }
    return (
      (t == M_PromptParsingUtils_maybe.SnippetSelectionOption.TopK &&
        (await this.findTopKMatches(e, r))) ||
      []
    );
  }
  async findBestMatch(e) {
    if (0 === e.source.length || 0 === this.referenceTokens.size) return;
    const t = e.source.split("\n");
    const r = this.retrieveAllSnippets(e, o.Descending);
    return 0 !== r.length && 0 !== r[0].score
      ? {
          snippet: t.slice(r[0].startLine, r[0].endLine).join("\n"),
          ...r[0],
        }
      : undefined;
  }
  async findTopKMatches(e, t = 1) {
    if (0 === e.source.length || 0 === this.referenceTokens.size || t < 1)
      return;
    const r = e.source.split("\n");
    const n = this.retrieveAllSnippets(e, o.Descending);
    if (0 === n.length || 0 === n[0].score) return;
    const i = [n[0]];
    for (let e = 1; e < n.length && i.length < t; e++)
      if (
        -1 ==
        i.findIndex(
          (t) => n[e].startLine < t.endLine && n[e].endLine > t.startLine
        )
      ) {
        i.push(n[e]);
      }
    return i.map((e) => ({
      snippet: r.slice(e.startLine, e.endLine).join("\n"),
      ...e,
    }));
  }
}
function splitIntoWords(e) {
  return e.split(/[^a-zA-Z0-9]/).filter((e) => e.length > 0);
}
exports.WindowedMatcher = WindowedMatcher;
exports.FunctionalMatcher = class extends WindowedMatcher {
  constructor(e) {
    super(e);
  }
  getMatchingScore(e) {
    const t = this.tokenizer.tokenize(e.source);
    const r = this.similarityScore(t, this.referenceTokens);
    return {
      snippet: e.source,
      score: r,
      startLine: 0,
      endLine: 0,
    };
  }
  async findBestMatch(e) {
    const t = await this.findMatches(e);
    if (0 !== t.length && 0 !== t[0].score) return t[0];
  }
  async findMatches(e, t, r) {
    if (0 === e.source.length || 0 === this.referenceTokens.size) return [];
    const n = await (async function (e) {
      let t = [];
      const r = await M_language_parser_utils_maybe.getFunctionPositions(
        e.languageId,
        e.source
      );
      for (let n = 0; n < r.length; n++) {
        let { startIndex: i, endIndex: o } = r[n];
        let s = e.source.substring(i, o);
        t.push({
          source: s,
          relativePath: e.relativePath,
          languageId: e.languageId,
          uri: e.uri,
        });
      }
      return t;
    })(e);
    if (0 == n.length) {
      const t = e.source.split("\n");
      const r = this.retrieveAllSnippets(e, o.Descending);
      return 0 === r.length || 0 === r[0].score
        ? []
        : [
            {
              snippet: t.slice(r[0].startLine, r[0].endLine).join("\n"),
              ...r[0],
            },
          ];
    }
    const s = [];
    for (let e of n) {
      const t = this.getMatchingScore(e);
      s.push(t);
    }
    return s;
  }
};
exports.splitIntoWords = splitIntoWords;
const u = new Set([
  "we",
  "our",
  "you",
  "it",
  "its",
  "they",
  "them",
  "their",
  "this",
  "that",
  "these",
  "those",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "having",
  "do",
  "does",
  "did",
  "doing",
  "can",
  "don",
  "t",
  "s",
  "will",
  "would",
  "should",
  "what",
  "which",
  "who",
  "when",
  "where",
  "why",
  "how",
  "a",
  "an",
  "the",
  "and",
  "or",
  "not",
  "no",
  "but",
  "because",
  "as",
  "until",
  "again",
  "further",
  "then",
  "once",
  "here",
  "there",
  "all",
  "any",
  "both",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "above",
  "below",
  "to",
  "during",
  "before",
  "after",
  "of",
  "at",
  "by",
  "about",
  "between",
  "into",
  "through",
  "from",
  "up",
  "down",
  "in",
  "out",
  "on",
  "off",
  "over",
  "under",
  "only",
  "own",
  "same",
  "so",
  "than",
  "too",
  "very",
  "just",
  "now",
]);
const d = new Set([
  "if",
  "then",
  "else",
  "for",
  "while",
  "with",
  "def",
  "function",
  "return",
  "TODO",
  "import",
  "try",
  "catch",
  "raise",
  "finally",
  "repeat",
  "switch",
  "case",
  "match",
  "assert",
  "continue",
  "break",
  "const",
  "class",
  "enum",
  "struct",
  "static",
  "new",
  "super",
  "this",
  "var",
  ...u,
]);
const p = new Map([]);
