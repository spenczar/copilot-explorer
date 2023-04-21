Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.processJava = undefined;
const M_TreeNodeUtils_maybe = require("TreeNodeUtils");
const M_TreeTraversalUtils_maybe = require("TreeTraversalUtils");
const M_language_parser_utils_maybe = require("language-parser-utils");
const s = M_language_parser_utils_maybe.buildLabelRules({
  package: /^package /,
  import: /^import /,
  class: /\bclass /,
  interface: /\binterface /,
  javadoc: /^\/\*\*/,
  comment_multi: /^\/\*[^*]/,
  comment_single: /^\/\//,
  annotation: /^@/,
  opener: /^[\[({]/,
  closer: /^[\])}]/,
});
exports.processJava = function (e) {
  let t = e;
  M_language_parser_utils_maybe.labelLines(t, s);
  t = M_language_parser_utils_maybe.combineClosersAndOpeners(t);
  t = M_language_parser_utils_maybe.flattenVirtual(t);
  M_language_parser_utils_maybe.labelVirtualInherited(t);
  M_TreeTraversalUtils_maybe.visitTree(
    t,
    (e) => {
      if ("class" === e.label || "interface" === e.label)
        for (const t of e.subs)
          if (
            M_TreeNodeUtils_maybe.isBlank(t) ||
            (undefined !== t.label && "annotation" !== t.label)
          ) {
            t.label = "member";
          }
    },
    "bottomUp"
  );
  return t;
};
