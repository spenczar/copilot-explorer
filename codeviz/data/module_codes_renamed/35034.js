Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.normalizeIndentCharacter = undefined;
exports.normalizeIndentCharacter = function (e, t, r) {
  function n(e, t, r) {
    const n = new RegExp(`^(${t})+`, "g");
    return e
      .split("\n")
      .map((e) => {
        const t = e.replace(n, "");
        const i = e.length - t.length;
        return r(i) + t;
      })
      .join("\n");
  }
  let i;
  i = undefined === e.tabSize || "string" == typeof e.tabSize ? 4 : e.tabSize;
  if (!1 === e.insertSpaces) {
    const e = (e) =>
      n(e, " ", (e) => "\t".repeat(Math.floor(e / i)) + " ".repeat(e % i));
    (t.displayText = e(t.displayText)),
      (t.completionText = e(t.completionText));
  } else if (!0 === e.insertSpaces) {
    const e = (e) => n(e, "\t", (e) => " ".repeat(e * i));
    if (
      ((t.displayText = e(t.displayText)),
      (t.completionText = e(t.completionText)),
      r)
    ) {
      const e = (e) => {
        const t = e.length - e.trimLeft().length,
          r = t % i;
        return 0 !== r && t > 0
          ? n(e, " ".repeat(r), (e) => " ".repeat((Math.floor(e / i) + 1) * i))
          : e;
      };
      (t.displayText = e(t.displayText)),
        (t.completionText = e(t.completionText));
    }
  }
  return t;
};
