Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.ColorPresentationRequest = exports.DocumentColorRequest = undefined;
const n = require(66140);
var i;
(i =
  exports.DocumentColorRequest || (exports.DocumentColorRequest = {})).method =
  "textDocument/documentColor";
i.type = new n.ProtocolRequestType(i.method);
(
  exports.ColorPresentationRequest || (exports.ColorPresentationRequest = {})
).type = new n.ProtocolRequestType("textDocument/colorPresentation");