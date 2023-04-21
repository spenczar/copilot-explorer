Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const o = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: true,
  error: {
    message: ({ params: e }) =>
      M_LanguageMarkerConstants_maybe.str`must match "${e.ifClause}" schema`,
    params: ({ params: e }) =>
      M_LanguageMarkerConstants_maybe._`{failingKeyword: ${e.ifClause}}`,
  },
  code(e) {
    const { gen: t, parentSchema: r, it: o } = e;
    if (undefined === r.then && undefined === r.else) {
      M_json_pointer_utils_maybe.checkStrictMode(
        o,
        '"if" without "then" and "else" is ignored'
      );
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
    } else
      a
        ? t.if(u, d("then"))
        : t.if((0, M_LanguageMarkerConstants_maybe.not)(u), d("else"));
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
          t.assign(i, M_LanguageMarkerConstants_maybe._`${r}`);
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
  return undefined !== r && !M_json_pointer_utils_maybe.alwaysValidSchema(e, r);
}
exports.default = o;
