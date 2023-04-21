Object.defineProperty(exports, "__esModule", {
  value: true,
});
var M_ContextualFilterManager_maybe = require("ContextualFilterManager");
exports.postgresPool1 = {
  versionSpecifier: ">= 1.0.0 < 3.0.0",
  patch: function (e) {
    var t = e.prototype.connect;
    e.prototype.connect = function (e) {
      if (e) {
        arguments[0] = M_ContextualFilterManager_maybe.channel.bindToContext(e);
      }
      return t.apply(this, arguments);
    };
    return e;
  },
};
exports.enable = function () {
  M_ContextualFilterManager_maybe.channel.registerMonkeyPatch(
    "pg-pool",
    exports.postgresPool1
  );
};
