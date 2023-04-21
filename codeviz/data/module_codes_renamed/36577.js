Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const M_ajv_runtime_equal_module_maybe = require("ajv-runtime-equal-module");
const s = {
  keyword: "const",
  $data: true,
  error: {
    message: "must be equal to constant",
    params: ({ schemaCode: e }) =>
      M_LanguageMarkerConstants_maybe._`{allowedValue: ${e}}`,
  },
  code(e) {
    const { gen: t, data: r, $data: s, schemaCode: a, schema: c } = e;
    if (s || (c && "object" == typeof c)) {
      e.fail$data(
        M_LanguageMarkerConstants_maybe._`!${M_json_pointer_utils_maybe.useFunc(
          t,
          M_ajv_runtime_equal_module_maybe.default
        )}(${r}, ${a})`
      );
    } else {
      e.fail(M_LanguageMarkerConstants_maybe._`${c} !== ${r}`);
    }
  },
};
exports.default = s;
