Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.DidChangeWorkspaceFoldersNotification =
  exports.WorkspaceFoldersRequest = undefined;
const M_ProtocolTypeConstants_maybe = require("ProtocolTypeConstants");
(
  exports.WorkspaceFoldersRequest || (exports.WorkspaceFoldersRequest = {})
).type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType0(
  "workspace/workspaceFolders"
);
(
  exports.DidChangeWorkspaceFoldersNotification ||
  (exports.DidChangeWorkspaceFoldersNotification = {})
).type = new M_ProtocolTypeConstants_maybe.ProtocolNotificationType(
  "workspace/didChangeWorkspaceFolders"
);
