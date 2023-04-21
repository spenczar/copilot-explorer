Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.ChangeTracker = undefined;
const M_PathUtilsManager_maybe = require("PathUtilsManager");
exports.ChangeTracker = class {
  get offset() {
    return this._offset;
  }
  constructor(e, t, r) {
    this._referenceCount = 0;
    this._isDisposed = false;
    this._offset = r;
    const i = e.get(M_PathUtilsManager_maybe.TextDocumentManager);
    this._tracker = i.onDidChangeTextDocument(async (e) => {
      if (e.document.uri === t)
        for (const t of e.contentChanges)
          if (t.rangeOffset + t.rangeLength <= this.offset) {
            const e = t.text.length - t.rangeLength;
            this._offset = this._offset + e;
          }
    });
  }
  push(e, t) {
    if (this._isDisposed)
      throw new Error("Unable to push new actions to a disposed ChangeTracker");
    this._referenceCount++;
    setTimeout(() => {
      e();
      this._referenceCount--;
      if (0 === this._referenceCount) {
        this._tracker.dispose();
        this._isDisposed = true;
      }
    }, t);
  }
};
