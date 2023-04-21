Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(88936);
const i = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: i } = e;
    if (!Array.isArray(r)) throw new Error("ajv implementation error");
    const o = t.name("valid");
    r.forEach((t, r) => {
      if (n.alwaysValidSchema(i, t)) return;
      const s = e.subschema(
        {
          keyword: "allOf",
          schemaProp: r,
        },
        o
      );
      e.ok(o);
      e.mergeEvaluated(s);
    });
  },
};
exports.default = i;