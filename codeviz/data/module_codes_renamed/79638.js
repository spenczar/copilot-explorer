Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.handleGetPanelCompletions = undefined;
const M_TypeBox_maybe = require("TypeBox");
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_require_manager_maybe = require("require-manager");
const M_url_opener = require("url-opener");
const M_connection_manager_maybe = require("connection-manager");
const M_Path_Parsing_Utils_maybe = require("Path-Parsing-Utils");
const M_editor_config_constants_maybe = require("editor-config-constants");
const M_ContextManager_maybe = require("ContextManager");
const M_completion_context_manager_maybe = require("completion-context-manager");
const M_SolutionLauncherManager_maybe = require("SolutionLauncherManager");
const M_LoggingUtils_maybe = require("LoggingUtils");
const M_TelemetryReporterModule_maybe = require("TelemetryReporterModule");
const M_LocationFactoryModule_maybe = require("LocationFactoryModule");
const M_AuthManagerModule_maybe = require("AuthManagerModule");
const M_CancellationTokenManager_maybe = require("CancellationTokenManager");
const M_NotificationSenderModule_maybe = require("NotificationSenderModule");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const M_ChallengeParserUtils_maybe = require("ChallengeParserUtils");
const M_TestContextManager_maybe = require("TestContextManager");
const M_AgentTextDocumentManager_maybe = require("AgentTextDocumentManager");
const M_PanelCompletionDocumentsManager_maybe = require("PanelCompletionDocumentsManager");
const M_TestingOptionsManager_maybe = require("TestingOptionsManager");
const S = M_TypeBox_maybe.Type.Object({
  doc: M_TypeBox_maybe.Type.Object({
    position: M_TypeBox_maybe.Type.Object({
      line: M_TypeBox_maybe.Type.Number({
        minimum: 0,
      }),
      character: M_TypeBox_maybe.Type.Number({
        minimum: 0,
      }),
    }),
    uri: M_TypeBox_maybe.Type.String(),
    version: M_TypeBox_maybe.Type.Number(),
    source: M_TypeBox_maybe.Type.Optional(M_TypeBox_maybe.Type.String()),
    languageId: M_TypeBox_maybe.Type.Optional(M_TypeBox_maybe.Type.String()),
    relativePath: M_TypeBox_maybe.Type.Optional(M_TypeBox_maybe.Type.String()),
  }),
  panelId: M_TypeBox_maybe.Type.String(),
  options: M_TypeBox_maybe.Type.Optional(
    M_TestingOptionsManager_maybe.TestingOptions
  ),
});
const x = new M_schema_code_generator_maybe.default().compile(
  M_TypeBox_maybe.Type.Strict(S)
);
class k {
  constructor(e, t, r, n, i) {
    this.textDocument = e;
    this.startPosition = t;
    this.completionContext = r;
    this.solutionCountTarget = n;
    this.cancellationToken = i;
    this.savedTelemetryData =
      M_TelemetryReporterModule_maybe.TelemetryData.createAndMarkAsIssued();
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
        new M_connection_manager_maybe.NotificationType("PanelSolution"),
        (function (e, t, r) {
          const n = M_SolutionLauncherManager_maybe.normalizeCompletionText(
            r.completionText
          );
          return {
            panelId: e,
            range: t,
            completionText: r.completionText,
            displayText: r.displayText,
            score: r.meanProb,
            solutionId: M_require_manager_maybe.SHA256(n).toString(),
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
      r.sendNotification(
        new M_connection_manager_maybe.NotificationType("PanelSolutionsDone"),
        {
          status: "Error",
          message: s.error,
          panelId: e,
        }
      );
      i();
  }
}
async function A(e, t, r) {
  t.sendNotification(
    new M_connection_manager_maybe.NotificationType("PanelSolutionsDone"),
    {
      status: "OK",
      panelId: e,
    }
  );
  r();
}
let P;
exports.handleGetPanelCompletions = async function (e, t, r, n, i) {
  if (P) {
    P.cancel();
    P.dispose();
  }
  P = new M_CancellationTokenManager_maybe.CancellationTokenSource();
  const o = new M_CancellationTokenManager_maybe.MergedToken([t, P.token]);
  if (!x(r)) {
    const e = M_AjvErrorManager_maybe.extractAjvErrors(x.errors);
    return [
      null,
      {
        code: M_AjvErrorManager_maybe.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  let a;
  let f;
  if (undefined !== r.options?.testingCtx) {
    e = M_TestContextManager_maybe.getTestingContext(r.options.testingCtx);
  }
  const T = M_editor_config_constants_maybe.getConfig(
    e,
    M_editor_config_constants_maybe.ConfigKey.ListCount
  );
  let S;
  try {
    S = e.get(M_PanelCompletionDocumentsManager_maybe.PanelCompletionDocuments);
  } catch (e) {}
  if (S) {
    const e = M_url_opener.v4();
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
      } = M_ChallengeParserUtils_maybe.parseChallengeDoc(o, r.doc.position);
      const d = [c.slice(Math.min(u.character, r.doc.position.character))]
        .concat(l.slice(r.doc.position.line + 1))
        .join("\n");
      return {
        status: "Solution",
        solution: {
          requestId: {
            headerRequestId: e,
            completionId: M_url_opener.v4(),
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
    const t = await M_AuthManagerModule_maybe.createRequestContext(e, n);
    if (!(t instanceof M_ContextManager_maybe.Context)) return [null, t];
    const s = M_Path_Parsing_Utils_maybe.URI.parse(r.doc.uri);
    let l;
    try {
      l = await M_AgentTextDocumentManager_maybe.getTextDocumentChecked(
        e,
        s,
        r.doc
      );
      if (l.version !== r.doc.version)
        return (
          new M_LoggingUtils_maybe.Logger(
            M_LoggingUtils_maybe.LogLevel.DEBUG,
            "getPanelCompletions"
          ).debug(
            e,
            `Producing empty solutions due to document version mismatch. Panel completions requested for document version ${r.doc.version} but document version was ${l.version}.`
          ),
          (function (e, t, r) {
            return (
              A(
                t.panelId,
                e.get(M_NotificationSenderModule_maybe.AgentNotificationSender),
                r ?? (() => {})
              ),
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
          code: M_AjvErrorManager_maybe.ErrorCode.InvalidParams,
          message: e.message,
        },
      ];
    }
    const y = l.offsetAt(
      t
        .get(M_LocationFactoryModule_maybe.LocationFactory)
        .position(r.doc.position.line, r.doc.position.character)
    );
    f = l.positionAt(y);
    const b = M_completion_context_manager_maybe.completionContextForDocument(
      e,
      l,
      f
    );
    const w = new k(l, f, b, T, o);
    a = M_SolutionLauncherManager_maybe.launchSolutions(t, w);
    e = t;
  }
  setImmediate(() =>
    I(
      r.panelId,
      e.get(M_LocationFactoryModule_maybe.LocationFactory).range(f, f),
      e.get(M_NotificationSenderModule_maybe.AgentNotificationSender),
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
