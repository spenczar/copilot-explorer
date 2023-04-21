Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.notifyShown = undefined;
const n = require(892);
const i = require(86236);
const o = require(40702);
const s = require(41749);
const a = require(53007);
const c = require(5381);
const l = require(6159);
const u = require(56056);
const d = n.Type.Object({
  uuid: n.Type.String({
    minLength: 1,
  }),
  options: n.Type.Optional(u.TestingOptions),
});
const p = new i.default().compile(n.Type.Strict(d));
exports.notifyShown = async function (e, t, r) {
  if (!p(r)) {
    const e = c.extractAjvErrors(p.errors);
    return [
      null,
      {
        code: c.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  if (undefined !== r.options?.testingCtx) {
    e = l.getTestingContext(r.options.testingCtx);
  }
  const n = e.get(a.CopilotCompletionCache).get(r.uuid);
  if (n) {
    const t = !(n.resultType === o.ResultType.Network);
    s.telemetryShown(e, "ghostText", n.telemetry, t);
  }
  return ["OK", null];
};