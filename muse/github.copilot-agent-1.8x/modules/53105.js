Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.processMarkdown = undefined;
const n = require(34990);
const i = require(12563);
const o = i.buildLabelRules({
  heading: /^# /,
  subheading: /^## /,
  subsubheading: /### /,
});
exports.processMarkdown = function (e) {
  let t = e;
  i.labelLines(t, o);
  if ((0, n.isBlank)(t)) return t;
  function r(e) {
    return "heading" === e.label
      ? 1
      : "subheading" === e.label
      ? 2
      : "subsubheading" === e.label
      ? 3
      : undefined;
  }
  let s = [t];
  let a = [...t.subs];
  t.subs = [];
  for (const e of a) {
    const t = r(e);
    if (undefined === t || n.isBlank(e)) s[s.length - 1].subs.push(e);
    else {
      for (; s.length < t; ) s.push(s[s.length - 1]);
      for (s[t - 1].subs.push(e), s[t] = e; s.length > t + 1; ) s.pop();
    }
  }
  t = i.groupBlocks(t);
  t = i.flattenVirtual(t);
  i.labelVirtualInherited(t);
  return t;
};