Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const M_ucs2Length_maybe = require("ucs2Length");
const s = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: true,
  error: {
    message({ keyword: e, schemaCode: t }) {
      const r = "maxLength" === e ? "more" : "fewer";
      return M_LanguageMarkerConstants_maybe.str`must NOT have ${r} than ${t} characters`;
    },
    params: ({ schemaCode: e }) =>
      M_LanguageMarkerConstants_maybe._`{limit: ${e}}`,
  },
  code(e) {
    const { keyword: t, data: r, schemaCode: s, it: a } = e;
    const c =
      "maxLength" === t
        ? M_LanguageMarkerConstants_maybe.operators.GT
        : M_LanguageMarkerConstants_maybe.operators.LT;
    const l =
      false === a.opts.unicode
        ? M_LanguageMarkerConstants_maybe._`${r}.length`
        : M_LanguageMarkerConstants_maybe._`${M_json_pointer_utils_maybe.useFunc(
            e.gen,
            M_ucs2Length_maybe.default
          )}(${r})`;
    e.fail$data(M_LanguageMarkerConstants_maybe._`${l} ${c} ${s}`);
  },
};
exports.default = s;
