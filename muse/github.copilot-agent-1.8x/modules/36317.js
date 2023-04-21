Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.launchSolutions = exports.normalizeCompletionText = undefined;
const n = require(7057);
const i = require(11661);
const o = require(39800);
const s = require(75680);
const a = require(5798);
const c = require(47553);
const l = require(598);
const u = require(86635);
const d = require(47917);
const p = require(24090);
const h = require(2273);
const f = require(3591);
const g = require(3883);
const m = require(65489);
const y = require(52369);
const v = new a.Logger(a.LogLevel.INFO, "solutions");
function _(e, t, r, n) {
  return async (n) => d.isBlockBodyFinished(e, t, r, n);
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
  const C = e.get(y.LocationFactory);
  const E = await t.getDocument();
  const T = await p.extractPrompt(e, E, r);
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
  const I = n.v4();
  t.savedTelemetryData = m.TelemetryData.createAndMarkAsIssued(
    {
      headerRequestId: I,
      languageId: E.languageId,
      source: s.completionTypeToString(t.completionContext.completionType),
    },
    {
      ...m.telemetrizePromptLength(S),
      solutionCount: t.solutionCountTarget,
      promptEndPos: E.offsetAt(r),
    }
  );
  v.info(e, `prompt: ${JSON.stringify(S)}`);
  v.debug(e, `prependToCompletion: ${a}`);
  m.telemetry(e, "solution.requested", t.savedTelemetryData);
  const A = await e.get(o.BlockModeConfig).forLanguage(e, E.languageId);
  const P = h.isSupportedLanguageId(E.languageId);
  const R = d.contextIndentation(E, r);
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
  const O = f.extractRepoInfoInBackground(e, E.fileName);
  const L = {
    prompt: S,
    languageId: E.languageId,
    repoInfo: O,
    ourRequestId: I,
    engineUrl: await c.getEngineURL(
      e,
      f.tryGetGitHubNWO(O),
      E.languageId,
      f.getDogFood(O),
      await f.getUserKind(e),
      t.savedTelemetryData
    ),
    count: t.solutionCountTarget,
    uiKind: l.CopilotUiKind.Panel,
    postOptions: N,
    requestLogProbs: true,
  };
  let D;
  switch ((t.completionContext.completionType, A)) {
    case o.BlockMode.Server:
      D = async (e) => {};
      N.extra.force_indent = R.prev ?? -1;
      N.extra.trim_by_indentation = true;
      break;
    case o.BlockMode.ParsingAndServer:
      D = P ? _(e, E, t.startPosition) : async (e) => {};
      N.extra.force_indent = R.prev ?? -1;
      N.extra.trim_by_indentation = true;
      break;
    case o.BlockMode.Parsing:
    default:
      D = P ? _(e, E, t.startPosition) : async (e) => {};
  }
  e.get(u.StatusReporter).setProgress();
  const M = await e
    .get(l.OpenAIFetcher)
    .fetchAndStreamCompletions(
      e,
      L,
      m.TelemetryData.createAndMarkAsIssued(),
      D,
      k
    );
  if ("failed" === M.type || "canceled" === M.type) {
    t.reportCancelled();
    e.get(u.StatusReporter).removeProgress();
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
    B = l.cleanupIndentChoices(B, w);
  }
  B = i.asyncIterableMapFilter(B, async (t) =>
    g.postProcessChoice(e, "solution", E, r, t, false, v)
  );
  const F = i.asyncIterableMapFilter(B, async (n) => {
    let i = n.completionText;
    v.info(e, `Open Copilot completion: [${n.completionText}]`);
    if (t.completionContext.completionType === s.CompletionType.OPEN_COPILOT) {
      let t = "";
      const o = await (0, d.getNodeStart)(e, E, r, n.completionText);
      if (o)
        [t] = (0, p.trimLastLine)(
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
  });
  return b(e.get(u.StatusReporter), k, F[Symbol.asyncIterator]());
};