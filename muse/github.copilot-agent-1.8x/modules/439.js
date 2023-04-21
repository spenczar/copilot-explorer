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
var o = require(94641);
var s = require(92646);
var a = require(29816);
var c = require(12010);
var l = (function (e) {
  function t() {
    return (null !== e && e.apply(this, arguments)) || this;
  }
  i(t, e);
  t.prototype.trackNodeHttpRequestSync = function (e) {
    if (e && e.request && e.response && e.duration) {
      s.trackRequestSync(this, e);
    } else {
      c.warn(
        "trackNodeHttpRequestSync requires NodeHttpRequestTelemetry object with request, response and duration specified."
      );
    }
  };
  t.prototype.trackNodeHttpRequest = function (e) {
    if (e.duration || e.error) {
      c.warn(
        "trackNodeHttpRequest will ignore supplied duration and error parameters. These values are collected from the request and response objects."
      );
    }
    if (e && e.request && e.response) {
      s.trackRequest(this, e);
    } else {
      c.warn(
        "trackNodeHttpRequest requires NodeHttpRequestTelemetry object with request and response specified."
      );
    }
  };
  t.prototype.trackNodeHttpDependency = function (e) {
    if (e && e.request) {
      a.trackRequest(this, e);
    } else {
      c.warn(
        "trackNodeHttpDependency requires NodeHttpDependencyTelemetry object with request specified."
      );
    }
  };
  return t;
})(o);
module.exports = l;