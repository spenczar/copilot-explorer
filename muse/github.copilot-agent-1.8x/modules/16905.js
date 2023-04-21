Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.Features = exports.Task = undefined;
const n = require(44617);
const i = require(32137);
const o = require(70140);
const s = require(39800);
const a = require(80187);
const c = require(29975);
const l = require(54604);
const u = require(75917);
const d = require(66046);
const p = require(22249);
const h = require(68495);
class f {
  constructor(e) {
    this.ctx = e;
    this.cache = new o.LRUCache(200);
  }
  async fetchExpConfig(e) {
    let t = this.cache.get(e.stringify());
    if (t) {
      t = new Task(
        () =>
          this.ctx
            .get(d.ExpConfigMaker)
            .fetchExperiments(this.ctx, e.toHeaders()),
        36e5
      );
      this.cache.put(e.stringify(), t);
    }
    return t.run();
  }
  getCachedExpConfig(e) {
    return this.cache.get(e.stringify())?.value();
  }
}
class Task {
  constructor(e, t = 1 / 0) {
    this.producer = e;
    this.expirationMs = t;
  }
  async run() {
    if (undefined === this.promise) {
      this.promise = this.producer();
      this.storeResult(this.promise).then(() => {
        if (this.expirationMs < 1 / 0 && undefined !== this.promise) {
          setTimeout(() => (this.promise = undefined), this.expirationMs);
        }
      });
    }
    return this.promise;
  }
  async storeResult(e) {
    try {
      this.result = await e;
    } finally {
      if (undefined === this.result) {
        this.promise = undefined;
      }
    }
  }
  value() {
    return this.result;
  }
}
exports.Task = Task;
class Features {
  constructor(e) {
    this.ctx = e;
    this.staticFilters = {};
    this.dynamicFilters = {};
    this.upcomingDynamicFilters = {};
    this.assignments = new f(this.ctx);
    this.granularityDirectory = new h.GranularityDirectory(
      "unspecified",
      e.get(i.Clock)
    );
  }
  setPrefix(e) {
    this.granularityDirectory = new h.GranularityDirectory(
      e,
      this.ctx.get(i.Clock)
    );
  }
  registerStaticFilters(e) {
    Object.assign(this.staticFilters, e);
  }
  registerDynamicFilter(e, t) {
    this.dynamicFilters[e] = t;
  }
  getDynamicFilterValues() {
    const e = {};
    for (const [t, r] of Object.entries(this.dynamicFilters)) e[t] = r();
    return e;
  }
  registerUpcomingDynamicFilter(e, t) {
    this.upcomingDynamicFilters[e] = t;
  }
  async getAssignment(e, t = {}, r) {
    const n = this.makeFilterSettings(t);
    const i = this.granularityDirectory.extendFilters(n);
    const o = await this.getExpConfig(i.newFilterSettings);
    this.granularityDirectory.update(
      n,
      +(o.variables[u.ExpTreatmentVariables.GranularityByCallBuckets] ?? NaN),
      +(
        o.variables[u.ExpTreatmentVariables.GranularityTimePeriodSizeInH] ?? NaN
      )
    );
    const s = this.granularityDirectory.extendFilters(n);
    const a = s.newFilterSettings;
    const c = await this.getExpConfig(a);
    let l = new Promise((e) =>
      setTimeout(e, Features.upcomingDynamicFilterCheckDelayMs)
    );
    for (const e of s.otherFilterSettingsToPrefetch)
      l = l.then(async () => {
        await new Promise((e) =>
          setTimeout(e, Features.upcomingDynamicFilterCheckDelayMs)
        );
        this.getExpConfig(e);
      });
    this.prepareForUpcomingFilters(a);
    if (r) {
      r.filtersAndExp = {
        exp: c,
        filters: a,
      };
    }
    return c.variables[e];
  }
  makeFilterSettings(e) {
    return new p.FilterSettings({
      ...this.staticFilters,
      ...this.getDynamicFilterValues(),
      ...e,
    });
  }
  async getExpConfig(e) {
    try {
      return this.assignments.fetchExpConfig(e);
    } catch (e) {
      return u.ExpConfig.createFallbackConfig(
        this.ctx,
        `Error fetching ExP config: ${e}`
      );
    }
  }
  async prepareForUpcomingFilters(e) {
    if (!(new Date().getMinutes() < 60 - Features.upcomingTimeBucketMinutes))
      for (const [t, r] of Object.entries(this.upcomingDynamicFilters)) {
        await new Promise((e) =>
          setTimeout(e, Features.upcomingDynamicFilterCheckDelayMs)
        );
        this.getExpConfig(e.withChange(t, r()));
      }
  }
  stringify() {
    const e = this.assignments.getCachedExpConfig(new p.FilterSettings({}));
    return JSON.stringify(e?.variables ?? {});
  }
  async customEngine(e, t, r, n, i) {
    const o = {
      [p.Filter.CopilotRepository]: e,
      [p.Filter.CopilotFileType]: t,
      [p.Filter.CopilotDogfood]: r,
      [p.Filter.CopilotUserKind]: n,
    };
    return (
      (await this.getAssignment(u.ExpTreatmentVariables.CustomEngine, o, i)) ??
      ""
    );
  }
  async beforeRequestWaitMs(e, t, r, n, i) {
    const o = {
      [p.Filter.CopilotRepository]: e,
      [p.Filter.CopilotFileType]: t,
      [p.Filter.CopilotUserKind]: r,
      [p.Filter.CopilotDogfood]: n,
    };
    return (
      (await this.getAssignment(
        u.ExpTreatmentVariables.BeforeRequestWaitMs,
        o,
        i
      )) ?? 0
    );
  }
  async multiLogitBias(e, t, r, n, i) {
    const o = {
      [p.Filter.CopilotRepository]: e,
      [p.Filter.CopilotFileType]: t,
      [p.Filter.CopilotUserKind]: r,
      [p.Filter.CopilotDogfood]: n,
    };
    return (
      (await this.getAssignment(
        u.ExpTreatmentVariables.MultiLogitBias,
        o,
        i
      )) ?? false
    );
  }
  async debounceMs() {
    return (await this.getAssignment(u.ExpTreatmentVariables.DebounceMs)) ?? 0;
  }
  async debouncePredict() {
    return (
      (await this.getAssignment(u.ExpTreatmentVariables.DebouncePredict)) ??
      false
    );
  }
  async contextualFilterEnable() {
    return (
      (await this.getAssignment(
        u.ExpTreatmentVariables.ContextualFilterEnable
      )) ?? true
    );
  }
  async contextualFilterEnableTree() {
    return (
      (await this.getAssignment(
        u.ExpTreatmentVariables.ContextualFilterEnableTree
      )) ?? true
    );
  }
  async contextualFilterAcceptThreshold() {
    return (
      (await this.getAssignment(
        u.ExpTreatmentVariables.ContextualFilterAcceptThreshold
      )) ?? a.contextualFilterAcceptThreshold
    );
  }
  async contextualFilterExplorationTraffic() {
    return (
      (await this.getAssignment(
        u.ExpTreatmentVariables.ContextualFilterExplorationTraffic
      )) ?? a.contextualFilterExplorationTraffic
    );
  }
  async disableLogProb() {
    return (
      (await this.getAssignment(u.ExpTreatmentVariables.disableLogProb)) ?? true
    );
  }
  async indentationMinLength(e, t, r, n) {
    const i = {
      [p.Filter.CopilotRepository]: e,
      [p.Filter.CopilotFileType]: t,
      [p.Filter.CopilotDogfood]: r,
      [p.Filter.CopilotUserKind]: n,
    };
    return (
      (await this.getAssignment(
        u.ExpTreatmentVariables.IndentationMinLength,
        i
      )) ?? undefined
    );
  }
  async indentationMaxLength(e, t, r, n) {
    const i = {
      [p.Filter.CopilotRepository]: e,
      [p.Filter.CopilotFileType]: t,
      [p.Filter.CopilotDogfood]: r,
      [p.Filter.CopilotUserKind]: n,
    };
    return (
      (await this.getAssignment(
        u.ExpTreatmentVariables.IndentationMaxLength,
        i
      )) ?? undefined
    );
  }
  async overrideBlockMode() {
    return await this.getAssignment(u.ExpTreatmentVariables.OverrideBlockMode);
  }
  async overrideNumGhostCompletions() {
    return await this.getAssignment(
      u.ExpTreatmentVariables.OverrideNumGhostCompletions
    );
  }
  async suffixPercent(e, t, r, n) {
    const i = {
      [p.Filter.CopilotRepository]: e,
      [p.Filter.CopilotFileType]: t,
      [p.Filter.CopilotUserKind]: r,
      [p.Filter.CopilotDogfood]: n,
    };
    return s.getConfig(this.ctx, s.ConfigKey.DebugOverrideEngine)
      ? 0
      : (await this.getAssignment(u.ExpTreatmentVariables.SuffixPercent, i)) ??
          15;
  }
  async suffixMatchThreshold(e, t, r, n) {
    const i = {
      [p.Filter.CopilotRepository]: e,
      [p.Filter.CopilotFileType]: t,
      [p.Filter.CopilotUserKind]: r,
      [p.Filter.CopilotDogfood]: n,
    };
    return (
      (await this.getAssignment(
        u.ExpTreatmentVariables.SuffixMatchThreshold,
        i
      )) ?? 10
    );
  }
  async fimSuffixLengthThreshold(e, t, r, n) {
    const i = {
      [p.Filter.CopilotRepository]: e,
      [p.Filter.CopilotFileType]: t,
      [p.Filter.CopilotUserKind]: r,
      [p.Filter.CopilotDogfood]: n,
    };
    return (
      (await this.getAssignment(
        u.ExpTreatmentVariables.FimSuffixLengthThreshold,
        i
      )) ?? 0
    );
  }
  async suffixStartMode(e, t, r, i) {
    const o = {
      [p.Filter.CopilotRepository]: e,
      [p.Filter.CopilotFileType]: t,
      [p.Filter.CopilotUserKind]: r,
      [p.Filter.CopilotDogfood]: i,
    };
    switch (
      await this.getAssignment(u.ExpTreatmentVariables.SuffixStartMode, o)
    ) {
      case "cursor":
        return n.SuffixStartMode.Cursor;
      case "cursortrimstart":
      default:
        return n.SuffixStartMode.CursorTrimStart;
      case "siblingblock":
        return n.SuffixStartMode.SiblingBlock;
      case "siblingblocktrimstart":
        return n.SuffixStartMode.SiblingBlockTrimStart;
    }
  }
  async tokenizerName(e, t) {
    const r = {
      [p.Filter.CopilotRepository]: e,
      [p.Filter.CopilotUserKind]: t,
    };
    switch (
      await this.getAssignment(u.ExpTreatmentVariables.TokenizerName, r)
    ) {
      case "cushman001":
        return n.TokenizerName.cushman001;
      case "cushman002":
      default:
        return n.TokenizerName.cushman002;
      case "mock":
        return n.TokenizerName.mock;
    }
  }
  async neighboringTabsOption(e, t, r, i) {
    const o = {
      [p.Filter.CopilotRepository]: e,
      [p.Filter.CopilotFileType]: t,
      [p.Filter.CopilotUserKind]: r,
      [p.Filter.CopilotDogfood]: i,
    };
    switch (
      await this.getAssignment(u.ExpTreatmentVariables.NeighboringTabsOption, o)
    ) {
      case "none":
        return n.NeighboringTabsOption.None;
      case "conservative":
        return n.NeighboringTabsOption.Conservative;
      case "medium":
        return n.NeighboringTabsOption.Medium;
      case "eager":
      default:
        return n.NeighboringTabsOption.Eager;
      case "eagerbutlittle":
        return n.NeighboringTabsOption.EagerButLittle;
      case "eagerbutmedium":
        return n.NeighboringTabsOption.EagerButMedium;
    }
  }
  async neighboringSnippetTypes(e, t, r, i) {
    const o = {
      [p.Filter.CopilotRepository]: e,
      [p.Filter.CopilotFileType]: t,
      [p.Filter.CopilotUserKind]: r,
      [p.Filter.CopilotDogfood]: i,
    };
    return "function" ===
      (await this.getAssignment(
        u.ExpTreatmentVariables.NeighboringSnippetTypes,
        o
      ))
      ? n.NeighboringSnippetType.NeighboringFunctions
      : n.NeighboringSnippetType.NeighboringSnippets;
  }
  async repetitionFilterMode() {
    switch (
      await this.getAssignment(u.ExpTreatmentVariables.RepetitionFilterMode)
    ) {
      case "proxy":
        return l.RepetitionFilterMode.PROXY;
      case "both":
        return l.RepetitionFilterMode.BOTH;
      default:
        return l.RepetitionFilterMode.CLIENT;
    }
  }
  async dropCompletionReasons() {
    const e = await this.getAssignment(
      u.ExpTreatmentVariables.DropCompletionReasons
    );
    if (e) return e.split(",");
  }
  async openFileStrategy(e, t, r) {
    const n = {
      [p.Filter.CopilotRepository]: e,
      [p.Filter.CopilotUserKind]: t,
      [p.Filter.CopilotFileType]: r,
    };
    return (
      (await this.getAssignment(u.ExpTreatmentVariables.OpenFileStrategy, n)) ??
      true
    );
  }
  async cursorHistoryStrategy(e, t, r) {
    const n = {
      [p.Filter.CopilotRepository]: e,
      [p.Filter.CopilotUserKind]: t,
      [p.Filter.CopilotFileType]: r,
    };
    switch (
      await this.getAssignment(u.ExpTreatmentVariables.CursorHistoryStrategy, n)
    ) {
      case "mostrecent":
        return c.CursorHistoryStrategy.MostRecent;
      case "mostcount":
        return c.CursorHistoryStrategy.MostCount;
      case "beforecurrentfile":
        return c.CursorHistoryStrategy.BeforeCurrentFile;
      default:
        return c.CursorHistoryStrategy.None;
    }
  }
  async addExpAndFilterToTelemetry(e) {
    const t = this.makeFilterSettings({});
    e.filtersAndExp = {
      filters: t,
      exp: await this.getExpConfig(t),
    };
  }
}
exports.Features = Features;
Features.upcomingDynamicFilterCheckDelayMs = 20;
Features.upcomingTimeBucketMinutes = 5 + Math.floor(11 * Math.random());