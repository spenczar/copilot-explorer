Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.lastLineOf =
  exports.firstLineOf =
  exports.encodeTree =
  exports.describeTree =
  exports.deparseAndCutTree =
  exports.deparseTree =
  exports.deparseLine =
    undefined;
const n = require(34990);
const i = require(72890);
function deparseLine(e) {
  return " ".repeat(e.indentation) + e.sourceLine + "\n";
}
function deparseTree(e) {
  return i.foldTree(
    e,
    "",
    function (e, t) {
      let r = "";
      if (n.isLine(e)) {
        r = deparseLine(e);
      } else {
        if (n.isBlank(e)) {
          r = "\n";
        }
      }
      return t + r;
    },
    "topDown"
  );
}
exports.deparseLine = deparseLine;
exports.deparseTree = deparseTree;
exports.deparseAndCutTree = function (e, t) {
  const r = new Set(t);
  const i = [];
  let a = "";
  (function e(t) {
    if (undefined !== t.label && r.has(t.label)) {
      if ("" !== a) {
        i.push({
          label: undefined,
          source: a,
        });
      }
      i.push({
        label: t.label,
        source: deparseTree(t),
      });
      a = "";
    } else {
      if (n.isLine(t)) {
        a += deparseLine(t);
      }
      t.subs.forEach(e);
    }
  })(e);
  if ("" !== a) {
    i.push({
      label: undefined,
      source: a,
    });
  }
  return i;
};
exports.describeTree = function e(t, r = 0) {
  const i = " ".repeat(r);
  if (undefined === t) return "UNDEFINED NODE";
  let o;
  o =
    undefined === t.subs
      ? "UNDEFINED SUBS"
      : t.subs.map((t) => e(t, r + 2)).join(",\n");
  o = "" === o ? "[]" : `[\n${o}\n      ${i}]`;
  const s =
    (n.isVirtual(t) || n.isTop(t)
      ? "   "
      : String(t.lineNumber).padStart(3, " ")) + `:  ${i}`;
  const a = undefined === t.label ? "" : JSON.stringify(t.label);
  return n.isVirtual(t) || n.isTop(t)
    ? `${s}vnode(${t.indentation}, ${a}, ${o})`
    : n.isBlank(t)
    ? `${s}blank(${a ?? ""})`
    : `${s}lnode(${t.indentation}, ${a}, ${JSON.stringify(
        t.sourceLine
      )}, ${o})`;
};
exports.encodeTree = function e(t, r = "") {
  const i = undefined === t.label ? "" : `, ${JSON.stringify(t.label)}`;
  const o =
    !n.isBlank(t) && t.subs.length > 0
      ? `[\n${t.subs.map((t) => e(t, r + "  ")).join(", \n")}\n${r}]`
      : "[]";
  switch (t.type) {
    case "blank":
      return `${r}blankNode(${t.lineNumber}${i})`;
    case "top":
      return `topNode(${o}${i})`;
    case "virtual":
      return `${r}virtualNode(${t.indentation}, ${o}${i})`;
    case "line":
      return `${r}lineNode(${t.indentation}, ${t.lineNumber}, "${t.sourceLine}", ${o}${i})`;
  }
};
exports.firstLineOf = function e(t) {
  if (n.isLine(t) || n.isBlank(t)) return t.lineNumber;
  for (const r of t.subs) {
    const t = e(r);
    if (undefined !== t) return t;
  }
};
exports.lastLineOf = function e(t) {
  let r;
  let i = t.subs.length - 1;
  for (; i >= 0 && undefined === r; ) {
    r = e(t.subs[i]);
    i--;
  }
  return undefined !== r || n.isVirtual(t) || n.isTop(t) ? r : t.lineNumber;
};