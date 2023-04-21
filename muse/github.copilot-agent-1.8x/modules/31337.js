Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(15669);
const i = n.operators;
const o = {
  maximum: {
    okStr: "<=",
    ok: i.LTE,
    fail: i.GT,
  },
  minimum: {
    okStr: ">=",
    ok: i.GTE,
    fail: i.LT,
  },
  exclusiveMaximum: {
    okStr: "<",
    ok: i.LT,
    fail: i.GTE,
  },
  exclusiveMinimum: {
    okStr: ">",
    ok: i.GT,
    fail: i.LTE,
  },
};
const s = {
  message: ({ keyword: e, schemaCode: t }) => n.str`must be ${o[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) =>
    n._`{comparison: ${o[e].okStr}, limit: ${t}}`,
};
const a = {
  keyword: Object.keys(o),
  type: "number",
  schemaType: "number",
  $data: true,
  error: s,
  code(e) {
    const { keyword: t, data: r, schemaCode: i } = e;
    e.fail$data(n._`${r} ${o[t].fail} ${i} || isNaN(${r})`);
  },
};
exports.default = a;