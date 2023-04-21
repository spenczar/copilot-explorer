var n;
var i;
var o;
var s;
var a;
var c;
var l;
var u;
var d;
var p;
var h;
var f;
var g;
var m;
var y;
var v;
var _;
var b;
var w;
var C;
var E;
var T;
var S;
var x;
var k;
var I;
require.r(exports);
require.d(exports, {
  integer: () => n,
  uinteger: () => i,
  Position: () => o,
  Range: () => s,
  Location: () => a,
  LocationLink: () => c,
  Color: () => l,
  ColorInformation: () => u,
  ColorPresentation: () => d,
  FoldingRangeKind: () => p,
  FoldingRange: () => h,
  DiagnosticRelatedInformation: () => f,
  DiagnosticSeverity: () => g,
  DiagnosticTag: () => m,
  CodeDescription: () => y,
  Diagnostic: () => v,
  Command: () => _,
  TextEdit: () => b,
  ChangeAnnotation: () => w,
  ChangeAnnotationIdentifier: () => C,
  AnnotatedTextEdit: () => E,
  TextDocumentEdit: () => T,
  CreateFile: () => S,
  RenameFile: () => x,
  DeleteFile: () => k,
  WorkspaceEdit: () => I,
  WorkspaceChange: () => ae,
  TextDocumentIdentifier: () => A,
  VersionedTextDocumentIdentifier: () => P,
  OptionalVersionedTextDocumentIdentifier: () => R,
  TextDocumentItem: () => N,
  MarkupKind: () => O,
  MarkupContent: () => L,
  CompletionItemKind: () => D,
  InsertTextFormat: () => M,
  CompletionItemTag: () => B,
  InsertReplaceEdit: () => F,
  InsertTextMode: () => j,
  CompletionItem: () => U,
  CompletionList: () => $,
  MarkedString: () => q,
  Hover: () => H,
  ParameterInformation: () => V,
  SignatureInformation: () => z,
  DocumentHighlightKind: () => K,
  DocumentHighlight: () => W,
  SymbolKind: () => G,
  SymbolTag: () => Q,
  SymbolInformation: () => J,
  DocumentSymbol: () => Y,
  CodeActionKind: () => X,
  CodeActionContext: () => Z,
  CodeAction: () => ee,
  CodeLens: () => te,
  FormattingOptions: () => re,
  DocumentLink: () => ne,
  SelectionRange: () => ie,
  EOL: () => le,
  TextDocument: () => ce,
});
(function (e) {
  e.MIN_VALUE = -2147483648;
  e.MAX_VALUE = 2147483647;
})(n || (n = {}));
(function (e) {
  e.MIN_VALUE = 0;
  e.MAX_VALUE = 2147483647;
})(i || (i = {}));
(function (e) {
  e.create = function (e, t) {
    if (e === Number.MAX_VALUE) {
      e = i.MAX_VALUE;
    }
    if (t === Number.MAX_VALUE) {
      t = i.MAX_VALUE;
    }
    return {
      line: e,
      character: t,
    };
  };
  e.is = function (e) {
    var t = e;
    return (
      ue.objectLiteral(t) && ue.uinteger(t.line) && ue.uinteger(t.character)
    );
  };
})(o || (o = {}));
(function (e) {
  e.create = function (e, t, r, n) {
    if (ue.uinteger(e) && ue.uinteger(t) && ue.uinteger(r) && ue.uinteger(n))
      return {
        start: o.create(e, t),
        end: o.create(r, n),
      };
    if (o.is(e) && o.is(t))
      return {
        start: e,
        end: t,
      };
    throw new Error(
      "Range#create called with invalid arguments[" +
        e +
        ", " +
        t +
        ", " +
        r +
        ", " +
        n +
        "]"
    );
  };
  e.is = function (e) {
    var t = e;
    return ue.objectLiteral(t) && o.is(t.start) && o.is(t.end);
  };
})(s || (s = {}));
(function (e) {
  e.create = function (e, t) {
    return {
      uri: e,
      range: t,
    };
  };
  e.is = function (e) {
    var t = e;
    return (
      ue.defined(t) &&
      s.is(t.range) &&
      (ue.string(t.uri) || ue.undefined(t.uri))
    );
  };
})(a || (a = {}));
(function (e) {
  e.create = function (e, t, r, n) {
    return {
      targetUri: e,
      targetRange: t,
      targetSelectionRange: r,
      originSelectionRange: n,
    };
  };
  e.is = function (e) {
    var t = e;
    return (
      ue.defined(t) &&
      s.is(t.targetRange) &&
      ue.string(t.targetUri) &&
      (s.is(t.targetSelectionRange) || ue.undefined(t.targetSelectionRange)) &&
      (s.is(t.originSelectionRange) || ue.undefined(t.originSelectionRange))
    );
  };
})(c || (c = {}));
(function (e) {
  e.create = function (e, t, r, n) {
    return {
      red: e,
      green: t,
      blue: r,
      alpha: n,
    };
  };
  e.is = function (e) {
    var t = e;
    return (
      ue.numberRange(t.red, 0, 1) &&
      ue.numberRange(t.green, 0, 1) &&
      ue.numberRange(t.blue, 0, 1) &&
      ue.numberRange(t.alpha, 0, 1)
    );
  };
})(l || (l = {}));
(function (e) {
  e.create = function (e, t) {
    return {
      range: e,
      color: t,
    };
  };
  e.is = function (e) {
    var t = e;
    return s.is(t.range) && l.is(t.color);
  };
})(u || (u = {}));
(function (e) {
  e.create = function (e, t, r) {
    return {
      label: e,
      textEdit: t,
      additionalTextEdits: r,
    };
  };
  e.is = function (e) {
    var t = e;
    return (
      ue.string(t.label) &&
      (ue.undefined(t.textEdit) || b.is(t)) &&
      (ue.undefined(t.additionalTextEdits) ||
        ue.typedArray(t.additionalTextEdits, b.is))
    );
  };
})(d || (d = {}));
(function (e) {
  e.Comment = "comment";
  e.Imports = "imports";
  e.Region = "region";
})(p || (p = {}));
(function (e) {
  e.create = function (e, t, r, n, i) {
    var o = {
      startLine: e,
      endLine: t,
    };
    if (ue.defined(r)) {
      o.startCharacter = r;
    }
    if (ue.defined(n)) {
      o.endCharacter = n;
    }
    if (ue.defined(i)) {
      o.kind = i;
    }
    return o;
  };
  e.is = function (e) {
    var t = e;
    return (
      ue.uinteger(t.startLine) &&
      ue.uinteger(t.startLine) &&
      (ue.undefined(t.startCharacter) || ue.uinteger(t.startCharacter)) &&
      (ue.undefined(t.endCharacter) || ue.uinteger(t.endCharacter)) &&
      (ue.undefined(t.kind) || ue.string(t.kind))
    );
  };
})(h || (h = {}));
(function (e) {
  e.create = function (e, t) {
    return {
      location: e,
      message: t,
    };
  };
  e.is = function (e) {
    var t = e;
    return ue.defined(t) && a.is(t.location) && ue.string(t.message);
  };
})(f || (f = {}));
(function (e) {
  e.Error = 1;
  e.Warning = 2;
  e.Information = 3;
  e.Hint = 4;
})(g || (g = {}));
(function (e) {
  e.Unnecessary = 1;
  e.Deprecated = 2;
})(m || (m = {}));
(function (e) {
  e.is = function (e) {
    var t = e;
    return null != t && ue.string(t.href);
  };
})(y || (y = {}));
(function (e) {
  e.create = function (e, t, r, n, i, o) {
    var s = {
      range: e,
      message: t,
    };
    if (ue.defined(r)) {
      s.severity = r;
    }
    if (ue.defined(n)) {
      s.code = n;
    }
    if (ue.defined(i)) {
      s.source = i;
    }
    if (ue.defined(o)) {
      s.relatedInformation = o;
    }
    return s;
  };
  e.is = function (e) {
    var t;
    var r = e;
    return (
      ue.defined(r) &&
      s.is(r.range) &&
      ue.string(r.message) &&
      (ue.number(r.severity) || ue.undefined(r.severity)) &&
      (ue.integer(r.code) || ue.string(r.code) || ue.undefined(r.code)) &&
      (ue.undefined(r.codeDescription) ||
        ue.string(
          null === (t = r.codeDescription) || undefined === t
            ? undefined
            : t.href
        )) &&
      (ue.string(r.source) || ue.undefined(r.source)) &&
      (ue.undefined(r.relatedInformation) ||
        ue.typedArray(r.relatedInformation, f.is))
    );
  };
})(v || (v = {}));
(function (e) {
  e.create = function (e, t) {
    for (r = [], n = 2, undefined; n < arguments.length; n++) {
      var r;
      var n;
      r[n - 2] = arguments[n];
    }
    var i = {
      title: e,
      command: t,
    };
    if (ue.defined(r) && r.length > 0) {
      i.arguments = r;
    }
    return i;
  };
  e.is = function (e) {
    var t = e;
    return ue.defined(t) && ue.string(t.title) && ue.string(t.command);
  };
})(_ || (_ = {}));
(function (e) {
  e.replace = function (e, t) {
    return {
      range: e,
      newText: t,
    };
  };
  e.insert = function (e, t) {
    return {
      range: {
        start: e,
        end: e,
      },
      newText: t,
    };
  };
  e.del = function (e) {
    return {
      range: e,
      newText: "",
    };
  };
  e.is = function (e) {
    var t = e;
    return ue.objectLiteral(t) && ue.string(t.newText) && s.is(t.range);
  };
})(b || (b = {}));
(function (e) {
  e.create = function (e, t, r) {
    var n = {
      label: e,
    };
    if (undefined !== t) {
      n.needsConfirmation = t;
    }
    if (undefined !== r) {
      n.description = r;
    }
    return n;
  };
  e.is = function (e) {
    var t = e;
    return (
      undefined !== t &&
      ue.objectLiteral(t) &&
      ue.string(t.label) &&
      (ue.boolean(t.needsConfirmation) || undefined === t.needsConfirmation) &&
      (ue.string(t.description) || undefined === t.description)
    );
  };
})(w || (w = {}));
(function (e) {
  e.is = function (e) {
    return "string" == typeof e;
  };
})(C || (C = {}));
(function (e) {
  e.replace = function (e, t, r) {
    return {
      range: e,
      newText: t,
      annotationId: r,
    };
  };
  e.insert = function (e, t, r) {
    return {
      range: {
        start: e,
        end: e,
      },
      newText: t,
      annotationId: r,
    };
  };
  e.del = function (e, t) {
    return {
      range: e,
      newText: "",
      annotationId: t,
    };
  };
  e.is = function (e) {
    var t = e;
    return b.is(t) && (w.is(t.annotationId) || C.is(t.annotationId));
  };
})(E || (E = {}));
(function (e) {
  e.create = function (e, t) {
    return {
      textDocument: e,
      edits: t,
    };
  };
  e.is = function (e) {
    var t = e;
    return ue.defined(t) && R.is(t.textDocument) && Array.isArray(t.edits);
  };
})(T || (T = {}));
(function (e) {
  e.create = function (e, t, r) {
    var n = {
      kind: "create",
      uri: e,
    };
    if (
      undefined === t ||
      (undefined === t.overwrite && undefined === t.ignoreIfExists)
    ) {
      n.options = t;
    }
    if (undefined !== r) {
      n.annotationId = r;
    }
    return n;
  };
  e.is = function (e) {
    var t = e;
    return (
      t &&
      "create" === t.kind &&
      ue.string(t.uri) &&
      (undefined === t.options ||
        ((undefined === t.options.overwrite ||
          ue.boolean(t.options.overwrite)) &&
          (undefined === t.options.ignoreIfExists ||
            ue.boolean(t.options.ignoreIfExists)))) &&
      (undefined === t.annotationId || C.is(t.annotationId))
    );
  };
})(S || (S = {}));
(function (e) {
  e.create = function (e, t, r, n) {
    var i = {
      kind: "rename",
      oldUri: e,
      newUri: t,
    };
    if (
      undefined === r ||
      (undefined === r.overwrite && undefined === r.ignoreIfExists)
    ) {
      i.options = r;
    }
    if (undefined !== n) {
      i.annotationId = n;
    }
    return i;
  };
  e.is = function (e) {
    var t = e;
    return (
      t &&
      "rename" === t.kind &&
      ue.string(t.oldUri) &&
      ue.string(t.newUri) &&
      (undefined === t.options ||
        ((undefined === t.options.overwrite ||
          ue.boolean(t.options.overwrite)) &&
          (undefined === t.options.ignoreIfExists ||
            ue.boolean(t.options.ignoreIfExists)))) &&
      (undefined === t.annotationId || C.is(t.annotationId))
    );
  };
})(x || (x = {}));
(function (e) {
  e.create = function (e, t, r) {
    var n = {
      kind: "delete",
      uri: e,
    };
    if (
      undefined === t ||
      (undefined === t.recursive && undefined === t.ignoreIfNotExists)
    ) {
      n.options = t;
    }
    if (undefined !== r) {
      n.annotationId = r;
    }
    return n;
  };
  e.is = function (e) {
    var t = e;
    return (
      t &&
      "delete" === t.kind &&
      ue.string(t.uri) &&
      (undefined === t.options ||
        ((undefined === t.options.recursive ||
          ue.boolean(t.options.recursive)) &&
          (undefined === t.options.ignoreIfNotExists ||
            ue.boolean(t.options.ignoreIfNotExists)))) &&
      (undefined === t.annotationId || C.is(t.annotationId))
    );
  };
})(k || (k = {}));
(function (e) {
  e.is = function (e) {
    var t = e;
    return (
      t &&
      (undefined !== t.changes || undefined !== t.documentChanges) &&
      (undefined === t.documentChanges ||
        t.documentChanges.every(function (e) {
          return ue.string(e.kind) ? S.is(e) || x.is(e) || k.is(e) : T.is(e);
        }))
    );
  };
})(I || (I = {}));
var A;
var P;
var R;
var N;
var O;
var L;
var D;
var M;
var B;
var F;
var j;
var U;
var $;
var q;
var H;
var V;
var z;
var K;
var W;
var G;
var Q;
var J;
var Y;
var X;
var Z;
var ee;
var te;
var re;
var ne;
var ie;
var oe = (function () {
  function e(e, t) {
    this.edits = e;
    this.changeAnnotations = t;
  }
  e.prototype.insert = function (e, t, r) {
    var n;
    var i;
    if (undefined === r) {
      n = b.insert(e, t);
    } else {
      if (C.is(r)) {
        i = r;
        n = E.insert(e, t, r);
      } else {
        this.assertChangeAnnotations(this.changeAnnotations);
        i = this.changeAnnotations.manage(r);
        n = E.insert(e, t, i);
      }
    }
    this.edits.push(n);
    if (void 0 !== i) return i;
  };
  e.prototype.replace = function (e, t, r) {
    var n;
    var i;
    if (undefined === r) {
      n = b.replace(e, t);
    } else {
      if (C.is(r)) {
        i = r;
        n = E.replace(e, t, r);
      } else {
        this.assertChangeAnnotations(this.changeAnnotations);
        i = this.changeAnnotations.manage(r);
        n = E.replace(e, t, i);
      }
    }
    this.edits.push(n);
    if (void 0 !== i) return i;
  };
  e.prototype.delete = function (e, t) {
    var r;
    var n;
    if (undefined === t) {
      r = b.del(e);
    } else {
      if (C.is(t)) {
        n = t;
        r = E.del(e, t);
      } else {
        this.assertChangeAnnotations(this.changeAnnotations);
        n = this.changeAnnotations.manage(t);
        r = E.del(e, n);
      }
    }
    this.edits.push(r);
    if (void 0 !== n) return n;
  };
  e.prototype.add = function (e) {
    this.edits.push(e);
  };
  e.prototype.all = function () {
    return this.edits;
  };
  e.prototype.clear = function () {
    this.edits.splice(0, this.edits.length);
  };
  e.prototype.assertChangeAnnotations = function (e) {
    if (undefined === e)
      throw new Error(
        "Text edit change is not configured to manage change annotations."
      );
  };
  return e;
})();
var se = (function () {
  function e(e) {
    this._annotations = undefined === e ? Object.create(null) : e;
    this._counter = 0;
    this._size = 0;
  }
  e.prototype.all = function () {
    return this._annotations;
  };
  Object.defineProperty(e.prototype, "size", {
    get: function () {
      return this._size;
    },
    enumerable: false,
    configurable: true,
  });
  e.prototype.manage = function (e, t) {
    var r;
    if (C.is(e)) {
      r = e;
    } else {
      r = this.nextId();
      t = e;
    }
    if (void 0 !== this._annotations[r])
      throw new Error("Id " + r + " is already in use.");
    if (undefined === t) throw new Error("No annotation provided for id " + r);
    this._annotations[r] = t;
    this._size++;
    return r;
  };
  e.prototype.nextId = function () {
    this._counter++;
    return this._counter.toString();
  };
  return e;
})();
var ae = (function () {
  function e(e) {
    var t = this;
    this._textEditChanges = Object.create(null);
    if (undefined !== e) {
      this._workspaceEdit = e;
      if (e.documentChanges) {
        this._changeAnnotations = new se(e.changeAnnotations);
        e.changeAnnotations = this._changeAnnotations.all();
        e.documentChanges.forEach(function (e) {
          if (T.is(e)) {
            var r = new oe(e.edits, t._changeAnnotations);
            t._textEditChanges[e.textDocument.uri] = r;
          }
        });
      } else {
        if (e.changes) {
          Object.keys(e.changes).forEach(function (r) {
            var n = new oe(e.changes[r]);
            t._textEditChanges[r] = n;
          });
        }
      }
    } else {
      this._workspaceEdit = {};
    }
  }
  Object.defineProperty(e.prototype, "edit", {
    get: function () {
      this.initDocumentChanges();
      if (undefined !== this._changeAnnotations) {
        if (0 === this._changeAnnotations.size) {
          this._workspaceEdit.changeAnnotations = undefined;
        } else {
          this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
        }
      }
      return this._workspaceEdit;
    },
    enumerable: false,
    configurable: true,
  });
  e.prototype.getTextEditChange = function (e) {
    if (R.is(e)) {
      this.initDocumentChanges();
      if (void 0 === this._workspaceEdit.documentChanges)
        throw new Error(
          "Workspace edit is not configured for document changes."
        );
      var t = {
        uri: e.uri,
        version: e.version,
      };
      if (!(n = this._textEditChanges[t.uri])) {
        var r = {
          textDocument: t,
          edits: (i = []),
        };
        this._workspaceEdit.documentChanges.push(r);
        n = new oe(i, this._changeAnnotations);
        this._textEditChanges[t.uri] = n;
      }
      return n;
    }
    this.initChanges();
    if (void 0 === this._workspaceEdit.changes)
      throw new Error(
        "Workspace edit is not configured for normal text edit changes."
      );
    var n;
    if (!(n = this._textEditChanges[e])) {
      var i = [];
      this._workspaceEdit.changes[e] = i;
      n = new oe(i);
      this._textEditChanges[e] = n;
    }
    return n;
  };
  e.prototype.initDocumentChanges = function () {
    if (
      undefined === this._workspaceEdit.documentChanges &&
      undefined === this._workspaceEdit.changes
    ) {
      this._changeAnnotations = new se();
      this._workspaceEdit.documentChanges = [];
      this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
    }
  };
  e.prototype.initChanges = function () {
    if (
      undefined === this._workspaceEdit.documentChanges &&
      undefined === this._workspaceEdit.changes
    ) {
      this._workspaceEdit.changes = Object.create(null);
    }
  };
  e.prototype.createFile = function (e, t, r) {
    this.initDocumentChanges();
    if (void 0 === this._workspaceEdit.documentChanges)
      throw new Error("Workspace edit is not configured for document changes.");
    var n;
    var i;
    var o;
    if (w.is(t) || C.is(t)) {
      n = t;
    } else {
      r = t;
    }
    if (undefined === n) {
      i = S.create(e, r);
    } else {
      o = C.is(n) ? n : this._changeAnnotations.manage(n);
      i = S.create(e, r, o);
    }
    this._workspaceEdit.documentChanges.push(i);
    if (void 0 !== o) return o;
  };
  e.prototype.renameFile = function (e, t, r, n) {
    this.initDocumentChanges();
    if (void 0 === this._workspaceEdit.documentChanges)
      throw new Error("Workspace edit is not configured for document changes.");
    var i;
    var o;
    var s;
    if (w.is(r) || C.is(r)) {
      i = r;
    } else {
      n = r;
    }
    if (undefined === i) {
      o = x.create(e, t, n);
    } else {
      s = C.is(i) ? i : this._changeAnnotations.manage(i);
      o = x.create(e, t, n, s);
    }
    this._workspaceEdit.documentChanges.push(o);
    if (void 0 !== s) return s;
  };
  e.prototype.deleteFile = function (e, t, r) {
    this.initDocumentChanges();
    if (void 0 === this._workspaceEdit.documentChanges)
      throw new Error("Workspace edit is not configured for document changes.");
    var n;
    var i;
    var o;
    if (w.is(t) || C.is(t)) {
      n = t;
    } else {
      r = t;
    }
    if (undefined === n) {
      i = k.create(e, r);
    } else {
      o = C.is(n) ? n : this._changeAnnotations.manage(n);
      i = k.create(e, r, o);
    }
    this._workspaceEdit.documentChanges.push(i);
    if (void 0 !== o) return o;
  };
  return e;
})();
!(function (e) {
  e.create = function (e) {
    return {
      uri: e,
    };
  };
  e.is = function (e) {
    var t = e;
    return ue.defined(t) && ue.string(t.uri);
  };
})(A || (A = {}));
(function (e) {
  e.create = function (e, t) {
    return {
      uri: e,
      version: t,
    };
  };
  e.is = function (e) {
    var t = e;
    return ue.defined(t) && ue.string(t.uri) && ue.integer(t.version);
  };
})(P || (P = {}));
(function (e) {
  e.create = function (e, t) {
    return {
      uri: e,
      version: t,
    };
  };
  e.is = function (e) {
    var t = e;
    return (
      ue.defined(t) &&
      ue.string(t.uri) &&
      (null === t.version || ue.integer(t.version))
    );
  };
})(R || (R = {}));
(function (e) {
  e.create = function (e, t, r, n) {
    return {
      uri: e,
      languageId: t,
      version: r,
      text: n,
    };
  };
  e.is = function (e) {
    var t = e;
    return (
      ue.defined(t) &&
      ue.string(t.uri) &&
      ue.string(t.languageId) &&
      ue.integer(t.version) &&
      ue.string(t.text)
    );
  };
})(N || (N = {}));
(function (e) {
  e.PlainText = "plaintext";
  e.Markdown = "markdown";
})(O || (O = {}));
(function (e) {
  e.is = function (t) {
    var r = t;
    return r === e.PlainText || r === e.Markdown;
  };
})(O || (O = {}));
(function (e) {
  e.is = function (e) {
    var t = e;
    return ue.objectLiteral(e) && O.is(t.kind) && ue.string(t.value);
  };
})(L || (L = {}));
(function (e) {
  e.Text = 1;
  e.Method = 2;
  e.Function = 3;
  e.Constructor = 4;
  e.Field = 5;
  e.Variable = 6;
  e.Class = 7;
  e.Interface = 8;
  e.Module = 9;
  e.Property = 10;
  e.Unit = 11;
  e.Value = 12;
  e.Enum = 13;
  e.Keyword = 14;
  e.Snippet = 15;
  e.Color = 16;
  e.File = 17;
  e.Reference = 18;
  e.Folder = 19;
  e.EnumMember = 20;
  e.Constant = 21;
  e.Struct = 22;
  e.Event = 23;
  e.Operator = 24;
  e.TypeParameter = 25;
})(D || (D = {}));
(function (e) {
  e.PlainText = 1;
  e.Snippet = 2;
})(M || (M = {}));
(function (e) {
  e.Deprecated = 1;
})(B || (B = {}));
(function (e) {
  e.create = function (e, t, r) {
    return {
      newText: e,
      insert: t,
      replace: r,
    };
  };
  e.is = function (e) {
    var t = e;
    return t && ue.string(t.newText) && s.is(t.insert) && s.is(t.replace);
  };
})(F || (F = {}));
(function (e) {
  e.asIs = 1;
  e.adjustIndentation = 2;
})(j || (j = {}));
(function (e) {
  e.create = function (e) {
    return {
      label: e,
    };
  };
})(U || (U = {}));
(function (e) {
  e.create = function (e, t) {
    return {
      items: e || [],
      isIncomplete: !!t,
    };
  };
})($ || ($ = {}));
(function (e) {
  e.fromPlainText = function (e) {
    return e.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
  };
  e.is = function (e) {
    var t = e;
    return (
      ue.string(t) ||
      (ue.objectLiteral(t) && ue.string(t.language) && ue.string(t.value))
    );
  };
})(q || (q = {}));
(function (e) {
  e.is = function (e) {
    var t = e;
    return (
      !!t &&
      ue.objectLiteral(t) &&
      (L.is(t.contents) ||
        q.is(t.contents) ||
        ue.typedArray(t.contents, q.is)) &&
      (undefined === e.range || s.is(e.range))
    );
  };
})(H || (H = {}));
(function (e) {
  e.create = function (e, t) {
    return t
      ? {
          label: e,
          documentation: t,
        }
      : {
          label: e,
        };
  };
})(V || (V = {}));
(function (e) {
  e.create = function (e, t) {
    for (r = [], n = 2, undefined; n < arguments.length; n++) {
      var r;
      var n;
      r[n - 2] = arguments[n];
    }
    var i = {
      label: e,
    };
    if (ue.defined(t)) {
      i.documentation = t;
    }
    if (ue.defined(r)) {
      i.parameters = r;
    } else {
      i.parameters = [];
    }
    return i;
  };
})(z || (z = {}));
(function (e) {
  e.Text = 1;
  e.Read = 2;
  e.Write = 3;
})(K || (K = {}));
(function (e) {
  e.create = function (e, t) {
    var r = {
      range: e,
    };
    if (ue.number(t)) {
      r.kind = t;
    }
    return r;
  };
})(W || (W = {}));
(function (e) {
  e.File = 1;
  e.Module = 2;
  e.Namespace = 3;
  e.Package = 4;
  e.Class = 5;
  e.Method = 6;
  e.Property = 7;
  e.Field = 8;
  e.Constructor = 9;
  e.Enum = 10;
  e.Interface = 11;
  e.Function = 12;
  e.Variable = 13;
  e.Constant = 14;
  e.String = 15;
  e.Number = 16;
  e.Boolean = 17;
  e.Array = 18;
  e.Object = 19;
  e.Key = 20;
  e.Null = 21;
  e.EnumMember = 22;
  e.Struct = 23;
  e.Event = 24;
  e.Operator = 25;
  e.TypeParameter = 26;
})(G || (G = {}));
(function (e) {
  e.Deprecated = 1;
})(Q || (Q = {}));
(function (e) {
  e.create = function (e, t, r, n, i) {
    var o = {
      name: e,
      kind: t,
      location: {
        uri: n,
        range: r,
      },
    };
    if (i) {
      o.containerName = i;
    }
    return o;
  };
})(J || (J = {}));
(function (e) {
  e.create = function (e, t, r, n, i, o) {
    var s = {
      name: e,
      detail: t,
      kind: r,
      range: n,
      selectionRange: i,
    };
    if (undefined !== o) {
      s.children = o;
    }
    return s;
  };
  e.is = function (e) {
    var t = e;
    return (
      t &&
      ue.string(t.name) &&
      ue.number(t.kind) &&
      s.is(t.range) &&
      s.is(t.selectionRange) &&
      (undefined === t.detail || ue.string(t.detail)) &&
      (undefined === t.deprecated || ue.boolean(t.deprecated)) &&
      (undefined === t.children || Array.isArray(t.children)) &&
      (undefined === t.tags || Array.isArray(t.tags))
    );
  };
})(Y || (Y = {}));
(function (e) {
  e.Empty = "";
  e.QuickFix = "quickfix";
  e.Refactor = "refactor";
  e.RefactorExtract = "refactor.extract";
  e.RefactorInline = "refactor.inline";
  e.RefactorRewrite = "refactor.rewrite";
  e.Source = "source";
  e.SourceOrganizeImports = "source.organizeImports";
  e.SourceFixAll = "source.fixAll";
})(X || (X = {}));
(function (e) {
  e.create = function (e, t) {
    var r = {
      diagnostics: e,
    };
    if (null != t) {
      r.only = t;
    }
    return r;
  };
  e.is = function (e) {
    var t = e;
    return (
      ue.defined(t) &&
      ue.typedArray(t.diagnostics, v.is) &&
      (undefined === t.only || ue.typedArray(t.only, ue.string))
    );
  };
})(Z || (Z = {}));
(function (e) {
  e.create = function (e, t, r) {
    var n = {
      title: e,
    };
    var i = true;
    if ("string" == typeof t) {
      i = false;
      n.kind = t;
    } else {
      if (_.is(t)) {
        n.command = t;
      } else {
        n.edit = t;
      }
    }
    if (i && undefined !== r) {
      n.kind = r;
    }
    return n;
  };
  e.is = function (e) {
    var t = e;
    return (
      t &&
      ue.string(t.title) &&
      (undefined === t.diagnostics || ue.typedArray(t.diagnostics, v.is)) &&
      (undefined === t.kind || ue.string(t.kind)) &&
      (undefined !== t.edit || undefined !== t.command) &&
      (undefined === t.command || _.is(t.command)) &&
      (undefined === t.isPreferred || ue.boolean(t.isPreferred)) &&
      (undefined === t.edit || I.is(t.edit))
    );
  };
})(ee || (ee = {}));
(function (e) {
  e.create = function (e, t) {
    var r = {
      range: e,
    };
    if (ue.defined(t)) {
      r.data = t;
    }
    return r;
  };
  e.is = function (e) {
    var t = e;
    return (
      ue.defined(t) &&
      s.is(t.range) &&
      (ue.undefined(t.command) || _.is(t.command))
    );
  };
})(te || (te = {}));
(function (e) {
  e.create = function (e, t) {
    return {
      tabSize: e,
      insertSpaces: t,
    };
  };
  e.is = function (e) {
    var t = e;
    return (
      ue.defined(t) && ue.uinteger(t.tabSize) && ue.boolean(t.insertSpaces)
    );
  };
})(re || (re = {}));
(function (e) {
  e.create = function (e, t, r) {
    return {
      range: e,
      target: t,
      data: r,
    };
  };
  e.is = function (e) {
    var t = e;
    return (
      ue.defined(t) &&
      s.is(t.range) &&
      (ue.undefined(t.target) || ue.string(t.target))
    );
  };
})(ne || (ne = {}));
(function (e) {
  e.create = function (e, t) {
    return {
      range: e,
      parent: t,
    };
  };
  e.is = function (t) {
    var r = t;
    return (
      undefined !== r &&
      s.is(r.range) &&
      (undefined === r.parent || e.is(r.parent))
    );
  };
})(ie || (ie = {}));
var ce;
var le = ["\n", "\r\n", "\r"];
!(function (e) {
  function t(e, r) {
    if (e.length <= 1) return e;
    var n = (e.length / 2) | 0;
    var i = e.slice(0, n);
    var o = e.slice(n);
    t(i, r);
    t(o, r);
    for (s = 0, a = 0, c = 0, undefined; s < i.length && a < o.length; ) {
      var s;
      var a;
      var c;
      var l = r(i[s], o[a]);
      e[c++] = l <= 0 ? i[s++] : o[a++];
    }
    for (; s < i.length; ) e[c++] = i[s++];
    for (; a < o.length; ) e[c++] = o[a++];
    return e;
  }
  e.create = function (e, t, r, n) {
    return new de(e, t, r, n);
  };
  e.is = function (e) {
    var t = e;
    return !!(
      ue.defined(t) &&
      ue.string(t.uri) &&
      (ue.undefined(t.languageId) || ue.string(t.languageId)) &&
      ue.uinteger(t.lineCount) &&
      ue.func(t.getText) &&
      ue.func(t.positionAt) &&
      ue.func(t.offsetAt)
    );
  };
  e.applyEdits = function (e, r) {
    for (
      n = e.getText(),
        i = t(r, function (e, t) {
          var r = e.range.start.line - t.range.start.line;
          return 0 === r
            ? e.range.start.character - t.range.start.character
            : r;
        }),
        o = n.length,
        s = i.length - 1,
        undefined;
      s >= 0;
      s--
    ) {
      var n;
      var i;
      var o;
      var s;
      var a = i[s];
      var c = e.offsetAt(a.range.start);
      var l = e.offsetAt(a.range.end);
      if (!(l <= o)) throw new Error("Overlapping edit");
      n = n.substring(0, c) + a.newText + n.substring(l, n.length);
      o = c;
    }
    return n;
  };
})(ce || (ce = {}));
var ue;
var de = (function () {
  function e(e, t, r, n) {
    this._uri = e;
    this._languageId = t;
    this._version = r;
    this._content = n;
    this._lineOffsets = undefined;
  }
  Object.defineProperty(e.prototype, "uri", {
    get: function () {
      return this._uri;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(e.prototype, "languageId", {
    get: function () {
      return this._languageId;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(e.prototype, "version", {
    get: function () {
      return this._version;
    },
    enumerable: false,
    configurable: true,
  });
  e.prototype.getText = function (e) {
    if (e) {
      var t = this.offsetAt(e.start);
      var r = this.offsetAt(e.end);
      return this._content.substring(t, r);
    }
    return this._content;
  };
  e.prototype.update = function (e, t) {
    this._content = e.text;
    this._version = t;
    this._lineOffsets = undefined;
  };
  e.prototype.getLineOffsets = function () {
    if (undefined === this._lineOffsets) {
      for (
        e = [], t = this._content, r = true, n = 0, undefined;
        n < t.length;
        n++
      ) {
        var e;
        var t;
        var r;
        var n;
        if (r) {
          e.push(n);
          r = false;
        }
        var i = t.charAt(n);
        r = "\r" === i || "\n" === i;
        if ("\r" === i && n + 1 < t.length && "\n" === t.charAt(n + 1)) {
          n++;
        }
      }
      if (r && t.length > 0) {
        e.push(t.length);
      }
      this._lineOffsets = e;
    }
    return this._lineOffsets;
  };
  e.prototype.positionAt = function (e) {
    e = Math.max(Math.min(e, this._content.length), 0);
    var t = this.getLineOffsets();
    var r = 0;
    var n = t.length;
    if (0 === n) return o.create(0, e);
    for (; r < n; ) {
      var i = Math.floor((r + n) / 2);
      if (t[i] > e) {
        n = i;
      } else {
        r = i + 1;
      }
    }
    var s = r - 1;
    return o.create(s, e - t[s]);
  };
  e.prototype.offsetAt = function (e) {
    var t = this.getLineOffsets();
    if (e.line >= t.length) return this._content.length;
    if (e.line < 0) return 0;
    var r = t[e.line];
    var n = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
    return Math.max(Math.min(r + e.character, n), r);
  };
  Object.defineProperty(e.prototype, "lineCount", {
    get: function () {
      return this.getLineOffsets().length;
    },
    enumerable: false,
    configurable: true,
  });
  return e;
})();
!(function (e) {
  var t = Object.prototype.toString;
  e.defined = function (e) {
    return undefined !== e;
  };
  e.undefined = function (e) {
    return undefined === e;
  };
  e.boolean = function (e) {
    return true === e || false === e;
  };
  e.string = function (e) {
    return "[object String]" === t.call(e);
  };
  e.number = function (e) {
    return "[object Number]" === t.call(e);
  };
  e.numberRange = function (e, r, n) {
    return "[object Number]" === t.call(e) && r <= e && e <= n;
  };
  e.integer = function (e) {
    return (
      "[object Number]" === t.call(e) && -2147483648 <= e && e <= 2147483647
    );
  };
  e.uinteger = function (e) {
    return "[object Number]" === t.call(e) && 0 <= e && e <= 2147483647;
  };
  e.func = function (e) {
    return "[object Function]" === t.call(e);
  };
  e.objectLiteral = function (e) {
    return null !== e && "object" == typeof e;
  };
  e.typedArray = function (e, t) {
    return Array.isArray(e) && e.every(t);
  };
})(ue || (ue = {}));