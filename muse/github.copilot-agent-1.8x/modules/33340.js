Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.handleGetCompletionsCycling = exports.handleGetCompletions = undefined;
const n = require(892);
const i = require(86236);
const o = require(7057);
const s = require(16630);
const a = require(75611);
const c = require(63993);
const l = require(40702);
const u = require(41749);
const d = require(5798);
const p = require(20039);
const h = require(65489);
const f = require(52369);
const g = require(9321);
const m = require(69582);
const y = require(53007);
const v = require(5381);
const _ = require(7838);
const b = require(6159);
const w = require(42401);
const C = require(22930);
const E = require(56056);
const T = n.Type.Object({
  doc: n.Type.Object({
    position: n.Type.Object({
      line: n.Type.Number({
        minimum: 0,
      }),
      character: n.Type.Number({
        minimum: 0,
      }),
    }),
    insertSpaces: n.Type.Optional(n.Type.Boolean()),
    tabSize: n.Type.Optional(n.Type.Number()),
    uri: n.Type.String(),
    version: n.Type.Number(),
    source: n.Type.Optional(n.Type.String()),
    languageId: n.Type.Optional(n.Type.String()),
    relativePath: n.Type.Optional(n.Type.String()),
  }),
  options: n.Type.Optional(E.TestingOptions),
});
const S = new i.default().compile(n.Type.Strict(T));
let x;
async function k(e, t, r, n, i) {
  const E = h.TelemetryData.createAndMarkAsIssued();
  if (x) {
    x.cancel();
    x.dispose();
  }
  x = new m.CancellationTokenSource();
  const T = new m.MergedToken([t, x.token]);
  if (!S(r)) {
    const e = v.extractAjvErrors(S.errors);
    return [
      null,
      {
        code: v.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  let k;
  if (undefined !== r.options?.testingCtx) {
    e = b.getTestingContext(r.options.testingCtx);
  }
  try {
    k = e.get(C.CompletionDocuments);
  } catch (e) {}
  if (k) {
    const e = i ? 3 : 1;
    return [
      {
        completions: k.documents.slice(0, e).map((e) => {
          const {
            cursorLine: t,
            lines: n,
            start: i,
            end: s,
          } = _.parseChallengeDoc(e, r.doc.position);
          const a = [t.slice(Math.min(i.character, r.doc.position.character))]
            .concat(n.slice(r.doc.position.line + 1))
            .join("\n");
          return {
            uuid: o.v4(),
            text: a,
            displayText: a,
            position: r.doc.position,
            range: {
              start: i,
              end: s,
            },
            docVersion: r.doc.version,
          };
        }),
      },
      null,
    ];
  }
  const I = await g.createRequestContext(e, n);
  if (!(I instanceof a.Context)) return [null, I];
  const A = s.URI.parse(r.doc.uri);
  let P;
  try {
    P = await w.getTextDocumentChecked(e, A, r.doc);
    if (P.version !== r.doc.version)
      return (
        (async function (e, t, r, n) {
          t.isCancellationRequested ||
            ((async function (e, t, r) {
              const n = h.TelemetryData.createAndMarkAsIssued({
                languageId: String(t.languageId),
                requestedDocumentVersion: String(r),
                actualDocumentVersion: String(t.version),
              });
              (0, h.telemetry)(e, "getCompletions.docVersionMismatch", n);
            })(e, r, n.doc.version),
            new d.Logger(d.LogLevel.DEBUG, "getCompletions").debug(
              e,
              `Producing empty completions due to document version mismatch. Completions requested for document version ${n.doc.version} but document version was ${r.version}.`
            ));
        })(e, T, P, r),
        [
          {
            completions: [],
          },
          null,
        ]
      );
  } catch (e) {
    return [
      null,
      {
        code: v.ErrorCode.InvalidParams,
        message: e.message,
      },
    ];
  }
  const R = P.offsetAt(
    I.get(f.LocationFactory).position(
      r.doc.position.line,
      r.doc.position.character
    )
  );
  const N = P.positionAt(R);
  const O = await (async function (e, t, r, n, i, o) {
    try {
      return await l.getGhostText(e, t, r, n, i, o);
    } catch (e) {
      if (p.isAbortError(e))
        return {
          type: "canceled",
          reason: "aborted at unknown location",
          telemetryData: u.mkCanceledResultTelemetry(i, {
            cancelledNetworkRequest: true,
          }),
        };
      throw e;
    }
  })(I, P, N, i, E, T);
  const L = await u.handleGhostTextResultTelemetry(e, O);
  if (!L)
    return [
      {
        completions: [],
      },
      null,
    ];
  const [D, M] = L;
  const B = c.completionsFromGhostTextResults(e, D, M, P, N, r.doc);
  const F = e.get(y.CopilotCompletionCache);
  for (const e of B) F.put(e.uuid, e);
  return [
    {
      completions: B.map((e) => ({
        uuid: e.uuid,
        text: e.text,
        range: e.range,
        displayText: e.displayText,
        position: e.position,
        docVersion: P.version,
      })),
    },
    null,
  ];
}
exports.handleGetCompletions = async function (e, t, r, n) {
  return k(e, t, r, n, false);
};
exports.handleGetCompletionsCycling = async function (e, t, r, n) {
  return k(e, t, r, n, true);
};