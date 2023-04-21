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
var o = (function (e) {
  function t() {
    var t = e.call(this) || this;
    t.ver = 2;
    t.exceptions = [];
    t.properties = {};
    t.measurements = {};
    return t;
  }
  i(t, e);
  return t;
})(require(48707));
module.exports = o;
