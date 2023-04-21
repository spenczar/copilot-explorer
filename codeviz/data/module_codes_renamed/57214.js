Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.ConnectionNotificationSender = exports.AgentNotificationSender =
  undefined;
const M_NotificationSenderModule_maybe = require("NotificationSenderModule");
const M_DebugServerWrapper_maybe = require("DebugServerWrapper");
class AgentNotificationSender extends M_NotificationSenderModule_maybe.NotificationSender {}
exports.AgentNotificationSender = AgentNotificationSender;
exports.ConnectionNotificationSender = class extends AgentNotificationSender {
  constructor(e) {
    super();
    this.ctx = e;
    this.connection = this.ctx.get(
      M_DebugServerWrapper_maybe.WrappedConnection
    ).conn;
  }
  sendNotification(e, t) {
    this.connection.sendNotification(e, t);
  }
  showWarningMessage(e, ...t) {
    return this.connection.window.showWarningMessage(e, ...t);
  }
};
