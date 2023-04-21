Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.telemetryExceptionMethod = undefined;
const n = require(892);
const i = require(86236);
const o = require(65489);
const s = require(5381);
const a = n.Type.Object({
  origin: n.Type.String(),
  stacktrace: n.Type.Optional(n.Type.String()),
  properties: n.Type.Optional(n.Type.Record(n.Type.String(), n.Type.String())),
});
const c = new i.default().compile(n.Type.Strict(a));
exports.telemetryExceptionMethod = async function (e, t, r) {
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
  const n = new Error("Original stacktrace: " + r.stacktrace);
  n.stack = "";
  const i = r.properties || {};
  await o.telemetryException(e, n, r.origin, i);
  return ["OK", null];
};