Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(892);
const i = require(86236);
const o = require(9321);
const s = require(5381);
const a = require(6159);
const c = require(56056);
const l = n.Type.Object({
  options: n.Type.Optional(
    n.Type.Intersect([
      n.Type.Object({
        localChecksOnly: n.Type.Optional(n.Type.Boolean()),
      }),
      c.TestingOptions,
    ])
  ),
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
  if (undefined !== r.options?.testingCtx) {
    e = a.getTestingContext(r.options.testingCtx);
  }
  return [await e.get(o.AuthManager).checkAndUpdateStatus(e, r.options), null];
};