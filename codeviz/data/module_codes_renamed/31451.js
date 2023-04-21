Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_TypeBox_maybe = require("TypeBox");
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_GitHubDeviceFlowManager_maybe = require("GitHubDeviceFlowManager");
const M_AuthManagerModule_maybe = require("AuthManagerModule");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const c = M_TypeBox_maybe.Type.Object({
  options: M_TypeBox_maybe.Type.Optional(M_TypeBox_maybe.Type.Object({})),
});
const l = new M_schema_code_generator_maybe.default().compile(
  M_TypeBox_maybe.Type.Strict(c)
);
exports.default = async function (e, t, r) {
  if (!l(r)) {
    const e = M_AjvErrorManager_maybe.extractAjvErrors(l.errors);
    return [
      null,
      {
        code: M_AjvErrorManager_maybe.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  const n = await e
    .get(M_AuthManagerModule_maybe.AuthManager)
    .checkAndUpdateStatus(e);
  if ("OK" === n.status)
    return [
      {
        status: "AlreadySignedIn",
        user: n.user,
      },
      null,
    ];
  const i = await e
    .get(M_GitHubDeviceFlowManager_maybe.GitHubDeviceFlow)
    .getToken(e);
  const c = i.waitForAuth.then(
    async (t) => (
      await e.get(M_AuthManagerModule_maybe.AuthManager).setAuthRecord(t),
      await e.get(M_AuthManagerModule_maybe.AuthManager).checkAndUpdateStatus(e)
    )
  );
  e.get(M_AuthManagerModule_maybe.AuthManager).setPendingSignIn(c);
  return [
    {
      status: "PromptUserDeviceFlow",
      userCode: i.user_code,
      verificationUri: i.verification_uri,
      expiresIn: i.expires_in,
      interval: i.interval,
    },
    null,
  ];
};
