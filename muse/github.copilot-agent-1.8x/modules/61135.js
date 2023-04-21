Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(15669);
const i = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: true,
  error: {
    message({ keyword: e, schemaCode: t }) {
      const r = "maxItems" === e ? "more" : "fewer";
      return n.str`must NOT have ${r} than ${t} items`;
    },
    params: ({ schemaCode: e }) => n._`{limit: ${e}}`,
  },
  code(e) {
    const { keyword: t, data: r, schemaCode: i } = e;
    const o = "maxItems" === t ? n.operators.GT : n.operators.LT;
    e.fail$data(n._`${r}.length ${o} ${i}`);
  },
};
exports.default = i;