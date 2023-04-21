Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.forceSendingTelemetry =
  exports.hackOptOutListener =
  exports.setupStandardReporters =
  exports.APP_INSIGHTS_KEY_SECURE =
  exports.APP_INSIGHTS_KEY =
    undefined;
const n = require(29929);
const i = require(39800);
const o = require(65489);
const s = require(3855);
function a(e, t, r, i) {
  const o = new n.default(t, r, i);
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
    const n = o.TelemetryData.sanitizeKeys(t);
    r.appInsightsClient.commonProperties = n;
    r.appInsightsClient.context.tags[
      r.appInsightsClient.context.keys.cloudRoleInstance
    ] = "REDACTED";
    r.appInsightsClient.context.tags[
      r.appInsightsClient.context.keys.sessionId
    ] = e.get(i.EditorSession).sessionId;
    r.appInsightsClient.context.tags[r.appInsightsClient.context.keys.userId] =
      e.get(i.EditorSession).machineId;
    const s = e.get(o.TelemetryEndpointUrl).getUrl();
    r.appInsightsClient.config.endpointUrl = s;
  }
}
exports.APP_INSIGHTS_KEY = "7d7048df-6dd0-4048-bb23-b716c1461f8f";
exports.APP_INSIGHTS_KEY_SECURE = "3fdd7f28-937a-48c8-9a21-ba337db23bd1";
exports.setupStandardReporters = function (e, r) {
  const n = i.getVersion(e);
  let c = a(e, r, n, exports.APP_INSIGHTS_KEY);
  let l = a(e, r, n, exports.APP_INSIGHTS_KEY_SECURE);
  c = new s.LoggingTelemetryReporter(e, "standard", c);
  l = new s.LoggingTelemetryReporter(e, "secure", l);
  const u = e.get(o.TelemetryReporters);
  u.setReporter(c);
  u.setSecureReporter(l);
};
exports.hackOptOutListener = function (e) {
  const t = e.get(o.TelemetryReporters);
  t.getReporter(e).hackOptOutListener();
  t.getSecureReporter(e).hackOptOutListener();
};
exports.forceSendingTelemetry = function (e) {
  const r = e.get(o.TelemetryReporters);
  try {
    c(e, exports.APP_INSIGHTS_KEY, r.getReporter(e));
    c(e, exports.APP_INSIGHTS_KEY_SECURE, r.getSecureReporter(e));
  } catch (e) {}
};