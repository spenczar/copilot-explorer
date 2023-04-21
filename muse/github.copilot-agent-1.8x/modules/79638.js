Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.handleGetPanelCompletions = undefined;
const n = require(892);
const i = require(86236);
const o = require(76679);
const s = require(7057);
const a = require(35809);
const c = require(16630);
const l = require(39800);
const u = require(75611);
const d = require(75680);
const p = require(36317);
const h = require(5798);
const f = require(65489);
const g = require(52369);
const m = require(9321);
const y = require(69582);
const v = require(57214);
const _ = require(5381);
const b = require(7838);
const w = require(6159);
const C = require(42401);
const E = require(8730);
const T = require(56056);
const S = n.Type.Object({
  doc: n.Type.Object({
    position: n.Type.Object({
      line: n.Type.Number({
        minimum: 0,
      }),
      character: n.Type.Number({
        minimum: 0,
      }),
    }),
    uri: n.Type.String(),
    version: n.Type.Number(),
    source: n.Type.Optional(n.Type.String()),
    languageId: n.Type.Optional(n.Type.String()),
    relativePath: n.Type.Optional(n.Type.String()),
  }),
  panelId: n.Type.String(),
  options: n.Type.Optional(T.TestingOptions),
});
const x = new i.default().compile(n.Type.Strict(S));
class k {
  constructor(e, t, r, n, i) {
    this.textDocument = e;
    this.startPosition = t;
    this.completionContext = r;
    this.solutionCountTarget = n;
    this.cancellationToken = i;
    this.savedTelemetryData = f.TelemetryData.createAndMarkAsIssued();
  }
  reportCancelled() {}
  getCancellationToken() {
    return this.cancellationToken;
  }
  async getDocument() {
    return this.textDocument;
  }
}
async function I(e, t, r, n, i) {
  const s = await n;
  switch (s.status) {
    case "Solution":
      r.sendNotification(
        new a.NotificationType("PanelSolution"),
        (function (e, t, r) {
          const n = p.normalizeCompletionText(r.completionText);
          return {
            panelId: e,
            range: t,
            completionText: r.completionText,
            displayText: r.displayText,
            score: r.meanProb,
            solutionId: o.SHA256(n).toString(),
            docVersion: r.docVersion,
          };
        })(e, t, s.solution)
      );
      await I(e, t, r, s.next, i);
      break;
    case "FinishedNormally":
      await A(e, r, i);
      break;
    case "FinishedWithError":
      r.sendNotification(new a.NotificationType("PanelSolutionsDone"), {
        status: "Error",
        message: s.error,
        panelId: e,
      });
      i();
  }
}
async function A(e, t, r) {
  t.sendNotification(new a.NotificationType("PanelSolutionsDone"), {
    status: "OK",
    panelId: e,
  });
  r();
}
let P;
exports.handleGetPanelCompletions = async function (e, t, r, n, i) {
  if (P) {
    P.cancel();
    P.dispose();
  }
  P = new y.CancellationTokenSource();
  const o = new y.MergedToken([t, P.token]);
  if (!x(r)) {
    const e = _.extractAjvErrors(x.errors);
    return [
      null,
      {
        code: _.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  let a;
  let f;
  if (undefined !== r.options?.testingCtx) {
    e = w.getTestingContext(r.options.testingCtx);
  }
  const T = l.getConfig(e, l.ConfigKey.ListCount);
  let S;
  try {
    S = e.get(E.PanelCompletionDocuments);
  } catch (e) {}
  if (S) {
    const e = s.v4();
    const t = S.documents;
    const n = async (i) => {
      if (i >= T || i >= t.length)
        return {
          status: "FinishedNormally",
        };
      const { text: o, score: a } = t[i];
      const {
        cursorLine: c,
        lines: l,
        start: u,
      } = b.parseChallengeDoc(o, r.doc.position);
      const d = [c.slice(Math.min(u.character, r.doc.position.character))]
        .concat(l.slice(r.doc.position.line + 1))
        .join("\n");
      return {
        status: "Solution",
        solution: {
          requestId: {
            headerRequestId: e,
            completionId: s.v4(),
            created: 0,
            serverExperiments: "",
            deploymentId: "",
          },
          completionText: d,
          displayText: d,
          meanProb: a,
          meanLogProb: -1,
          choiceIndex: i,
          prependToCompletion: "",
          docVersion: r.doc.version,
        },
        next: n(i + 1),
      };
    };
    f = r.doc.position;
    a = n(0);
  } else {
    const t = await m.createRequestContext(e, n);
    if (!(t instanceof u.Context)) return [null, t];
    const s = c.URI.parse(r.doc.uri);
    let l;
    try {
      l = await C.getTextDocumentChecked(e, s, r.doc);
      if (l.version !== r.doc.version)
        return (
          new h.Logger(h.LogLevel.DEBUG, "getPanelCompletions").debug(
            e,
            `Producing empty solutions due to document version mismatch. Panel completions requested for document version ${r.doc.version} but document version was ${l.version}.`
          ),
          (function (e, t, r) {
            return (
              A(t.panelId, e.get(v.AgentNotificationSender), r ?? (() => {})),
              [
                {
                  solutionCountTarget: 0,
                },
                null,
              ]
            );
          })(e, r, i)
        );
    } catch (e) {
      return [
        null,
        {
          code: _.ErrorCode.InvalidParams,
          message: e.message,
        },
      ];
    }
    const y = l.offsetAt(
      t
        .get(g.LocationFactory)
        .position(r.doc.position.line, r.doc.position.character)
    );
    f = l.positionAt(y);
    const b = d.completionContextForDocument(e, l, f);
    const w = new k(l, f, b, T, o);
    a = p.launchSolutions(t, w);
    e = t;
  }
  setImmediate(() =>
    I(
      r.panelId,
      e.get(g.LocationFactory).range(f, f),
      e.get(v.AgentNotificationSender),
      a,
      i ?? (() => {})
    )
  );
  return [
    {
      solutionCountTarget: T,
    },
    null,
  ];
};