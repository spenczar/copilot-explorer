Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const o = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: {
    message: "property name must be valid",
    params: ({ params: e }) =>
      M_LanguageMarkerConstants_maybe._`{propertyName: ${e.propertyName}}`,
  },
  code(e) {
    const { gen: t, schema: r, data: o, it: s } = e;
    if (M_json_pointer_utils_maybe.alwaysValidSchema(s, r)) return;
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
      t.if(M_LanguageMarkerConstants_maybe.not(a), () => {
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
