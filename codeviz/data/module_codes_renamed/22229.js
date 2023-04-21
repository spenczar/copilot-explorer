Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.FakeAuthManager = undefined;
const M_TypeBox_maybe = require("TypeBox");
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_CopilotTestingGitHubTokenManager_maybe = require("CopilotTestingGitHubTokenManager");
const M_AuthManagerModule_maybe = require("AuthManagerModule");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const M_TestContextManager_maybe = require("TestContextManager");
const l = M_TypeBox_maybe.Type.Object({
  testingCtx: M_TypeBox_maybe.Type.Number(),
  options: M_TypeBox_maybe.Type.Optional(M_TypeBox_maybe.Type.Object({})),
});
const u = new M_schema_code_generator_maybe.default().compile(
  M_TypeBox_maybe.Type.Strict(l)
);
class FakeAuthManager extends M_AuthManagerModule_maybe.AuthManager {
  constructor(e) {
    super(undefined, (t) => e);
    this.tokenManager = e;
    this.user = "user";
  }
  getCopilotTokenManager() {
    return this.tokenManager;
  }
  async checkAndUpdateStatus(e, t) {
    const r = await this.tokenManager.checkCopilotToken(e);
    return "status" in r
      ? {
          status: "OK",
          user: this.user,
        }
      : {
          status: "HTTP401" === r.reason ? "NotSignedIn" : r.reason,
          user: this.user,
        };
  }
}
exports.FakeAuthManager = FakeAuthManager;
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
  const n =
    M_CopilotTestingGitHubTokenManager_maybe.getTestingCopilotTokenManager();
  M_TestContextManager_maybe.getTestingContext(r.testingCtx).forceSet(
    M_AuthManagerModule_maybe.AuthManager,
    new FakeAuthManager(n)
  );
  return ["OK", null];
};
