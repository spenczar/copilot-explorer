Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.logger = exports.createProductionContext = undefined;
const M_TokenNotifierModule_maybe = require("TokenNotifierModule");
const M_ClockModule_maybe = require("ClockModule");
const M_editor_config_constants_maybe = require("editor-config-constants");
const M_ContextManager_maybe = require("ContextManager");
const M_SelfSignedCertificateNotifier_maybe = require("SelfSignedCertificateNotifier");
const M_ExperimentCacheManager_maybe = require("ExperimentCacheManager");
const M_ExpConfigManager_maybe = require("ExpConfigManager");
const M_contextual_filter_utils_maybe = require("contextual-filter-utils");
const M_GhostTextDebounceManager_maybe = require("GhostTextDebounceManager");
const M_HeaderContributorManager_maybe = require("HeaderContributorManager");
const M_LanguageDetectionManager_maybe = require("LanguageDetectionManager");
const M_LoggingUtils_maybe = require("LoggingUtils");
const M_RootCertificateReaderManager_maybe = require("RootCertificateReaderManager");
const M_HelixFetcherModule_maybe = require("HelixFetcherModule");
const M_FetcherRequestManager_maybe = require("FetcherRequestManager");
const M_OpenAIFetcherUtils_maybe = require("OpenAIFetcherUtils");
const M_PostInsertionNotifierModule_maybe = require("PostInsertionNotifierModule");
const M_TelemetryReporterModule_maybe = require("TelemetryReporterModule");
const M_RuntimeModeManager_maybe = require("RuntimeModeManager");
const M_UrlOpenerManager_maybe = require("UrlOpenerManager");
exports.createProductionContext = function (e) {
  const r = new M_ContextManager_maybe.Context();
  r.set(M_editor_config_constants_maybe.ConfigProvider, e);
  r.set(M_ClockModule_maybe.Clock, new M_ClockModule_maybe.Clock());
  r.set(
    M_editor_config_constants_maybe.BuildInfo,
    new M_editor_config_constants_maybe.BuildInfo()
  );
  (function (e) {
    e.set(
      M_RuntimeModeManager_maybe.RuntimeMode,
      M_RuntimeModeManager_maybe.RuntimeMode.fromEnvironment(false)
    );
    e.set(
      M_LoggingUtils_maybe.LogVerbose,
      new M_LoggingUtils_maybe.LogVerbose(
        M_RuntimeModeManager_maybe.isVerboseLoggingEnabled(e)
      )
    );
    e.set(
      M_LoggingUtils_maybe.LogTarget,
      new M_LoggingUtils_maybe.ConsoleLog(console)
    );
  })(r);
  exports.logger.debug(r, "Initializing main context");
  r.set(
    M_TokenNotifierModule_maybe.CopilotTokenNotifier,
    new M_TokenNotifierModule_maybe.CopilotTokenNotifier()
  );
  r.set(
    M_RootCertificateReaderManager_maybe.RootCertificateReader,
    M_RootCertificateReaderManager_maybe.getRootCertificateReader(r)
  );
  r.set(
    M_FetcherRequestManager_maybe.Fetcher,
    new M_HelixFetcherModule_maybe.HelixFetcher(r)
  );
  r.set(
    M_GhostTextDebounceManager_maybe.GhostTextDebounceManager,
    new M_GhostTextDebounceManager_maybe.GhostTextDebounceManager()
  );
  r.set(
    M_LanguageDetectionManager_maybe.LanguageDetection,
    M_LanguageDetectionManager_maybe.getLanguageDetection()
  );
  r.set(
    M_ExperimentCacheManager_maybe.Features,
    new M_ExperimentCacheManager_maybe.Features(r)
  );
  r.set(
    M_PostInsertionNotifierModule_maybe.PostInsertionNotifier,
    new M_PostInsertionNotifierModule_maybe.PostInsertionNotifier()
  );
  r.set(
    M_TelemetryReporterModule_maybe.TelemetryUserConfig,
    new M_TelemetryReporterModule_maybe.TelemetryUserConfig(r)
  );
  r.set(
    M_TelemetryReporterModule_maybe.TelemetryEndpointUrl,
    new M_TelemetryReporterModule_maybe.TelemetryEndpointUrl()
  );
  r.set(
    M_TelemetryReporterModule_maybe.TelemetryReporters,
    new M_TelemetryReporterModule_maybe.TelemetryReporters()
  );
  r.set(
    M_HeaderContributorManager_maybe.HeaderContributors,
    new M_HeaderContributorManager_maybe.HeaderContributors()
  );
  r.set(
    M_SelfSignedCertificateNotifier_maybe.UserErrorNotifier,
    new M_SelfSignedCertificateNotifier_maybe.UserErrorNotifier()
  );
  r.set(
    M_contextual_filter_utils_maybe.ContextualFilterManager,
    new M_contextual_filter_utils_maybe.ContextualFilterManager()
  );
  r.set(
    M_OpenAIFetcherUtils_maybe.OpenAIFetcher,
    new M_OpenAIFetcherUtils_maybe.LiveOpenAIFetcher()
  );
  r.set(
    M_editor_config_constants_maybe.BlockModeConfig,
    new M_editor_config_constants_maybe.ConfigBlockModeConfig()
  );
  r.set(
    M_UrlOpenerManager_maybe.UrlOpener,
    new M_UrlOpenerManager_maybe.RealUrlOpener()
  );
  r.set(
    M_ExpConfigManager_maybe.ExpConfigMaker,
    new M_ExpConfigManager_maybe.ExpConfigNone()
  );
  return r;
};
exports.logger = new M_LoggingUtils_maybe.Logger(
  M_LoggingUtils_maybe.LogLevel.DEBUG,
  "context"
);
