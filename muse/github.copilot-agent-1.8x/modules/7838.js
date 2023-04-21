Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.parseChallengeDoc = undefined;
exports.parseChallengeDoc = function (e, t) {
  const r = e.split("\n");
  let n = t;
  let i = t;
  let o = r[t.line];
  const s = o.indexOf("%");
  if (-1 !== s) {
    o = o.substring(0, s) + o.substring(s + 1);
    n = {
      line: t.line,
      character: s,
    };
  }
  const a = o.indexOf("^");
  if (-1 !== a) {
    const e = o.indexOf("^", a + 1);
    if (-1 === e)
      throw new Error(
        "Challenge document must contain zero or two ^ characters."
      );
    o = o.substring(0, a) + o.substring(a + 1, e) + o.substring(e + 1);
    n = {
      line: t.line,
      character: t.character,
    };
    i = {
      line: t.line,
      character: t.character + e - a - 1,
    };
  }
  return {
    cursorLine: o,
    lines: r,
    start: n,
    end: i,
  };
};