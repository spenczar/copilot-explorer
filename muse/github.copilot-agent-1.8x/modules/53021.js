Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(15669);
const i = require(88936);
const o = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: {
    message: "property name must be valid",
    params: ({ params: e }) => n._`{propertyName: ${e.propertyName}}`,
  },
  code(e) {
    const { gen: t, schema: r, data: o, it: s } = e;
    if (i.alwaysValidSchema(s, r)) return;
    const a = t.name("valid");
    t.forIn("key", o, (r) => {
      e.setParams({
        propertyName: r,
      });
      e.subschema(
        {
          keyword: "propertyNames",
          data: r,
          dataTypes: ["string"],
          propertyName: r,
          compositeRule: true,
        },
        a
      );
      t.if(n.not(a), () => {
        e.error(true);
        if (s.allErrors) {
          t.break();
        }
      });
    });
    e.ok(a);
  },
};
exports.default = o;