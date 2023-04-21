var M_ObjectPropertyManager_maybe = require("ObjectPropertyManager");
var M_ContextualFilterManager_maybe = require("ContextualFilterManager");
var o = [];
var s = {
  syslog: function (e) {
    var t = {
      emerg: M_ObjectPropertyManager_maybe.SeverityLevel.Critical,
      alert: M_ObjectPropertyManager_maybe.SeverityLevel.Critical,
      crit: M_ObjectPropertyManager_maybe.SeverityLevel.Critical,
      error: M_ObjectPropertyManager_maybe.SeverityLevel.Error,
      warning: M_ObjectPropertyManager_maybe.SeverityLevel.Warning,
      notice: M_ObjectPropertyManager_maybe.SeverityLevel.Information,
      info: M_ObjectPropertyManager_maybe.SeverityLevel.Information,
      debug: M_ObjectPropertyManager_maybe.SeverityLevel.Verbose,
    };
    return undefined === t[e]
      ? M_ObjectPropertyManager_maybe.SeverityLevel.Information
      : t[e];
  },
  npm: function (e) {
    var t = {
      error: M_ObjectPropertyManager_maybe.SeverityLevel.Error,
      warn: M_ObjectPropertyManager_maybe.SeverityLevel.Warning,
      info: M_ObjectPropertyManager_maybe.SeverityLevel.Information,
      verbose: M_ObjectPropertyManager_maybe.SeverityLevel.Verbose,
      debug: M_ObjectPropertyManager_maybe.SeverityLevel.Verbose,
      silly: M_ObjectPropertyManager_maybe.SeverityLevel.Verbose,
    };
    return undefined === t[e]
      ? M_ObjectPropertyManager_maybe.SeverityLevel.Information
      : t[e];
  },
  unknown: function (e) {
    return M_ObjectPropertyManager_maybe.SeverityLevel.Information;
  },
};
var a = function (e) {
  var t = e.data.message;
  o.forEach(function (r) {
    if (t instanceof Error)
      r.trackException({
        exception: t,
        properties: e.data.meta,
      });
    else {
      var n = s[e.data.levelKind](e.data.level);
      r.trackTrace({
        message: t,
        severity: n,
        properties: e.data.meta,
      });
    }
  });
};
exports.wp = function (e, t) {
  if (e) {
    if (0 === o.length) {
      M_ContextualFilterManager_maybe.channel.subscribe("winston", a);
    }
    o.push(t);
  } else {
    if (
      0 ===
      (o = o.filter(function (e) {
        return e != t;
      })).length
    ) {
      M_ContextualFilterManager_maybe.channel.unsubscribe("winston", a);
    }
  }
};
