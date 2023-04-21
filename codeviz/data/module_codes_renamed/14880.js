Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const o = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: true,
  error: {
    message: "must match exactly one schema in oneOf",
    params: ({ params: e }) =>
      M_LanguageMarkerConstants_maybe._`{passingSchemas: ${e.passing}}`,
  },
  code(e) {
    const { gen: t, schema: r, parentSchema: o, it: s } = e;
    if (!Array.isArray(r)) throw new Error("ajv implementation error");
    if (s.opts.discriminator && o.discriminator) return;
    const a = r;
    const c = t.let("valid", false);
    const l = t.let("passing", null);
    const u = t.name("_valid");
    e.setParams({
      passing: l,
    });
    t.block(function () {
      a.forEach((r, o) => {
        let a;
        if (M_json_pointer_utils_maybe.alwaysValidSchema(s, r)) {
          t.var(u, true);
        } else {
          a = e.subschema(
            {
              keyword: "oneOf",
              schemaProp: o,
              compositeRule: true,
            },
            u
          );
        }
        if (o > 0) {
          t.if(M_LanguageMarkerConstants_maybe._`${u} && ${c}`)
            .assign(c, false)
            .assign(l, M_LanguageMarkerConstants_maybe._`[${l}, ${o}]`)
            .else();
        }
        t.if(u, () => {
          t.assign(c, true);
          t.assign(l, o);
          if (a) {
            e.mergeEvaluated(a, M_LanguageMarkerConstants_maybe.Name);
          }
        });
      });
    });
    e.result(
      c,
      () => e.reset(),
      () => e.error(true)
    );
  },
};
exports.default = o;
