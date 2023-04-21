Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.WorkDoneProgressCancelNotification =
  exports.WorkDoneProgressCreateRequest =
  exports.WorkDoneProgress =
    undefined;
const M_MessageTransportUtils_maybe = require("MessageTransportUtils");
const M_ProtocolTypeConstants_maybe = require("ProtocolTypeConstants");
var o;
(o = exports.WorkDoneProgress || (exports.WorkDoneProgress = {})).type =
  new M_MessageTransportUtils_maybe.ProgressType();
o.is = function (e) {
  return e === o.type;
};
(
  exports.WorkDoneProgressCreateRequest ||
  (exports.WorkDoneProgressCreateRequest = {})
).type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(
  "window/workDoneProgress/create"
);
(
  exports.WorkDoneProgressCancelNotification ||
  (exports.WorkDoneProgressCancelNotification = {})
).type = new M_ProtocolTypeConstants_maybe.ProtocolNotificationType(
  "window/workDoneProgress/cancel"
);
