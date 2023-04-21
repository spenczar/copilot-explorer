Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.Features = exports.Task = undefined;
const M_TreeNodeUtils_maybe = require("TreeNodeUtils");
const M_ClockModule_maybe = require("ClockModule");
const M_LRUCacheManager_maybe = require("LRUCacheManager");
const M_editor_config_constants_maybe = require("editor-config-constants");
const M_contextual_filter_constants_maybe = require("contextual-filter-constants");
const M_NeighborFileManager_maybe = require("NeighborFileManager");
const M_RepetitionFilterManager_maybe = require("RepetitionFilterManager");
const M_Experiment_Configuration_Manager_maybe = require("Experiment-Configuration-Manager");
const M_ExpConfigManager_maybe = require("ExpConfigManager");
const M_contextual_filter_manager_maybe = require("contextual-filter-manager");
const M_GranularityDirectoryManager_maybe = require("GranularityDirectoryManager");
class f {
  constructor(e) {
    this.ctx = e;
    this.cache = new M_LRUCacheManager_maybe.LRUCache(200);
  }
  async fetchExpConfig(e) {
    let t = this.cache.get(e.stringify());
    if (t) {
      t = new Task(
        () =>
          this.ctx
            .get(M_ExpConfigManager_maybe.ExpConfigMaker)
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
    this.granularityDirectory =
      new M_GranularityDirectoryManager_maybe.GranularityDirectory(
        "unspecified",
        e.get(M_ClockModule_maybe.Clock)
      );
  }
  setPrefix(e) {
    this.granularityDirectory =
      new M_GranularityDirectoryManager_maybe.GranularityDirectory(
        e,
        this.ctx.get(M_ClockModule_maybe.Clock)
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
      +(
        o.variables[
          M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
            .GranularityByCallBuckets
        ] ?? NaN
      ),
      +(
        o.variables[
          M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
            .GranularityTimePeriodSizeInH
        ] ?? NaN
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
    return new M_contextual_filter_manager_maybe.FilterSettings({
      ...this.staticFilters,
      ...this.getDynamicFilterValues(),
      ...e,
    });
  }
  async getExpConfig(e) {
    try {
      return this.assignments.fetchExpConfig(e);
    } catch (e) {
      return M_Experiment_Configuration_Manager_maybe.ExpConfig.createFallbackConfig(
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
    const e = this.assignments.getCachedExpConfig(
      new M_contextual_filter_manager_maybe.FilterSettings({})
    );
    return JSON.stringify(e?.variables ?? {});
  }
  async customEngine(e, t, r, n, i) {
    const o = {
      [M_contextual_filter_manager_maybe.Filter.CopilotRepository]: e,
      [M_contextual_filter_manager_maybe.Filter.CopilotFileType]: t,
      [M_contextual_filter_manager_maybe.Filter.CopilotDogfood]: r,
      [M_contextual_filter_manager_maybe.Filter.CopilotUserKind]: n,
    };
    return (
      (await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .CustomEngine,
        o,
        i
      )) ?? ""
    );
  }
  async beforeRequestWaitMs(e, t, r, n, i) {
    const o = {
      [M_contextual_filter_manager_maybe.Filter.CopilotRepository]: e,
      [M_contextual_filter_manager_maybe.Filter.CopilotFileType]: t,
      [M_contextual_filter_manager_maybe.Filter.CopilotUserKind]: r,
      [M_contextual_filter_manager_maybe.Filter.CopilotDogfood]: n,
    };
    return (
      (await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .BeforeRequestWaitMs,
        o,
        i
      )) ?? 0
    );
  }
  async multiLogitBias(e, t, r, n, i) {
    const o = {
      [M_contextual_filter_manager_maybe.Filter.CopilotRepository]: e,
      [M_contextual_filter_manager_maybe.Filter.CopilotFileType]: t,
      [M_contextual_filter_manager_maybe.Filter.CopilotUserKind]: r,
      [M_contextual_filter_manager_maybe.Filter.CopilotDogfood]: n,
    };
    return (
      (await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .MultiLogitBias,
        o,
        i
      )) ?? false
    );
  }
  async debounceMs() {
    return (
      (await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .DebounceMs
      )) ?? 0
    );
  }
  async debouncePredict() {
    return (
      (await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .DebouncePredict
      )) ?? false
    );
  }
  async contextualFilterEnable() {
    return (
      (await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .ContextualFilterEnable
      )) ?? true
    );
  }
  async contextualFilterEnableTree() {
    return (
      (await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .ContextualFilterEnableTree
      )) ?? true
    );
  }
  async contextualFilterAcceptThreshold() {
    return (
      (await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .ContextualFilterAcceptThreshold
      )) ?? M_contextual_filter_constants_maybe.contextualFilterAcceptThreshold
    );
  }
  async contextualFilterExplorationTraffic() {
    return (
      (await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .ContextualFilterExplorationTraffic
      )) ??
      M_contextual_filter_constants_maybe.contextualFilterExplorationTraffic
    );
  }
  async disableLogProb() {
    return (
      (await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .disableLogProb
      )) ?? true
    );
  }
  async indentationMinLength(e, t, r, n) {
    const i = {
      [M_contextual_filter_manager_maybe.Filter.CopilotRepository]: e,
      [M_contextual_filter_manager_maybe.Filter.CopilotFileType]: t,
      [M_contextual_filter_manager_maybe.Filter.CopilotDogfood]: r,
      [M_contextual_filter_manager_maybe.Filter.CopilotUserKind]: n,
    };
    return (
      (await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .IndentationMinLength,
        i
      )) ?? undefined
    );
  }
  async indentationMaxLength(e, t, r, n) {
    const i = {
      [M_contextual_filter_manager_maybe.Filter.CopilotRepository]: e,
      [M_contextual_filter_manager_maybe.Filter.CopilotFileType]: t,
      [M_contextual_filter_manager_maybe.Filter.CopilotDogfood]: r,
      [M_contextual_filter_manager_maybe.Filter.CopilotUserKind]: n,
    };
    return (
      (await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .IndentationMaxLength,
        i
      )) ?? undefined
    );
  }
  async overrideBlockMode() {
    return await this.getAssignment(
      M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
        .OverrideBlockMode
    );
  }
  async overrideNumGhostCompletions() {
    return await this.getAssignment(
      M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
        .OverrideNumGhostCompletions
    );
  }
  async suffixPercent(e, t, r, n) {
    const i = {
      [M_contextual_filter_manager_maybe.Filter.CopilotRepository]: e,
      [M_contextual_filter_manager_maybe.Filter.CopilotFileType]: t,
      [M_contextual_filter_manager_maybe.Filter.CopilotUserKind]: r,
      [M_contextual_filter_manager_maybe.Filter.CopilotDogfood]: n,
    };
    return M_editor_config_constants_maybe.getConfig(
      this.ctx,
      M_editor_config_constants_maybe.ConfigKey.DebugOverrideEngine
    )
      ? 0
      : (await this.getAssignment(
          M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
            .SuffixPercent,
          i
        )) ?? 15;
  }
  async suffixMatchThreshold(e, t, r, n) {
    const i = {
      [M_contextual_filter_manager_maybe.Filter.CopilotRepository]: e,
      [M_contextual_filter_manager_maybe.Filter.CopilotFileType]: t,
      [M_contextual_filter_manager_maybe.Filter.CopilotUserKind]: r,
      [M_contextual_filter_manager_maybe.Filter.CopilotDogfood]: n,
    };
    return (
      (await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .SuffixMatchThreshold,
        i
      )) ?? 10
    );
  }
  async fimSuffixLengthThreshold(e, t, r, n) {
    const i = {
      [M_contextual_filter_manager_maybe.Filter.CopilotRepository]: e,
      [M_contextual_filter_manager_maybe.Filter.CopilotFileType]: t,
      [M_contextual_filter_manager_maybe.Filter.CopilotUserKind]: r,
      [M_contextual_filter_manager_maybe.Filter.CopilotDogfood]: n,
    };
    return (
      (await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .FimSuffixLengthThreshold,
        i
      )) ?? 0
    );
  }
  async suffixStartMode(e, t, r, i) {
    const o = {
      [M_contextual_filter_manager_maybe.Filter.CopilotRepository]: e,
      [M_contextual_filter_manager_maybe.Filter.CopilotFileType]: t,
      [M_contextual_filter_manager_maybe.Filter.CopilotUserKind]: r,
      [M_contextual_filter_manager_maybe.Filter.CopilotDogfood]: i,
    };
    switch (
      await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .SuffixStartMode,
        o
      )
    ) {
      case "cursor":
        return M_TreeNodeUtils_maybe.SuffixStartMode.Cursor;
      case "cursortrimstart":
      default:
        return M_TreeNodeUtils_maybe.SuffixStartMode.CursorTrimStart;
      case "siblingblock":
        return M_TreeNodeUtils_maybe.SuffixStartMode.SiblingBlock;
      case "siblingblocktrimstart":
        return M_TreeNodeUtils_maybe.SuffixStartMode.SiblingBlockTrimStart;
    }
  }
  async tokenizerName(e, t) {
    const r = {
      [M_contextual_filter_manager_maybe.Filter.CopilotRepository]: e,
      [M_contextual_filter_manager_maybe.Filter.CopilotUserKind]: t,
    };
    switch (
      await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .TokenizerName,
        r
      )
    ) {
      case "cushman001":
        return M_TreeNodeUtils_maybe.TokenizerName.cushman001;
      case "cushman002":
      default:
        return M_TreeNodeUtils_maybe.TokenizerName.cushman002;
      case "mock":
        return M_TreeNodeUtils_maybe.TokenizerName.mock;
    }
  }
  async neighboringTabsOption(e, t, r, i) {
    const o = {
      [M_contextual_filter_manager_maybe.Filter.CopilotRepository]: e,
      [M_contextual_filter_manager_maybe.Filter.CopilotFileType]: t,
      [M_contextual_filter_manager_maybe.Filter.CopilotUserKind]: r,
      [M_contextual_filter_manager_maybe.Filter.CopilotDogfood]: i,
    };
    switch (
      await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .NeighboringTabsOption,
        o
      )
    ) {
      case "none":
        return M_TreeNodeUtils_maybe.NeighboringTabsOption.None;
      case "conservative":
        return M_TreeNodeUtils_maybe.NeighboringTabsOption.Conservative;
      case "medium":
        return M_TreeNodeUtils_maybe.NeighboringTabsOption.Medium;
      case "eager":
      default:
        return M_TreeNodeUtils_maybe.NeighboringTabsOption.Eager;
      case "eagerbutlittle":
        return M_TreeNodeUtils_maybe.NeighboringTabsOption.EagerButLittle;
      case "eagerbutmedium":
        return M_TreeNodeUtils_maybe.NeighboringTabsOption.EagerButMedium;
    }
  }
  async neighboringSnippetTypes(e, t, r, i) {
    const o = {
      [M_contextual_filter_manager_maybe.Filter.CopilotRepository]: e,
      [M_contextual_filter_manager_maybe.Filter.CopilotFileType]: t,
      [M_contextual_filter_manager_maybe.Filter.CopilotUserKind]: r,
      [M_contextual_filter_manager_maybe.Filter.CopilotDogfood]: i,
    };
    return "function" ===
      (await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .NeighboringSnippetTypes,
        o
      ))
      ? M_TreeNodeUtils_maybe.NeighboringSnippetType.NeighboringFunctions
      : M_TreeNodeUtils_maybe.NeighboringSnippetType.NeighboringSnippets;
  }
  async repetitionFilterMode() {
    switch (
      await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .RepetitionFilterMode
      )
    ) {
      case "proxy":
        return M_RepetitionFilterManager_maybe.RepetitionFilterMode.PROXY;
      case "both":
        return M_RepetitionFilterManager_maybe.RepetitionFilterMode.BOTH;
      default:
        return M_RepetitionFilterManager_maybe.RepetitionFilterMode.CLIENT;
    }
  }
  async dropCompletionReasons() {
    const e = await this.getAssignment(
      M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
        .DropCompletionReasons
    );
    if (e) return e.split(",");
  }
  async openFileStrategy(e, t, r) {
    const n = {
      [M_contextual_filter_manager_maybe.Filter.CopilotRepository]: e,
      [M_contextual_filter_manager_maybe.Filter.CopilotUserKind]: t,
      [M_contextual_filter_manager_maybe.Filter.CopilotFileType]: r,
    };
    return (
      (await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .OpenFileStrategy,
        n
      )) ?? true
    );
  }
  async cursorHistoryStrategy(e, t, r) {
    const n = {
      [M_contextual_filter_manager_maybe.Filter.CopilotRepository]: e,
      [M_contextual_filter_manager_maybe.Filter.CopilotUserKind]: t,
      [M_contextual_filter_manager_maybe.Filter.CopilotFileType]: r,
    };
    switch (
      await this.getAssignment(
        M_Experiment_Configuration_Manager_maybe.ExpTreatmentVariables
          .CursorHistoryStrategy,
        n
      )
    ) {
      case "mostrecent":
        return M_NeighborFileManager_maybe.CursorHistoryStrategy.MostRecent;
      case "mostcount":
        return M_NeighborFileManager_maybe.CursorHistoryStrategy.MostCount;
      case "beforecurrentfile":
        return M_NeighborFileManager_maybe.CursorHistoryStrategy
          .BeforeCurrentFile;
      default:
        return M_NeighborFileManager_maybe.CursorHistoryStrategy.None;
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
