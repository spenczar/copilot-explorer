Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.ShowDocumentFeature = undefined;
const n = require(40273);
exports.ShowDocumentFeature = (e) =>
  class extends e {
    showDocument(e) {
      return this.connection.sendRequest(n.ShowDocumentRequest.type, e);
    }
  };