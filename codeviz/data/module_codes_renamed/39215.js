var M_ContextualFilterManager_maybe = require("ContextualFilterManager");
var i = [];
exports.qP = function (e) {
  i.forEach(function (t) {
    if ("info" !== e.data.commandObj.command) {
      t.trackDependency({
        target: e.data.address,
        name: e.data.commandObj.command,
        data: e.data.commandObj.command,
        duration: e.data.duration,
        success: !e.data.err,
        resultCode: e.data.err ? "1" : "0",
        dependencyTypeName: "redis",
      });
    }
  });
};
exports.wp = function (e, r) {
  if (e) {
    if (0 === i.length) {
      M_ContextualFilterManager_maybe.channel.subscribe("redis", exports.qP);
    }
    i.push(r);
  } else {
    if (
      0 ===
      (i = i.filter(function (e) {
        return e != r;
      })).length
    ) {
      M_ContextualFilterManager_maybe.channel.unsubscribe("redis", exports.qP);
    }
  }
};
