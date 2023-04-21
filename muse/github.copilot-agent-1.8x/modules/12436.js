Object.defineProperty(exports, "__esModule", {
  value: true,
});
var n = require(93809);
var RemoteDependencyDataConstants = (function () {
  function e() {}
  e.TYPE_HTTP = "Http";
  e.TYPE_AI = "Http (tracked component)";
  return e;
})();
exports.RemoteDependencyDataConstants = RemoteDependencyDataConstants;
exports.domainSupportsProperties = function (e) {
  return (
    "properties" in e ||
    e instanceof n.EventData ||
    e instanceof n.ExceptionData ||
    e instanceof n.MessageData ||
    e instanceof n.MetricData ||
    e instanceof n.PageViewData ||
    e instanceof n.RemoteDependencyData ||
    e instanceof n.RequestData
  );
};