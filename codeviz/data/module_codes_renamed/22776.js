Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.LinkedEditingRangeFeature = undefined;
const M_MessageConnectionManager_maybe = require("MessageConnectionManager");
exports.LinkedEditingRangeFeature = (e) =>
  class extends e {
    onLinkedEditingRange(e) {
      this.connection.onRequest(
        M_MessageConnectionManager_maybe.LinkedEditingRangeRequest.type,
        (t, r) => e(t, r, this.attachWorkDoneProgress(t), undefined)
      );
    }
  };
