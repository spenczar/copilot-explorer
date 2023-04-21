Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.UserErrorNotifier = undefined;
const M_LoggingUtils_maybe = require("LoggingUtils");
const M_NotificationSenderModule_maybe = require("NotificationSenderModule");
const M_UrlOpenerManager_maybe = require("UrlOpenerManager");
const s = ["UNABLE_TO_VERIFY_LEAF_SIGNATURE", "CERT_SIGNATURE_FAILURE"];
exports.UserErrorNotifier = class {
  constructor() {
    this.notifiedErrorCodes = [];
  }
  async notifyUser(e, t) {
    if (s.includes(t.code) && !this.didNotifyBefore(t.code)) {
      this.displayCertificateErrorNotification(e, t);
      this.notifiedErrorCodes.push(t.code);
    }
  }
  displayCertificateErrorNotification(e, t) {
    const r = "https://aka.ms/copilot-ssc";
    const i =
      "Your current Copilot license doesn't support proxy connections with self-signed certificates.";
    new M_LoggingUtils_maybe.Logger(
      M_LoggingUtils_maybe.LogLevel.ERROR,
      "certificates"
    ).error(
      e,
      `${i} Please visit ${r} to learn more. Original cause: ${JSON.stringify(
        t
      )}`
    );
    this.showCertificateWarningMessage(e, i, r);
  }
  showCertificateWarningMessage(e, t, r) {
    const n = {
      title: "Learn more",
    };
    e.get(M_NotificationSenderModule_maybe.NotificationSender)
      .showWarningMessage(t, n)
      .then((t) => {
        if (t?.title === n.title) {
          e.get(M_UrlOpenerManager_maybe.UrlOpener).open(r);
        }
      });
  }
  didNotifyBefore(e) {
    return -1 !== this.notifiedErrorCodes.indexOf(e);
  }
};
