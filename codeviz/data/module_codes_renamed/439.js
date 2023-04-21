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
var M_TelemetryManager_maybe = require("TelemetryManager");
var M_server_request_tracker_maybe = require("server-request-tracker");
var M_RequestTrackerModule_maybe = require("RequestTrackerModule");
var M_LoggingUtils_maybe = require("LoggingUtils");
var l = (function (e) {
  function t() {
    return (null !== e && e.apply(this, arguments)) || this;
  }
  i(t, e);
  t.prototype.trackNodeHttpRequestSync = function (e) {
    if (e && e.request && e.response && e.duration) {
      M_server_request_tracker_maybe.trackRequestSync(this, e);
    } else {
      M_LoggingUtils_maybe.warn(
        "trackNodeHttpRequestSync requires NodeHttpRequestTelemetry object with request, response and duration specified."
      );
    }
  };
  t.prototype.trackNodeHttpRequest = function (e) {
    if (e.duration || e.error) {
      M_LoggingUtils_maybe.warn(
        "trackNodeHttpRequest will ignore supplied duration and error parameters. These values are collected from the request and response objects."
      );
    }
    if (e && e.request && e.response) {
      M_server_request_tracker_maybe.trackRequest(this, e);
    } else {
      M_LoggingUtils_maybe.warn(
        "trackNodeHttpRequest requires NodeHttpRequestTelemetry object with request and response specified."
      );
    }
  };
  t.prototype.trackNodeHttpDependency = function (e) {
    if (e && e.request) {
      M_RequestTrackerModule_maybe.trackRequest(this, e);
    } else {
      M_LoggingUtils_maybe.warn(
        "trackNodeHttpDependency requires NodeHttpDependencyTelemetry object with request specified."
      );
    }
  };
  return t;
})(M_TelemetryManager_maybe);
module.exports = l;
