Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(15669);
const i = require(88936);
const o = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: true,
  error: {
    message: ({ params: e }) => n.str`must match "${e.ifClause}" schema`,
    params: ({ params: e }) => n._`{failingKeyword: ${e.ifClause}}`,
  },
  code(e) {
    const { gen: t, parentSchema: r, it: o } = e;
    if (undefined === r.then && undefined === r.else) {
      i.checkStrictMode(o, '"if" without "then" and "else" is ignored');
    }
    const a = s(o, "then");
    const c = s(o, "else");
    if (!a && !c) return;
    const l = t.let("valid", true);
    const u = t.name("_valid");
    (function () {
      const t = e.subschema(
        {
          keyword: "if",
          compositeRule: true,
          createErrors: false,
          allErrors: false,
        },
        u
      );
      e.mergeEvaluated(t);
    })();
    e.reset();
    if (a && c) {
      const r = t.let("ifClause");
      e.setParams({
        ifClause: r,
      }),
        t.if(u, d("then", r), d("else", r));
    } else a ? t.if(u, d("then")) : t.if((0, n.not)(u), d("else"));
    function d(r, i) {
      return () => {
        const o = e.subschema(
          {
            keyword: r,
          },
          u
        );
        t.assign(l, u);
        e.mergeValidEvaluated(o, l);
        if (i) {
          t.assign(i, n._`${r}`);
        } else {
          e.setParams({
            ifClause: r,
          });
        }
      };
    }
    e.pass(l, () => e.error(true));
  },
};
function s(e, t) {
  const r = e.schema[t];
  return undefined !== r && !i.alwaysValidSchema(e, r);
}
exports.default = o;