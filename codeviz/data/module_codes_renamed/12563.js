Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.parseTree =
  exports.registerLanguageSpecificParser =
  exports.flattenVirtual =
  exports.groupBlocks =
  exports.combineClosersAndOpeners =
  exports.buildLabelRules =
  exports.labelVirtualInherited =
  exports.labelLines =
  exports.parseRaw =
    undefined;
const M_TreeNodeUtils_maybe = require("TreeNodeUtils");
const M_TreeTraversalUtils_maybe = require("TreeTraversalUtils");
function parseRaw(e) {
  const t = e.split("\n");
  const r = t.map((e) => e.match(/^\s*/)[0].length);
  const i = t.map((e) => e.trimLeft());
  function o(e) {
    const [t, o] = s(e + 1, r[e]);
    return [M_TreeNodeUtils_maybe.lineNode(r[e], e, i[e], t), o];
  }
  function s(e, t) {
    let s;
    const a = [];
    let c;
    let l = e;
    for (; l < i.length && ("" === i[l] || r[l] > t); )
      if ("" === i[l]) {
        if (undefined === c) {
          c = l;
        }
        l += 1;
      } else {
        if (undefined !== c) {
          for (let e = c; e < l; e++)
            a.push(M_TreeNodeUtils_maybe.blankNode(e));
          c = undefined;
        }
        [s, l] = o(l);
        a.push(s);
      }
    if (undefined !== c) {
      l = c;
    }
    return [a, l];
  }
  const [a, c] = s(0, -1);
  let l = c;
  for (; l < i.length && "" === i[l]; ) {
    a.push(M_TreeNodeUtils_maybe.blankNode(l));
    l += 1;
  }
  if (l < i.length)
    throw new Error(
      `Parsing did not go to end of file. Ended at ${l} out of ${i.length}`
    );
  return M_TreeNodeUtils_maybe.topNode(a);
}
function labelLines(e, t) {
  M_TreeTraversalUtils_maybe.visitTree(
    e,
    function (e) {
      if (M_TreeNodeUtils_maybe.isLine(e)) {
        const r = t.find((t) => t.matches(e.sourceLine));
        if (r) {
          e.label = r.label;
        }
      }
    },
    "bottomUp"
  );
}
function buildLabelRules(e) {
  return Object.keys(e).map((t) => {
    let r;
    r = e[t].test ? (r) => e[t].test(r) : e[t];
    return {
      matches: r,
      label: t,
    };
  });
}
function combineClosersAndOpeners(e) {
  const t = M_TreeTraversalUtils_maybe.rebuildTree(e, function (e) {
    if (
      0 === e.subs.length ||
      -1 ===
        e.subs.findIndex((e) => "closer" === e.label || "opener" === e.label)
    )
      return e;
    const t = [];
    let r;
    for (let i = 0; i < e.subs.length; i++) {
      const o = e.subs[i];
      const s = e.subs[i - 1];
      if (
        "opener" === o.label &&
        undefined !== s &&
        M_TreeNodeUtils_maybe.isLine(s)
      ) {
        s.subs.push(o);
        o.subs.forEach((e) => s.subs.push(e));
        o.subs = [];
      } else if (
        "closer" === o.label &&
        undefined !== r &&
        (M_TreeNodeUtils_maybe.isLine(o) ||
          M_TreeNodeUtils_maybe.isVirtual(o)) &&
        o.indentation >= r.indentation
      ) {
        let e = t.length - 1;
        for (; e > 0 && M_TreeNodeUtils_maybe.isBlank(t[e]); ) e -= 1;
        r.subs.push(...t.splice(e + 1));
        if (o.subs.length > 0) {
          const e = r.subs.findIndex((e) => "newVirtual" !== e.label),
            t = r.subs.slice(0, e),
            i = r.subs.slice(e),
            s =
              i.length > 0
                ? [
                    (0, M_TreeNodeUtils_maybe.virtualNode)(
                      o.indentation,
                      i,
                      "newVirtual"
                    ),
                  ]
                : [];
          r.subs = [...t, ...s, o];
        } else r.subs.push(o);
      } else {
        t.push(o);
        if (M_TreeNodeUtils_maybe.isBlank(o)) {
          r = o;
        }
      }
    }
    e.subs = t;
    return e;
  });
  M_TreeTraversalUtils_maybe.clearLabelsIf(e, (e) => "newVirtual" === e);
  return t;
}
exports.parseRaw = parseRaw;
exports.labelLines = labelLines;
exports.labelVirtualInherited = function (e) {
  M_TreeTraversalUtils_maybe.visitTree(
    e,
    function (e) {
      if (M_TreeNodeUtils_maybe.isVirtual(e) && undefined === e.label) {
        const t = e.subs.filter((e) => !M_TreeNodeUtils_maybe.isBlank(e));
        if (1 === t.length) {
          e.label = t[0].label;
        }
      }
    },
    "bottomUp"
  );
};
exports.buildLabelRules = buildLabelRules;
exports.combineClosersAndOpeners = combineClosersAndOpeners;
exports.groupBlocks = function (e, t = M_TreeNodeUtils_maybe.isBlank, r) {
  return M_TreeTraversalUtils_maybe.rebuildTree(e, function (e) {
    if (e.subs.length <= 1) return e;
    const i = [];
    let o;
    let s = [];
    let a = false;
    function c(e = false) {
      if (undefined !== o && (i.length > 0 || !e)) {
        const e = M_TreeNodeUtils_maybe.virtualNode(o, s, r);
        i.push(e);
      } else s.forEach((e) => i.push(e));
    }
    for (let r = 0; r < e.subs.length; r++) {
      const i = e.subs[r];
      const l = t(i);
      if (!l && a) {
        c();
        s = [];
      }
      a = l;
      s.push(i);
      if (M_TreeNodeUtils_maybe.isBlank(i)) {
        o = o ?? i.indentation;
      }
    }
    c(true);
    e.subs = i;
    return e;
  });
};
exports.flattenVirtual = function (e) {
  return M_TreeTraversalUtils_maybe.rebuildTree(e, function (e) {
    return M_TreeNodeUtils_maybe.isVirtual(e) &&
      undefined === e.label &&
      e.subs.length <= 1
      ? 0 === e.subs.length
        ? undefined
        : e.subs[0]
      : (1 === e.subs.length &&
          M_TreeNodeUtils_maybe.isVirtual(e.subs[0]) &&
          undefined === e.subs[0].label &&
          (e.subs = e.subs[0].subs),
        e);
  });
};
const l = buildLabelRules({
  opener: /^[\[({]/,
  closer: /^[\])}]/,
});
const u = {};
exports.registerLanguageSpecificParser = function (e, t) {
  u[e] = t;
};
exports.parseTree = function (e, t) {
  const r = parseRaw(e);
  const n = u[t ?? ""];
  return n ? n(r) : (labelLines(r, l), combineClosersAndOpeners(r));
};
