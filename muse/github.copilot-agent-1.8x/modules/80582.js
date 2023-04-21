var n =
  (this && this.__assign) ||
  Object.assign ||
  function (e) {
    for (r = 1, n = arguments.length, undefined; r < n; r++) {
      var t;
      var r;
      var n;
      for (var i in (t = arguments[r]))
        if (Object.prototype.hasOwnProperty.call(t, i)) {
          e[i] = t[i];
        }
    }
    return e;
  };
Object.defineProperty(exports, "__esModule", {
  value: true,
});
var i = require(12049);
var o = require(82028);
var s = require(12010);
var AutoCollectNativePerformance = (function () {
  function e(t) {
    this._disabledMetrics = {};
    if (e.INSTANCE) {
      e.INSTANCE.dispose();
    }
    e.INSTANCE = this;
    this._client = t;
  }
  e.isNodeVersionCompatible = function () {
    var e = process.versions.node.split(".");
    return parseInt(e[0]) >= 6;
  };
  e.prototype.enable = function (t, n, i) {
    var o = this;
    if (undefined === n) {
      n = {};
    }
    if (undefined === i) {
      i = 6e4;
    }
    if (e.isNodeVersionCompatible()) {
      if (null == e._metricsAvailable && t && !this._isInitialized)
        try {
          var a = require("applicationinsights-native-metrics");
          (e._emitter = new a()),
            (e._metricsAvailable = !0),
            s.info("Native metrics module successfully loaded!");
        } catch (t) {
          return void (e._metricsAvailable = !1);
        }
      (this._isEnabled = t),
        (this._disabledMetrics = n),
        this._isEnabled && !this._isInitialized && (this._isInitialized = !0),
        this._isEnabled && e._emitter
          ? (e._emitter.enable(!0, i),
            (this._handle = setInterval(function () {
              return o._trackNativeMetrics();
            }, i)),
            this._handle.unref())
          : e._emitter &&
            (e._emitter.enable(!1),
            this._handle &&
              (clearInterval(this._handle), (this._handle = void 0)));
    }
  };
  e.prototype.dispose = function () {
    this.enable(false);
  };
  e.parseEnabled = function (e) {
    var t = process.env[i.ENV_nativeMetricsDisableAll];
    var r = process.env[i.ENV_nativeMetricsDisablers];
    if (t)
      return {
        isEnabled: false,
        disabledMetrics: {},
      };
    if (r) {
      var o = r.split(",");
      var s = {};
      if (o.length > 0)
        for (a = 0, c = o, undefined; a < c.length; a++) {
          var a;
          var c;
          s[c[a]] = true;
        }
      return "object" == typeof e
        ? {
            isEnabled: true,
            disabledMetrics: n({}, e, s),
          }
        : {
            isEnabled: e,
            disabledMetrics: s,
          };
    }
    return "boolean" == typeof e
      ? {
          isEnabled: e,
          disabledMetrics: {},
        }
      : {
          isEnabled: true,
          disabledMetrics: e,
        };
  };
  e.prototype._trackNativeMetrics = function () {
    var e = true;
    if ("object" != typeof this._isEnabled) {
      e = this._isEnabled;
    }
    if (e) {
      this._trackGarbageCollection();
      this._trackEventLoop();
      this._trackHeapUsage();
    }
  };
  e.prototype._trackGarbageCollection = function () {
    if (!this._disabledMetrics.gc) {
      var t;
      var r = e._emitter.getGCData();
      for (var n in r) {
        var i = r[n].metrics;
        var s = n + " Garbage Collection Duration";
        var a =
          Math.sqrt(i.sumSquares / i.count - Math.pow(i.total / i.count, 2)) ||
          0;
        this._client.trackMetric({
          name: s,
          value: i.total,
          count: i.count,
          max: i.max,
          min: i.min,
          stdDev: a,
          tagOverrides:
            ((t = {}),
            (t[this._client.context.keys.internalSdkVersion] =
              "node-nativeperf:" + o.sdkVersion),
            t),
        });
      }
    }
  };
  e.prototype._trackEventLoop = function () {
    if (!this._disabledMetrics.loop) {
      var t = e._emitter.getLoopData().loopUsage;
      if (0 != t.count) {
        var r;
        var n =
          Math.sqrt(t.sumSquares / t.count - Math.pow(t.total / t.count, 2)) ||
          0;
        this._client.trackMetric({
          name: "Event Loop CPU Time",
          value: t.total,
          count: t.count,
          min: t.min,
          max: t.max,
          stdDev: n,
          tagOverrides:
            ((r = {}),
            (r[this._client.context.keys.internalSdkVersion] =
              "node-nativeperf:" + o.sdkVersion),
            r),
        });
      }
    }
  };
  e.prototype._trackHeapUsage = function () {
    if (!this._disabledMetrics.heap) {
      var e;
      var t;
      var r;
      var n = process.memoryUsage();
      var i = n.heapUsed;
      var s = n.heapTotal;
      var a = n.rss;
      this._client.trackMetric({
        name: "Memory Usage (Heap)",
        value: i,
        count: 1,
        tagOverrides:
          ((e = {}),
          (e[this._client.context.keys.internalSdkVersion] =
            "node-nativeperf:" + o.sdkVersion),
          e),
      });
      this._client.trackMetric({
        name: "Memory Total (Heap)",
        value: s,
        count: 1,
        tagOverrides:
          ((t = {}),
          (t[this._client.context.keys.internalSdkVersion] =
            "node-nativeperf:" + o.sdkVersion),
          t),
      });
      this._client.trackMetric({
        name: "Memory Usage (Non-Heap)",
        value: a - s,
        count: 1,
        tagOverrides:
          ((r = {}),
          (r[this._client.context.keys.internalSdkVersion] =
            "node-nativeperf:" + o.sdkVersion),
          r),
      });
    }
  };
  return e;
})();
exports.AutoCollectNativePerformance = AutoCollectNativePerformance;