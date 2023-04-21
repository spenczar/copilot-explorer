Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(88936);
const i = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: true,
  code(e) {
    const { gen: t, schema: r, it: i } = e;
    if (n.alwaysValidSchema(i, r)) return void e.fail();
    const o = t.name("valid");
    e.subschema(
      {
        keyword: "not",
        compositeRule: true,
        createErrors: false,
        allErrors: false,
      },
      o
    );
    e.failResult(
      o,
      () => e.reset(),
      () => e.error()
    );
  },
  error: {
    message: "must NOT be valid",
  },
};
exports.default = i;