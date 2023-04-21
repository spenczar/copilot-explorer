Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_TypeBox_maybe = require("TypeBox");
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_LoggingUtils_maybe = require("LoggingUtils");
const M_NotificationSenderModule_maybe = require("NotificationSenderModule");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const c = M_TypeBox_maybe.Type.Object({});
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
  const n = e.get(M_NotificationSenderModule_maybe.AgentNotificationSender);
  const i = e.get(M_LoggingUtils_maybe.LogTarget);
  await n
    .showWarningMessage("This is a test message", {
      title: "Some Action",
    })
    .catch((e) =>
      c(
        M_LoggingUtils_maybe.LogLevel.ERROR,
        "error sending show message request",
        e
      )
    )
    .then((e) =>
      c(
        M_LoggingUtils_maybe.LogLevel.INFO,
        "response from message request",
        e.title
      )
    );
  return ["OK", null];
  async function c(t, r, n) {
    return i.logIt(e, t, r + " (" + n + ")", n);
  }
};
