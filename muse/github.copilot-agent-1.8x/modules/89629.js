Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.handleSetEditorInfo = undefined;
const n = require(892);
const i = require(86236);
const o = require(39800);
const s = require(81843);
const a = require(5381);
const c = require(94340);
const l = n.Type.Object({
  name: n.Type.String(),
  version: n.Type.String(),
});
const u = n.Type.Object({
  editorInfo: l,
  editorPluginInfo: l,
  editorConfiguration: n.Type.Optional(c.EditorConfigurationSettings),
  networkProxy: n.Type.Optional(c.NetworkProxy),
  options: n.Type.Optional(n.Type.Object({})),
});
const d = new i.default().compile(n.Type.Strict(u));
exports.handleSetEditorInfo = async function (e, t, r) {
  if (!d(r)) {
    const e = a.extractAjvErrors(d.errors);
    return [
      null,
      {
        code: a.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  e.get(o.EditorAndPluginInfo).setEditorAndPluginInfo(
    r.editorInfo,
    r.editorPluginInfo
  );
  if (r.editorConfiguration) {
    c.applySettingsToConfiguration(e, r.editorConfiguration);
  }
  if (r.networkProxy) {
    c.applyNetworkProxyConfiguration(e, r.networkProxy);
  }
  s.initializeLateDependencies(e);
  return ["OK", null];
};