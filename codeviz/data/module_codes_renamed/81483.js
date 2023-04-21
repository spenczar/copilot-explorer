var n;
var i =
  (this && this.__extends) ||
  ((n =
    Object.setPrototypeOf ||
    ({
      __proto__: [],
    } instanceof Array &&
      function (e, t) {
        e.__proto__ = t;
      }) ||
    function (e, t) {
      for (var r in t)
        if (t.hasOwnProperty(r)) {
          e[r] = t[r];
        }
    }),
  function (e, t) {
    function r() {
      this.constructor = e;
    }
    n(e, t);
    e.prototype =
      null === t ? Object.create(t) : ((r.prototype = t.prototype), new r());
  });
var M_url = require("url");
var M_ObjectPropertyManager_maybe = require("ObjectPropertyManager");
var M_CookieParserUtils_maybe = require("CookieParserUtils");
var M_RequestContextHeadersModule_maybe = require("RequestContextHeadersModule");
var M_RequestParserUtils_maybe = require("RequestParserUtils");
var M_correlation_id_manager_maybe = require("correlation-id-manager");
var d = (function (e) {
  function t(r, n) {
    var i = e.call(this) || this;
    if (n && n.method && r) {
      i.method = n.method;
      i.url = t._getUrlFromRequestOptions(r, n);
      i.startTime = +new Date();
    }
    return i;
  }
  i(t, e);
  t.prototype.onError = function (e) {
    this._setStatus(undefined, e);
  };
  t.prototype.onResponse = function (e) {
    this._setStatus(e.statusCode, undefined);
    this.correlationId = M_CookieParserUtils_maybe.getCorrelationContextTarget(
      e,
      M_RequestContextHeadersModule_maybe.requestContextTargetKey
    );
  };
  t.prototype.getDependencyTelemetry = function (e, t) {
    var r = M_url.parse(this.url);
    r.search = undefined;
    r.hash = undefined;
    var n = this.method.toUpperCase() + " " + r.pathname;
    var i =
      M_ObjectPropertyManager_maybe.RemoteDependencyDataConstants.TYPE_HTTP;
    var a = r.hostname;
    if (this.correlationId) {
      i = M_ObjectPropertyManager_maybe.RemoteDependencyDataConstants.TYPE_AI;
      if (
        this.correlationId !==
        M_correlation_id_manager_maybe.correlationIdPrefix
      ) {
        a = r.hostname + " | " + this.correlationId;
      }
    } else {
      i = M_ObjectPropertyManager_maybe.RemoteDependencyDataConstants.TYPE_HTTP;
    }
    if (r.port) {
      a += ":" + r.port;
    }
    var c = {
      id: t,
      name: n,
      data: this.url,
      duration: this.duration,
      success: this._isSuccess(),
      resultCode: this.statusCode ? this.statusCode.toString() : null,
      properties: this.properties || {},
      dependencyTypeName: i,
      target: a,
    };
    if (e) {
      for (var l in e)
        if (c[l]) {
          c[l] = e[l];
        }
      if (e.properties)
        for (var l in e.properties) c.properties[l] = e.properties[l];
    }
    return c;
  };
  t._getUrlFromRequestOptions = function (e, t) {
    if ("string" == typeof e) e = M_url.parse(e);
    else {
      var r = e;
      e = {};
      if (r) {
        Object.keys(r).forEach(function (t) {
          e[t] = r[t];
        });
      }
    }
    if (e.path) {
      var n = M_url.parse(e.path);
      e.pathname = n.pathname;
      e.search = n.search;
    }
    if (e.host && e.port && !M_url.parse("http://" + e.host).port && e.port) {
      e.hostname = e.host;
      delete e.host;
    }
    e.protocol = e.protocol || (t.agent && t.agent.protocol) || undefined;
    e.hostname = e.hostname || "localhost";
    return M_url.format(e);
  };
  return t;
})(M_RequestParserUtils_maybe);
module.exports = d;
