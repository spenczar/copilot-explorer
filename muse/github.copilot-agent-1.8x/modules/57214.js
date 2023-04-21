Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.ConnectionNotificationSender = exports.AgentNotificationSender =
  undefined;
const n = require(69035);
const i = require(87426);
class AgentNotificationSender extends n.NotificationSender {}
exports.AgentNotificationSender = AgentNotificationSender;
exports.ConnectionNotificationSender = class extends AgentNotificationSender {
  constructor(e) {
    super();
    this.ctx = e;
    this.connection = this.ctx.get(i.WrappedConnection).conn;
  }
  sendNotification(e, t) {
    this.connection.sendNotification(e, t);
  }
  showWarningMessage(e, ...t) {
    return this.connection.window.showWarningMessage(e, ...t);
  }
};