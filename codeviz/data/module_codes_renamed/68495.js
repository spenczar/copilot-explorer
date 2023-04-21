Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.GranularityDirectory = undefined;
const M_contextual_filter_manager_maybe = require("contextual-filter-manager");
const M_TimeBucketGranularityManager_maybe = require("TimeBucketGranularityManager");
const o = M_contextual_filter_manager_maybe.Filter.CopilotClientTimeBucket;
exports.GranularityDirectory = class {
  constructor(e, t) {
    this.specs = new Map();
    this.prefix = e;
    this.clock = t;
    this.defaultGranularity =
      M_TimeBucketGranularityManager_maybe.DEFAULT_GRANULARITY(e);
  }
  selectGranularity(e) {
    for (const [t, r] of this.specs.entries()) if (e.extends(t)) return r;
    return this.defaultGranularity;
  }
  update(e, t, r) {
    t = t > 1 ? t : NaN;
    r = r > 0 ? r : NaN;
    if (isNaN(t) && isNaN(r)) this.specs.delete(e);
    else {
      const n = new M_TimeBucketGranularityManager_maybe.TimeBucketGranularity(
        this.prefix
      );
      isNaN(t) || n.setByCallBuckets(t),
        isNaN(r) || n.setTimePeriod(3600 * r * 1e3),
        this.specs.set(e, n);
    }
  }
  extendFilters(e) {
    const t = this.selectGranularity(e);
    const [r, n] = t.getCurrentAndUpComingValues(this.clock.now());
    return {
      newFilterSettings: e.withChange(o, r),
      otherFilterSettingsToPrefetch: n.map((t) => e.withChange(o, t)),
    };
  }
};
