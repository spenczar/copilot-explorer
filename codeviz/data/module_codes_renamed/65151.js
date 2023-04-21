Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const M_ValidationUtils_maybe = require("ValidationUtils");
const M_additional_items_validator_maybe = require("additional-items-validator");
const a = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: {
    message: ({ params: { len: e } }) =>
      M_LanguageMarkerConstants_maybe.str`must NOT have more than ${e} items`,
    params: ({ params: { len: e } }) =>
      M_LanguageMarkerConstants_maybe._`{limit: ${e}}`,
  },
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e;
    const { prefixItems: a } = r;
    n.items = true;
    if (M_json_pointer_utils_maybe.alwaysValidSchema(n, t)) {
      if (a) {
        M_additional_items_validator_maybe.validateAdditionalItems(e, a);
      } else {
        e.ok(M_ValidationUtils_maybe.validateArray(e));
      }
    }
  },
};
exports.default = a;
