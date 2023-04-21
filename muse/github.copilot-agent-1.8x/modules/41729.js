Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getSiblingFunctionStart = exports.getSiblingFunctions = undefined;
const n = require(28684);
const i = require(42133);
exports.getSiblingFunctions = async function ({
  source: e,
  offset: t,
  languageId: r,
}) {
  const o = [];
  let s = "";
  let a = e.substring(0, t);
  if (i.isSupportedLanguageId(r)) {
    const c = await i.parseTreeSitter(r, e);
    try {
      let l = t;
      for (; l >= 0 && /\s/.test(e[l]); ) l--;
      const u = c.rootNode.descendantForIndex(l);
      const d = i.getAncestorWithSiblingFunctions(r, u);
      if (d) {
        const c = i.getFirstPrecedingComment(d)?.startIndex ?? d.startIndex;
        let l;
        let u = 0;
        for (; " " == (l = e[c - u - 1]) || "\t" == l; ) u++;
        const p = e.substring(c - u, c);
        for (let s = d.nextSibling; s; s = s.nextSibling)
          if (i.isFunctionDefinition(r, s)) {
            const r = i.getFirstPrecedingComment(s)?.startIndex ?? s.startIndex;
            if (r < t) continue;
            const a = e.substring(r, s.endIndex);
            const c = n.newLineEnded(a) + "\n" + p;
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
  if (i.isSupportedLanguageId(r)) {
    const n = await i.parseTreeSitter(r, e);
    try {
      let o = t;
      for (; o >= 0 && /\s/.test(e[o]); ) o--;
      const s = n.rootNode.descendantForIndex(o);
      const a = i.getAncestorWithSiblingFunctions(r, s);
      if (a) {
        for (let e = a.nextSibling; e; e = e.nextSibling)
          if (i.isFunctionDefinition(r, e)) {
            const r = i.getFirstPrecedingComment(e)?.startIndex ?? e.startIndex;
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