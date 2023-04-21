Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.MonikerFeature = undefined;
const n = require(40273);
exports.MonikerFeature = (e) =>
  class extends e {
    get moniker() {
      return {
        on: (e) => {
          const t = n.MonikerRequest.type;
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