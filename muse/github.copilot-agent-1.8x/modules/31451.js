Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(892);
const i = require(86236);
const o = require(53406);
const s = require(9321);
const a = require(5381);
const c = n.Type.Object({
  options: n.Type.Optional(n.Type.Object({})),
});
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
  const n = await e.get(s.AuthManager).checkAndUpdateStatus(e);
  if ("OK" === n.status)
    return [
      {
        status: "AlreadySignedIn",
        user: n.user,
      },
      null,
    ];
  const i = await e.get(o.GitHubDeviceFlow).getToken(e);
  const c = i.waitForAuth.then(
    async (t) => (
      await e.get(s.AuthManager).setAuthRecord(t),
      await e.get(s.AuthManager).checkAndUpdateStatus(e)
    )
  );
  e.get(s.AuthManager).setPendingSignIn(c);
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