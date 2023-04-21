Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(15669);
const i = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: true,
  error: {
    message({ keyword: e, schemaCode: t }) {
      const r = "maxProperties" === e ? "more" : "fewer";
      return n.str`must NOT have ${r} than ${t} properties`;
    },
    params: ({ schemaCode: e }) => n._`{limit: ${e}}`,
  },
  code(e) {
    const { keyword: t, data: r, schemaCode: i } = e;
    const o = "maxProperties" === t ? n.operators.GT : n.operators.LT;
    e.fail$data(n._`Object.keys(${r}).length ${o} ${i}`);
  },
};
exports.default = i;