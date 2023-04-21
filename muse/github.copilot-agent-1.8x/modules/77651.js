Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.processJava = undefined;
const n = require(34990);
const i = require(72890);
const o = require(12563);
const s = o.buildLabelRules({
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
  o.labelLines(t, s);
  t = o.combineClosersAndOpeners(t);
  t = o.flattenVirtual(t);
  o.labelVirtualInherited(t);
  i.visitTree(
    t,
    (e) => {
      if ("class" === e.label || "interface" === e.label)
        for (const t of e.subs)
          if (
            n.isBlank(t) ||
            (undefined !== t.label && "annotation" !== t.label)
          ) {
            t.label = "member";
          }
    },
    "bottomUp"
  );
  return t;
};