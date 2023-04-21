Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.AgentTextDocumentManager = undefined;
const M_events = require("events");
const M_path = require("path");
const M_connection_manager_maybe = require("connection-manager");
const M_Path_Parsing_Utils_maybe = require("Path-Parsing-Utils");
const M_LanguageDetectionManager_maybe = require("LanguageDetectionManager");
const M_PathUtilsManager_maybe = require("PathUtilsManager");
const M_DebugServerWrapper_maybe = require("DebugServerWrapper");
const M_AgentTextDocumentManager_maybe = require("AgentTextDocumentManager");
class d {
  constructor(e) {
    this.ctx = e;
    this.emitter = new M_events();
  }
  create(e, t, r, n) {
    const i = new M_AgentTextDocumentManager_maybe.AgentTextDocument(
      M_Path_Parsing_Utils_maybe.URI.parse(e),
      t,
      r,
      n
    );
    M_LanguageDetectionManager_maybe.primeLanguageDetectionCache(this.ctx, i);
    return i;
  }
  update(e, t, r) {
    const n = [];
    for (const r of t)
      if (
        M_connection_manager_maybe.TextDocumentContentChangeEvent.isIncremental(
          r
        )
      ) {
        const t = {
          range: r.range,
          rangeOffset: e.offsetAt(r.range.start),
          rangeLength: e.offsetAt(r.range.end) - e.offsetAt(r.range.start),
          text: r.text,
        };
        n.push(t);
      }
    const i = {
      document: e,
      contentChanges: n,
    };
    this.emitter.emit("change", i);
    e.update(t, r);
    return e;
  }
}
class AgentTextDocumentManager extends M_PathUtilsManager_maybe.TextDocumentManager {
  constructor(e) {
    super();
    this.ctx = e;
    this.connection = this.ctx.get(
      M_DebugServerWrapper_maybe.WrappedConnection
    ).conn;
    this.workspaceFolders = [];
    this.onDidChangeTextDocument = (e, t, r) => {
      const n = e.bind(t);
      this._textDocumentConfiguration.emitter.on("change", n);
      return {
        dispose: () => {
          this._textDocumentConfiguration.emitter.removeListener("change", n);
        },
      };
    };
    this.onDidFocusTextDocument = (e, t, r) => (
      this.connection.onNotification("textDocument/didFocus", (r) => {
        const n = M_Path_Parsing_Utils_maybe.URI.parse(r.uri);
        e.call(t, {
          document: {
            uri: n,
          },
        });
      }),
      {
        dispose: () => {},
      }
    );
    this.onDidChangeCursor = (e, t, r) => ({
      dispose: () => {},
    });
    this._textDocumentConfiguration = new d(e);
    this._textDocumentListener = new M_connection_manager_maybe.TextDocuments(
      this._textDocumentConfiguration
    );
    this._textDocumentListener.listen(this.connection);
    this.connection.onNotification("vs/didAddWorkspaceFolder", (e) =>
      this.registerWorkspaceFolder(e)
    );
    this.connection.onNotification("vs/didRemoveWorkspaceFolder", (e) =>
      this.unregisterWorkspaceFolder(e)
    );
  }
  init(e, t) {
    this.workspaceFolders.length = 0;
    this.workspaceFolders.push(...e);
    if (t) {
      this.connection.workspace.onDidChangeWorkspaceFolders((e) => {
        e.added.forEach((e) => this.registerWorkspaceFolder(e));
        e.removed.forEach((e) => this.unregisterWorkspaceFolder(e));
      });
    }
  }
  unregisterWorkspaceFolder(e) {
    const t = this.workspaceFolders.findIndex(
      (t) =>
        t.toString() === M_Path_Parsing_Utils_maybe.URI.parse(e.uri).toString()
    );
    if (t >= 0) {
      this.workspaceFolders.splice(t, 1);
    }
  }
  registerWorkspaceFolder(e) {
    this.workspaceFolders.push(M_Path_Parsing_Utils_maybe.URI.parse(e.uri));
  }
  get textDocuments() {
    return this._textDocumentListener.all();
  }
  async getTextDocument(e) {
    return this._textDocumentListener
      .all()
      .find((t) => t.uri.toString() == e.toString());
  }
  async getRelativePath(e) {
    const t = e;
    return t.relativePath
      ? t.relativePath
      : M_PathUtilsManager_maybe.getRelativePath(
          this.workspaceFolders ?? [],
          e.fileName
        ) ?? M_path.basename(e.fileName);
  }
  findNotebook(e) {}
}
exports.AgentTextDocumentManager = AgentTextDocumentManager;
