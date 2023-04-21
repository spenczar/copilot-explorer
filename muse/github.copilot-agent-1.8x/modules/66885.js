Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(892);
const i = require(86236);
const o = require(9321);
const s = require(5381);
const a = n.Type.Object({
  options: n.Type.Optional(n.Type.Object({})),
});
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
  const n = e.get(o.AuthManager).getPendingSignIn();
  if (undefined === n)
    return [
      null,
      {
        code: s.ErrorCode.InvalidRequest,
        message: "No pending sign in",
      },
    ];
  let i;
  try {
    i = await n;
    return [i, null];
  } catch (e) {
    return [
      null,
      {
        code: s.ErrorCode.DeviceFlowFailed,
        message: e.toString(),
      },
    ];
  } finally {
    e.get(o.AuthManager).setPendingSignIn(undefined);
  }
};