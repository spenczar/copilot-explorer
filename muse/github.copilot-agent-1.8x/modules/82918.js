Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.CallHierarchyOutgoingCallsRequest =
  exports.CallHierarchyIncomingCallsRequest =
  exports.CallHierarchyPrepareRequest =
    undefined;
const n = require(66140);
var i;
var o;
var s;
(s =
  exports.CallHierarchyPrepareRequest ||
  (exports.CallHierarchyPrepareRequest = {})).method =
  "textDocument/prepareCallHierarchy";
s.type = new n.ProtocolRequestType(s.method);
(o =
  exports.CallHierarchyIncomingCallsRequest ||
  (exports.CallHierarchyIncomingCallsRequest = {})).method =
  "callHierarchy/incomingCalls";
o.type = new n.ProtocolRequestType(o.method);
(i =
  exports.CallHierarchyOutgoingCallsRequest ||
  (exports.CallHierarchyOutgoingCallsRequest = {})).method =
  "callHierarchy/outgoingCalls";
i.type = new n.ProtocolRequestType(i.method);