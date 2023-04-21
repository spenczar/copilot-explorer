Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.TestAgentNotificationSender = undefined;
const M_NotificationSenderModule_maybe = require("NotificationSenderModule");
class TestAgentNotificationSender extends M_NotificationSenderModule_maybe.AgentNotificationSender {
  constructor() {
    super();
    this.sentNotifications = [];
    this.sentMessages = [];
  }
  sendNotification(e, t) {
    this.sentNotifications.push(t);
  }
  showWarningMessage(e, ...t) {
    this.sentMessages.push(e);
    return t ? Promise.resolve(t[0]) : Promise.resolve(undefined);
  }
}
exports.TestAgentNotificationSender = TestAgentNotificationSender;
