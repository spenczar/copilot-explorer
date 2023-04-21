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
var o = require("url");
var s = require(85512);
var a = require(77649);
var c = require(76357);
var l = require(57774);
var u = require(26590);
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
    this.correlationId = a.getCorrelationContextTarget(
      e,
      c.requestContextTargetKey
    );
  };
  t.prototype.getDependencyTelemetry = function (e, t) {
    var r = o.parse(this.url);
    r.search = undefined;
    r.hash = undefined;
    var n = this.method.toUpperCase() + " " + r.pathname;
    var i = s.RemoteDependencyDataConstants.TYPE_HTTP;
    var a = r.hostname;
    if (this.correlationId) {
      i = s.RemoteDependencyDataConstants.TYPE_AI;
      if (this.correlationId !== u.correlationIdPrefix) {
        a = r.hostname + " | " + this.correlationId;
      }
    } else {
      i = s.RemoteDependencyDataConstants.TYPE_HTTP;
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
    if ("string" == typeof e) e = o.parse(e);
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
      var n = o.parse(e.path);
      e.pathname = n.pathname;
      e.search = n.search;
    }
    if (e.host && e.port && !o.parse("http://" + e.host).port && e.port) {
      e.hostname = e.host;
      delete e.host;
    }
    e.protocol = e.protocol || (t.agent && t.agent.protocol) || undefined;
    e.hostname = e.hostname || "localhost";
    return o.format(e);
  };
  return t;
})(l);
module.exports = d;