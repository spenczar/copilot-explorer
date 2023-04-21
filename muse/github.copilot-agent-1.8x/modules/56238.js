Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.TestAgentNotificationSender = undefined;
const n = require(57214);
class TestAgentNotificationSender extends n.AgentNotificationSender {
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