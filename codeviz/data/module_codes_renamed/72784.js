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
var M_ContextualFilterManager_maybe = require("ContextualFilterManager");
exports.AzureMonitorSymbol = "Azure_Monitor_Tracer";
var o = (function () {
  function e() {}
  e.prototype.onStart = function (e) {};
  e.prototype.onEnd = function (e) {
    M_ContextualFilterManager_maybe.channel.publish("azure-coretracing", e);
  };
  e.prototype.shutdown = function () {};
  return e;
})();
exports.azureCoreTracing = {
  versionSpecifier: ">= 1.0.0 < 2.0.0",
  patch: function (e) {
    try {
      var s = new (0, require("@opentelemetry/tracing").BasicTracer)(
        M_ContextualFilterManager_maybe.channel.spanContextPropagator
          ? {
              scopeManager:
                M_ContextualFilterManager_maybe.channel.spanContextPropagator,
            }
          : undefined
      );
      var a = s.startSpan;
      s.startSpan = function (e, t) {
        if (!t || !t.parent) {
          var r = s.getCurrentSpan();
          if (r && r.operation && r.operation.traceparent) {
            t = n({}, t, {
              parent: {
                traceId: r.operation.traceparent.traceId,
                spanId: r.operation.traceparent.spanId,
              },
            });
          }
        }
        var i = a.call(this, e, t);
        i.addEvent("Application Insights Integration enabled");
        return i;
      };
      s.addSpanProcessor(new o());
      s[exports.AzureMonitorSymbol] = true;
      e.setTracer(s);
    } catch (e) {}
    return e;
  },
};
exports.enable = function () {
  M_ContextualFilterManager_maybe.channel.registerMonkeyPatch(
    "@azure/core-tracing",
    exports.azureCoreTracing
  );
};
