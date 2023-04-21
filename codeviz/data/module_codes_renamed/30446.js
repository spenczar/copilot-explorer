Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.registerDefaultHandlers = undefined;
const M_FetcherRequestManager_maybe = require("FetcherRequestManager");
const M_TelemetryReporterModule_maybe = require("TelemetryReporterModule");
exports.registerDefaultHandlers = function (e, t) {
  process.addListener("uncaughtException", (t) => {
    console.error("uncaughtException", t);
    M_TelemetryReporterModule_maybe.telemetryException(
      e,
      t,
      "uncaughtException"
    );
  });
  let r = false;
  process.addListener("unhandledRejection", (o, s) => {
    if (r) return;
    r = true;
    if ("vscode" === t && !o) return;
    if ("aborted" === o.type || M_FetcherRequestManager_maybe.isAbortError(o))
      return;
    if (
      "vscode" === t &&
      [
        "ENOTFOUND",
        "ECONNREFUSED",
        "ECONNRESET",
        "ETIMEDOUT",
        "ENETDOWN",
        "ENETUNREACH",
        "EADDRNOTAVAIL",
      ].includes(o.code)
    )
      return;
    if ("ENOENT" == o.code) return;
    let a = "";
    try {
      a = `${o.message} (${o.code})`;
      a = JSON.stringify(o);
    } catch (e) {
      a = "[actual reason JSON was cyclic]";
    }
    if ("{}" !== a) {
      console.error("unhandledRejection", a);
      M_TelemetryReporterModule_maybe.telemetryError(
        e,
        "unhandledRejection",
        M_TelemetryReporterModule_maybe.TelemetryData.createAndMarkAsIssued({
          origin: "unhandledRejection",
          reason: "Unhandled rejection logged to restricted telemetry",
        }),
        false
      );
      M_TelemetryReporterModule_maybe.telemetryError(
        e,
        "unhandledRejection",
        M_TelemetryReporterModule_maybe.TelemetryData.createAndMarkAsIssued({
          origin: "unhandledRejection",
          reason: a,
        }),
        true
      );
      r = false;
    }
  });
};
