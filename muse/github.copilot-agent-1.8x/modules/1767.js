Object.defineProperty(exports, "__esModule", {
  value: true,
});
var n = require(12010);
exports.IsInitialized = !process.env.APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL;
var i = "DiagnosticChannel";
if (exports.IsInitialized) {
  var o = require(6315);
  var s = (process.env.APPLICATION_INSIGHTS_NO_PATCH_MODULES || "").split(",");
  var a = {
    bunyan: o.bunyan,
    console: o.console,
    mongodb: o.mongodb,
    mongodbCore: o.mongodbCore,
    mysql: o.mysql,
    redis: o.redis,
    pg: o.pg,
    pgPool: o.pgPool,
    winston: o.winston,
  };
  for (var c in a)
    if (-1 === s.indexOf(c)) {
      a[c].enable();
      n.info(i, "Subscribed to " + c + " events");
    }
  if (s.length > 0) {
    n.info(i, "Some modules will not be patched", s);
  }
} else
  n.info(
    i,
    "Not subscribing to dependency autocollection because APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL was set"
  );
exports.registerContextPreservation = function (e) {
  if (exports.IsInitialized) {
    require(66932).channel.addContextPreservation(e);
  }
};