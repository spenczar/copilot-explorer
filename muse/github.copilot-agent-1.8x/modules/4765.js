Object.defineProperty(exports, "__esModule", {
  value: true,
});
var n = require(66932);
exports.redis = {
  versionSpecifier: ">= 2.0.0 < 4.0.0",
  patch: function (e) {
    var t = e.RedisClient.prototype.internal_send_command;
    e.RedisClient.prototype.internal_send_command = function (e) {
      if (e) {
        var r = e.callback;
        if (!r || !r.pubsubBound) {
          var i = this.address;
          var o = process.hrtime();
          var s = new Date();
          e.callback = n.channel.bindToContext(function (t, a) {
            var c = process.hrtime(o);
            var l = (1e3 * c[0] + c[1] / 1e6) | 0;
            n.channel.publish("redis", {
              duration: l,
              address: i,
              commandObj: e,
              err: t,
              result: a,
              time: s,
            });
            if ("function" == typeof r) {
              r.apply(this, arguments);
            }
          });
          e.callback.pubsubBound = true;
        }
      }
      return t.call(this, e);
    };
    return e;
  },
};
exports.enable = function () {
  n.channel.registerMonkeyPatch("redis", exports.redis);
};