Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.CopilotService = undefined;
const M_connection_manager_maybe = require("connection-manager");
const M_Path_Parsing_Utils_maybe = require("Path-Parsing-Utils");
const M_CursorTrackerManager_maybe = require("CursorTrackerManager");
const M_LoggingUtils_maybe = require("LoggingUtils");
const M_RuntimeModeManager_maybe = require("RuntimeModeManager");
const M_DebugServerWrapper_maybe = require("DebugServerWrapper");
const M_NotificationLoggerModule_maybe = require("NotificationLoggerModule");
const M_LanguageServiceManager_maybe = require("LanguageServiceManager");
const M_EditorConfigurationManager_maybe = require("EditorConfigurationManager");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const M_AgentTextDocumentManagerModule_maybe = require("AgentTextDocumentManagerModule");
exports.CopilotService = class {
  constructor(e) {
    this.ctx = e;
    this.wrappedConnection = e.get(
      M_DebugServerWrapper_maybe.WrappedConnection
    );
    const t = this.wrappedConnection.conn;
    this.initialized = false;
    const r = new M_LoggingUtils_maybe.MultiLog([
      this.ctx.get(M_LoggingUtils_maybe.LogTarget),
      new M_NotificationLoggerModule_maybe.NotificationLogger(
        M_RuntimeModeManager_maybe.isDebugEnabled(this.ctx)
      ),
    ]);
    this.ctx.forceSet(M_LoggingUtils_maybe.LogTarget, r);
    new M_LoggingUtils_maybe.Logger(
      M_LoggingUtils_maybe.LogLevel.DEBUG,
      "agent"
    ).debug(this.ctx, "Agent service starting");
    t.onRequest(this.messageHandler.bind(this));
    t.onNotification(this.notificationHandler.bind(this));
    const u = e.get(
      M_AgentTextDocumentManagerModule_maybe.AgentTextDocumentManager
    );
    t.onInitialize(async (e) => {
      const t = e.capabilities.workspace?.workspaceFolders ?? false;
      u.init(
        e.workspaceFolders?.map((e) =>
          M_Path_Parsing_Utils_maybe.URI.parse(e.uri)
        ) ?? [],
        !M_RuntimeModeManager_maybe.isRunningInTest(this.ctx) && t
      );
      M_CursorTrackerManager_maybe.registerDocumentTracker(this.ctx);
      this.initialized = true;
      return {
        capabilities: {
          textDocumentSync: {
            openClose: true,
            change: M_connection_manager_maybe.TextDocumentSyncKind.Incremental,
          },
          workspace: {
            workspaceFolders: {
              supported: t,
              changeNotifications: t,
            },
          },
        },
      };
    });
    t.onDidChangeConfiguration(async (e) => {
      M_EditorConfigurationManager_maybe.notifyChangeConfiguration(this.ctx, e);
    });
  }
  async messageHandler(e, t, r) {
    const i = this.ctx
      .get(M_LanguageServiceManager_maybe.MethodHandlers)
      .handlers.get(e);
    if (!i)
      return new M_connection_manager_maybe.ResponseError(
        M_AjvErrorManager_maybe.ErrorCode.MethodNotFound,
        `Method not found: ${e}`
      );
    if (!this.initialized)
      return new M_connection_manager_maybe.ResponseError(
        M_AjvErrorManager_maybe.ErrorCode.ContextNotInitialized,
        "Agent service not initialized."
      );
    if (Array.isArray(t)) {
      t = t[0];
    }
    const [o, s] = await i(this.ctx, r, t);
    return s
      ? new M_connection_manager_maybe.ResponseError(s.code, s.message, s.data)
      : o;
  }
  async notificationHandler(e, t) {
    const r = this.ctx
      .get(M_LanguageServiceManager_maybe.NotificationHandlers)
      .handlers.get(e);
    if (r) {
      if (Array.isArray(t)) {
        t = t[0];
      }
      await r(this.ctx, t);
    }
  }
  listen() {
    this.wrappedConnection.listen();
  }
  dispose() {
    this.wrappedConnection.conn.dispose();
  }
};
