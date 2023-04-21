Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.logger =
  exports.initializeLateDependencies =
  exports.createAgentContext =
    undefined;
const M_TreeNodeUtils_maybe = require("TreeNodeUtils");
const M_CopilotTokenManagerModule_maybe = require("CopilotTokenManagerModule");
const M_ProductionContextModule_maybe = require("ProductionContextModule");
const M_editor_config_constants_maybe = require("editor-config-constants");
const M_ErrorHandlerModule_maybe = require("ErrorHandlerModule");
const M_LoggingUtils_maybe = require("LoggingUtils");
const M_NotificationSenderModule_maybe = require("NotificationSenderModule");
const M_StatusReporterManager_maybe = require("StatusReporterManager");
const M_TelemetryReporterModule_maybe = require("TelemetryReporterModule");
const M_AppInsightsTelemetryManager_maybe = require("AppInsightsTelemetryManager");
const M_LocationFactoryModule_maybe = require("LocationFactoryModule");
const M_PathUtilsManager_maybe = require("PathUtilsManager");
const M_GitHubDeviceFlowManager_maybe = require("GitHubDeviceFlowManager");
const M_AuthManagerModule_maybe = require("AuthManagerModule");
const M_AgentInfoProvider_maybe = require("AgentInfoProvider");
const M_CopilotCompletionCacheManager_maybe = require("CopilotCompletionCacheManager");
const M_DebugServerWrapper_maybe = require("DebugServerWrapper");
const M_NotificationStatusManager_maybe = require("NotificationStatusManager");
const M_FileSystemUtils_maybe = require("FileSystemUtils");
const M_LanguageServiceManager_maybe = require("LanguageServiceManager");
const M_NotificationSenderModule_maybe = require("NotificationSenderModule");
const M_XDGPersistenceManager_maybe = require("XDGPersistenceManager");
const M_CopilotServiceModule_maybe = require("CopilotServiceModule");
const M_AgentEditorSessionManager_maybe = require("AgentEditorSessionManager");
const M_AgentTextDocumentManager_maybe = require("AgentTextDocumentManager");
const M_AgentTextDocumentManagerModule_maybe = require("AgentTextDocumentManagerModule");
function createAgentContext() {
  const e = M_ProductionContextModule_maybe.createProductionContext(
    new M_AgentInfoProvider_maybe.AgentConfigProvider()
  );
  const r = M_XDGPersistenceManager_maybe.makeXdgPersistenceManager();
  e.set(M_XDGPersistenceManager_maybe.PersistenceManager, r);
  const c = new M_AuthManagerModule_maybe.AuthManager(
    r,
    (e) =>
      new M_CopilotTokenManagerModule_maybe.CopilotTokenManagerFromGitHubToken(
        e
      )
  );
  e.set(
    M_GitHubDeviceFlowManager_maybe.GitHubDeviceFlow,
    new M_GitHubDeviceFlowManager_maybe.GitHubDeviceFlow()
  );
  e.set(M_AuthManagerModule_maybe.AuthManager, c);
  e.set(
    M_editor_config_constants_maybe.EditorSession,
    M_AgentEditorSessionManager_maybe.agentEditorSession
  );
  e.set(
    M_editor_config_constants_maybe.EditorAndPluginInfo,
    new M_AgentInfoProvider_maybe.AgentEditorInfo()
  );
  e.set(
    M_LanguageServiceManager_maybe.MethodHandlers,
    M_LanguageServiceManager_maybe.getAllMethods()
  );
  e.set(
    M_LanguageServiceManager_maybe.NotificationHandlers,
    new M_LanguageServiceManager_maybe.NotificationHandlers()
  );
  e.set(
    M_CopilotCompletionCacheManager_maybe.CopilotCompletionCache,
    new M_CopilotCompletionCacheManager_maybe.CopilotCompletionCache()
  );
  e.set(
    M_LocationFactoryModule_maybe.LocationFactory,
    new M_AgentTextDocumentManager_maybe.AgentLocationFactory()
  );
  e.set(
    M_TreeNodeUtils_maybe.FileSystem,
    M_FileSystemUtils_maybe.agentFileSystem
  );
  M_ErrorHandlerModule_maybe.registerDefaultHandlers(e, "agent");
  e.set(
    M_DebugServerWrapper_maybe.WrappedConnection,
    M_DebugServerWrapper_maybe.WrappedConnection.from(
      e,
      process.stdin,
      process.stdout
    )
  );
  const p = new M_NotificationSenderModule_maybe.ConnectionNotificationSender(
    e
  );
  e.set(M_NotificationSenderModule_maybe.NotificationSender, p);
  e.set(M_NotificationSenderModule_maybe.AgentNotificationSender, p);
  e.set(
    M_StatusReporterManager_maybe.StatusReporter,
    new M_NotificationStatusManager_maybe.NotificationStatusReporter(e)
  );
  const S = new M_AgentTextDocumentManagerModule_maybe.AgentTextDocumentManager(
    e
  );
  e.set(M_PathUtilsManager_maybe.TextDocumentManager, S);
  e.set(M_AgentTextDocumentManagerModule_maybe.AgentTextDocumentManager, S);
  process.on("exit", () => {
    try {
      exports.logger.debug(e, "Shutting down agent");
      e.get(M_TelemetryReporterModule_maybe.TelemetryReporters).deactivate();
    } catch (e) {}
  });
  return e;
}
!(async function () {
  const e = createAgentContext();
  new M_CopilotServiceModule_maybe.CopilotService(e).listen();
})();
exports.createAgentContext = createAgentContext;
exports.initializeLateDependencies = function (e) {
  M_AppInsightsTelemetryManager_maybe.setupStandardReporters(e, "agent");
  exports.logger.debug(e, "Telemetry initialized");
};
exports.logger = new M_LoggingUtils_maybe.Logger(
  M_LoggingUtils_maybe.LogLevel.DEBUG,
  "agent"
);
