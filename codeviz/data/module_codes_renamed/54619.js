Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getDebounceLimit = exports.GhostTextDebounceManager = undefined;
const M_ExperimentCacheManager_maybe = require("ExperimentCacheManager");
class GhostTextDebounceManager {
  constructor(e) {
    this.forceDelayMs = e;
    this.extraDebounceMs = 0;
  }
}
exports.GhostTextDebounceManager = GhostTextDebounceManager;
exports.getDebounceLimit = async function (e, t) {
  let r;
  if (
    (await e.get(M_ExperimentCacheManager_maybe.Features).debouncePredict()) &&
    t.measurements.contextualFilterScore
  ) {
    const e = t.measurements.contextualFilterScore;
    const n = 0.3475;
    const i = 7;
    r = 25 + 250 / (1 + Math.pow(e / n, i));
  } else r = await e.get(M_ExperimentCacheManager_maybe.Features).debounceMs();
  return (r > 0 ? r : 75) + e.get(GhostTextDebounceManager).extraDebounceMs;
};
