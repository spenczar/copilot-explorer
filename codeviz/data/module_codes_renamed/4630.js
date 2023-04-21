Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.createLibTestingContext = exports._createBaselineContext = undefined;
const M_TreeNodeUtils_maybe = require("TreeNodeUtils");
const M_fs = require("fs");
const M_CopilotTokenManagerModule_maybe = require("CopilotTokenManagerModule");
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
const M_NotificationSenderModule_maybe = require("NotificationSenderModule");
const M_PostInsertionNotifierModule_maybe = require("PostInsertionNotifierModule");
const M_StatusReporterManager_maybe = require("StatusReporterManager");
const M_TelemetryReporterModule_maybe = require("TelemetryReporterModule");
const M_AppInsightsTelemetryManager_maybe = require("AppInsightsTelemetryManager");
const M_LocationFactoryModule_maybe = require("LocationFactoryModule");
const M_PathUtilsManager_maybe = require("PathUtilsManager");
const M_UrlOpenerManager_maybe = require("UrlOpenerManager");
const M_FakeResponseCreator_maybe = require("FakeResponseCreator");
const M_RuntimeModeManager_maybe = require("RuntimeModeManager");
const M_TestUtilsModule_maybe = require("TestUtilsModule");
const M_LanguageDetectionUtils_maybe = require("LanguageDetectionUtils");
const M_ProductFeatureManager_maybe = require("ProductFeatureManager");
const M_InMemoryTextDocumentManager_maybe = require("InMemoryTextDocumentManager");
function _createBaselineContext(e) {
  const t = new M_ContextManager_maybe.Context();
  t.set(M_editor_config_constants_maybe.ConfigProvider, e);
  t.set(
    M_editor_config_constants_maybe.BuildInfo,
    new M_editor_config_constants_maybe.BuildInfo()
  );
  t.set(
    M_RuntimeModeManager_maybe.RuntimeMode,
    M_RuntimeModeManager_maybe.RuntimeMode.fromEnvironment(true)
  );
  t.set(
    M_RootCertificateReaderManager_maybe.RootCertificateReader,
    M_FakeResponseCreator_maybe.createTestCertificateReader([])
  );
  t.set(
    M_FetcherRequestManager_maybe.Fetcher,
    new M_HelixFetcherModule_maybe.HelixFetcher(t)
  );
  t.set(
    M_LoggingUtils_maybe.LogVerbose,
    new M_LoggingUtils_maybe.LogVerbose(false)
  );
  t.set(M_ClockModule_maybe.Clock, new M_ClockModule_maybe.Clock());
  t.set(
    M_ExpConfigManager_maybe.ExpConfigMaker,
    new M_ExpConfigManager_maybe.ExpConfigNone()
  );
  t.set(
    M_GhostTextDebounceManager_maybe.GhostTextDebounceManager,
    new M_GhostTextDebounceManager_maybe.GhostTextDebounceManager()
  );
  t.set(
    M_contextual_filter_utils_maybe.ContextualFilterManager,
    new M_contextual_filter_utils_maybe.ContextualFilterManager()
  );
  t.set(
    M_TokenNotifierModule_maybe.CopilotTokenNotifier,
    new M_TokenNotifierModule_maybe.CopilotTokenNotifier()
  );
  t.set(
    M_TelemetryReporterModule_maybe.TelemetryUserConfig,
    new M_TelemetryReporterModule_maybe.TelemetryUserConfig(t, "tid=test", true)
  );
  t.set(
    M_ProductFeatureManager_maybe.TestProductFeatures,
    new M_ProductFeatureManager_maybe.TestProductFeatures(t)
  );
  t.set(
    M_TelemetryReporterModule_maybe.TelemetryReporters,
    new M_TelemetryReporterModule_maybe.TelemetryReporters()
  );
  t.set(
    M_NotificationSenderModule_maybe.NotificationSender,
    new M_TestUtilsModule_maybe.TestNotificationSender()
  );
  t.set(
    M_UrlOpenerManager_maybe.UrlOpener,
    new M_TestUtilsModule_maybe.TestUrlOpener()
  );
  t.set(
    M_LoggingUtils_maybe.LogTarget,
    new M_LoggingUtils_maybe.ConsoleLog(console)
  );
  t.set(
    M_SelfSignedCertificateNotifier_maybe.UserErrorNotifier,
    new M_SelfSignedCertificateNotifier_maybe.UserErrorNotifier()
  );
  t.set(
    M_TelemetryReporterModule_maybe.TelemetryEndpointUrl,
    new M_TelemetryReporterModule_maybe.TelemetryEndpointUrl()
  );
  t.set(
    M_editor_config_constants_maybe.EditorSession,
    new M_editor_config_constants_maybe.EditorSession(
      "test-session",
      "test-machine"
    )
  );
  M_AppInsightsTelemetryManager_maybe.setupStandardReporters(t, "copilot-test");
  t.set(
    M_ExperimentCacheManager_maybe.Features,
    new M_ExperimentCacheManager_maybe.Features(t)
  );
  t.set(
    M_PostInsertionNotifierModule_maybe.PostInsertionNotifier,
    new M_PostInsertionNotifierModule_maybe.PostInsertionNotifier()
  );
  t.set(
    M_editor_config_constants_maybe.BlockModeConfig,
    new M_editor_config_constants_maybe.ConfigBlockModeConfig()
  );
  t.set(
    M_CopilotTokenManagerModule_maybe.CopilotTokenManager,
    new M_CopilotTokenManagerModule_maybe.FixedCopilotTokenManager("tid=test")
  );
  t.set(
    M_StatusReporterManager_maybe.StatusReporter,
    new M_StatusReporterManager_maybe.NoOpStatusReporter()
  );
  t.set(
    M_HeaderContributorManager_maybe.HeaderContributors,
    new M_HeaderContributorManager_maybe.HeaderContributors()
  );
  t.set(
    M_LanguageDetectionManager_maybe.LanguageDetection,
    new M_LanguageDetectionUtils_maybe.TestLanguageDetection()
  );
  return t;
}
exports._createBaselineContext = _createBaselineContext;
exports.createLibTestingContext = function () {
  const e = _createBaselineContext(
    new M_editor_config_constants_maybe.DefaultsOnlyConfigProvider()
  );
  e.set(M_editor_config_constants_maybe.EditorAndPluginInfo, new M());
  e.set(
    M_LocationFactoryModule_maybe.LocationFactory,
    new M_InMemoryTextDocumentManager_maybe.TestLocationFactory()
  );
  e.set(
    M_PathUtilsManager_maybe.TextDocumentManager,
    new M_InMemoryTextDocumentManager_maybe.TestTextDocumentManager()
  );
  e.set(M_TreeNodeUtils_maybe.FileSystem, B);
  return e;
};
class M extends M_editor_config_constants_maybe.EditorAndPluginInfo {
  getEditorInfo(e) {
    return {
      name: "lib-tests-editor",
      version: "1",
    };
  }
  getEditorPluginInfo(e) {
    return {
      name: "lib-tests-plugin",
      version: "2",
    };
  }
}
const B = {
  readFile: function (e) {
    return M_fs.promises.readFile(e);
  },
  mtime: async function (e) {
    return (await M_fs.promises.stat(e)).mtimeMs;
  },
  stat: async function (e) {
    const t = await M_fs.promises.stat(e);
    return {
      ctime: t.ctimeMs,
      mtime: t.mtimeMs,
      size: t.size,
    };
  },
};
