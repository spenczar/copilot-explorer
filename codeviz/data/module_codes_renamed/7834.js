Object.defineProperty(exports, "__esModule", {
  value: true,
});
var M_ContextualFilterManager_maybe = require("ContextualFilterManager");
exports.mongoCore = {
  versionSpecifier: ">= 2.0.0 < 4.0.0",
  patch: function (e) {
    var t = e.Server.prototype.connect;
    e.Server.prototype.connect = function () {
      var e = t.apply(this, arguments);
      var r = this.s.pool.write;
      this.s.pool.write = function () {
        var e = "function" == typeof arguments[1] ? 1 : 2;
        if ("function" == typeof arguments[e]) {
          arguments[e] = M_ContextualFilterManager_maybe.channel.bindToContext(
            arguments[e]
          );
        }
        return r.apply(this, arguments);
      };
      var i = this.s.pool.logout;
      this.s.pool.logout = function () {
        if ("function" == typeof arguments[1]) {
          arguments[1] = M_ContextualFilterManager_maybe.channel.bindToContext(
            arguments[1]
          );
        }
        return i.apply(this, arguments);
      };
      return e;
    };
    return e;
  },
};
exports.enable = function () {
  M_ContextualFilterManager_maybe.channel.registerMonkeyPatch(
    "mongodb-core",
    exports.mongoCore
  );
};
