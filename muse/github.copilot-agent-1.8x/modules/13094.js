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
const o = require("path");
const s = require("worker_threads");
i(require(16468), exports);
i(require(42133), exports);
i(require(94343), exports);
i(require(28684), exports);
i(require(83542), exports);
var a = require(23272);
exports.languageCommentMarkers = a.languageCommentMarkers;
exports.comment = a.comment;
var c = require(65614);
exports.FileSystem = c.FileSystem;
var l = require(27289);
exports.NeighboringTabsOption = l.NeighboringTabsOption;
exports.NeighboringSnippetType = l.NeighboringSnippetType;
exports.createWorker = function () {
  return new s.Worker(o.resolve(__dirname, "..", "dist", "worker.js"));
};