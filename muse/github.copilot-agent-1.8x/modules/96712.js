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
const n = require("assert");
const i = require(75611);
const o = require(20039);
const s = require(65489);
const a = require(89531);
const c = require(89600);
async function collectCapturedTelemetry(e) {
  const t = e.get(s.TelemetryEndpointUrl).getUrl();
  const r = await e.get(o.Fetcher).fetch(t, {});
  const i = (await r.json()).messages ?? [];
  for (const e of i) n.strictEqual(e.tags["ai.cloud.roleInstance"], "REDACTED");
  return i;
}
function isEvent(e) {
  return "EventData" === e.data.baseType;
}
async function d(e, t, r) {
  const n = await c.startFakeTelemetryServerIfNecessary();
  const i = Math.floor(1e5 * Math.random()).toString();
  delete process.env.http_proxy;
  delete process.env.https_proxy;
  const o = e.get(s.TelemetryEndpointUrl).getUrl();
  e.get(s.TelemetryEndpointUrl).setUrlForTesting(`http://localhost:${n}/${i}`);
  a.setupStandardReporters(e, "copilot-test");
  if (t) {
    a.forceSendingTelemetry(e);
  }
  try {
    a.hackOptOutListener(e);
    const t = await r(e);
    await new Promise((e) => setTimeout(e, 2e3));
    await e.get(s.TelemetryReporters).deactivate();
    await new Promise((e) => setTimeout(e, 100));
    return [await collectCapturedTelemetry(e), t];
  } finally {
    e.get(s.TelemetryEndpointUrl).setUrlForTesting(o);
  }
}
exports.collectCapturedTelemetry = collectCapturedTelemetry;
exports.isStandardTelemetryMessage = function (e) {
  return e.iKey === a.APP_INSIGHTS_KEY;
};
exports.isRestrictedTelemetryMessage = function (e) {
  return e.iKey === a.APP_INSIGHTS_KEY_SECURE;
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
  return d(new i.Context(e), true, t);
};
exports.withOptionalTelemetryCapture = async function (e, t) {
  return d(new i.Context(e), false, t);
};
exports.withInlineTelemetryCapture = async function (e, t) {
  return d(e, true, t);
};
exports.assertHasProperty = function (e, t) {
  n.ok(
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