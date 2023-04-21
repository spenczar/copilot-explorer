Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.handleGhostTextResultTelemetry =
  exports.mkBasicResultTelemetry =
  exports.mkCanceledResultTelemetry =
  exports.telemetryRejected =
  exports.telemetryAccepted =
  exports.telemetryShown =
    undefined;
const M_TelemetryReporterModule_maybe = require("TelemetryReporterModule");
const M_contextual_filter_utils_maybe = require("contextual-filter-utils");
exports.telemetryShown = function (e, t, r, i) {
  r.markAsDisplayed();
  const o = i ? `${t}.shownFromCache` : `${t}.shown`;
  M_TelemetryReporterModule_maybe.telemetry(e, o, r);
};
exports.telemetryAccepted = function (e, t, r) {
  const o = t + ".accepted";
  const s = e.get(M_contextual_filter_utils_maybe.ContextualFilterManager);
  s.previousLabel = 1;
  s.previousLabelTimestamp = Date.now();
  M_TelemetryReporterModule_maybe.telemetry(e, o, r);
};
exports.telemetryRejected = function (e, t, r) {
  const o = t + ".rejected";
  const s = e.get(M_contextual_filter_utils_maybe.ContextualFilterManager);
  s.previousLabel = 0;
  s.previousLabelTimestamp = Date.now();
  M_TelemetryReporterModule_maybe.telemetry(e, o, r);
};
exports.mkCanceledResultTelemetry = function (e, t = {}) {
  return {
    ...t,
    telemetryBlob: e,
  };
};
exports.mkBasicResultTelemetry = function (e) {
  return {
    headerRequestId: e.properties.headerRequestId,
    copilot_trackingId: e.properties.copilot_trackingId,
  };
};
exports.handleGhostTextResultTelemetry = async function (e, t) {
  if ("success" === t.type) {
    M_TelemetryReporterModule_maybe.telemetryRaw(
      e,
      "ghostText.produced",
      t.telemetryData,
      {}
    );
    return t.value;
  }
  if ("abortedBeforeIssued" !== t.type) {
    if ("canceled" !== t.type) {
      M_TelemetryReporterModule_maybe.telemetryRaw(
        e,
        `ghostText.${t.type}`,
        {
          ...t.telemetryData,
          reason: t.reason,
        },
        {}
      );
    } else {
      M_TelemetryReporterModule_maybe.telemetry(
        e,
        "ghostText.canceled",
        t.telemetryData.telemetryBlob.extendedBy({
          reason: t.reason,
          cancelledNetworkRequest: t.telemetryData.cancelledNetworkRequest
            ? "true"
            : "false",
        })
      );
    }
  }
};
