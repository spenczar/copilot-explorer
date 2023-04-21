Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_TypeBox_maybe = require("TypeBox");
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_AuthManagerModule_maybe = require("AuthManagerModule");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const M_TestContextManager_maybe = require("TestContextManager");
const M_TestingOptionsManager_maybe = require("TestingOptionsManager");
const l = M_TypeBox_maybe.Type.Object({
  options: M_TypeBox_maybe.Type.Optional(
    M_TypeBox_maybe.Type.Intersect([
      M_TypeBox_maybe.Type.Object({
        localChecksOnly: M_TypeBox_maybe.Type.Optional(
          M_TypeBox_maybe.Type.Boolean()
        ),
      }),
      M_TestingOptionsManager_maybe.TestingOptions,
    ])
  ),
});
const u = new M_schema_code_generator_maybe.default().compile(
  M_TypeBox_maybe.Type.Strict(l)
);
exports.default = async function (e, t, r) {
  if (!u(r)) {
    const e = M_AjvErrorManager_maybe.extractAjvErrors(u.errors);
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
  return [
    await e
      .get(M_AuthManagerModule_maybe.AuthManager)
      .checkAndUpdateStatus(e, r.options),
    null,
  ];
};
