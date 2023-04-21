Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.CallHierarchyFeature = undefined;
const M_MessageConnectionManager_maybe = require("MessageConnectionManager");
exports.CallHierarchyFeature = (e) =>
  class extends e {
    get callHierarchy() {
      return {
        onPrepare: (e) => {
          this.connection.onRequest(
            M_MessageConnectionManager_maybe.CallHierarchyPrepareRequest.type,
            (t, r) => e(t, r, this.attachWorkDoneProgress(t), undefined)
          );
        },
        onIncomingCalls: (e) => {
          const t =
            M_MessageConnectionManager_maybe.CallHierarchyIncomingCallsRequest
              .type;
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
          const t =
            M_MessageConnectionManager_maybe.CallHierarchyOutgoingCallsRequest
              .type;
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
