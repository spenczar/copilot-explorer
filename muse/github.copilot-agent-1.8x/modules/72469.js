var n = require(85512);
var i = require(66932);
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
          ? n.SeverityLevel.Warning
          : n.SeverityLevel.Information,
      });
    }
  });
};
exports.wp = function (e, t) {
  if (e) {
    if (0 === o.length) {
      i.channel.subscribe("console", s);
    }
    o.push(t);
  } else {
    if (
      0 ===
      (o = o.filter(function (e) {
        return e != t;
      })).length
    ) {
      i.channel.unsubscribe("console", s);
    }
  }
};