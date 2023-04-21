Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.indentationBlockFinished =
  exports.completionCutOrContinue =
  exports.contextIndentationFromText =
  exports.contextIndentation =
  exports.getNodeStart =
  exports.isBlockBodyFinished =
  exports.isEmptyBlockStart =
    undefined;
const M_LocationFactoryModule_maybe = require("LocationFactoryModule");
const M_LanguageParserUtils_maybe = require("LanguageParserUtils");
exports.isEmptyBlockStart = function (e, t) {
  return M_LanguageParserUtils_maybe.isEmptyBlockStart(
    e.languageId,
    e.getText(),
    e.offsetAt(t)
  );
};
exports.isBlockBodyFinished = function (e, t, r, o) {
  const s = e.get(M_LocationFactoryModule_maybe.LocationFactory);
  const a = t.getText(s.range(s.position(0, 0), r));
  const c = t.offsetAt(r);
  return M_LanguageParserUtils_maybe.isBlockBodyFinished(t.languageId, a, o, c);
};
exports.getNodeStart = async function (e, t, r, o) {
  const s = e.get(M_LocationFactoryModule_maybe.LocationFactory);
  const a = t.getText(s.range(s.position(0, 0), r)) + o;
  const c = await M_LanguageParserUtils_maybe.getNodeStart(
    t.languageId,
    a,
    t.offsetAt(r)
  );
  if (c) return t.positionAt(c);
};
const o = ["\\{", "\\}", "\\[", "\\]", "\\(", "\\)"].concat(
  [
    "then",
    "else",
    "elseif",
    "elif",
    "catch",
    "finally",
    "fi",
    "done",
    "end",
    "loop",
    "until",
    "where",
    "when",
  ].map((e) => e + "\\b")
);
const s = new RegExp(`^(${o.join("|")})`);
function a(e) {
  return s.test(e.trimLeft().toLowerCase());
}
function c(e) {
  const t = /^(\s*)([^]*)$/.exec(e);
  return t && t[2] && t[2].length > 0 ? t[1].length : undefined;
}
function contextIndentationFromText(e, t, r) {
  const n = e.slice(0, t).split("\n");
  const i = e.slice(t).split("\n");
  function o(e, t, n) {
    let i;
    let o;
    let s = t;
    for (; undefined === i && s >= 0 && s < e.length; ) {
      i = c(e[s]);
      o = s;
      s += n;
    }
    if ("python" === r && -1 === n) {
      s++;
      const t = e[s].trim();
      if (t.endsWith('"""')) {
        if (!t.startsWith('"""') || '"""' === t)
          for (s--; s >= 0 && !e[s].trim().startsWith('"""'); ) s--;
        if (s >= 0)
          for (i = undefined, s--; undefined === i && s >= 0; ) {
            i = c(e[s]);
            o = s;
            s--;
          }
      }
    }
    return [i, o];
  }
  const [s, a] = o(n, n.length - 1, -1);
  const l = (() => {
    if (undefined !== s && undefined !== a)
      for (let e = a - 1; e >= 0; e--) {
        const t = c(n[e]);
        if (undefined !== t && t < s) return t;
      }
  })();
  const [u] = o(i, 1, 1);
  return {
    prev: l,
    current: s ?? 0,
    next: u,
  };
}
function completionCutOrContinue(e, t, r) {
  const n = e.split("\n");
  const i = undefined !== r;
  const o = r?.split("\n").pop();
  let s = 0;
  if (i && "" != o?.trim() && "" !== n[0].trim()) {
    s++;
  }
  if (i) {
    s++;
  }
  if (n.length === s) return "continue";
  const l = Math.max(t.current, t.next ?? 0);
  for (let e = s; e < n.length; e++) {
    let t = n[e];
    if (0 == e && undefined !== o) {
      t = o + t;
    }
    const r = c(t);
    if (undefined !== r && (r < l || (r === l && !a(t))))
      return n.slice(0, e).join("\n").length;
  }
  return "continue";
}
exports.contextIndentation = function (e, t) {
  return contextIndentationFromText(e.getText(), e.offsetAt(t), e.languageId);
};
exports.contextIndentationFromText = contextIndentationFromText;
exports.completionCutOrContinue = completionCutOrContinue;
exports.indentationBlockFinished = function (e, t) {
  return async (r) => {
    const n = completionCutOrContinue(r, e, t);
    return "continue" === n ? undefined : n;
  };
};
