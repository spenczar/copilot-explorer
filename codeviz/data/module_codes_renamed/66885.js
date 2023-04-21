Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_TypeBox_maybe = require("TypeBox");
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_AuthManagerModule_maybe = require("AuthManagerModule");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const a = M_TypeBox_maybe.Type.Object({
  options: M_TypeBox_maybe.Type.Optional(M_TypeBox_maybe.Type.Object({})),
});
const c = new M_schema_code_generator_maybe.default().compile(
  M_TypeBox_maybe.Type.Strict(a)
);
exports.default = async function (e, t, r) {
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
  const n = e.get(M_AuthManagerModule_maybe.AuthManager).getPendingSignIn();
  if (undefined === n)
    return [
      null,
      {
        code: M_AjvErrorManager_maybe.ErrorCode.InvalidRequest,
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
        code: M_AjvErrorManager_maybe.ErrorCode.DeviceFlowFailed,
        message: e.toString(),
      },
    ];
  } finally {
    e.get(M_AuthManagerModule_maybe.AuthManager).setPendingSignIn(undefined);
  }
};
