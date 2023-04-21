var M_language_marker_constants_maybe;
var i = exports || this;
function o(e) {
  var t;
  var r;
  r = e.length ? 0 : -1;
  return {
    next: i,
    done: function () {
      if (null != t) {
        t.done();
      }
      t = undefined;
      r = e.length;
    },
    run: function (e) {
      for (var t; (t = i()); ) e(t);
      e();
    },
  };
  function i() {
    for (var i; r < e.length; ) {
      if (null == t) {
        t =
          r < 0
            ? M_language_marker_constants_maybe()
            : M_language_marker_constants_maybe(e[r]);
      }
      if ((i = t.next())) return i;
      t.done();
      t = undefined;
      r++;
    }
  }
}
M_language_marker_constants_maybe = require("language-marker-constants");
i.sync = o;
i.async = function (e) {
  var t;
  var r;
  t = o(e);
  r = t.next;
  t.run = function (e) {
    !(function t() {
      return Promise.resolve()
        .then(r)
        .then(function (r) {
          if (r) {
            e(r);
            return t();
          }
          e();
        });
    })();
  };
  return t;
};
