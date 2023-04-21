Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.DidChangeWorkspaceFoldersNotification =
  exports.WorkspaceFoldersRequest = undefined;
const n = require(66140);
(
  exports.WorkspaceFoldersRequest || (exports.WorkspaceFoldersRequest = {})
).type = new n.ProtocolRequestType0("workspace/workspaceFolders");
(
  exports.DidChangeWorkspaceFoldersNotification ||
  (exports.DidChangeWorkspaceFoldersNotification = {})
).type = new n.ProtocolNotificationType("workspace/didChangeWorkspaceFolders");