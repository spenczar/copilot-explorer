Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(15669);
const i = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: true,
  error: {
    message: ({ schemaCode: e }) => n.str`must be multiple of ${e}`,
    params: ({ schemaCode: e }) => n._`{multipleOf: ${e}}`,
  },
  code(e) {
    const { gen: t, data: r, schemaCode: i, it: o } = e;
    const s = o.opts.multipleOfPrecision;
    const a = t.let("res");
    const c = s
      ? n._`Math.abs(Math.round(${a}) - ${a}) > 1e-${s}`
      : n._`${a} !== parseInt(${a})`;
    e.fail$data(n._`(${i} === 0 || (${a} = ${r}/${i}, ${c}))`);
  },
};
exports.default = i;