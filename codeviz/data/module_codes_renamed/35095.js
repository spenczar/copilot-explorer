Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.TestProductFeatures = exports.ProductFeature = undefined;
const M_CopilotTokenManagerModule_maybe = require("CopilotTokenManagerModule");
const M_TokenNotifierModule_maybe = require("TokenNotifierModule");
(exports.ProductFeature || (exports.ProductFeature = {})).selfSignedCerts =
  "ssc";
const o = {};
exports.TestProductFeatures = class {
  constructor(e) {
    this.ctx = e;
    this.token = new M_CopilotTokenManagerModule_maybe.CopilotToken("token");
    e.get(M_TokenNotifierModule_maybe.CopilotTokenNotifier).on(
      "onCopilotToken",
      (e) => {
        this.token = e;
      }
    );
  }
  enable(e) {
    if ("1" !== this.token.getTokenValue(e)) {
      const t = `${this.token.token};${e}=1`;
      this.ctx
        .get(M_TokenNotifierModule_maybe.CopilotTokenNotifier)
        .emit(
          "onCopilotToken",
          new M_CopilotTokenManagerModule_maybe.CopilotToken(
            t,
            this.token.organization_list
          ),
          o
        );
    }
    return this;
  }
  disable(e) {
    if ("1" === this.token.getTokenValue(e)) {
      const t = this.token.token
        .replace(";" + e + "=1", "")
        .replace(e + "=1", "");
      this.ctx
        .get(M_TokenNotifierModule_maybe.CopilotTokenNotifier)
        .emit(
          "onCopilotToken",
          new M_CopilotTokenManagerModule_maybe.CopilotToken(
            t,
            this.token.organization_list
          ),
          o
        );
    }
    return this;
  }
};
