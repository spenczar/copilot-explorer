Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.LiveOpenAIFetcher =
  exports.postProcessChoices =
  exports.OpenAIFetcher =
  exports.extractEngineName =
  exports.getProcessingTime =
  exports.getRequestId =
  exports.CopilotUiKind =
    undefined;
const n = require("util");
const i = require(35765);
const o = require(11661);
const s = require(39800);
const a = require(16905);
const c = require(54619);
const l = require(5798);
const u = require(20039);
const d = require(86635);
const p = require(3591);
const h = require(54604);
const f = require(65489);
const g = require(598);
const m = require(24586);
const y = new l.Logger(l.LogLevel.INFO, "fetch");
var v;
function getRequestId(e, t) {
  return {
    headerRequestId: e.headers.get("x-request-id") || "",
    completionId: t && t.id ? t.id : "",
    created: t && t.created ? t.created : 0,
    serverExperiments: e.headers.get("X-Copilot-Experiment") || "",
    deploymentId: e.headers.get("azureml-model-deployment") || "",
  };
}
function getProcessingTime(e) {
  const t = e.headers.get("openai-processing-ms");
  return t ? parseInt(t, 10) : 0;
}
function extractEngineName(e, t) {
  return t.split("/").pop() || (y.error(e, "Malformed engine URL: " + t), t);
}
!(function (e) {
  e.GhostText = "ghostText";
  e.Panel = "synthesize";
})((v = exports.CopilotUiKind || (exports.CopilotUiKind = {})));
exports.getRequestId = getRequestId;
exports.getProcessingTime = getProcessingTime;
exports.extractEngineName = extractEngineName;
class OpenAIFetcher {}
function postProcessChoices(e, t) {
  return t
    ? e
    : o.asyncIterableFilter(e, async (e) => e.completionText.trim().length > 0);
}
exports.OpenAIFetcher = OpenAIFetcher;
exports.postProcessChoices = postProcessChoices;
exports.LiveOpenAIFetcher = class extends OpenAIFetcher {
  async fetchAndStreamCompletions(e, t, r, n, i) {
    const s = e.get(d.StatusReporter);
    const a = "completions";
    const c = await this.fetchWithParameters(e, a, t, i);
    if ("not-sent" === c)
      return {
        type: "canceled",
        reason: "before fetch request",
      };
    if (i?.isCancellationRequested) {
      const t = await c.body();
      try {
        t.destroy();
      } catch (t) {
        l.logger.error(e, `Error destroying stream: ${t}`);
      }
      return {
        type: "canceled",
        reason: "after fetch request",
      };
    }
    if (undefined === c) {
      const r = this.createTelemetryData(a, e, t);
      s.setWarning();
      r.properties.error = "Response was undefined";
      f.telemetry(e, "request.shownWarning", r);
      return {
        type: "failed",
        reason: "fetch response was undefined",
      };
    }
    if (200 !== c.status) {
      const r = this.createTelemetryData(a, e, t);
      return this.handleError(e, s, r, c);
    }
    const u = (await m.SSEProcessor.create(e, t.count, c, r, i)).processSSE(n);
    return {
      type: "success",
      choices: postProcessChoices(
        o.asyncIterableMap(u, async (t) => m.prepareSolutionForReturn(e, t, r)),
        t.allowEmptyChoices
      ),
      getProcessingTime: () => getProcessingTime(c),
    };
  }
  createTelemetryData(e, t, r) {
    return f.TelemetryData.createAndMarkAsIssued({
      endpoint: e,
      engineName: extractEngineName(t, r.engineUrl),
      uiKind: r.uiKind,
      headerRequestId: r.ourRequestId,
    });
  }
  async fetchWithParameters(e, t, r, o) {
    const m = s.getLanguageConfig(e, s.ConfigKey.Stops);
    const y = await e.get(a.Features).disableLogProb();
    const b = {
      prompt: r.prompt.prefix,
      suffix: r.prompt.suffix,
      max_tokens: s.getConfig(e, s.ConfigKey.SolutionLength),
      temperature: g.getTemperatureForSamples(e, r.count),
      top_p: s.getConfig(e, s.ConfigKey.TopP),
      n: r.count,
      stop: m,
    };
    if (!r.requestLogProbs && y) {
      b.logprobs = 2;
    }
    const C = p.tryGetGitHubNWO(r.repoInfo);
    if (undefined !== C) {
      b.nwo = C;
    }
    if (
      [h.RepetitionFilterMode.PROXY, h.RepetitionFilterMode.BOTH].includes(
        await e.get(a.Features).repetitionFilterMode()
      )
    ) {
      b.feature_flags = [...(b.feature_flags ?? []), "filter-repetitions"];
    }
    if (r.postOptions) {
      Object.assign(b, r.postOptions);
    }
    return o?.isCancellationRequested
      ? "not-sent"
      : (l.logger.info(e, `[fetchCompletions] engine ${r.engineUrl}`),
        await (function (e, t, r, i, o, s, a, p, h) {
          const g = e.get(d.StatusReporter);
          const m = n.format("%s/%s", r, i);
          if (!a)
            return void l.logger.error(
              e,
              `Failed to send request to ${m} due to missing key`
            );
          const y = f.TelemetryData.createAndMarkAsIssued(
            {
              endpoint: i,
              engineName: extractEngineName(e, r),
              uiKind: p,
            },
            f.telemetrizePromptLength(t)
          );
          for (const [e, t] of Object.entries(s))
            if ("prompt" != e && "suffix" != e) {
              y.properties[`request.option.${e}`] =
                JSON.stringify(t) ?? "undefined";
            }
          y.properties.headerRequestId = o;
          f.telemetry(e, "request.sent", y);
          const b = f.now();
          const C = (function (e) {
            switch (e) {
              case v.GhostText:
                return "copilot-ghost";
              case v.Panel:
                return "copilot-panel";
            }
          })(p);
          return u
            .postRequest(e, m, a, C, o, s, h)
            .then((r) => {
              const n = getRequestId(r, undefined);
              y.extendWithRequestId(n);
              const i = f.now() - b;
              y.measurements.totalTimeMs = i;
              l.logger.info(e, `request.response: [${m}] took ${i} ms`);
              l.logger.debug(e, "request.response properties", y.properties);
              l.logger.debug(
                e,
                "request.response measurements",
                y.measurements
              );
              l.logger.debug(e, `prompt: ${JSON.stringify(t)}`);
              f.telemetry(e, "request.response", y);
              const o = r.headers.get("x-copilot-delay");
              const s = o ? parseInt(o, 10) : 0;
              e.get(c.GhostTextDebounceManager).extraDebounceMs = s;
              return r;
            })
            .catch((t) => {
              if (u.isAbortError(t)) throw t;
              g.setWarning(t.message);
              const r = y.extendedBy({
                error: "Network exception",
              });
              f.telemetry(e, "request.shownWarning", r);
              y.properties.code = String(t.code ?? "");
              y.properties.errno = String(t.errno ?? "");
              y.properties.message = String(t.message ?? "");
              y.properties.type = String(t.type ?? "");
              const n = f.now() - b;
              throw (
                ((y.measurements.totalTimeMs = n),
                l.logger.debug(e, `request.response: [${m}] took ${n} ms`),
                l.logger.debug(e, "request.error properties", y.properties),
                l.logger.debug(e, "request.error measurements", y.measurements),
                l.logger.error(e, `Request Error: ${t.message}`),
                f.telemetry(e, "request.error", y),
                t)
              );
            })
            .finally(() => {
              f.logEnginePrompt(e, t, y);
            });
        })(
          e,
          r.prompt,
          r.engineUrl,
          t,
          r.ourRequestId,
          b,
          (
            await e.get(i.CopilotTokenManager).getCopilotToken(e)
          ).token,
          r.uiKind,
          o
        ));
  }
  async handleError(e, t, r, n) {
    t.setWarning();
    r.properties.error = `Response status was ${n.status}`;
    r.properties.status = String(n.status);
    f.telemetry(e, "request.shownWarning", r);
    if (401 === n.status || 403 === n.status)
      return (
        e.get(i.CopilotTokenManager).resetCopilotToken(e, n.status),
        {
          type: "failed",
          reason: `token expired or invalid: ${n.status}`,
        }
      );
    if (499 === n.status) {
      y.info(e, "Cancelled by server");
      return {
        type: "failed",
        reason: "canceled by server",
      };
    }
    const o = await n.text();
    return 466 === n.status
      ? (t.setError(o),
        y.info(e, o),
        {
          type: "failed",
          reason: `client not supported: ${o}`,
        })
      : (y.error(e, "Unhandled status from server:", n.status, o),
        {
          type: "failed",
          reason: `unhandled status from server: ${n.status} ${o}`,
        });
  }
};