Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_TypeBox_maybe = require("TypeBox");
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_AuthManagerModule_maybe = require("AuthManagerModule");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const M_AuthManagerManager_maybe = require("AuthManagerManager");
const M_TestContextManager_maybe = require("TestContextManager");
const l = M_TypeBox_maybe.Type.Object({
  testingCtx: M_TypeBox_maybe.Type.Number(),
  options: M_TypeBox_maybe.Type.Optional(M_TypeBox_maybe.Type.Object({})),
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
  M_TestContextManager_maybe.getTestingContext(r.testingCtx).forceSet(
    M_AuthManagerModule_maybe.AuthManager,
    new M_AuthManagerManager_maybe.AlwaysAuthManager()
  );
  return ["OK", null];
};
