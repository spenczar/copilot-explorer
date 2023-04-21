Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.computeScore =
  exports.FunctionJaccardMatcher =
  exports.IndentationBasedJaccardMatcher =
  exports.FixedWindowSizeJaccardMatcher =
    undefined;
const n = require(64505);
const i = require(11864);
class FixedWindowSizeJaccardMatcher extends i.WindowedMatcher {
  constructor(e, t) {
    super(e);
    this.windowLength = t;
  }
  id() {
    return "fixed:" + this.windowLength;
  }
  getWindowsDelineations(e) {
    const t = [];
    const r = e.length;
    for (let e = 0; 0 == e || e < r - this.windowLength; e++) {
      const n = Math.min(e + this.windowLength, r);
      t.push([e, n]);
    }
    return t;
  }
  trimDocument(e) {
    return e.source
      .slice(0, e.offset)
      .split("\n")
      .slice(-this.windowLength)
      .join("\n");
  }
  similarityScore(e, t) {
    return computeScore(e, t);
  }
}
exports.FixedWindowSizeJaccardMatcher = FixedWindowSizeJaccardMatcher;
FixedWindowSizeJaccardMatcher.FACTORY = (e) => ({
  to: (t) => new FixedWindowSizeJaccardMatcher(t, e),
});
class IndentationBasedJaccardMatcher extends i.WindowedMatcher {
  constructor(e, t, r) {
    super(e);
    this.indentationMinLength = t;
    this.indentationMaxLength = r;
    this.languageId = e.languageId;
  }
  id() {
    return `indent:${this.indentationMinLength}:${this.indentationMaxLength}:${this.languageId}`;
  }
  getWindowsDelineations(e) {
    return n.getWindowsDelineations(
      e,
      this.languageId,
      this.indentationMinLength,
      this.indentationMaxLength
    );
  }
  trimDocument(e) {
    return e.source
      .slice(0, e.offset)
      .split("\n")
      .slice(-this.indentationMaxLength)
      .join("\n");
  }
  similarityScore(e, t) {
    return computeScore(e, t);
  }
}
exports.IndentationBasedJaccardMatcher = IndentationBasedJaccardMatcher;
IndentationBasedJaccardMatcher.FACTORY = (e, t) => ({
  to: (r) => new IndentationBasedJaccardMatcher(r, e, t),
});
class FunctionJaccardMatcher extends i.FunctionalMatcher {
  id() {
    return "function";
  }
  getWindowsDelineations(e) {
    return [];
  }
  constructor(e, t) {
    super(e);
    this.windowLength = t;
  }
  trimDocument(e) {
    return e.source
      .slice(0, e.offset)
      .split("\n")
      .slice(-this.windowLength)
      .join("\n");
  }
  similarityScore(e, t) {
    return computeScore(e, t);
  }
}
function computeScore(e, t) {
  const r = new Set();
  e.forEach((e) => {
    if (t.has(e)) {
      r.add(e);
    }
  });
  return r.size / (e.size + t.size - r.size);
}
exports.FunctionJaccardMatcher = FunctionJaccardMatcher;
FunctionJaccardMatcher.FACTORY = (e) => ({
  to: (t) => new FunctionJaccardMatcher(t, e),
});
exports.computeScore = computeScore;