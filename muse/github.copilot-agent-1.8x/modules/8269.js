Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(892);
const i = require(86236);
const o = require(5381);
const s = require(6159);
const a = n.Type.Object({
  options: n.Type.Optional(n.Type.Object({})),
});
const c = new i.default().compile(n.Type.Strict(a));
exports.default = async function (e, t, r) {
  if (!c(r)) {
    const e = o.extractAjvErrors(c.errors);
    return [
      null,
      {
        code: o.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  return [s.newTestingContext(e), null];
};