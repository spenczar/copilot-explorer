Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.NotificationLogger = undefined;
const n = require(35809);
const i = require(5798);
const o = require(57214);
class NotificationLogger extends i.LogTarget {
  constructor(e) {
    super();
    this.debugMode = e;
  }
  logIt(e, t, r, ...s) {
    const a = {
      level: t,
      message: `${r} ${s.map(i.toPlainText)}`,
      metadataStr: r,
      extra: s.map(i.toPlainText),
    };
    e.get(o.AgentNotificationSender).sendNotification(
      new n.NotificationType("LogMessage"),
      a
    );
  }
  shouldLog(e, t) {
    return !!this.debugMode || t > i.LogLevel.DEBUG;
  }
}
exports.NotificationLogger = NotificationLogger;