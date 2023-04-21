Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.AgentTextDocumentManager = undefined;
const n = require("events");
const i = require("path");
const o = require(35809);
const s = require(16630);
const a = require(20190);
const c = require(70819);
const l = require(87426);
const u = require(42401);
class d {
  constructor(e) {
    this.ctx = e;
    this.emitter = new n();
  }
  create(e, t, r, n) {
    const i = new u.AgentTextDocument(s.URI.parse(e), t, r, n);
    a.primeLanguageDetectionCache(this.ctx, i);
    return i;
  }
  update(e, t, r) {
    const n = [];
    for (const r of t)
      if (o.TextDocumentContentChangeEvent.isIncremental(r)) {
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
class AgentTextDocumentManager extends c.TextDocumentManager {
  constructor(e) {
    super();
    this.ctx = e;
    this.connection = this.ctx.get(l.WrappedConnection).conn;
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
        const n = s.URI.parse(r.uri);
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
    this._textDocumentListener = new o.TextDocuments(
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
      (t) => t.toString() === s.URI.parse(e.uri).toString()
    );
    if (t >= 0) {
      this.workspaceFolders.splice(t, 1);
    }
  }
  registerWorkspaceFolder(e) {
    this.workspaceFolders.push(s.URI.parse(e.uri));
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
      : c.getRelativePath(this.workspaceFolders ?? [], e.fileName) ??
          i.basename(e.fileName);
  }
  findNotebook(e) {}
}
exports.AgentTextDocumentManager = AgentTextDocumentManager;