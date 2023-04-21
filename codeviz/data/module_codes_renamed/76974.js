Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.NotificationLogger = undefined;
const M_connection_manager_maybe = require("connection-manager");
const M_LoggingUtils_maybe = require("LoggingUtils");
const M_NotificationSenderModule_maybe = require("NotificationSenderModule");
class NotificationLogger extends M_LoggingUtils_maybe.LogTarget {
  constructor(e) {
    super();
    this.debugMode = e;
  }
  logIt(e, t, r, ...s) {
    const a = {
      level: t,
      message: `${r} ${s.map(M_LoggingUtils_maybe.toPlainText)}`,
      metadataStr: r,
      extra: s.map(M_LoggingUtils_maybe.toPlainText),
    };
    e.get(
      M_NotificationSenderModule_maybe.AgentNotificationSender
    ).sendNotification(
      new M_connection_manager_maybe.NotificationType("LogMessage"),
      a
    );
  }
  shouldLog(e, t) {
    return !!this.debugMode || t > M_LoggingUtils_maybe.LogLevel.DEBUG;
  }
}
exports.NotificationLogger = NotificationLogger;
