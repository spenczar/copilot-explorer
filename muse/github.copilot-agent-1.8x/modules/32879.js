Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.CopilotService = undefined;
const n = require(35809);
const i = require(16630);
const o = require(25225);
const s = require(5798);
const a = require(20913);
const c = require(87426);
const l = require(76974);
const u = require(65332);
const d = require(94340);
const p = require(5381);
const h = require(10540);
exports.CopilotService = class {
  constructor(e) {
    this.ctx = e;
    this.wrappedConnection = e.get(c.WrappedConnection);
    const t = this.wrappedConnection.conn;
    this.initialized = false;
    const r = new s.MultiLog([
      this.ctx.get(s.LogTarget),
      new l.NotificationLogger(a.isDebugEnabled(this.ctx)),
    ]);
    this.ctx.forceSet(s.LogTarget, r);
    new s.Logger(s.LogLevel.DEBUG, "agent").debug(
      this.ctx,
      "Agent service starting"
    );
    t.onRequest(this.messageHandler.bind(this));
    t.onNotification(this.notificationHandler.bind(this));
    const u = e.get(h.AgentTextDocumentManager);
    t.onInitialize(async (e) => {
      const t = e.capabilities.workspace?.workspaceFolders ?? false;
      u.init(
        e.workspaceFolders?.map((e) => i.URI.parse(e.uri)) ?? [],
        !a.isRunningInTest(this.ctx) && t
      );
      o.registerDocumentTracker(this.ctx);
      this.initialized = true;
      return {
        capabilities: {
          textDocumentSync: {
            openClose: true,
            change: n.TextDocumentSyncKind.Incremental,
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
      d.notifyChangeConfiguration(this.ctx, e);
    });
  }
  async messageHandler(e, t, r) {
    const i = this.ctx.get(u.MethodHandlers).handlers.get(e);
    if (!i)
      return new n.ResponseError(
        p.ErrorCode.MethodNotFound,
        `Method not found: ${e}`
      );
    if (!this.initialized)
      return new n.ResponseError(
        p.ErrorCode.ContextNotInitialized,
        "Agent service not initialized."
      );
    if (Array.isArray(t)) {
      t = t[0];
    }
    const [o, s] = await i(this.ctx, r, t);
    return s ? new n.ResponseError(s.code, s.message, s.data) : o;
  }
  async notificationHandler(e, t) {
    const r = this.ctx.get(u.NotificationHandlers).handlers.get(e);
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