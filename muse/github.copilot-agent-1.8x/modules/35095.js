Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.TestProductFeatures = exports.ProductFeature = undefined;
const n = require(35765);
const i = require(40084);
(exports.ProductFeature || (exports.ProductFeature = {})).selfSignedCerts =
  "ssc";
const o = {};
exports.TestProductFeatures = class {
  constructor(e) {
    this.ctx = e;
    this.token = new n.CopilotToken("token");
    e.get(i.CopilotTokenNotifier).on("onCopilotToken", (e) => {
      this.token = e;
    });
  }
  enable(e) {
    if ("1" !== this.token.getTokenValue(e)) {
      const t = `${this.token.token};${e}=1`;
      this.ctx
        .get(i.CopilotTokenNotifier)
        .emit(
          "onCopilotToken",
          new n.CopilotToken(t, this.token.organization_list),
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
        .get(i.CopilotTokenNotifier)
        .emit(
          "onCopilotToken",
          new n.CopilotToken(t, this.token.organization_list),
          o
        );
    }
    return this;
  }
};