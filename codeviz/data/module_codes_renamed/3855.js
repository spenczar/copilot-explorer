Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.LoggingTelemetryReporter = undefined;
const M_LoggingUtils_maybe = require("LoggingUtils");
const M_RuntimeModeManager_maybe = require("RuntimeModeManager");
exports.LoggingTelemetryReporter = class {
  constructor(e, t, r) {
    this.ctx = e;
    this.reporter = r;
    const o = e.get(M_RuntimeModeManager_maybe.RuntimeMode).flags;
    this.logger = new M_LoggingUtils_maybe.Logger(
      M_LoggingUtils_maybe.LogLevel.DEBUG,
      `telemetry-${t}`
    );
    this.enabled = o.telemetryLogging;
    this.verbose = o.verboseLogging;
  }
  sendTelemetryEvent(e, t, r) {
    this.reporter.sendTelemetryEvent(e, t, r);
    this.log(e, t, r);
  }
  sendTelemetryErrorEvent(e, t, r) {
    this.reporter.sendTelemetryErrorEvent(e, t, r);
    this.log(e, t, r);
  }
  sendTelemetryException(e, t, r) {
    this.reporter.sendTelemetryException(e, t, r);
    this.log("exception:" + e.message, t, r);
  }
  log(e, t, r) {
    if (this.enabled) {
      if (this.verbose) {
        this.logger.info(this.ctx, e, t, r);
      } else {
        this.logger.info(this.ctx, e);
      }
    }
  }
  hackOptOutListener() {
    this.reporter.optOutListener = {
      dispose() {},
    };
  }
  dispose() {
    return this.reporter.dispose();
  }
  getDelegate() {
    return this.reporter;
  }
};
