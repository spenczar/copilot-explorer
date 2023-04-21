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
var d = require(48410);
var p = require(23452);
var h = (function (e) {
  function t(t, r) {
    var n = e.call(this) || this;
    if (t) {
      n.method = t.method;
      n.url = n._getAbsoluteUrl(t);
      n.startTime = +new Date();
      n.socketRemoteAddress = t.socket && t.socket.remoteAddress;
      n.parseHeaders(t, r);
      if (t.connection) {
        n.connectionRemoteAddress = t.connection.remoteAddress;
        n.legacySocketRemoteAddress =
          t.connection.socket && t.connection.socket.remoteAddress;
      }
    }
    return n;
  }
  i(t, e);
  t.prototype.onError = function (e, t) {
    this._setStatus(undefined, e);
    if (t) {
      this.duration = t;
    }
  };
  t.prototype.onResponse = function (e, t) {
    this._setStatus(e.statusCode, undefined);
    if (t) {
      this.duration = t;
    }
  };
  t.prototype.getRequestTelemetry = function (e) {
    var t = {
      id: this.requestId,
      name: this.method + " " + o.parse(this.url).pathname,
      url: this.url,
      source: this.sourceCorrelationId,
      duration: this.duration,
      resultCode: this.statusCode ? this.statusCode.toString() : null,
      success: this._isSuccess(),
      properties: this.properties,
    };
    if (e) {
      for (var r in e)
        if (t[r]) {
          t[r] = e[r];
        }
      if (e.properties)
        for (var r in e.properties) t.properties[r] = e.properties[r];
    }
    return t;
  };
  t.prototype.getRequestTags = function (e) {
    var r = {};
    for (var n in e) r[n] = e[n];
    r[t.keys.locationIp] = e[t.keys.locationIp] || this._getIp();
    r[t.keys.sessionId] = e[t.keys.sessionId] || this._getId("ai_session");
    r[t.keys.userId] = e[t.keys.userId] || this._getId("ai_user");
    r[t.keys.userAuthUserId] =
      e[t.keys.userAuthUserId] || this._getId("ai_authUser");
    r[t.keys.operationName] = this.getOperationName(e);
    r[t.keys.operationParentId] = this.getOperationParentId(e);
    r[t.keys.operationId] = this.getOperationId(e);
    return r;
  };
  t.prototype.getOperationId = function (e) {
    return e[t.keys.operationId] || this.operationId;
  };
  t.prototype.getOperationParentId = function (e) {
    return (
      e[t.keys.operationParentId] || this.parentId || this.getOperationId(e)
    );
  };
  t.prototype.getOperationName = function (e) {
    return (
      e[t.keys.operationName] || this.method + " " + o.parse(this.url).pathname
    );
  };
  t.prototype.getRequestId = function () {
    return this.requestId;
  };
  t.prototype.getCorrelationContextHeader = function () {
    return this.correlationContextHeader;
  };
  t.prototype.getTraceparent = function () {
    return this.traceparent;
  };
  t.prototype.getTracestate = function () {
    return this.tracestate;
  };
  t.prototype.getLegacyRootId = function () {
    return this.legacyRootId;
  };
  t.prototype._getAbsoluteUrl = function (e) {
    if (!e.headers) return e.url;
    var t = e.connection ? e.connection.encrypted : null;
    var r = o.parse(e.url);
    var n = r.pathname;
    var i = r.search;
    return o.format({
      protocol: t ? "https" : "http",
      host: e.headers.host,
      pathname: n,
      search: i,
    });
  };
  t.prototype._getIp = function () {
    var e = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;
    var t = function (t) {
      var r = e.exec(t);
      if (r) return r[0];
    };
    var r =
      t(this.rawHeaders["x-forwarded-for"]) ||
      t(this.rawHeaders["x-client-ip"]) ||
      t(this.rawHeaders["x-real-ip"]) ||
      t(this.connectionRemoteAddress) ||
      t(this.socketRemoteAddress) ||
      t(this.legacySocketRemoteAddress);
    if (
      !r &&
      this.connectionRemoteAddress &&
      this.connectionRemoteAddress.substr &&
      "::" === this.connectionRemoteAddress.substr(0, 2)
    ) {
      r = "127.0.0.1";
    }
    return r;
  };
  t.prototype._getId = function (e) {
    var r =
      (this.rawHeaders &&
        this.rawHeaders.cookie &&
        "string" == typeof this.rawHeaders.cookie &&
        this.rawHeaders.cookie) ||
      "";
    return t.parseId(a.getCookie(e, r));
  };
  t.prototype.setBackCompatFromThisTraceContext = function () {
    this.operationId = this.traceparent.traceId;
    if (this.traceparent.legacyRootId) {
      this.legacyRootId = this.traceparent.legacyRootId;
    }
    this.parentId = this.traceparent.parentId;
    this.traceparent.updateSpanId();
    this.requestId = this.traceparent.getBackCompatRequestId();
  };
  t.prototype.parseHeaders = function (e, t) {
    this.rawHeaders = e.headers || e.rawHeaders;
    this.userAgent = e.headers && e.headers["user-agent"];
    this.sourceCorrelationId = a.getCorrelationContextTarget(
      e,
      c.requestContextSourceKey
    );
    if (e.headers) {
      var r = e.headers[c.traceStateHeader],
        n = e.headers[c.traceparentHeader],
        i = e.headers[c.requestIdHeader],
        o = e.headers[c.parentIdHeader],
        s = e.headers[c.rootIdHeader];
      (this.correlationContextHeader = e.headers[c.correlationContextHeader]),
        u.w3cEnabled && (n || r)
          ? ((this.traceparent = new p(n)),
            (this.tracestate = n && r && new d(r)),
            this.setBackCompatFromThisTraceContext())
          : i
          ? u.w3cEnabled
            ? ((this.traceparent = new p(null, i)),
              this.setBackCompatFromThisTraceContext())
            : ((this.parentId = i),
              (this.requestId = u.generateRequestId(this.parentId)),
              (this.operationId = u.getRootId(this.requestId)))
          : u.w3cEnabled
          ? ((this.traceparent = new p()),
            (this.traceparent.parentId = o),
            (this.traceparent.legacyRootId = s || o),
            this.setBackCompatFromThisTraceContext())
          : ((this.parentId = o),
            (this.requestId = u.generateRequestId(s || this.parentId)),
            (this.correlationContextHeader = null),
            (this.operationId = u.getRootId(this.requestId))),
        t &&
          ((this.requestId = t),
          (this.operationId = u.getRootId(this.requestId)));
    }
  };
  t.parseId = function (e) {
    var t = e.split("|");
    return t.length > 0 ? t[0] : "";
  };
  t.keys = new s.ContextTagKeys();
  return t;
})(l);
module.exports = h;