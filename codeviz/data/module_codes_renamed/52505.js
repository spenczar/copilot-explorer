Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.TimeBucketGranularity =
  exports.DEFAULT_GRANULARITY =
  exports.GranularityImplementation =
    undefined;
class GranularityImplementation {
  getCurrentAndUpComingValues(e) {
    return [this.getValue(e), this.getUpcomingValues(e)];
  }
  constructor(e) {
    this.prefix = e;
  }
}
exports.GranularityImplementation = GranularityImplementation;
class n extends GranularityImplementation {
  getValue(e) {
    return this.prefix;
  }
  getUpcomingValues(e) {
    return [];
  }
}
exports.DEFAULT_GRANULARITY = (e) => new n(e);
exports.TimeBucketGranularity = class extends GranularityImplementation {
  constructor(e, t = 0.5, r = new Date().setUTCHours(0, 0, 0, 0)) {
    super(e);
    this.prefix = e;
    this.fetchBeforeFactor = t;
    this.anchor = r;
  }
  setTimePeriod(e) {
    if (isNaN(e)) {
      this.timePeriodLengthMs = undefined;
    } else {
      this.timePeriodLengthMs = e;
    }
  }
  setByCallBuckets(e) {
    if (isNaN(e)) {
      this.numByCallBuckets = undefined;
    } else {
      this.numByCallBuckets = e;
    }
  }
  getValue(e) {
    return (
      this.prefix +
      this.getTimePeriodBucketString(e) +
      (this.numByCallBuckets ? this.timeHash(e) : "")
    );
  }
  getTimePeriodBucketString(e) {
    return this.timePeriodLengthMs ? this.dateToTimePartString(e) : "";
  }
  getUpcomingValues(e) {
    const t = [];
    const r = this.getUpcomingTimePeriodBucketStrings(e);
    const n = this.getUpcomingByCallBucketStrings();
    for (const e of r) for (const r of n) t.push(this.prefix + e + r);
    return t;
  }
  getUpcomingTimePeriodBucketStrings(e) {
    if (undefined === this.timePeriodLengthMs) return [""];
    if (
      (e.getTime() - this.anchor) % this.timePeriodLengthMs <
      this.fetchBeforeFactor * this.timePeriodLengthMs
    )
      return [this.getTimePeriodBucketString(e)];
    {
      const t = new Date(e.getTime() + this.timePeriodLengthMs);
      return [
        this.getTimePeriodBucketString(e),
        this.getTimePeriodBucketString(t),
      ];
    }
  }
  getUpcomingByCallBucketStrings() {
    return undefined === this.numByCallBuckets
      ? [""]
      : Array.from(Array(this.numByCallBuckets).keys()).map((e) =>
          e.toString()
        );
  }
  timeHash(e) {
    return null == this.numByCallBuckets
      ? 0
      : ((e.getTime() % this.numByCallBuckets) * 7883) % this.numByCallBuckets;
  }
  dateToTimePartString(e) {
    return null == this.timePeriodLengthMs
      ? ""
      : Math.floor(
          (e.getTime() - this.anchor) / this.timePeriodLengthMs
        ).toString();
  }
};
