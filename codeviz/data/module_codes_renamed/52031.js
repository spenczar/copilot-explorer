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
const M_util = require("util");
const M_CopilotTokenManagerModule_maybe = require("CopilotTokenManagerModule");
const M_async_iterable_utils_maybe = require("async-iterable-utils");
const M_editor_config_constants_maybe = require("editor-config-constants");
const M_ExperimentCacheManager_maybe = require("ExperimentCacheManager");
const M_GhostTextDebounceManager_maybe = require("GhostTextDebounceManager");
const M_LoggingUtils_maybe = require("LoggingUtils");
const M_FetcherRequestManager_maybe = require("FetcherRequestManager");
const M_StatusReporterManager_maybe = require("StatusReporterManager");
const M_RepoInfoManager_maybe = require("RepoInfoManager");
const M_RepetitionFilterManager_maybe = require("RepetitionFilterManager");
const M_TelemetryReporterModule_maybe = require("TelemetryReporterModule");
const M_language_logprob_utils_maybe = require("language-logprob-utils");
const M_StreamChoiceProcessor_maybe = require("StreamChoiceProcessor");
const y = new M_LoggingUtils_maybe.Logger(
  M_LoggingUtils_maybe.LogLevel.INFO,
  "fetch"
);
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
    : M_async_iterable_utils_maybe.asyncIterableFilter(
        e,
        async (e) => e.completionText.trim().length > 0
      );
}
exports.OpenAIFetcher = OpenAIFetcher;
exports.postProcessChoices = postProcessChoices;
exports.LiveOpenAIFetcher = class extends OpenAIFetcher {
  async fetchAndStreamCompletions(e, t, r, n, i) {
    const s = e.get(M_StatusReporterManager_maybe.StatusReporter);
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
        M_LoggingUtils_maybe.logger.error(e, `Error destroying stream: ${t}`);
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
      M_TelemetryReporterModule_maybe.telemetry(e, "request.shownWarning", r);
      return {
        type: "failed",
        reason: "fetch response was undefined",
      };
    }
    if (200 !== c.status) {
      const r = this.createTelemetryData(a, e, t);
      return this.handleError(e, s, r, c);
    }
    const u = (
      await M_StreamChoiceProcessor_maybe.SSEProcessor.create(
        e,
        t.count,
        c,
        r,
        i
      )
    ).processSSE(n);
    return {
      type: "success",
      choices: postProcessChoices(
        M_async_iterable_utils_maybe.asyncIterableMap(u, async (t) =>
          M_StreamChoiceProcessor_maybe.prepareSolutionForReturn(e, t, r)
        ),
        t.allowEmptyChoices
      ),
      getProcessingTime: () => getProcessingTime(c),
    };
  }
  createTelemetryData(e, t, r) {
    return M_TelemetryReporterModule_maybe.TelemetryData.createAndMarkAsIssued({
      endpoint: e,
      engineName: extractEngineName(t, r.engineUrl),
      uiKind: r.uiKind,
      headerRequestId: r.ourRequestId,
    });
  }
  async fetchWithParameters(e, t, r, o) {
    const m = M_editor_config_constants_maybe.getLanguageConfig(
      e,
      M_editor_config_constants_maybe.ConfigKey.Stops
    );
    const y = await e
      .get(M_ExperimentCacheManager_maybe.Features)
      .disableLogProb();
    const b = {
      prompt: r.prompt.prefix,
      suffix: r.prompt.suffix,
      max_tokens: M_editor_config_constants_maybe.getConfig(
        e,
        M_editor_config_constants_maybe.ConfigKey.SolutionLength
      ),
      temperature: M_language_logprob_utils_maybe.getTemperatureForSamples(
        e,
        r.count
      ),
      top_p: M_editor_config_constants_maybe.getConfig(
        e,
        M_editor_config_constants_maybe.ConfigKey.TopP
      ),
      n: r.count,
      stop: m,
    };
    if (!r.requestLogProbs && y) {
      b.logprobs = 2;
    }
    const C = M_RepoInfoManager_maybe.tryGetGitHubNWO(r.repoInfo);
    if (undefined !== C) {
      b.nwo = C;
    }
    if (
      [
        M_RepetitionFilterManager_maybe.RepetitionFilterMode.PROXY,
        M_RepetitionFilterManager_maybe.RepetitionFilterMode.BOTH,
      ].includes(
        await e
          .get(M_ExperimentCacheManager_maybe.Features)
          .repetitionFilterMode()
      )
    ) {
      b.feature_flags = [...(b.feature_flags ?? []), "filter-repetitions"];
    }
    if (r.postOptions) {
      Object.assign(b, r.postOptions);
    }
    return o?.isCancellationRequested
      ? "not-sent"
      : (M_LoggingUtils_maybe.logger.info(
          e,
          `[fetchCompletions] engine ${r.engineUrl}`
        ),
        await (function (e, t, r, i, o, s, a, p, h) {
          const g = e.get(M_StatusReporterManager_maybe.StatusReporter);
          const m = M_util.format("%s/%s", r, i);
          if (!a)
            return void M_LoggingUtils_maybe.logger.error(
              e,
              `Failed to send request to ${m} due to missing key`
            );
          const y =
            M_TelemetryReporterModule_maybe.TelemetryData.createAndMarkAsIssued(
              {
                endpoint: i,
                engineName: extractEngineName(e, r),
                uiKind: p,
              },
              M_TelemetryReporterModule_maybe.telemetrizePromptLength(t)
            );
          for (const [e, t] of Object.entries(s))
            if ("prompt" != e && "suffix" != e) {
              y.properties[`request.option.${e}`] =
                JSON.stringify(t) ?? "undefined";
            }
          y.properties.headerRequestId = o;
          M_TelemetryReporterModule_maybe.telemetry(e, "request.sent", y);
          const b = M_TelemetryReporterModule_maybe.now();
          const C = (function (e) {
            switch (e) {
              case v.GhostText:
                return "copilot-ghost";
              case v.Panel:
                return "copilot-panel";
            }
          })(p);
          return M_FetcherRequestManager_maybe.postRequest(e, m, a, C, o, s, h)
            .then((r) => {
              const n = getRequestId(r, undefined);
              y.extendWithRequestId(n);
              const i = M_TelemetryReporterModule_maybe.now() - b;
              y.measurements.totalTimeMs = i;
              M_LoggingUtils_maybe.logger.info(
                e,
                `request.response: [${m}] took ${i} ms`
              );
              M_LoggingUtils_maybe.logger.debug(
                e,
                "request.response properties",
                y.properties
              );
              M_LoggingUtils_maybe.logger.debug(
                e,
                "request.response measurements",
                y.measurements
              );
              M_LoggingUtils_maybe.logger.debug(
                e,
                `prompt: ${JSON.stringify(t)}`
              );
              M_TelemetryReporterModule_maybe.telemetry(
                e,
                "request.response",
                y
              );
              const o = r.headers.get("x-copilot-delay");
              const s = o ? parseInt(o, 10) : 0;
              e.get(
                M_GhostTextDebounceManager_maybe.GhostTextDebounceManager
              ).extraDebounceMs = s;
              return r;
            })
            .catch((t) => {
              if (M_FetcherRequestManager_maybe.isAbortError(t)) throw t;
              g.setWarning(t.message);
              const r = y.extendedBy({
                error: "Network exception",
              });
              M_TelemetryReporterModule_maybe.telemetry(
                e,
                "request.shownWarning",
                r
              );
              y.properties.code = String(t.code ?? "");
              y.properties.errno = String(t.errno ?? "");
              y.properties.message = String(t.message ?? "");
              y.properties.type = String(t.type ?? "");
              const n = M_TelemetryReporterModule_maybe.now() - b;
              throw (
                ((y.measurements.totalTimeMs = n),
                M_LoggingUtils_maybe.logger.debug(
                  e,
                  `request.response: [${m}] took ${n} ms`
                ),
                M_LoggingUtils_maybe.logger.debug(
                  e,
                  "request.error properties",
                  y.properties
                ),
                M_LoggingUtils_maybe.logger.debug(
                  e,
                  "request.error measurements",
                  y.measurements
                ),
                M_LoggingUtils_maybe.logger.error(
                  e,
                  `Request Error: ${t.message}`
                ),
                M_TelemetryReporterModule_maybe.telemetry(
                  e,
                  "request.error",
                  y
                ),
                t)
              );
            })
            .finally(() => {
              M_TelemetryReporterModule_maybe.logEnginePrompt(e, t, y);
            });
        })(
          e,
          r.prompt,
          r.engineUrl,
          t,
          r.ourRequestId,
          b,
          (
            await e
              .get(M_CopilotTokenManagerModule_maybe.CopilotTokenManager)
              .getCopilotToken(e)
          ).token,
          r.uiKind,
          o
        ));
  }
  async handleError(e, t, r, n) {
    t.setWarning();
    r.properties.error = `Response status was ${n.status}`;
    r.properties.status = String(n.status);
    M_TelemetryReporterModule_maybe.telemetry(e, "request.shownWarning", r);
    if (401 === n.status || 403 === n.status)
      return (
        e
          .get(M_CopilotTokenManagerModule_maybe.CopilotTokenManager)
          .resetCopilotToken(e, n.status),
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
