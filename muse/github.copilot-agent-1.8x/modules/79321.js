var n;
var i;
var o;
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
      ? require(97328)
      : (null != (s = e.fallback) ? s : !i)
      ? require(30141)
      : require(36188);
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
    d = require(59091)();
  }
  p = o(e.format);
  if (Array.isArray(e.ondata)) {
    e.ondata = e.ondata.push.bind(e.ondata);
  }
  if (e.save || e.$ave) {
    h = require(28553)(e);
  }
  if (e.inject) {
    f = require(70229)(e.inject);
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
  s === require(79321) &&
  !(s.electron = require(53571)());
s.der2 = o = require(59424);
s.hash = function () {
  return (s.hash = require(54586)).apply(this, arguments);
};
s.inject = function () {
  return (s.inject = require(70229).inject).apply(this, arguments);
};
s.exe = function () {
  return (s.exe = require(30141).exe).apply(this, arguments);
};
(function (e, t) {
  for (var r in t) e[r] = t[r];
})(s, require(84244));
if (n || s !== require(79321)) {
  s({
    inject: true,
    $ave: true,
    async: true,
  });
}