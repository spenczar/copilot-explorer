Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.postRequest =
  exports.Response =
  exports.isAbortError =
  exports.Fetcher =
    undefined;
const n = require(14735);
const i = require("util");
const o = require(39800);
const s = require(54619);
const a = require(63405);
const c = require(65489);
class Fetcher {}
exports.Fetcher = Fetcher;
exports.isAbortError = function (e) {
  return e instanceof n.AbortError;
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
    Authorization: i.format("Bearer %s", r),
    "X-Request-Id": u,
    "Openai-Organization": "github-copilot",
    "VScode-SessionId": e.get(o.EditorSession).sessionId,
    "VScode-MachineId": e.get(o.EditorSession).machineId,
    ...o.editorVersionHeaders(e),
  };
  e.get(a.HeaderContributors).contributeHeaders(h);
  if (n) {
    h["OpenAI-Intent"] = n;
  }
  const f = e.get(s.GhostTextDebounceManager).forceDelayMs;
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
      c.telemetry(
        e,
        "networking.cancelRequest",
        c.TelemetryData.createAndMarkAsIssued({
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
      c.telemetry(e, "networking.disconnectAll");
      return m.disconnectAll().then(() => m.fetch(t, g));
    }
    throw r;
  });
};