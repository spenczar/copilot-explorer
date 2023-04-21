Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(15669);
const i = require(88936);
const o = require(94285);
const s = {
  keyword: "const",
  $data: true,
  error: {
    message: "must be equal to constant",
    params: ({ schemaCode: e }) => n._`{allowedValue: ${e}}`,
  },
  code(e) {
    const { gen: t, data: r, $data: s, schemaCode: a, schema: c } = e;
    if (s || (c && "object" == typeof c)) {
      e.fail$data(n._`!${i.useFunc(t, o.default)}(${r}, ${a})`);
    } else {
      e.fail(n._`${c} !== ${r}`);
    }
  },
};
exports.default = s;