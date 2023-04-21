Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.createAgentTestingContext =
  exports.TestAgentEditorInfo =
  exports.TestTextDocumentManager =
  exports.getTestingContext =
  exports.newTestingContext =
    undefined;
const M_TreeNodeUtils_maybe = require("TreeNodeUtils");
const M_editor_config_constants_maybe = require("editor-config-constants");
const M_ContextManager_maybe = require("ContextManager");
const M_NotificationSenderModule_maybe = require("NotificationSenderModule");
const M_BaselineContextModule_maybe = require("BaselineContextModule");
const M_LocationFactoryModule_maybe = require("LocationFactoryModule");
const M_PathUtilsManager_maybe = require("PathUtilsManager");
const M_AgentInfoProvider_maybe = require("AgentInfoProvider");
const M_CopilotCompletionCacheManager_maybe = require("CopilotCompletionCacheManager");
const M_FileSystemUtils_maybe = require("FileSystemUtils");
const M_AgentTextDocumentManager_maybe = require("AgentTextDocumentManager");
const M_DebugServerWrapper_maybe = require("DebugServerWrapper");
const M_FakeConnectionWrapper_maybe = require("FakeConnectionWrapper");
const M_LanguageServiceManager_maybe = require("LanguageServiceManager");
const M_NotificationSenderModule_maybe = require("NotificationSenderModule");
const M_TestAgentNotificationSenderModule_maybe = require("TestAgentNotificationSenderModule");
const _ = new Map();
let b = 0;
exports.newTestingContext = function (e) {
  const t = b;
  const r = new M_ContextManager_maybe.Context(e);
  _.set(t, r);
  b++;
  return t;
};
exports.getTestingContext = function (e) {
  const t = _.get(e);
  if (undefined === t) throw new Error(`Testing context ${e} not found`);
  return t;
};
class TestTextDocumentManager extends M_PathUtilsManager_maybe.TextDocumentManager {
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
      this._textDocuments.push(
        new M_AgentTextDocumentManager_maybe.AgentTextDocument(e, t, 0, r)
      );
    }
  }
  findNotebook(e) {}
}
exports.TestTextDocumentManager = TestTextDocumentManager;
class TestAgentEditorInfo extends M_AgentInfoProvider_maybe.AgentEditorInfo {
  constructor() {
    super(...arguments);
    this.inner = new M_AgentInfoProvider_maybe.AgentEditorInfo();
  }
  clear() {
    this.inner = new M_AgentInfoProvider_maybe.AgentEditorInfo();
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
  const e = M_BaselineContextModule_maybe._createBaselineContext(
    new M_AgentInfoProvider_maybe.AgentConfigProvider()
  );
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
  e.set(M_editor_config_constants_maybe.EditorAndPluginInfo, t);
  e.set(M_AgentInfoProvider_maybe.AgentEditorInfo, t);
  e.set(TestAgentEditorInfo, t);
  e.set(
    M_LocationFactoryModule_maybe.LocationFactory,
    new M_AgentTextDocumentManager_maybe.AgentLocationFactory()
  );
  const r = new TestTextDocumentManager();
  e.set(M_PathUtilsManager_maybe.TextDocumentManager, r);
  e.set(TestTextDocumentManager, r);
  e.set(
    M_TreeNodeUtils_maybe.FileSystem,
    M_FileSystemUtils_maybe.agentFileSystem
  );
  const o = new M_FakeConnectionWrapper_maybe.FakeWrappedConnection();
  e.set(M_DebugServerWrapper_maybe.WrappedConnection, o);
  e.set(M_FakeConnectionWrapper_maybe.FakeWrappedConnection, o);
  const _ =
    new M_TestAgentNotificationSenderModule_maybe.TestAgentNotificationSender();
  e.forceSet(M_NotificationSenderModule_maybe.NotificationSender, _);
  e.set(M_NotificationSenderModule_maybe.AgentNotificationSender, _);
  e.set(
    M_TestAgentNotificationSenderModule_maybe.TestAgentNotificationSender,
    _
  );
  e.set(
    M_CopilotCompletionCacheManager_maybe.CopilotCompletionCache,
    new M_CopilotCompletionCacheManager_maybe.CopilotCompletionCache()
  );
  e.set(
    M_LanguageServiceManager_maybe.MethodHandlers,
    M_LanguageServiceManager_maybe.getAllMethods()
  );
  return e;
};
