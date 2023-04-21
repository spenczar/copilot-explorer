Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(892);
const i = require(86236);
const o = require(39800);
const s = require(5381);
const a = n.Type.Object({});
const c = new i.default().compile(n.Type.Strict(a));
exports.default = async function (e, t, r) {
  if (!c(r)) {
    const e = s.extractAjvErrors(c.errors);
    return [
      null,
      {
        code: s.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  return [
    {
      version: o.getVersion(e),
    },
    null,
  ];
};