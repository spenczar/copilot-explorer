Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.registerCursorTracker =
  exports.cursorHistoryStack =
  exports.registerDocumentTracker =
  exports.sortByAccessTimes =
  exports.accessTimes =
    undefined;
const n = require(70819);
exports.accessTimes = new Map();
exports.sortByAccessTimes = function (e) {
  return [...e].sort((e, r) => {
    const n = exports.accessTimes.get(e.uri.toString()) ?? 0;
    return (exports.accessTimes.get(r.uri.toString()) ?? 0) - n;
  });
};
exports.registerDocumentTracker = (e) =>
  e.get(n.TextDocumentManager).onDidFocusTextDocument((e) => {
    if (e) {
      exports.accessTimes.set(e.document.uri.toString(), Date.now());
    }
  });
exports.cursorHistoryStack = [];
exports.registerCursorTracker = (e) =>
  e.get(n.TextDocumentManager).onDidChangeCursor((e) => {
    if (
      e &&
      e.selections.length > 0 &&
      e.selections[0].active.line == e.selections[0].anchor.line &&
      e.selections[0].active.character == e.selections[0].anchor.character
    ) {
      exports.cursorHistoryStack.push({
        uri: e.textEditor.document.uri.toString(),
        offset: e.textEditor.document.offsetAt(e.selections[0].active),
        timestamp: Date.now(),
      });
      if (exports.cursorHistoryStack.length > 1e3) {
        exports.cursorHistoryStack.shift();
      }
    }
  });