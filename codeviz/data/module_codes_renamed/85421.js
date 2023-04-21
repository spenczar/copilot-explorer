Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.ShowDocumentFeature = undefined;
const M_MessageConnectionManager_maybe = require("MessageConnectionManager");
exports.ShowDocumentFeature = (e) =>
  class extends e {
    showDocument(e) {
      return this.connection.sendRequest(
        M_MessageConnectionManager_maybe.ShowDocumentRequest.type,
        e
      );
    }
  };
