Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.WorkspaceFoldersFeature = undefined;
const n = require(40273);
exports.WorkspaceFoldersFeature = (e) =>
  class extends e {
    initialize(e) {
      let t = e.workspace;
      if (t && t.workspaceFolders) {
        this._onDidChangeWorkspaceFolders = new n.Emitter();
        this.connection.onNotification(
          n.DidChangeWorkspaceFoldersNotification.type,
          (e) => {
            this._onDidChangeWorkspaceFolders.fire(e.event);
          }
        );
      }
    }
    getWorkspaceFolders() {
      return this.connection.sendRequest(n.WorkspaceFoldersRequest.type);
    }
    get onDidChangeWorkspaceFolders() {
      if (!this._onDidChangeWorkspaceFolders)
        throw new Error(
          "Client doesn't support sending workspace folder change events."
        );
      if (this._unregistration) {
        this._unregistration = this.connection.client.register(
          n.DidChangeWorkspaceFoldersNotification.type
        );
      }
      return this._onDidChangeWorkspaceFolders.event;
    }
  };