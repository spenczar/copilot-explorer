Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.completionsFromGhostTextResults = undefined;
const n = require(7057);
const i = require(52369);
const o = require(40702);
const s = require(35034);
exports.completionsFromGhostTextResults = function (e, t, r, a, c, l, u) {
  const d = e.get(i.LocationFactory);
  const p = a.lineAt(c);
  let h = t.map((e) => {
    let t;
    let i = "";
    if (l) {
      e.completion = s.normalizeIndentCharacter(
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
      uuid: n.v4(),
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
  if (r === o.ResultType.TypingAsSuggested && undefined !== u) {
    const e = h.find((e) => e.index === u);
    if (e) {
      const t = h.filter((e) => e.index !== u);
      h = [e, ...t];
    }
  }
  return h;
};