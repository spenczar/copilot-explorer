module.exports = (e, t) =>
  class extends e {
    constructor(e) {
      var r;
      var n;
      super(function (e, o) {
        r = this;
        n = [
          function (r) {
            t(i, false);
            return e(r);
          },
          function (e) {
            t(i, false);
            return o(e);
          },
        ];
      });
      var i = this;
      try {
        e.apply(r, n);
      } catch (e) {
        n[1](e);
      }
      return i;
    }
  };