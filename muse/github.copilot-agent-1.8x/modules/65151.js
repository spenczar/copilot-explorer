Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(15669);
const i = require(88936);
const o = require(3499);
const s = require(78891);
const a = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: {
    message: ({ params: { len: e } }) =>
      n.str`must NOT have more than ${e} items`,
    params: ({ params: { len: e } }) => n._`{limit: ${e}}`,
  },
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e;
    const { prefixItems: a } = r;
    n.items = true;
    if (i.alwaysValidSchema(n, t)) {
      if (a) {
        s.validateAdditionalItems(e, a);
      } else {
        e.ok(o.validateArray(e));
      }
    }
  },
};
exports.default = a;