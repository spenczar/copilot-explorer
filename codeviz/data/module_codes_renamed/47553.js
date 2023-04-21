Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getEngineURL =
  exports.TEST_ENGINE_PATHS =
  exports.OPENAI_PROXY_HOST =
    undefined;
const M_editor_config_constants_maybe = require("editor-config-constants");
const M_ExperimentCacheManager_maybe = require("ExperimentCacheManager");
const M_RuntimeModeManager_maybe = require("RuntimeModeManager");
exports.OPENAI_PROXY_HOST = "https://copilot-proxy.githubusercontent.com";
const s = "/v1/engines/copilot-codex";
exports.TEST_ENGINE_PATHS = [s];
exports.getEngineURL = async function (e, r = "", a, c = "", l = "", u) {
  return (function (e, r) {
    let i = (function (e) {
      return M_RuntimeModeManager_maybe.isRunningInTest(e)
        ? M_editor_config_constants_maybe.getConfig(
            e,
            M_editor_config_constants_maybe.ConfigKey.DebugTestOverrideProxyUrl
          )
        : M_editor_config_constants_maybe.getConfig(
            e,
            M_editor_config_constants_maybe.ConfigKey.DebugOverrideProxyUrl
          );
    })(e);
    if (0 == i.length) {
      i = exports.OPENAI_PROXY_HOST;
    }
    return `${i}${r}`;
  })(
    e,
    await (async function (e, t, r, o, a, c) {
      const l = M_editor_config_constants_maybe.getConfig(
        e,
        M_editor_config_constants_maybe.ConfigKey.DebugOverrideEngine
      );
      if (l) return `/v1/engines/${l}`;
      const u = await e
        .get(M_ExperimentCacheManager_maybe.Features)
        .customEngine(t, r, o, a, c);
      return "" !== u ? `/v1/engines/${u}` : s;
    })(e, r, a, c, l, u)
  );
};
