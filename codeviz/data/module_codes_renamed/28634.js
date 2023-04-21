Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.WorkspaceFoldersFeature = undefined;
const M_MessageConnectionManager_maybe = require("MessageConnectionManager");
exports.WorkspaceFoldersFeature = (e) =>
  class extends e {
    initialize(e) {
      let t = e.workspace;
      if (t && t.workspaceFolders) {
        this._onDidChangeWorkspaceFolders =
          new M_MessageConnectionManager_maybe.Emitter();
        this.connection.onNotification(
          M_MessageConnectionManager_maybe.DidChangeWorkspaceFoldersNotification
            .type,
          (e) => {
            this._onDidChangeWorkspaceFolders.fire(e.event);
          }
        );
      }
    }
    getWorkspaceFolders() {
      return this.connection.sendRequest(
        M_MessageConnectionManager_maybe.WorkspaceFoldersRequest.type
      );
    }
    get onDidChangeWorkspaceFolders() {
      if (!this._onDidChangeWorkspaceFolders)
        throw new Error(
          "Client doesn't support sending workspace folder change events."
        );
      if (this._unregistration) {
        this._unregistration = this.connection.client.register(
          M_MessageConnectionManager_maybe.DidChangeWorkspaceFoldersNotification
            .type
        );
      }
      return this._onDidChangeWorkspaceFolders.event;
    }
  };
