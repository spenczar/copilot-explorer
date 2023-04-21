Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.AgentEditorInfo = exports.AgentConfigProvider = undefined;
const n = require(39800);
class AgentConfigProvider extends n.InMemoryConfigProvider {
  constructor() {
    super(new n.DefaultsOnlyConfigProvider(), new Map());
  }
  getOptionalConfig(e) {
    if (
      !Array.isArray(e) ||
      "editor" != e[0] ||
      this.isDefaultSettingOverwritten(e)
    )
      return super.getConfig(e);
  }
}
exports.AgentConfigProvider = AgentConfigProvider;
class AgentEditorInfo extends n.EditorAndPluginInfo {
  setEditorAndPluginInfo(e, t) {
    this._editorInfo = e;
    this._editorPluginInfo = t;
  }
  getEditorInfo(e) {
    return this._editorInfo
      ? this._editorInfo
      : {
          name: "unknown-editor",
          version: "0",
        };
  }
  getEditorPluginInfo(e) {
    return this._editorPluginInfo
      ? this._editorPluginInfo
      : {
          name: "unknown-editor-plugin",
          version: "0",
        };
  }
}
exports.AgentEditorInfo = AgentEditorInfo;