Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.FileOperationsFeature = undefined;
const n = require(40273);
exports.FileOperationsFeature = (e) =>
  class extends e {
    onDidCreateFiles(e) {
      this.connection.onNotification(n.DidCreateFilesNotification.type, (t) => {
        e(t);
      });
    }
    onDidRenameFiles(e) {
      this.connection.onNotification(n.DidRenameFilesNotification.type, (t) => {
        e(t);
      });
    }
    onDidDeleteFiles(e) {
      this.connection.onNotification(n.DidDeleteFilesNotification.type, (t) => {
        e(t);
      });
    }
    onWillCreateFiles(e) {
      return this.connection.onRequest(n.WillCreateFilesRequest.type, (t, r) =>
        e(t, r)
      );
    }
    onWillRenameFiles(e) {
      return this.connection.onRequest(n.WillRenameFilesRequest.type, (t, r) =>
        e(t, r)
      );
    }
    onWillDeleteFiles(e) {
      return this.connection.onRequest(n.WillDeleteFilesRequest.type, (t, r) =>
        e(t, r)
      );
    }
  };