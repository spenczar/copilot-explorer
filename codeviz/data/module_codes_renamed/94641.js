var M_url = require("url");
var M_AppInsightsConfigManager_maybe = require("AppInsightsConfigManager");
var M_ContextTagManager_maybe = require("ContextTagManager");
var M_ObjectPropertyManager_maybe = require("ObjectPropertyManager");
var M_TelemetryBatchSender_maybe = require("TelemetryBatchSender");
var M_ObjectPropertyManager_maybe = require("ObjectPropertyManager");
var M_CorrelationContextManagerModule_maybe = require("CorrelationContextManagerModule");
var M_DiskRetryManager_maybe = require("DiskRetryManager");
var M_CookieParserUtils_maybe = require("CookieParserUtils");
var M_LoggingUtils_maybe = require("LoggingUtils");
var M_TelemetryEnvelopeFactory_maybe = require("TelemetryEnvelopeFactory");
var f = (function () {
  function e(e) {
    this._telemetryProcessors = [];
    var t = new M_AppInsightsConfigManager_maybe(e);
    this.config = t;
    this.context = new M_ContextTagManager_maybe();
    this.commonProperties = {};
    var r = new M_DiskRetryManager_maybe(this.config);
    this.channel = new M_TelemetryBatchSender_maybe(
      function () {
        return t.disableAppInsights;
      },
      function () {
        return t.maxBatchSize;
      },
      function () {
        return t.maxBatchIntervalMs;
      },
      r
    );
  }
  e.prototype.trackAvailability = function (e) {
    this.track(e, M_ObjectPropertyManager_maybe.TelemetryType.Availability);
  };
  e.prototype.trackTrace = function (e) {
    this.track(e, M_ObjectPropertyManager_maybe.TelemetryType.Trace);
  };
  e.prototype.trackMetric = function (e) {
    this.track(e, M_ObjectPropertyManager_maybe.TelemetryType.Metric);
  };
  e.prototype.trackException = function (e) {
    if (e && e.exception && !M_CookieParserUtils_maybe.isError(e.exception)) {
      e.exception = new Error(e.exception.toString());
    }
    this.track(e, M_ObjectPropertyManager_maybe.TelemetryType.Exception);
  };
  e.prototype.trackEvent = function (e) {
    this.track(e, M_ObjectPropertyManager_maybe.TelemetryType.Event);
  };
  e.prototype.trackRequest = function (e) {
    this.track(e, M_ObjectPropertyManager_maybe.TelemetryType.Request);
  };
  e.prototype.trackDependency = function (e) {
    if (e && !e.target && e.data) {
      e.target = M_url.parse(e.data).host;
    }
    this.track(e, M_ObjectPropertyManager_maybe.TelemetryType.Dependency);
  };
  e.prototype.flush = function (e) {
    this.channel.triggerSend(
      !!e && !!e.isAppCrashing,
      e ? e.callback : undefined
    );
  };
  e.prototype.track = function (e, t) {
    if (e && M_ObjectPropertyManager_maybe.telemetryTypeToBaseType(t)) {
      var r = M_TelemetryEnvelopeFactory_maybe.createEnvelope(
        e,
        t,
        this.commonProperties,
        this.context,
        this.config
      );
      if (e.time) {
        r.time = e.time.toISOString();
      }
      var n = this.runTelemetryProcessors(r, e.contextObjects);
      n =
        n &&
        M_ObjectPropertyManager_maybe.samplingTelemetryProcessor(r, {
          correlationContext:
            M_CorrelationContextManagerModule_maybe.CorrelationContextManager.getCurrentContext(),
        });
      M_ObjectPropertyManager_maybe.performanceMetricsTelemetryProcessor(
        r,
        this.quickPulseClient
      );
      if (n) {
        this.channel.send(r);
      }
    } else
      M_LoggingUtils_maybe.warn(
        "track() requires telemetry object and telemetryType to be specified."
      );
  };
  e.prototype.addTelemetryProcessor = function (e) {
    this._telemetryProcessors.push(e);
  };
  e.prototype.clearTelemetryProcessors = function () {
    this._telemetryProcessors = [];
  };
  e.prototype.runTelemetryProcessors = function (e, t) {
    var r = true;
    var n = this._telemetryProcessors.length;
    if (0 === n) return r;
    (t = t || {}).correlationContext =
      M_CorrelationContextManagerModule_maybe.CorrelationContextManager.getCurrentContext();
    for (var i = 0; i < n; ++i)
      try {
        var o = this._telemetryProcessors[i];
        if (o && false === o.apply(null, [e, t])) {
          r = false;
          break;
        }
      } catch (t) {
        r = true;
        M_LoggingUtils_maybe.warn(
          "One of telemetry processors failed, telemetry item will be sent.",
          t,
          e
        );
      }
    return r;
  };
  return e;
})();
module.exports = f;
