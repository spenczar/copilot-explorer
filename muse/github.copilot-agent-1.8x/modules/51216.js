Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(3499);
const i = require(15669);
const o = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: true,
  error: {
    message: ({ schemaCode: e }) => i.str`must match pattern "${e}"`,
    params: ({ schemaCode: e }) => i._`{pattern: ${e}}`,
  },
  code(e) {
    const { data: t, $data: r, schema: o, schemaCode: s, it: a } = e;
    const c = a.opts.unicodeRegExp ? "u" : "";
    const l = r ? i._`(new RegExp(${s}, ${c}))` : n.usePattern(e, o);
    e.fail$data(i._`!${l}.test(${t})`);
  },
};
exports.default = o;