var M_correlation_id_manager_maybe = require("correlation-id-manager");
var M_endpoint_parser_utils_maybe = require("endpoint-parser-utils");
var M_QuickPulseTelemetryModule_maybe = require("QuickPulseTelemetryModule");
var M_url = require("url");
var a = (function () {
  function e(t) {
    var r = this;
    this.endpointBase =
      M_QuickPulseTelemetryModule_maybe.DEFAULT_BREEZE_ENDPOINT;
    var n = process.env[e.ENV_connectionString];
    var a = M_endpoint_parser_utils_maybe.parse(t);
    var c = M_endpoint_parser_utils_maybe.parse(n);
    var l = !a.instrumentationkey && Object.keys(a).length > 0 ? null : t;
    this.instrumentationKey =
      a.instrumentationkey ||
      l ||
      c.instrumentationkey ||
      e._getInstrumentationKey();
    this.endpointUrl =
      (a.ingestionendpoint || c.ingestionendpoint || this.endpointBase) +
      "/v2/track";
    this.maxBatchSize = 250;
    this.maxBatchIntervalMs = 15e3;
    this.disableAppInsights = false;
    this.samplingPercentage = 100;
    this.correlationIdRetryIntervalMs = 3e4;
    this.correlationHeaderExcludedDomains = [
      "*.core.windows.net",
      "*.core.chinacloudapi.cn",
      "*.core.cloudapi.de",
      "*.core.usgovcloudapi.net",
      "*.core.microsoft.scloud",
      "*.core.eaglex.ic.gov",
    ];
    this.setCorrelationId = function (e) {
      return (r.correlationId = e);
    };
    this.proxyHttpUrl = process.env[e.ENV_http_proxy] || undefined;
    this.proxyHttpsUrl = process.env[e.ENV_https_proxy] || undefined;
    this.httpAgent = undefined;
    this.httpsAgent = undefined;
    this.profileQueryEndpoint =
      a.ingestionendpoint ||
      c.ingestionendpoint ||
      process.env[e.ENV_profileQueryEndpoint] ||
      this.endpointBase;
    this._quickPulseHost =
      a.liveendpoint ||
      c.liveendpoint ||
      process.env[e.ENV_quickPulseHost] ||
      M_QuickPulseTelemetryModule_maybe.DEFAULT_LIVEMETRICS_HOST;
    if (this._quickPulseHost.match(/^https?:\/\//)) {
      this._quickPulseHost = M_url.parse(this._quickPulseHost).host;
    }
  }
  Object.defineProperty(e.prototype, "profileQueryEndpoint", {
    get: function () {
      return this._profileQueryEndpoint;
    },
    set: function (e) {
      M_correlation_id_manager_maybe.cancelCorrelationIdQuery(
        this,
        this.setCorrelationId
      );
      this._profileQueryEndpoint = e;
      this.correlationId = M_correlation_id_manager_maybe.correlationIdPrefix;
      M_correlation_id_manager_maybe.queryCorrelationId(
        this,
        this.setCorrelationId
      );
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(e.prototype, "quickPulseHost", {
    get: function () {
      return this._quickPulseHost;
    },
    set: function (e) {
      this._quickPulseHost = e;
    },
    enumerable: true,
    configurable: true,
  });
  e._getInstrumentationKey = function () {
    var t =
      process.env[e.ENV_iKey] ||
      process.env[e.ENV_azurePrefix + e.ENV_iKey] ||
      process.env[e.legacy_ENV_iKey] ||
      process.env[e.ENV_azurePrefix + e.legacy_ENV_iKey];
    if (!t || "" == t)
      throw new Error(
        "Instrumentation key not found, pass the key in the config to this method or set the key in the environment variable APPINSIGHTS_INSTRUMENTATIONKEY before starting the server"
      );
    return t;
  };
  e.ENV_azurePrefix = "APPSETTING_";
  e.ENV_iKey = "APPINSIGHTS_INSTRUMENTATIONKEY";
  e.legacy_ENV_iKey = "APPINSIGHTS_INSTRUMENTATION_KEY";
  e.ENV_profileQueryEndpoint = "APPINSIGHTS_PROFILE_QUERY_ENDPOINT";
  e.ENV_quickPulseHost = "APPINSIGHTS_QUICKPULSE_HOST";
  e.ENV_connectionString = "APPLICATIONINSIGHTS_CONNECTION_STRING";
  e.ENV_nativeMetricsDisablers = "APPLICATION_INSIGHTS_DISABLE_EXTENDED_METRIC";
  e.ENV_nativeMetricsDisableAll =
    "APPLICATION_INSIGHTS_DISABLE_ALL_EXTENDED_METRICS";
  e.ENV_http_proxy = "http_proxy";
  e.ENV_https_proxy = "https_proxy";
  return e;
})();
module.exports = a;
