var M_ObjectPropertyManager_maybe = require("ObjectPropertyManager");
var M_ContextualFilterManager_maybe = require("ContextualFilterManager");
var o = [];
var s = {
  10: M_ObjectPropertyManager_maybe.SeverityLevel.Verbose,
  20: M_ObjectPropertyManager_maybe.SeverityLevel.Verbose,
  30: M_ObjectPropertyManager_maybe.SeverityLevel.Information,
  40: M_ObjectPropertyManager_maybe.SeverityLevel.Warning,
  50: M_ObjectPropertyManager_maybe.SeverityLevel.Error,
  60: M_ObjectPropertyManager_maybe.SeverityLevel.Critical,
};
var a = function (e) {
  var t = e.data.result;
  o.forEach(function (r) {
    var n = s[e.data.level];
    if (t instanceof Error) {
      r.trackException({
        exception: t,
      });
    } else {
      r.trackTrace({
        message: t,
        severity: n,
      });
    }
  });
};
exports.wp = function (e, t) {
  if (e) {
    if (0 === o.length) {
      M_ContextualFilterManager_maybe.channel.subscribe("bunyan", a);
    }
    o.push(t);
  } else {
    if (
      0 ===
      (o = o.filter(function (e) {
        return e != t;
      })).length
    ) {
      M_ContextualFilterManager_maybe.channel.unsubscribe("bunyan", a);
    }
  }
};
