Object.defineProperty(exports, "__esModule", {
  value: true,
});
var M_AppInsightsDataModule_maybe = require("AppInsightsDataModule");
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
    e instanceof M_AppInsightsDataModule_maybe.EventData ||
    e instanceof M_AppInsightsDataModule_maybe.ExceptionData ||
    e instanceof M_AppInsightsDataModule_maybe.MessageData ||
    e instanceof M_AppInsightsDataModule_maybe.MetricData ||
    e instanceof M_AppInsightsDataModule_maybe.PageViewData ||
    e instanceof M_AppInsightsDataModule_maybe.RemoteDependencyData ||
    e instanceof M_AppInsightsDataModule_maybe.RequestData
  );
};
