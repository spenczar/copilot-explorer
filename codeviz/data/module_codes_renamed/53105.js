Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.processMarkdown = undefined;
const M_TreeNodeUtils_maybe = require("TreeNodeUtils");
const M_language_parser_utils_maybe = require("language-parser-utils");
const o = M_language_parser_utils_maybe.buildLabelRules({
  heading: /^# /,
  subheading: /^## /,
  subsubheading: /### /,
});
exports.processMarkdown = function (e) {
  let t = e;
  M_language_parser_utils_maybe.labelLines(t, o);
  if ((0, M_TreeNodeUtils_maybe.isBlank)(t)) return t;
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
    if (undefined === t || M_TreeNodeUtils_maybe.isBlank(e))
      s[s.length - 1].subs.push(e);
    else {
      for (; s.length < t; ) s.push(s[s.length - 1]);
      for (s[t - 1].subs.push(e), s[t] = e; s.length > t + 1; ) s.pop();
    }
  }
  t = M_language_parser_utils_maybe.groupBlocks(t);
  t = M_language_parser_utils_maybe.flattenVirtual(t);
  M_language_parser_utils_maybe.labelVirtualInherited(t);
  return t;
};
