Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.prepareSolutionForReturn =
  exports.SSEProcessor =
  exports.splitChunk =
    undefined;
const n = require(16905);
const i = require(5798);
const o = require(65489);
const s = require(598);
const a = new i.Logger(i.LogLevel.INFO, "streamChoices");
class c {
  constructor() {
    this.logprobs = [];
    this.top_logprobs = [];
    this.text = [];
    this.tokens = [];
    this.text_offset = [];
  }
  append(e) {
    this.text.push(e.text);
    if (e.logprobs) {
      this.tokens.push(e.logprobs.tokens ?? []);
      this.text_offset.push(e.logprobs.text_offset ?? []);
      this.logprobs.push(e.logprobs.token_logprobs ?? []);
      this.top_logprobs.push(e.logprobs.top_logprobs ?? []);
    }
  }
}
function splitChunk(e) {
  const t = e.split("\n");
  const r = t.pop();
  return [t.filter((e) => "" != e), r];
}
exports.splitChunk = splitChunk;
class SSEProcessor {
  constructor(e, t, r, n, i, o) {
    this.ctx = e;
    this.expectedNumChoices = t;
    this.response = r;
    this.body = n;
    this.telemetryData = i;
    this.cancellationToken = o;
    this.requestId = s.getRequestId(this.response);
    this.stats = new d(this.expectedNumChoices);
    this.solutions = {};
  }
  static async create(e, t, r, n, i) {
    const o = await r.body();
    o.setEncoding("utf8");
    return new SSEProcessor(e, t, r, o, n, i);
  }
  async *processSSE(e = async () => {}) {
    try {
      yield* this.processSSEInner(e);
    } finally {
      this.cancel();
      a.info(
        this.ctx,
        `request done: headerRequestId: [${this.requestId.headerRequestId}] model deployment ID: [${this.requestId.deploymentId}]`
      );
      a.debug(this.ctx, `request stats: ${this.stats}`);
    }
  }
  async *processSSEInner(e) {
    const t = (await this.ctx.get(n.Features).dropCompletionReasons()) ?? [
      "content_filter",
    ];
    let r = "";
    e: for await (const n of this.body) {
      if (this.maybeCancel("after awaiting body chunk")) return;
      a.debug(this.ctx, "chunk", n.toString());
      const [i, u] = splitChunk(r + n.toString());
      r = u;
      for (const r of i) {
        const n = r.slice("data:".length).trim();
        if ("[DONE]" == n) return void (yield* this.finishSolutions());
        let i;
        try {
          i = JSON.parse(n);
        } catch (e) {
          a.error(this.ctx, "Error parsing JSON stream data", r);
          continue;
        }
        if (undefined !== i.choices) {
          if (0 == this.requestId.created) {
            this.requestId = s.getRequestId(this.response, i);
            if (0 == this.requestId.created) {
              a.error(
                this.ctx,
                `Request id invalid, should have "completionId" and "created": ${this.requestId}`,
                this.requestId
              );
            }
          }
          if (this.allSolutionsDone()) break e;
          for (let r = 0; r < i.choices.length; r++) {
            const n = i.choices[r];
            a.debug(this.ctx, "choice", n);
            this.stats.add(n.index);
            if (n.index in this.solutions) {
              this.solutions[n.index] = new c();
            }
            const s = this.solutions[n.index];
            if (null == s) continue;
            let l;
            s.append(n);
            if (
              (n.finish_reason || n.text.indexOf("\n") > -1) &&
              ((l = await e(s.text.join(""))),
              this.maybeCancel("after awaiting finishedCb"))
            )
              return;
            if (!n.finish_reason && undefined === l) continue;
            const u = n.finish_reason ?? "client-trimmed";
            o.telemetry(
              this.ctx,
              "completion.finishReason",
              this.telemetryData.extendedBy({
                completionChoiceFinishReason: u,
              })
            );
            if (t.includes(n.finish_reason)) {
              this.solutions[n.index] = null;
            } else {
              this.stats.markYielded(n.index);
              yield {
                solution: s,
                finishOffset: l,
                reason: n.finish_reason,
                requestId: this.requestId,
                index: n.index,
              };
            }
            if (this.maybeCancel("after yielding finished choice")) return;
            this.solutions[n.index] = null;
          }
        } else if (undefined !== i.error) {
          a.error(this.ctx, "Error in response:", i.error.message);
        } else {
          a.error(this.ctx, "Unexpected response with no choices or error");
        }
      }
    }
    for (const [e, t] of Object.entries(this.solutions)) {
      const r = Number(e);
      if (
        null != t &&
        (this.stats.markYielded(r),
        yield {
          solution: t,
          finishOffset: undefined,
          reason: "Iteration Done",
          requestId: this.requestId,
          index: r,
        },
        this.maybeCancel("after yielding after iteration done"))
      )
        return;
    }
    if (r.length > 0)
      try {
        const e = JSON.parse(r);
        if (undefined !== e.error) {
          a.error(this.ctx, `Error in response: ${e.error.message}`, e.error);
        }
      } catch (e) {
        a.error(this.ctx, `Error parsing extraData: ${r}`);
      }
  }
  async *finishSolutions() {
    for (const [e, t] of Object.entries(this.solutions)) {
      const r = Number(e);
      if (
        null != t &&
        (this.stats.markYielded(r),
        yield {
          solution: t,
          finishOffset: undefined,
          reason: "DONE",
          requestId: this.requestId,
          index: r,
        },
        this.maybeCancel("after yielding on DONE"))
      )
        return;
    }
  }
  maybeCancel(e) {
    return (
      !!this.cancellationToken?.isCancellationRequested &&
      (a.debug(this.ctx, "Cancelled: " + e), this.cancel(), true)
    );
  }
  cancel() {
    this.body.destroy();
  }
  allSolutionsDone() {
    const e = Object.values(this.solutions);
    return e.length == this.expectedNumChoices && e.every((e) => null == e);
  }
}
exports.SSEProcessor = SSEProcessor;
exports.prepareSolutionForReturn = function (e, t, r) {
  let n = t.solution.text.join("");
  let i = false;
  if (undefined !== t.finishOffset) {
    a.debug(e, `solution ${t.index}: early finish at offset ${t.finishOffset}`);
    n = n.substring(0, t.finishOffset);
    i = true;
  }
  a.info(e, `solution ${t.index} returned. finish reason: [${t.reason}]`);
  a.debug(
    e,
    `solution ${t.index} details: finishOffset: [${t.finishOffset}] completionId: [{${t.requestId.completionId}}] created: [{${t.requestId.created}}]`
  );
  const o = (function (e, t) {
    const r = {
      text: t.text.join(""),
      tokens: t.text,
    };
    if (0 === t.logprobs.length) return r;
    const n = t.logprobs.reduce((e, t) => e.concat(t), []);
    const i = t.top_logprobs.reduce((e, t) => e.concat(t), []);
    const o = t.text_offset.reduce((e, t) => e.concat(t), []);
    const s = t.tokens.reduce((e, t) => e.concat(t), []);
    return {
      ...r,
      logprobs: {
        token_logprobs: n,
        top_logprobs: i,
        text_offset: o,
        tokens: s,
      },
    };
  })(0, t.solution);
  return s.convertToAPIChoice(e, n, o, t.index, t.requestId, i, r);
};
class d {
  constructor(e) {
    this.choices = new Map();
    for (let t = 0; t < e; t++) this.choices.set(t, new p());
  }
  add(e) {
    this.choices.get(e).increment();
  }
  markYielded(e) {
    this.choices.get(e).markYielded();
  }
  toString() {
    return Array.from(this.choices.entries())
      .map(([e, t]) => `${e}: ${t.yieldedTokens} -> ${t.seenTokens}`)
      .join(", ");
  }
}
class p {
  constructor() {
    this.yieldedTokens = -1;
    this.seenTokens = 0;
  }
  increment() {
    this.seenTokens++;
  }
  markYielded() {
    this.yieldedTokens = this.seenTokens;
  }
}