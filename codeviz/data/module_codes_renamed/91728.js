Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.AlwaysAuthManager = exports.NotAuthManager = undefined;
const M_CopilotTokenManagerModule_maybe = require("CopilotTokenManagerModule");
const M_AuthManagerModule_maybe = require("AuthManagerModule");
class NotAuthManager extends M_AuthManagerModule_maybe.AuthManager {
  constructor() {
    super(null, () => null);
  }
  async checkAndUpdateStatus(e, t) {
    return {
      status: "NotSignedIn",
    };
  }
}
exports.NotAuthManager = NotAuthManager;
class AlwaysAuthManager extends M_AuthManagerModule_maybe.AuthManager {
  constructor() {
    super(null, () => null);
  }
  async checkAndUpdateStatus(e, t) {
    return {
      status: "OK",
      user: "user",
    };
  }
  getCopilotTokenManager() {
    return new M_CopilotTokenManagerModule_maybe.FixedCopilotTokenManager(
      "tid=valid-copilot-token"
    );
  }
}
exports.AlwaysAuthManager = AlwaysAuthManager;
