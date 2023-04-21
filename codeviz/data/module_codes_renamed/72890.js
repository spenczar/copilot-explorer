Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.rebuildTree =
  exports.foldTree =
  exports.visitTreeConditionally =
  exports.visitTree =
  exports.resetLineNumbers =
  exports.mapLabels =
  exports.clearLabelsIf =
  exports.clearLabels =
    undefined;
const M_TreeNodeUtils_maybe = require("TreeNodeUtils");
function visitTree(e, t, r) {
  !(function e(n) {
    if ("topDown" === r) {
      t(n);
    }
    n.subs.forEach((t) => {
      e(t);
    });
    if ("bottomUp" === r) {
      t(n);
    }
  })(e);
}
exports.clearLabels = function (e) {
  visitTree(
    e,
    (e) => {
      e.label = undefined;
    },
    "bottomUp"
  );
  return e;
};
exports.clearLabelsIf = function (e, t) {
  visitTree(
    e,
    (e) => {
      e.label = e.label ? (t(e.label) ? undefined : e.label) : undefined;
    },
    "bottomUp"
  );
  return e;
};
exports.mapLabels = function e(t, r) {
  switch (t.type) {
    case "line":
    case "virtual":
      const n = t.subs.map((t) => e(t, r));
      return {
        ...t,
        subs: n,
        label: t.label ? r(t.label) : undefined,
      };
    case "blank":
      return {
        ...t,
        label: t.label ? r(t.label) : undefined,
      };
    case "top":
      return {
        ...t,
        subs: t.subs.map((t) => e(t, r)),
        label: t.label ? r(t.label) : undefined,
      };
  }
};
exports.resetLineNumbers = function (e) {
  let t = 0;
  visitTree(
    e,
    function (e) {
      if (
        M_TreeNodeUtils_maybe.isVirtual(e) ||
        M_TreeNodeUtils_maybe.isTop(e)
      ) {
        e.lineNumber = t;
        t++;
      }
    },
    "topDown"
  );
};
exports.visitTree = visitTree;
exports.visitTreeConditionally = function (e, t, r) {
  !(function e(n) {
    if ("topDown" === r && !t(n)) return false;
    let i = true;
    n.subs.forEach((t) => {
      i = i && e(t);
    });
    if ("bottomUp" === r) {
      i = i && t(n);
    }
    return i;
  })(e);
};
exports.foldTree = function (e, t, r, n) {
  let o = t;
  visitTree(
    e,
    function (e) {
      o = r(e, o);
    },
    n
  );
  return o;
};
exports.rebuildTree = function (e, t, r) {
  const i = (e) => {
    if (undefined !== r && r(e)) return e;
    {
      const r = e.subs.map(i).filter((e) => undefined !== e);
      e.subs = r;
      return t(e);
    }
  };
  const o = i(e);
  return undefined !== o ? o : M_TreeNodeUtils_maybe.topNode();
};
