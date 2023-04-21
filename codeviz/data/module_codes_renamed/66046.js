Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.ExpConfigNone =
  exports.ExpConfigFromTAS =
  exports.ExpConfigMaker =
    undefined;
const M_FetcherRequestManager_maybe = require("FetcherRequestManager");
const M_Experiment_Configuration_Manager_maybe = require("Experiment-Configuration-Manager");
class ExpConfigMaker {}
exports.ExpConfigMaker = ExpConfigMaker;
exports.ExpConfigFromTAS = class extends ExpConfigMaker {
  async fetchExperiments(e, t) {
    const r = e.get(M_FetcherRequestManager_maybe.Fetcher);
    let o;
    try {
      o = await r.fetch("https://default.exp-tas.com/vscode/ab", {
        method: "GET",
        headers: t,
      });
    } catch (t) {
      return M_Experiment_Configuration_Manager_maybe.ExpConfig.createFallbackConfig(
        e,
        `Error fetching ExP config: ${t}`
      );
    }
    if (!o.ok)
      return M_Experiment_Configuration_Manager_maybe.ExpConfig.createFallbackConfig(
        e,
        `ExP responded with ${o.status}`
      );
    const s = await o.json();
    const a = s.Configs.find((e) => "vscode" === e.Id) ?? {
      Id: "vscode",
      Parameters: {},
    };
    const c = Object.entries(a.Parameters).map(([e, t]) => e + (t ? "" : "cf"));
    return new M_Experiment_Configuration_Manager_maybe.ExpConfig(
      a.Parameters,
      s.AssignmentContext,
      c.join(";")
    );
  }
};
exports.ExpConfigNone = class extends ExpConfigMaker {
  async fetchExperiments(e, t) {
    return M_Experiment_Configuration_Manager_maybe.ExpConfig.createEmptyConfig();
  }
};
