Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.TestNotificationSender =
  exports.TestUrlOpener =
  exports.rangeToString =
  exports.positionToString =
    undefined;
const M_NotificationSenderModule_maybe = require("NotificationSenderModule");
function positionToString(e) {
  return `${e.line}:${e.character}`;
}
exports.positionToString = positionToString;
exports.rangeToString = function (e) {
  return `[${positionToString(e.start)}--${positionToString(e.end)}]`;
};
exports.TestUrlOpener = class {
  constructor() {
    this.openedUrls = [];
  }
  open(e) {
    this.openedUrls.push(e);
  }
};
class TestNotificationSender extends M_NotificationSenderModule_maybe.NotificationSender {
  constructor() {
    super();
    this.sentMessages = [];
    this.warningPromises = [];
  }
  showWarningMessage(e, ...t) {
    this.sentMessages.push(e);
    const r = t ? Promise.resolve(t[0]) : Promise.resolve(undefined);
    this.warningPromises.push(r);
    return r;
  }
  async waitForWarningMessages() {
    await Promise.all(this.warningPromises);
  }
}
exports.TestNotificationSender = TestNotificationSender;
