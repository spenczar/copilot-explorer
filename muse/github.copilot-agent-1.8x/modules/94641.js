var n = require("url");
var i = require(12049);
var o = require(82028);
var s = require(85512);
var a = require(4240);
var c = require(91711);
var l = require(6751);
var u = require(90589);
var d = require(77649);
var p = require(12010);
var h = require(74532);
var f = (function () {
  function e(e) {
    this._telemetryProcessors = [];
    var t = new i(e);
    this.config = t;
    this.context = new o();
    this.commonProperties = {};
    var r = new u(this.config);
    this.channel = new a(
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
    this.track(e, s.TelemetryType.Availability);
  };
  e.prototype.trackTrace = function (e) {
    this.track(e, s.TelemetryType.Trace);
  };
  e.prototype.trackMetric = function (e) {
    this.track(e, s.TelemetryType.Metric);
  };
  e.prototype.trackException = function (e) {
    if (e && e.exception && !d.isError(e.exception)) {
      e.exception = new Error(e.exception.toString());
    }
    this.track(e, s.TelemetryType.Exception);
  };
  e.prototype.trackEvent = function (e) {
    this.track(e, s.TelemetryType.Event);
  };
  e.prototype.trackRequest = function (e) {
    this.track(e, s.TelemetryType.Request);
  };
  e.prototype.trackDependency = function (e) {
    if (e && !e.target && e.data) {
      e.target = n.parse(e.data).host;
    }
    this.track(e, s.TelemetryType.Dependency);
  };
  e.prototype.flush = function (e) {
    this.channel.triggerSend(
      !!e && !!e.isAppCrashing,
      e ? e.callback : undefined
    );
  };
  e.prototype.track = function (e, t) {
    if (e && s.telemetryTypeToBaseType(t)) {
      var r = h.createEnvelope(
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
        c.samplingTelemetryProcessor(r, {
          correlationContext: l.CorrelationContextManager.getCurrentContext(),
        });
      c.performanceMetricsTelemetryProcessor(r, this.quickPulseClient);
      if (n) {
        this.channel.send(r);
      }
    } else
      p.warn(
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
      l.CorrelationContextManager.getCurrentContext();
    for (var i = 0; i < n; ++i)
      try {
        var o = this._telemetryProcessors[i];
        if (o && false === o.apply(null, [e, t])) {
          r = false;
          break;
        }
      } catch (t) {
        r = true;
        p.warn(
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