Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(892);
const i = require(86236);
const o = require(5798);
const s = require(57214);
const a = require(5381);
const c = n.Type.Object({});
const l = new i.default().compile(n.Type.Strict(c));
exports.default = async function (e, t, r) {
  if (!l(r)) {
    const e = a.extractAjvErrors(l.errors);
    return [
      null,
      {
        code: a.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  const n = e.get(s.AgentNotificationSender);
  const i = e.get(o.LogTarget);
  await n
    .showWarningMessage("This is a test message", {
      title: "Some Action",
    })
    .catch((e) => c(o.LogLevel.ERROR, "error sending show message request", e))
    .then((e) => c(o.LogLevel.INFO, "response from message request", e.title));
  return ["OK", null];
  async function c(t, r, n) {
    return i.logIt(e, t, r + " (" + n + ")", n);
  }
};