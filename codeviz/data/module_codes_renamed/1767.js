Object.defineProperty(exports, "__esModule", {
  value: true,
});
var M_LoggingUtils_maybe = require("LoggingUtils");
exports.IsInitialized = !process.env.APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL;
var i = "DiagnosticChannel";
if (exports.IsInitialized) {
  var M_Database_Connector_Manager_maybe = require("Database-Connector-Manager");
  var s = (process.env.APPLICATION_INSIGHTS_NO_PATCH_MODULES || "").split(",");
  var a = {
    bunyan: M_Database_Connector_Manager_maybe.bunyan,
    console: M_Database_Connector_Manager_maybe.console,
    mongodb: M_Database_Connector_Manager_maybe.mongodb,
    mongodbCore: M_Database_Connector_Manager_maybe.mongodbCore,
    mysql: M_Database_Connector_Manager_maybe.mysql,
    redis: M_Database_Connector_Manager_maybe.redis,
    pg: M_Database_Connector_Manager_maybe.pg,
    pgPool: M_Database_Connector_Manager_maybe.pgPool,
    winston: M_Database_Connector_Manager_maybe.winston,
  };
  for (var c in a)
    if (-1 === s.indexOf(c)) {
      a[c].enable();
      M_LoggingUtils_maybe.info(i, "Subscribed to " + c + " events");
    }
  if (s.length > 0) {
    M_LoggingUtils_maybe.info(i, "Some modules will not be patched", s);
  }
} else
  M_LoggingUtils_maybe.info(
    i,
    "Not subscribing to dependency autocollection because APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL was set"
  );
exports.registerContextPreservation = function (e) {
  if (exports.IsInitialized) {
    require("ContextualFilterManager").channel.addContextPreservation(e);
  }
};
