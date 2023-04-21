var r;
var n;
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.FilterSettings =
  exports.telmetryNames =
  exports.TargetPopulation =
  exports.Filter =
    undefined;
(function (e) {
  e.Market = "X-MSEdge-Market";
  e.CorpNet = "X-FD-Corpnet";
  e.ApplicationVersion = "X-VSCode-AppVersion";
  e.Build = "X-VSCode-Build";
  e.ClientId = "X-MSEdge-ClientId";
  e.ExtensionName = "X-VSCode-ExtensionName";
  e.ExtensionVersion = "X-VSCode-ExtensionVersion";
  e.Language = "X-VSCode-Language";
  e.TargetPopulation = "X-VSCode-TargetPopulation";
  e.CopilotClientTimeBucket = "X-Copilot-ClientTimeBucket";
  e.CopilotOverrideEngine = "X-Copilot-OverrideEngine";
  e.CopilotRepository = "X-Copilot-Repository";
  e.CopilotFileType = "X-Copilot-FileType";
  e.CopilotUserKind = "X-Copilot-UserKind";
  e.CopilotDogfood = "X-Copilot-Dogfood";
})((r = exports.Filter || (exports.Filter = {})));
(n = exports.TargetPopulation || (exports.TargetPopulation = {})).Team = "team";
n.Internal = "internal";
n.Insiders = "insider";
n.Public = "public";
exports.telmetryNames = {
  [r.CopilotClientTimeBucket]: "timeBucket",
  [r.CopilotOverrideEngine]: "engine",
  [r.CopilotRepository]: "repo",
  [r.CopilotFileType]: "fileType",
  [r.CopilotUserKind]: "userKind",
};
class FilterSettings {
  constructor(e) {
    this.filters = e;
    for (const [e, t] of Object.entries(this.filters))
      if ("" === t) {
        delete this.filters[e];
      }
  }
  extends(e) {
    for (const [t, r] of Object.entries(e.filters))
      if (this.filters[t] !== r) return false;
    return true;
  }
  addToTelemetry(e) {
    for (const [r, n] of Object.entries(this.filters)) {
      const i = exports.telmetryNames[r];
      if (undefined !== i) {
        e.properties[i] = n;
      }
    }
  }
  stringify() {
    const e = Object.keys(this.filters);
    e.sort();
    return e.map((e) => `${e}:${this.filters[e]}`).join(";");
  }
  toHeaders() {
    return {
      ...this.filters,
    };
  }
  withChange(e, t) {
    return new FilterSettings({
      ...this.filters,
      [e]: t,
    });
  }
}
exports.FilterSettings = FilterSettings;