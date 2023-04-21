Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.contextualFilterScore =
  exports.getLastLineLength =
  exports.ContextualFilterManager =
    undefined;
const n = require(80187);
const i = require(54725);
class ContextualFilterManager {
  constructor() {
    this.previousLabel = 0;
    this.previousLabelTimestamp = Date.now() - 3600;
    this.probabilityAccept = 0;
  }
}
function getLastLineLength(e) {
  const t = e.split("\n");
  return t[t.length - 1].length;
}
exports.ContextualFilterManager = ContextualFilterManager;
exports.getLastLineLength = getLastLineLength;
exports.contextualFilterScore = function (e, t, r, a) {
  const c = e.get(ContextualFilterManager);
  const l = c.previousLabel;
  let u = 0;
  if (
    "afterCursorWhitespace" in t.properties &&
    "true" === t.properties.afterCursorWhitespace
  ) {
    u = 1;
  }
  const d = (Date.now() - c.previousLabelTimestamp) / 1e3;
  const p = Math.log(1 + d);
  let h = 0;
  let f = 0;
  const g = r.prefix;
  if (g) {
    h = Math.log(1 + getLastLineLength(g));
    const e = g.slice(-1);
    if (undefined !== n.contextualFilterCharacterMap[e]) {
      f = n.contextualFilterCharacterMap[e];
    }
  }
  let m = 0;
  let y = 0;
  const v = g.trimEnd();
  if (v) {
    m = Math.log(1 + getLastLineLength(v));
    const e = v.slice(-1);
    if (undefined !== n.contextualFilterCharacterMap[e]) {
      y = n.contextualFilterCharacterMap[e];
    }
  }
  let _ = 0;
  if ("documentLength" in t.measurements) {
    const e = t.measurements.documentLength;
    _ = Math.log(1 + e);
  }
  let b = 0;
  if ("promptEndPos" in t.measurements) {
    const e = t.measurements.promptEndPos;
    b = Math.log(1 + e);
  }
  let w = 0;
  if ("promptEndPos" in t.measurements && "documentLength" in t.measurements) {
    const e = t.measurements.documentLength;
    w = (t.measurements.promptEndPos + 0.5) / (1 + e);
  }
  let C = 0;
  if (undefined !== n.contextualFilterLanguageMap[t.properties.languageId]) {
    C = n.contextualFilterLanguageMap[t.properties.languageId];
  }
  let E = 0;
  if (a) {
    const e = new Array(221).fill(0);
    e[0] = l;
    e[1] = u;
    e[2] = p;
    e[3] = h;
    e[4] = m;
    e[5] = _;
    e[6] = b;
    e[7] = w;
    e[8 + C] = 1;
    e[29 + f] = 1;
    e[125 + y] = 1;
    E = i.treeScore(e)[1];
  } else {
    let e = n.contextualFilterIntercept;
    e += n.contextualFilterWeights[0] * l;
    e += n.contextualFilterWeights[1] * u;
    e += n.contextualFilterWeights[2] * p;
    e += n.contextualFilterWeights[3] * h;
    e += n.contextualFilterWeights[4] * m;
    e += n.contextualFilterWeights[5] * _;
    e += n.contextualFilterWeights[6] * b;
    e += n.contextualFilterWeights[7] * w;
    e += n.contextualFilterWeights[8 + C];
    e += n.contextualFilterWeights[29 + f];
    e += n.contextualFilterWeights[125 + y];
    E = 1 / (1 + Math.exp(-e));
  }
  e.get(ContextualFilterManager).probabilityAccept = E;
  return E;
};