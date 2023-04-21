Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.registerDefaultHandlers = undefined;
const n = require(20039);
const i = require(65489);
exports.registerDefaultHandlers = function (e, t) {
  process.addListener("uncaughtException", (t) => {
    console.error("uncaughtException", t);
    i.telemetryException(e, t, "uncaughtException");
  });
  let r = false;
  process.addListener("unhandledRejection", (o, s) => {
    if (r) return;
    r = true;
    if ("vscode" === t && !o) return;
    if ("aborted" === o.type || n.isAbortError(o)) return;
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
      i.telemetryError(
        e,
        "unhandledRejection",
        i.TelemetryData.createAndMarkAsIssued({
          origin: "unhandledRejection",
          reason: "Unhandled rejection logged to restricted telemetry",
        }),
        false
      );
      i.telemetryError(
        e,
        "unhandledRejection",
        i.TelemetryData.createAndMarkAsIssued({
          origin: "unhandledRejection",
          reason: a,
        }),
        true
      );
      r = false;
    }
  });
};