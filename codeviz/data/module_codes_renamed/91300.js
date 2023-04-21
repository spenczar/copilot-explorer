Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.notifyShown = undefined;
const M_TypeBox_maybe = require("TypeBox");
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_GhostTextManager_maybe = require("GhostTextManager");
const M_ghost_text_telemetry_utils_maybe = require("ghost-text-telemetry-utils");
const M_CopilotCompletionCacheManager_maybe = require("CopilotCompletionCacheManager");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const M_TestContextManager_maybe = require("TestContextManager");
const M_TestingOptionsManager_maybe = require("TestingOptionsManager");
const d = M_TypeBox_maybe.Type.Object({
  uuid: M_TypeBox_maybe.Type.String({
    minLength: 1,
  }),
  options: M_TypeBox_maybe.Type.Optional(
    M_TestingOptionsManager_maybe.TestingOptions
  ),
});
const p = new M_schema_code_generator_maybe.default().compile(
  M_TypeBox_maybe.Type.Strict(d)
);
exports.notifyShown = async function (e, t, r) {
  if (!p(r)) {
    const e = M_AjvErrorManager_maybe.extractAjvErrors(p.errors);
    return [
      null,
      {
        code: M_AjvErrorManager_maybe.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  if (undefined !== r.options?.testingCtx) {
    e = M_TestContextManager_maybe.getTestingContext(r.options.testingCtx);
  }
  const n = e
    .get(M_CopilotCompletionCacheManager_maybe.CopilotCompletionCache)
    .get(r.uuid);
  if (n) {
    const t = !(n.resultType === M_GhostTextManager_maybe.ResultType.Network);
    M_ghost_text_telemetry_utils_maybe.telemetryShown(
      e,
      "ghostText",
      n.telemetry,
      t
    );
  }
  return ["OK", null];
};
