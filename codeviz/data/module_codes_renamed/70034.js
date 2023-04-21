Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const i = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: true,
  error: {
    message({ keyword: e, schemaCode: t }) {
      const r = "maxProperties" === e ? "more" : "fewer";
      return M_LanguageMarkerConstants_maybe.str`must NOT have ${r} than ${t} properties`;
    },
    params: ({ schemaCode: e }) =>
      M_LanguageMarkerConstants_maybe._`{limit: ${e}}`,
  },
  code(e) {
    const { keyword: t, data: r, schemaCode: i } = e;
    const o =
      "maxProperties" === t
        ? M_LanguageMarkerConstants_maybe.operators.GT
        : M_LanguageMarkerConstants_maybe.operators.LT;
    e.fail$data(
      M_LanguageMarkerConstants_maybe._`Object.keys(${r}).length ${o} ${i}`
    );
  },
};
exports.default = i;
