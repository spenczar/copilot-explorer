Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.MonikerFeature = undefined;
const M_MessageConnectionManager_maybe = require("MessageConnectionManager");
exports.MonikerFeature = (e) =>
  class extends e {
    get moniker() {
      return {
        on: (e) => {
          const t = M_MessageConnectionManager_maybe.MonikerRequest.type;
          this.connection.onRequest(t, (r, n) =>
            e(
              r,
              n,
              this.attachWorkDoneProgress(r),
              this.attachPartialResultProgress(t, r)
            )
          );
        },
      };
    }
  };
