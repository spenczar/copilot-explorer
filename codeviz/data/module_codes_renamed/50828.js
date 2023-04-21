Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.FileOperationsFeature = undefined;
const M_MessageConnectionManager_maybe = require("MessageConnectionManager");
exports.FileOperationsFeature = (e) =>
  class extends e {
    onDidCreateFiles(e) {
      this.connection.onNotification(
        M_MessageConnectionManager_maybe.DidCreateFilesNotification.type,
        (t) => {
          e(t);
        }
      );
    }
    onDidRenameFiles(e) {
      this.connection.onNotification(
        M_MessageConnectionManager_maybe.DidRenameFilesNotification.type,
        (t) => {
          e(t);
        }
      );
    }
    onDidDeleteFiles(e) {
      this.connection.onNotification(
        M_MessageConnectionManager_maybe.DidDeleteFilesNotification.type,
        (t) => {
          e(t);
        }
      );
    }
    onWillCreateFiles(e) {
      return this.connection.onRequest(
        M_MessageConnectionManager_maybe.WillCreateFilesRequest.type,
        (t, r) => e(t, r)
      );
    }
    onWillRenameFiles(e) {
      return this.connection.onRequest(
        M_MessageConnectionManager_maybe.WillRenameFilesRequest.type,
        (t, r) => e(t, r)
      );
    }
    onWillDeleteFiles(e) {
      return this.connection.onRequest(
        M_MessageConnectionManager_maybe.WillDeleteFilesRequest.type,
        (t, r) => e(t, r)
      );
    }
  };
