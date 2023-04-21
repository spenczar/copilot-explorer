Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(892);
const i = require(86236);
const o = require(9321);
const s = require(5381);
const a = require(91728);
const c = require(6159);
const l = n.Type.Object({
  testingCtx: n.Type.Number(),
  options: n.Type.Optional(n.Type.Object({})),
});
const u = new i.default().compile(n.Type.Strict(l));
exports.default = async function (e, t, r) {
  if (!u(r)) {
    const e = s.extractAjvErrors(u.errors);
    return [
      null,
      {
        code: s.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  c.getTestingContext(r.testingCtx).forceSet(
    o.AuthManager,
    new a.AlwaysAuthManager()
  );
  return ["OK", null];
};