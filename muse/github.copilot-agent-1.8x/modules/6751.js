Object.defineProperty(exports, "__esModule", {
  value: true,
});
var n = require(12010);
var i = require(1767);
var CorrelationContextManager = (function () {
  function e() {}
  e.getCurrentContext = function () {
    if (!e.enabled) return null;
    var t = e.session.get(e.CONTEXT_NAME);
    return undefined === t ? null : t;
  };
  e.generateContextObject = function (e, t, r, n, i, o) {
    t = t || e;
    return this.enabled
      ? {
          operation: {
            name: r,
            id: e,
            parentId: t,
            traceparent: i,
            tracestate: o,
          },
          customProperties: new s(n),
        }
      : null;
  };
  e.runWithContext = function (t, r) {
    return e.enabled
      ? e.session.bind(r, (((n = {})[e.CONTEXT_NAME] = t), n))()
      : r();
    var n;
  };
  e.wrapEmitter = function (t) {
    if (e.enabled) {
      e.session.bindEmitter(t);
    }
  };
  e.wrapCallback = function (t) {
    return e.enabled ? e.session.bind(t) : t;
  };
  e.enable = function (t) {
    if (this.enabled) {
      if (this.isNodeVersionCompatible()) {
        if (e.hasEverEnabled) {
          this.forceClsHooked = t;
          this.hasEverEnabled = true;
          if (undefined === this.cls) {
            if (
              true === e.forceClsHooked ||
              (undefined === e.forceClsHooked && e.shouldUseClsHooked())
            ) {
              this.cls = require(19172);
            } else {
              this.cls = require(92611);
            }
          }
          e.session = this.cls.createNamespace("AI-CLS-Session");
          i.registerContextPreservation(function (t) {
            return e.session.bind(t);
          });
        }
        this.enabled = true;
      } else {
        this.enabled = false;
      }
    }
  };
  e.disable = function () {
    this.enabled = false;
  };
  e.reset = function () {
    if (e.hasEverEnabled) {
      e.session = null;
      e.session = this.cls.createNamespace("AI-CLS-Session");
    }
  };
  e.isNodeVersionCompatible = function () {
    var e = process.versions.node.split(".");
    return parseInt(e[0]) > 3 || (parseInt(e[0]) > 2 && parseInt(e[1]) > 2);
  };
  e.shouldUseClsHooked = function () {
    var e = process.versions.node.split(".");
    return parseInt(e[0]) > 8 || (parseInt(e[0]) >= 8 && parseInt(e[1]) >= 2);
  };
  e.canUseClsHooked = function () {
    var e = process.versions.node.split(".");
    var t = parseInt(e[0]) > 8 || (parseInt(e[0]) >= 8 && parseInt(e[1]) >= 0);
    var r = parseInt(e[0]) < 8 || (parseInt(e[0]) <= 8 && parseInt(e[1]) < 2);
    var n = parseInt(e[0]) > 4 || (parseInt(e[0]) >= 4 && parseInt(e[1]) >= 7);
    return !(t && r) && n;
  };
  e.enabled = false;
  e.hasEverEnabled = false;
  e.forceClsHooked = undefined;
  e.CONTEXT_NAME = "ApplicationInsights-Context";
  return e;
})();
exports.CorrelationContextManager = CorrelationContextManager;
var s = (function () {
  function e(e) {
    this.props = [];
    this.addHeaderData(e);
  }
  e.prototype.addHeaderData = function (e) {
    var t = e ? e.split(", ") : [];
    this.props = t
      .map(function (e) {
        var t = e.split("=");
        return {
          key: t[0],
          value: t[1],
        };
      })
      .concat(this.props);
  };
  e.prototype.serializeToHeader = function () {
    return this.props
      .map(function (e) {
        return e.key + "=" + e.value;
      })
      .join(", ");
  };
  e.prototype.getProperty = function (e) {
    for (var t = 0; t < this.props.length; ++t) {
      var r = this.props[t];
      if (r.key === e) return r.value;
    }
  };
  e.prototype.setProperty = function (t, r) {
    if (e.bannedCharacters.test(t) || e.bannedCharacters.test(r))
      n.warn(
        "Correlation context property keys and values must not contain ',' or '='. setProperty was called with key: " +
          t +
          " and value: " +
          r
      );
    else {
      for (var i = 0; i < this.props.length; ++i) {
        var o = this.props[i];
        if (o.key === t) return void (o.value = r);
      }
      this.props.push({
        key: t,
        value: r,
      });
    }
  };
  e.bannedCharacters = /[,=]/;
  return e;
})();