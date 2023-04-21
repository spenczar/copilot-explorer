Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.createConnection =
  exports.combineFeatures =
  exports.combineLanguagesFeatures =
  exports.combineWorkspaceFeatures =
  exports.combineWindowFeatures =
  exports.combineClientFeatures =
  exports.combineTracerFeatures =
  exports.combineTelemetryFeatures =
  exports.combineConsoleFeatures =
  exports._LanguagesImpl =
  exports.BulkUnregistration =
  exports.BulkRegistration =
  exports.ErrorMessageTracker =
  exports.TextDocuments =
    undefined;
const M_MessageConnectionManager_maybe = require("MessageConnectionManager");
const M_TypeChecker_maybe = require("TypeChecker");
const M_UUID_Generator_maybe = require("UUID_Generator");
const M_WorkDoneProgressManager_maybe = require("WorkDoneProgressManager");
const M_ConfigurationFeatureManager_maybe = require("ConfigurationFeatureManager");
const M_WorkspaceFoldersManager_maybe = require("WorkspaceFoldersManager");
const M_CallHierarchyManager_maybe = require("CallHierarchyManager");
const M_SemanticTokensManager_maybe = require("SemanticTokensManager");
const M_DocumentFeatureManager_maybe = require("DocumentFeatureManager");
const M_FileOperationsModule_maybe = require("FileOperationsModule");
const M_LinkedEditingRangeManager_maybe = require("LinkedEditingRangeManager");
const M_MonikerFeatureManager_maybe = require("MonikerFeatureManager");
function g(e) {
  if (null !== e) return e;
}
exports.TextDocuments = class {
  constructor(e) {
    this._documents = Object.create(null);
    this._configuration = e;
    this._onDidChangeContent = new M_MessageConnectionManager_maybe.Emitter();
    this._onDidOpen = new M_MessageConnectionManager_maybe.Emitter();
    this._onDidClose = new M_MessageConnectionManager_maybe.Emitter();
    this._onDidSave = new M_MessageConnectionManager_maybe.Emitter();
    this._onWillSave = new M_MessageConnectionManager_maybe.Emitter();
  }
  get onDidChangeContent() {
    return this._onDidChangeContent.event;
  }
  get onDidOpen() {
    return this._onDidOpen.event;
  }
  get onWillSave() {
    return this._onWillSave.event;
  }
  onWillSaveWaitUntil(e) {
    this._willSaveWaitUntil = e;
  }
  get onDidSave() {
    return this._onDidSave.event;
  }
  get onDidClose() {
    return this._onDidClose.event;
  }
  get(e) {
    return this._documents[e];
  }
  all() {
    return Object.keys(this._documents).map((e) => this._documents[e]);
  }
  keys() {
    return Object.keys(this._documents);
  }
  listen(e) {
    e.__textDocumentSync =
      M_MessageConnectionManager_maybe.TextDocumentSyncKind.Full;
    e.onDidOpenTextDocument((e) => {
      let t = e.textDocument;
      let r = this._configuration.create(
        t.uri,
        t.languageId,
        t.version,
        t.text
      );
      this._documents[t.uri] = r;
      let n = Object.freeze({
        document: r,
      });
      this._onDidOpen.fire(n);
      this._onDidChangeContent.fire(n);
    });
    e.onDidChangeTextDocument((e) => {
      let t = e.textDocument;
      let r = e.contentChanges;
      if (0 === r.length) return;
      let n = this._documents[t.uri];
      const { version: i } = t;
      if (null == i)
        throw new Error(
          `Received document change event for ${t.uri} without valid version identifier`
        );
      n = this._configuration.update(n, r, i);
      this._documents[t.uri] = n;
      this._onDidChangeContent.fire(
        Object.freeze({
          document: n,
        })
      );
    });
    e.onDidCloseTextDocument((e) => {
      let t = this._documents[e.textDocument.uri];
      if (t) {
        delete this._documents[e.textDocument.uri];
        this._onDidClose.fire(
          Object.freeze({
            document: t,
          })
        );
      }
    });
    e.onWillSaveTextDocument((e) => {
      let t = this._documents[e.textDocument.uri];
      if (t) {
        this._onWillSave.fire(
          Object.freeze({
            document: t,
            reason: e.reason,
          })
        );
      }
    });
    e.onWillSaveTextDocumentWaitUntil((e, t) => {
      let r = this._documents[e.textDocument.uri];
      return r && this._willSaveWaitUntil
        ? this._willSaveWaitUntil(
            Object.freeze({
              document: r,
              reason: e.reason,
            }),
            t
          )
        : [];
    });
    e.onDidSaveTextDocument((e) => {
      let t = this._documents[e.textDocument.uri];
      if (t) {
        this._onDidSave.fire(
          Object.freeze({
            document: t,
          })
        );
      }
    });
  }
};
exports.ErrorMessageTracker = class {
  constructor() {
    this._messages = Object.create(null);
  }
  add(e) {
    let t = this._messages[e];
    if (t) {
      t = 0;
    }
    t++;
    this._messages[e] = t;
  }
  sendErrors(e) {
    Object.keys(this._messages).forEach((t) => {
      e.window.showErrorMessage(t);
    });
  }
};
class m {
  constructor() {}
  rawAttach(e) {
    this._rawConnection = e;
  }
  attach(e) {
    this._connection = e;
  }
  get connection() {
    if (!this._connection)
      throw new Error("Remote is not attached to a connection yet.");
    return this._connection;
  }
  fillServerCapabilities(e) {}
  initialize(e) {}
  error(e) {
    this.send(M_MessageConnectionManager_maybe.MessageType.Error, e);
  }
  warn(e) {
    this.send(M_MessageConnectionManager_maybe.MessageType.Warning, e);
  }
  info(e) {
    this.send(M_MessageConnectionManager_maybe.MessageType.Info, e);
  }
  log(e) {
    this.send(M_MessageConnectionManager_maybe.MessageType.Log, e);
  }
  send(e, t) {
    if (this._rawConnection) {
      this._rawConnection.sendNotification(
        M_MessageConnectionManager_maybe.LogMessageNotification.type,
        {
          type: e,
          message: t,
        }
      );
    }
  }
}
const y = M_DocumentFeatureManager_maybe.ShowDocumentFeature(
  M_WorkDoneProgressManager_maybe.ProgressFeature(
    class {
      constructor() {}
      attach(e) {
        this._connection = e;
      }
      get connection() {
        if (!this._connection)
          throw new Error("Remote is not attached to a connection yet.");
        return this._connection;
      }
      initialize(e) {}
      fillServerCapabilities(e) {}
      showErrorMessage(e, ...t) {
        let r = {
          type: M_MessageConnectionManager_maybe.MessageType.Error,
          message: e,
          actions: t,
        };
        return this.connection
          .sendRequest(
            M_MessageConnectionManager_maybe.ShowMessageRequest.type,
            r
          )
          .then(g);
      }
      showWarningMessage(e, ...t) {
        let r = {
          type: M_MessageConnectionManager_maybe.MessageType.Warning,
          message: e,
          actions: t,
        };
        return this.connection
          .sendRequest(
            M_MessageConnectionManager_maybe.ShowMessageRequest.type,
            r
          )
          .then(g);
      }
      showInformationMessage(e, ...t) {
        let r = {
          type: M_MessageConnectionManager_maybe.MessageType.Info,
          message: e,
          actions: t,
        };
        return this.connection
          .sendRequest(
            M_MessageConnectionManager_maybe.ShowMessageRequest.type,
            r
          )
          .then(g);
      }
    }
  )
);
(exports.BulkRegistration || (exports.BulkRegistration = {})).create =
  function () {
    return new v();
  };
class v {
  constructor() {
    this._registrations = [];
    this._registered = new Set();
  }
  add(e, t) {
    const r = M_TypeChecker_maybe.string(e) ? e : e.method;
    if (this._registered.has(r))
      throw new Error(`${r} is already added to this registration`);
    const n = M_UUID_Generator_maybe.generateUuid();
    this._registrations.push({
      id: n,
      method: r,
      registerOptions: t || {},
    });
    this._registered.add(r);
  }
  asRegistrationParams() {
    return {
      registrations: this._registrations,
    };
  }
}
(exports.BulkUnregistration || (exports.BulkUnregistration = {})).create =
  function () {
    return new _(undefined, []);
  };
class _ {
  constructor(e, t) {
    this._connection = e;
    this._unregistrations = new Map();
    t.forEach((e) => {
      this._unregistrations.set(e.method, e);
    });
  }
  get isAttached() {
    return !!this._connection;
  }
  attach(e) {
    this._connection = e;
  }
  add(e) {
    this._unregistrations.set(e.method, e);
  }
  dispose() {
    let e = [];
    for (let t of this._unregistrations.values()) e.push(t);
    let t = {
      unregisterations: e,
    };
    this._connection
      .sendRequest(
        M_MessageConnectionManager_maybe.UnregistrationRequest.type,
        t
      )
      .then(undefined, (e) => {
        this._connection.console.info("Bulk unregistration failed.");
      });
  }
  disposeSingle(e) {
    const t = M_TypeChecker_maybe.string(e) ? e : e.method;
    const r = this._unregistrations.get(t);
    if (!r) return false;
    let o = {
      unregisterations: [r],
    };
    this._connection
      .sendRequest(
        M_MessageConnectionManager_maybe.UnregistrationRequest.type,
        o
      )
      .then(
        () => {
          this._unregistrations.delete(t);
        },
        (e) => {
          this._connection.console.info(
            `Un-registering request handler for ${r.id} failed.`
          );
        }
      );
    return true;
  }
}
class b {
  attach(e) {
    this._connection = e;
  }
  get connection() {
    if (!this._connection)
      throw new Error("Remote is not attached to a connection yet.");
    return this._connection;
  }
  initialize(e) {}
  fillServerCapabilities(e) {}
  register(e, t, r) {
    return e instanceof v
      ? this.registerMany(e)
      : e instanceof _
      ? this.registerSingle1(e, t, r)
      : this.registerSingle2(e, t);
  }
  registerSingle1(e, t, r) {
    const s = M_TypeChecker_maybe.string(t) ? t : t.method;
    const a = M_UUID_Generator_maybe.generateUuid();
    let c = {
      registrations: [
        {
          id: a,
          method: s,
          registerOptions: r || {},
        },
      ],
    };
    if (e.isAttached) {
      e.attach(this.connection);
    }
    return this.connection
      .sendRequest(M_MessageConnectionManager_maybe.RegistrationRequest.type, c)
      .then(
        (t) => (
          e.add({
            id: a,
            method: s,
          }),
          e
        ),
        (e) => (
          this.connection.console.info(
            `Registering request handler for ${s} failed.`
          ),
          Promise.reject(e)
        )
      );
  }
  registerSingle2(e, t) {
    const r = M_TypeChecker_maybe.string(e) ? e : e.method;
    const s = M_UUID_Generator_maybe.generateUuid();
    let a = {
      registrations: [
        {
          id: s,
          method: r,
          registerOptions: t || {},
        },
      ],
    };
    return this.connection
      .sendRequest(M_MessageConnectionManager_maybe.RegistrationRequest.type, a)
      .then(
        (e) =>
          M_MessageConnectionManager_maybe.Disposable.create(() => {
            this.unregisterSingle(s, r);
          }),
        (e) => (
          this.connection.console.info(
            `Registering request handler for ${r} failed.`
          ),
          Promise.reject(e)
        )
      );
  }
  unregisterSingle(e, t) {
    let r = {
      unregisterations: [
        {
          id: e,
          method: t,
        },
      ],
    };
    return this.connection
      .sendRequest(
        M_MessageConnectionManager_maybe.UnregistrationRequest.type,
        r
      )
      .then(undefined, (t) => {
        this.connection.console.info(
          `Un-registering request handler for ${e} failed.`
        );
      });
  }
  registerMany(e) {
    let t = e.asRegistrationParams();
    return this.connection
      .sendRequest(M_MessageConnectionManager_maybe.RegistrationRequest.type, t)
      .then(
        () =>
          new _(
            this._connection,
            t.registrations.map((e) => ({
              id: e.id,
              method: e.method,
            }))
          ),
        (e) => (
          this.connection.console.info("Bulk registration failed."),
          Promise.reject(e)
        )
      );
  }
}
const w = M_FileOperationsModule_maybe.FileOperationsFeature(
  M_WorkspaceFoldersManager_maybe.WorkspaceFoldersFeature(
    M_ConfigurationFeatureManager_maybe.ConfigurationFeature(
      class {
        constructor() {}
        attach(e) {
          this._connection = e;
        }
        get connection() {
          if (!this._connection)
            throw new Error("Remote is not attached to a connection yet.");
          return this._connection;
        }
        initialize(e) {}
        fillServerCapabilities(e) {}
        applyEdit(e) {
          let t =
            (r = e) && r.edit
              ? e
              : {
                  edit: e,
                };
          var r;
          return this.connection.sendRequest(
            M_MessageConnectionManager_maybe.ApplyWorkspaceEditRequest.type,
            t
          );
        }
      }
    )
  )
);
class C {
  constructor() {
    this._trace = M_MessageConnectionManager_maybe.Trace.Off;
  }
  attach(e) {
    this._connection = e;
  }
  get connection() {
    if (!this._connection)
      throw new Error("Remote is not attached to a connection yet.");
    return this._connection;
  }
  initialize(e) {}
  fillServerCapabilities(e) {}
  set trace(e) {
    this._trace = e;
  }
  log(e, t) {
    if (this._trace !== M_MessageConnectionManager_maybe.Trace.Off) {
      this.connection.sendNotification(
        M_MessageConnectionManager_maybe.LogTraceNotification.type,
        {
          message: e,
          verbose:
            this._trace === M_MessageConnectionManager_maybe.Trace.Verbose
              ? t
              : undefined,
        }
      );
    }
  }
}
class E {
  constructor() {}
  attach(e) {
    this._connection = e;
  }
  get connection() {
    if (!this._connection)
      throw new Error("Remote is not attached to a connection yet.");
    return this._connection;
  }
  initialize(e) {}
  fillServerCapabilities(e) {}
  logEvent(e) {
    this.connection.sendNotification(
      M_MessageConnectionManager_maybe.TelemetryEventNotification.type,
      e
    );
  }
}
class _LanguagesImpl {
  constructor() {}
  attach(e) {
    this._connection = e;
  }
  get connection() {
    if (!this._connection)
      throw new Error("Remote is not attached to a connection yet.");
    return this._connection;
  }
  initialize(e) {}
  fillServerCapabilities(e) {}
  attachWorkDoneProgress(e) {
    return M_WorkDoneProgressManager_maybe.attachWorkDone(this.connection, e);
  }
  attachPartialResultProgress(e, t) {
    return M_WorkDoneProgressManager_maybe.attachPartialResult(
      this.connection,
      t
    );
  }
}
exports._LanguagesImpl = _LanguagesImpl;
const S = M_MonikerFeatureManager_maybe.MonikerFeature(
  M_LinkedEditingRangeManager_maybe.LinkedEditingRangeFeature(
    M_SemanticTokensManager_maybe.SemanticTokensFeature(
      M_CallHierarchyManager_maybe.CallHierarchyFeature(_LanguagesImpl)
    )
  )
);
function combineConsoleFeatures(e, t) {
  return function (r) {
    return t(e(r));
  };
}
function combineTelemetryFeatures(e, t) {
  return function (r) {
    return t(e(r));
  };
}
function combineTracerFeatures(e, t) {
  return function (r) {
    return t(e(r));
  };
}
function combineClientFeatures(e, t) {
  return function (r) {
    return t(e(r));
  };
}
function combineWindowFeatures(e, t) {
  return function (r) {
    return t(e(r));
  };
}
function combineWorkspaceFeatures(e, t) {
  return function (r) {
    return t(e(r));
  };
}
exports.combineConsoleFeatures = combineConsoleFeatures;
exports.combineTelemetryFeatures = combineTelemetryFeatures;
exports.combineTracerFeatures = combineTracerFeatures;
exports.combineClientFeatures = combineClientFeatures;
exports.combineWindowFeatures = combineWindowFeatures;
exports.combineWorkspaceFeatures = combineWorkspaceFeatures;
exports.combineLanguagesFeatures = function (e, t) {
  return function (r) {
    return t(e(r));
  };
};
exports.combineFeatures = function (e, t) {
  function r(e, t, r) {
    return e && t ? r(e, t) : e || t;
  }
  return {
    __brand: "features",
    console: r(e.console, t.console, combineConsoleFeatures),
    tracer: r(e.tracer, t.tracer, combineTracerFeatures),
    telemetry: r(e.telemetry, t.telemetry, combineTelemetryFeatures),
    client: r(e.client, t.client, combineClientFeatures),
    window: r(e.window, t.window, combineWindowFeatures),
    workspace: r(e.workspace, t.workspace, combineWorkspaceFeatures),
  };
};
exports.createConnection = function (e, t, r) {
  const o = r && r.console ? new (r.console(m))() : new m();
  const a = e(o);
  o.rawAttach(a);
  const c = r && r.tracer ? new (r.tracer(C))() : new C();
  const l = r && r.telemetry ? new (r.telemetry(E))() : new E();
  const u = r && r.client ? new (r.client(b))() : new b();
  const d = r && r.window ? new (r.window(y))() : new y();
  const p = r && r.workspace ? new (r.workspace(w))() : new w();
  const h = r && r.languages ? new (r.languages(S))() : new S();
  const f = [o, c, l, u, d, p, h];
  function g(e) {
    return e instanceof Promise
      ? e
      : M_TypeChecker_maybe.thenable(e)
      ? new Promise((t, r) => {
          e.then(
            (e) => t(e),
            (e) => r(e)
          );
        })
      : Promise.resolve(e);
  }
  let v;
  let _;
  let T;
  let x = {
    listen: () => a.listen(),
    sendRequest: (e, ...t) =>
      a.sendRequest(M_TypeChecker_maybe.string(e) ? e : e.method, ...t),
    onRequest: (e, t) => a.onRequest(e, t),
    sendNotification: (e, t) => {
      const r = M_TypeChecker_maybe.string(e) ? e : e.method;
      if (1 === arguments.length) {
        a.sendNotification(r);
      } else {
        a.sendNotification(r, t);
      }
    },
    onNotification: (e, t) => a.onNotification(e, t),
    onProgress: a.onProgress,
    sendProgress: a.sendProgress,
    onInitialize: (e) => (_ = e),
    onInitialized: (e) =>
      a.onNotification(
        M_MessageConnectionManager_maybe.InitializedNotification.type,
        e
      ),
    onShutdown: (e) => (v = e),
    onExit: (e) => (T = e),
    get console() {
      return o;
    },
    get telemetry() {
      return l;
    },
    get tracer() {
      return c;
    },
    get client() {
      return u;
    },
    get window() {
      return d;
    },
    get workspace() {
      return p;
    },
    get languages() {
      return h;
    },
    onDidChangeConfiguration: (e) =>
      a.onNotification(
        M_MessageConnectionManager_maybe.DidChangeConfigurationNotification
          .type,
        e
      ),
    onDidChangeWatchedFiles: (e) =>
      a.onNotification(
        M_MessageConnectionManager_maybe.DidChangeWatchedFilesNotification.type,
        e
      ),
    __textDocumentSync: undefined,
    onDidOpenTextDocument: (e) =>
      a.onNotification(
        M_MessageConnectionManager_maybe.DidOpenTextDocumentNotification.type,
        e
      ),
    onDidChangeTextDocument: (e) =>
      a.onNotification(
        M_MessageConnectionManager_maybe.DidChangeTextDocumentNotification.type,
        e
      ),
    onDidCloseTextDocument: (e) =>
      a.onNotification(
        M_MessageConnectionManager_maybe.DidCloseTextDocumentNotification.type,
        e
      ),
    onWillSaveTextDocument: (e) =>
      a.onNotification(
        M_MessageConnectionManager_maybe.WillSaveTextDocumentNotification.type,
        e
      ),
    onWillSaveTextDocumentWaitUntil: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.WillSaveTextDocumentWaitUntilRequest
          .type,
        e
      ),
    onDidSaveTextDocument: (e) =>
      a.onNotification(
        M_MessageConnectionManager_maybe.DidSaveTextDocumentNotification.type,
        e
      ),
    sendDiagnostics: (e) =>
      a.sendNotification(
        M_MessageConnectionManager_maybe.PublishDiagnosticsNotification.type,
        e
      ),
    onHover: (e) =>
      a.onRequest(M_MessageConnectionManager_maybe.HoverRequest.type, (t, r) =>
        e(t, r, M_WorkDoneProgressManager_maybe.attachWorkDone(a, t), undefined)
      ),
    onCompletion: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.CompletionRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            M_WorkDoneProgressManager_maybe.attachPartialResult(a, t)
          )
      ),
    onCompletionResolve: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.CompletionResolveRequest.type,
        e
      ),
    onSignatureHelp: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.SignatureHelpRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            undefined
          )
      ),
    onDeclaration: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.DeclarationRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            M_WorkDoneProgressManager_maybe.attachPartialResult(a, t)
          )
      ),
    onDefinition: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.DefinitionRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            M_WorkDoneProgressManager_maybe.attachPartialResult(a, t)
          )
      ),
    onTypeDefinition: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.TypeDefinitionRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            M_WorkDoneProgressManager_maybe.attachPartialResult(a, t)
          )
      ),
    onImplementation: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.ImplementationRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            M_WorkDoneProgressManager_maybe.attachPartialResult(a, t)
          )
      ),
    onReferences: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.ReferencesRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            M_WorkDoneProgressManager_maybe.attachPartialResult(a, t)
          )
      ),
    onDocumentHighlight: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.DocumentHighlightRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            M_WorkDoneProgressManager_maybe.attachPartialResult(a, t)
          )
      ),
    onDocumentSymbol: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.DocumentSymbolRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            M_WorkDoneProgressManager_maybe.attachPartialResult(a, t)
          )
      ),
    onWorkspaceSymbol: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.WorkspaceSymbolRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            M_WorkDoneProgressManager_maybe.attachPartialResult(a, t)
          )
      ),
    onCodeAction: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.CodeActionRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            M_WorkDoneProgressManager_maybe.attachPartialResult(a, t)
          )
      ),
    onCodeActionResolve: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.CodeActionResolveRequest.type,
        (t, r) => e(t, r)
      ),
    onCodeLens: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.CodeLensRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            M_WorkDoneProgressManager_maybe.attachPartialResult(a, t)
          )
      ),
    onCodeLensResolve: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.CodeLensResolveRequest.type,
        (t, r) => e(t, r)
      ),
    onDocumentFormatting: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.DocumentFormattingRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            undefined
          )
      ),
    onDocumentRangeFormatting: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.DocumentRangeFormattingRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            undefined
          )
      ),
    onDocumentOnTypeFormatting: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.DocumentOnTypeFormattingRequest.type,
        (t, r) => e(t, r)
      ),
    onRenameRequest: (e) =>
      a.onRequest(M_MessageConnectionManager_maybe.RenameRequest.type, (t, r) =>
        e(t, r, M_WorkDoneProgressManager_maybe.attachWorkDone(a, t), undefined)
      ),
    onPrepareRename: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.PrepareRenameRequest.type,
        (t, r) => e(t, r)
      ),
    onDocumentLinks: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.DocumentLinkRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            M_WorkDoneProgressManager_maybe.attachPartialResult(a, t)
          )
      ),
    onDocumentLinkResolve: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.DocumentLinkResolveRequest.type,
        (t, r) => e(t, r)
      ),
    onDocumentColor: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.DocumentColorRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            M_WorkDoneProgressManager_maybe.attachPartialResult(a, t)
          )
      ),
    onColorPresentation: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.ColorPresentationRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            M_WorkDoneProgressManager_maybe.attachPartialResult(a, t)
          )
      ),
    onFoldingRanges: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.FoldingRangeRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            M_WorkDoneProgressManager_maybe.attachPartialResult(a, t)
          )
      ),
    onSelectionRanges: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.SelectionRangeRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            M_WorkDoneProgressManager_maybe.attachPartialResult(a, t)
          )
      ),
    onExecuteCommand: (e) =>
      a.onRequest(
        M_MessageConnectionManager_maybe.ExecuteCommandRequest.type,
        (t, r) =>
          e(
            t,
            r,
            M_WorkDoneProgressManager_maybe.attachWorkDone(a, t),
            undefined
          )
      ),
    dispose: () => a.dispose(),
  };
  for (let e of f) e.attach(x);
  a.onRequest(M_MessageConnectionManager_maybe.InitializeRequest.type, (e) => {
    t.initialize(e);
    if (M_TypeChecker_maybe.string(e.trace)) {
      c.trace = M_MessageConnectionManager_maybe.Trace.fromString(e.trace);
    }
    for (let t of f) t.initialize(e.capabilities);
    if (_)
      return g(
        _(
          e,
          new M_MessageConnectionManager_maybe.CancellationTokenSource().token,
          M_WorkDoneProgressManager_maybe.attachWorkDone(a, e),
          undefined
        )
      ).then((e) => {
        if (e instanceof M_MessageConnectionManager_maybe.ResponseError)
          return e;
        let t = e;
        if (t) {
          t = {
            capabilities: {},
          };
        }
        let r = t.capabilities;
        if (r) {
          r = {};
          t.capabilities = r;
        }
        if (undefined === r.textDocumentSync || null === r.textDocumentSync) {
          r.textDocumentSync = M_TypeChecker_maybe.number(x.__textDocumentSync)
            ? x.__textDocumentSync
            : M_MessageConnectionManager_maybe.TextDocumentSyncKind.None;
        } else {
          if (
            M_TypeChecker_maybe.number(r.textDocumentSync) ||
            M_TypeChecker_maybe.number(r.textDocumentSync.change)
          ) {
            r.textDocumentSync.change = M_TypeChecker_maybe.number(
              x.__textDocumentSync
            )
              ? x.__textDocumentSync
              : M_MessageConnectionManager_maybe.TextDocumentSyncKind.None;
          }
        }
        for (let e of f) e.fillServerCapabilities(r);
        return t;
      });
    {
      let e = {
        capabilities: {
          textDocumentSync:
            M_MessageConnectionManager_maybe.TextDocumentSyncKind.None,
        },
      };
      for (let t of f) t.fillServerCapabilities(e.capabilities);
      return e;
    }
  });
  a.onRequest(
    M_MessageConnectionManager_maybe.ShutdownRequest.type,
    () => (
      (t.shutdownReceived = true),
      v
        ? v(
            new M_MessageConnectionManager_maybe.CancellationTokenSource().token
          )
        : undefined
    )
  );
  a.onNotification(
    M_MessageConnectionManager_maybe.ExitNotification.type,
    () => {
      try {
        if (T) {
          T();
        }
      } finally {
        if (t.shutdownReceived) {
          t.exit(0);
        } else {
          t.exit(1);
        }
      }
    }
  );
  a.onNotification(
    M_MessageConnectionManager_maybe.SetTraceNotification.type,
    (e) => {
      c.trace = M_MessageConnectionManager_maybe.Trace.fromString(e.value);
    }
  );
  return x;
};
