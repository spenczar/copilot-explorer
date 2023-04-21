Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.applyNetworkProxyConfiguration =
  exports.applySettingsToConfiguration =
  exports.notifyChangeConfiguration =
  exports.EditorConfigurationSettings =
  exports.NetworkProxy =
    undefined;
const n = require(892);
const i = require(86236);
const o = require(39800);
const s = require(20039);
const a = require(5381);
const c = require(6159);
const l = require(56056);
exports.NetworkProxy = n.Type.Object({
  host: n.Type.String(),
  port: n.Type.Number(),
  username: n.Type.Optional(n.Type.String()),
  password: n.Type.Optional(n.Type.String()),
  rejectUnauthorized: n.Type.Optional(n.Type.Boolean()),
});
exports.EditorConfigurationSettings = n.Type.Object({
  showEditorCompletions: n.Type.Optional(n.Type.Boolean()),
  enableAutoCompletions: n.Type.Optional(n.Type.Boolean()),
  delayCompletions: n.Type.Optional(n.Type.Boolean()),
  filterCompletions: n.Type.Optional(n.Type.Boolean()),
  disabledLanguages: n.Type.Optional(
    n.Type.Array(
      n.Type.Object({
        languageId: n.Type.String(),
      })
    )
  ),
});
const u = n.Type.Object({
  settings: n.Type.Optional(exports.EditorConfigurationSettings),
  networkProxy: n.Type.Optional(
    n.Type.Union([exports.NetworkProxy, n.Type.Null()])
  ),
  options: n.Type.Optional(l.TestingOptions),
});
const d = new i.default().compile(n.Type.Strict(u));
function applySettingsToConfiguration(e, t) {
  const r = e.get(o.ConfigProvider);
  r.setConfig(o.ConfigKey.ShowEditorCompletions, t.showEditorCompletions);
  r.setConfig(o.ConfigKey.DelayCompletions, t.delayCompletions);
  r.setConfig(o.ConfigKey.EnableAutoCompletions, t.enableAutoCompletions);
  r.setConfig(o.ConfigKey.FilterCompletions, t.filterCompletions);
  if (t.disabledLanguages)
    for (const e of t.disabledLanguages)
      r.setLanguageEnablement(e.languageId, !1);
}
function applyNetworkProxyConfiguration(e, t) {
  if (!t) return void (e.get(s.Fetcher).proxySettings = undefined);
  let r;
  if (t.username) {
    r = t.password ? t.username + ":" + t.password : t.username;
  }
  const n = r ? r + "@" : "";
  process.env.http_proxy = `http://${n}${t.host}:${t.port}`;
  process.env.https_proxy = `http://${n}${t.host}:${t.port}`;
  e.get(s.Fetcher).proxySettings = {
    host: t.host,
    port: t.port,
    proxyAuth: r,
    rejectUnauthorized: t.rejectUnauthorized ?? true,
    headers: {},
  };
}
exports.notifyChangeConfiguration = function (e, t) {
  if (!d(t)) {
    const e = a.extractAjvErrors(d.errors);
    throw new Error(`Invalid params: ${e.join(", ")}`);
  }
  if (undefined !== t.options?.testingCtx) {
    e = c.getTestingContext(t.options.testingCtx);
  }
  if (t.settings) {
    applySettingsToConfiguration(e, t.settings);
  }
  if (undefined !== t.networkProxy) {
    applyNetworkProxyConfiguration(e, t.networkProxy);
  }
};
exports.applySettingsToConfiguration = applySettingsToConfiguration;
exports.applyNetworkProxyConfiguration = applyNetworkProxyConfiguration;