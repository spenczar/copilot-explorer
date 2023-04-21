var M_ContextualFilterManager_maybe = require("ContextualFilterManager");
var i = [];
exports.qP = function (e) {
  i.forEach(function (t) {
    var r = e.data.query || {};
    var n = r.sql || "Unknown query";
    var i = !e.data.err;
    var o = (r._connection || {}).config || {};
    var s = o.socketPath
      ? o.socketPath
      : (o.host || "localhost") + ":" + o.port;
    t.trackDependency({
      target: s,
      data: n,
      name: n,
      duration: e.data.duration,
      success: i,
      resultCode: i ? "0" : "1",
      dependencyTypeName: "mysql",
    });
  });
};
exports.wp = function (e, r) {
  if (e) {
    if (0 === i.length) {
      M_ContextualFilterManager_maybe.channel.subscribe("mysql", exports.qP);
    }
    i.push(r);
  } else {
    if (
      0 ===
      (i = i.filter(function (e) {
        return e != r;
      })).length
    ) {
      M_ContextualFilterManager_maybe.channel.unsubscribe("mysql", exports.qP);
    }
  }
};
