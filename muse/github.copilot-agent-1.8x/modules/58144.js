Object.defineProperty(exports, "__esModule", {
  value: true,
});
var n;
var i = require(6751);
var o = require(3245);
var s = require(13014);
var a = require(13103);
var c = require(29816);
var l = require(92646);
var u = require(26590);
var d = require(12010);
var p = require(80639);
var h = require(80582);
exports.TelemetryClient = require(439);
exports.Contracts = require(85512);
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
    d.warn("Start cannot be called before setup");
  }
  return Configuration;
}
exports.setup = function (e) {
  if (exports.defaultClient) {
    d.info("The default client is already setup");
  } else {
    exports.defaultClient = new exports.TelemetryClient(e);
    m = new o(exports.defaultClient);
    y = new s(exports.defaultClient);
    v = new a(exports.defaultClient);
    b = new l(exports.defaultClient);
    w = new c(exports.defaultClient);
    if (_) {
      _ = new h.AutoCollectNativePerformance(exports.defaultClient);
    }
  }
  if (exports.defaultClient && exports.defaultClient.channel) {
    exports.defaultClient.channel.setUseDiskRetryCaching(A, O, L);
  }
  return Configuration;
};
exports.start = start;
exports.getCorrelationContext = function () {
  return P ? i.CorrelationContextManager.getCurrentContext() : null;
};
exports.wrapWithCorrelationContext = function (e) {
  return i.CorrelationContextManager.wrapCallback(e);
};
var Configuration = (function () {
  function e() {}
  e.setDistributedTracingMode = function (t) {
    u.w3cEnabled = t === n.AI_AND_W3C;
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
    var n = h.AutoCollectNativePerformance.parseEnabled(r);
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
    d.enableDebug = t;
    d.disableWarnings = !r;
    return e;
  };
  e.setSendLiveMetrics = function (r) {
    if (undefined === r) {
      r = false;
    }
    return exports.defaultClient
      ? (!exports.liveMetricsClient && r
          ? ((exports.liveMetricsClient = new p(
              exports.defaultClient.config.instrumentationKey
            )),
            (C = new a(exports.liveMetricsClient, 1e3, true)),
            exports.liveMetricsClient.addCollector(C),
            (exports.defaultClient.quickPulseClient =
              exports.liveMetricsClient))
          : exports.liveMetricsClient && exports.liveMetricsClient.enable(r),
        (R = r),
        e)
      : (d.warn(
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