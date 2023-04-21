Object.defineProperty(exports, "__esModule", {
  value: true,
});
var n = require(66932);
exports.postgresPool1 = {
  versionSpecifier: ">= 1.0.0 < 3.0.0",
  patch: function (e) {
    var t = e.prototype.connect;
    e.prototype.connect = function (e) {
      if (e) {
        arguments[0] = n.channel.bindToContext(e);
      }
      return t.apply(this, arguments);
    };
    return e;
  },
};
exports.enable = function () {
  n.channel.registerMonkeyPatch("pg-pool", exports.postgresPool1);
};