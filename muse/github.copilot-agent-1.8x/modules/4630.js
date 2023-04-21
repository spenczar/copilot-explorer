Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.createLibTestingContext = exports._createBaselineContext = undefined;
const n = require(44617);
const i = require("fs");
const o = require(35765);
const s = require(40084);
const a = require(32137);
const c = require(39800);
const l = require(75611);
const u = require(70769);
const d = require(16905);
const p = require(66046);
const h = require(96817);
const f = require(54619);
const g = require(63405);
const m = require(20190);
const y = require(5798);
const v = require(15291);
const _ = require(57158);
const b = require(20039);
const w = require(69035);
const C = require(70216);
const E = require(86635);
const T = require(65489);
const S = require(89531);
const x = require(52369);
const k = require(70819);
const I = require(84567);
const A = require(82161);
const P = require(20913);
const R = require(66584);
const N = require(67066);
const O = require(35095);
const L = require(80751);
function _createBaselineContext(e) {
  const t = new l.Context();
  t.set(c.ConfigProvider, e);
  t.set(c.BuildInfo, new c.BuildInfo());
  t.set(P.RuntimeMode, P.RuntimeMode.fromEnvironment(true));
  t.set(v.RootCertificateReader, A.createTestCertificateReader([]));
  t.set(b.Fetcher, new _.HelixFetcher(t));
  t.set(y.LogVerbose, new y.LogVerbose(false));
  t.set(a.Clock, new a.Clock());
  t.set(p.ExpConfigMaker, new p.ExpConfigNone());
  t.set(f.GhostTextDebounceManager, new f.GhostTextDebounceManager());
  t.set(h.ContextualFilterManager, new h.ContextualFilterManager());
  t.set(s.CopilotTokenNotifier, new s.CopilotTokenNotifier());
  t.set(T.TelemetryUserConfig, new T.TelemetryUserConfig(t, "tid=test", true));
  t.set(O.TestProductFeatures, new O.TestProductFeatures(t));
  t.set(T.TelemetryReporters, new T.TelemetryReporters());
  t.set(w.NotificationSender, new R.TestNotificationSender());
  t.set(I.UrlOpener, new R.TestUrlOpener());
  t.set(y.LogTarget, new y.ConsoleLog(console));
  t.set(u.UserErrorNotifier, new u.UserErrorNotifier());
  t.set(T.TelemetryEndpointUrl, new T.TelemetryEndpointUrl());
  t.set(c.EditorSession, new c.EditorSession("test-session", "test-machine"));
  S.setupStandardReporters(t, "copilot-test");
  t.set(d.Features, new d.Features(t));
  t.set(C.PostInsertionNotifier, new C.PostInsertionNotifier());
  t.set(c.BlockModeConfig, new c.ConfigBlockModeConfig());
  t.set(o.CopilotTokenManager, new o.FixedCopilotTokenManager("tid=test"));
  t.set(E.StatusReporter, new E.NoOpStatusReporter());
  t.set(g.HeaderContributors, new g.HeaderContributors());
  t.set(m.LanguageDetection, new N.TestLanguageDetection());
  return t;
}
exports._createBaselineContext = _createBaselineContext;
exports.createLibTestingContext = function () {
  const e = _createBaselineContext(new c.DefaultsOnlyConfigProvider());
  e.set(c.EditorAndPluginInfo, new M());
  e.set(x.LocationFactory, new L.TestLocationFactory());
  e.set(k.TextDocumentManager, new L.TestTextDocumentManager());
  e.set(n.FileSystem, B);
  return e;
};
class M extends c.EditorAndPluginInfo {
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
    return i.promises.readFile(e);
  },
  mtime: async function (e) {
    return (await i.promises.stat(e)).mtimeMs;
  },
  stat: async function (e) {
    const t = await i.promises.stat(e);
    return {
      ctime: t.ctimeMs,
      mtime: t.mtimeMs,
      size: t.size,
    };
  },
};