var M_http = require("http");
var M_https = require("https");
var M_LoggingUtils_maybe = require("LoggingUtils");
var M_CookieParserUtils_maybe = require("CookieParserUtils");
var M_RequestContextHeadersModule_maybe = require("RequestContextHeadersModule");
var M_RequestContextManager_maybe = require("RequestContextManager");
var M_CorrelationContextManagerModule_maybe = require("CorrelationContextManagerModule");
var M_correlation_id_manager_maybe = require("correlation-id-manager");
var M_W3CTraceIdManager_maybe = require("W3CTraceIdManager");
var M_DiagnosticChannelManager_maybe = require("DiagnosticChannelManager");
var h = (function () {
  function e(t) {
    if (e.INSTANCE)
      throw new Error(
        "Client request tracking should be configured from the applicationInsights object"
      );
    e.INSTANCE = this;
    this._client = t;
  }
  e.prototype.enable = function (e) {
    this._isEnabled = e;
    if (this._isEnabled && !this._isInitialized) {
      this._initialize();
    }
    if (M_DiagnosticChannelManager_maybe.IsInitialized) {
      require("MongoDB-Dependency-Tracker").wp(e, this._client);
      require("MySQL-Subscriber-Manager").wp(e, this._client);
      require("Redis-Dependency-Tracker").wp(e, this._client);
      require("PostgresQueryTracker").wp(e, this._client);
    }
  };
  e.prototype.isInitialized = function () {
    return this._isInitialized;
  };
  e.prototype._initialize = function () {
    var t = this;
    this._isInitialized = true;
    M_http.get;
    var r = M_http.request;
    var o = M_https.request;
    var s = function (r, n) {
      var i =
        !n[e.disableCollectionRequestOption] && !r[e.alreadyAutoCollectedFlag];
      r[e.alreadyAutoCollectedFlag] = true;
      if (r && n && i) {
        M_CorrelationContextManagerModule_maybe.CorrelationContextManager.wrapEmitter(
          r
        );
        e.trackRequest(t._client, {
          options: n,
          request: r,
        });
      }
    };
    M_http.request = function (e) {
      for (t = [], i = 1, undefined; i < arguments.length; i++) {
        var t;
        var i;
        t[i - 1] = arguments[i];
      }
      var o = r.call.apply(r, [M_http, e].concat(t));
      s(o, e);
      return o;
    };
    M_https.request = function (e) {
      for (t = [], r = 1, undefined; r < arguments.length; r++) {
        var t;
        var r;
        t[r - 1] = arguments[r];
      }
      var n = o.call.apply(o, [M_https, e].concat(t));
      s(n, e);
      return n;
    };
    M_http.get = function (e) {
      for (t = [], r = 1, undefined; r < arguments.length; r++) {
        var t;
        var r;
        t[r - 1] = arguments[r];
      }
      var i;
      var o = (i = M_http.request).call.apply(i, [M_http, e].concat(t));
      o.end();
      return o;
    };
    M_https.get = function (e) {
      for (t = [], r = 1, undefined; r < arguments.length; r++) {
        var t;
        var r;
        t[r - 1] = arguments[r];
      }
      var n;
      var o = (n = M_https.request).call.apply(n, [M_https, e].concat(t));
      o.end();
      return o;
    };
  };
  e.trackRequest = function (t, r) {
    if (r.options && r.request && t) {
      var n;
      var i;
      var p = new M_RequestContextManager_maybe(r.options, r.request);
      var h =
        M_CorrelationContextManagerModule_maybe.CorrelationContextManager.getCurrentContext();
      if (
        h &&
        h.operation &&
        h.operation.traceparent &&
        M_W3CTraceIdManager_maybe.isValidTraceId(
          h.operation.traceparent.traceId
        )
      ) {
        h.operation.traceparent.updateSpanId();
        n = h.operation.traceparent.getBackCompatRequestId();
      } else {
        if (M_correlation_id_manager_maybe.w3cEnabled) {
          i = (g = new M_W3CTraceIdManager_maybe()).toString();
          n = g.getBackCompatRequestId();
        } else {
          n =
            h && h.operation && h.operation.parentId + e.requestNumber++ + ".";
        }
      }
      if (
        M_CookieParserUtils_maybe.canIncludeCorrelationHeader(t, p.getUrl()) &&
        r.request.getHeader &&
        r.request.setHeader &&
        t.config &&
        t.config.correlationId
      ) {
        var f = r.request.getHeader(
          M_RequestContextHeadersModule_maybe.requestContextHeader
        );
        try {
          M_CookieParserUtils_maybe.safeIncludeCorrelationHeader(
            t,
            r.request,
            f
          );
        } catch (e) {
          M_LoggingUtils_maybe.warn(
            "Request-Context header could not be set. Correlation of requests may be lost",
            e
          );
        }
        if (h && h.operation)
          try {
            if (
              (r.request.setHeader(
                M_RequestContextHeadersModule_maybe.requestIdHeader,
                n
              ),
              r.request.setHeader(
                M_RequestContextHeadersModule_maybe.parentIdHeader,
                h.operation.id
              ),
              r.request.setHeader(
                M_RequestContextHeadersModule_maybe.rootIdHeader,
                n
              ),
              i || h.operation.traceparent)
            )
              r.request.setHeader(
                M_RequestContextHeadersModule_maybe.traceparentHeader,
                i || h.operation.traceparent.toString()
              );
            else if (M_correlation_id_manager_maybe.w3cEnabled) {
              var g = new M_W3CTraceIdManager_maybe().toString();
              r.request.setHeader(
                M_RequestContextHeadersModule_maybe.traceparentHeader,
                g
              );
            }
            if (h.operation.tracestate) {
              var m = h.operation.tracestate.toString();
              m &&
                r.request.setHeader(
                  M_RequestContextHeadersModule_maybe.traceStateHeader,
                  m
                );
            }
            var y = h.customProperties.serializeToHeader();
            y &&
              r.request.setHeader(
                M_RequestContextHeadersModule_maybe.correlationContextHeader,
                y
              );
          } catch (e) {
            M_LoggingUtils_maybe.warn(
              "Correlation headers could not be set. Correlation of requests may be lost.",
              e
            );
          }
      }
      if (r.request.on) {
        r.request.on("response", function (e) {
          p.onResponse(e);
          var i = p.getDependencyTelemetry(r, n);
          i.contextObjects = i.contextObjects || {};
          i.contextObjects["http.RequestOptions"] = r.options;
          i.contextObjects["http.ClientRequest"] = r.request;
          i.contextObjects["http.ClientResponse"] = e;
          t.trackDependency(i);
        });
        r.request.on("error", function (e) {
          p.onError(e);
          var i = p.getDependencyTelemetry(r, n);
          i.contextObjects = i.contextObjects || {};
          i.contextObjects["http.RequestOptions"] = r.options;
          i.contextObjects["http.ClientRequest"] = r.request;
          i.contextObjects.Error = e;
          t.trackDependency(i);
        });
      }
    } else
      M_LoggingUtils_maybe.info(
        "AutoCollectHttpDependencies.trackRequest was called with invalid parameters: ",
        !r.options,
        !r.request,
        !t
      );
  };
  e.prototype.dispose = function () {
    e.INSTANCE = null;
    this.enable(false);
    this._isInitialized = false;
  };
  e.disableCollectionRequestOption = "disableAppInsightsAutoCollection";
  e.requestNumber = 1;
  e.alreadyAutoCollectedFlag = "_appInsightsAutoCollected";
  return e;
})();
module.exports = h;
