Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.validateAdditionalItems = undefined;
const n = require(15669);
const i = require(88936);
const o = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: {
    message: ({ params: { len: e } }) =>
      n.str`must NOT have more than ${e} items`,
    params: ({ params: { len: e } }) => n._`{limit: ${e}}`,
  },
  code(e) {
    const { parentSchema: t, it: r } = e;
    const { items: n } = t;
    if (Array.isArray(n)) {
      validateAdditionalItems(e, n);
    } else {
      i.checkStrictMode(
        r,
        '"additionalItems" is ignored when "items" is not an array of schemas'
      );
    }
  },
};
function validateAdditionalItems(e, t) {
  const { gen: r, schema: o, data: s, keyword: a, it: c } = e;
  c.items = true;
  const l = r.const("len", n._`${s}.length`);
  if (false === o) {
    e.setParams({
      len: t.length,
    });
    e.pass(n._`${l} <= ${t.length}`);
  } else if ("object" == typeof o && !i.alwaysValidSchema(c, o)) {
    const o = r.var("valid", n._`${l} <= ${t.length}`);
    r.if(n.not(o), () =>
      (function (o) {
        r.forRange("i", t.length, l, (t) => {
          e.subschema(
            {
              keyword: a,
              dataProp: t,
              dataPropType: i.Type.Num,
            },
            o
          );
          if (c.allErrors) {
            r.if(n.not(o), () => r.break());
          }
        });
      })(o)
    );
    e.ok(o);
  }
}
exports.validateAdditionalItems = validateAdditionalItems;
exports.default = o;