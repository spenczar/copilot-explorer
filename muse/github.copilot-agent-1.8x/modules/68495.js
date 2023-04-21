Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.GranularityDirectory = undefined;
const n = require(22249);
const i = require(52505);
const o = n.Filter.CopilotClientTimeBucket;
exports.GranularityDirectory = class {
  constructor(e, t) {
    this.specs = new Map();
    this.prefix = e;
    this.clock = t;
    this.defaultGranularity = i.DEFAULT_GRANULARITY(e);
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
      const n = new i.TimeBucketGranularity(this.prefix);
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