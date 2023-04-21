Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const i = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: true,
  error: {
    message({ keyword: e, schemaCode: t }) {
      const r = "maxItems" === e ? "more" : "fewer";
      return M_LanguageMarkerConstants_maybe.str`must NOT have ${r} than ${t} items`;
    },
    params: ({ schemaCode: e }) =>
      M_LanguageMarkerConstants_maybe._`{limit: ${e}}`,
  },
  code(e) {
    const { keyword: t, data: r, schemaCode: i } = e;
    const o =
      "maxItems" === t
        ? M_LanguageMarkerConstants_maybe.operators.GT
        : M_LanguageMarkerConstants_maybe.operators.LT;
    e.fail$data(M_LanguageMarkerConstants_maybe._`${r}.length ${o} ${i}`);
  },
};
exports.default = i;
