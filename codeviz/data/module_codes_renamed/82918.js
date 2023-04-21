Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.CallHierarchyOutgoingCallsRequest =
  exports.CallHierarchyIncomingCallsRequest =
  exports.CallHierarchyPrepareRequest =
    undefined;
const M_ProtocolTypeConstants_maybe = require("ProtocolTypeConstants");
var i;
var o;
var s;
(s =
  exports.CallHierarchyPrepareRequest ||
  (exports.CallHierarchyPrepareRequest = {})).method =
  "textDocument/prepareCallHierarchy";
s.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(s.method);
(o =
  exports.CallHierarchyIncomingCallsRequest ||
  (exports.CallHierarchyIncomingCallsRequest = {})).method =
  "callHierarchy/incomingCalls";
o.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(o.method);
(i =
  exports.CallHierarchyOutgoingCallsRequest ||
  (exports.CallHierarchyOutgoingCallsRequest = {})).method =
  "callHierarchy/outgoingCalls";
i.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(i.method);
