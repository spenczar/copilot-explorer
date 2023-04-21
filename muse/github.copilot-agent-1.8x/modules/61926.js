Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.NotificationStatusReporter = undefined;
const n = require(35809);
const i = require(57214);
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
        .get(i.AgentNotificationSender)
        .sendNotification(new n.NotificationType(this.notificationEndpoint), {
          status: "InProgress",
          message: "",
        });
    }
  }
  removeProgress() {
    if ("Error" !== this.status && "Warning" !== this.status) {
      this.status = "Normal";
      this.ctx
        .get(i.AgentNotificationSender)
        .sendNotification(new n.NotificationType(this.notificationEndpoint), {
          status: "Normal",
          message: "",
        });
    }
  }
  forceNormal() {
    this.status = "Normal";
    this.ctx
      .get(i.AgentNotificationSender)
      .sendNotification(new n.NotificationType(this.notificationEndpoint), {
        status: "Normal",
        message: "",
      });
  }
  setWarning(e) {
    if ("Error" !== this.status) {
      this.status = "Warning";
      this.ctx
        .get(i.AgentNotificationSender)
        .sendNotification(new n.NotificationType(this.notificationEndpoint), {
          status: "Warning",
          message: "",
        });
    }
  }
  setError(e) {
    this.status = "Error";
    const t = {
      status: "Error",
      message: e,
    };
    this.ctx
      .get(i.AgentNotificationSender)
      .sendNotification(new n.NotificationType(this.notificationEndpoint), t);
  }
};