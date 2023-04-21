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
const M_ProtocolTypeConstants_maybe = require("ProtocolTypeConstants");
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
l.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(l.method);
(c =
  exports.DidCreateFilesNotification ||
  (exports.DidCreateFilesNotification = {})).method =
  "workspace/didCreateFiles";
c.type = new M_ProtocolTypeConstants_maybe.ProtocolNotificationType(c.method);
(a =
  exports.WillRenameFilesRequest ||
  (exports.WillRenameFilesRequest = {})).method = "workspace/willRenameFiles";
a.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(a.method);
(s =
  exports.DidRenameFilesNotification ||
  (exports.DidRenameFilesNotification = {})).method =
  "workspace/didRenameFiles";
s.type = new M_ProtocolTypeConstants_maybe.ProtocolNotificationType(s.method);
(o =
  exports.DidDeleteFilesNotification ||
  (exports.DidDeleteFilesNotification = {})).method =
  "workspace/didDeleteFiles";
o.type = new M_ProtocolTypeConstants_maybe.ProtocolNotificationType(o.method);
(i =
  exports.WillDeleteFilesRequest ||
  (exports.WillDeleteFilesRequest = {})).method = "workspace/willDeleteFiles";
i.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(i.method);
