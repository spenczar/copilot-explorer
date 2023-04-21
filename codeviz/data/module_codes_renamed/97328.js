var r = exports || this;
function n() {
  return {
    next: function () {},
    done: function () {},
    run: function (e) {
      return e();
    },
  };
}
r.sync = n;
r.async = n;
