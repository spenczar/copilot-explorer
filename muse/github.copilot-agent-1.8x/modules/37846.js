Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.WillDeleteFilesRequest =
  exports.DidDeleteFilesNotification =
  exports.DidRenameFilesNotification =
  exports.WillRenameFilesRequest =
  exports.DidCreateFilesNotification =
  exports.WillCreateFilesRequest =
  exports.FileOperationPatternKind =
    undefined;
const n = require(66140);
var i;
var o;
var s;
var a;
var c;
var l;
var u;
(u =
  exports.FileOperationPatternKind ||
  (exports.FileOperationPatternKind = {})).file = "file";
u.folder = "folder";
(l =
  exports.WillCreateFilesRequest ||
  (exports.WillCreateFilesRequest = {})).method = "workspace/willCreateFiles";
l.type = new n.ProtocolRequestType(l.method);
(c =
  exports.DidCreateFilesNotification ||
  (exports.DidCreateFilesNotification = {})).method =
  "workspace/didCreateFiles";
c.type = new n.ProtocolNotificationType(c.method);
(a =
  exports.WillRenameFilesRequest ||
  (exports.WillRenameFilesRequest = {})).method = "workspace/willRenameFiles";
a.type = new n.ProtocolRequestType(a.method);
(s =
  exports.DidRenameFilesNotification ||
  (exports.DidRenameFilesNotification = {})).method =
  "workspace/didRenameFiles";
s.type = new n.ProtocolNotificationType(s.method);
(o =
  exports.DidDeleteFilesNotification ||
  (exports.DidDeleteFilesNotification = {})).method =
  "workspace/didDeleteFiles";
o.type = new n.ProtocolNotificationType(o.method);
(i =
  exports.WillDeleteFilesRequest ||
  (exports.WillDeleteFilesRequest = {})).method = "workspace/willDeleteFiles";
i.type = new n.ProtocolRequestType(i.method);