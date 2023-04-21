Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.AgentTextDocument =
  exports.getTextDocumentChecked =
  exports.AgentLocationFactory =
    undefined;
const M_TextDocumentManager_maybe = require("TextDocumentManager");
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_LocationFactoryModule_maybe = require("LocationFactoryModule");
const M_PathUtilsManager_maybe = require("PathUtilsManager");
class AgentLocationFactory extends M_LocationFactoryModule_maybe.LocationFactory {
  range(e, t, r, n) {
    return undefined !== r && undefined !== n
      ? M_LanguageMarkerConstants_maybe.Range.create(e, t, r, n)
      : M_LanguageMarkerConstants_maybe.Range.create(e, t);
  }
  position(e, t) {
    return M_LanguageMarkerConstants_maybe.Position.create(e, t);
  }
}
exports.AgentLocationFactory = AgentLocationFactory;
exports.getTextDocumentChecked = async function (e, t, r) {
  if (r && r.source && r.languageId) {
    const e = new AgentTextDocument(t, r.languageId, 0, r.source);
    if (r.relativePath) {
      e.relativePath = r.relativePath;
    }
    return e;
  }
  const n = e.get(M_PathUtilsManager_maybe.TextDocumentManager);
  return await n.getTextDocument(t).then((e) => {
    if (!e) {
      const e = n.textDocuments.map((e) => e.uri).join(", ");
      throw new Error(
        `Couldn't find document for uri: ${t}, known document uris are: ${e}`
      );
    }
    return new AgentTextDocument(e.uri, e.languageId, e.version, e.getText());
  });
};
class AgentTextDocument {
  constructor(e, t, r, i) {
    this._uri = e;
    this._textDocument = M_TextDocumentManager_maybe.TextDocument.create(
      e.toString(),
      t,
      r,
      i
    );
  }
  get uri() {
    return this._uri;
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
  get relativePath() {
    return this._relativePath;
  }
  set relativePath(e) {
    this._relativePath = e;
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
    const n = M_LanguageMarkerConstants_maybe.Range.create(
      M_LanguageMarkerConstants_maybe.Position.create(t, 0),
      M_LanguageMarkerConstants_maybe.Position.create(t, r.length)
    );
    const o = 0 === r.trim().length;
    return {
      text: r,
      range: n,
      isEmptyOrWhitespace: o,
    };
  }
  getWordRangeAtPosition(e) {}
  update(e, t) {
    M_TextDocumentManager_maybe.TextDocument.update(this._textDocument, e, t);
  }
}
exports.AgentTextDocument = AgentTextDocument;
