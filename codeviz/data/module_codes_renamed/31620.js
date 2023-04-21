Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.telemetryExceptionMethod = undefined;
const M_TypeBox_maybe = require("TypeBox");
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_TelemetryReporterModule_maybe = require("TelemetryReporterModule");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const a = M_TypeBox_maybe.Type.Object({
  origin: M_TypeBox_maybe.Type.String(),
  stacktrace: M_TypeBox_maybe.Type.Optional(M_TypeBox_maybe.Type.String()),
  properties: M_TypeBox_maybe.Type.Optional(
    M_TypeBox_maybe.Type.Record(
      M_TypeBox_maybe.Type.String(),
      M_TypeBox_maybe.Type.String()
    )
  ),
});
const c = new M_schema_code_generator_maybe.default().compile(
  M_TypeBox_maybe.Type.Strict(a)
);
exports.telemetryExceptionMethod = async function (e, t, r) {
  if (!c(r)) {
    const e = M_AjvErrorManager_maybe.extractAjvErrors(c.errors);
    return [
      null,
      {
        code: M_AjvErrorManager_maybe.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  const n = new Error("Original stacktrace: " + r.stacktrace);
  n.stack = "";
  const i = r.properties || {};
  await M_TelemetryReporterModule_maybe.telemetryException(e, n, r.origin, i);
  return ["OK", null];
};
