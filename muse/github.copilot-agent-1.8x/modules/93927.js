Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.logger = exports.createProductionContext = undefined;
const n = require(40084);
const i = require(32137);
const o = require(39800);
const s = require(75611);
const a = require(70769);
const c = require(16905);
const l = require(66046);
const u = require(96817);
const d = require(54619);
const p = require(63405);
const h = require(20190);
const f = require(5798);
const g = require(15291);
const m = require(57158);
const y = require(20039);
const v = require(52031);
const _ = require(70216);
const b = require(65489);
const w = require(20913);
const C = require(84567);
exports.createProductionContext = function (e) {
  const r = new s.Context();
  r.set(o.ConfigProvider, e);
  r.set(i.Clock, new i.Clock());
  r.set(o.BuildInfo, new o.BuildInfo());
  (function (e) {
    e.set(w.RuntimeMode, w.RuntimeMode.fromEnvironment(false));
    e.set(f.LogVerbose, new f.LogVerbose(w.isVerboseLoggingEnabled(e)));
    e.set(f.LogTarget, new f.ConsoleLog(console));
  })(r);
  exports.logger.debug(r, "Initializing main context");
  r.set(n.CopilotTokenNotifier, new n.CopilotTokenNotifier());
  r.set(g.RootCertificateReader, g.getRootCertificateReader(r));
  r.set(y.Fetcher, new m.HelixFetcher(r));
  r.set(d.GhostTextDebounceManager, new d.GhostTextDebounceManager());
  r.set(h.LanguageDetection, h.getLanguageDetection());
  r.set(c.Features, new c.Features(r));
  r.set(_.PostInsertionNotifier, new _.PostInsertionNotifier());
  r.set(b.TelemetryUserConfig, new b.TelemetryUserConfig(r));
  r.set(b.TelemetryEndpointUrl, new b.TelemetryEndpointUrl());
  r.set(b.TelemetryReporters, new b.TelemetryReporters());
  r.set(p.HeaderContributors, new p.HeaderContributors());
  r.set(a.UserErrorNotifier, new a.UserErrorNotifier());
  r.set(u.ContextualFilterManager, new u.ContextualFilterManager());
  r.set(v.OpenAIFetcher, new v.LiveOpenAIFetcher());
  r.set(o.BlockModeConfig, new o.ConfigBlockModeConfig());
  r.set(C.UrlOpener, new C.RealUrlOpener());
  r.set(l.ExpConfigMaker, new l.ExpConfigNone());
  return r;
};
exports.logger = new f.Logger(f.LogLevel.DEBUG, "context");