var M_ContextualFilterManager_maybe = require("ContextualFilterManager");
var i = [];
exports.qP = function (e) {
  e.data.event.commandName;
  i.forEach(function (t) {
    var r =
      (e.data.startedData && e.data.startedData.databaseName) ||
      "Unknown database";
    t.trackDependency({
      target: r,
      data: e.data.event.commandName,
      name: e.data.event.commandName,
      duration: e.data.event.duration,
      success: e.data.succeeded,
      resultCode: e.data.succeeded ? "0" : "1",
      dependencyTypeName: "mongodb",
    });
  });
};
exports.wp = function (e, r) {
  if (e) {
    if (0 === i.length) {
      M_ContextualFilterManager_maybe.channel.subscribe("mongodb", exports.qP);
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
        "mongodb",
        exports.qP
      );
    }
  }
};
