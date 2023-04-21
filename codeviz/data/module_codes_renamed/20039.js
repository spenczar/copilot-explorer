Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.postRequest =
  exports.Response =
  exports.isAbortError =
  exports.Fetcher =
    undefined;
const M_fetch_helper_maybe = require("fetch-helper");
const M_util = require("util");
const M_editor_config_constants_maybe = require("editor-config-constants");
const M_GhostTextDebounceManager_maybe = require("GhostTextDebounceManager");
const M_HeaderContributorManager_maybe = require("HeaderContributorManager");
const M_TelemetryReporterModule_maybe = require("TelemetryReporterModule");
class Fetcher {}
exports.Fetcher = Fetcher;
exports.isAbortError = function (e) {
  return e instanceof M_fetch_helper_maybe.AbortError;
};
exports.Response = class {
  constructor(e, t, r, n, i, o) {
    this.status = e;
    this.statusText = t;
    this.headers = r;
    this.getText = n;
    this.getJson = i;
    this.getBody = o;
    this.ok = this.status >= 200 && this.status < 300;
  }
  async text() {
    return this.getText();
  }
  async json() {
    return this.getJson();
  }
  async body() {
    return this.getBody();
  }
};
exports.postRequest = function (e, t, r, n, u, d, p) {
  const h = {
    Authorization: M_util.format("Bearer %s", r),
    "X-Request-Id": u,
    "Openai-Organization": "github-copilot",
    "VScode-SessionId": e.get(M_editor_config_constants_maybe.EditorSession)
      .sessionId,
    "VScode-MachineId": e.get(M_editor_config_constants_maybe.EditorSession)
      .machineId,
    ...M_editor_config_constants_maybe.editorVersionHeaders(e),
  };
  e.get(M_HeaderContributorManager_maybe.HeaderContributors).contributeHeaders(
    h
  );
  if (n) {
    h["OpenAI-Intent"] = n;
  }
  const f = e.get(
    M_GhostTextDebounceManager_maybe.GhostTextDebounceManager
  ).forceDelayMs;
  if (f) {
    h["X-Copilot-Force-Delay"] = f.toString();
  }
  const g = {
    method: "POST",
    headers: h,
    json: d,
    timeout: 3e4,
  };
  const m = e.get(Fetcher);
  if (p) {
    const t = m.makeAbortController();
    p.onCancellationRequested(() => {
      M_TelemetryReporterModule_maybe.telemetry(
        e,
        "networking.cancelRequest",
        M_TelemetryReporterModule_maybe.TelemetryData.createAndMarkAsIssued({
          headerRequestId: u,
        })
      );
      t.abort();
    });
    g.signal = t.signal;
  }
  return m.fetch(t, g).catch((r) => {
    if (
      "ECONNRESET" == r.code ||
      "ETIMEDOUT" == r.code ||
      "ERR_HTTP2_INVALID_SESSION" == r.code ||
      "ERR_HTTP2_GOAWAY_SESSION" == r.message
    ) {
      M_TelemetryReporterModule_maybe.telemetry(e, "networking.disconnectAll");
      return m.disconnectAll().then(() => m.fetch(t, g));
    }
    throw r;
  });
};
