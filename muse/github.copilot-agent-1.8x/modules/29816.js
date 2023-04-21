var n = require("http");
var i = require("https");
var o = require(12010);
var s = require(77649);
var a = require(76357);
var c = require(81483);
var l = require(6751);
var u = require(26590);
var d = require(23452);
var p = require(1767);
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
    if (p.IsInitialized) {
      require(45452).wp(e, this._client);
      require(62953).wp(e, this._client);
      require(39215).wp(e, this._client);
      require(18998).wp(e, this._client);
    }
  };
  e.prototype.isInitialized = function () {
    return this._isInitialized;
  };
  e.prototype._initialize = function () {
    var t = this;
    this._isInitialized = true;
    n.get;
    var r = n.request;
    var o = i.request;
    var s = function (r, n) {
      var i =
        !n[e.disableCollectionRequestOption] && !r[e.alreadyAutoCollectedFlag];
      r[e.alreadyAutoCollectedFlag] = true;
      if (r && n && i) {
        l.CorrelationContextManager.wrapEmitter(r);
        e.trackRequest(t._client, {
          options: n,
          request: r,
        });
      }
    };
    n.request = function (e) {
      for (t = [], i = 1, undefined; i < arguments.length; i++) {
        var t;
        var i;
        t[i - 1] = arguments[i];
      }
      var o = r.call.apply(r, [n, e].concat(t));
      s(o, e);
      return o;
    };
    i.request = function (e) {
      for (t = [], r = 1, undefined; r < arguments.length; r++) {
        var t;
        var r;
        t[r - 1] = arguments[r];
      }
      var n = o.call.apply(o, [i, e].concat(t));
      s(n, e);
      return n;
    };
    n.get = function (e) {
      for (t = [], r = 1, undefined; r < arguments.length; r++) {
        var t;
        var r;
        t[r - 1] = arguments[r];
      }
      var i;
      var o = (i = n.request).call.apply(i, [n, e].concat(t));
      o.end();
      return o;
    };
    i.get = function (e) {
      for (t = [], r = 1, undefined; r < arguments.length; r++) {
        var t;
        var r;
        t[r - 1] = arguments[r];
      }
      var n;
      var o = (n = i.request).call.apply(n, [i, e].concat(t));
      o.end();
      return o;
    };
  };
  e.trackRequest = function (t, r) {
    if (r.options && r.request && t) {
      var n;
      var i;
      var p = new c(r.options, r.request);
      var h = l.CorrelationContextManager.getCurrentContext();
      if (
        h &&
        h.operation &&
        h.operation.traceparent &&
        d.isValidTraceId(h.operation.traceparent.traceId)
      ) {
        h.operation.traceparent.updateSpanId();
        n = h.operation.traceparent.getBackCompatRequestId();
      } else {
        if (u.w3cEnabled) {
          i = (g = new d()).toString();
          n = g.getBackCompatRequestId();
        } else {
          n =
            h && h.operation && h.operation.parentId + e.requestNumber++ + ".";
        }
      }
      if (
        s.canIncludeCorrelationHeader(t, p.getUrl()) &&
        r.request.getHeader &&
        r.request.setHeader &&
        t.config &&
        t.config.correlationId
      ) {
        var f = r.request.getHeader(a.requestContextHeader);
        try {
          s.safeIncludeCorrelationHeader(t, r.request, f);
        } catch (e) {
          o.warn(
            "Request-Context header could not be set. Correlation of requests may be lost",
            e
          );
        }
        if (h && h.operation)
          try {
            if (
              (r.request.setHeader(a.requestIdHeader, n),
              r.request.setHeader(a.parentIdHeader, h.operation.id),
              r.request.setHeader(a.rootIdHeader, n),
              i || h.operation.traceparent)
            )
              r.request.setHeader(
                a.traceparentHeader,
                i || h.operation.traceparent.toString()
              );
            else if (u.w3cEnabled) {
              var g = new d().toString();
              r.request.setHeader(a.traceparentHeader, g);
            }
            if (h.operation.tracestate) {
              var m = h.operation.tracestate.toString();
              m && r.request.setHeader(a.traceStateHeader, m);
            }
            var y = h.customProperties.serializeToHeader();
            y && r.request.setHeader(a.correlationContextHeader, y);
          } catch (e) {
            o.warn(
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
      o.info(
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