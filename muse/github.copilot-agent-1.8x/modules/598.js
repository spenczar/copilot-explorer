Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getTemperatureForSamples =
  exports.calculateMeanAlternativeLogProb =
  exports.calculateMeanLogProb =
  exports.cleanupIndentChoices =
  exports.convertToAPIChoice =
  exports.DEFAULT_CHARACTER_MULTIPLIER =
  exports.MAX_PROMPT_LENGTH =
  exports.OpenAIFetcher =
  exports.LiveOpenAIFetcher =
  exports.getRequestId =
  exports.CopilotUiKind =
    undefined;
const n = require(39800);
const i = require(5798);
const o = require(65489);
const s = require(20913);
var a = require(52031);
function calculateMeanLogProb(e, t) {
  if (t?.logprobs?.token_logprobs)
    try {
      let e = 0;
      let r = 0;
      let n = 50;
      for (
        let i = 0;
        i < t.logprobs.token_logprobs.length - 1 && n > 0;
        i++, n--
      ) {
        e += t.logprobs.token_logprobs[i];
        r += 1;
      }
      return r > 0 ? e / r : undefined;
    } catch (t) {
      i.logger.error(e, `Error calculating mean prob: ${t}`);
    }
}
function calculateMeanAlternativeLogProb(e, t) {
  if (t?.logprobs?.top_logprobs)
    try {
      let e = 0;
      let r = 0;
      let n = 50;
      for (
        let i = 0;
        i < t.logprobs.token_logprobs.length - 1 && n > 0;
        i++, n--
      ) {
        const n = {
          ...t.logprobs.top_logprobs[i],
        };
        delete n[t.logprobs.tokens[i]];
        e += Math.max(...Object.values(n));
        r += 1;
      }
      return r > 0 ? e / r : undefined;
    } catch (t) {
      i.logger.error(e, `Error calculating mean prob: ${t}`);
    }
}
exports.CopilotUiKind = a.CopilotUiKind;
exports.getRequestId = a.getRequestId;
exports.LiveOpenAIFetcher = a.LiveOpenAIFetcher;
exports.OpenAIFetcher = a.OpenAIFetcher;
exports.MAX_PROMPT_LENGTH = 1500;
exports.DEFAULT_CHARACTER_MULTIPLIER = 3;
exports.convertToAPIChoice = function (e, t, r, n, i, s, a, u) {
  o.logEngineCompletion(e, t, r, i, n);
  return {
    completionText: t,
    meanLogProb: calculateMeanLogProb(e, r),
    meanAlternativeLogProb: calculateMeanAlternativeLogProb(e, r),
    choiceIndex: n,
    requestId: i,
    modelInfo: u,
    blockFinished: s,
    tokens: r.tokens,
    numTokens: r.tokens.length,
    telemetryData: a,
  };
};
exports.cleanupIndentChoices = async function* (e, t) {
  for await (const r of e) {
    const e = {
      ...r,
    };
    const n = e.completionText.split("\n");
    for (let e = 0; e < n.length; ++e) {
      const r = n[e].trimLeft();
      n[e] = "" === r ? r : t + r;
    }
    e.completionText = n.join("\n");
    yield e;
  }
};
exports.calculateMeanLogProb = calculateMeanLogProb;
exports.calculateMeanAlternativeLogProb = calculateMeanAlternativeLogProb;
exports.getTemperatureForSamples = function (e, t) {
  if (s.isRunningInTest(e)) return 0;
  const r = parseFloat(n.getConfig(e, n.ConfigKey.Temperature));
  return r >= 0 && r <= 1 ? r : t <= 1 ? 0 : t < 10 ? 0.2 : t < 20 ? 0.4 : 0.8;
};