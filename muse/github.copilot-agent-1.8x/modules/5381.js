var r;
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.extractAjvErrors = exports.ErrorCode = undefined;
(r = exports.ErrorCode || (exports.ErrorCode = {}))[(r.ParseError = -32700)] =
  "ParseError";
r[(r.InvalidRequest = -32600)] = "InvalidRequest";
r[(r.MethodNotFound = -32601)] = "MethodNotFound";
r[(r.InvalidParams = -32602)] = "InvalidParams";
r[(r.InternalError = -32603)] = "InternalError";
r[(r.NoCopilotToken = 1e3)] = "NoCopilotToken";
r[(r.DeviceFlowFailed = 1001)] = "DeviceFlowFailed";
r[(r.ContextNotInitialized = 1002)] = "ContextNotInitialized";
exports.extractAjvErrors = function (e) {
  return e.map((e) => `${e.instancePath} ${e.message}`);
};