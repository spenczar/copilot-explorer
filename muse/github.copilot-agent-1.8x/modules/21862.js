Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.WorkDoneProgressCancelNotification =
  exports.WorkDoneProgressCreateRequest =
  exports.WorkDoneProgress =
    undefined;
const n = require(74389);
const i = require(66140);
var o;
(o = exports.WorkDoneProgress || (exports.WorkDoneProgress = {})).type =
  new n.ProgressType();
o.is = function (e) {
  return e === o.type;
};
(
  exports.WorkDoneProgressCreateRequest ||
  (exports.WorkDoneProgressCreateRequest = {})
).type = new i.ProtocolRequestType("window/workDoneProgress/create");
(
  exports.WorkDoneProgressCancelNotification ||
  (exports.WorkDoneProgressCancelNotification = {})
).type = new i.ProtocolNotificationType("window/workDoneProgress/cancel");