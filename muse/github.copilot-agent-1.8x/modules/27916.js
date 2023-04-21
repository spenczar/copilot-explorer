var n = require(85512);
var i = require(66932);
var o = [];
var s = {
  syslog: function (e) {
    var t = {
      emerg: n.SeverityLevel.Critical,
      alert: n.SeverityLevel.Critical,
      crit: n.SeverityLevel.Critical,
      error: n.SeverityLevel.Error,
      warning: n.SeverityLevel.Warning,
      notice: n.SeverityLevel.Information,
      info: n.SeverityLevel.Information,
      debug: n.SeverityLevel.Verbose,
    };
    return undefined === t[e] ? n.SeverityLevel.Information : t[e];
  },
  npm: function (e) {
    var t = {
      error: n.SeverityLevel.Error,
      warn: n.SeverityLevel.Warning,
      info: n.SeverityLevel.Information,
      verbose: n.SeverityLevel.Verbose,
      debug: n.SeverityLevel.Verbose,
      silly: n.SeverityLevel.Verbose,
    };
    return undefined === t[e] ? n.SeverityLevel.Information : t[e];
  },
  unknown: function (e) {
    return n.SeverityLevel.Information;
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
      i.channel.subscribe("winston", a);
    }
    o.push(t);
  } else {
    if (
      0 ===
      (o = o.filter(function (e) {
        return e != t;
      })).length
    ) {
      i.channel.unsubscribe("winston", a);
    }
  }
};