Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.completionsFromGhostTextResults = undefined;
const M_url_opener = require("url-opener");
const M_LocationFactoryModule_maybe = require("LocationFactoryModule");
const M_GhostTextManager_maybe = require("GhostTextManager");
const M_indentation_normalizer_maybe = require("indentation-normalizer");
exports.completionsFromGhostTextResults = function (e, t, r, a, c, l, u) {
  const d = e.get(M_LocationFactoryModule_maybe.LocationFactory);
  const p = a.lineAt(c);
  let h = t.map((e) => {
    let t;
    let i = "";
    if (l) {
      e.completion = M_indentation_normalizer_maybe.normalizeIndentCharacter(
        l,
        e.completion,
        p.isEmptyOrWhitespace
      );
    }
    if (e.completion.displayNeedsWsOffset && p.isEmptyOrWhitespace)
      (t = d.range(d.position(c.line, 0), c)),
        (i = e.completion.completionText);
    else if (
      p.isEmptyOrWhitespace &&
      e.completion.completionText.startsWith(p.text)
    )
      (t = d.range(d.position(c.line, 0), c)),
        (i = e.completion.completionText);
    else {
      const r = a.getWordRangeAtPosition(c);
      if (e.isMiddleOfTheLine) {
        const r = a.lineAt(c),
          n = d.range(d.position(c.line, 0), c),
          o = a.getText(n);
        (t = e.coversSuffix ? r.range : n), (i = o + e.completion.displayText);
      } else if (r) {
        const n = a.getText(r);
        (t = d.range(r.start, c)), (i = n + e.completion.completionText);
      } else {
        const r = d.range(d.position(c.line, 0), c);
        (t = r), (i = a.getText(r) + e.completion.displayText);
      }
    }
    return {
      uuid: M_url_opener.v4(),
      text: i,
      range: t,
      file: a.uri,
      index: e.completion.completionIndex,
      telemetry: e.telemetry,
      displayText: e.completion.displayText,
      position: c,
      offset: a.offsetAt(c),
      resultType: r,
    };
  });
  if (
    r === M_GhostTextManager_maybe.ResultType.TypingAsSuggested &&
    undefined !== u
  ) {
    const e = h.find((e) => e.index === u);
    if (e) {
      const t = h.filter((e) => e.index !== u);
      h = [e, ...t];
    }
  }
  return h;
};
