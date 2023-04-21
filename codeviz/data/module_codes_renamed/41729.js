Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getSiblingFunctionStart = exports.getSiblingFunctions = undefined;
const M_PromptParsingUtils_maybe = require("PromptParsingUtils");
const M_language_parser_utils_maybe = require("language-parser-utils");
exports.getSiblingFunctions = async function ({
  source: e,
  offset: t,
  languageId: r,
}) {
  const o = [];
  let s = "";
  let a = e.substring(0, t);
  if (M_language_parser_utils_maybe.isSupportedLanguageId(r)) {
    const c = await M_language_parser_utils_maybe.parseTreeSitter(r, e);
    try {
      let l = t;
      for (; l >= 0 && /\s/.test(e[l]); ) l--;
      const u = c.rootNode.descendantForIndex(l);
      const d = M_language_parser_utils_maybe.getAncestorWithSiblingFunctions(
        r,
        u
      );
      if (d) {
        const c =
          M_language_parser_utils_maybe.getFirstPrecedingComment(d)
            ?.startIndex ?? d.startIndex;
        let l;
        let u = 0;
        for (; " " == (l = e[c - u - 1]) || "\t" == l; ) u++;
        const p = e.substring(c - u, c);
        for (let s = d.nextSibling; s; s = s.nextSibling)
          if (M_language_parser_utils_maybe.isFunctionDefinition(r, s)) {
            const r =
              M_language_parser_utils_maybe.getFirstPrecedingComment(s)
                ?.startIndex ?? s.startIndex;
            if (r < t) continue;
            const a = e.substring(r, s.endIndex);
            const c = M_PromptParsingUtils_maybe.newLineEnded(a) + "\n" + p;
            o.push(c);
          }
        s = e.substring(0, c);
        a = e.substring(c, t);
      }
    } finally {
      c.delete();
    }
  }
  return {
    siblings: o,
    beforeInsertion: s,
    afterInsertion: a,
  };
};
exports.getSiblingFunctionStart = async function ({
  source: e,
  offset: t,
  languageId: r,
}) {
  if (M_language_parser_utils_maybe.isSupportedLanguageId(r)) {
    const n = await M_language_parser_utils_maybe.parseTreeSitter(r, e);
    try {
      let o = t;
      for (; o >= 0 && /\s/.test(e[o]); ) o--;
      const s = n.rootNode.descendantForIndex(o);
      const a = M_language_parser_utils_maybe.getAncestorWithSiblingFunctions(
        r,
        s
      );
      if (a) {
        for (let e = a.nextSibling; e; e = e.nextSibling)
          if (M_language_parser_utils_maybe.isFunctionDefinition(r, e)) {
            const r =
              M_language_parser_utils_maybe.getFirstPrecedingComment(e)
                ?.startIndex ?? e.startIndex;
            if (r < t) continue;
            return r;
          }
        if (a.endIndex >= t) return a.endIndex;
      }
    } finally {
      n.delete();
    }
  }
  return t;
};
