Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.handleGetCompletionsCycling = exports.handleGetCompletions = undefined;
const M_TypeBox_maybe = require("TypeBox");
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_url_opener = require("url-opener");
const M_Path_Parsing_Utils_maybe = require("Path-Parsing-Utils");
const M_ContextManager_maybe = require("ContextManager");
const M_CompletionTextManager_maybe = require("CompletionTextManager");
const M_GhostTextManager_maybe = require("GhostTextManager");
const M_ghost_text_telemetry_utils_maybe = require("ghost-text-telemetry-utils");
const M_LoggingUtils_maybe = require("LoggingUtils");
const M_FetcherRequestManager_maybe = require("FetcherRequestManager");
const M_TelemetryReporterModule_maybe = require("TelemetryReporterModule");
const M_LocationFactoryModule_maybe = require("LocationFactoryModule");
const M_AuthManagerModule_maybe = require("AuthManagerModule");
const M_CancellationTokenManager_maybe = require("CancellationTokenManager");
const M_CopilotCompletionCacheManager_maybe = require("CopilotCompletionCacheManager");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const M_ChallengeParserUtils_maybe = require("ChallengeParserUtils");
const M_TestContextManager_maybe = require("TestContextManager");
const M_AgentTextDocumentManager_maybe = require("AgentTextDocumentManager");
const M_CompletionDocumentsManager_maybe = require("CompletionDocumentsManager");
const M_TestingOptionsManager_maybe = require("TestingOptionsManager");
const T = M_TypeBox_maybe.Type.Object({
  doc: M_TypeBox_maybe.Type.Object({
    position: M_TypeBox_maybe.Type.Object({
      line: M_TypeBox_maybe.Type.Number({
        minimum: 0,
      }),
      character: M_TypeBox_maybe.Type.Number({
        minimum: 0,
      }),
    }),
    insertSpaces: M_TypeBox_maybe.Type.Optional(M_TypeBox_maybe.Type.Boolean()),
    tabSize: M_TypeBox_maybe.Type.Optional(M_TypeBox_maybe.Type.Number()),
    uri: M_TypeBox_maybe.Type.String(),
    version: M_TypeBox_maybe.Type.Number(),
    source: M_TypeBox_maybe.Type.Optional(M_TypeBox_maybe.Type.String()),
    languageId: M_TypeBox_maybe.Type.Optional(M_TypeBox_maybe.Type.String()),
    relativePath: M_TypeBox_maybe.Type.Optional(M_TypeBox_maybe.Type.String()),
  }),
  options: M_TypeBox_maybe.Type.Optional(
    M_TestingOptionsManager_maybe.TestingOptions
  ),
});
const S = new M_schema_code_generator_maybe.default().compile(
  M_TypeBox_maybe.Type.Strict(T)
);
let x;
async function k(e, t, r, n, i) {
  const E =
    M_TelemetryReporterModule_maybe.TelemetryData.createAndMarkAsIssued();
  if (x) {
    x.cancel();
    x.dispose();
  }
  x = new M_CancellationTokenManager_maybe.CancellationTokenSource();
  const T = new M_CancellationTokenManager_maybe.MergedToken([t, x.token]);
  if (!S(r)) {
    const e = M_AjvErrorManager_maybe.extractAjvErrors(S.errors);
    return [
      null,
      {
        code: M_AjvErrorManager_maybe.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  let k;
  if (undefined !== r.options?.testingCtx) {
    e = M_TestContextManager_maybe.getTestingContext(r.options.testingCtx);
  }
  try {
    k = e.get(M_CompletionDocumentsManager_maybe.CompletionDocuments);
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
          } = M_ChallengeParserUtils_maybe.parseChallengeDoc(e, r.doc.position);
          const a = [t.slice(Math.min(i.character, r.doc.position.character))]
            .concat(n.slice(r.doc.position.line + 1))
            .join("\n");
          return {
            uuid: M_url_opener.v4(),
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
  const I = await M_AuthManagerModule_maybe.createRequestContext(e, n);
  if (!(I instanceof M_ContextManager_maybe.Context)) return [null, I];
  const A = M_Path_Parsing_Utils_maybe.URI.parse(r.doc.uri);
  let P;
  try {
    P = await M_AgentTextDocumentManager_maybe.getTextDocumentChecked(
      e,
      A,
      r.doc
    );
    if (P.version !== r.doc.version)
      return (
        (async function (e, t, r, n) {
          t.isCancellationRequested ||
            ((async function (e, t, r) {
              const n =
                M_TelemetryReporterModule_maybe.TelemetryData.createAndMarkAsIssued(
                  {
                    languageId: String(t.languageId),
                    requestedDocumentVersion: String(r),
                    actualDocumentVersion: String(t.version),
                  }
                );
              (0, M_TelemetryReporterModule_maybe.telemetry)(
                e,
                "getCompletions.docVersionMismatch",
                n
              );
            })(e, r, n.doc.version),
            new M_LoggingUtils_maybe.Logger(
              M_LoggingUtils_maybe.LogLevel.DEBUG,
              "getCompletions"
            ).debug(
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
        code: M_AjvErrorManager_maybe.ErrorCode.InvalidParams,
        message: e.message,
      },
    ];
  }
  const R = P.offsetAt(
    I.get(M_LocationFactoryModule_maybe.LocationFactory).position(
      r.doc.position.line,
      r.doc.position.character
    )
  );
  const N = P.positionAt(R);
  const O = await (async function (e, t, r, n, i, o) {
    try {
      return await M_GhostTextManager_maybe.getGhostText(e, t, r, n, i, o);
    } catch (e) {
      if (M_FetcherRequestManager_maybe.isAbortError(e))
        return {
          type: "canceled",
          reason: "aborted at unknown location",
          telemetryData:
            M_ghost_text_telemetry_utils_maybe.mkCanceledResultTelemetry(i, {
              cancelledNetworkRequest: true,
            }),
        };
      throw e;
    }
  })(I, P, N, i, E, T);
  const L =
    await M_ghost_text_telemetry_utils_maybe.handleGhostTextResultTelemetry(
      e,
      O
    );
  if (!L)
    return [
      {
        completions: [],
      },
      null,
    ];
  const [D, M] = L;
  const B = M_CompletionTextManager_maybe.completionsFromGhostTextResults(
    e,
    D,
    M,
    P,
    N,
    r.doc
  );
  const F = e.get(M_CopilotCompletionCacheManager_maybe.CopilotCompletionCache);
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
