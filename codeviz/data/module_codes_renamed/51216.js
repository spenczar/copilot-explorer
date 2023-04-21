Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_ValidationUtils_maybe = require("ValidationUtils");
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const o = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: true,
  error: {
    message: ({ schemaCode: e }) =>
      M_LanguageMarkerConstants_maybe.str`must match pattern "${e}"`,
    params: ({ schemaCode: e }) =>
      M_LanguageMarkerConstants_maybe._`{pattern: ${e}}`,
  },
  code(e) {
    const { data: t, $data: r, schema: o, schemaCode: s, it: a } = e;
    const c = a.opts.unicodeRegExp ? "u" : "";
    const l = r
      ? M_LanguageMarkerConstants_maybe._`(new RegExp(${s}, ${c}))`
      : M_ValidationUtils_maybe.usePattern(e, o);
    e.fail$data(M_LanguageMarkerConstants_maybe._`!${l}.test(${t})`);
  },
};
exports.default = o;
