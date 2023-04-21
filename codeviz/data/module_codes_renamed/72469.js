var M_ObjectPropertyManager_maybe = require("ObjectPropertyManager");
var M_ContextualFilterManager_maybe = require("ContextualFilterManager");
var o = [];
var s = function (e) {
  var t = e.data.message;
  o.forEach(function (r) {
    if (t instanceof Error) {
      r.trackException({
        exception: t,
      });
    } else {
      if (t.lastIndexOf("\n") == t.length - 1) {
        t = t.substring(0, t.length - 1);
      }
      r.trackTrace({
        message: t,
        severity: e.data.stderr
          ? M_ObjectPropertyManager_maybe.SeverityLevel.Warning
          : M_ObjectPropertyManager_maybe.SeverityLevel.Information,
      });
    }
  });
};
exports.wp = function (e, t) {
  if (e) {
    if (0 === o.length) {
      M_ContextualFilterManager_maybe.channel.subscribe("console", s);
    }
    o.push(t);
  } else {
    if (
      0 ===
      (o = o.filter(function (e) {
        return e != t;
      })).length
    ) {
      M_ContextualFilterManager_maybe.channel.unsubscribe("console", s);
    }
  }
};
