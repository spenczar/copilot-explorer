Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.forceSendingTelemetry =
  exports.hackOptOutListener =
  exports.setupStandardReporters =
  exports.APP_INSIGHTS_KEY_SECURE =
  exports.APP_INSIGHTS_KEY =
    undefined;
const M_TelemetryManager_maybe = require("TelemetryManager");
const M_editor_config_constants_maybe = require("editor-config-constants");
const M_TelemetryReporterModule_maybe = require("TelemetryReporterModule");
const M_LoggingTelemetryReporterModule_maybe = require("LoggingTelemetryReporterModule");
function a(e, t, r, i) {
  const o = new M_TelemetryManager_maybe.default(t, r, i);
  l(e, o);
  return o;
}
function c(e, t, r) {
  if (r) {
    const n = r.getDelegate();
    const i = n;
    i.userOptIn = true;
    i.createAppInsightsClient(t);
    l(e, n);
  }
}
function l(e, t) {
  const r = t;
  if (r.appInsightsClient) {
    const t = r.appInsightsClient.commonProperties;
    const n = M_TelemetryReporterModule_maybe.TelemetryData.sanitizeKeys(t);
    r.appInsightsClient.commonProperties = n;
    r.appInsightsClient.context.tags[
      r.appInsightsClient.context.keys.cloudRoleInstance
    ] = "REDACTED";
    r.appInsightsClient.context.tags[
      r.appInsightsClient.context.keys.sessionId
    ] = e.get(M_editor_config_constants_maybe.EditorSession).sessionId;
    r.appInsightsClient.context.tags[r.appInsightsClient.context.keys.userId] =
      e.get(M_editor_config_constants_maybe.EditorSession).machineId;
    const s = e
      .get(M_TelemetryReporterModule_maybe.TelemetryEndpointUrl)
      .getUrl();
    r.appInsightsClient.config.endpointUrl = s;
  }
}
exports.APP_INSIGHTS_KEY = "7d7048df-6dd0-4048-bb23-b716c1461f8f";
exports.APP_INSIGHTS_KEY_SECURE = "3fdd7f28-937a-48c8-9a21-ba337db23bd1";
exports.setupStandardReporters = function (e, r) {
  const n = M_editor_config_constants_maybe.getVersion(e);
  let c = a(e, r, n, exports.APP_INSIGHTS_KEY);
  let l = a(e, r, n, exports.APP_INSIGHTS_KEY_SECURE);
  c = new M_LoggingTelemetryReporterModule_maybe.LoggingTelemetryReporter(
    e,
    "standard",
    c
  );
  l = new M_LoggingTelemetryReporterModule_maybe.LoggingTelemetryReporter(
    e,
    "secure",
    l
  );
  const u = e.get(M_TelemetryReporterModule_maybe.TelemetryReporters);
  u.setReporter(c);
  u.setSecureReporter(l);
};
exports.hackOptOutListener = function (e) {
  const t = e.get(M_TelemetryReporterModule_maybe.TelemetryReporters);
  t.getReporter(e).hackOptOutListener();
  t.getSecureReporter(e).hackOptOutListener();
};
exports.forceSendingTelemetry = function (e) {
  const r = e.get(M_TelemetryReporterModule_maybe.TelemetryReporters);
  try {
    c(e, exports.APP_INSIGHTS_KEY, r.getReporter(e));
    c(e, exports.APP_INSIGHTS_KEY_SECURE, r.getSecureReporter(e));
  } catch (e) {}
};
