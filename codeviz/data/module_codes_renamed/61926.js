Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.NotificationStatusReporter = undefined;
const M_connection_manager_maybe = require("connection-manager");
const M_NotificationSenderModule_maybe = require("NotificationSenderModule");
exports.NotificationStatusReporter = class {
  constructor(e) {
    this.ctx = e;
    this.notificationEndpoint = "statusNotification";
    this.status = "Normal";
  }
  setProgress() {
    if ("Error" !== this.status) {
      this.status = "InProgress";
      this.ctx
        .get(M_NotificationSenderModule_maybe.AgentNotificationSender)
        .sendNotification(
          new M_connection_manager_maybe.NotificationType(
            this.notificationEndpoint
          ),
          {
            status: "InProgress",
            message: "",
          }
        );
    }
  }
  removeProgress() {
    if ("Error" !== this.status && "Warning" !== this.status) {
      this.status = "Normal";
      this.ctx
        .get(M_NotificationSenderModule_maybe.AgentNotificationSender)
        .sendNotification(
          new M_connection_manager_maybe.NotificationType(
            this.notificationEndpoint
          ),
          {
            status: "Normal",
            message: "",
          }
        );
    }
  }
  forceNormal() {
    this.status = "Normal";
    this.ctx
      .get(M_NotificationSenderModule_maybe.AgentNotificationSender)
      .sendNotification(
        new M_connection_manager_maybe.NotificationType(
          this.notificationEndpoint
        ),
        {
          status: "Normal",
          message: "",
        }
      );
  }
  setWarning(e) {
    if ("Error" !== this.status) {
      this.status = "Warning";
      this.ctx
        .get(M_NotificationSenderModule_maybe.AgentNotificationSender)
        .sendNotification(
          new M_connection_manager_maybe.NotificationType(
            this.notificationEndpoint
          ),
          {
            status: "Warning",
            message: "",
          }
        );
    }
  }
  setError(e) {
    this.status = "Error";
    const t = {
      status: "Error",
      message: e,
    };
    this.ctx
      .get(M_NotificationSenderModule_maybe.AgentNotificationSender)
      .sendNotification(
        new M_connection_manager_maybe.NotificationType(
          this.notificationEndpoint
        ),
        t
      );
  }
};
