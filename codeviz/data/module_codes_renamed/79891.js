Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.ColorPresentationRequest = exports.DocumentColorRequest = undefined;
const M_ProtocolTypeConstants_maybe = require("ProtocolTypeConstants");
var i;
(i =
  exports.DocumentColorRequest || (exports.DocumentColorRequest = {})).method =
  "textDocument/documentColor";
i.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(i.method);
(
  exports.ColorPresentationRequest || (exports.ColorPresentationRequest = {})
).type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(
  "textDocument/colorPresentation"
);
