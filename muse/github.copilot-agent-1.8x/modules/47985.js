Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.CallHierarchyFeature = undefined;
const n = require(40273);
exports.CallHierarchyFeature = (e) =>
  class extends e {
    get callHierarchy() {
      return {
        onPrepare: (e) => {
          this.connection.onRequest(
            n.CallHierarchyPrepareRequest.type,
            (t, r) => e(t, r, this.attachWorkDoneProgress(t), undefined)
          );
        },
        onIncomingCalls: (e) => {
          const t = n.CallHierarchyIncomingCallsRequest.type;
          this.connection.onRequest(t, (r, n) =>
            e(
              r,
              n,
              this.attachWorkDoneProgress(r),
              this.attachPartialResultProgress(t, r)
            )
          );
        },
        onOutgoingCalls: (e) => {
          const t = n.CallHierarchyOutgoingCallsRequest.type;
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