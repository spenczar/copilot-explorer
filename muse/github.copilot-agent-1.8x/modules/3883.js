Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.checkSuffix = exports.postProcessChoice = undefined;
const n = require(16905);
const i = require(2273);
const o = require(65489);
const s = require(20913);
const a = require(54604);
exports.postProcessChoice = async function (e, t, r, c, l, u, d) {
  if (
    a.isRepetitive(l.tokens, await e.get(n.Features).repetitionFilterMode())
  ) {
    const t = o.TelemetryData.createAndMarkAsIssued();
    t.extendWithRequestId(l.requestId);
    o.telemetry(e, "repetition.detected", t, true);
    return void d.info(e, "Filtered out repetitive solution");
  }
  const p = {
    ...l,
  };
  if (
    (function (e, t, r) {
      let n = "";
      let i = t.line + 1;
      for (; "" === n && i < e.lineCount; ) {
        n = e.lineAt(i).text.trim();
        if (n === r.trim()) return !0;
        i++;
      }
      return false;
    })(r, c, p.completionText)
  ) {
    const t = o.TelemetryData.createAndMarkAsIssued();
    t.extendWithRequestId(l.requestId);
    o.telemetry(e, "completion.alreadyInDocument", t);
    o.telemetry(
      e,
      "completion.alreadyInDocument",
      t.extendedBy({
        completionTextJson: JSON.stringify(p.completionText),
      }),
      true
    );
    return void d.info(e, "Filtered out solution matching next line");
  }
  p.completionText = await (async function (e, t, r, n, o) {
    if ("" === n) return n;
    let a = "}";
    try {
      a = i.getBlockCloseToken(t.languageId) ?? "}";
    } catch (e) {}
    let c = n.length;
    do {
      const i = n.lastIndexOf("\n", c - 2) + 1;
      const l = n.substring(i, c);
      if (l.trim() === a) {
        for (let e = r.line; e < t.lineCount; e++) {
          let s = t.lineAt(e).text;
          if (e === r.line) {
            s = s.substr(r.character);
          }
          if (s.startsWith(l.trimRight()))
            return n.substring(0, Math.max(0, o ? i : i - 1));
          if ("" !== s.trim()) break;
        }
        break;
      }
      if (c === i) {
        if (s.shouldFailForDebugPurposes(e))
          throw Error(
            `Aborting: maybeSnipCompletion would have looped on completion: ${n}`
          );
        break;
      }
      c = i;
    } while (c > 1);
    return n;
  })(e, r, c, p.completionText, u);
  return p.completionText ? p : undefined;
};
exports.checkSuffix = function (e, t, r) {
  const n = e.lineAt(t.line).text.substring(t.character);
  if (n.length > 0) {
    if (-1 !== r.completionText.indexOf(n)) return true;
    {
      let e = 0;
      for (const t of n) {
        const n = r.completionText.indexOf(t, e + 1);
        if (!(n > e)) {
          e = -1;
          break;
        }
        e = n;
      }
      return -1 !== e;
    }
  }
  return false;
};