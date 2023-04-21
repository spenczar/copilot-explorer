Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.logger =
  exports.initializeLateDependencies =
  exports.createAgentContext =
    undefined;
const n = require(44617);
const i = require(35765);
const o = require(93927);
const s = require(39800);
const a = require(30446);
const c = require(5798);
const l = require(69035);
const u = require(86635);
const d = require(65489);
const p = require(89531);
const h = require(52369);
const f = require(70819);
const g = require(53406);
const m = require(9321);
const y = require(3895);
const v = require(53007);
const _ = require(87426);
const b = require(61926);
const w = require(76021);
const C = require(65332);
const E = require(57214);
const T = require(40585);
const S = require(32879);
const x = require(65120);
const k = require(42401);
const I = require(10540);
function createAgentContext() {
  const e = o.createProductionContext(new y.AgentConfigProvider());
  const r = T.makeXdgPersistenceManager();
  e.set(T.PersistenceManager, r);
  const c = new m.AuthManager(
    r,
    (e) => new i.CopilotTokenManagerFromGitHubToken(e)
  );
  e.set(g.GitHubDeviceFlow, new g.GitHubDeviceFlow());
  e.set(m.AuthManager, c);
  e.set(s.EditorSession, x.agentEditorSession);
  e.set(s.EditorAndPluginInfo, new y.AgentEditorInfo());
  e.set(C.MethodHandlers, C.getAllMethods());
  e.set(C.NotificationHandlers, new C.NotificationHandlers());
  e.set(v.CopilotCompletionCache, new v.CopilotCompletionCache());
  e.set(h.LocationFactory, new k.AgentLocationFactory());
  e.set(n.FileSystem, w.agentFileSystem);
  a.registerDefaultHandlers(e, "agent");
  e.set(
    _.WrappedConnection,
    _.WrappedConnection.from(e, process.stdin, process.stdout)
  );
  const p = new E.ConnectionNotificationSender(e);
  e.set(l.NotificationSender, p);
  e.set(E.AgentNotificationSender, p);
  e.set(u.StatusReporter, new b.NotificationStatusReporter(e));
  const S = new I.AgentTextDocumentManager(e);
  e.set(f.TextDocumentManager, S);
  e.set(I.AgentTextDocumentManager, S);
  process.on("exit", () => {
    try {
      exports.logger.debug(e, "Shutting down agent");
      e.get(d.TelemetryReporters).deactivate();
    } catch (e) {}
  });
  return e;
}
!(async function () {
  const e = createAgentContext();
  new S.CopilotService(e).listen();
})();
exports.createAgentContext = createAgentContext;
exports.initializeLateDependencies = function (e) {
  p.setupStandardReporters(e, "agent");
  exports.logger.debug(e, "Telemetry initialized");
};
exports.logger = new c.Logger(c.LogLevel.DEBUG, "agent");