Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.applyNetworkProxyConfiguration =
  exports.applySettingsToConfiguration =
  exports.notifyChangeConfiguration =
  exports.EditorConfigurationSettings =
  exports.NetworkProxy =
    undefined;
const M_TypeBox_maybe = require("TypeBox");
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_editor_config_constants_maybe = require("editor-config-constants");
const M_FetcherRequestManager_maybe = require("FetcherRequestManager");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const M_TestContextManager_maybe = require("TestContextManager");
const M_TestingOptionsManager_maybe = require("TestingOptionsManager");
exports.NetworkProxy = M_TypeBox_maybe.Type.Object({
  host: M_TypeBox_maybe.Type.String(),
  port: M_TypeBox_maybe.Type.Number(),
  username: M_TypeBox_maybe.Type.Optional(M_TypeBox_maybe.Type.String()),
  password: M_TypeBox_maybe.Type.Optional(M_TypeBox_maybe.Type.String()),
  rejectUnauthorized: M_TypeBox_maybe.Type.Optional(
    M_TypeBox_maybe.Type.Boolean()
  ),
});
exports.EditorConfigurationSettings = M_TypeBox_maybe.Type.Object({
  showEditorCompletions: M_TypeBox_maybe.Type.Optional(
    M_TypeBox_maybe.Type.Boolean()
  ),
  enableAutoCompletions: M_TypeBox_maybe.Type.Optional(
    M_TypeBox_maybe.Type.Boolean()
  ),
  delayCompletions: M_TypeBox_maybe.Type.Optional(
    M_TypeBox_maybe.Type.Boolean()
  ),
  filterCompletions: M_TypeBox_maybe.Type.Optional(
    M_TypeBox_maybe.Type.Boolean()
  ),
  disabledLanguages: M_TypeBox_maybe.Type.Optional(
    M_TypeBox_maybe.Type.Array(
      M_TypeBox_maybe.Type.Object({
        languageId: M_TypeBox_maybe.Type.String(),
      })
    )
  ),
});
const u = M_TypeBox_maybe.Type.Object({
  settings: M_TypeBox_maybe.Type.Optional(exports.EditorConfigurationSettings),
  networkProxy: M_TypeBox_maybe.Type.Optional(
    M_TypeBox_maybe.Type.Union([
      exports.NetworkProxy,
      M_TypeBox_maybe.Type.Null(),
    ])
  ),
  options: M_TypeBox_maybe.Type.Optional(
    M_TestingOptionsManager_maybe.TestingOptions
  ),
});
const d = new M_schema_code_generator_maybe.default().compile(
  M_TypeBox_maybe.Type.Strict(u)
);
function applySettingsToConfiguration(e, t) {
  const r = e.get(M_editor_config_constants_maybe.ConfigProvider);
  r.setConfig(
    M_editor_config_constants_maybe.ConfigKey.ShowEditorCompletions,
    t.showEditorCompletions
  );
  r.setConfig(
    M_editor_config_constants_maybe.ConfigKey.DelayCompletions,
    t.delayCompletions
  );
  r.setConfig(
    M_editor_config_constants_maybe.ConfigKey.EnableAutoCompletions,
    t.enableAutoCompletions
  );
  r.setConfig(
    M_editor_config_constants_maybe.ConfigKey.FilterCompletions,
    t.filterCompletions
  );
  if (t.disabledLanguages)
    for (const e of t.disabledLanguages)
      r.setLanguageEnablement(e.languageId, !1);
}
function applyNetworkProxyConfiguration(e, t) {
  if (!t)
    return void (e.get(M_FetcherRequestManager_maybe.Fetcher).proxySettings =
      undefined);
  let r;
  if (t.username) {
    r = t.password ? t.username + ":" + t.password : t.username;
  }
  const n = r ? r + "@" : "";
  process.env.http_proxy = `http://${n}${t.host}:${t.port}`;
  process.env.https_proxy = `http://${n}${t.host}:${t.port}`;
  e.get(M_FetcherRequestManager_maybe.Fetcher).proxySettings = {
    host: t.host,
    port: t.port,
    proxyAuth: r,
    rejectUnauthorized: t.rejectUnauthorized ?? true,
    headers: {},
  };
}
exports.notifyChangeConfiguration = function (e, t) {
  if (!d(t)) {
    const e = M_AjvErrorManager_maybe.extractAjvErrors(d.errors);
    throw new Error(`Invalid params: ${e.join(", ")}`);
  }
  if (undefined !== t.options?.testingCtx) {
    e = M_TestContextManager_maybe.getTestingContext(t.options.testingCtx);
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
