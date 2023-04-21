Object.defineProperty(exports, "__esModule", {
  value: true,
});
var azuresdk = require(72784);
exports.azuresdk = azuresdk;
var bunyan = require(70248);
exports.bunyan = bunyan;
var console = require(8159);
exports.console = console;
var mongodbCore = require(7834);
exports.mongodbCore = mongodbCore;
var mongodb = require(44826);
exports.mongodb = mongodb;
var mysql = require(55856);
exports.mysql = mysql;
var pgPool = require(68345);
exports.pgPool = pgPool;
var pg = require(67726);
exports.pg = pg;
var redis = require(4765);
exports.redis = redis;
var tedious = require(61624);
exports.tedious = tedious;
var winston = require(88041);
exports.winston = winston;
exports.enable = function () {
  bunyan.enable();
  console.enable();
  mongodbCore.enable();
  mongodb.enable();
  mysql.enable();
  pg.enable();
  pgPool.enable();
  redis.enable();
  winston.enable();
  azuresdk.enable();
  tedious.enable();
};