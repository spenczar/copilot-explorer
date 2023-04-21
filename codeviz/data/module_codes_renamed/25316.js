Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const i = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    if (undefined === t.if) {
      M_json_pointer_utils_maybe.checkStrictMode(
        r,
        `"${e}" without "if" is ignored`
      );
    }
  },
};
exports.default = i;
