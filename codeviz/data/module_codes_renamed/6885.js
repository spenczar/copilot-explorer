Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.findEditDistanceScore = undefined;
exports.findEditDistanceScore = function (e, t) {
  if (0 === e.length || 0 === t.length)
    return {
      score: e.length + t.length,
    };
  const r = Array.from({
    length: e.length,
  }).map(() =>
    Array.from({
      length: t.length,
    }).map(() => 0)
  );
  for (let t = 0; t < e.length; t++) r[t][0] = t;
  for (let e = 0; e < t.length; e++) r[0][e] = e;
  for (let n = 0; n < t.length; n++)
    for (let i = 0; i < e.length; i++)
      r[i][n] = Math.min(
        (0 == i ? n : r[i - 1][n]) + 1,
        (0 == n ? i : r[i][n - 1]) + 1,
        (0 == i || 0 == n ? Math.max(i, n) : r[i - 1][n - 1]) +
          (e[i] == t[n] ? 0 : 1)
      );
  return {
    score: r[e.length - 1][t.length - 1],
  };
};
