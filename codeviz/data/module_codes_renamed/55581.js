Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.notifyAccepted = undefined;
const M_TypeBox_maybe = require("TypeBox");
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_PostInsertionCaptureManager_maybe = require("PostInsertionCaptureManager");
const M_CopilotCompletionCacheManager_maybe = require("CopilotCompletionCacheManager");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const M_TestContextManager_maybe = require("TestContextManager");
const M_TestingOptionsManager_maybe = require("TestingOptionsManager");
const u = M_TypeBox_maybe.Type.Object({
  uuid: M_TypeBox_maybe.Type.String({
    minLength: 1,
  }),
  options: M_TypeBox_maybe.Type.Optional(
    M_TestingOptionsManager_maybe.TestingOptions
  ),
});
const d = new M_schema_code_generator_maybe.default().compile(
  M_TypeBox_maybe.Type.Strict(u)
);
exports.notifyAccepted = async function (e, t, r) {
  if (!d(r)) {
    const e = M_AjvErrorManager_maybe.extractAjvErrors(d.errors);
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
  const n = e.get(M_CopilotCompletionCacheManager_maybe.CopilotCompletionCache);
  const i = n.get(r.uuid);
  if (i) {
    n.deleteKey(r.uuid);
    M_PostInsertionCaptureManager_maybe.postInsertionTasks(
      e,
      "ghostText",
      i.text,
      i.offset,
      i.file,
      i.telemetry
    );
  }
  return ["OK", null];
};
