var M_http = require("http");
var M_https = require("https");
var M_LoggingUtils_maybe = require("LoggingUtils");
var M_CookieParserUtils_maybe = require("CookieParserUtils");
var M_RequestContextHeadersModule_maybe = require("RequestContextHeadersModule");
var M_RequestParserModule_maybe = require("RequestParserModule");
var M_CorrelationContextManagerModule_maybe = require("CorrelationContextManagerModule");
var M_PerformanceTracker_maybe = require("PerformanceTracker");
var d = (function () {
  function e(t) {
    if (e.INSTANCE)
      throw new Error(
        "Server request tracking should be configured from the applicationInsights object"
      );
    e.INSTANCE = this;
    this._client = t;
  }
  e.prototype.enable = function (e) {
    this._isEnabled = e;
    if (
      (this._isAutoCorrelating ||
        this._isEnabled ||
        M_PerformanceTracker_maybe.isEnabled()) &&
      !this._isInitialized
    ) {
      this.useAutoCorrelation(this._isAutoCorrelating);
      this._initialize();
    }
  };
  e.prototype.useAutoCorrelation = function (e, t) {
    if (e && !this._isAutoCorrelating) {
      M_CorrelationContextManagerModule_maybe.CorrelationContextManager.enable(
        t
      );
    } else {
      if (!e && this._isAutoCorrelating) {
        M_CorrelationContextManagerModule_maybe.CorrelationContextManager.disable();
      }
    }
    this._isAutoCorrelating = e;
  };
  e.prototype.isInitialized = function () {
    return this._isInitialized;
  };
  e.prototype.isAutoCorrelating = function () {
    return this._isAutoCorrelating;
  };
  e.prototype._generateCorrelationContext = function (e) {
    if (this._isAutoCorrelating)
      return M_CorrelationContextManagerModule_maybe.CorrelationContextManager.generateContextObject(
        e.getOperationId(this._client.context.tags),
        e.getRequestId(),
        e.getOperationName(this._client.context.tags),
        e.getCorrelationContextHeader(),
        e.getTraceparent(),
        e.getTracestate()
      );
  };
  e.prototype._initialize = function () {
    var t = this;
    this._isInitialized = true;
    var r = function (r) {
      if (r) {
        if ("function" != typeof r)
          throw new Error("onRequest handler must be a function");
        return function (n, i) {
          M_CorrelationContextManagerModule_maybe.CorrelationContextManager.wrapEmitter(
            n
          );
          M_CorrelationContextManagerModule_maybe.CorrelationContextManager.wrapEmitter(
            i
          );
          var o = n && !n[e.alreadyAutoCollectedFlag];
          if (n && o) {
            var s = new M_RequestParserModule_maybe(n);
            var a = t._generateCorrelationContext(s);
            M_CorrelationContextManagerModule_maybe.CorrelationContextManager.runWithContext(
              a,
              function () {
                if (t._isEnabled) {
                  n[e.alreadyAutoCollectedFlag] = true;
                  e.trackRequest(
                    t._client,
                    {
                      request: n,
                      response: i,
                    },
                    s
                  );
                }
                if ("function" == typeof r) {
                  r(n, i);
                }
              }
            );
          } else if ("function" == typeof r) {
            r(n, i);
          }
        };
      }
    };
    var o = function (e) {
      var t = e.addListener.bind(e);
      e.addListener = function (e, n) {
        switch (e) {
          case "request":
          case "checkContinue":
            return t(e, r(n));
          default:
            return t(e, n);
        }
      };
      e.on = e.addListener;
    };
    var s = M_http.createServer;
    M_http.createServer = function (e) {
      var t = s(r(e));
      o(t);
      return t;
    };
    var a = M_https.createServer;
    M_https.createServer = function (e, t) {
      var n = a(e, r(t));
      o(n);
      return n;
    };
  };
  e.trackRequestSync = function (t, r) {
    if (r.request && r.response && t) {
      e.addResponseCorrelationIdHeader(t, r.response);
      var n =
        M_CorrelationContextManagerModule_maybe.CorrelationContextManager.getCurrentContext();
      var i = new M_RequestParserModule_maybe(
        r.request,
        n && n.operation.parentId
      );
      if (n) {
        n.operation.id = i.getOperationId(t.context.tags) || n.operation.id;
        n.operation.name =
          i.getOperationName(t.context.tags) || n.operation.name;
        n.operation.parentId = i.getRequestId() || n.operation.parentId;
        n.customProperties.addHeaderData(i.getCorrelationContextHeader());
      }
      e.endRequest(t, i, r, r.duration, r.error);
    } else
      M_LoggingUtils_maybe.info(
        "AutoCollectHttpRequests.trackRequestSync was called with invalid parameters: ",
        !r.request,
        !r.response,
        !t
      );
  };
  e.trackRequest = function (t, r, n) {
    if (r.request && r.response && t) {
      var i =
        M_CorrelationContextManagerModule_maybe.CorrelationContextManager.getCurrentContext();
      var a =
        n ||
        new M_RequestParserModule_maybe(r.request, i && i.operation.parentId);
      if (
        M_CookieParserUtils_maybe.canIncludeCorrelationHeader(t, a.getUrl())
      ) {
        e.addResponseCorrelationIdHeader(t, r.response);
      }
      if (i && !n) {
        i.operation.id = a.getOperationId(t.context.tags) || i.operation.id;
        i.operation.name =
          a.getOperationName(t.context.tags) || i.operation.name;
        i.operation.parentId =
          a.getOperationParentId(t.context.tags) || i.operation.parentId;
        i.customProperties.addHeaderData(a.getCorrelationContextHeader());
      }
      if (r.response.once) {
        r.response.once("finish", function () {
          e.endRequest(t, a, r, null, null);
        });
      }
      if (r.request.on) {
        r.request.on("error", function (n) {
          e.endRequest(t, a, r, null, n);
        });
      }
    } else
      M_LoggingUtils_maybe.info(
        "AutoCollectHttpRequests.trackRequest was called with invalid parameters: ",
        !r.request,
        !r.response,
        !t
      );
  };
  e.addResponseCorrelationIdHeader = function (e, t) {
    if (
      e.config &&
      e.config.correlationId &&
      t.getHeader &&
      t.setHeader &&
      !t.headersSent
    ) {
      var r = t.getHeader(
        M_RequestContextHeadersModule_maybe.requestContextHeader
      );
      M_CookieParserUtils_maybe.safeIncludeCorrelationHeader(e, t, r);
    }
  };
  e.endRequest = function (e, t, r, n, i) {
    if (i) {
      t.onError(i, n);
    } else {
      t.onResponse(r.response, n);
    }
    var o = t.getRequestTelemetry(r);
    o.tagOverrides = t.getRequestTags(e.context.tags);
    if (r.tagOverrides)
      for (var s in r.tagOverrides) o.tagOverrides[s] = r.tagOverrides[s];
    var a = t.getLegacyRootId();
    if (a) {
      o.properties.ai_legacyRootId = a;
    }
    o.contextObjects = o.contextObjects || {};
    o.contextObjects["http.ServerRequest"] = r.request;
    o.contextObjects["http.ServerResponse"] = r.response;
    e.trackRequest(o);
  };
  e.prototype.dispose = function () {
    e.INSTANCE = null;
    this.enable(false);
    this._isInitialized = false;
    M_CorrelationContextManagerModule_maybe.CorrelationContextManager.disable();
    this._isAutoCorrelating = false;
  };
  e.alreadyAutoCollectedFlag = "_appInsightsAutoCollected";
  return e;
})();
module.exports = d;
