var M_os = require("os");
var M_QuickPulseTelemetryModule_maybe = require("QuickPulseTelemetryModule");
var o = (function () {
  function e(t, r, n) {
    if (undefined === r) {
      r = 6e4;
    }
    if (undefined === n) {
      n = false;
    }
    this._lastIntervalRequestExecutionTime = 0;
    this._lastIntervalDependencyExecutionTime = 0;
    if (e.INSTANCE) {
      e.INSTANCE = this;
    }
    this._isInitialized = false;
    this._client = t;
    this._collectionInterval = r;
    this._enableLiveMetricsCounters = n;
  }
  e.prototype.enable = function (t, r) {
    var i = this;
    this._isEnabled = t;
    if (this._isEnabled && !this._isInitialized) {
      this._isInitialized = true;
    }
    if (t) {
      if (this._handle) {
        this._lastCpus = M_os.cpus();
        this._lastRequests = {
          totalRequestCount: e._totalRequestCount,
          totalFailedRequestCount: e._totalFailedRequestCount,
          time: +new Date(),
        };
        this._lastDependencies = {
          totalDependencyCount: e._totalDependencyCount,
          totalFailedDependencyCount: e._totalFailedDependencyCount,
          time: +new Date(),
        };
        this._lastExceptions = {
          totalExceptionCount: e._totalExceptionCount,
          time: +new Date(),
        };
        if ("function" == typeof process.cpuUsage) {
          this._lastAppCpuUsage = process.cpuUsage();
        }
        this._lastHrtime = process.hrtime();
        this._collectionInterval = r || this._collectionInterval;
        this._handle = setInterval(function () {
          return i.trackPerformance();
        }, this._collectionInterval);
        this._handle.unref();
      }
    } else {
      if (this._handle) {
        clearInterval(this._handle);
        this._handle = undefined;
      }
    }
  };
  e.countRequest = function (t, r) {
    var n;
    if (e.isEnabled()) {
      if ("string" == typeof t) n = +new Date("1970-01-01T" + t + "Z");
      else {
        if ("number" != typeof t) return;
        n = t;
      }
      e._intervalRequestExecutionTime += n;
      if (false === r) {
        e._totalFailedRequestCount++;
      }
      e._totalRequestCount++;
    }
  };
  e.countException = function () {
    e._totalExceptionCount++;
  };
  e.countDependency = function (t, r) {
    var n;
    if (e.isEnabled()) {
      if ("string" == typeof t) n = +new Date("1970-01-01T" + t + "Z");
      else {
        if ("number" != typeof t) return;
        n = t;
      }
      e._intervalDependencyExecutionTime += n;
      if (false === r) {
        e._totalFailedDependencyCount++;
      }
      e._totalDependencyCount++;
    }
  };
  e.prototype.isInitialized = function () {
    return this._isInitialized;
  };
  e.isEnabled = function () {
    return e.INSTANCE && e.INSTANCE._isEnabled;
  };
  e.prototype.trackPerformance = function () {
    this._trackCpu();
    this._trackMemory();
    this._trackNetwork();
    this._trackDependencyRate();
    this._trackExceptionRate();
  };
  e.prototype._trackCpu = function () {
    var e = M_os.cpus();
    if (e && e.length && this._lastCpus && e.length === this._lastCpus.length) {
      for (
        t = 0, r = 0, o = 0, s = 0, a = 0, c = 0, undefined;
        e && c < e.length;
        c++
      ) {
        var t;
        var r;
        var o;
        var s;
        var a;
        var c;
        var l = e[c];
        var u = this._lastCpus[c];
        var d = (l.model, l.speed, l.times);
        var p = u.times;
        t += d.user - p.user || 0;
        r += d.sys - p.sys || 0;
        o += d.nice - p.nice || 0;
        s += d.idle - p.idle || 0;
        a += d.irq - p.irq || 0;
      }
      var h = undefined;
      if ("function" == typeof process.cpuUsage) {
        var f = process.cpuUsage();
        var g = process.hrtime();
        var m =
          f.user -
            this._lastAppCpuUsage.user +
            (f.system - this._lastAppCpuUsage.system) || 0;
        if (undefined !== this._lastHrtime && 2 === this._lastHrtime.length) {
          h =
            (100 * m) /
            ((1e6 * (g[0] - this._lastHrtime[0]) +
              (g[1] - this._lastHrtime[1]) / 1e3 || 0) *
              e.length);
        }
        this._lastAppCpuUsage = f;
        this._lastHrtime = g;
      }
      var y = t + r + o + s + a || 1;
      this._client.trackMetric({
        name: M_QuickPulseTelemetryModule_maybe.PerformanceCounter
          .PROCESSOR_TIME,
        value: ((y - s) / y) * 100,
      });
      this._client.trackMetric({
        name: M_QuickPulseTelemetryModule_maybe.PerformanceCounter.PROCESS_TIME,
        value: h || (t / y) * 100,
      });
    }
    this._lastCpus = e;
  };
  e.prototype._trackMemory = function () {
    var e = M_os.freemem();
    var t = process.memoryUsage().rss;
    var r = M_os.totalmem() - e;
    this._client.trackMetric({
      name: M_QuickPulseTelemetryModule_maybe.PerformanceCounter.PRIVATE_BYTES,
      value: t,
    });
    this._client.trackMetric({
      name: M_QuickPulseTelemetryModule_maybe.PerformanceCounter
        .AVAILABLE_BYTES,
      value: e,
    });
    if (this._enableLiveMetricsCounters) {
      this._client.trackMetric({
        name: M_QuickPulseTelemetryModule_maybe.QuickPulseCounter
          .COMMITTED_BYTES,
        value: r,
      });
    }
  };
  e.prototype._trackNetwork = function () {
    var t = this._lastRequests;
    var r = {
      totalRequestCount: e._totalRequestCount,
      totalFailedRequestCount: e._totalFailedRequestCount,
      time: +new Date(),
    };
    var n = r.totalRequestCount - t.totalRequestCount || 0;
    var o = r.totalFailedRequestCount - t.totalFailedRequestCount || 0;
    var s = r.time - t.time;
    var a = s / 1e3;
    var c =
      (e._intervalRequestExecutionTime -
        this._lastIntervalRequestExecutionTime) /
        n || 0;
    this._lastIntervalRequestExecutionTime = e._intervalRequestExecutionTime;
    if (s > 0) {
      var l = n / a,
        u = o / a;
      this._client.trackMetric({
        name: M_QuickPulseTelemetryModule_maybe.PerformanceCounter.REQUEST_RATE,
        value: l,
      }),
        (!this._enableLiveMetricsCounters || n > 0) &&
          this._client.trackMetric({
            name: M_QuickPulseTelemetryModule_maybe.PerformanceCounter
              .REQUEST_DURATION,
            value: c,
          }),
        this._enableLiveMetricsCounters &&
          this._client.trackMetric({
            name: M_QuickPulseTelemetryModule_maybe.QuickPulseCounter
              .REQUEST_FAILURE_RATE,
            value: u,
          });
    }
    this._lastRequests = r;
  };
  e.prototype._trackDependencyRate = function () {
    if (this._enableLiveMetricsCounters) {
      var t = this._lastDependencies;
      var r = {
        totalDependencyCount: e._totalDependencyCount,
        totalFailedDependencyCount: e._totalFailedDependencyCount,
        time: +new Date(),
      };
      var n = r.totalDependencyCount - t.totalDependencyCount || 0;
      var o = r.totalFailedDependencyCount - t.totalFailedDependencyCount || 0;
      var s = r.time - t.time;
      var a = s / 1e3;
      var c =
        (e._intervalDependencyExecutionTime -
          this._lastIntervalDependencyExecutionTime) /
          n || 0;
      this._lastIntervalDependencyExecutionTime =
        e._intervalDependencyExecutionTime;
      if (s > 0) {
        var l = n / a,
          u = o / a;
        this._client.trackMetric({
          name: M_QuickPulseTelemetryModule_maybe.QuickPulseCounter
            .DEPENDENCY_RATE,
          value: l,
        }),
          this._client.trackMetric({
            name: M_QuickPulseTelemetryModule_maybe.QuickPulseCounter
              .DEPENDENCY_FAILURE_RATE,
            value: u,
          }),
          (!this._enableLiveMetricsCounters || n > 0) &&
            this._client.trackMetric({
              name: M_QuickPulseTelemetryModule_maybe.QuickPulseCounter
                .DEPENDENCY_DURATION,
              value: c,
            });
      }
      this._lastDependencies = r;
    }
  };
  e.prototype._trackExceptionRate = function () {
    if (this._enableLiveMetricsCounters) {
      var t = this._lastExceptions;
      var r = {
        totalExceptionCount: e._totalExceptionCount,
        time: +new Date(),
      };
      var n = r.totalExceptionCount - t.totalExceptionCount || 0;
      var o = r.time - t.time;
      if (o > 0) {
        var s = n / (o / 1e3);
        this._client.trackMetric({
          name: M_QuickPulseTelemetryModule_maybe.QuickPulseCounter
            .EXCEPTION_RATE,
          value: s,
        });
      }
      this._lastExceptions = r;
    }
  };
  e.prototype.dispose = function () {
    e.INSTANCE = null;
    this.enable(false);
    this._isInitialized = false;
  };
  e._totalRequestCount = 0;
  e._totalFailedRequestCount = 0;
  e._lastRequestExecutionTime = 0;
  e._totalDependencyCount = 0;
  e._totalFailedDependencyCount = 0;
  e._lastDependencyExecutionTime = 0;
  e._totalExceptionCount = 0;
  e._intervalDependencyExecutionTime = 0;
  e._intervalRequestExecutionTime = 0;
  return e;
})();
module.exports = o;
