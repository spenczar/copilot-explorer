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
  var M_ContextualDataParsingUtils_maybe;
  var i;
  M_ContextualDataParsingUtils_maybe = require("ContextualDataParsingUtils");
  i = e[0];
  if (null == t.unique) {
    t.unique = false;
  }
  t.format = null != i ? i : M_ContextualDataParsingUtils_maybe.der2.x509;
  t.$cb = e[1] || i;
  M_ContextualDataParsingUtils_maybe(t);
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
