Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.ExpConfig = exports.ExpTreatmentVariables = undefined;
const n = require(65489);
const i = require(74914);
var o;
(o = exports.ExpTreatmentVariables || (exports.ExpTreatmentVariables = {})).AA =
  "copilotaa";
o.CustomEngine = "copilotcustomengine";
o.Fetcher = "copilotfetcher";
o.OverrideBlockMode = "copilotoverrideblockmode";
o.OverrideNumGhostCompletions = "copilotoverridednumghostcompletions";
o.SuffixPercent = "CopilotSuffixPercent";
o.BeforeRequestWaitMs = "copilotlms";
o.NeighboringTabsOption = "copilotneighboringtabs";
o.NeighboringSnippetTypes = "copilotneighboringsnippettypes";
o.DebounceMs = "copilotdebouncems";
o.DebouncePredict = "copilotdebouncepredict";
o.ContextualFilterEnable = "copilotcontextualfilterenable";
o.ContextualFilterEnableTree = "copilotcontextualfilterenabletree";
o.ContextualFilterAcceptThreshold = "copilotcontextualfilteracceptthreshold";
o.ContextualFilterExplorationTraffic =
  "copilotcontextualfilterexplorationtraffic";
o.disableLogProb = "copilotdisablelogprob";
o.RepetitionFilterMode = "copilotrepetitionfiltermode";
o.DropCompletionReasons = "copilotdropcompletionreasons";
o.GranularityTimePeriodSizeInH = "copilottimeperiodsizeinh";
o.GranularityByCallBuckets = "copilotbycallbuckets";
o.SuffixStartMode = "copilotsuffixstartmode";
o.SuffixMatchThreshold = "copilotsuffixmatchthreshold";
o.FimSuffixLengthThreshold = "copilotfimsuffixlenthreshold";
o.MultiLogitBias = "copilotlbeot";
o.TokenizerName = "copilottokenizername";
o.IndentationMinLength = "copilotindentationminlength";
o.IndentationMaxLength = "copilotindentationmaxlength";
o.OpenFileStrategy = "openfilestrategy";
o.CursorHistoryStrategy = "cursorhistorystrategy";
o.MostRecent = "mostrecent";
o.MostCount = "mostcount";
o.BeforeCurrentFile = "beforecurrentfile";
class ExpConfig {
  constructor(e, t, r) {
    this.variables = e;
    this.assignmentContext = t;
    this.features = r;
  }
  static createFallbackConfig(e, t) {
    n.telemetryExpProblem(e, {
      reason: t,
    });
    return this.createEmptyConfig();
  }
  static createEmptyConfig() {
    return new ExpConfig({}, "", "");
  }
  addToTelemetry(e) {
    e.properties[i.ExpServiceTelemetryNames.featuresTelemetryPropertyName] =
      this.features;
    e.properties[
      i.ExpServiceTelemetryNames.assignmentContextTelemetryPropertyName
    ] = this.assignmentContext;
  }
}
exports.ExpConfig = ExpConfig;