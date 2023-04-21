Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.UserErrorNotifier = undefined;
const n = require(5798);
const i = require(69035);
const o = require(84567);
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
    new n.Logger(n.LogLevel.ERROR, "certificates").error(
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
    e.get(i.NotificationSender)
      .showWarningMessage(t, n)
      .then((t) => {
        if (t?.title === n.title) {
          e.get(o.UrlOpener).open(r);
        }
      });
  }
  didNotifyBefore(e) {
    return -1 !== this.notifiedErrorCodes.indexOf(e);
  }
};