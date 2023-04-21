Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.validateAdditionalItems = undefined;
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const o = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: {
    message: ({ params: { len: e } }) =>
      M_LanguageMarkerConstants_maybe.str`must NOT have more than ${e} items`,
    params: ({ params: { len: e } }) =>
      M_LanguageMarkerConstants_maybe._`{limit: ${e}}`,
  },
  code(e) {
    const { parentSchema: t, it: r } = e;
    const { items: n } = t;
    if (Array.isArray(n)) {
      validateAdditionalItems(e, n);
    } else {
      M_json_pointer_utils_maybe.checkStrictMode(
        r,
        '"additionalItems" is ignored when "items" is not an array of schemas'
      );
    }
  },
};
function validateAdditionalItems(e, t) {
  const { gen: r, schema: o, data: s, keyword: a, it: c } = e;
  c.items = true;
  const l = r.const("len", M_LanguageMarkerConstants_maybe._`${s}.length`);
  if (false === o) {
    e.setParams({
      len: t.length,
    });
    e.pass(M_LanguageMarkerConstants_maybe._`${l} <= ${t.length}`);
  } else if (
    "object" == typeof o &&
    !M_json_pointer_utils_maybe.alwaysValidSchema(c, o)
  ) {
    const o = r.var(
      "valid",
      M_LanguageMarkerConstants_maybe._`${l} <= ${t.length}`
    );
    r.if(M_LanguageMarkerConstants_maybe.not(o), () =>
      (function (o) {
        r.forRange("i", t.length, l, (t) => {
          e.subschema(
            {
              keyword: a,
              dataProp: t,
              dataPropType: M_json_pointer_utils_maybe.Type.Num,
            },
            o
          );
          if (c.allErrors) {
            r.if(M_LanguageMarkerConstants_maybe.not(o), () => r.break());
          }
        });
      })(o)
    );
    e.ok(o);
  }
}
exports.validateAdditionalItems = validateAdditionalItems;
exports.default = o;
