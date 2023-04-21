Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.launchSolutions = exports.normalizeCompletionText = undefined;
const M_url_opener = require("url-opener");
const M_async_iterable_utils_maybe = require("async-iterable-utils");
const M_editor_config_constants_maybe = require("editor-config-constants");
const M_completion_context_manager_maybe = require("completion-context-manager");
const M_LoggingUtils_maybe = require("LoggingUtils");
const M_EngineURLManager_maybe = require("EngineURLManager");
const M_language_logprob_utils_maybe = require("language-logprob-utils");
const M_StatusReporterManager_maybe = require("StatusReporterManager");
const M_language_indentation_utils_maybe = require("language-indentation-utils");
const M_prompt_parser_utils_maybe = require("prompt-parser-utils");
const M_LanguageParserUtils_maybe = require("LanguageParserUtils");
const M_RepoInfoManager_maybe = require("RepoInfoManager");
const M_CompletionFilterManager_maybe = require("CompletionFilterManager");
const M_TelemetryReporterModule_maybe = require("TelemetryReporterModule");
const M_LocationFactoryModule_maybe = require("LocationFactoryModule");
const v = new M_LoggingUtils_maybe.Logger(
  M_LoggingUtils_maybe.LogLevel.INFO,
  "solutions"
);
function _(e, t, r, n) {
  return async (n) =>
    M_language_indentation_utils_maybe.isBlockBodyFinished(e, t, r, n);
}
async function b(e, t, r) {
  if (t.isCancellationRequested) {
    e.removeProgress();
    return {
      status: "FinishedWithError",
      error: "Cancelled",
    };
  }
  const n = await r.next();
  return true === n.done
    ? (e.removeProgress(),
      {
        status: "FinishedNormally",
      })
    : {
        status: "Solution",
        solution: n.value,
        next: b(e, t, r),
      };
}
exports.normalizeCompletionText = function (e) {
  return e.replace(/\s+/g, "");
};
exports.launchSolutions = async function (e, t) {
  const r = t.completionContext.insertPosition;
  const a = t.completionContext.prependToCompletion;
  const w = t.completionContext.indentation;
  const C = e.get(M_LocationFactoryModule_maybe.LocationFactory);
  const E = await t.getDocument();
  const T = await M_prompt_parser_utils_maybe.extractPrompt(e, E, r);
  if ("contextTooShort" === T.type) {
    t.reportCancelled();
    return {
      status: "FinishedWithError",
      error: "Context too short",
    };
  }
  const S = T.prompt;
  const x = T.trailingWs;
  if (x.length > 0) {
    t.startPosition = C.position(
      t.startPosition.line,
      t.startPosition.character - x.length
    );
  }
  const k = t.getCancellationToken();
  const I = M_url_opener.v4();
  t.savedTelemetryData =
    M_TelemetryReporterModule_maybe.TelemetryData.createAndMarkAsIssued(
      {
        headerRequestId: I,
        languageId: E.languageId,
        source: M_completion_context_manager_maybe.completionTypeToString(
          t.completionContext.completionType
        ),
      },
      {
        ...M_TelemetryReporterModule_maybe.telemetrizePromptLength(S),
        solutionCount: t.solutionCountTarget,
        promptEndPos: E.offsetAt(r),
      }
    );
  v.info(e, `prompt: ${JSON.stringify(S)}`);
  v.debug(e, `prependToCompletion: ${a}`);
  M_TelemetryReporterModule_maybe.telemetry(
    e,
    "solution.requested",
    t.savedTelemetryData
  );
  const A = await e
    .get(M_editor_config_constants_maybe.BlockModeConfig)
    .forLanguage(e, E.languageId);
  const P = M_LanguageParserUtils_maybe.isSupportedLanguageId(E.languageId);
  const R = M_language_indentation_utils_maybe.contextIndentation(E, r);
  const N = {
    stream: true,
    extra: {
      language: E.languageId,
      next_indent: R.next ?? 0,
    },
  };
  if ("parsing" !== A || P) {
    N.stop = ["\n\n", "\r\n\r\n"];
  }
  const O = M_RepoInfoManager_maybe.extractRepoInfoInBackground(e, E.fileName);
  const L = {
    prompt: S,
    languageId: E.languageId,
    repoInfo: O,
    ourRequestId: I,
    engineUrl: await M_EngineURLManager_maybe.getEngineURL(
      e,
      M_RepoInfoManager_maybe.tryGetGitHubNWO(O),
      E.languageId,
      M_RepoInfoManager_maybe.getDogFood(O),
      await M_RepoInfoManager_maybe.getUserKind(e),
      t.savedTelemetryData
    ),
    count: t.solutionCountTarget,
    uiKind: M_language_logprob_utils_maybe.CopilotUiKind.Panel,
    postOptions: N,
    requestLogProbs: true,
  };
  let D;
  switch ((t.completionContext.completionType, A)) {
    case M_editor_config_constants_maybe.BlockMode.Server:
      D = async (e) => {};
      N.extra.force_indent = R.prev ?? -1;
      N.extra.trim_by_indentation = true;
      break;
    case M_editor_config_constants_maybe.BlockMode.ParsingAndServer:
      D = P ? _(e, E, t.startPosition) : async (e) => {};
      N.extra.force_indent = R.prev ?? -1;
      N.extra.trim_by_indentation = true;
      break;
    case M_editor_config_constants_maybe.BlockMode.Parsing:
    default:
      D = P ? _(e, E, t.startPosition) : async (e) => {};
  }
  e.get(M_StatusReporterManager_maybe.StatusReporter).setProgress();
  const M = await e
    .get(M_language_logprob_utils_maybe.OpenAIFetcher)
    .fetchAndStreamCompletions(
      e,
      L,
      M_TelemetryReporterModule_maybe.TelemetryData.createAndMarkAsIssued(),
      D,
      k
    );
  if ("failed" === M.type || "canceled" === M.type) {
    t.reportCancelled();
    e.get(M_StatusReporterManager_maybe.StatusReporter).removeProgress();
    return {
      status: "FinishedWithError",
      error: `${M.type}: ${M.reason}`,
    };
  }
  let B = M.choices;
  B = (async function* (e, t) {
    for await (const r of e) {
      const e = {
        ...r,
      };
      e.completionText = t + e.completionText.trimRight();
      yield e;
    }
  })(B, a);
  if (null !== w) {
    B = M_language_logprob_utils_maybe.cleanupIndentChoices(B, w);
  }
  B = M_async_iterable_utils_maybe.asyncIterableMapFilter(B, async (t) =>
    M_CompletionFilterManager_maybe.postProcessChoice(
      e,
      "solution",
      E,
      r,
      t,
      false,
      v
    )
  );
  const F = M_async_iterable_utils_maybe.asyncIterableMapFilter(
    B,
    async (n) => {
      let i = n.completionText;
      v.info(e, `Open Copilot completion: [${n.completionText}]`);
      if (
        t.completionContext.completionType ===
        M_completion_context_manager_maybe.CompletionType.OPEN_COPILOT
      ) {
        let t = "";
        const o = await (0, M_language_indentation_utils_maybe.getNodeStart)(
          e,
          E,
          r,
          n.completionText
        );
        if (o)
          [t] = (0, M_prompt_parser_utils_maybe.trimLastLine)(
            E.getText(C.range(C.position(o.line, o.character), r))
          );
        else {
          const e = C.position(r.line, 0);
          t = E.getText(C.range(e, r));
        }
        i = t + i;
      }
      let o = n.completionText;
      if (x.length > 0 && o.startsWith(x)) {
        o = o.substring(x.length);
      }
      const c = n.meanLogProb;
      const l = undefined !== c ? Math.exp(c) : 0;
      const u = (await t.getDocument()).version;
      return {
        displayText: i,
        meanProb: l,
        meanLogProb: c || 0,
        completionText: o,
        requestId: n.requestId,
        choiceIndex: n.choiceIndex,
        prependToCompletion: a,
        docVersion: u,
      };
    }
  );
  return b(
    e.get(M_StatusReporterManager_maybe.StatusReporter),
    k,
    F[Symbol.asyncIterator]()
  );
};
