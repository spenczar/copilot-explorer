Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.ghostTextScoreQuantile = exports.ghostTextScoreConfidence = undefined;
const n = require(5798);
const i = require(11523);
const o =
  (new n.Logger(n.LogLevel.INFO, "restraint"),
  {
    link: (e) => Math.exp(e) / (1 + Math.exp(e)),
    unlink: (e) => Math.log(e / (1 - e)),
  });
class s {
  constructor(e, t, r) {
    this.name = e;
    this.coefficient = t;
    this.transformation = r || ((e) => e);
  }
  contribution(e) {
    return this.coefficient * this.transformation(e);
  }
}
const a = new (class {
  constructor(e, t, r) {
    this.link = o;
    this.intercept = e;
    this.coefficients = t;
    this.logitsToQuantiles = new Map();
    this.logitsToQuantiles.set(0, 0);
    this.logitsToQuantiles.set(1, 1);
    if (r) for (const e in r) this.logitsToQuantiles.set(r[e], Number(e));
  }
  predict(e, t) {
    let r = this.intercept;
    for (const e of this.coefficients) {
      const n = t[e.name];
      if (undefined === n) return NaN;
      r += e.contribution(n);
    }
    return this.link.link(r);
  }
  quantile(e, t) {
    return (function (e, t) {
      const r = Math.min(...Array.from(t.keys()).filter((t) => t >= e));
      const n = Math.max(...Array.from(t.keys()).filter((t) => t < e));
      const i = t.get(r);
      const o = t.get(n);
      return o + ((i - o) * (e - n)) / (r - n);
    })(this.predict(e, t), this.logitsToQuantiles);
  }
})(
  i.ghostTextDisplayInterceptParameter,
  [
    new s("compCharLen", i.ghostTextDisplayLog1pcompCharLenParameter, (e) =>
      Math.log(1 + e)
    ),
    new s("meanLogProb", i.ghostTextDisplayMeanLogProbParameter),
    new s(
      "meanAlternativeLogProb",
      i.ghostTextDisplayMeanAlternativeLogProbParameter
    ),
  ].concat(
    Object.entries(i.ghostTextDisplayLanguageParameters).map(
      (e) => new s(e[0], e[1])
    )
  ),
  i.ghostTextDisplayQuantiles
);
exports.ghostTextScoreConfidence = function (e, t) {
  const r = {
    ...t.measurements,
  };
  Object.keys(i.ghostTextDisplayLanguageParameters).forEach((e) => {
    r[e] = t.properties["customDimensions.languageId"] == e ? 1 : 0;
  });
  return a.predict(e, r);
};
exports.ghostTextScoreQuantile = function (e, t) {
  const r = {
    ...t.measurements,
  };
  Object.keys(i.ghostTextDisplayLanguageParameters).forEach((e) => {
    r[e] = t.properties["customDimensions.languageId"] == e ? 1 : 0;
  });
  return a.quantile(e, r);
};