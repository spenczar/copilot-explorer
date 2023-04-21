var M_ContextualFilterManager_maybe = require("ContextualFilterManager");
var i = [];
exports.qP = function (e) {
  i.forEach(function (t) {
    var r = e.data.query;
    var n =
      (r.preparable && r.preparable.text) ||
      r.plan ||
      r.text ||
      "unknown query";
    var i = !e.data.error;
    var o = e.data.database.host + ":" + e.data.database.port;
    t.trackDependency({
      target: o,
      data: n,
      name: n,
      duration: e.data.duration,
      success: i,
      resultCode: i ? "0" : "1",
      dependencyTypeName: "postgres",
    });
  });
};
exports.wp = function (e, r) {
  if (e) {
    if (0 === i.length) {
      M_ContextualFilterManager_maybe.channel.subscribe("postgres", exports.qP);
    }
    i.push(r);
  } else {
    if (
      0 ===
      (i = i.filter(function (e) {
        return e != r;
      })).length
    ) {
      M_ContextualFilterManager_maybe.channel.unsubscribe(
        "postgres",
        exports.qP
      );
    }
  }
};
