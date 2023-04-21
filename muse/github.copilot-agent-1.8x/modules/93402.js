Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.postInsertionTasks =
  exports.postRejectionTasks =
  exports.captureCode =
  exports.postInsertConfiguration =
    undefined;
const n = require(25135);
const i = require(41749);
const o = require(5798);
const s = require(47917);
const a = require(24090);
const c = require(59558);
const l = require(65489);
const u = require(70216);
const d = require(20913);
const p = require(70819);
const h = new o.Logger(o.LogLevel.INFO, "post-insertion");
const f = [
  {
    seconds: 15,
    captureCode: false,
    captureRejection: false,
  },
  {
    seconds: 30,
    captureCode: true,
    captureRejection: true,
  },
  {
    seconds: 120,
    captureCode: false,
    captureRejection: false,
  },
  {
    seconds: 300,
    captureCode: false,
    captureRejection: false,
  },
  {
    seconds: 600,
    captureCode: false,
    captureRejection: false,
  },
];
async function captureCode(e, t, r) {
  const n = await e.get(p.TextDocumentManager).getTextDocument(t);
  if (!n) {
    h.info(
      e,
      `Could not get document for ${t.fsPath}. Maybe it was closed by the editor.`
    );
    return {
      prompt: {
        prefix: "",
        suffix: "",
        isFimEnabled: false,
        promptElementRanges: [],
      },
      capturedCode: "",
      terminationOffset: 0,
    };
  }
  const i = n.getText();
  const o = i.substring(0, r);
  const c = n.positionAt(r);
  const l = await a.extractPrompt(e, n, c);
  const u =
    "prompt" === l.type
      ? l.prompt
      : {
          prefix: o,
          suffix: "",
          isFimEnabled: false,
          promptElementRanges: [],
        };
  const d = i.substring(r);
  const f = s.contextIndentationFromText(o, r, n.languageId);
  const g = s.indentationBlockFinished(f, undefined);
  const m = await g(d);
  const y = Math.min(i.length, r + (m ? 2 * m : 500));
  return {
    prompt: u,
    capturedCode: i.substring(r, y),
    terminationOffset: m ?? -1,
  };
}
function m(e, t, r, n) {
  const i = e.substring(
    Math.max(0, n - r),
    Math.min(e.length, n + t.length + r)
  );
  const o = c.lexEditDistance(i, t);
  const s = o.lexDistance / o.needleLexLength;
  const { distance: a } = c.editDistance(
    i.substring(o.startOffset, o.endOffset),
    t
  );
  return {
    relativeLexEditDistance: s,
    charEditDistance: a,
    completionLexLength: o.needleLexLength,
    foundOffset: o.startOffset + Math.max(0, n - r),
    lexEditDistance: o.lexDistance,
    stillInCodeHeuristic: s <= 0.5 ? 1 : 0,
  };
}
exports.postInsertConfiguration = {
  triggerPostInsertionSynchroneously: false,
};
exports.captureCode = captureCode;
exports.postRejectionTasks = function (e, t, r, o, s) {
  s.forEach(({ completionText: r, completionTelemetryData: n }) => {
    h.debug(e, `${t}.rejected choiceIndex: ${n.properties.choiceIndex}`);
    i.telemetryRejected(e, t, n);
  });
  const a = new n.ChangeTracker(e, o, r);
  f.filter((e) => e.captureRejection).map((n) => {
    a.push(async () => {
      h.debug(e, `Original offset: ${r}, Tracked offset: ${a.offset}`);
      const { completionTelemetryData: i } = s[0];
      const {
        prompt: c,
        capturedCode: u,
        terminationOffset: d,
      } = await captureCode(e, o, a.offset);
      let p;
      p = c.isFimEnabled
        ? {
            hypotheticalPromptPrefixJson: JSON.stringify(c.prefix),
            hypotheticalPromptSuffixJson: JSON.stringify(c.suffix),
          }
        : {
            hypotheticalPromptJson: JSON.stringify(c.prefix),
          };
      const f = i.extendedBy(
        {
          ...p,
          capturedCodeJson: JSON.stringify(u),
        },
        {
          timeout: n.seconds,
          insertionOffset: r,
          trackedOffset: a.offset,
          terminationOffsetInCapturedCode: d,
        }
      );
      h.debug(
        e,
        `${t}.capturedAfterRejected choiceIndex: ${i.properties.choiceIndex}`,
        f
      );
      l.telemetry(e, t + ".capturedAfterRejected", f, true);
    }, 1e3 * n.seconds);
  });
};
exports.postInsertionTasks = async function (e, r, o, s, a, c) {
  h.debug(e, `${r}.accepted choiceIndex: ${c.properties.choiceIndex}`);
  i.telemetryAccepted(e, r, c);
  const y = o.trim();
  const v = new n.ChangeTracker(e, a, s);
  const _ = async (t) => {
    await (async function (e, t, r, n, i, o, s, a) {
      const c = await e.get(p.TextDocumentManager).getTextDocument(i);
      if (c) {
        const u = c.getText();
        let d = m(u, r, 50, a.offset);
        if (d.stillInCodeHeuristic) {
          d = m(u, r, 1500, a.offset);
        }
        h.debug(
          e,
          `stillInCode: ${
            d.stillInCodeHeuristic ? "Found" : "Not found"
          }! Completion '${r}' in file ${
            i.fsPath
          }. lexEditDistance fraction was ${
            d.relativeLexEditDistance
          }. Char edit distance was ${
            d.charEditDistance
          }. Inserted at ${n}, tracked at ${a.offset}, found at ${
            d.foundOffset
          }. choiceIndex: ${s.properties.choiceIndex}`
        );
        const p = s
          .extendedBy(
            {},
            {
              timeout: o.seconds,
              insertionOffset: n,
              trackedOffset: a.offset,
            }
          )
          .extendedBy({}, d);
        l.telemetry(e, t + ".stillInCode", p);
        if (o.captureCode) {
          const {
            prompt: r,
            capturedCode: c,
            terminationOffset: u,
          } = await captureCode(e, i, a.offset);
          let d;
          d = r.isFimEnabled
            ? {
                hypotheticalPromptPrefixJson: JSON.stringify(r.prefix),
                hypotheticalPromptSuffixJson: JSON.stringify(r.suffix),
              }
            : {
                hypotheticalPromptJson: JSON.stringify(r.prefix),
              };
          const f = s.extendedBy(
            {
              ...d,
              capturedCodeJson: JSON.stringify(c),
            },
            {
              timeout: o.seconds,
              insertionOffset: n,
              trackedOffset: a.offset,
              terminationOffsetInCapturedCode: u,
            }
          );
          h.debug(
            e,
            `${t}.capturedAfterAccepted choiceIndex: ${s.properties.choiceIndex}`,
            p
          ),
            (0, l.telemetry)(e, t + ".capturedAfterAccepted", f, !0);
        }
      }
    })(e, r, y, s, a, t, c, v);
  };
  if (
    exports.postInsertConfiguration.triggerPostInsertionSynchroneously &&
    d.isRunningInTest(e)
  ) {
    _({
      seconds: 0,
      captureCode: false,
      captureRejection: false,
    });
  } else {
    f.map((e) => v.push(() => _(e), 1e3 * e.seconds));
  }
  e.get(u.PostInsertionNotifier).emit("onPostInsertion", {
    ctx: e,
    insertionCategory: r,
    insertionOffset: s,
    fileURI: a,
    completionText: o,
    telemetryData: c,
  });
};