Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.createRequestContext = exports.AuthManager = undefined;
const n = require(35765);
const i = require(75611);
const o = require(5381);
class AuthManager {
  constructor(e, t) {
    this.persistenceManager = e;
    this.mkTokenManager = t;
    this._pendingSignIn = undefined;
  }
  getCopilotTokenManager() {
    return this._copilotTokenManager;
  }
  setPendingSignIn(e) {
    this._pendingSignIn = e;
  }
  getPendingSignIn() {
    return this._pendingSignIn;
  }
  async checkAndUpdateStatus(e, t) {
    const r = t?.localChecksOnly ?? false;
    let n;
    if ("true" === process.env.CODESPACES && process.env.GITHUB_TOKEN) {
      n = {
        user: process.env.GITHUB_USER || "codespace-user",
        oauth_token: process.env.GITHUB_TOKEN,
      };
    }
    if (undefined === n) {
      n = await this.getAuthRecord();
    }
    if (void 0 === n)
      return (
        (this._copilotTokenManager = void 0),
        {
          status: "NotSignedIn",
        }
      );
    if (r)
      return {
        status: "MaybeOK",
        user: n.user,
      };
    const i = {
      token: n.oauth_token,
    };
    if (n.dev_override) {
      i.devOverride = {
        copilotTokenUrl: n.dev_override.copilot_token_url,
        notificationUrl: n.dev_override.notification_url,
      };
    }
    const o = this.mkTokenManager(i);
    const s = await o.checkCopilotToken(e);
    return "status" in s
      ? ((this._copilotTokenManager = o),
        {
          status: "OK",
          user: n.user,
        })
      : ((this._copilotTokenManager = undefined),
        {
          status: "HTTP401" === s.reason ? "NotSignedIn" : s.reason,
          user: n.user,
        });
  }
  async getAuthRecord() {
    return await this.persistenceManager.read("hosts", "github.com");
  }
  async setAuthRecord(e) {
    await this.persistenceManager.update("hosts", "github.com", e);
  }
  async deleteAuthRecord() {
    await this.persistenceManager.delete("hosts", "github.com");
  }
}
exports.AuthManager = AuthManager;
exports.createRequestContext = async function (e, t) {
  let r = t;
  if (undefined === r) {
    r = e.get(AuthManager).getCopilotTokenManager();
  }
  if (void 0 === r) {
    const t = await e.get(AuthManager).checkAndUpdateStatus(e);
    if ("OK" !== t.status)
      return {
        code: o.ErrorCode.NoCopilotToken,
        message: `Not authenticated: ${t.status}`,
      };
    if (((r = e.get(AuthManager).getCopilotTokenManager()), void 0 === r))
      return {
        code: o.ErrorCode.InternalError,
        message: "Unexpected missing Copilot token",
      };
  }
  const a = new i.Context(e);
  a.forceSet(n.CopilotTokenManager, r);
  return a;
};