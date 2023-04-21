var n =
  (this && this.__createBinding) ||
  (Object.create
    ? function (e, t, r, n) {
        if (undefined === n) {
          n = r;
        }
        var i = Object.getOwnPropertyDescriptor(t, r);
        if (i && !("get" in i ? !t.__esModule : i.writable || i.configurable)) {
          i = {
            enumerable: true,
            get: function () {
              return t[r];
            },
          };
        }
        Object.defineProperty(e, n, i);
      }
    : function (e, t, r, n) {
        if (undefined === n) {
          n = r;
        }
        e[n] = t[r];
      });
var i =
  (this && this.__exportStar) ||
  function (e, t) {
    for (var r in e)
      if ("default" === r || Object.prototype.hasOwnProperty.call(t, r)) {
        n(t, e, r);
      }
  };
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.createWorker =
  exports.NeighboringSnippetType =
  exports.NeighboringTabsOption =
  exports.FileSystem =
  exports.comment =
  exports.languageCommentMarkers =
    undefined;
const M_path = require("path");
const M_worker_threads = require("worker_threads");
i(require("language-marker-parsers"), exports);
i(require("language-parser-utils"), exports);
i(require("TreeSitterNodeMatcher"), exports);
i(require("PromptParsingUtils"), exports);
i(require("TokenizerManager"), exports);
var M_language_marker_constants_maybe = require("language-marker-constants");
exports.languageCommentMarkers =
  M_language_marker_constants_maybe.languageCommentMarkers;
exports.comment = M_language_marker_constants_maybe.comment;
var M_FileSystemUtils_maybe = require("FileSystemUtils");
exports.FileSystem = M_FileSystemUtils_maybe.FileSystem;
var M_NeighboringSnippetManager_maybe = require("NeighboringSnippetManager");
exports.NeighboringTabsOption =
  M_NeighboringSnippetManager_maybe.NeighboringTabsOption;
exports.NeighboringSnippetType =
  M_NeighboringSnippetManager_maybe.NeighboringSnippetType;
exports.createWorker = function () {
  return new M_worker_threads.Worker(
    M_path.resolve(__dirname, "..", "dist", "worker.js")
  );
};
