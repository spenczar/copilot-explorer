Object.defineProperty(exports, "__esModule", {
  value: true,
});
var M_AzureCoreTracingModule_maybe = require("AzureCoreTracingModule");
exports.azuresdk = M_AzureCoreTracingModule_maybe;
var M_Bunyan_Log_Monkey_Patch_maybe = require("Bunyan-Log-Monkey-Patch");
exports.bunyan = M_Bunyan_Log_Monkey_Patch_maybe;
var M_Console_Logging_Module_maybe = require("Console-Logging-Module");
exports.console = M_Console_Logging_Module_maybe;
var M_MongoCoreMonkeyPatch_maybe = require("MongoCoreMonkeyPatch");
exports.mongodbCore = M_MongoCoreMonkeyPatch_maybe;
var M_MongoDB_Instrumentation_Manager_maybe = require("MongoDB_Instrumentation_Manager");
exports.mongodb = M_MongoDB_Instrumentation_Manager_maybe;
var M_mysql_patch_manager_maybe = require("mysql-patch-manager");
exports.mysql = M_mysql_patch_manager_maybe;
var M_pg_pool_monkey_patch_maybe = require("pg-pool-monkey-patch");
exports.pgPool = M_pg_pool_monkey_patch_maybe;
var M_Postgres_Diagnostic_Logger_maybe = require("Postgres-Diagnostic-Logger");
exports.pg = M_Postgres_Diagnostic_Logger_maybe;
var M_Redis_Monitoring_Module_maybe = require("Redis-Monitoring-Module");
exports.redis = M_Redis_Monitoring_Module_maybe;
var M_tedious_request_monitoring_maybe = require("tedious-request-monitoring");
exports.tedious = M_tedious_request_monitoring_maybe;
var M_winston_patch_utils_maybe = require("winston-patch-utils");
exports.winston = M_winston_patch_utils_maybe;
exports.enable = function () {
  M_Bunyan_Log_Monkey_Patch_maybe.enable();
  M_Console_Logging_Module_maybe.enable();
  M_MongoCoreMonkeyPatch_maybe.enable();
  M_MongoDB_Instrumentation_Manager_maybe.enable();
  M_mysql_patch_manager_maybe.enable();
  M_Postgres_Diagnostic_Logger_maybe.enable();
  M_pg_pool_monkey_patch_maybe.enable();
  M_Redis_Monitoring_Module_maybe.enable();
  M_winston_patch_utils_maybe.enable();
  M_AzureCoreTracingModule_maybe.enable();
  M_tedious_request_monitoring_maybe.enable();
};
