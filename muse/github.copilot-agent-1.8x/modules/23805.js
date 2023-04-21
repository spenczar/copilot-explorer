var n = require(85512);
var i = require(66932);
var o = [];
var s = {
  10: n.SeverityLevel.Verbose,
  20: n.SeverityLevel.Verbose,
  30: n.SeverityLevel.Information,
  40: n.SeverityLevel.Warning,
  50: n.SeverityLevel.Error,
  60: n.SeverityLevel.Critical,
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
      i.channel.subscribe("bunyan", a);
    }
    o.push(t);
  } else {
    if (
      0 ===
      (o = o.filter(function (e) {
        return e != t;
      })).length
    ) {
      i.channel.unsubscribe("bunyan", a);
    }
  }
};