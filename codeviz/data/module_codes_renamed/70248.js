Object.defineProperty(exports, "__esModule", {
  value: true,
});
var M_ContextualFilterManager_maybe = require("ContextualFilterManager");
exports.bunyan = {
  versionSpecifier: ">= 1.0.0 < 2.0.0",
  patch: function (e) {
    var t = e.prototype._emit;
    e.prototype._emit = function (e, r) {
      var i = t.apply(this, arguments);
      if (!r) {
        var o = i;
        if (o) {
          o = t.call(this, e, true);
        }
        M_ContextualFilterManager_maybe.channel.publish("bunyan", {
          level: e.level,
          result: o,
        });
      }
      return i;
    };
    return e;
  },
};
exports.enable = function () {
  M_ContextualFilterManager_maybe.channel.registerMonkeyPatch(
    "bunyan",
    exports.bunyan
  );
};
