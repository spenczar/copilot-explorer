Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.createAgentTestingContext =
  exports.TestAgentEditorInfo =
  exports.TestTextDocumentManager =
  exports.getTestingContext =
  exports.newTestingContext =
    undefined;
const n = require(44617);
const i = require(39800);
const o = require(75611);
const s = require(69035);
const a = require(4630);
const c = require(52369);
const l = require(70819);
const u = require(3895);
const d = require(53007);
const p = require(76021);
const h = require(42401);
const f = require(87426);
const g = require(39824);
const m = require(65332);
const y = require(57214);
const v = require(56238);
const _ = new Map();
let b = 0;
exports.newTestingContext = function (e) {
  const t = b;
  const r = new o.Context(e);
  _.set(t, r);
  b++;
  return t;
};
exports.getTestingContext = function (e) {
  const t = _.get(e);
  if (undefined === t) throw new Error(`Testing context ${e} not found`);
  return t;
};
class TestTextDocumentManager extends l.TextDocumentManager {
  constructor() {
    super(...arguments);
    this._textDocuments = [];
    this.onDidFocusTextDocument = () => ({
      dispose: () => {},
    });
    this.onDidChangeTextDocument = () => ({
      dispose: () => {},
    });
    this.onDidChangeCursor = () => ({
      dispose: () => {},
    });
  }
  get textDocuments() {
    return this._textDocuments;
  }
  async getTextDocument(e) {
    return this.textDocuments.find((t) => t.uri.toString() == e.toString());
  }
  async getRelativePath(e) {}
  setTextDocument(e, t, r) {
    const n = this._textDocuments.find((t) => t.uri.toString() == e.toString());
    if (n) {
      n.update(
        [
          {
            text: r,
          },
        ],
        n.version + 1
      );
    } else {
      this._textDocuments.push(new h.AgentTextDocument(e, t, 0, r));
    }
  }
  findNotebook(e) {}
}
exports.TestTextDocumentManager = TestTextDocumentManager;
class TestAgentEditorInfo extends u.AgentEditorInfo {
  constructor() {
    super(...arguments);
    this.inner = new u.AgentEditorInfo();
  }
  clear() {
    this.inner = new u.AgentEditorInfo();
  }
  setEditorAndPluginInfo(e, t) {
    this.inner.setEditorAndPluginInfo(e, t);
  }
  getEditorInfo(e) {
    return this.inner.getEditorInfo(e);
  }
  getEditorPluginInfo(e) {
    return this.inner.getEditorPluginInfo(e);
  }
}
exports.TestAgentEditorInfo = TestAgentEditorInfo;
exports.createAgentTestingContext = function () {
  const e = a._createBaselineContext(new u.AgentConfigProvider());
  const t = (function () {
    const e = new TestAgentEditorInfo();
    e.setEditorAndPluginInfo(
      {
        name: "agent-tests",
        version: "0",
      },
      {
        name: "agent-tests",
        version: "0",
      }
    );
    return e;
  })();
  e.set(i.EditorAndPluginInfo, t);
  e.set(u.AgentEditorInfo, t);
  e.set(TestAgentEditorInfo, t);
  e.set(c.LocationFactory, new h.AgentLocationFactory());
  const r = new TestTextDocumentManager();
  e.set(l.TextDocumentManager, r);
  e.set(TestTextDocumentManager, r);
  e.set(n.FileSystem, p.agentFileSystem);
  const o = new g.FakeWrappedConnection();
  e.set(f.WrappedConnection, o);
  e.set(g.FakeWrappedConnection, o);
  const _ = new v.TestAgentNotificationSender();
  e.forceSet(s.NotificationSender, _);
  e.set(y.AgentNotificationSender, _);
  e.set(v.TestAgentNotificationSender, _);
  e.set(d.CopilotCompletionCache, new d.CopilotCompletionCache());
  e.set(m.MethodHandlers, m.getAllMethods());
  return e;
};