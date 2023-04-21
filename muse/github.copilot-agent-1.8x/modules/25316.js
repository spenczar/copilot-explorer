Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(88936);
const i = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    if (undefined === t.if) {
      n.checkStrictMode(r, `"${e}" without "if" is ignored`);
    }
  },
};
exports.default = i;