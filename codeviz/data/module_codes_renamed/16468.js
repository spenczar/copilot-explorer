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
const M_JavaParser_maybe = require("JavaParser");
const M_Markdown_Processing_Utils_maybe = require("Markdown-Processing-Utils");
const M_language_parser_utils_maybe = require("language-parser-utils");
M_language_parser_utils_maybe.registerLanguageSpecificParser(
  "markdown",
  M_Markdown_Processing_Utils_maybe.processMarkdown
);
M_language_parser_utils_maybe.registerLanguageSpecificParser(
  "java",
  M_JavaParser_maybe.processJava
);
i(require("TreeNodeUtils"), exports);
i(require("tree-parser-utils"), exports);
i(require("TreeTraversalUtils"), exports);
i(require("language-parser-utils"), exports);
i(require("WindowDelineationManager"), exports);
