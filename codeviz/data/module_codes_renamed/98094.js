var M_require_manager_maybe;
module.exports = function () {
  var e;
  var t;
  var M_DomainComponentConstants_maybe;
  var o;
  if (!M_require_manager_maybe)
    for (t in ((e = (M_require_manager_maybe = require("require-manager"))
      .oids),
    (M_DomainComponentConstants_maybe = require("DomainComponentConstants")))) {
      o = M_DomainComponentConstants_maybe[t];
      if (null == e[t]) {
        e[t] = o;
      }
      if (null == e[o]) {
        e[o] = t;
      }
    }
  return M_require_manager_maybe;
};
