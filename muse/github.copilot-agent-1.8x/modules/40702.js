Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getGhostText =
  exports.completionCache =
  exports.ResultType =
  exports.ghostTextLogger =
    undefined;
const n = require(44617);
const i = require(76679);
const o = require(7057);
const s = require(70140);
const a = require(83940);
const c = require(11661);
const l = require(39800);
const u = require(70769);
const d = require(16905);
const p = require(20190);
const h = require(5798);
const f = require(20039);
const g = require(47553);
const m = require(52031);
const y = require(598);
const v = require(86635);
const _ = require(47917);
const b = require(24090);
const w = require(3591);
const C = require(71153);
const E = require(3883);
const T = require(65489);
const S = require(20913);
const x = require(52369);
const k = require(96817);
const I = require(54619);
const A = require(41749);
var P;
let R;
let N;
let O;
async function L(e, r, n, i, o, s, a) {
  exports.ghostTextLogger.debug(e, `Getting ${s} from network`);
  n = n.extendedBy();
  const c = await (async function (e, t) {
    const r = await e.get(d.Features).overrideNumGhostCompletions();
    return r
      ? t.isCycling
        ? Math.max(0, 3 - r)
        : r
      : l.shouldDoParsingTrimming(t.blockMode) && t.multiline
      ? l.getConfig(e, l.ConfigKey.InlineSuggestCount)
      : t.isCycling
      ? 2
      : 1;
  })(e, r);
  const p = y.getTemperatureForSamples(e, c);
  const h = {
    stream: true,
    n: c,
    temperature: p,
    extra: {
      language: r.languageId,
      next_indent: r.indentation.next ?? 0,
      trim_by_indentation: l.shouldDoServerTrimming(r.blockMode),
    },
  };
  if (r.multiline) {
    h.stop = ["\n"];
  }
  if (r.multiline && r.multiLogitBias) {
    h.logit_bias = {
      50256: -100,
    };
  }
  const g = Date.now();
  const v = {
    endpoint: "completions",
    uiKind: m.CopilotUiKind.GhostText,
    isCycling: JSON.stringify(r.isCycling),
    temperature: JSON.stringify(p),
    n: JSON.stringify(c),
    stop: JSON.stringify(h.stop) ?? "unset",
    logit_bias: JSON.stringify(h.logit_bias ?? null),
  };
  const _ = T.telemetrizePromptLength(r.prompt);
  Object.assign(n.properties, v);
  Object.assign(n.measurements, _);
  try {
    const s = {
      prompt: r.prompt,
      languageId: r.languageId,
      repoInfo: r.repoInfo,
      ourRequestId: r.ourRequestId,
      engineUrl: r.engineURL,
      count: c,
      uiKind: m.CopilotUiKind.GhostText,
      postOptions: h,
    };
    if (r.delayMs > 0) {
      await new Promise((e) => setTimeout(e, r.delayMs));
    }
    const l = await e
      .get(m.OpenAIFetcher)
      .fetchAndStreamCompletions(e, s, n, o, i);
    return "failed" === l.type
      ? {
          type: "failed",
          reason: l.reason,
          telemetryData: A.mkBasicResultTelemetry(n),
        }
      : "canceled" === l.type
      ? (exports.ghostTextLogger.debug(
          e,
          "Cancelled after awaiting fetchCompletions"
        ),
        {
          type: "canceled",
          reason: l.reason,
          telemetryData: A.mkCanceledResultTelemetry(n),
        })
      : a(c, g, l.getProcessingTime(), l.choices);
  } catch (r) {
    if (f.isAbortError(r))
      return {
        type: "canceled",
        reason: "network request aborted",
        telemetryData: A.mkCanceledResultTelemetry(n, {
          cancelledNetworkRequest: true,
        }),
      };
    exports.ghostTextLogger.error(e, `Error on ghost text request ${r}`);
    e.get(u.UserErrorNotifier).notifyUser(e, r);
    if ((0, S.shouldFailForDebugPurposes)(e)) throw r;
    return {
      type: "failed",
      reason: "non-abort error on ghost text request",
      telemetryData: A.mkBasicResultTelemetry(n),
    };
  }
}
function D(e, t) {
  const r = {
    ...e,
  };
  r.completionText = e.completionText.trimEnd();
  if (t.forceSingleLine) {
    r.completionText = r.completionText.split("\n")[0];
  }
  return r;
}
exports.ghostTextLogger = new h.Logger(h.LogLevel.INFO, "ghostText");
(function (e) {
  e[(e.Network = 0)] = "Network";
  e[(e.Cache = 1)] = "Cache";
  e[(e.TypingAsSuggested = 2)] = "TypingAsSuggested";
  e[(e.Cycling = 3)] = "Cycling";
})((P = exports.ResultType || (exports.ResultType = {})));
exports.completionCache = new s.LRUCache(100);
const M = new a.Debouncer();
function B(e, t, r) {
  R = e;
  N = t;
  O = r;
}
function F(e, r, n) {
  const i = s.keyForPrompt(r.prompt);
  const o = exports.completionCache.get(i);
  if (o && o.multiline === n.multiline) {
    exports.completionCache.put(i, {
      multiline: o.multiline,
      choices: o.choices.concat(n.choices),
    });
  } else {
    exports.completionCache.put(i, n);
  }
  exports.ghostTextLogger.debug(
    e,
    `Appended cached ghost text for key: ${i}, multiline: ${n.multiline}, number of suggestions: ${n.choices.length}`
  );
}
function j(e, r) {
  const n = exports.completionCache.get(e);
  if (n && (!r || n.multiline)) return n.choices;
}
function U(e, t, r) {
  if (r.length > 0) {
    if (t.startsWith(r))
      return {
        completionIndex: e,
        completionText: t,
        displayText: t.substr(r.length),
        displayNeedsWsOffset: false,
      };
    {
      const n = t.substr(0, t.length - t.trimLeft().length);
      return r.startsWith(n)
        ? {
            completionIndex: e,
            completionText: t,
            displayText: t.trimLeft(),
            displayNeedsWsOffset: true,
          }
        : {
            completionIndex: e,
            completionText: t,
            displayText: t,
            displayNeedsWsOffset: false,
          };
    }
  }
  return {
    completionIndex: e,
    completionText: t,
    displayText: t,
    displayNeedsWsOffset: false,
  };
}
function $(e, r) {
  const n = r.requestId;
  const i = {
    choiceIndex: r.choiceIndex.toString(),
  };
  const o = {
    numTokens: r.numTokens,
    compCharLen: r.completionText.length,
    numLines: r.completionText.split("\n").length,
  };
  if (r.meanLogProb) {
    o.meanLogProb = r.meanLogProb;
  }
  if (r.meanAlternativeLogProb) {
    o.meanAlternativeLogProb = r.meanAlternativeLogProb;
  }
  const s = r.telemetryData.extendedBy(i, o);
  s.extendWithRequestId(n);
  s.measurements.confidence = C.ghostTextScoreConfidence(e, s);
  s.measurements.quantile = C.ghostTextScoreQuantile(e, s);
  exports.ghostTextLogger.debug(
    e,
    `Extended telemetry for ${r.telemetryData.properties.headerRequestId} with retention confidence ${s.measurements.confidence} (expected as good or better than about ${s.measurements.quantile} of all suggestions)`
  );
  return s;
}
function q(e, t, r, n, i) {
  const o = Date.now() - n;
  const s = o - i;
  const a = r.telemetryData.extendedBy(
    {},
    {
      completionCharLen: r.completionText.length,
      requestTimeMs: o,
      processingTimeMs: i,
      deltaMs: s,
      meanLogProb: r.meanLogProb || NaN,
      meanAlternativeLogProb: r.meanAlternativeLogProb || NaN,
      numTokens: r.numTokens,
    }
  );
  a.extendWithRequestId(r.requestId);
  T.telemetry(e, `ghostText.${t}`, a);
}
exports.getGhostText = async function (e, r, a, u, h, f) {
  const y = await b.extractPrompt(e, r, a);
  if ("contextTooShort" === y.type) {
    exports.ghostTextLogger.debug(e, "Breaking, not enough context");
    return {
      type: "abortedBeforeIssued",
      reason: "Not enough context",
    };
  }
  if (f?.isCancellationRequested) {
    exports.ghostTextLogger.info(e, "Cancelled after extractPrompt");
    return {
      type: "abortedBeforeIssued",
      reason: "Cancelled after extractPrompt",
    };
  }
  const C = (function (e, t) {
    const r =
      ((i = t), 0 != e.lineAt(i).text.substr(i.character).trim().length);
    const n = (function (e, t) {
      const r = t.lineAt(e).text.substr(e.character).trim();
      return /^\s*[)}\]"'`]*\s*[:{;,]?\s*$/.test(r);
    })(t, e);
    var i;
    if (r && !n) return;
    return r && n;
  })(r, a);
  if (undefined === C) {
    exports.ghostTextLogger.debug(e, "Breaking, invalid middle of the line");
    return {
      type: "abortedBeforeIssued",
      reason: "Invalid middle of the line",
    };
  }
  const H = e.get(v.StatusReporter);
  const V = e.get(x.LocationFactory);
  const z = await (async function (e, t, r, i, o, s) {
    const a = await e.get(l.BlockModeConfig).forLanguage(e, t.languageId);
    switch (a) {
      case l.BlockMode.Server:
        return {
          blockMode: l.BlockMode.Server,
          requestMultiline: true,
          isCyclingRequest: o,
          finishedCb: async (e) => {},
        };
      case l.BlockMode.Parsing:
      case l.BlockMode.ParsingAndServer:
      default: {
        const c = await (async function (e, t, r, i) {
          if (t.lineCount >= 8e3)
            T.telemetry(
              e,
              "ghostText.longFileMultilineSkip",
              T.TelemetryData.createAndMarkAsIssued({
                languageId: t.languageId,
                lineCount: String(t.lineCount),
                currentLine: String(r.line),
              })
            );
          else {
            if (!i && n.isSupportedLanguageId(t.languageId))
              return await _.isEmptyBlockStart(t, r);
            if (i && n.isSupportedLanguageId(t.languageId))
              return (
                (await _.isEmptyBlockStart(t, r)) ||
                (await _.isEmptyBlockStart(t, t.lineAt(r).range.end))
              );
          }
          return false;
        })(e, t, r, s);
        return c
          ? {
              blockMode: a,
              requestMultiline: true,
              isCyclingRequest: false,
              finishedCb: async (n) => {
                let o;
                o =
                  i.trailingWs.length > 0 &&
                  !i.prompt.prefix.endsWith(i.trailingWs)
                    ? e
                        .get(x.LocationFactory)
                        .position(
                          r.line,
                          Math.max(r.character - i.trailingWs.length, 0)
                        )
                    : r;
                return _.isBlockBodyFinished(e, t, o, n);
              },
            }
          : {
              blockMode: a,
              requestMultiline: false,
              isCyclingRequest: o,
              finishedCb: async (e) => {},
            };
      }
    }
  })(e, r, a, y, u, C);
  if (f?.isCancellationRequested) {
    exports.ghostTextLogger.info(e, "Cancelled after requestMultiline");
    return {
      type: "abortedBeforeIssued",
      reason: "Cancelled after requestMultiline",
    };
  }
  const [K] = b.trimLastLine(r.getText(V.range(V.position(0, 0), a)));
  let W = (function (e, r, n, i) {
    const o = (function (e, r, n, i) {
      const o = !!R && r.startsWith(R);
      const s = null != N && n.suffix == N;
      if (!(R && O && o && s)) return;
      const a = j(O, i);
      if (!a) return;
      const c = r.substring(R.length);
      exports.ghostTextLogger.debug(
        e,
        `Getting completions for user-typing flow - remaining prefix: ${c}`
      );
      const l = [];
      a.forEach((e) => {
        const t = D(e, {
          forceSingleLine: false,
        });
        if (t.completionText.startsWith(c)) {
          t.completionText = t.completionText.substring(c.length);
          l.push(t);
        }
      });
      return l;
    })(e, r, n, i);
    if (o && o.length > 0) return [o, P.TypingAsSuggested];
    const a = (function (e, r, n, i) {
      const o = s.keyForPrompt(n);
      exports.ghostTextLogger.debug(
        e,
        `Trying to get completions from cache for key: ${o}`
      );
      const a = j(o, i);
      if (a) {
        exports.ghostTextLogger.debug(
          e,
          `Got completions from cache for key: ${o}`
        );
        const s = [];
        a.forEach((e) => {
          const t = D(e, {
            forceSingleLine: !i,
          });
          s.push(t);
        });
        const c = s.filter((e) => e.completionText);
        if (c.length > 0) {
          B(r, n.suffix, o);
        }
        return c;
      }
    })(e, r, n, i);
    return a && a.length > 0 ? [a, P.Cache] : undefined;
  })(e, K, y.prompt, z.requestMultiline);
  const G = o.v4();
  const Q = w.extractRepoInfoInBackground(e, r.fileName);
  const J = w.getDogFood(Q);
  const Y = await w.getUserKind(e);
  const X = await g.getEngineURL(
    e,
    w.tryGetGitHubNWO(Q),
    r.languageId,
    J,
    Y,
    h
  );
  const Z = await e
    .get(d.Features)
    .beforeRequestWaitMs(w.tryGetGitHubNWO(Q) || "", r.languageId, Y, J);
  const ee = await e
    .get(d.Features)
    .multiLogitBias(w.tryGetGitHubNWO(Q) || "", r.languageId, Y, J);
  const te = {
    blockMode: z.blockMode,
    languageId: r.languageId,
    repoInfo: Q,
    engineURL: X,
    ourRequestId: G,
    prefix: K,
    prompt: y.prompt,
    multiline: z.requestMultiline,
    indentation: _.contextIndentation(r, a),
    isCycling: u,
    delayMs: Z,
    multiLogitBias: ee,
  };
  const re = await e.get(d.Features).debouncePredict();
  const ne = await e.get(d.Features).contextualFilterEnable();
  const ie = await e.get(d.Features).contextualFilterAcceptThreshold();
  const oe = await e.get(d.Features).contextualFilterEnableTree();
  const se = await e.get(d.Features).contextualFilterExplorationTraffic();
  let ae = false;
  if (re || ne) {
    ae = true;
  }
  const ce = (await e.get(p.LanguageDetection).detectLanguage(r)).languageId;
  const le = (function (e, t, r, n, o, s, a, c, l) {
    const u = e.get(x.LocationFactory);
    const d = t.lineAt(o.line);
    const p = t.getText(u.range(d.range.start, o));
    const h = t.getText(u.range(o, d.range.end));
    const f = {
      languageId: t.languageId,
      beforeCursorWhitespace: JSON.stringify("" === p.trim()),
      afterCursorWhitespace: JSON.stringify("" === h.trim()),
    };
    if (t.languageId !== r) {
      f.detectedLanguageId = r;
    }
    const g = {
      ...T.telemetrizePromptLength(s.prompt),
      promptEndPos: t.offsetAt(o),
      documentLength: t.getText().length,
      delayMs: n.delayMs,
    };
    const y = a.extendedBy(f, g);
    y.properties.promptChoices = JSON.stringify(s.promptChoices, (e, t) =>
      t instanceof Map
        ? Array.from(t.entries()).reduce(
            (e, [t, r]) => ({
              ...e,
              [t]: r,
            }),
            {}
          )
        : t
    );
    y.properties.promptBackground = JSON.stringify(s.promptBackground, (e, t) =>
      t instanceof Map ? Array.from(t.values()) : t
    );
    const v = Array.from(s.neighborSource.entries()).map((e) => [
      e[0],
      e[1].map((e) => i.SHA256(e).toString()),
    ]);
    y.properties.neighborSource = JSON.stringify(v);
    y.measurements.promptComputeTimeMs = s.computeTimeMs;
    if (c) {
      y.measurements.contextualFilterScore = k.contextualFilterScore(
        e,
        y,
        s.prompt,
        l
      );
    }
    const _ = n.repoInfo;
    y.properties.gitRepoInformation =
      undefined === _
        ? "unavailable"
        : _ === w.ComputationStatus.PENDING
        ? "pending"
        : "available";
    if (undefined !== _ && _ !== w.ComputationStatus.PENDING) {
      y.properties.gitRepoUrl = _.url;
      y.properties.gitRepoHost = _.hostname;
      y.properties.gitRepoOwner = _.owner;
      y.properties.gitRepoName = _.repo;
      y.properties.gitRepoPath = _.pathname;
    }
    y.properties.engineName = m.extractEngineName(e, n.engineURL);
    y.properties.isMultiline = JSON.stringify(n.multiline);
    y.properties.blockMode = n.blockMode;
    y.properties.isCycling = JSON.stringify(n.isCycling);
    y.properties.headerRequestId = n.ourRequestId;
    T.telemetry(e, "ghostText.issued", y);
    return y;
  })(e, r, ce, te, a, y, h, ae, oe);
  if (
    (z.isCyclingRequest && (W?.[0].length ?? 0) > 1) ||
    (!z.isCyclingRequest && undefined !== W)
  )
    exports.ghostTextLogger.info(e, "Found inline suggestions locally");
  else {
    H?.setProgress();
    if (z.isCyclingRequest) {
      const r = await (async function (e, r, n, i, o) {
        return L(e, r, n, i, o, "all completions", async (o, s, a, c) => {
          const l = [];
          for await (const r of c) {
            if (i?.isCancellationRequested)
              return (
                exports.ghostTextLogger.debug(
                  e,
                  "Cancelled after awaiting choices iterator"
                ),
                {
                  type: "canceled",
                  reason: "after awaiting choices iterator",
                  telemetryData: (0, A.mkCanceledResultTelemetry)(n),
                }
              );
            if (r.completionText.trimEnd()) {
              if (
                -1 !==
                l.findIndex(
                  (e) => e.completionText.trim() === r.completionText.trim()
                )
              )
                continue;
              l.push(r);
            }
          }
          return (
            l.length > 0 &&
              (F(e, r, {
                multiline: r.multiline,
                choices: l,
              }),
              q(e, "cyclingPerformance", l[0], s, a)),
            {
              type: "success",
              value: l,
              telemetryData: (0, A.mkBasicResultTelemetry)(n),
              telemetryBlob: n,
            }
          );
        });
      })(e, te, le, f, z.finishedCb);
      if ("success" === r.type) {
        const e = W?.[0] ?? [];
        r.value.forEach((t) => {
          -1 ===
            e.findIndex(
              (e) => e.completionText.trim() === t.completionText.trim()
            ) && e.push(t);
        }),
          (W = [e, P.Cycling]);
      } else if (void 0 === W) return H?.removeProgress(), r;
    } else {
      const r = await (0, I.getDebounceLimit)(e, le);
      try {
        await M.debounce(r);
      } catch {
        return {
          type: "canceled",
          reason: "by debouncer",
          telemetryData: (0, A.mkCanceledResultTelemetry)(le),
        };
      }
      if (f?.isCancellationRequested)
        return (
          exports.ghostTextLogger.info(e, "Cancelled during debounce"),
          {
            type: "canceled",
            reason: "during debounce",
            telemetryData: (0, A.mkCanceledResultTelemetry)(le),
          }
        );
      if (
        ne &&
        le.measurements.contextualFilterScore &&
        le.measurements.contextualFilterScore < ie / 100 &&
        Math.random() < 1 - se / 100
      )
        return (
          exports.ghostTextLogger.info(e, "Cancelled by contextual filter"),
          {
            type: "canceled",
            reason: "contextualFilterScore below threshold",
            telemetryData: (0, A.mkCanceledResultTelemetry)(le),
          }
        );
      const n = await (async function (e, r, n, i, o) {
        return L(e, r, n, i, o, "completions", async (o, a, c, l) => {
          const u = l[Symbol.asyncIterator](),
            d = await u.next();
          if (d.done)
            return (
              exports.ghostTextLogger.debug(e, "All choices redacted"),
              {
                type: "empty",
                reason: "all choices redacted",
                telemetryData: (0, A.mkBasicResultTelemetry)(n),
              }
            );
          if (i?.isCancellationRequested)
            return (
              exports.ghostTextLogger.debug(
                e,
                "Cancelled after awaiting redactedChoices iterator"
              ),
              {
                type: "canceled",
                reason: "after awaiting redactedChoices iterator",
                telemetryData: (0, A.mkCanceledResultTelemetry)(n),
              }
            );
          const p = d.value;
          if (void 0 === p)
            return (
              exports.ghostTextLogger.debug(
                e,
                "Got undefined choice from redactedChoices iterator"
              ),
              {
                type: "empty",
                reason: "got undefined choice from redactedChoices iterator",
                telemetryData: (0, A.mkBasicResultTelemetry)(n),
              }
            );
          q(e, "performance", p, a, c);
          const h = o - 1;
          exports.ghostTextLogger.debug(
            e,
            `Awaited first result, id:  ${p.choiceIndex}`
          ),
            (function (e, r, n) {
              const i = (0, s.keyForPrompt)(r.prompt);
              B(r.prefix, r.prompt.suffix, i),
                exports.completionCache.put(i, n),
                exports.ghostTextLogger.debug(
                  e,
                  `Cached ghost text for key: ${i}, multiline: ${n.multiline}, number of suggestions: ${n.choices.length}`
                );
            })(e, r, {
              multiline: r.multiline,
              choices: [p],
            });
          const f = [];
          for (let e = 0; e < h; e++) f.push(u.next());
          const g = Promise.all(f).then((n) => {
            u.next(),
              exports.ghostTextLogger.debug(
                e,
                `Awaited remaining results, number of results: ${n.length}`
              );
            const i = [];
            for (const r of n) {
              const n = r.value;
              if (
                void 0 !== n &&
                (exports.ghostTextLogger.info(
                  e,
                  `GhostText later completion: [${n.completionText}]`
                ),
                n.completionText.trimEnd())
              ) {
                if (
                  -1 !==
                  i.findIndex(
                    (e) => e.completionText.trim() === n.completionText.trim()
                  )
                )
                  continue;
                if (n.completionText.trim() === p.completionText.trim())
                  continue;
                i.push(n);
              }
            }
            i.length > 0 &&
              F(e, r, {
                multiline: r.multiline,
                choices: i,
              });
          });
          return (
            (0, S.isRunningInTest)(e) && (await g),
            {
              type: "success",
              value: D(d.value, {
                forceSingleLine: !1,
              }),
              telemetryData: (0, A.mkBasicResultTelemetry)(n),
              telemetryBlob: n,
            }
          );
        });
      })(e, te, le, f, z.finishedCb);
      if ("success" !== n.type) return H?.removeProgress(), n;
      W = [[n.value], P.Network];
    }
    H?.removeProgress();
  }
  if (undefined === W)
    return {
      type: "failed",
      reason: "internal error: choices should be defined after network call",
      telemetryData: A.mkBasicResultTelemetry(le),
    };
  const [ue, de] = W;
  const pe = c.asyncIterableMapFilter(c.asyncIterableFromArray(ue), async (n) =>
    E.postProcessChoice(e, "ghostText", r, a, n, C, exports.ghostTextLogger)
  );
  const he = [];
  for await (const n of pe) {
    const i = C && E.checkSuffix(r, a, n);
    if (f?.isCancellationRequested) {
      exports.ghostTextLogger.info(
        e,
        "Cancelled after post processing completions"
      );
      return {
        type: "canceled",
        reason: "after post processing completions",
        telemetryData: A.mkCanceledResultTelemetry(le),
      };
    }
    const o = $(e, n);
    const s = {
      completion: U(n.choiceIndex, n.completionText, y.trailingWs),
      telemetry: o,
      isMiddleOfTheLine: C,
      coversSuffix: i,
    };
    he.push(s);
  }
  return {
    type: "success",
    value: [he, de],
    telemetryData: A.mkBasicResultTelemetry(le),
    telemetryBlob: le,
  };
};