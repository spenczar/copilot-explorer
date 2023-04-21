Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.FailingTelemetryReporter =
  exports.assertHasProperty =
  exports.withInlineTelemetryCapture =
  exports.withOptionalTelemetryCapture =
  exports.withTelemetryCapture =
  exports.allEvents =
  exports.isException =
  exports.isEvent =
  exports.isRestrictedTelemetryMessage =
  exports.isStandardTelemetryMessage =
  exports.collectCapturedTelemetry =
    undefined;
const M_assert = require("assert");
const M_ContextManager_maybe = require("ContextManager");
const M_FetcherRequestManager_maybe = require("FetcherRequestManager");
const M_TelemetryReporterModule_maybe = require("TelemetryReporterModule");
const M_AppInsightsTelemetryManager_maybe = require("AppInsightsTelemetryManager");
const M_TelemetryFakeServerManager_maybe = require("TelemetryFakeServerManager");
async function collectCapturedTelemetry(e) {
  const t = e
    .get(M_TelemetryReporterModule_maybe.TelemetryEndpointUrl)
    .getUrl();
  const r = await e.get(M_FetcherRequestManager_maybe.Fetcher).fetch(t, {});
  const i = (await r.json()).messages ?? [];
  for (const e of i)
    M_assert.strictEqual(e.tags["ai.cloud.roleInstance"], "REDACTED");
  return i;
}
function isEvent(e) {
  return "EventData" === e.data.baseType;
}
async function d(e, t, r) {
  const n =
    await M_TelemetryFakeServerManager_maybe.startFakeTelemetryServerIfNecessary();
  const i = Math.floor(1e5 * Math.random()).toString();
  delete process.env.http_proxy;
  delete process.env.https_proxy;
  const o = e
    .get(M_TelemetryReporterModule_maybe.TelemetryEndpointUrl)
    .getUrl();
  e.get(M_TelemetryReporterModule_maybe.TelemetryEndpointUrl).setUrlForTesting(
    `http://localhost:${n}/${i}`
  );
  M_AppInsightsTelemetryManager_maybe.setupStandardReporters(e, "copilot-test");
  if (t) {
    M_AppInsightsTelemetryManager_maybe.forceSendingTelemetry(e);
  }
  try {
    M_AppInsightsTelemetryManager_maybe.hackOptOutListener(e);
    const t = await r(e);
    await new Promise((e) => setTimeout(e, 2e3));
    await e
      .get(M_TelemetryReporterModule_maybe.TelemetryReporters)
      .deactivate();
    await new Promise((e) => setTimeout(e, 100));
    return [await collectCapturedTelemetry(e), t];
  } finally {
    e.get(
      M_TelemetryReporterModule_maybe.TelemetryEndpointUrl
    ).setUrlForTesting(o);
  }
}
exports.collectCapturedTelemetry = collectCapturedTelemetry;
exports.isStandardTelemetryMessage = function (e) {
  return e.iKey === M_AppInsightsTelemetryManager_maybe.APP_INSIGHTS_KEY;
};
exports.isRestrictedTelemetryMessage = function (e) {
  return e.iKey === M_AppInsightsTelemetryManager_maybe.APP_INSIGHTS_KEY_SECURE;
};
exports.isEvent = isEvent;
exports.isException = function (e) {
  return "ExceptionData" === e.data.baseType;
};
exports.allEvents = function (e) {
  for (const t of e) if (!isEvent(t)) return false;
  return true;
};
exports.withTelemetryCapture = async function (e, t) {
  return d(new M_ContextManager_maybe.Context(e), true, t);
};
exports.withOptionalTelemetryCapture = async function (e, t) {
  return d(new M_ContextManager_maybe.Context(e), false, t);
};
exports.withInlineTelemetryCapture = async function (e, t) {
  return d(e, true, t);
};
exports.assertHasProperty = function (e, t) {
  M_assert.ok(
    e
      .filter(
        (e) => "ghostText.produced" !== e.data.baseData.name.split("/")[1]
      )
      .every((e) => {
        const r = e.data.baseData.properties;
        return t.call(r, r);
      })
  );
};
exports.FailingTelemetryReporter = class {
  sendTelemetryEvent(e, t, r) {
    throw new Error("Telemetry disabled");
  }
  sendTelemetryErrorEvent(e, t, r, n) {
    throw new Error("Telemetry disabled");
  }
  sendTelemetryException(e, t, r) {
    throw new Error("Telemetry disabled");
  }
  dispose() {
    return Promise.resolve();
  }
  hackOptOutListener() {}
};
