Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(15669);
const i = require(88936);
const o = require(49161);
const s = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: true,
  error: {
    message({ keyword: e, schemaCode: t }) {
      const r = "maxLength" === e ? "more" : "fewer";
      return n.str`must NOT have ${r} than ${t} characters`;
    },
    params: ({ schemaCode: e }) => n._`{limit: ${e}}`,
  },
  code(e) {
    const { keyword: t, data: r, schemaCode: s, it: a } = e;
    const c = "maxLength" === t ? n.operators.GT : n.operators.LT;
    const l =
      false === a.opts.unicode
        ? n._`${r}.length`
        : n._`${i.useFunc(e.gen, o.default)}(${r})`;
    e.fail$data(n._`${l} ${c} ${s}`);
  },
};
exports.default = s;