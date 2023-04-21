Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getWindowsDelineations = undefined;
const M_language_parser_utils_maybe = require("language-parser-utils");
const M_TreeTraversalUtils_maybe = require("TreeTraversalUtils");
exports.getWindowsDelineations = function (e, t, r, o) {
  if (e.length < r || 0 == o) return [];
  const s = [];
  const a = M_TreeTraversalUtils_maybe.clearLabels(
    M_language_parser_utils_maybe.parseTree(e.join("\n"), t)
  );
  M_TreeTraversalUtils_maybe.visitTree(
    a,
    (e) => {
      if ("blank" === e.type)
        return void (e.label = {
          totalLength: 1,
          firstLineAfter: e.lineNumber + 1,
        });
      let t = "line" === e.type ? 1 : 0;
      let n = "line" === e.type ? e.lineNumber + 1 : NaN;
      function i(r) {
        return -1 == r
          ? n - t
          : e.subs[r].label.firstLineAfter - e.subs[r].label.totalLength;
      }
      function a(t, r) {
        return 0 == t ? r + 1 : e.subs[t - 1].label.firstLineAfter;
      }
      let c = "line" === e.type ? -1 : 0;
      let l = "line" === e.type ? 1 : 0;
      let u = 0;
      for (let d = 0; d < e.subs.length; d++) {
        for (; c >= 0 && c < e.subs.length && "blank" === e.subs[c].type; ) {
          l -= e.subs[c].label.totalLength;
          c++;
        }
        if ("blank" !== e.subs[d].type) {
          u = d;
        }
        n = e.subs[d].label.firstLineAfter;
        t += e.subs[d].label.totalLength;
        l += e.subs[d].label.totalLength;
        if (l > o) {
          const t = i(c),
            n = a(d, t),
            p = u == d ? n : a(u, t);
          for (r <= n - t && s.push([t, p]); l > o; )
            (l -=
              -1 == c
                ? "line" == e.type
                  ? 1
                  : 0
                : e.subs[c].label.totalLength),
              c++;
        }
      }
      if (c < e.subs.length) {
        const t = i(c);
        const o = n;
        const a = -1 == c ? o : e.subs[u].label.firstLineAfter;
        if (r <= o - t) {
          s.push([t, a]);
        }
      }
      e.label = {
        totalLength: t,
        firstLineAfter: n,
      };
    },
    "bottomUp"
  );
  return s
    .sort((e, t) => e[0] - t[0] || e[1] - t[1])
    .filter((e, t, r) => 0 == t || e[0] != r[t - 1][0] || e[1] != r[t - 1][1]);
};
