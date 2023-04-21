Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.handleSetEditorInfo = undefined;
const M_TypeBox_maybe = require("TypeBox");
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_editor_config_constants_maybe = require("editor-config-constants");
const M_AgentContextFactory_maybe = require("AgentContextFactory");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const M_EditorConfigurationManager_maybe = require("EditorConfigurationManager");
const l = M_TypeBox_maybe.Type.Object({
  name: M_TypeBox_maybe.Type.String(),
  version: M_TypeBox_maybe.Type.String(),
});
const u = M_TypeBox_maybe.Type.Object({
  editorInfo: l,
  editorPluginInfo: l,
  editorConfiguration: M_TypeBox_maybe.Type.Optional(
    M_EditorConfigurationManager_maybe.EditorConfigurationSettings
  ),
  networkProxy: M_TypeBox_maybe.Type.Optional(
    M_EditorConfigurationManager_maybe.NetworkProxy
  ),
  options: M_TypeBox_maybe.Type.Optional(M_TypeBox_maybe.Type.Object({})),
});
const d = new M_schema_code_generator_maybe.default().compile(
  M_TypeBox_maybe.Type.Strict(u)
);
exports.handleSetEditorInfo = async function (e, t, r) {
  if (!d(r)) {
    const e = M_AjvErrorManager_maybe.extractAjvErrors(d.errors);
    return [
      null,
      {
        code: M_AjvErrorManager_maybe.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  e.get(
    M_editor_config_constants_maybe.EditorAndPluginInfo
  ).setEditorAndPluginInfo(r.editorInfo, r.editorPluginInfo);
  if (r.editorConfiguration) {
    M_EditorConfigurationManager_maybe.applySettingsToConfiguration(
      e,
      r.editorConfiguration
    );
  }
  if (r.networkProxy) {
    M_EditorConfigurationManager_maybe.applyNetworkProxyConfiguration(
      e,
      r.networkProxy
    );
  }
  M_AgentContextFactory_maybe.initializeLateDependencies(e);
  return ["OK", null];
};
