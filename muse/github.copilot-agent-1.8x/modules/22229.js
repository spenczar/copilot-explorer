Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.FakeAuthManager = undefined;
const n = require(892);
const i = require(86236);
const o = require(45922);
const s = require(9321);
const a = require(5381);
const c = require(6159);
const l = n.Type.Object({
  testingCtx: n.Type.Number(),
  options: n.Type.Optional(n.Type.Object({})),
});
const u = new i.default().compile(n.Type.Strict(l));
class FakeAuthManager extends s.AuthManager {
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
    const e = a.extractAjvErrors(u.errors);
    return [
      null,
      {
        code: a.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  const n = o.getTestingCopilotTokenManager();
  c.getTestingContext(r.testingCtx).forceSet(
    s.AuthManager,
    new FakeAuthManager(n)
  );
  return ["OK", null];
};