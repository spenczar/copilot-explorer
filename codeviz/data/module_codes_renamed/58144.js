Object.defineProperty(exports, "__esModule", {
  value: true,
});
var n;
var M_CorrelationContextManagerModule_maybe = require("CorrelationContextManagerModule");
var M_ConsoleLoggingAdapterTracker_maybe = require("ConsoleLoggingAdapterTracker");
var M_ExceptionTracker_maybe = require("ExceptionTracker");
var M_PerformanceTracker_maybe = require("PerformanceTracker");
var M_RequestTrackerModule_maybe = require("RequestTrackerModule");
var M_server_request_tracker_maybe = require("server-request-tracker");
var M_correlation_id_manager_maybe = require("correlation-id-manager");
var M_LoggingUtils_maybe = require("LoggingUtils");
var M_QuickPulseManager_maybe = require("QuickPulseManager");
var M_NativePerformanceCollector_maybe = require("NativePerformanceCollector");
exports.TelemetryClient = require("NodeHttpRequestTracker");
exports.Contracts = require("ObjectPropertyManager");
(function (e) {
  e[(e.AI = 0)] = "AI";
  e[(e.AI_AND_W3C = 1)] = "AI_AND_W3C";
})(
  (n =
    exports.DistributedTracingModes || (exports.DistributedTracingModes = {}))
);
var f;
var g;
var m;
var y;
var v;
var _;
var b;
var w;
var C;
var E = true;
var T = false;
var S = true;
var x = true;
var k = true;
var I = true;
var A = true;
var P = true;
var R = false;
var N = true;
var O = undefined;
var L = undefined;
var D = false;
function start() {
  if (exports.defaultClient) {
    D = true;
    m.enable(E, T);
    y.enable(S);
    v.enable(x);
    _.enable(N, g);
    b.useAutoCorrelation(P, f);
    b.enable(k);
    w.enable(I);
    if (exports.liveMetricsClient && R) {
      exports.liveMetricsClient.enable(R);
    }
  } else {
    M_LoggingUtils_maybe.warn("Start cannot be called before setup");
  }
  return Configuration;
}
exports.setup = function (e) {
  if (exports.defaultClient) {
    M_LoggingUtils_maybe.info("The default client is already setup");
  } else {
    exports.defaultClient = new exports.TelemetryClient(e);
    m = new M_ConsoleLoggingAdapterTracker_maybe(exports.defaultClient);
    y = new M_ExceptionTracker_maybe(exports.defaultClient);
    v = new M_PerformanceTracker_maybe(exports.defaultClient);
    b = new M_server_request_tracker_maybe(exports.defaultClient);
    w = new M_RequestTrackerModule_maybe(exports.defaultClient);
    if (_) {
      _ = new M_NativePerformanceCollector_maybe.AutoCollectNativePerformance(
        exports.defaultClient
      );
    }
  }
  if (exports.defaultClient && exports.defaultClient.channel) {
    exports.defaultClient.channel.setUseDiskRetryCaching(A, O, L);
  }
  return Configuration;
};
exports.start = start;
exports.getCorrelationContext = function () {
  return P
    ? M_CorrelationContextManagerModule_maybe.CorrelationContextManager.getCurrentContext()
    : null;
};
exports.wrapWithCorrelationContext = function (e) {
  return M_CorrelationContextManagerModule_maybe.CorrelationContextManager.wrapCallback(
    e
  );
};
var Configuration = (function () {
  function e() {}
  e.setDistributedTracingMode = function (t) {
    M_correlation_id_manager_maybe.w3cEnabled = t === n.AI_AND_W3C;
    return e;
  };
  e.setAutoCollectConsole = function (t, r) {
    if (undefined === r) {
      r = false;
    }
    E = t;
    T = r;
    if (D) {
      m.enable(t, r);
    }
    return e;
  };
  e.setAutoCollectExceptions = function (t) {
    S = t;
    if (D) {
      y.enable(t);
    }
    return e;
  };
  e.setAutoCollectPerformance = function (t, r) {
    if (undefined === r) {
      r = true;
    }
    x = t;
    var n =
      M_NativePerformanceCollector_maybe.AutoCollectNativePerformance.parseEnabled(
        r
      );
    N = n.isEnabled;
    g = n.disabledMetrics;
    if (D) {
      v.enable(t);
      _.enable(n.isEnabled, n.disabledMetrics);
    }
    return e;
  };
  e.setAutoCollectRequests = function (t) {
    k = t;
    if (D) {
      b.enable(t);
    }
    return e;
  };
  e.setAutoCollectDependencies = function (t) {
    I = t;
    if (D) {
      w.enable(t);
    }
    return e;
  };
  e.setAutoDependencyCorrelation = function (t, r) {
    P = t;
    f = r;
    if (D) {
      b.useAutoCorrelation(t, r);
    }
    return e;
  };
  e.setUseDiskRetryCaching = function (r, n, i) {
    A = r;
    O = n;
    L = i;
    if (exports.defaultClient && exports.defaultClient.channel) {
      exports.defaultClient.channel.setUseDiskRetryCaching(r, n, i);
    }
    return e;
  };
  e.setInternalLogging = function (t, r) {
    if (undefined === t) {
      t = false;
    }
    if (undefined === r) {
      r = true;
    }
    M_LoggingUtils_maybe.enableDebug = t;
    M_LoggingUtils_maybe.disableWarnings = !r;
    return e;
  };
  e.setSendLiveMetrics = function (r) {
    if (undefined === r) {
      r = false;
    }
    return exports.defaultClient
      ? (!exports.liveMetricsClient && r
          ? ((exports.liveMetricsClient = new M_QuickPulseManager_maybe(
              exports.defaultClient.config.instrumentationKey
            )),
            (C = new M_PerformanceTracker_maybe(
              exports.liveMetricsClient,
              1e3,
              true
            )),
            exports.liveMetricsClient.addCollector(C),
            (exports.defaultClient.quickPulseClient =
              exports.liveMetricsClient))
          : exports.liveMetricsClient && exports.liveMetricsClient.enable(r),
        (R = r),
        e)
      : (M_LoggingUtils_maybe.warn(
          "Live metrics client cannot be setup without the default client"
        ),
        e);
  };
  e.start = start;
  return e;
})();
exports.Configuration = Configuration;
exports.dispose = function () {
  exports.defaultClient = null;
  D = false;
  if (m) {
    m.dispose();
  }
  if (y) {
    y.dispose();
  }
  if (v) {
    v.dispose();
  }
  if (_) {
    _.dispose();
  }
  if (b) {
    b.dispose();
  }
  if (w) {
    w.dispose();
  }
  if (exports.liveMetricsClient) {
    exports.liveMetricsClient.enable(false);
    R = false;
    exports.liveMetricsClient = undefined;
  }
};
