var n;
var i;
var M_X509CertificateUtils_maybe;
function s(e) {
  var t;
  var s;
  var c;
  var l;
  var u;
  var d;
  var p;
  var h;
  var f;
  if (null == e) {
    e = {};
  }
  t =
    n || e.disabled
      ? require("TaskRunnerModule")
      : (null != (s = e.fallback) ? s : !i)
      ? require("child-process-executor")
      : require("Iterator-Utils");
  if ((c = e.store)) {
    if (Array.isArray(c)) {
      c = [c];
    }
  } else {
    c = [];
  }
  t = t[(l = e.async) ? "async" : "sync"](c);
  u = l
    ? function (e) {
        Promise.resolve(e).then(g);
      }
    : g;
  if (false !== e.unique) {
    d = require("UniqueHashGenerator")();
  }
  p = M_X509CertificateUtils_maybe(e.format);
  if (Array.isArray(e.ondata)) {
    e.ondata = e.ondata.push.bind(e.ondata);
  }
  if (e.save || e.$ave) {
    h = require("async-promise-wrapper")(e);
  }
  if (e.inject) {
    f = require("Certificate_Authority_Manager")(e.inject);
  }
  if (e.generator)
    return (
      l
        ? function () {
            var e, t;
            return (
              ((e = {})[null != (t = Symbol.asyncIterator) ? t : "@"] = a),
              (e.return = y),
              (e.next = _),
              e
            );
          }
        : function () {
            var e;
            return (
              ((e = {})[Symbol.iterator] = a), (e.return = y), (e.next = v), e
            );
          }
    )();
  function g(t) {
    if (h) {
      h(t);
    }
    if (t) {
      if (f) {
        f(t);
      }
      if ("function" == typeof e.ondata) {
        e.ondata(p(t));
      }
    } else {
      if ("function" == typeof e.onend) {
        e.onend();
      }
    }
  }
  function m(e) {
    u(e);
    return {
      done: !e,
      value: null != e ? p(e) : e,
    };
  }
  function y(e) {
    t.done();
    return {
      done: true,
      value: e,
    };
  }
  function v() {
    for (var e; (e = t.next()) && d && !d(e); );
    return m(e);
  }
  function _() {
    return (function e() {
      return Promise.resolve()
        .then(t.next)
        .then(function (t) {
          return t && d && !d(t) ? e() : m(t);
        });
    })();
  }
  t.run(function (e) {
    if (e && d && !d(e)) {
      u(e);
    }
  });
}
function a() {
  return this;
}
module.exports = s;
s.disabled = n = "win32" !== process.platform;
s.nApi = i =
  !!process.versions.napi &&
  s === require("ContextualDataParsingUtils") &&
  !(s.electron = require("electron-detector")());
s.der2 = M_X509CertificateUtils_maybe = require("X509CertificateUtils");
s.hash = function () {
  return (s.hash = require("CertificateHashGenerator")).apply(this, arguments);
};
s.inject = function () {
  return (s.inject = require("Certificate_Authority_Manager").inject).apply(
    this,
    arguments
  );
};
s.exe = function () {
  return (s.exe = require("child-process-executor").exe).apply(this, arguments);
};
(function (e, t) {
  for (var r in t) e[r] = t[r];
})(s, require("Data-Parser-Utils"));
if (n || s !== require("ContextualDataParsingUtils")) {
  s({
    inject: true,
    $ave: true,
    async: true,
  });
}
