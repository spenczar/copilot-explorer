Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(15669);
const i = require(88936);
const o = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: true,
  error: {
    message: "must match exactly one schema in oneOf",
    params: ({ params: e }) => n._`{passingSchemas: ${e.passing}}`,
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
        if (i.alwaysValidSchema(s, r)) {
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
          t.if(n._`${u} && ${c}`)
            .assign(c, false)
            .assign(l, n._`[${l}, ${o}]`)
            .else();
        }
        t.if(u, () => {
          t.assign(c, true);
          t.assign(l, o);
          if (a) {
            e.mergeEvaluated(a, n.Name);
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