function t() {}
module.exports = function () {
  const e = this._hooks;
  const r = this._state;
  const n = global.Promise;
  const i = n.prototype.then;
  function o(t, r, n, i) {
    return "function" != typeof t
      ? i
        ? (function (t) {
            return function (r) {
              e.destroy.call(null, t);
              return r;
            };
          })(n)
        : (function (t) {
            return function (r) {
              throw (e.destroy.call(null, t), r);
            };
          })(n)
      : function () {
          e.pre.call(r, n);
          try {
            return t.apply(this, arguments);
          } finally {
            e.post.call(r, n, false);
            e.destroy.call(null, n);
          }
        };
  }
  n.prototype.then = function (n, s) {
    if (!r.enabled) return i.call(this, n, s);
    const a = new t();
    const c = --r.counter;
    e.init.call(a, c, 0, null, null);
    return i.call(this, o(n, a, c, true), o(s, a, c, false));
  };
};
