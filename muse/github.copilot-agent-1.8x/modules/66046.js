Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.ExpConfigNone =
  exports.ExpConfigFromTAS =
  exports.ExpConfigMaker =
    undefined;
const n = require(20039);
const i = require(75917);
class ExpConfigMaker {}
exports.ExpConfigMaker = ExpConfigMaker;
exports.ExpConfigFromTAS = class extends ExpConfigMaker {
  async fetchExperiments(e, t) {
    const r = e.get(n.Fetcher);
    let o;
    try {
      o = await r.fetch("https://default.exp-tas.com/vscode/ab", {
        method: "GET",
        headers: t,
      });
    } catch (t) {
      return i.ExpConfig.createFallbackConfig(
        e,
        `Error fetching ExP config: ${t}`
      );
    }
    if (!o.ok)
      return i.ExpConfig.createFallbackConfig(
        e,
        `ExP responded with ${o.status}`
      );
    const s = await o.json();
    const a = s.Configs.find((e) => "vscode" === e.Id) ?? {
      Id: "vscode",
      Parameters: {},
    };
    const c = Object.entries(a.Parameters).map(([e, t]) => e + (t ? "" : "cf"));
    return new i.ExpConfig(a.Parameters, s.AssignmentContext, c.join(";"));
  }
};
exports.ExpConfigNone = class extends ExpConfigMaker {
  async fetchExperiments(e, t) {
    return i.ExpConfig.createEmptyConfig();
  }
};