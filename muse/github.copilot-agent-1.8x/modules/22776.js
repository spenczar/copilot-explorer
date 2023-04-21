Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.LinkedEditingRangeFeature = undefined;
const n = require(40273);
exports.LinkedEditingRangeFeature = (e) =>
  class extends e {
    onLinkedEditingRange(e) {
      this.connection.onRequest(n.LinkedEditingRangeRequest.type, (t, r) =>
        e(t, r, this.attachWorkDoneProgress(t), undefined)
      );
    }
  };