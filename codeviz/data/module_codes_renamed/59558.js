function editDistance(e, t, r = (e, t) => (e === t ? 0 : 1)) {
  if (0 === t.length || 0 === e.length)
    return {
      distance: t.length,
      startOffset: 0,
      endOffset: 0,
    };
  let n = new Array(t.length + 1).fill(0);
  let i = new Array(t.length + 1).fill(0);
  let o = new Array(e.length + 1).fill(0);
  let s = new Array(e.length + 1).fill(0);
  let a = t[0];
  for (let t = 0; t < e.length + 1; t++) {
    n[t] = 0 === t ? 1 : r(e[t - 1], a, t - 1, 0);
    i[t] = t > 0 ? t - 1 : 0;
  }
  for (let c = 1; c < t.length; c++) {
    let l = o;
    o = n;
    n = l;
    l = s;
    s = i;
    i = l;
    a = t[c];
    n[0] = c + 1;
    for (let t = 1; t < e.length + 1; t++) {
      const l = 1 + o[t];
      const u = 1 + n[t - 1];
      const d = r(e[t - 1], a, t - 1, c) + o[t - 1];
      n[t] = Math.min(u, l, d);
      if (n[t] === d) {
        i[t] = s[t - 1];
      } else {
        if (n[t] === l) {
          i[t] = s[t];
        } else {
          i[t] = i[t - 1];
        }
      }
    }
  }
  let c = 0;
  for (let t = 0; t < e.length + 1; t++)
    if (n[t] < n[c]) {
      c = t;
    }
  return {
    distance: n[c],
    startOffset: i[c],
    endOffset: c,
  };
}
function emptyLexDictionary() {
  return new Map();
}
function reverseLexDictionary(e) {
  const t = new Array(e.size);
  for (const [r, n] of e) t[n] = r;
  return t;
}
function* lexGeneratorWords(e) {
  let t;
  let r = "";
  !(function (e) {
    e[(e.Word = 0)] = "Word";
    e[(e.Space = 1)] = "Space";
    e[(e.Other = 2)] = "Other";
  })(t || (t = {}));
  let n = t.Word;
  for (const i of e) {
    let e;
    e = /(\p{L}|\p{Nd}|_)/u.test(i) ? t.Word : " " === i ? t.Space : t.Other;
    if (e === n && e !== t.Other) {
      r += i;
    } else {
      if (r.length > 0) {
        yield r;
      }
      r = i;
      n = e;
    }
  }
  if (r.length > 0) {
    yield r;
  }
}
function lexicalAnalyzer(e, t, r, n) {
  const i = [];
  let o = 0;
  for (const s of r(e)) {
    if (n(s)) {
      if (t.has(s)) {
        t.set(s, t.size);
      }
      i.push([t.get(s), o]);
    }
    o += s.length;
  }
  return [i, t];
}
function a(e) {
  return " " !== e;
}
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.lexEditDistance =
  exports.lexicalAnalyzer =
  exports.lexGeneratorWords =
  exports.reverseLexDictionary =
  exports.emptyLexDictionary =
  exports.editDistance =
    undefined;
exports.editDistance = editDistance;
exports.emptyLexDictionary = emptyLexDictionary;
exports.reverseLexDictionary = reverseLexDictionary;
exports.lexGeneratorWords = lexGeneratorWords;
exports.lexicalAnalyzer = lexicalAnalyzer;
exports.lexEditDistance = function (e, t, c = lexGeneratorWords) {
  const [l, u] = lexicalAnalyzer(e, emptyLexDictionary(), c, a);
  const [d, p] = lexicalAnalyzer(t, u, c, a);
  if (0 === d.length || 0 === l.length)
    return {
      lexDistance: d.length,
      startOffset: 0,
      endOffset: 0,
      haystackLexLength: l.length,
      needleLexLength: d.length,
    };
  const h = reverseLexDictionary(p);
  const f = d.length;
  const g = h[d[0][0]];
  const m = h[d[f - 1][0]];
  const y = editDistance(
    l.map((e) => e[0]),
    d.map((e) => e[0]),
    function (e, t, r, n) {
      if (0 === n || n === f - 1) {
        const e = h[l[r][0]];
        return (0 == n && e.endsWith(g)) || (n == f - 1 && e.startsWith(m))
          ? 0
          : 1;
      }
      return e === t ? 0 : 1;
    }
  );
  const v = l[y.startOffset][1];
  let _ = y.endOffset < l.length ? l[y.endOffset][1] : e.length;
  if (_ > 0 && " " === e[_ - 1]) {
    --_;
  }
  return {
    lexDistance: y.distance,
    startOffset: v,
    endOffset: _,
    haystackLexLength: l.length,
    needleLexLength: d.length,
  };
};
