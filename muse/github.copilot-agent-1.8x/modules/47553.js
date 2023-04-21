Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getEngineURL =
  exports.TEST_ENGINE_PATHS =
  exports.OPENAI_PROXY_HOST =
    undefined;
const n = require(39800);
const i = require(16905);
const o = require(20913);
exports.OPENAI_PROXY_HOST = "https://copilot-proxy.githubusercontent.com";
const s = "/v1/engines/copilot-codex";
exports.TEST_ENGINE_PATHS = [s];
exports.getEngineURL = async function (e, r = "", a, c = "", l = "", u) {
  return (function (e, r) {
    let i = (function (e) {
      return o.isRunningInTest(e)
        ? n.getConfig(e, n.ConfigKey.DebugTestOverrideProxyUrl)
        : n.getConfig(e, n.ConfigKey.DebugOverrideProxyUrl);
    })(e);
    if (0 == i.length) {
      i = exports.OPENAI_PROXY_HOST;
    }
    return `${i}${r}`;
  })(
    e,
    await (async function (e, t, r, o, a, c) {
      const l = n.getConfig(e, n.ConfigKey.DebugOverrideEngine);
      if (l) return `/v1/engines/${l}`;
      const u = await e.get(i.Features).customEngine(t, r, o, a, c);
      return "" !== u ? `/v1/engines/${u}` : s;
    })(e, r, a, c, l, u)
  );
};