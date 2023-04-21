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
const n = require(40273);
const i = require(40289);
const o = require(37560);
const s = require(42731);
const a = require(52507);
const c = require(28634);
const l = require(47985);
const u = require(59817);
const d = require(85421);
const p = require(50828);
const h = require(22776);
const f = require(8120);
function g(e) {
  if (null !== e) return e;
}
exports.TextDocuments = class {
  constructor(e) {
    this._documents = Object.create(null);
    this._configuration = e;
    this._onDidChangeContent = new n.Emitter();
    this._onDidOpen = new n.Emitter();
    this._onDidClose = new n.Emitter();
    this._onDidSave = new n.Emitter();
    this._onWillSave = new n.Emitter();
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
    e.__textDocumentSync = n.TextDocumentSyncKind.Full;
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
    this.send(n.MessageType.Error, e);
  }
  warn(e) {
    this.send(n.MessageType.Warning, e);
  }
  info(e) {
    this.send(n.MessageType.Info, e);
  }
  log(e) {
    this.send(n.MessageType.Log, e);
  }
  send(e, t) {
    if (this._rawConnection) {
      this._rawConnection.sendNotification(n.LogMessageNotification.type, {
        type: e,
        message: t,
      });
    }
  }
}
const y = d.ShowDocumentFeature(
  s.ProgressFeature(
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
          type: n.MessageType.Error,
          message: e,
          actions: t,
        };
        return this.connection
          .sendRequest(n.ShowMessageRequest.type, r)
          .then(g);
      }
      showWarningMessage(e, ...t) {
        let r = {
          type: n.MessageType.Warning,
          message: e,
          actions: t,
        };
        return this.connection
          .sendRequest(n.ShowMessageRequest.type, r)
          .then(g);
      }
      showInformationMessage(e, ...t) {
        let r = {
          type: n.MessageType.Info,
          message: e,
          actions: t,
        };
        return this.connection
          .sendRequest(n.ShowMessageRequest.type, r)
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
    const r = i.string(e) ? e : e.method;
    if (this._registered.has(r))
      throw new Error(`${r} is already added to this registration`);
    const n = o.generateUuid();
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
      .sendRequest(n.UnregistrationRequest.type, t)
      .then(undefined, (e) => {
        this._connection.console.info("Bulk unregistration failed.");
      });
  }
  disposeSingle(e) {
    const t = i.string(e) ? e : e.method;
    const r = this._unregistrations.get(t);
    if (!r) return false;
    let o = {
      unregisterations: [r],
    };
    this._connection.sendRequest(n.UnregistrationRequest.type, o).then(
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
    const s = i.string(t) ? t : t.method;
    const a = o.generateUuid();
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
    return this.connection.sendRequest(n.RegistrationRequest.type, c).then(
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
    const r = i.string(e) ? e : e.method;
    const s = o.generateUuid();
    let a = {
      registrations: [
        {
          id: s,
          method: r,
          registerOptions: t || {},
        },
      ],
    };
    return this.connection.sendRequest(n.RegistrationRequest.type, a).then(
      (e) =>
        n.Disposable.create(() => {
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
      .sendRequest(n.UnregistrationRequest.type, r)
      .then(undefined, (t) => {
        this.connection.console.info(
          `Un-registering request handler for ${e} failed.`
        );
      });
  }
  registerMany(e) {
    let t = e.asRegistrationParams();
    return this.connection.sendRequest(n.RegistrationRequest.type, t).then(
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
const w = p.FileOperationsFeature(
  c.WorkspaceFoldersFeature(
    a.ConfigurationFeature(
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
            n.ApplyWorkspaceEditRequest.type,
            t
          );
        }
      }
    )
  )
);
class C {
  constructor() {
    this._trace = n.Trace.Off;
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
    if (this._trace !== n.Trace.Off) {
      this.connection.sendNotification(n.LogTraceNotification.type, {
        message: e,
        verbose: this._trace === n.Trace.Verbose ? t : undefined,
      });
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
    this.connection.sendNotification(n.TelemetryEventNotification.type, e);
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
    return s.attachWorkDone(this.connection, e);
  }
  attachPartialResultProgress(e, t) {
    return s.attachPartialResult(this.connection, t);
  }
}
exports._LanguagesImpl = _LanguagesImpl;
const S = f.MonikerFeature(
  h.LinkedEditingRangeFeature(
    u.SemanticTokensFeature(l.CallHierarchyFeature(_LanguagesImpl))
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
      : i.thenable(e)
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
    sendRequest: (e, ...t) => a.sendRequest(i.string(e) ? e : e.method, ...t),
    onRequest: (e, t) => a.onRequest(e, t),
    sendNotification: (e, t) => {
      const r = i.string(e) ? e : e.method;
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
    onInitialized: (e) => a.onNotification(n.InitializedNotification.type, e),
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
      a.onNotification(n.DidChangeConfigurationNotification.type, e),
    onDidChangeWatchedFiles: (e) =>
      a.onNotification(n.DidChangeWatchedFilesNotification.type, e),
    __textDocumentSync: undefined,
    onDidOpenTextDocument: (e) =>
      a.onNotification(n.DidOpenTextDocumentNotification.type, e),
    onDidChangeTextDocument: (e) =>
      a.onNotification(n.DidChangeTextDocumentNotification.type, e),
    onDidCloseTextDocument: (e) =>
      a.onNotification(n.DidCloseTextDocumentNotification.type, e),
    onWillSaveTextDocument: (e) =>
      a.onNotification(n.WillSaveTextDocumentNotification.type, e),
    onWillSaveTextDocumentWaitUntil: (e) =>
      a.onRequest(n.WillSaveTextDocumentWaitUntilRequest.type, e),
    onDidSaveTextDocument: (e) =>
      a.onNotification(n.DidSaveTextDocumentNotification.type, e),
    sendDiagnostics: (e) =>
      a.sendNotification(n.PublishDiagnosticsNotification.type, e),
    onHover: (e) =>
      a.onRequest(n.HoverRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), undefined)
      ),
    onCompletion: (e) =>
      a.onRequest(n.CompletionRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), s.attachPartialResult(a, t))
      ),
    onCompletionResolve: (e) => a.onRequest(n.CompletionResolveRequest.type, e),
    onSignatureHelp: (e) =>
      a.onRequest(n.SignatureHelpRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), undefined)
      ),
    onDeclaration: (e) =>
      a.onRequest(n.DeclarationRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), s.attachPartialResult(a, t))
      ),
    onDefinition: (e) =>
      a.onRequest(n.DefinitionRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), s.attachPartialResult(a, t))
      ),
    onTypeDefinition: (e) =>
      a.onRequest(n.TypeDefinitionRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), s.attachPartialResult(a, t))
      ),
    onImplementation: (e) =>
      a.onRequest(n.ImplementationRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), s.attachPartialResult(a, t))
      ),
    onReferences: (e) =>
      a.onRequest(n.ReferencesRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), s.attachPartialResult(a, t))
      ),
    onDocumentHighlight: (e) =>
      a.onRequest(n.DocumentHighlightRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), s.attachPartialResult(a, t))
      ),
    onDocumentSymbol: (e) =>
      a.onRequest(n.DocumentSymbolRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), s.attachPartialResult(a, t))
      ),
    onWorkspaceSymbol: (e) =>
      a.onRequest(n.WorkspaceSymbolRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), s.attachPartialResult(a, t))
      ),
    onCodeAction: (e) =>
      a.onRequest(n.CodeActionRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), s.attachPartialResult(a, t))
      ),
    onCodeActionResolve: (e) =>
      a.onRequest(n.CodeActionResolveRequest.type, (t, r) => e(t, r)),
    onCodeLens: (e) =>
      a.onRequest(n.CodeLensRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), s.attachPartialResult(a, t))
      ),
    onCodeLensResolve: (e) =>
      a.onRequest(n.CodeLensResolveRequest.type, (t, r) => e(t, r)),
    onDocumentFormatting: (e) =>
      a.onRequest(n.DocumentFormattingRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), undefined)
      ),
    onDocumentRangeFormatting: (e) =>
      a.onRequest(n.DocumentRangeFormattingRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), undefined)
      ),
    onDocumentOnTypeFormatting: (e) =>
      a.onRequest(n.DocumentOnTypeFormattingRequest.type, (t, r) => e(t, r)),
    onRenameRequest: (e) =>
      a.onRequest(n.RenameRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), undefined)
      ),
    onPrepareRename: (e) =>
      a.onRequest(n.PrepareRenameRequest.type, (t, r) => e(t, r)),
    onDocumentLinks: (e) =>
      a.onRequest(n.DocumentLinkRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), s.attachPartialResult(a, t))
      ),
    onDocumentLinkResolve: (e) =>
      a.onRequest(n.DocumentLinkResolveRequest.type, (t, r) => e(t, r)),
    onDocumentColor: (e) =>
      a.onRequest(n.DocumentColorRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), s.attachPartialResult(a, t))
      ),
    onColorPresentation: (e) =>
      a.onRequest(n.ColorPresentationRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), s.attachPartialResult(a, t))
      ),
    onFoldingRanges: (e) =>
      a.onRequest(n.FoldingRangeRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), s.attachPartialResult(a, t))
      ),
    onSelectionRanges: (e) =>
      a.onRequest(n.SelectionRangeRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), s.attachPartialResult(a, t))
      ),
    onExecuteCommand: (e) =>
      a.onRequest(n.ExecuteCommandRequest.type, (t, r) =>
        e(t, r, s.attachWorkDone(a, t), undefined)
      ),
    dispose: () => a.dispose(),
  };
  for (let e of f) e.attach(x);
  a.onRequest(n.InitializeRequest.type, (e) => {
    t.initialize(e);
    if (i.string(e.trace)) {
      c.trace = n.Trace.fromString(e.trace);
    }
    for (let t of f) t.initialize(e.capabilities);
    if (_)
      return g(
        _(
          e,
          new n.CancellationTokenSource().token,
          s.attachWorkDone(a, e),
          undefined
        )
      ).then((e) => {
        if (e instanceof n.ResponseError) return e;
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
          r.textDocumentSync = i.number(x.__textDocumentSync)
            ? x.__textDocumentSync
            : n.TextDocumentSyncKind.None;
        } else {
          if (
            i.number(r.textDocumentSync) ||
            i.number(r.textDocumentSync.change)
          ) {
            r.textDocumentSync.change = i.number(x.__textDocumentSync)
              ? x.__textDocumentSync
              : n.TextDocumentSyncKind.None;
          }
        }
        for (let e of f) e.fillServerCapabilities(r);
        return t;
      });
    {
      let e = {
        capabilities: {
          textDocumentSync: n.TextDocumentSyncKind.None,
        },
      };
      for (let t of f) t.fillServerCapabilities(e.capabilities);
      return e;
    }
  });
  a.onRequest(
    n.ShutdownRequest.type,
    () => (
      (t.shutdownReceived = true),
      v ? v(new n.CancellationTokenSource().token) : undefined
    )
  );
  a.onNotification(n.ExitNotification.type, () => {
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
  });
  a.onNotification(n.SetTraceNotification.type, (e) => {
    c.trace = n.Trace.fromString(e.value);
  });
  return x;
};