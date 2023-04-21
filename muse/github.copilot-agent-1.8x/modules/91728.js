Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.AlwaysAuthManager = exports.NotAuthManager = undefined;
const n = require(35765);
const i = require(9321);
class NotAuthManager extends i.AuthManager {
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
class AlwaysAuthManager extends i.AuthManager {
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
    return new n.FixedCopilotTokenManager("tid=valid-copilot-token");
  }
}
exports.AlwaysAuthManager = AlwaysAuthManager;