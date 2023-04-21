Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const i = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: true,
  error: {
    message: ({ schemaCode: e }) =>
      M_LanguageMarkerConstants_maybe.str`must be multiple of ${e}`,
    params: ({ schemaCode: e }) =>
      M_LanguageMarkerConstants_maybe._`{multipleOf: ${e}}`,
  },
  code(e) {
    const { gen: t, data: r, schemaCode: i, it: o } = e;
    const s = o.opts.multipleOfPrecision;
    const a = t.let("res");
    const c = s
      ? M_LanguageMarkerConstants_maybe._`Math.abs(Math.round(${a}) - ${a}) > 1e-${s}`
      : M_LanguageMarkerConstants_maybe._`${a} !== parseInt(${a})`;
    e.fail$data(
      M_LanguageMarkerConstants_maybe._`(${i} === 0 || (${a} = ${r}/${i}, ${c}))`
    );
  },
};
exports.default = i;
