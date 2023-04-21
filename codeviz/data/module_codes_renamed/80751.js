Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.TestLocationFactory =
  exports.TestTextDocumentManager =
  exports.InMemoryTextDocument =
    undefined;
const M_TextDocumentManager_maybe = require("TextDocumentManager");
class InMemoryTextDocument {
  constructor(e, t, r, i, o) {
    this._uri = e;
    this._textDocument = M_TextDocumentManager_maybe.TextDocument.create(
      e.toString(),
      t,
      r,
      i
    );
    this._relativePath = o;
  }
  get uri() {
    return this._uri;
  }
  get relativePath() {
    return this._relativePath;
  }
  get fileName() {
    return this._uri.fsPath;
  }
  get languageId() {
    return this._textDocument.languageId;
  }
  get version() {
    return this._textDocument.version;
  }
  get lineCount() {
    return this._textDocument.lineCount;
  }
  getText(e) {
    return this._textDocument.getText(e);
  }
  positionAt(e) {
    return this._textDocument.positionAt(e);
  }
  offsetAt(e) {
    return this._textDocument.offsetAt(e);
  }
  lineAt(e) {
    const t = "number" == typeof e ? e : e.line;
    const r = this.getText().split("\n")[t];
    const n = {
      start: {
        line: t,
        character: 0,
      },
      end: {
        line: t,
        character: r.length,
      },
    };
    const i = 0 === r.trim().length;
    return {
      text: r,
      range: n,
      isEmptyOrWhitespace: i,
    };
  }
  getWordRangeAtPosition(e) {}
  update(e, t) {
    M_TextDocumentManager_maybe.TextDocument.update(this._textDocument, e, t);
  }
}
exports.InMemoryTextDocument = InMemoryTextDocument;
exports.TestTextDocumentManager = class {
  constructor() {
    this._textDocuments = [];
    this.onDidFocusTextDocument = () => ({
      dispose: () => {},
    });
    this.onDidChangeTextDocument = () => ({
      dispose: () => {},
    });
    this.onDidChangeCursor = () => ({
      dispose: () => {},
    });
  }
  get textDocuments() {
    return this._textDocuments;
  }
  async getTextDocument(e) {
    return this.textDocuments.find((t) => t.uri.toString() == e.toString());
  }
  async getRelativePath(e) {}
  setTextDocument(e, t, r) {
    this._textDocuments.push(new InMemoryTextDocument(e, t, 0, r));
  }
  findNotebook(e) {}
};
exports.TestLocationFactory = class {
  position(e, t) {
    return {
      line: e,
      character: t,
    };
  }
  range(e, t, r, n) {
    return "number" == typeof e
      ? {
          start: {
            line: e,
            character: t,
          },
          end: {
            line: r,
            character: n,
          },
        }
      : {
          start: e,
          end: t,
        };
  }
};
