function each() {
  var e;
  i(
    arguments,
    (e = {
      unique: true,
      ondata: function (t) {
        if ("function" == typeof e.$cb) {
          e.$cb(t);
        }
      },
    })
  );
}
function i(e, t) {
  var n;
  var i;
  n = require(79321);
  i = e[0];
  if (null == t.unique) {
    t.unique = false;
  }
  t.format = null != i ? i : n.der2.x509;
  t.$cb = e[1] || i;
  n(t);
}
exports.all = function () {
  var e;
  i(arguments, {
    ondata: (e = []),
  });
  return e;
};
exports.each = each;
each.async = function () {
  var e;
  i(
    arguments,
    (e = {
      async: true,
      ondata: function (t) {
        if ("function" == typeof e.$cb) {
          e.$cb(undefined, t);
        }
      },
      onend: function () {
        if ("function" == typeof e.$cb) {
          e.$cb();
        }
      },
    })
  );
};