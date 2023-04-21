Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const i = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: i } = e;
    if (!Array.isArray(r)) throw new Error("ajv implementation error");
    const o = t.name("valid");
    r.forEach((t, r) => {
      if (M_json_pointer_utils_maybe.alwaysValidSchema(i, t)) return;
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
