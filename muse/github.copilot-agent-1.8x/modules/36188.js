var n;
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
        t = r < 0 ? n() : n(e[r]);
      }
      if ((i = t.next())) return i;
      t.done();
      t = undefined;
      r++;
    }
  }
}
n = require(91225);
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