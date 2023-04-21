var n;
var i;
var o;
n = {
  271: (e, t, r) => {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.defaultFileSystem = t.FileSystem = undefined;
    const n = r(747);
    t.FileSystem = class {};
    t.defaultFileSystem = {
      readFile: (e) => n.promises.readFile(e),
      mtime: async (e) => (await n.promises.stat(e)).mtimeMs,
      async stat(e) {
        const t = await n.promises.stat(e);
        return {
          ctime: t.ctimeMs,
          mtime: t.mtimeMs,
          size: t.size,
        };
      },
    };
  },
  876: (e, t) => {
    "use strict";

    function r(e) {
      return "virtual" === e.type;
    }
    function n(e) {
      return "top" === e.type;
    }
    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.duplicateTree =
      t.cutTreeAfterLine =
      t.isTop =
      t.isVirtual =
      t.isLine =
      t.isBlank =
      t.topNode =
      t.blankNode =
      t.lineNode =
      t.virtualNode =
        undefined;
    t.virtualNode = function (e, t, r) {
      return {
        type: "virtual",
        indentation: e,
        subs: t,
        label: r,
      };
    };
    t.lineNode = function (e, t, r, n, i) {
      if ("" === r)
        throw new Error("Cannot create a line node with an empty source line");
      return {
        type: "line",
        indentation: e,
        lineNumber: t,
        sourceLine: r,
        subs: n,
        label: i,
      };
    };
    t.blankNode = function (e) {
      return {
        type: "blank",
        lineNumber: e,
        subs: [],
      };
    };
    t.topNode = function (e) {
      return {
        type: "top",
        indentation: -1,
        subs: e ?? [],
      };
    };
    t.isBlank = function (e) {
      return "blank" === e.type;
    };
    t.isLine = function (e) {
      return "line" === e.type;
    };
    t.isVirtual = r;
    t.isTop = n;
    t.cutTreeAfterLine = function (e, t) {
      !(function e(i) {
        if (!r(i) && !n(i) && i.lineNumber === t) {
          i.subs = [];
          return true;
        }
        for (let t = 0; t < i.subs.length; t++)
          if (e(i.subs[t])) {
            i.subs = i.subs.slice(0, t + 1);
            return true;
          }
        return false;
      })(e);
    };
    t.duplicateTree = function (e) {
      return JSON.parse(JSON.stringify(e));
    };
  },
  59: (e, t, r) => {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.lastLineOf =
      t.firstLineOf =
      t.encodeTree =
      t.describeTree =
      t.deparseAndCutTree =
      t.deparseTree =
      t.deparseLine =
        undefined;
    const n = r(876);
    const i = r(617);
    function o(e) {
      return " ".repeat(e.indentation) + e.sourceLine + "\n";
    }
    function s(e) {
      return i.foldTree(
        e,
        "",
        function (e, t) {
          let r = "";
          if (n.isLine(e)) {
            r = o(e);
          } else {
            if (n.isBlank(e)) {
              r = "\n";
            }
          }
          return t + r;
        },
        "topDown"
      );
    }
    t.deparseLine = o;
    t.deparseTree = s;
    t.deparseAndCutTree = function (e, t) {
      const r = new Set(t);
      const i = [];
      let a = "";
      (function e(t) {
        if (undefined !== t.label && r.has(t.label)) {
          if ("" !== a) {
            i.push({
              label: undefined,
              source: a,
            });
          }
          i.push({
            label: t.label,
            source: s(t),
          });
          a = "";
        } else {
          if (n.isLine(t)) {
            a += o(t);
          }
          t.subs.forEach(e);
        }
      })(e);
      if ("" !== a) {
        i.push({
          label: undefined,
          source: a,
        });
      }
      return i;
    };
    t.describeTree = function e(t, r = 0) {
      const i = " ".repeat(r);
      if (undefined === t) return "UNDEFINED NODE";
      let o;
      o =
        undefined === t.subs
          ? "UNDEFINED SUBS"
          : t.subs.map((t) => e(t, r + 2)).join(",\n");
      o = "" === o ? "[]" : `[\n${o}\n      ${i}]`;
      const s =
        (n.isVirtual(t) || n.isTop(t)
          ? "   "
          : String(t.lineNumber).padStart(3, " ")) + `:  ${i}`;
      const a = undefined === t.label ? "" : JSON.stringify(t.label);
      return n.isVirtual(t) || n.isTop(t)
        ? `${s}vnode(${t.indentation}, ${a}, ${o})`
        : n.isBlank(t)
        ? `${s}blank(${a ?? ""})`
        : `${s}lnode(${t.indentation}, ${a}, ${JSON.stringify(
            t.sourceLine
          )}, ${o})`;
    };
    t.encodeTree = function e(t, r = "") {
      const i = undefined === t.label ? "" : `, ${JSON.stringify(t.label)}`;
      const o =
        !n.isBlank(t) && t.subs.length > 0
          ? `[\n${t.subs.map((t) => e(t, r + "  ")).join(", \n")}\n${r}]`
          : "[]";
      switch (t.type) {
        case "blank":
          return `${r}blankNode(${t.lineNumber}${i})`;
        case "top":
          return `topNode(${o}${i})`;
        case "virtual":
          return `${r}virtualNode(${t.indentation}, ${o}${i})`;
        case "line":
          return `${r}lineNode(${t.indentation}, ${t.lineNumber}, "${t.sourceLine}", ${o}${i})`;
      }
    };
    t.firstLineOf = function e(t) {
      if (n.isLine(t) || n.isBlank(t)) return t.lineNumber;
      for (const r of t.subs) {
        const t = e(r);
        if (undefined !== t) return t;
      }
    };
    t.lastLineOf = function e(t) {
      let r;
      let i = t.subs.length - 1;
      for (; i >= 0 && undefined === r; ) {
        r = e(t.subs[i]);
        i--;
      }
      return undefined !== r || n.isVirtual(t) || n.isTop(t) ? r : t.lineNumber;
    };
  },
  180: function (e, t, r) {
    "use strict";

    var n =
      (this && this.__createBinding) ||
      (Object.create
        ? function (e, t, r, n) {
            if (undefined === n) {
              n = r;
            }
            var i = Object.getOwnPropertyDescriptor(t, r);
            if (
              i &&
              !("get" in i ? !t.__esModule : i.writable || i.configurable)
            ) {
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
    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    const o = r(647);
    const s = r(152);
    const a = r(469);
    a.registerLanguageSpecificParser("markdown", s.processMarkdown);
    a.registerLanguageSpecificParser("java", o.processJava);
    i(r(876), t);
    i(r(59), t);
    i(r(617), t);
    i(r(469), t);
    i(r(312), t);
  },
  647: (e, t, r) => {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.processJava = undefined;
    const n = r(876);
    const i = r(617);
    const o = r(469);
    const s = o.buildLabelRules({
      package: /^package /,
      import: /^import /,
      class: /\bclass /,
      interface: /\binterface /,
      javadoc: /^\/\*\*/,
      comment_multi: /^\/\*[^*]/,
      comment_single: /^\/\//,
      annotation: /^@/,
      opener: /^[\[({]/,
      closer: /^[\])}]/,
    });
    t.processJava = function (e) {
      let t = e;
      o.labelLines(t, s);
      t = o.combineClosersAndOpeners(t);
      t = o.flattenVirtual(t);
      o.labelVirtualInherited(t);
      i.visitTree(
        t,
        (e) => {
          if ("class" === e.label || "interface" === e.label)
            for (const t of e.subs)
              if (
                n.isBlank(t) ||
                (undefined !== t.label && "annotation" !== t.label)
              ) {
                t.label = "member";
              }
        },
        "bottomUp"
      );
      return t;
    };
  },
  617: (e, t, r) => {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.rebuildTree =
      t.foldTree =
      t.visitTreeConditionally =
      t.visitTree =
      t.resetLineNumbers =
      t.mapLabels =
      t.clearLabelsIf =
      t.clearLabels =
        undefined;
    const n = r(876);
    function i(e, t, r) {
      !(function e(n) {
        if ("topDown" === r) {
          t(n);
        }
        n.subs.forEach((t) => {
          e(t);
        });
        if ("bottomUp" === r) {
          t(n);
        }
      })(e);
    }
    t.clearLabels = function (e) {
      i(
        e,
        (e) => {
          e.label = undefined;
        },
        "bottomUp"
      );
      return e;
    };
    t.clearLabelsIf = function (e, t) {
      i(
        e,
        (e) => {
          e.label = e.label ? (t(e.label) ? undefined : e.label) : undefined;
        },
        "bottomUp"
      );
      return e;
    };
    t.mapLabels = function e(t, r) {
      switch (t.type) {
        case "line":
        case "virtual":
          const n = t.subs.map((t) => e(t, r));
          return {
            ...t,
            subs: n,
            label: t.label ? r(t.label) : undefined,
          };
        case "blank":
          return {
            ...t,
            label: t.label ? r(t.label) : undefined,
          };
        case "top":
          return {
            ...t,
            subs: t.subs.map((t) => e(t, r)),
            label: t.label ? r(t.label) : undefined,
          };
      }
    };
    t.resetLineNumbers = function (e) {
      let t = 0;
      i(
        e,
        function (e) {
          if (n.isVirtual(e) || n.isTop(e)) {
            e.lineNumber = t;
            t++;
          }
        },
        "topDown"
      );
    };
    t.visitTree = i;
    t.visitTreeConditionally = function (e, t, r) {
      !(function e(n) {
        if ("topDown" === r && !t(n)) return false;
        let i = true;
        n.subs.forEach((t) => {
          i = i && e(t);
        });
        if ("bottomUp" === r) {
          i = i && t(n);
        }
        return i;
      })(e);
    };
    t.foldTree = function (e, t, r, n) {
      let o = t;
      i(
        e,
        function (e) {
          o = r(e, o);
        },
        n
      );
      return o;
    };
    t.rebuildTree = function (e, t, r) {
      const i = (e) => {
        if (undefined !== r && r(e)) return e;
        {
          const r = e.subs.map(i).filter((e) => undefined !== e);
          e.subs = r;
          return t(e);
        }
      };
      const o = i(e);
      return undefined !== o ? o : n.topNode();
    };
  },
  152: (e, t, r) => {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.processMarkdown = undefined;
    const n = r(876);
    const i = r(469);
    const o = i.buildLabelRules({
      heading: /^# /,
      subheading: /^## /,
      subsubheading: /### /,
    });
    t.processMarkdown = function (e) {
      let t = e;
      i.labelLines(t, o);
      if ((0, n.isBlank)(t)) return t;
      function r(e) {
        return "heading" === e.label
          ? 1
          : "subheading" === e.label
          ? 2
          : "subsubheading" === e.label
          ? 3
          : undefined;
      }
      let s = [t];
      let a = [...t.subs];
      t.subs = [];
      for (const e of a) {
        const t = r(e);
        if (undefined === t || n.isBlank(e)) s[s.length - 1].subs.push(e);
        else {
          for (; s.length < t; ) s.push(s[s.length - 1]);
          for (s[t - 1].subs.push(e), s[t] = e; s.length > t + 1; ) s.pop();
        }
      }
      t = i.groupBlocks(t);
      t = i.flattenVirtual(t);
      i.labelVirtualInherited(t);
      return t;
    };
  },
  469: (e, t, r) => {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.parseTree =
      t.registerLanguageSpecificParser =
      t.flattenVirtual =
      t.groupBlocks =
      t.combineClosersAndOpeners =
      t.buildLabelRules =
      t.labelVirtualInherited =
      t.labelLines =
      t.parseRaw =
        undefined;
    const n = r(876);
    const i = r(617);
    function o(e) {
      const t = e.split("\n");
      const r = t.map((e) => e.match(/^\s*/)[0].length);
      const i = t.map((e) => e.trimLeft());
      function o(e) {
        const [t, o] = s(e + 1, r[e]);
        return [n.lineNode(r[e], e, i[e], t), o];
      }
      function s(e, t) {
        let s;
        const a = [];
        let c;
        let l = e;
        for (; l < i.length && ("" === i[l] || r[l] > t); )
          if ("" === i[l]) {
            if (undefined === c) {
              c = l;
            }
            l += 1;
          } else {
            if (undefined !== c) {
              for (let e = c; e < l; e++) a.push(n.blankNode(e));
              c = undefined;
            }
            [s, l] = o(l);
            a.push(s);
          }
        if (undefined !== c) {
          l = c;
        }
        return [a, l];
      }
      const [a, c] = s(0, -1);
      let l = c;
      for (; l < i.length && "" === i[l]; ) {
        a.push(n.blankNode(l));
        l += 1;
      }
      if (l < i.length)
        throw new Error(
          `Parsing did not go to end of file. Ended at ${l} out of ${i.length}`
        );
      return n.topNode(a);
    }
    function s(e, t) {
      i.visitTree(
        e,
        function (e) {
          if (n.isLine(e)) {
            const r = t.find((t) => t.matches(e.sourceLine));
            if (r) {
              e.label = r.label;
            }
          }
        },
        "bottomUp"
      );
    }
    function a(e) {
      return Object.keys(e).map((t) => {
        let r;
        r = e[t].test ? (r) => e[t].test(r) : e[t];
        return {
          matches: r,
          label: t,
        };
      });
    }
    function c(e) {
      const t = i.rebuildTree(e, function (e) {
        if (
          0 === e.subs.length ||
          -1 ===
            e.subs.findIndex(
              (e) => "closer" === e.label || "opener" === e.label
            )
        )
          return e;
        const t = [];
        let r;
        for (let i = 0; i < e.subs.length; i++) {
          const o = e.subs[i];
          const s = e.subs[i - 1];
          if ("opener" === o.label && undefined !== s && n.isLine(s)) {
            s.subs.push(o);
            o.subs.forEach((e) => s.subs.push(e));
            o.subs = [];
          } else if (
            "closer" === o.label &&
            undefined !== r &&
            (n.isLine(o) || n.isVirtual(o)) &&
            o.indentation >= r.indentation
          ) {
            let e = t.length - 1;
            for (; e > 0 && n.isBlank(t[e]); ) e -= 1;
            r.subs.push(...t.splice(e + 1));
            if (o.subs.length > 0) {
              const e = r.subs.findIndex((e) => "newVirtual" !== e.label),
                t = r.subs.slice(0, e),
                i = r.subs.slice(e),
                s =
                  i.length > 0
                    ? [(0, n.virtualNode)(o.indentation, i, "newVirtual")]
                    : [];
              r.subs = [...t, ...s, o];
            } else r.subs.push(o);
          } else {
            t.push(o);
            if (n.isBlank(o)) {
              r = o;
            }
          }
        }
        e.subs = t;
        return e;
      });
      i.clearLabelsIf(e, (e) => "newVirtual" === e);
      return t;
    }
    t.parseRaw = o;
    t.labelLines = s;
    t.labelVirtualInherited = function (e) {
      i.visitTree(
        e,
        function (e) {
          if (n.isVirtual(e) && undefined === e.label) {
            const t = e.subs.filter((e) => !n.isBlank(e));
            if (1 === t.length) {
              e.label = t[0].label;
            }
          }
        },
        "bottomUp"
      );
    };
    t.buildLabelRules = a;
    t.combineClosersAndOpeners = c;
    t.groupBlocks = function (e, t = n.isBlank, r) {
      return i.rebuildTree(e, function (e) {
        if (e.subs.length <= 1) return e;
        const i = [];
        let o;
        let s = [];
        let a = false;
        function c(e = false) {
          if (undefined !== o && (i.length > 0 || !e)) {
            const e = n.virtualNode(o, s, r);
            i.push(e);
          } else s.forEach((e) => i.push(e));
        }
        for (let r = 0; r < e.subs.length; r++) {
          const i = e.subs[r];
          const l = t(i);
          if (!l && a) {
            c();
            s = [];
          }
          a = l;
          s.push(i);
          if (n.isBlank(i)) {
            o = o ?? i.indentation;
          }
        }
        c(true);
        e.subs = i;
        return e;
      });
    };
    t.flattenVirtual = function (e) {
      return i.rebuildTree(e, function (e) {
        return n.isVirtual(e) && undefined === e.label && e.subs.length <= 1
          ? 0 === e.subs.length
            ? undefined
            : e.subs[0]
          : (1 === e.subs.length &&
              n.isVirtual(e.subs[0]) &&
              undefined === e.subs[0].label &&
              (e.subs = e.subs[0].subs),
            e);
      });
    };
    const l = a({
      opener: /^[\[({]/,
      closer: /^[\])}]/,
    });
    const u = {};
    t.registerLanguageSpecificParser = function (e, t) {
      u[e] = t;
    };
    t.parseTree = function (e, t) {
      const r = o(e);
      const n = u[t ?? ""];
      return n ? n(r) : (s(r, l), c(r));
    };
  },
  312: (e, t, r) => {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.getWindowsDelineations = undefined;
    const n = r(469);
    const i = r(617);
    t.getWindowsDelineations = function (e, t, r, o) {
      if (e.length < r || 0 == o) return [];
      const s = [];
      const a = i.clearLabels(n.parseTree(e.join("\n"), t));
      i.visitTree(
        a,
        (e) => {
          if ("blank" === e.type)
            return void (e.label = {
              totalLength: 1,
              firstLineAfter: e.lineNumber + 1,
            });
          let t = "line" === e.type ? 1 : 0;
          let n = "line" === e.type ? e.lineNumber + 1 : NaN;
          function i(r) {
            return -1 == r
              ? n - t
              : e.subs[r].label.firstLineAfter - e.subs[r].label.totalLength;
          }
          function a(t, r) {
            return 0 == t ? r + 1 : e.subs[t - 1].label.firstLineAfter;
          }
          let c = "line" === e.type ? -1 : 0;
          let l = "line" === e.type ? 1 : 0;
          let u = 0;
          for (let d = 0; d < e.subs.length; d++) {
            for (
              ;
              c >= 0 && c < e.subs.length && "blank" === e.subs[c].type;

            ) {
              l -= e.subs[c].label.totalLength;
              c++;
            }
            if ("blank" !== e.subs[d].type) {
              u = d;
            }
            n = e.subs[d].label.firstLineAfter;
            t += e.subs[d].label.totalLength;
            l += e.subs[d].label.totalLength;
            if (l > o) {
              const t = i(c),
                n = a(d, t),
                p = u == d ? n : a(u, t);
              for (r <= n - t && s.push([t, p]); l > o; )
                (l -=
                  -1 == c
                    ? "line" == e.type
                      ? 1
                      : 0
                    : e.subs[c].label.totalLength),
                  c++;
            }
          }
          if (c < e.subs.length) {
            const t = i(c);
            const o = n;
            const a = -1 == c ? o : e.subs[u].label.firstLineAfter;
            if (r <= o - t) {
              s.push([t, a]);
            }
          }
          e.label = {
            totalLength: t,
            firstLineAfter: n,
          };
        },
        "bottomUp"
      );
      return s
        .sort((e, t) => e[0] - t[0] || e[1] - t[1])
        .filter(
          (e, t, r) => 0 == t || e[0] != r[t - 1][0] || e[1] != r[t - 1][1]
        );
    };
  },
  417: (e, t) => {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.getPathMarker =
      t.getLanguageMarker =
      t.comment =
      t.hasLanguageMarker =
      t.languageCommentMarkers =
        undefined;
    t.languageCommentMarkers = {
      abap: {
        start: '"',
        end: "",
      },
      bat: {
        start: "REM",
        end: "",
      },
      bibtex: {
        start: "%",
        end: "",
      },
      blade: {
        start: "#",
        end: "",
      },
      c: {
        start: "//",
        end: "",
      },
      clojure: {
        start: ";",
        end: "",
      },
      coffeescript: {
        start: "//",
        end: "",
      },
      cpp: {
        start: "//",
        end: "",
      },
      csharp: {
        start: "//",
        end: "",
      },
      css: {
        start: "/*",
        end: "*/",
      },
      dart: {
        start: "//",
        end: "",
      },
      dockerfile: {
        start: "#",
        end: "",
      },
      elixir: {
        start: "#",
        end: "",
      },
      erb: {
        start: "<%#",
        end: "%>",
      },
      erlang: {
        start: "%",
        end: "",
      },
      fsharp: {
        start: "//",
        end: "",
      },
      go: {
        start: "//",
        end: "",
      },
      groovy: {
        start: "//",
        end: "",
      },
      haml: {
        start: "-#",
        end: "",
      },
      handlebars: {
        start: "{{!",
        end: "}}",
      },
      haskell: {
        start: "--",
        end: "",
      },
      html: {
        start: "\x3c!--",
        end: "--\x3e",
      },
      ini: {
        start: ";",
        end: "",
      },
      java: {
        start: "//",
        end: "",
      },
      javascript: {
        start: "//",
        end: "",
      },
      javascriptreact: {
        start: "//",
        end: "",
      },
      jsonc: {
        start: "//",
        end: "",
      },
      jsx: {
        start: "//",
        end: "",
      },
      julia: {
        start: "#",
        end: "",
      },
      kotlin: {
        start: "//",
        end: "",
      },
      latex: {
        start: "%",
        end: "",
      },
      less: {
        start: "//",
        end: "",
      },
      lua: {
        start: "--",
        end: "",
      },
      makefile: {
        start: "#",
        end: "",
      },
      markdown: {
        start: "[]: #",
        end: "",
      },
      "objective-c": {
        start: "//",
        end: "",
      },
      "objective-cpp": {
        start: "//",
        end: "",
      },
      perl: {
        start: "#",
        end: "",
      },
      php: {
        start: "//",
        end: "",
      },
      powershell: {
        start: "#",
        end: "",
      },
      pug: {
        start: "//",
        end: "",
      },
      python: {
        start: "#",
        end: "",
      },
      ql: {
        start: "//",
        end: "",
      },
      r: {
        start: "#",
        end: "",
      },
      razor: {
        start: "\x3c!--",
        end: "--\x3e",
      },
      ruby: {
        start: "#",
        end: "",
      },
      rust: {
        start: "//",
        end: "",
      },
      sass: {
        start: "//",
        end: "",
      },
      scala: {
        start: "//",
        end: "",
      },
      scss: {
        start: "//",
        end: "",
      },
      shellscript: {
        start: "#",
        end: "",
      },
      slim: {
        start: "/",
        end: "",
      },
      solidity: {
        start: "//",
        end: "",
      },
      sql: {
        start: "--",
        end: "",
      },
      stylus: {
        start: "//",
        end: "",
      },
      svelte: {
        start: "\x3c!--",
        end: "--\x3e",
      },
      swift: {
        start: "//",
        end: "",
      },
      terraform: {
        start: "#",
        end: "",
      },
      tex: {
        start: "%",
        end: "",
      },
      typescript: {
        start: "//",
        end: "",
      },
      typescriptreact: {
        start: "//",
        end: "",
      },
      vb: {
        start: "'",
        end: "",
      },
      verilog: {
        start: "//",
        end: "",
      },
      "vue-html": {
        start: "\x3c!--",
        end: "--\x3e",
      },
      vue: {
        start: "//",
        end: "",
      },
      xml: {
        start: "\x3c!--",
        end: "--\x3e",
      },
      xsl: {
        start: "\x3c!--",
        end: "--\x3e",
      },
      yaml: {
        start: "#",
        end: "",
      },
    };
    const r = ["php", "plaintext"];
    const n = {
      html: "<!DOCTYPE html>",
      python: "#!/usr/bin/env python3",
      ruby: "#!/usr/bin/env ruby",
      shellscript: "#!/bin/sh",
      yaml: "# YAML data",
    };
    function i({ source: e }) {
      return e.startsWith("#!") || e.startsWith("<!DOCTYPE");
    }
    function o(e, r) {
      const n = t.languageCommentMarkers[r];
      if (n) {
        const t = "" == n.end ? "" : " " + n.end;
        return `${n.start} ${e}${t}`;
      }
      return "";
    }
    t.hasLanguageMarker = i;
    t.comment = o;
    t.getLanguageMarker = function (e) {
      const { languageId: t } = e;
      return -1 !== r.indexOf(t) || i(e)
        ? ""
        : t in n
        ? n[t]
        : o(`Language: ${t}`, t);
    };
    t.getPathMarker = function (e) {
      return e.relativePath ? o(`Path: ${e.relativePath}`, e.languageId) : "";
    };
  },
  563: function (e, t, r) {
    "use strict";

    var n =
      (this && this.__createBinding) ||
      (Object.create
        ? function (e, t, r, n) {
            if (undefined === n) {
              n = r;
            }
            var i = Object.getOwnPropertyDescriptor(t, r);
            if (
              i &&
              !("get" in i ? !t.__esModule : i.writable || i.configurable)
            ) {
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
    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.createWorker =
      t.NeighboringSnippetType =
      t.NeighboringTabsOption =
      t.FileSystem =
      t.comment =
      t.languageCommentMarkers =
        undefined;
    const o = r(622);
    const s = r(13);
    i(r(180), t);
    i(r(306), t);
    i(r(610), t);
    i(r(360), t);
    i(r(411), t);
    var a = r(417);
    Object.defineProperty(t, "languageCommentMarkers", {
      enumerable: true,
      get: function () {
        return a.languageCommentMarkers;
      },
    });
    Object.defineProperty(t, "comment", {
      enumerable: true,
      get: function () {
        return a.comment;
      },
    });
    var c = r(271);
    Object.defineProperty(t, "FileSystem", {
      enumerable: true,
      get: function () {
        return c.FileSystem;
      },
    });
    var l = r(125);
    Object.defineProperty(t, "NeighboringTabsOption", {
      enumerable: true,
      get: function () {
        return l.NeighboringTabsOption;
      },
    });
    Object.defineProperty(t, "NeighboringSnippetType", {
      enumerable: true,
      get: function () {
        return l.NeighboringSnippetType;
      },
    });
    t.createWorker = function () {
      return new s.Worker(o.resolve(__dirname, "..", "dist", "worker.js"));
    };
  },
  179: (e, t, r) => {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.extractLocalImportContext = t.getDocComment = undefined;
    const n = r(622);
    const i = r(306);
    function o(e, t) {
      let r = t.namedChild(1)?.text.slice(1, -1);
      if (!r || !r.startsWith(".")) return null;
      if ("" === n.extname(r)) r += ".ts";
      else if (".ts" !== n.extname(r)) return null;
      return n.join(n.dirname(e), r);
    }
    function s(e) {
      let t = [];
      if ("import_clause" === e.namedChild(0)?.type) {
        let r = e.namedChild(0);
        if ("named_imports" === r?.namedChild(0)?.type) {
          let e = r.namedChild(0);
          for (let r of e?.namedChildren ?? [])
            if ("import_specifier" === r.type) {
              const e = r.childForFieldName("name")?.text;
              if (e) {
                const n = r.childForFieldName("alias")?.text;
                t.push({
                  name: e,
                  alias: n,
                });
              }
            }
        }
      }
      return t;
    }
    const a = new Map();
    function c(e, t) {
      let r = t?.childForFieldName("name")?.text ?? "";
      switch (t?.type) {
        case "ambient_declaration":
          return c(e, t.namedChild(0));
        case "interface_declaration":
        case "enum_declaration":
        case "type_alias_declaration":
          return {
            name: r,
            decl: t.text,
          };
        case "function_declaration":
        case "function_signature":
          return {
            name: r,
            decl: l(e, t),
          };
        case "class_declaration": {
          let n = (function (e, t) {
            let r = t.childForFieldName("body");
            if (r) return r.namedChildren.map((t) => d(e, t)).filter((e) => e);
          })(e, t);
          let i = "";
          if (n) {
            let r = t.childForFieldName("body");
            i = `declare ${e.substring(t.startIndex, r.startIndex + 1)}`;
            i += n.map((e) => "\n" + e).join("");
            i += "\n}";
          }
          return {
            name: r,
            decl: i,
          };
        }
      }
      return {
        name: r,
        decl: "",
      };
    }
    function l(e, t) {
      const r =
        t.childForFieldName("return_type")?.endIndex ??
        t.childForFieldName("parameters")?.endIndex;
      if (undefined !== r) {
        let n = e.substring(t.startIndex, r) + ";";
        return "function_declaration" === t.type ||
          "function_signature" === t.type
          ? "declare " + n
          : n;
      }
      return "";
    }
    function u(e, t) {
      const r = i.getFirstPrecedingComment(t);
      return r ? e.substring(r.startIndex, t.startIndex) : "";
    }
    function d(e, t) {
      if (
        "accessibility_modifier" === t?.firstChild?.type &&
        "private" === t.firstChild.text
      )
        return "";
      const r =
        (function (e, t) {
          let r = t.startIndex - 1;
          for (; r >= 0 && (" " === e[r] || "\t" === e[r]); ) r--;
          if (r < 0 || "\n" === e[r]) return e.substring(r + 1, t.startIndex);
        })(e, i.getFirstPrecedingComment(t) ?? t) ?? "  ";
      const n = u(e, t);
      switch (t.type) {
        case "ambient_declaration":
          const i = t.namedChild(0);
          return i ? r + n + d(e, i) : "";
        case "method_definition":
        case "method_signature":
          return r + n + l(e, t);
        case "public_field_definition": {
          let i =
            t.childForFieldName("type")?.endIndex ??
            t.childForFieldName("name")?.endIndex;
          if (undefined !== i)
            return r + n + e.substring(t.startIndex, i) + ";";
        }
      }
      return "";
    }
    async function p(e, t, r) {
      let n = new Map();
      let o = -1;
      try {
        o = await r.mtime(e);
      } catch {
        return n;
      }
      let s = a.get(e);
      if (s && s.mtime === o) return s.exports;
      if ("typescript" === t) {
        let o = null;
        try {
          let s = (await r.readFile(e)).toString();
          o = await i.parseTreeSitter(t, s);
          for (let e of i.queryExports(t, o.rootNode))
            for (let t of e.captures) {
              let e = t.node;
              if ("export_statement" === e.type) {
                let t = e.childForFieldName("declaration");
                if (t?.hasError()) continue;
                let { name: r, decl: i } = c(s, t);
                if (r) {
                  i = u(s, e) + i;
                  let t = n.get(r);
                  if (t) {
                    t = [];
                    n.set(r, t);
                  }
                  t.push(i);
                }
              }
            }
        } catch {
        } finally {
          if (o) {
            o.delete();
          }
        }
      }
      if (a.size > 2e3)
        for (let e of a.keys()) {
          a.delete(e);
          if (n.size <= 1e3) break;
        }
      a.set(e, {
        mtime: o,
        exports: n,
      });
      return n;
    }
    t.getDocComment = u;
    const h = /^\s*import\s*(type|)\s*\{[^}]*\}\s*from\s*['"]\./gm;
    t.extractLocalImportContext = async function (e, t) {
      let { source: r, uri: n, languageId: a } = e;
      return t && "typescript" === a
        ? (async function (e, t, r) {
            let n = "typescript";
            let a = [];
            const c = (function (e) {
              let t;
              let r = -1;
              h.lastIndex = -1;
              do {
                t = h.exec(e);
                if (t) {
                  r = h.lastIndex + t.length;
                }
              } while (t);
              if (-1 === r) return -1;
              const n = e.indexOf("\n", r);
              return -1 !== n ? n : e.length;
            })(e);
            if (-1 === c) return a;
            e = e.substring(0, c);
            let l = await i.parseTreeSitter(n, e);
            try {
              for (let e of (function (e) {
                let t = [];
                for (let r of e.namedChildren)
                  if ("import_statement" === r.type) {
                    t.push(r);
                  }
                return t;
              })(l.rootNode)) {
                let i = o(t, e);
                if (!i) continue;
                let c = s(e);
                if (0 === c.length) continue;
                let l = await p(i, n, r);
                for (let e of c)
                  if (l.has(e.name)) {
                    a.push(...l.get(e.name));
                  }
              }
            } finally {
              l.delete();
            }
            return a;
          })(r, n, t)
        : [];
    };
  },
  306: (e, t, r) => {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.getFunctionPositions =
      t.getFirstPrecedingComment =
      t.isFunctionDefinition =
      t.isFunction =
      t.getAncestorWithSiblingFunctions =
      t.queryPythonIsDocstring =
      t.queryGlobalVars =
      t.queryExports =
      t.queryImports =
      t.queryFunctions =
      t.getBlockCloseToken =
      t.parsesWithoutError =
      t.parseTreeSitter =
      t.getLanguage =
      t.languageIdToWasmLanguage =
      t.isSupportedLanguageId =
      t.WASMLanguage =
        undefined;
    const n = r(622);
    const i = r(87);
    const o = r(87);
    var s;
    !(function (e) {
      e.Python = "python";
      e.JavaScript = "javascript";
      e.TypeScript = "typescript";
      e.Go = "go";
      e.Ruby = "ruby";
    })((s = t.WASMLanguage || (t.WASMLanguage = {})));
    const a = {
      python: s.Python,
      javascript: s.JavaScript,
      javascriptreact: s.JavaScript,
      jsx: s.JavaScript,
      typescript: s.TypeScript,
      typescriptreact: s.TypeScript,
      go: s.Go,
      ruby: s.Ruby,
    };
    function c(e) {
      if (!(e in a)) throw new Error(`Unrecognized language: ${e}`);
      return a[e];
    }
    t.isSupportedLanguageId = function (e) {
      return e in a;
    };
    t.languageIdToWasmLanguage = c;
    const l = {
      python: [
        [
          "(function_definition body: (block\n             (expression_statement (string))? @docstring) @body) @function",
        ],
        ['(ERROR ("def" (identifier) (parameters))) @function'],
      ],
      javascript: [
        [
          "[\n            (function body: (statement_block) @body)\n            (function_declaration body: (statement_block) @body)\n            (generator_function body: (statement_block) @body)\n            (generator_function_declaration body: (statement_block) @body)\n            (method_definition body: (statement_block) @body)\n          ] @function",
        ],
      ],
      typescript: [
        [
          "[\n            (function body: (statement_block) @body)\n            (function_declaration body: (statement_block) @body)\n            (generator_function body: (statement_block) @body)\n            (generator_function_declaration body: (statement_block) @body)\n            (method_definition body: (statement_block) @body)\n          ] @function",
        ],
      ],
      go: [
        [
          "[\n            (function_declaration body: (block) @body)\n            (method_declaration body: (block) @body)\n          ] @function",
        ],
      ],
      ruby: [
        [
          '[\n            (method name: (_) parameters: (method_parameters)? @params [(_)+ "end"] @body)\n            (singleton_method name: (_) parameters: (method_parameters)? @params [(_)+ "end"] @body)\n          ] @function',
        ],
      ],
    };
    const u =
      '(variable_declarator value: (call_expression function: ((identifier) @req (#eq? @req "require"))))';
    const d = `\n    (lexical_declaration ${u}+)\n    (variable_declaration ${u}+)\n`;
    const p = {
      python: [
        ["(module (future_import_statement) @import)"],
        ["(module (import_statement) @import)"],
        ["(module (import_from_statement) @import)"],
      ],
      javascript: [
        [`(program [ ${d} ] @import)`],
        ["(program [ (import_statement) ] @import)"],
      ],
      typescript: [
        [`(program [ ${d} ] @import)`],
        ["(program [ (import_statement) (import_alias) ] @import)"],
      ],
      go: [],
      ruby: [],
    };
    const h = {
      python: [],
      javascript: [["(program (export_statement) @export)"]],
      typescript: [["(program (export_statement) @export)"]],
      go: [],
      ruby: [],
    };
    const f = {
      python: [
        ["(module (global_statement) @globalVar)"],
        ["(module (expression_statement) @globalVar)"],
      ],
      javascript: [],
      typescript: [],
      go: [],
      ruby: [],
    };
    const g = {
      python: new Set(["function_definition"]),
      javascript: new Set([
        "function",
        "function_declaration",
        "generator_function",
        "generator_function_declaration",
        "method_definition",
        "arrow_function",
      ]),
      typescript: new Set([
        "function",
        "function_declaration",
        "generator_function",
        "generator_function_declaration",
        "method_definition",
        "arrow_function",
      ]),
      go: new Set(["function_declaration", "method_declaration"]),
      ruby: new Set(["method", "singleton_method"]),
    };
    const m = {
      python: (e) =>
        "module" === e.type ||
        ("block" === e.type && "class_definition" === e.parent?.type),
      javascript: (e) => "program" === e.type || "class_body" === e.type,
      typescript: (e) => "program" === e.type || "class_body" === e.type,
      go: (e) => "source_file" === e.type,
      ruby: (e) => "program" === e.type || "class" === e.type,
    };
    const y = new Map();
    async function v(e) {
      const t = c(e);
      if (!y.has(t)) {
        const e = await (async function (e) {
          await i.init();
          const t = n.resolve(__dirname, "..", "dist", `tree-sitter-${e}.wasm`);
          return o.Language.load(t);
        })(t);
        y.set(t, e);
      }
      return y.get(t);
    }
    async function _(e, t) {
      let r = await v(e);
      const n = new i();
      n.setLanguage(r);
      const o = n.parse(t);
      n.delete();
      return o;
    }
    function b(e, t) {
      const r = [];
      for (const n of e) {
        if (!n[1]) {
          const e = t.tree.getLanguage();
          n[1] = e.query(n[0]);
        }
        r.push(...n[1].matches(t));
      }
      return r;
    }
    function w(e, t) {
      return b(l[c(e)], t);
    }
    t.getLanguage = v;
    t.parseTreeSitter = _;
    t.parsesWithoutError = async function (e, t) {
      const r = await _(e, t);
      const n = !r.rootNode.hasError();
      r.delete();
      return n;
    };
    t.getBlockCloseToken = function (e) {
      switch (c(e)) {
        case s.Python:
          return null;
        case s.JavaScript:
        case s.TypeScript:
        case s.Go:
          return "}";
        case s.Ruby:
          return "end";
      }
    };
    t.queryFunctions = w;
    t.queryImports = function (e, t) {
      return b(p[c(e)], t);
    };
    t.queryExports = function (e, t) {
      return b(h[c(e)], t);
    };
    t.queryGlobalVars = function (e, t) {
      return b(f[c(e)], t);
    };
    const C = [
      "[\n    (class_definition (block (expression_statement (string))))\n    (function_definition (block (expression_statement (string))))\n]",
    ];
    function E(e, t) {
      return g[c(e)].has(t.type);
    }
    t.queryPythonIsDocstring = function (e) {
      return 1 == b([C], e).length;
    };
    t.getAncestorWithSiblingFunctions = function (e, t) {
      const r = m[c(e)];
      for (; t.parent; ) {
        if (r(t.parent)) return t;
        t = t.parent;
      }
      return t.parent ? t : null;
    };
    t.isFunction = E;
    t.isFunctionDefinition = function (e, t) {
      switch (c(e)) {
        case s.Python:
        case s.Go:
        case s.Ruby:
          return E(e, t);
        case s.JavaScript:
        case s.TypeScript:
          if (
            "function_declaration" === t.type ||
            "generator_function_declaration" === t.type ||
            "method_definition" === t.type
          )
            return true;
          if (
            "lexical_declaration" === t.type ||
            "variable_declaration" === t.type
          ) {
            if (t.namedChildCount > 1) return false;
            let r = t.namedChild(0);
            if (null == r) return false;
            let n = r.namedChild(1);
            return null !== n && E(e, n);
          }
          if ("expression_statement" === t.type) {
            let r = t.namedChild(0);
            if ("assignment_expression" === r?.type) {
              let t = r.namedChild(1);
              return null !== t && E(e, t);
            }
          }
          return false;
      }
    };
    t.getFirstPrecedingComment = function (e) {
      let t = e;
      for (; "comment" === t.previousSibling?.type; ) {
        let e = t.previousSibling;
        if (e.endPosition.row < t.startPosition.row - 1) break;
        t = e;
      }
      return "comment" === t?.type ? t : null;
    };
    t.getFunctionPositions = async function (e, t) {
      const r = await _(e, t);
      const n = w(e, r.rootNode).map((e) => {
        const t = e.captures.find((e) => "function" === e.name).node;
        return {
          startIndex: t.startIndex,
          endIndex: t.endIndex,
        };
      });
      r.delete();
      return n;
    };
  },
  610: (e, t, r) => {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.getNodeStart =
      t.isBlockBodyFinished =
      t.isEmptyBlockStart =
      t.getBlockParser =
        undefined;
    const n = r(306);
    class i {
      constructor(e, t, r) {
        this.languageId = e;
        this.nodeMatch = t;
        this.nodeTypesWithBlockOrStmtChild = r;
      }
      async getNodeMatchAtPosition(e, t, r) {
        const i = await n.parseTreeSitter(this.languageId, e);
        try {
          let e = i.rootNode.descendantForIndex(t);
          for (; e; ) {
            const t = this.nodeMatch[e.type];
            if (t) {
              if (!this.nodeTypesWithBlockOrStmtChild.has(e.type)) break;
              const r = this.nodeTypesWithBlockOrStmtChild.get(e.type);
              if (
                ("" == r ? e.namedChildren[0] : e.childForFieldName(r))?.type ==
                t
              )
                break;
            }
            e = e.parent;
          }
          if (!e) return;
          return r(e);
        } finally {
          i.delete();
        }
      }
      getNextBlockAtPosition(e, t, r) {
        return this.getNodeMatchAtPosition(e, t, (e) => {
          let t = e.children
            .reverse()
            .find((t) => t.type == this.nodeMatch[e.type]);
          if (t) {
            if ("python" == this.languageId && t.parent) {
              const e = ":" == t.parent.type ? t.parent.parent : t.parent;
              let r = e?.nextSibling;
              for (; r && "comment" == r.type; ) {
                const n =
                  r.startPosition.row == t.endPosition.row &&
                  r.startPosition.column >= t.endPosition.column;
                const i =
                  r.startPosition.row > e.endPosition.row &&
                  r.startPosition.column > e.startPosition.column;
                if (!n && !i) break;
                t = r;
                r = r.nextSibling;
              }
            }
            if (
              !(
                t.endIndex >= t.tree.rootNode.endIndex - 1 &&
                (t.hasError() || t.parent.hasError())
              )
            )
              return r(t);
          }
        });
      }
      async isBlockBodyFinished(e, t, r) {
        const n = (e + t).trimEnd();
        const i = await this.getNextBlockAtPosition(n, r, (e) => e.endIndex);
        if (undefined !== i && i < n.length) {
          const t = i - e.length;
          return t > 0 ? t : undefined;
        }
      }
      getNodeStart(e, t) {
        const r = e.trimEnd();
        return this.getNodeMatchAtPosition(r, t, (e) => e.startIndex);
      }
    }
    class o extends i {
      constructor(e, t, r, n, i) {
        super(e, n, i);
        this.blockEmptyMatch = t;
        this.lineMatch = r;
      }
      isBlockStart(e) {
        return this.lineMatch.test(e.trimStart());
      }
      async isBlockBodyEmpty(e, t) {
        const r = await this.getNextBlockAtPosition(e, t, (r) => {
          if (r.startIndex < t) {
            t = r.startIndex;
          }
          let n = e.substring(t, r.endIndex).trim();
          return "" == n || n.replace(/\s/g, "") == this.blockEmptyMatch;
        });
        return undefined === r || r;
      }
      async isEmptyBlockStart(e, t) {
        t = s(e, t);
        return (
          this.isBlockStart(
            (function (e, t) {
              const r = e.lastIndexOf("\n", t - 1);
              let n = e.indexOf("\n", t);
              if (n < 0) {
                n = e.length;
              }
              return e.slice(r + 1, n);
            })(e, t)
          ) && this.isBlockBodyEmpty(e, t)
        );
      }
    }
    function s(e, t) {
      let r = t;
      for (; r > 0 && /\s/.test(e.charAt(r - 1)); ) r--;
      return r;
    }
    function a(e, t) {
      const r = e.startIndex;
      const n = e.startIndex - e.startPosition.column;
      const i = t.substring(n, r);
      if (/^\s*$/.test(i)) return i;
    }
    function c(e, t, r) {
      if (t.startPosition.row <= e.startPosition.row) return false;
      const n = a(e, r);
      const i = a(t, r);
      return undefined !== n && undefined !== i && n.startsWith(i);
    }
    class l extends i {
      constructor(e, t, r, n, i, o, s) {
        super(e, t, r);
        this.startKeywords = n;
        this.blockNodeType = i;
        this.emptyStatementType = o;
        this.curlyBraceLanguage = s;
      }
      isBlockEmpty(e, t) {
        let r = e.text.trim();
        if (this.curlyBraceLanguage) {
          if (r.startsWith("{")) {
            r = r.slice(1);
          }
          if (r.endsWith("}")) {
            r = r.slice(0, -1);
          }
          r = r.trim();
        }
        return (
          0 == r.length ||
          !(
            "python" != this.languageId ||
            ("class_definition" != e.parent?.type &&
              "function_definition" != e.parent?.type) ||
            1 != e.children.length ||
            !n.queryPythonIsDocstring(e.parent)
          )
        );
      }
      async isEmptyBlockStart(e, t) {
        if (t > e.length) throw new RangeError("Invalid offset");
        for (let r = t; r < e.length && "\n" != e.charAt(r); r++)
          if (/\S/.test(e.charAt(r))) return false;
        t = s(e, t);
        const r = await n.parseTreeSitter(this.languageId, e);
        try {
          const n = r.rootNode.descendantForIndex(t - 1);
          if (null == n) return false;
          if (this.curlyBraceLanguage && "}" == n.type) return false;
          if (
            ("javascript" == this.languageId ||
              "typescript" == this.languageId) &&
            n.parent &&
            "object" == n.parent.type &&
            "{" == n.parent.text.trim()
          )
            return true;
          if ("typescript" == this.languageId) {
            let r = n;
            for (; r.parent; ) {
              if (
                "function_signature" == r.type ||
                "method_signature" == r.type
              ) {
                const i = n.nextSibling;
                return (
                  !!(i && r.hasError() && c(r, i, e)) ||
                  (!r.children.find((e) => ";" == e.type) && r.endIndex <= t)
                );
              }
              r = r.parent;
            }
          }
          let i = null;
          let o = null;
          let s = null;
          let a = n;
          for (; null != a; ) {
            if (a.type == this.blockNodeType) {
              o = a;
              break;
            }
            if (this.nodeMatch[a.type]) {
              s = a;
              break;
            }
            if ("ERROR" == a.type) {
              i = a;
              break;
            }
            a = a.parent;
          }
          if (null != o) {
            if (!o.parent || !this.nodeMatch[o.parent.type]) return false;
            if ("python" == this.languageId) {
              const e = o.previousSibling;
              if (
                null != e &&
                e.hasError() &&
                (e.text.startsWith('"""') || e.text.startsWith("'''"))
              )
                return true;
            }
            return this.isBlockEmpty(o, t);
          }
          if (null != i) {
            if (
              "module" == i.previousSibling?.type ||
              "internal_module" == i.previousSibling?.type
            )
              return true;
            const e = [...i.children].reverse();
            const r = e.find((e) => this.startKeywords.includes(e.type));
            let o = e.find((e) => e.type == this.blockNodeType);
            if (r) {
              switch (this.languageId) {
                case "python": {
                  if (
                    "try" == r.type &&
                    "identifier" == n.type &&
                    n.text.length > 4
                  ) {
                    o = e
                      .find((e) => e.hasError())
                      ?.children.find((e) => "block" == e.type);
                  }
                  const t = e.find((e) => ":" == e.type);
                  if (t && r.endIndex <= t.startIndex && t.nextSibling) {
                    if ("def" == r.type) {
                      const e = t.nextSibling;
                      if ('"' == e.type || "'" == e.type) return true;
                      if (
                        "ERROR" == e.type &&
                        ('"""' == e.text || "'''" == e.text)
                      )
                        return true;
                    }
                    return false;
                  }
                  break;
                }
                case "javascript": {
                  const t = e.find((e) => "formal_parameters" == e.type);
                  if ("class" == r.type && t) return true;
                  const n = e.find((e) => "{" == e.type);
                  if (n && n.startIndex > r.endIndex && null != n.nextSibling)
                    return false;
                  if (e.find((e) => "do" == e.type) && "while" == r.type)
                    return false;
                  if (
                    "=>" == r.type &&
                    r.nextSibling &&
                    "{" != r.nextSibling.type
                  )
                    return false;
                  break;
                }
                case "typescript": {
                  const t = e.find((e) => "{" == e.type);
                  if (t && t.startIndex > r.endIndex && null != t.nextSibling)
                    return false;
                  if (e.find((e) => "do" == e.type) && "while" == r.type)
                    return false;
                  if (
                    "=>" == r.type &&
                    r.nextSibling &&
                    "{" != r.nextSibling.type
                  )
                    return false;
                  break;
                }
              }
              return (
                !(o && o.startIndex > r.endIndex) || this.isBlockEmpty(o, t)
              );
            }
          }
          if (null != s) {
            const e = this.nodeMatch[s.type];
            const r = s.children
              .slice()
              .reverse()
              .find((t) => t.type == e);
            if (r) return this.isBlockEmpty(r, t);
            if (this.nodeTypesWithBlockOrStmtChild.has(s.type)) {
              const e = this.nodeTypesWithBlockOrStmtChild.get(s.type);
              const t = "" == e ? s.children[0] : s.childForFieldName(e);
              if (
                t &&
                t.type != this.blockNodeType &&
                t.type != this.emptyStatementType
              )
                return false;
            }
            return true;
          }
          return false;
        } finally {
          r.delete();
        }
      }
    }
    const u = {
      python: new l(
        "python",
        {
          class_definition: "block",
          elif_clause: "block",
          else_clause: "block",
          except_clause: "block",
          finally_clause: "block",
          for_statement: "block",
          function_definition: "block",
          if_statement: "block",
          try_statement: "block",
          while_statement: "block",
          with_statement: "block",
        },
        new Map(),
        [
          "def",
          "class",
          "if",
          "elif",
          "else",
          "for",
          "while",
          "try",
          "except",
          "finally",
          "with",
        ],
        "block",
        null,
        false
      ),
      javascript: new l(
        "javascript",
        {
          arrow_function: "statement_block",
          catch_clause: "statement_block",
          do_statement: "statement_block",
          else_clause: "statement_block",
          finally_clause: "statement_block",
          for_in_statement: "statement_block",
          for_statement: "statement_block",
          function: "statement_block",
          function_declaration: "statement_block",
          generator_function: "statement_block",
          generator_function_declaration: "statement_block",
          if_statement: "statement_block",
          method_definition: "statement_block",
          try_statement: "statement_block",
          while_statement: "statement_block",
          with_statement: "statement_block",
          class: "class_body",
          class_declaration: "class_body",
        },
        new Map([
          ["arrow_function", "body"],
          ["do_statement", "body"],
          ["else_clause", ""],
          ["for_in_statement", "body"],
          ["for_statement", "body"],
          ["if_statement", "consequence"],
          ["while_statement", "body"],
          ["with_statement", "body"],
        ]),
        [
          "=>",
          "try",
          "catch",
          "finally",
          "do",
          "for",
          "if",
          "else",
          "while",
          "with",
          "function",
          "function*",
          "class",
        ],
        "statement_block",
        "empty_statement",
        true
      ),
      typescript: new l(
        "typescript",
        {
          ambient_declaration: "statement_block",
          arrow_function: "statement_block",
          catch_clause: "statement_block",
          do_statement: "statement_block",
          else_clause: "statement_block",
          finally_clause: "statement_block",
          for_in_statement: "statement_block",
          for_statement: "statement_block",
          function: "statement_block",
          function_declaration: "statement_block",
          generator_function: "statement_block",
          generator_function_declaration: "statement_block",
          if_statement: "statement_block",
          internal_module: "statement_block",
          method_definition: "statement_block",
          module: "statement_block",
          try_statement: "statement_block",
          while_statement: "statement_block",
          abstract_class_declaration: "class_body",
          class: "class_body",
          class_declaration: "class_body",
        },
        new Map([
          ["arrow_function", "body"],
          ["do_statement", "body"],
          ["else_clause", ""],
          ["for_in_statement", "body"],
          ["for_statement", "body"],
          ["if_statement", "consequence"],
          ["while_statement", "body"],
          ["with_statement", "body"],
        ]),
        [
          "declare",
          "=>",
          "try",
          "catch",
          "finally",
          "do",
          "for",
          "if",
          "else",
          "while",
          "with",
          "function",
          "function*",
          "class",
        ],
        "statement_block",
        "empty_statement",
        true
      ),
      go: new o(
        "go",
        "{}",
        /\b(func|if|else|for)\b/,
        {
          communication_case: "block",
          default_case: "block",
          expression_case: "block",
          for_statement: "block",
          func_literal: "block",
          function_declaration: "block",
          if_statement: "block",
          labeled_statement: "block",
          method_declaration: "block",
          type_case: "block",
        },
        new Map()
      ),
      ruby: new o(
        "ruby",
        "end",
        /\b(BEGIN|END|case|class|def|do|else|elsif|for|if|module|unless|until|while)\b|->/,
        {
          begin_block: "}",
          block: "}",
          end_block: "}",
          lambda: "block",
          for: "do",
          until: "do",
          while: "do",
          case: "end",
          do: "end",
          if: "end",
          method: "end",
          module: "end",
          unless: "end",
          do_block: "end",
        },
        new Map()
      ),
    };
    function d(e) {
      return u[n.languageIdToWasmLanguage(e)];
    }
    t.getBlockParser = d;
    t.isEmptyBlockStart = async function (e, t, r) {
      return !!n.isSupportedLanguageId(e) && d(e).isEmptyBlockStart(t, r);
    };
    t.isBlockBodyFinished = async function (e, t, r, i) {
      if (n.isSupportedLanguageId(e)) return d(e).isBlockBodyFinished(t, r, i);
    };
    t.getNodeStart = async function (e, t, r) {
      if (n.isSupportedLanguageId(e)) return d(e).getNodeStart(t, r);
    };
  },
  360: (e, t, r) => {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.getPrompt =
      t.newLineEnded =
      t.normalizeLanguageId =
      t.PromptOptions =
      t.SuffixStartMode =
      t.SuffixMatchOption =
      t.SuffixOption =
      t.LineEndingOptions =
      t.LocalImportContextOption =
      t.SnippetSelectionOption =
      t.SnippetPositionOption =
      t.SiblingOption =
      t.PathMarkerOption =
      t.LanguageMarkerOption =
      t.TOKENS_RESERVED_FOR_SUFFIX_ENCODING =
      t.MAX_EDIT_DISTANCE_LENGTH =
      t.MAX_PROMPT_LENGTH =
        undefined;
    const n = r(417);
    const i = r(179);
    const o = r(125);
    const s = r(670);
    const a = r(411);
    const c = r(456);
    const l = r(395);
    const u = r(830);
    let d = {
      text: "",
      tokens: [],
    };
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
    t.MAX_PROMPT_LENGTH = 1500;
    t.MAX_EDIT_DISTANCE_LENGTH = 50;
    t.TOKENS_RESERVED_FOR_SUFFIX_ENCODING = 5;
    (function (e) {
      e.NoMarker = "nomarker";
      e.Top = "top";
      e.Always = "always";
    })((p = t.LanguageMarkerOption || (t.LanguageMarkerOption = {})));
    (function (e) {
      e.NoMarker = "nomarker";
      e.Top = "top";
      e.Always = "always";
    })((h = t.PathMarkerOption || (t.PathMarkerOption = {})));
    (function (e) {
      e.NoSiblings = "nosiblings";
      e.SiblingsOverContext = "siblingabove";
      e.ContextOverSiblings = "contextabove";
    })((f = t.SiblingOption || (t.SiblingOption = {})));
    (function (e) {
      e.TopOfText = "top";
      e.DirectlyAboveCursor = "aboveCursor";
      e.AfterSiblings = "afterSiblings";
    })((g = t.SnippetPositionOption || (t.SnippetPositionOption = {})));
    (function (e) {
      e.BestMatch = "bestMatch";
      e.TopK = "topK";
    })((m = t.SnippetSelectionOption || (t.SnippetSelectionOption = {})));
    (function (e) {
      e.NoContext = "nocontext";
      e.Declarations = "declarations";
    })((y = t.LocalImportContextOption || (t.LocalImportContextOption = {})));
    (function (e) {
      e.ConvertToUnix = "unix";
      e.KeepOriginal = "keep";
    })((v = t.LineEndingOptions || (t.LineEndingOptions = {})));
    (w = t.SuffixOption || (t.SuffixOption = {})).None = "none";
    w.FifteenPercent = "fifteenPercent";
    (function (e) {
      e.Equal = "equal";
      e.Levenshtein = "levenshteineditdistance";
    })((_ = t.SuffixMatchOption || (t.SuffixMatchOption = {})));
    (function (e) {
      e.Cursor = "cursor";
      e.CursorTrimStart = "cursortrimstart";
      e.SiblingBlock = "siblingblock";
      e.SiblingBlockTrimStart = "siblingblocktrimstart";
    })((b = t.SuffixStartMode || (t.SuffixStartMode = {})));
    class C {
      constructor(e, r) {
        this.fs = e;
        this.maxPromptLength = t.MAX_PROMPT_LENGTH;
        this.languageMarker = p.Top;
        this.pathMarker = h.Top;
        this.includeSiblingFunctions = f.ContextOverSiblings;
        this.localImportContext = y.Declarations;
        this.snippetPosition = g.TopOfText;
        this.numberOfSnippets = 4;
        this.neighboringTabs = o.NeighboringTabsOption.Eager;
        this.neighboringSnippetTypes =
          o.NeighboringSnippetType.NeighboringSnippets;
        this.lineEnding = v.ConvertToUnix;
        this.suffixPercent = 0;
        this.suffixStartMode = b.Cursor;
        this.tokenizerName = a.TokenizerName.cushman001;
        this.suffixMatchThreshold = 0;
        this.suffixMatchCriteria = _.Levenshtein;
        this.fimSuffixLengthThreshold = 0;
        if (r) for (const e in r) this[e] = r[e];
        if (this.suffixPercent < 0 || this.suffixPercent > 100)
          throw new Error(
            `suffixPercent must be between 0 and 100, but was ${this.suffixPercent}`
          );
        if (
          this.suffixPercent > 0 &&
          this.includeSiblingFunctions != f.NoSiblings
        )
          throw new Error(
            `Invalid option combination. Cannot set suffixPercent > 0 (${this.suffixPercent}) and includeSiblingFunctions ${this.includeSiblingFunctions}`
          );
        if (this.suffixMatchThreshold < 0 || this.suffixMatchThreshold > 100)
          throw new Error(
            `suffixMatchThreshold must be at between 0 and 100, but was ${this.suffixMatchThreshold}`
          );
        if (this.fimSuffixLengthThreshold < -1)
          throw new Error(
            `fimSuffixLengthThreshold must be at least -1, but was ${this.fimSuffixLengthThreshold}`
          );
        if (
          null != this.indentationMinLength &&
          null != this.indentationMaxLength &&
          this.indentationMinLength > this.indentationMaxLength
        )
          throw new Error(
            `indentationMinLength must be less than or equal to indentationMaxLength, but was ${this.indentationMinLength} and ${this.indentationMaxLength}`
          );
        if (
          this.snippetSelection === m.TopK &&
          undefined === this.snippetSelectionK
        )
          throw new Error("snippetSelectionK must be defined.");
        if (
          this.snippetSelection === m.TopK &&
          this.snippetSelectionK &&
          this.snippetSelectionK <= 0
        )
          throw new Error(
            `snippetSelectionK must be greater than 0, but was ${this.snippetSelectionK}`
          );
      }
    }
    t.PromptOptions = C;
    const E = {
      javascriptreact: "javascript",
      jsx: "javascript",
      typescriptreact: "typescript",
      jade: "pug",
      cshtml: "razor",
    };
    function T(e) {
      e = e.toLowerCase();
      return E[e] ?? e;
    }
    function S(e) {
      return "" == e || e.endsWith("\n") ? e : e + "\n";
    }
    t.normalizeLanguageId = T;
    t.newLineEnded = S;
    t.getPrompt = async function (e, r, m = {}, v = [], w = []) {
      const E = new C(e, m);
      const x = a.getTokenizer(E.tokenizerName);
      let k = false;
      const { source: I, offset: A } = r;
      if (A < 0 || A > I.length)
        throw new Error(`Offset ${A} is out of range.`);
      r.languageId = T(r.languageId);
      const P = new c.Priorities();
      const R = P.justBelow(c.Priorities.TOP);
      const N =
        E.languageMarker == p.Always
          ? P.justBelow(c.Priorities.TOP)
          : P.justBelow(R);
      const O =
        E.pathMarker == h.Always
          ? P.justBelow(c.Priorities.TOP)
          : P.justBelow(R);
      const L =
        E.includeSiblingFunctions == f.ContextOverSiblings
          ? P.justBelow(R)
          : P.justAbove(R);
      const D = P.justBelow(R, L);
      const M = P.justBelow(D);
      const B = new c.PromptWishlist(x, E.lineEnding);
      let F;
      let j;
      if (E.languageMarker != p.NoMarker) {
        const e = S(n.getLanguageMarker(r));
        F = B.append(e, c.PromptElementKind.LanguageMarker, N);
      }
      if (E.pathMarker != h.NoMarker) {
        const e = S(n.getPathMarker(r));
        if (e.length > 0) {
          j = B.append(e, c.PromptElementKind.PathMarker, O);
        }
      }
      if (E.localImportContext != y.NoContext)
        for (const e of await i.extractLocalImportContext(r, E.fs))
          B.append(S(e), c.PromptElementKind.ImportedFile, D);
      const U =
        E.neighboringTabs == o.NeighboringTabsOption.None || 0 == v.length
          ? []
          : await o.getNeighborSnippets(
              r,
              v,
              E.neighboringSnippetTypes,
              E.neighboringTabs,
              E.indentationMinLength,
              E.indentationMaxLength,
              E.snippetSelectionOption,
              E.snippetSelectionK
            );
      w = w.concat(U);
      if (new Set(w.map((e) => e.provider)).size > 1)
        throw new Error("Cannot combine snippets from different providers.");
      function $() {
        w.map(u.normalizeSnippetScore)
          .sort((e, t) => e.score - t.score)
          .slice(-E.numberOfSnippets)
          .map((e) => ({
            score: e.score,
            snippet: u
              .announceSnippet(e)
              .map((e) => n.comment(e, r.languageId) + "\n")
              .join(""),
            startLine: e.startLine,
            endLine: e.endLine,
          }))
          .forEach((e) => {
            B.append(
              e.snippet,
              c.PromptElementKind.SimilarFile,
              M,
              x.tokenLength(e.snippet),
              e.score
            );
          });
      }
      if (E.snippetPosition == g.TopOfText) {
        $();
      }
      const q = [];
      let H;
      if (E.includeSiblingFunctions == f.NoSiblings) H = I.substring(0, A);
      else {
        const {
          siblings: e,
          beforeInsertion: t,
          afterInsertion: n,
        } = await s.getSiblingFunctions(r);
        B.appendLineForLine(t, c.PromptElementKind.BeforeCursor, R).forEach(
          (e) => q.push(e)
        );
        let i = L;
        e.forEach((e) => {
          B.append(e, c.PromptElementKind.AfterCursor, i);
          i = P.justBelow(i);
        });
        if (E.snippetPosition == g.AfterSiblings) {
          $();
        }
        H = n;
      }
      if (E.snippetPosition == g.DirectlyAboveCursor) {
        const e = H.lastIndexOf("\n") + 1;
        const t = H.substring(0, e);
        const r = H.substring(e);
        B.appendLineForLine(t, c.PromptElementKind.BeforeCursor, R).forEach(
          (e) => q.push(e)
        );
        $();
        if (r.length > 0) {
          q.push(B.append(r, c.PromptElementKind.AfterCursor, R));
          if (q.length > 1) {
            B.require(q[q.length - 2], q[q.length - 1]);
          }
        }
      } else
        B.appendLineForLine(H, c.PromptElementKind.BeforeCursor, R).forEach(
          (e) => q.push(e)
        );
      if (p.Top == E.languageMarker && q.length > 0 && undefined !== F) {
        B.require(F, q[0]);
      }
      if (h.Top == E.pathMarker && q.length > 0 && undefined !== j) {
        if (F) {
          B.require(j, F);
        } else {
          B.require(j, q[0]);
        }
      }
      if (undefined !== F && undefined !== j) {
        B.exclude(j, F);
      }
      let V = I.slice(A);
      if (0 == E.suffixPercent || V.length <= E.fimSuffixLengthThreshold)
        return B.fulfill(E.maxPromptLength);
      {
        let e = r.offset;
        if (
          E.suffixStartMode !== b.Cursor &&
          E.suffixStartMode !== b.CursorTrimStart
        ) {
          e = await s.getSiblingFunctionStart(r);
        }
        const n = E.maxPromptLength - t.TOKENS_RESERVED_FOR_SUFFIX_ENCODING;
        let i = Math.floor((n * (100 - E.suffixPercent)) / 100);
        let o = B.fulfill(i);
        const a = n - o.prefixLength;
        let c = I.slice(e);
        if (
          E.suffixStartMode != b.SiblingBlockTrimStart &&
          E.suffixStartMode != b.CursorTrimStart
        ) {
          c = c.trimStart();
        }
        const u = x.takeFirstTokens(c, a);
        if (u.tokens.length <= a - 3) {
          i = n - u.tokens.length;
          o = B.fulfill(i);
        }
        if (E.suffixMatchCriteria == _.Equal)
          u.tokens.length === d.tokens.length &&
            u.tokens.every((e, t) => e === d.tokens[t]) &&
            (k = !0);
        else if (
          E.suffixMatchCriteria == _.Levenshtein &&
          u.tokens.length > 0 &&
          E.suffixMatchThreshold > 0
        ) {
          const e = (0, l.findEditDistanceScore)(
            u.tokens.slice(0, t.MAX_EDIT_DISTANCE_LENGTH),
            d.tokens.slice(0, t.MAX_EDIT_DISTANCE_LENGTH)
          )?.score;
          100 * e <
            E.suffixMatchThreshold *
              Math.min(t.MAX_EDIT_DISTANCE_LENGTH, u.tokens.length) && (k = !0);
        }
        if (true === k && d.tokens.length <= a) {
          if (d.tokens.length <= a - 3) {
            i = n - d.tokens.length;
            o = B.fulfill(i);
          }
          o.suffix = d.text;
          o.suffixLength = d.tokens.length;
        } else {
          o.suffix = u.text;
          o.suffixLength = u.tokens.length;
          d = u;
        }
        return o;
      }
    };
  },
  670: (e, t, r) => {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.getSiblingFunctionStart = t.getSiblingFunctions = undefined;
    const n = r(360);
    const i = r(306);
    t.getSiblingFunctions = async function ({
      source: e,
      offset: t,
      languageId: r,
    }) {
      const o = [];
      let s = "";
      let a = e.substring(0, t);
      if (i.isSupportedLanguageId(r)) {
        const c = await i.parseTreeSitter(r, e);
        try {
          let l = t;
          for (; l >= 0 && /\s/.test(e[l]); ) l--;
          const u = c.rootNode.descendantForIndex(l);
          const d = i.getAncestorWithSiblingFunctions(r, u);
          if (d) {
            const c = i.getFirstPrecedingComment(d)?.startIndex ?? d.startIndex;
            let l;
            let u = 0;
            for (; " " == (l = e[c - u - 1]) || "\t" == l; ) u++;
            const p = e.substring(c - u, c);
            for (let s = d.nextSibling; s; s = s.nextSibling)
              if (i.isFunctionDefinition(r, s)) {
                const r =
                  i.getFirstPrecedingComment(s)?.startIndex ?? s.startIndex;
                if (r < t) continue;
                const a = e.substring(r, s.endIndex);
                const c = n.newLineEnded(a) + "\n" + p;
                o.push(c);
              }
            s = e.substring(0, c);
            a = e.substring(c, t);
          }
        } finally {
          c.delete();
        }
      }
      return {
        siblings: o,
        beforeInsertion: s,
        afterInsertion: a,
      };
    };
    t.getSiblingFunctionStart = async function ({
      source: e,
      offset: t,
      languageId: r,
    }) {
      if (i.isSupportedLanguageId(r)) {
        const n = await i.parseTreeSitter(r, e);
        try {
          let o = t;
          for (; o >= 0 && /\s/.test(e[o]); ) o--;
          const s = n.rootNode.descendantForIndex(o);
          const a = i.getAncestorWithSiblingFunctions(r, s);
          if (a) {
            for (let e = a.nextSibling; e; e = e.nextSibling)
              if (i.isFunctionDefinition(r, e)) {
                const r =
                  i.getFirstPrecedingComment(e)?.startIndex ?? e.startIndex;
                if (r < t) continue;
                return r;
              }
            if (a.endIndex >= t) return a.endIndex;
          }
        } finally {
          n.delete();
        }
      }
      return t;
    };
  },
  404: (e, t, r) => {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.computeScore =
      t.FunctionJaccardMatcher =
      t.IndentationBasedJaccardMatcher =
      t.FixedWindowSizeJaccardMatcher =
        undefined;
    const n = r(312);
    const i = r(467);
    class o extends i.WindowedMatcher {
      constructor(e, t) {
        super(e);
        this.windowLength = t;
      }
      id() {
        return "fixed:" + this.windowLength;
      }
      getWindowsDelineations(e) {
        const t = [];
        const r = e.length;
        for (let e = 0; 0 == e || e < r - this.windowLength; e++) {
          const n = Math.min(e + this.windowLength, r);
          t.push([e, n]);
        }
        return t;
      }
      trimDocument(e) {
        return e.source
          .slice(0, e.offset)
          .split("\n")
          .slice(-this.windowLength)
          .join("\n");
      }
      similarityScore(e, t) {
        return c(e, t);
      }
    }
    t.FixedWindowSizeJaccardMatcher = o;
    o.FACTORY = (e) => ({
      to: (t) => new o(t, e),
    });
    class s extends i.WindowedMatcher {
      constructor(e, t, r) {
        super(e);
        this.indentationMinLength = t;
        this.indentationMaxLength = r;
        this.languageId = e.languageId;
      }
      id() {
        return `indent:${this.indentationMinLength}:${this.indentationMaxLength}:${this.languageId}`;
      }
      getWindowsDelineations(e) {
        return n.getWindowsDelineations(
          e,
          this.languageId,
          this.indentationMinLength,
          this.indentationMaxLength
        );
      }
      trimDocument(e) {
        return e.source
          .slice(0, e.offset)
          .split("\n")
          .slice(-this.indentationMaxLength)
          .join("\n");
      }
      similarityScore(e, t) {
        return c(e, t);
      }
    }
    t.IndentationBasedJaccardMatcher = s;
    s.FACTORY = (e, t) => ({
      to: (r) => new s(r, e, t),
    });
    class a extends i.FunctionalMatcher {
      id() {
        return "function";
      }
      getWindowsDelineations(e) {
        return [];
      }
      constructor(e, t) {
        super(e);
        this.windowLength = t;
      }
      trimDocument(e) {
        return e.source
          .slice(0, e.offset)
          .split("\n")
          .slice(-this.windowLength)
          .join("\n");
      }
      similarityScore(e, t) {
        return c(e, t);
      }
    }
    function c(e, t) {
      const r = new Set();
      e.forEach((e) => {
        if (t.has(e)) {
          r.add(e);
        }
      });
      return r.size / (e.size + t.size - r.size);
    }
    t.FunctionJaccardMatcher = a;
    a.FACTORY = (e) => ({
      to: (t) => new a(t, e),
    });
    t.computeScore = c;
  },
  125: (e, t, r) => {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.getNeighborSnippets =
      t.neighborOptionToSelection =
      t.NeighboringSnippetType =
      t.NeighboringTabsOption =
        undefined;
    const n = r(404);
    const i = r(830);
    var o;
    var s;
    (s = t.NeighboringTabsOption || (t.NeighboringTabsOption = {})).None =
      "none";
    s.Conservative = "conservative";
    s.Medium = "medium";
    s.Eager = "eager";
    s.EagerButLittle = "eagerButLittle";
    s.EagerButMedium = "eagerButMedium";
    (function (e) {
      e.NeighboringFunctions = "neighboringFunction";
      e.NeighboringSnippets = "neighboringSnippet";
    })((o = t.NeighboringSnippetType || (t.NeighboringSnippetType = {})));
    t.neighborOptionToSelection = {
      none: {
        snippetLength: 1,
        threshold: -1,
        numberOfSnippets: 0,
      },
      conservative: {
        snippetLength: 10,
        threshold: 0.3,
        numberOfSnippets: 1,
      },
      medium: {
        snippetLength: 20,
        threshold: 0.1,
        numberOfSnippets: 2,
      },
      eager: {
        snippetLength: 60,
        threshold: 0,
        numberOfSnippets: 4,
      },
      eagerButLittle: {
        snippetLength: 10,
        threshold: 0,
        numberOfSnippets: 1,
      },
      eagerButMedium: {
        snippetLength: 20,
        threshold: 0,
        numberOfSnippets: 4,
      },
    };
    t.getNeighborSnippets = async function (e, r, s, a, c, l, u, d) {
      const p = {
        ...t.neighborOptionToSelection[a],
      };
      const h = (function (e, t, r, i, s) {
        let a;
        a =
          t === o.NeighboringSnippets
            ? undefined !== i && undefined !== s
              ? n.IndentationBasedJaccardMatcher.FACTORY(i, s)
              : n.FixedWindowSizeJaccardMatcher.FACTORY(r.snippetLength)
            : n.FunctionJaccardMatcher.FACTORY(r.snippetLength);
        return a.to(e);
      })(e, s, p, c, l);
      return (
        await r
          .filter((e) => e.source.length < 1e4 && e.source.length > 0)
          .slice(0, 20)
          .reduce(
            async (e, t) =>
              (
                await e
              ).concat(
                (
                  await h.findMatches(t, u, d)
                ).map((e) => ({
                  relativepath: t.relativePath,
                  ...e,
                }))
              ),
            Promise.resolve([])
          )
      )
        .filter((e) => e.score && e.snippet && e.score > p.threshold)
        .sort((e, t) => e.score - t.score)
        .slice(-p.numberOfSnippets)
        .map((e) => ({
          ...e,
          provider: i.SnippetProvider.NeighboringTabs,
          semantics:
            s == o.NeighboringFunctions
              ? i.SnippetSemantics.Function
              : i.SnippetSemantics.Snippet,
        }));
    };
  },
  467: (e, t, r) => {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.splitIntoWords =
      t.FunctionalMatcher =
      t.WindowedMatcher =
      t.SortOptions =
        undefined;
    const n = r(360);
    const i = r(306);
    var o;
    !(function (e) {
      e.Ascending = "ascending";
      e.Descending = "descending";
      e.None = "none";
    })((o = t.SortOptions || (t.SortOptions = {})));
    class s {
      constructor(e) {
        this.stopsForLanguage = p.get(e.languageId) ?? d;
      }
      tokenize(e) {
        return new Set(l(e).filter((e) => !this.stopsForLanguage.has(e)));
      }
    }
    const a = new (class {
      constructor(e) {
        this.keys = [];
        this.cache = {};
        this.size = e;
      }
      put(e, t) {
        this.cache[e] = t;
        if (this.keys.length > this.size) {
          this.keys.push(e);
          const t = this.keys.shift() ?? "";
          delete this.cache[t];
        }
      }
      get(e) {
        return this.cache[e];
      }
    })(20);
    class c {
      constructor(e) {
        this.tokenizer = new s(e);
        this.referenceTokens = this.tokenizer.tokenize(this.trimDocument(e));
      }
      sortScoredSnippets(e, t = o.Descending) {
        return t == o.Ascending
          ? e.sort((e, t) => (e.score > t.score ? 1 : -1))
          : t == o.Descending
          ? e.sort((e, t) => (e.score > t.score ? -1 : 1))
          : e;
      }
      retrieveAllSnippets(e, t = o.Descending) {
        const r = [];
        if (0 === e.source.length || 0 === this.referenceTokens.size) return r;
        const n = e.source.split("\n");
        const i = this.id() + ":" + e.source;
        const s = a.get(i) ?? [];
        const c = 0 == s.length;
        const l = c ? n.map(this.tokenizer.tokenize, this.tokenizer) : [];
        for (const [e, [t, i]] of this.getWindowsDelineations(n).entries()) {
          if (c) {
            const e = new Set();
            l.slice(t, i).forEach((t) => t.forEach(e.add, e));
            s.push(e);
          }
          const n = s[e];
          const o = this.similarityScore(n, this.referenceTokens);
          r.push({
            score: o,
            startLine: t,
            endLine: i,
          });
        }
        if (c) {
          a.put(i, s);
        }
        return this.sortScoredSnippets(r, t);
      }
      async findMatches(e, t = n.SnippetSelectionOption.BestMatch, r) {
        if (t == n.SnippetSelectionOption.BestMatch) {
          const t = await this.findBestMatch(e);
          return t ? [t] : [];
        }
        return (
          (t == n.SnippetSelectionOption.TopK &&
            (await this.findTopKMatches(e, r))) ||
          []
        );
      }
      async findBestMatch(e) {
        if (0 === e.source.length || 0 === this.referenceTokens.size) return;
        const t = e.source.split("\n");
        const r = this.retrieveAllSnippets(e, o.Descending);
        return 0 !== r.length && 0 !== r[0].score
          ? {
              snippet: t.slice(r[0].startLine, r[0].endLine).join("\n"),
              ...r[0],
            }
          : undefined;
      }
      async findTopKMatches(e, t = 1) {
        if (0 === e.source.length || 0 === this.referenceTokens.size || t < 1)
          return;
        const r = e.source.split("\n");
        const n = this.retrieveAllSnippets(e, o.Descending);
        if (0 === n.length || 0 === n[0].score) return;
        const i = [n[0]];
        for (let e = 1; e < n.length && i.length < t; e++)
          if (
            -1 ==
            i.findIndex(
              (t) => n[e].startLine < t.endLine && n[e].endLine > t.startLine
            )
          ) {
            i.push(n[e]);
          }
        return i.map((e) => ({
          snippet: r.slice(e.startLine, e.endLine).join("\n"),
          ...e,
        }));
      }
    }
    function l(e) {
      return e.split(/[^a-zA-Z0-9]/).filter((e) => e.length > 0);
    }
    t.WindowedMatcher = c;
    t.FunctionalMatcher = class extends c {
      constructor(e) {
        super(e);
      }
      getMatchingScore(e) {
        const t = this.tokenizer.tokenize(e.source);
        const r = this.similarityScore(t, this.referenceTokens);
        return {
          snippet: e.source,
          score: r,
          startLine: 0,
          endLine: 0,
        };
      }
      async findBestMatch(e) {
        const t = await this.findMatches(e);
        if (0 !== t.length && 0 !== t[0].score) return t[0];
      }
      async findMatches(e, t, r) {
        if (0 === e.source.length || 0 === this.referenceTokens.size) return [];
        const n = await (async function (e) {
          let t = [];
          const r = await i.getFunctionPositions(e.languageId, e.source);
          for (let n = 0; n < r.length; n++) {
            let { startIndex: i, endIndex: o } = r[n];
            let s = e.source.substring(i, o);
            t.push({
              source: s,
              relativePath: e.relativePath,
              languageId: e.languageId,
              uri: e.uri,
            });
          }
          return t;
        })(e);
        if (0 == n.length) {
          const t = e.source.split("\n");
          const r = this.retrieveAllSnippets(e, o.Descending);
          return 0 === r.length || 0 === r[0].score
            ? []
            : [
                {
                  snippet: t.slice(r[0].startLine, r[0].endLine).join("\n"),
                  ...r[0],
                },
              ];
        }
        const s = [];
        for (let e of n) {
          const t = this.getMatchingScore(e);
          s.push(t);
        }
        return s;
      }
    };
    t.splitIntoWords = l;
    const u = new Set([
      "we",
      "our",
      "you",
      "it",
      "its",
      "they",
      "them",
      "their",
      "this",
      "that",
      "these",
      "those",
      "is",
      "are",
      "was",
      "were",
      "be",
      "been",
      "being",
      "have",
      "has",
      "had",
      "having",
      "do",
      "does",
      "did",
      "doing",
      "can",
      "don",
      "t",
      "s",
      "will",
      "would",
      "should",
      "what",
      "which",
      "who",
      "when",
      "where",
      "why",
      "how",
      "a",
      "an",
      "the",
      "and",
      "or",
      "not",
      "no",
      "but",
      "because",
      "as",
      "until",
      "again",
      "further",
      "then",
      "once",
      "here",
      "there",
      "all",
      "any",
      "both",
      "each",
      "few",
      "more",
      "most",
      "other",
      "some",
      "such",
      "above",
      "below",
      "to",
      "during",
      "before",
      "after",
      "of",
      "at",
      "by",
      "about",
      "between",
      "into",
      "through",
      "from",
      "up",
      "down",
      "in",
      "out",
      "on",
      "off",
      "over",
      "under",
      "only",
      "own",
      "same",
      "so",
      "than",
      "too",
      "very",
      "just",
      "now",
    ]);
    const d = new Set([
      "if",
      "then",
      "else",
      "for",
      "while",
      "with",
      "def",
      "function",
      "return",
      "TODO",
      "import",
      "try",
      "catch",
      "raise",
      "finally",
      "repeat",
      "switch",
      "case",
      "match",
      "assert",
      "continue",
      "break",
      "const",
      "class",
      "enum",
      "struct",
      "static",
      "new",
      "super",
      "this",
      "var",
      ...u,
    ]);
    const p = new Map([]);
  },
  830: (e, t) => {
    "use strict";

    var r;
    var n;
    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.normalizeSnippetScore =
      t.announceSnippet =
      t.SnippetSemantics =
      t.SnippetProvider =
        undefined;
    (function (e) {
      e.NeighboringTabs = "neighboring-tabs";
      e.Retrieval = "retrieval";
    })((r = t.SnippetProvider || (t.SnippetProvider = {})));
    (function (e) {
      e.Function = "function";
      e.Snippet = "snippet";
    })((n = t.SnippetSemantics || (t.SnippetSemantics = {})));
    const i = {
      [n.Function]: "function",
      [n.Snippet]: "snippet",
    };
    t.announceSnippet = function (e) {
      const t = i[e.semantics];
      return [
        e.relativePath
          ? `Compare this ${t} from ${e.relativePath}:`
          : `Compare this ${t}:`,
      ].concat(e.snippet.split("\n"));
    };
    t.normalizeSnippetScore = function (e) {
      var t;
      if (e.provider === r.Retrieval) t = -e.score;
      else {
        if (e.provider !== r.NeighboringTabs)
          throw new Error("Unknown snippet source");
        t = e.score;
      }
      return {
        ...e,
        score: t,
      };
    };
  },
  395: (e, t) => {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.findEditDistanceScore = undefined;
    t.findEditDistanceScore = function (e, t) {
      if (0 === e.length || 0 === t.length)
        return {
          score: e.length + t.length,
        };
      const r = Array.from({
        length: e.length,
      }).map(() =>
        Array.from({
          length: t.length,
        }).map(() => 0)
      );
      for (let t = 0; t < e.length; t++) r[t][0] = t;
      for (let e = 0; e < t.length; e++) r[0][e] = e;
      for (let n = 0; n < t.length; n++)
        for (let i = 0; i < e.length; i++)
          r[i][n] = Math.min(
            (0 == i ? n : r[i - 1][n]) + 1,
            (0 == n ? i : r[i][n - 1]) + 1,
            (0 == i || 0 == n ? Math.max(i, n) : r[i - 1][n - 1]) +
              (e[i] == t[n] ? 0 : 1)
          );
      return {
        score: r[e.length - 1][t.length - 1],
      };
    };
  },
  411: (e, t, r) => {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.getTokenizer = t.TokenizerName = undefined;
    const n = r(747);
    const i = r(622);
    const o = r(669);
    const s = (e, t) => Array.from(Array(t).keys()).slice(e);
    const a = (e) => e.charCodeAt(0);
    const c = new o.TextDecoder("utf-8");
    const l = (e) => c.decode(new Uint8Array(e));
    function u(e) {
      const t = new Set();
      let r = e[0];
      for (let n = 1; n < e.length; n++) {
        const i = e[n];
        t.add([r, i]);
        r = i;
      }
      return t;
    }
    const d =
      /'s|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu;
    var p;
    !(function (e) {
      e.cushman001 = "cushman001";
      e.cushman002 = "cushman002";
      e.mock = "mock";
    })((p = t.TokenizerName || (t.TokenizerName = {})));
    const h = new Map();
    t.getTokenizer = function (e = p.cushman002) {
      let t = h.get(e);
      if (undefined !== t) {
        t = e === p.mock ? new g() : new f(e);
        h.set(e, t);
      }
      return t;
    };
    class f {
      constructor(e = p.cushman002) {
        this.decoder = new Map();
        this.byte_encoder = new Map();
        this.byte_decoder = new Map();
        this.cache = new Map();
        this.textEncoder = new o.TextEncoder();
        this.encodeStr = (e) => Array.from(this.textEncoder.encode(e));
        let t = "";
        let r = "";
        if (e === p.cushman001) {
          t = "vocab_cushman001.bpe";
          r = "tokenizer_cushman001.json";
        } else {
          if (e !== p.cushman002)
            throw new Error(`Unknown tokenizer name: ${e}`);
          t = "vocab_cushman002.bpe";
          r = "tokenizer_cushman002.json";
        }
        const c = n.readFileSync(i.resolve(__dirname, "..", "dist", r));
        const l = JSON.parse(c.toString());
        this.encoder = new Map(Object.entries(l));
        for (let [e, t] of this.encoder) this.decoder.set(t, e);
        const u = n
          .readFileSync(i.resolve(__dirname, "..", "dist", t), "utf-8")
          .split("\n")
          .slice(1)
          .filter((e) => e.trim().length > 0);
        this.bpe_ranks = ((e, t) => {
          const r = new Map();
          e.forEach((n, i) => {
            r.set(e[i], t[i]);
          });
          return r;
        })(u, s(0, u.length));
        (function (e) {
          const t = s(a("!"), a("~") + 1).concat(
            s(a("¡"), a("¬") + 1),
            s(a("®"), a("ÿ") + 1)
          );
          let r = t.slice();
          let n = 0;
          for (let e = 0; e < 256; e++)
            if (t.includes(e)) {
              t.push(e);
              r.push(256 + n);
              n += 1;
            }
          const i = r.map((e) => ((e) => String.fromCharCode(e))(e));
          for (let r = 0; r < t.length; r++) e.set(t[r], i[r]);
        })(this.byte_encoder);
        this.byte_encoder.forEach((e, t, r) => {
          this.byte_decoder.set(e, t);
        });
      }
      byteEncodeStr(e) {
        return this.encodeStr(e).map((e) => this.byte_encoder.get(e));
      }
      bpe(e) {
        if (this.cache.has(e)) return this.cache.get(e);
        let t = this.byteEncodeStr(e);
        let r = u(t);
        if (!r) return t.map((e) => this.encoder.get(e));
        for (;;) {
          const e = new Map();
          r.forEach((t) => {
            const r = t.join(" ");
            const n = this.bpe_ranks.get(r);
            e.set(undefined === n || isNaN(n) ? 1e11 : n, t);
          });
          const n = Array.from(e.keys()).map((e) => Number(e));
          const i = e.get(Math.min(...n));
          if (!i || !this.bpe_ranks.has(i.join(" "))) break;
          const o = i[0];
          const s = i[1];
          let a = [];
          let c = 0;
          for (; c < t.length; ) {
            const e = t.indexOf(o, c);
            if (-1 === e) {
              Array.prototype.push.apply(a, t.slice(c));
              break;
            }
            Array.prototype.push.apply(a, t.slice(c, e));
            c = e;
            if (t[c] === o && c < t.length - 1 && t[c + 1] === s) {
              a.push(o + s);
              c += 2;
            } else {
              a.push(t[c]);
              c += 1;
            }
          }
          t = a;
          if (1 === t.length) break;
          r = u(t);
        }
        const n = t.map((e) => this.encoder.get(e));
        this.cache.set(e, n);
        return n;
      }
      tokenize(e) {
        let t = [];
        const r = Array.from(e.matchAll(d)).map((e) => e[0]);
        for (let e of r) {
          const r = this.bpe(e);
          Array.prototype.push.apply(t, r);
        }
        return t;
      }
      tokenLength(e) {
        return this.tokenize(e).length;
      }
      takeLastTokens(e, t) {
        if (t <= 0) return "";
        let r = Math.min(e.length, 4 * t);
        let n = e.slice(-r);
        let i = this.tokenize(n);
        for (; i.length < t + 2 && r < e.length; ) {
          r = Math.min(e.length, r + 1 * t);
          n = e.slice(-r);
          i = this.tokenize(n);
        }
        return i.length < t ? e : ((i = i.slice(-t)), this.detokenize(i));
      }
      takeFirstTokens(e, t) {
        if (t <= 0)
          return {
            text: "",
            tokens: [],
          };
        let r = Math.min(e.length, 4 * t);
        let n = e.slice(0, r);
        let i = this.tokenize(n);
        for (; i.length < t + 2 && r < e.length; ) {
          r = Math.min(e.length, r + 1 * t);
          n = e.slice(0, r);
          i = this.tokenize(n);
        }
        return i.length < t
          ? {
              text: e,
              tokens: i,
            }
          : ((i = i.slice(0, t)),
            {
              text: this.detokenize(i),
              tokens: i,
            });
      }
      takeLastLinesTokens(e, t) {
        const r = this.takeLastTokens(e, t);
        if (r.length === e.length || "\n" === e[e.length - r.length - 1])
          return r;
        let n = r.indexOf("\n");
        return r.substring(n + 1);
      }
      detokenize(e) {
        let t = e.map((e) => this.decoder.get(e)).join("");
        t = l(t.split("").map((e) => this.byte_decoder.get(e)));
        return t;
      }
      tokenizeStrings(e) {
        return this.tokenize(e).map((e) =>
          l(
            this.decoder
              .get(e)
              .split("")
              .map((e) => this.byte_decoder.get(e))
          )
        );
      }
    }
    class g {
      constructor() {
        this.hash = (e) => {
          let t = 0;
          for (let r = 0; r < e.length; r++) {
            t = (t << 5) - t + e.charCodeAt(r);
            t &= 65535 & t;
          }
          return t;
        };
      }
      tokenize(e) {
        return this.tokenizeStrings(e).map(this.hash);
      }
      detokenize(e) {
        return e.map((e) => e.toString()).join(" ");
      }
      tokenizeStrings(e) {
        return e.split(/\b/);
      }
      tokenLength(e) {
        return this.tokenizeStrings(e).length;
      }
      takeLastTokens(e, t) {
        return this.tokenizeStrings(e).slice(-t).join("");
      }
      takeFirstTokens(e, t) {
        const r = this.tokenizeStrings(e).slice(0, t);
        return {
          text: r.join(""),
          tokens: r.map(this.hash),
        };
      }
      takeLastLinesTokens(e, t) {
        const r = this.takeLastTokens(e, t);
        if (r.length === e.length || "\n" === e[e.length - r.length - 1])
          return r;
        let n = r.indexOf("\n");
        return r.substring(n + 1);
      }
    }
  },
  456: (e, t, r) => {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: true,
    });
    t.Priorities =
      t.PromptWishlist =
      t.PromptElementRanges =
      t.PromptChoices =
      t.PromptBackground =
      t.PromptElementKind =
        undefined;
    const n = r(360);
    var i;
    !(function (e) {
      e.BeforeCursor = "BeforeCursor";
      e.AfterCursor = "AfterCursor";
      e.SimilarFile = "SimilarFile";
      e.ImportedFile = "ImportedFile";
      e.LanguageMarker = "LanguageMarker";
      e.PathMarker = "PathMarker";
    })((i = t.PromptElementKind || (t.PromptElementKind = {})));
    class o {
      constructor() {
        this.used = new Map();
        this.unused = new Map();
      }
      markUsed(e) {
        if (this.IsNeighboringTab(e)) {
          this.used.set(e.id, this.convert(e));
        }
      }
      undoMarkUsed(e) {
        if (this.IsNeighboringTab(e)) {
          this.used.delete(e.id);
        }
      }
      markUnused(e) {
        if (this.IsNeighboringTab(e)) {
          this.unused.set(e.id, this.convert(e));
        }
      }
      convert(e) {
        return {
          score: e.score.toFixed(4),
          length: e.text.length,
        };
      }
      IsNeighboringTab(e) {
        return e.kind == i.SimilarFile;
      }
    }
    t.PromptBackground = o;
    class s {
      constructor() {
        this.used = new Map();
        this.unused = new Map();
      }
      markUsed(e) {
        this.used.set(e.kind, (this.used.get(e.kind) || 0) + e.tokens);
      }
      undoMarkUsed(e) {
        this.used.set(e.kind, (this.used.get(e.kind) || 0) - e.tokens);
      }
      markUnused(e) {
        this.unused.set(e.kind, (this.used.get(e.kind) || 0) + e.tokens);
      }
    }
    t.PromptChoices = s;
    class a {
      constructor(e) {
        this.ranges = new Array();
        let t;
        let r = 0;
        for (const { element: n } of e)
          if (0 !== n.text.length) {
            if (t === i.BeforeCursor && n.kind === i.BeforeCursor) {
              this.ranges[this.ranges.length - 1].end += n.text.length;
            } else {
              this.ranges.push({
                kind: n.kind,
                start: r,
                end: r + n.text.length,
              });
            }
            t = n.kind;
            r += n.text.length;
          }
      }
    }
    t.PromptElementRanges = a;
    t.PromptWishlist = class {
      constructor(e, t) {
        this.tokenizer = e;
        this.content = [];
        this.tokenizer = e;
        this.lineEndingOption = t;
      }
      getContent() {
        return [...this.content];
      }
      convertLineEndings(e) {
        if (this.lineEndingOption === n.LineEndingOptions.ConvertToUnix) {
          e = e.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        }
        return e;
      }
      append(e, t, r, n = this.tokenizer.tokenLength(e), i = NaN) {
        e = this.convertLineEndings(e);
        const o = this.content.length;
        this.content.push({
          id: o,
          text: e,
          kind: t,
          priority: r,
          tokens: n,
          requires: [],
          excludes: [],
          score: i,
        });
        return o;
      }
      appendLineForLine(e, t, r) {
        const n = (e = this.convertLineEndings(e)).split("\n");
        for (let e = 0; e < n.length - 1; e++) n[e] += "\n";
        const i = [];
        n.forEach((e, t) => {
          if ("\n" === e && i.length > 0 && !i[i.length - 1].endsWith("\n\n")) {
            i[i.length - 1] += "\n";
          } else {
            i.push(e);
          }
        });
        const o = [];
        i.forEach((e, n) => {
          if ("" !== e) {
            o.push(this.append(e, t, r));
            if (n > 0) {
              this.content[this.content.length - 2].requires = [
                this.content[this.content.length - 1],
              ];
            }
          }
        });
        return o;
      }
      require(e, t) {
        const r = this.content.find((t) => t.id === e);
        const n = this.content.find((e) => e.id === t);
        if (r && n) {
          r.requires.push(n);
        }
      }
      exclude(e, t) {
        const r = this.content.find((t) => t.id === e);
        const n = this.content.find((e) => e.id === t);
        if (r && n) {
          r.excludes.push(n);
        }
      }
      fulfill(e) {
        const t = new s();
        const r = new o();
        const n = this.content.map((e, t) => ({
          element: e,
          index: t,
        }));
        n.sort((e, t) =>
          e.element.priority === t.element.priority
            ? t.index - e.index
            : t.element.priority - e.element.priority
        );
        const i = new Set();
        const c = new Set();
        let l;
        const u = [];
        let d = e;
        n.forEach((e) => {
          const n = e.element;
          const o = e.index;
          if (
            d >= 0 &&
            (d > 0 || undefined === l) &&
            n.requires.every((e) => i.has(e.id)) &&
            !c.has(n.id)
          ) {
            let s = n.tokens;
            const a = (function (e, t) {
              let r;
              let n = 1 / 0;
              for (const i of e)
                if (i.index > t && i.index < n) {
                  r = i;
                  n = i.index;
                }
              return r;
            })(u, o)?.element;
            if (n.text.endsWith("\n\n") && a && !a.text.match(/^\s/)) {
              s++;
            }
            if (d >= s) {
              d -= s;
              i.add(n.id);
              n.excludes.forEach((e) => c.add(e.id));
              t.markUsed(n);
              r.markUsed(n);
              u.push(e);
            } else {
              l = l ?? e;
            }
          } else {
            t.markUnused(n);
            r.markUnused(n);
          }
        });
        u.sort((e, t) => e.index - t.index);
        let p = u.reduce((e, t) => e + t.element.text, "");
        let h = this.tokenizer.tokenLength(p);
        for (; h > e; ) {
          u.sort((e, t) =>
            t.element.priority === e.element.priority
              ? t.index - e.index
              : t.element.priority - e.element.priority
          );
          const e = u.pop();
          if (e) {
            t.undoMarkUsed(e.element);
            t.markUnused(e.element);
            r.undoMarkUsed(e.element);
            r.markUnused(e.element);
            l = undefined;
          }
          u.sort((e, t) => e.index - t.index);
          p = u.reduce((e, t) => e + t.element.text, "");
          h = this.tokenizer.tokenLength(p);
        }
        const f = [...u];
        if (undefined !== l) {
          f.push(l);
          f.sort((e, t) => e.index - t.index);
          const n = f.reduce((e, t) => e + t.element.text, "");
          const i = this.tokenizer.tokenLength(n);
          if (i <= e) {
            t.markUsed(l.element);
            r.markUsed(l.element);
            const e = new a(f);
            return {
              prefix: n,
              suffix: "",
              prefixLength: i,
              suffixLength: 0,
              promptChoices: t,
              promptBackground: r,
              promptElementRanges: e,
            };
          }
          t.markUnused(l.element);
          r.markUnused(l.element);
        }
        const g = new a(u);
        return {
          prefix: p,
          suffix: "",
          prefixLength: h,
          suffixLength: 0,
          promptChoices: t,
          promptBackground: r,
          promptElementRanges: g,
        };
      }
    };
    class c {
      constructor() {
        this.registeredPriorities = [0, 1];
      }
      register(e) {
        if (e > c.TOP || e < c.BOTTOM)
          throw new Error("Priority must be between 0 and 1");
        this.registeredPriorities.push(e);
        return e;
      }
      justAbove(...e) {
        const t = Math.max(...e);
        const r = Math.min(...this.registeredPriorities.filter((e) => e > t));
        return this.register((r + t) / 2);
      }
      justBelow(...e) {
        const t = Math.min(...e);
        const r = Math.max(...this.registeredPriorities.filter((e) => e < t));
        return this.register((r + t) / 2);
      }
      between(e, t) {
        if (
          this.registeredPriorities.some((r) => r > e && r < t) ||
          !this.registeredPriorities.includes(e) ||
          !this.registeredPriorities.includes(t)
        )
          throw new Error(
            "Priorities must be adjacent in the list of priorities"
          );
        return this.register((e + t) / 2);
      }
    }
    t.Priorities = c;
    c.TOP = 1;
    c.BOTTOM = 0;
  },
  87: (e, t, r) => {
    var n = undefined !== n ? n : {};
    var i = (function () {
      var t;
      var i =
        "object" == typeof window
          ? {
              currentScript: window.document.currentScript,
            }
          : null;
      class o {
        constructor() {
          this.initialize();
        }
        initialize() {
          throw new Error("cannot construct a Parser before calling `init()`");
        }
        static init(s) {
          return (
            t ||
            ((n = Object.assign({}, n, s)),
            (t = new Promise((t) => {
              var s = Object.assign({}, n);
              var a = [];
              var c = "./this.program";
              var l = (e, t) => {
                throw t;
              };
              var u = "object" == typeof window;
              var d = "function" == typeof importScripts;
              var p =
                "object" == typeof process &&
                "object" == typeof process.versions &&
                "string" == typeof process.versions.node;
              var h = !u && !p && !d;
              if (n.ENVIRONMENT)
                throw new Error(
                  "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)"
                );
              var f;
              var g;
              var m;
              var y = "";
              function v(e) {
                if (e instanceof Se) return;
                let t = e;
                if (e && "object" == typeof e && e.stack) {
                  t = [e, e.stack];
                }
                E("exiting due to exception: " + t);
              }
              if (p) {
                if (
                  "undefined" == typeof process ||
                  !process.release ||
                  "node" !== process.release.name
                )
                  throw new Error(
                    "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)"
                  );
                var _;
                var b;
                y = d ? r(622).dirname(y) + "/" : __dirname + "/";
                _ = r(747);
                b = r(622);
                f = (e, t) => (
                  (e = b.normalize(e)),
                  _.readFileSync(e, t ? undefined : "utf8")
                );
                m = (e) => {
                  var t = f(e, true);
                  if (t.buffer) {
                    t = new Uint8Array(t);
                  }
                  B(t.buffer);
                  return t;
                };
                g = (e, t, r) => {
                  e = b.normalize(e);
                  _.readFile(e, function (e, n) {
                    if (e) {
                      r(e);
                    } else {
                      t(n.buffer);
                    }
                  });
                };
                if (process.argv.length > 1) {
                  c = process.argv[1].replace(/\\/g, "/");
                }
                a = process.argv.slice(2);
                e.exports = n;
                l = (e, t) => {
                  if (ce()) throw ((process.exitCode = e), t);
                  v(t);
                  process.exit(e);
                };
                n.inspect = function () {
                  return "[Emscripten Module object]";
                };
              } else if (h) {
                if (
                  "object" == typeof process ||
                  "object" == typeof window ||
                  "function" == typeof importScripts
                )
                  throw new Error(
                    "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)"
                  );
                if ("undefined" != typeof read) {
                  f = function (e) {
                    return read(e);
                  };
                }
                m = function (e) {
                  let t;
                  return "function" == typeof readbuffer
                    ? new Uint8Array(readbuffer(e))
                    : ((t = read(e, "binary")), B("object" == typeof t), t);
                };
                g = function (e, t, r) {
                  setTimeout(() => t(m(e)), 0);
                };
                if ("undefined" != typeof scriptArgs) {
                  a = scriptArgs;
                } else {
                  if (undefined !== arguments) {
                    a = arguments;
                  }
                }
                if ("function" == typeof quit) {
                  l = (e, t) => {
                    v(t);
                    quit(e);
                  };
                }
                if ("undefined" != typeof print) {
                  if ("undefined" == typeof console) {
                    console = {};
                  }
                  console.log = print;
                  console.warn = console.error =
                    "undefined" != typeof printErr ? printErr : print;
                }
              } else {
                if (!u && !d) throw new Error("environment detection error");
                if (d) {
                  y = self.location.href;
                } else {
                  if (undefined !== i && i.currentScript) {
                    y = i.currentScript.src;
                  }
                }
                y =
                  0 !== y.indexOf("blob:")
                    ? y.substr(0, y.replace(/[?#].*/, "").lastIndexOf("/") + 1)
                    : "";
                if (
                  "object" != typeof window &&
                  "function" != typeof importScripts
                )
                  throw new Error(
                    "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)"
                  );
                f = (e) => {
                  var t = new XMLHttpRequest();
                  t.open("GET", e, false);
                  t.send(null);
                  return t.responseText;
                };
                if (d) {
                  m = (e) => {
                    var t = new XMLHttpRequest();
                    t.open("GET", e, false);
                    t.responseType = "arraybuffer";
                    t.send(null);
                    return new Uint8Array(t.response);
                  };
                }
                g = (e, t, r) => {
                  var n = new XMLHttpRequest();
                  n.open("GET", e, true);
                  n.responseType = "arraybuffer";
                  n.onload = () => {
                    if (200 == n.status || (0 == n.status && n.response)) {
                      t(n.response);
                    } else {
                      r();
                    }
                  };
                  n.onerror = r;
                  n.send(null);
                };
              }
              var w;
              var C = n.print || console.log.bind(console);
              var E = n.printErr || console.warn.bind(console);
              function T(e, t) {
                if (Object.getOwnPropertyDescriptor(n, e)) {
                  Object.defineProperty(n, e, {
                    configurable: true,
                    get: function () {
                      ge(
                        "Module." +
                          e +
                          " has been replaced with plain " +
                          t +
                          " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)"
                      );
                    },
                  });
                }
              }
              function S(e) {
                return (
                  "FS_createPath" === e ||
                  "FS_createDataFile" === e ||
                  "FS_createPreloadedFile" === e ||
                  "FS_unlink" === e ||
                  "addRunDependency" === e ||
                  "FS_createLazyFile" === e ||
                  "FS_createDevice" === e ||
                  "removeRunDependency" === e
                );
              }
              Object.assign(n, s);
              s = null;
              w = "fetchSettings";
              if (Object.getOwnPropertyDescriptor(n, w)) {
                ge(
                  "`Module." +
                    w +
                    "` was supplied but `" +
                    w +
                    "` not included in INCOMING_MODULE_JS_API"
                );
              }
              if (n.arguments) {
                a = n.arguments;
              }
              T("arguments", "arguments_");
              if (n.thisProgram) {
                c = n.thisProgram;
              }
              T("thisProgram", "thisProgram");
              if (n.quit) {
                l = n.quit;
              }
              T("quit", "quit_");
              B(
                undefined === n.memoryInitializerPrefixURL,
                "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"
              );
              B(
                undefined === n.pthreadMainPrefixURL,
                "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"
              );
              B(
                undefined === n.cdInitializerPrefixURL,
                "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"
              );
              B(
                undefined === n.filePackagePrefixURL,
                "Module.filePackagePrefixURL option was removed, use Module.locateFile instead"
              );
              B(
                undefined === n.read,
                "Module.read option was removed (modify read_ in JS)"
              );
              B(
                undefined === n.readAsync,
                "Module.readAsync option was removed (modify readAsync in JS)"
              );
              B(
                undefined === n.readBinary,
                "Module.readBinary option was removed (modify readBinary in JS)"
              );
              B(
                undefined === n.setWindowTitle,
                "Module.setWindowTitle option was removed (modify setWindowTitle in JS)"
              );
              B(
                undefined === n.TOTAL_MEMORY,
                "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY"
              );
              T("read", "read_");
              T("readAsync", "readAsync");
              T("readBinary", "readBinary");
              T("setWindowTitle", "setWindowTitle");
              B(
                !h,
                "shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable."
              );
              var x;
              var k = n.dynamicLibraries || [];
              if (n.wasmBinary) {
                x = n.wasmBinary;
              }
              T("wasmBinary", "wasmBinary");
              var I;
              var A = n.noExitRuntime || true;
              function P(e, t) {
                switch (e) {
                  case 1:
                    return "i8";
                  case 2:
                    return "i16";
                  case 4:
                    return t ? "float" : "i32";
                  case 8:
                    return t ? "double" : "i64";
                  default:
                    B(0);
                }
              }
              function R(e, t, r, n) {
                if (e <= 0) {
                  ge(
                    "segmentation fault storing " + r + " bytes to address " + e
                  );
                }
                if (e % r != 0) {
                  ge(
                    "alignment error storing to address " +
                      e +
                      ", which was expected to be aligned to a multiple of " +
                      r
                  );
                }
                if (ae) {
                  var i = Ct() >>> 0;
                  e + r > i &&
                    ge(
                      "segmentation fault, exceeded the top of the available dynamic heap when storing " +
                        r +
                        " bytes to address " +
                        e +
                        ". DYNAMICTOP=" +
                        i
                    ),
                    B(i >= St()),
                    B(i <= j.length);
                }
                (function (e, t, r) {
                  switch (r) {
                    case "i1":
                    case "i8":
                      j[e >> 0] = t;
                      break;
                    case "i16":
                      $[e >> 1] = t;
                      break;
                    case "i32":
                      q[e >> 2] = t;
                      break;
                    case "i64":
                      _e = [
                        t >>> 0,
                        ((ve = t),
                        +Math.abs(ve) >= 1
                          ? ve > 0
                            ? (0 |
                                Math.min(
                                  +Math.floor(ve / 4294967296),
                                  4294967295
                                )) >>>
                              0
                            : ~~+Math.ceil(
                                (ve - +(~~ve >>> 0)) / 4294967296
                              ) >>> 0
                          : 0),
                      ];
                      q[e >> 2] = _e[0];
                      q[(e + 4) >> 2] = _e[1];
                      break;
                    case "float":
                      H[e >> 2] = t;
                      break;
                    case "double":
                      V[e >> 3] = t;
                      break;
                    default:
                      ge("invalid type for setValue: " + r);
                  }
                })(e, t, P(r, n));
                return t;
              }
              function N(e, t, r) {
                return R(e, t, r, true);
              }
              function O(e, t, r, n) {
                if (e <= 0) {
                  ge(
                    "segmentation fault loading " +
                      t +
                      " bytes from address " +
                      e
                  );
                }
                if (e % t != 0) {
                  ge(
                    "alignment error loading from address " +
                      e +
                      ", which was expected to be aligned to a multiple of " +
                      t
                  );
                }
                if (ae) {
                  var i = Ct() >>> 0;
                  e + t > i &&
                    ge(
                      "segmentation fault, exceeded the top of the available dynamic heap when loading " +
                        t +
                        " bytes from address " +
                        e +
                        ". DYNAMICTOP=" +
                        i
                    ),
                    B(i >= St()),
                    B(i <= j.length);
                }
                var o;
                var s;
                var a = P(t, n);
                var c = (function (e, t) {
                  switch (t) {
                    case "i1":
                    case "i8":
                      return j[e >> 0];
                    case "i16":
                      return $[e >> 1];
                    case "i32":
                    case "i64":
                      return q[e >> 2];
                    case "float":
                      return H[e >> 2];
                    case "double":
                      return V[e >> 3];
                    default:
                      ge("invalid type for getValue: " + t);
                  }
                })(e, a);
                if (r) {
                  o = c;
                  s = parseInt(a.substr(1), 10);
                  c =
                    o >= 0
                      ? o
                      : s <= 32
                      ? 2 * Math.abs(1 << (s - 1)) + o
                      : Math.pow(2, s) + o;
                }
                return c;
              }
              function L(e, t, r) {
                return O(e, t, r, true);
              }
              T("noExitRuntime", "noExitRuntime");
              if ("object" != typeof WebAssembly) {
                ge("no native wasm support detected");
              }
              var D;
              var M = false;
              function B(e, t) {
                if (e) {
                  ge("Assertion failed" + (t ? ": " + t : ""));
                }
              }
              var F;
              var j;
              var U;
              var $;
              var q;
              var H;
              var V;
              var z =
                "undefined" != typeof TextDecoder
                  ? new TextDecoder("utf8")
                  : undefined;
              function K(e, t, r) {
                for (n = t + r, i = t, undefined; e[i] && !(i >= n); ) {
                  var n;
                  var i;
                  ++i;
                }
                if (i - t > 16 && e.buffer && z)
                  return z.decode(e.subarray(t, i));
                for (var o = ""; t < i; ) {
                  var s = e[t++];
                  if (128 & s) {
                    var a = 63 & e[t++];
                    if (192 != (224 & s)) {
                      var c = 63 & e[t++];
                      if (224 == (240 & s)) {
                        s = ((15 & s) << 12) | (a << 6) | c;
                      } else {
                        if (240 != (248 & s)) {
                          Xe(
                            "Invalid UTF-8 leading byte 0x" +
                              s.toString(16) +
                              " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"
                          );
                        }
                        s =
                          ((7 & s) << 18) |
                          (a << 12) |
                          (c << 6) |
                          (63 & e[t++]);
                      }
                      if (s < 65536) o += String.fromCharCode(s);
                      else {
                        var l = s - 65536;
                        o += String.fromCharCode(
                          55296 | (l >> 10),
                          56320 | (1023 & l)
                        );
                      }
                    } else o += String.fromCharCode(((31 & s) << 6) | a);
                  } else o += String.fromCharCode(s);
                }
                return o;
              }
              function W(e, t) {
                return e ? K(U, e, t) : "";
              }
              function G(e, t, r, n) {
                if (!(n > 0)) return 0;
                for (
                  i = r, o = r + n - 1, s = 0, undefined;
                  s < e.length;
                  ++s
                ) {
                  var i;
                  var o;
                  var s;
                  var a = e.charCodeAt(s);
                  if (a >= 55296 && a <= 57343) {
                    a =
                      (65536 + ((1023 & a) << 10)) | (1023 & e.charCodeAt(++s));
                  }
                  if (a <= 127) {
                    if (r >= o) break;
                    t[r++] = a;
                  } else if (a <= 2047) {
                    if (r + 1 >= o) break;
                    (t[r++] = 192 | (a >> 6)), (t[r++] = 128 | (63 & a));
                  } else if (a <= 65535) {
                    if (r + 2 >= o) break;
                    (t[r++] = 224 | (a >> 12)),
                      (t[r++] = 128 | ((a >> 6) & 63)),
                      (t[r++] = 128 | (63 & a));
                  } else {
                    if (r + 3 >= o) break;
                    a > 1114111 &&
                      Xe(
                        "Invalid Unicode code point 0x" +
                          a.toString(16) +
                          " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF)."
                      ),
                      (t[r++] = 240 | (a >> 18)),
                      (t[r++] = 128 | ((a >> 12) & 63)),
                      (t[r++] = 128 | ((a >> 6) & 63)),
                      (t[r++] = 128 | (63 & a));
                  }
                }
                t[r] = 0;
                return r - i;
              }
              function Q(e, t, r) {
                B(
                  "number" == typeof r,
                  "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"
                );
                return G(e, U, t, r);
              }
              function J(e) {
                for (t = 0, r = 0, undefined; r < e.length; ++r) {
                  var t;
                  var r;
                  var n = e.charCodeAt(r);
                  if (n <= 127) {
                    t++;
                  } else {
                    if (n <= 2047) {
                      t += 2;
                    } else {
                      if (n >= 55296 && n <= 57343) {
                        t += 4;
                        ++r;
                      } else {
                        t += 3;
                      }
                    }
                  }
                }
                return t;
              }
              function Y(e) {
                F = e;
                n.HEAP8 = j = new Int8Array(e);
                n.HEAP16 = $ = new Int16Array(e);
                n.HEAP32 = q = new Int32Array(e);
                n.HEAPU8 = U = new Uint8Array(e);
                n.HEAPU16 = new Uint16Array(e);
                n.HEAPU32 = new Uint32Array(e);
                n.HEAPF32 = H = new Float32Array(e);
                n.HEAPF64 = V = new Float64Array(e);
              }
              var X = 5242880;
              if (n.STACK_SIZE) {
                B(
                  X === n.STACK_SIZE,
                  "the stack size can no longer be determined at runtime"
                );
              }
              var Z = n.INITIAL_MEMORY || 33554432;
              T("INITIAL_MEMORY", "INITIAL_MEMORY");
              B(
                Z >= X,
                "INITIAL_MEMORY should be larger than STACK_SIZE, was " +
                  Z +
                  "! (STACK_SIZE=" +
                  X +
                  ")"
              );
              B(
                "undefined" != typeof Int32Array &&
                  "undefined" != typeof Float64Array &&
                  null != Int32Array.prototype.subarray &&
                  null != Int32Array.prototype.set,
                "JS engine does not provide full typed array support"
              );
              if (
                (I = n.wasmMemory
                  ? n.wasmMemory
                  : new WebAssembly.Memory({
                      initial: Z / 65536,
                      maximum: 32768,
                    }))
              ) {
                F = I.buffer;
              }
              B((Z = F.byteLength) % 65536 == 0);
              Y(F);
              var ee = new WebAssembly.Table({
                initial: 25,
                element: "anyfunc",
              });
              function te() {
                if (!M) {
                  var e = xt();
                  var t = O(4 * (e >> 2), 4, 1);
                  var r = O(4 * ((e + 4) >> 2), 4, 1);
                  if (34821223 == t && 2310721022 == r) {
                    ge(
                      "Stack overflow! Stack cookie has been overwritten at 0x" +
                        e.toString(16) +
                        ", expected hex dwords 0x89BACDFE and 0x2135467, but received 0x" +
                        r.toString(16) +
                        " 0x" +
                        t.toString(16)
                    );
                  }
                }
              }
              !(function () {
                var e = new Int16Array(1);
                var t = new Int8Array(e.buffer);
                e[0] = 25459;
                if (115 !== t[0] || 99 !== t[1])
                  throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
              })();
              var re = [];
              var ne = [];
              var ie = [];
              var oe = [];
              var se = [];
              var ae = false;
              function ce() {
                return A;
              }
              B(
                Math.imul,
                "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
              );
              B(
                Math.fround,
                "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
              );
              B(
                Math.clz32,
                "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
              );
              B(
                Math.trunc,
                "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
              );
              var le = 0;
              var ue = null;
              var de = null;
              var pe = {};
              function he(e) {
                le++;
                if (n.monitorRunDependencies) {
                  n.monitorRunDependencies(le);
                }
                if (e) {
                  B(!pe[e]);
                  pe[e] = 1;
                  if (null === ue && "undefined" != typeof setInterval) {
                    ue = setInterval(function () {
                      if (M) {
                        clearInterval(ue);
                        return void (ue = null);
                      }
                      var e = false;
                      for (var t in pe) {
                        if (e) {
                          e = true;
                          E("still waiting on run dependencies:");
                        }
                        E("dependency: " + t);
                      }
                      if (e) {
                        E("(end of list)");
                      }
                    }, 1e4);
                  }
                } else {
                  E("warning: run dependency added without ID");
                }
              }
              function fe(e) {
                le--;
                if (n.monitorRunDependencies) {
                  n.monitorRunDependencies(le);
                }
                if (e) {
                  B(pe[e]);
                  delete pe[e];
                } else {
                  E("warning: run dependency removed without ID");
                }
                if (
                  0 == le &&
                  (null !== ue && (clearInterval(ue), (ue = null)), de)
                ) {
                  var t = de;
                  (de = null), t();
                }
              }
              function ge(e) {
                throw (
                  (n.onAbort && n.onAbort(e),
                  E((e = "Aborted(" + e + ")")),
                  (M = true),
                  (D = 1),
                  new WebAssembly.RuntimeError(e))
                );
              }
              var me;
              var ye;
              var ve;
              var _e;
              var be = {
                error: function () {
                  ge(
                    "Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM"
                  );
                },
                init: function () {
                  be.error();
                },
                createDataFile: function () {
                  be.error();
                },
                createPreloadedFile: function () {
                  be.error();
                },
                createLazyFile: function () {
                  be.error();
                },
                open: function () {
                  be.error();
                },
                mkdev: function () {
                  be.error();
                },
                registerDevice: function () {
                  be.error();
                },
                analyzePath: function () {
                  be.error();
                },
                loadFilesFromDB: function () {
                  be.error();
                },
                ErrnoError: function () {
                  be.error();
                },
              };
              function we(e) {
                return e.startsWith("data:application/octet-stream;base64,");
              }
              function Ce(e) {
                return e.startsWith("file://");
              }
              function Ee(e, t) {
                return function () {
                  var r = e;
                  var i = t;
                  if (t) {
                    i = n.asm;
                  }
                  B(
                    ae,
                    "native function `" +
                      r +
                      "` called before runtime initialization"
                  );
                  if (i[e]) {
                    B(i[e], "exported native function `" + r + "` not found");
                  }
                  return i[e].apply(null, arguments);
                };
              }
              function Te(e) {
                try {
                  if (e == me && x) return new Uint8Array(x);
                  if (m) return m(e);
                  throw "both async and sync fetching of the wasm failed";
                } catch (e) {
                  ge(e);
                }
              }
              function Se(e) {
                this.name = "ExitStatus";
                this.message = "Program terminated with exit(" + e + ")";
                this.status = e;
              }
              n.FS_createDataFile = be.createDataFile;
              n.FS_createPreloadedFile = be.createPreloadedFile;
              if (we((me = "tree-sitter.wasm"))) {
                ye = me;
                me = n.locateFile ? n.locateFile(ye, y) : y + ye;
              }
              var xe = {};
              var ke = new Set([]);
              var Ie = {
                get: function (e, t) {
                  var r = xe[t];
                  if (r) {
                    r = xe[t] = new WebAssembly.Global({
                      value: "i32",
                      mutable: true,
                    });
                  }
                  if (ke.has(t)) {
                    r.required = true;
                  }
                  return r;
                },
              };
              function Ae(e) {
                for (; e.length > 0; ) e.shift()(n);
              }
              function Pe(e) {
                var t = 0;
                var r = 0;
                function n() {
                  for (r = 0, n = 1, undefined; ; ) {
                    var r;
                    var n;
                    var i = e[t++];
                    r += (127 & i) * n;
                    n *= 128;
                    if (!(128 & i)) break;
                  }
                  return r;
                }
                function i() {
                  var r = n();
                  return K(e, (t += r) - r, r);
                }
                function o(e, t) {
                  if (e) throw new Error(t);
                }
                var s = "dylink.0";
                if (e instanceof WebAssembly.Module) {
                  var a = WebAssembly.Module.customSections(e, s);
                  if (0 === a.length) {
                    s = "dylink";
                    a = WebAssembly.Module.customSections(e, s);
                  }
                  o(0 === a.length, "need dylink section");
                  r = (e = new Uint8Array(a[0])).length;
                } else {
                  o(
                    !(
                      1836278016 ==
                      new Uint32Array(
                        new Uint8Array(e.subarray(0, 24)).buffer
                      )[0]
                    ),
                    "need to see wasm magic number"
                  );
                  o(0 !== e[8], "need the dylink section to be first");
                  t = 9;
                  var c = n();
                  r = t + c;
                  s = i();
                }
                var l = {
                  neededDynlibs: [],
                  tlsExports: new Set(),
                  weakImports: new Set(),
                };
                if ("dylink" == s) {
                  l.memorySize = n();
                  l.memoryAlign = n();
                  l.tableSize = n();
                  l.tableAlign = n();
                  for (u = n(), d = 0, undefined; d < u; ++d) {
                    var u;
                    var d;
                    var p = i();
                    l.neededDynlibs.push(p);
                  }
                } else
                  for (o("dylink.0" !== s); t < r; ) {
                    var h = e[t++];
                    var f = n();
                    if (1 === h) {
                      l.memorySize = n();
                      l.memoryAlign = n();
                      l.tableSize = n();
                      l.tableAlign = n();
                    } else if (2 === h)
                      for (u = n(), d = 0; d < u; ++d) {
                        p = i();
                        l.neededDynlibs.push(p);
                      }
                    else if (3 === h)
                      for (var g = n(); g--; ) {
                        var m = i();
                        if (256 & n()) {
                          l.tlsExports.add(m);
                        }
                      }
                    else if (4 === h)
                      for (g = n(); g--; ) {
                        i();
                        m = i();
                        if (1 == (3 & n())) {
                          l.weakImports.add(m);
                        }
                      }
                    else {
                      E("unknown dylink.0 subsection: " + h);
                      t += f;
                    }
                  }
                var y = Math.pow(2, l.tableAlign);
                B(1 === y, "invalid tableAlign " + y);
                B(t == r);
                return l;
              }
              function Re(e, t = "i8") {
                switch ((t.endsWith("*") && (t = "*"), t)) {
                  case "i1":
                  case "i8":
                    return O(e >> 0, 1, 0);
                  case "i16":
                    return O(2 * (e >> 1), 2, 0);
                  case "i32":
                  case "i64":
                    return O(4 * (e >> 2), 4, 0);
                  case "float":
                    return L(4 * (e >> 2), 4, 0);
                  case "double":
                    return L(8 * (e >> 3), 8, 0);
                  case "*":
                    return O(4 * (e >> 2), 4, 1);
                  default:
                    ge("invalid type for getValue: " + t);
                }
                return null;
              }
              function Ne(e) {
                return 0 == e.indexOf("dynCall_") ||
                  [
                    "stackAlloc",
                    "stackSave",
                    "stackRestore",
                    "getTempRet0",
                    "setTempRet0",
                  ].includes(e)
                  ? e
                  : "_" + e;
              }
              function Oe(e, t) {
                for (var r in e)
                  if (e.hasOwnProperty(r)) {
                    if (_t.hasOwnProperty(r)) {
                      _t[r] = e[r];
                    }
                    var i = Ne(r);
                    if (n.hasOwnProperty(i)) {
                      n[i] = e[r];
                    }
                    if ("__main_argc_argv" == r) {
                      n._main = e[r];
                    }
                  }
              }
              var Le = {
                loadedLibsByName: {},
                loadedLibsByHandle: {},
              };
              var De = [];
              function Me(e) {
                var t = De[e];
                if (t) {
                  if (e >= De.length) {
                    De.length = e + 1;
                  }
                  De[e] = t = ee.get(e);
                }
                B(
                  ee.get(e) == t,
                  "JavaScript-side Wasm function table mirror is out of date!"
                );
                return t;
              }
              function Be(e, t, r) {
                return e.includes("j")
                  ? (function (e, t, r) {
                      B(
                        "dynCall_" + e in n,
                        "bad function pointer type - dynCall function not found for sig '" +
                          e +
                          "'"
                      );
                      if (r && r.length) {
                        B(
                          r.length === e.substring(1).replace(/j/g, "--").length
                        );
                      } else {
                        B(1 == e.length);
                      }
                      var i = n["dynCall_" + e];
                      return r && r.length
                        ? i.apply(null, [t].concat(r))
                        : i.call(null, t);
                    })(e, t, r)
                  : (B(Me(t), "missing table entry in dynCall: " + t),
                    Me(t).apply(null, r));
              }
              var Fe = 5255488;
              function je(e) {
                return [
                  "__cpp_exception",
                  "__c_longjmp",
                  "__wasm_apply_data_relocs",
                  "__dso_handle",
                  "__tls_size",
                  "__tls_align",
                  "__set_stack_limits",
                  "_emscripten_tls_init",
                  "__wasm_init_tls",
                  "__wasm_call_ctors",
                ].includes(e);
              }
              function Ue(e, t) {
                B(e < 16384);
                if (e < 128) {
                  t.push(e);
                } else {
                  t.push(e % 128 | 128, e >> 7);
                }
              }
              function $e(e, t) {
                if (qe)
                  for (var r = e; r < e + t; r++) {
                    var n = Me(r);
                    if (n) {
                      qe.set(n, r);
                    }
                  }
              }
              var qe = undefined;
              var He = [];
              function Ve(e, t) {
                ee.set(e, t);
                De[e] = ee.get(e);
              }
              function ze(e, t) {
                B(undefined !== e);
                if (qe) {
                  qe = new WeakMap();
                  $e(0, ee.length);
                }
                if (qe.has(e)) return qe.get(e);
                var r = (function () {
                  if (He.length) return He.pop();
                  try {
                    ee.grow(1);
                  } catch (e) {
                    if (!(e instanceof RangeError)) throw e;
                    throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
                  }
                  return ee.length - 1;
                })();
                try {
                  Ve(r, e);
                } catch (n) {
                  if (!(n instanceof TypeError)) throw n;
                  B(
                    undefined !== t,
                    "Missing signature argument to addFunction: " + e
                  );
                  Ve(
                    r,
                    (function (e, t) {
                      if ("function" == typeof WebAssembly.Function)
                        return new WebAssembly.Function(
                          (function (e) {
                            for (
                              t = {
                                i: "i32",
                                j: "i32",
                                f: "f32",
                                d: "f64",
                                p: "i32",
                              },
                                r = {
                                  parameters: [],
                                  results: "v" == e[0] ? [] : [t[e[0]]],
                                },
                                n = 1,
                                undefined;
                              n < e.length;
                              ++n
                            ) {
                              var t;
                              var r;
                              var n;
                              B(e[n] in t, "invalid signature char: " + e[n]);
                              r.parameters.push(t[e[n]]);
                              if ("j" === e[n]) {
                                r.parameters.push("i32");
                              }
                            }
                            return r;
                          })(t),
                          e
                        );
                      var r = [1];
                      !(function (e, t) {
                        var r = e.slice(0, 1);
                        var n = e.slice(1);
                        var i = {
                          i: 127,
                          p: 127,
                          j: 126,
                          f: 125,
                          d: 124,
                        };
                        t.push(96);
                        Ue(n.length, t);
                        for (var o = 0; o < n.length; ++o) {
                          B(n[o] in i, "invalid signature char: " + n[o]);
                          t.push(i[n[o]]);
                        }
                        if ("v" == r) {
                          t.push(0);
                        } else {
                          t.push(1, i[r]);
                        }
                      })(t, r);
                      var n = [0, 97, 115, 109, 1, 0, 0, 0, 1];
                      Ue(r.length, n);
                      n.push.apply(n, r);
                      n.push(
                        2,
                        7,
                        1,
                        1,
                        101,
                        1,
                        102,
                        0,
                        0,
                        7,
                        5,
                        1,
                        1,
                        102,
                        0,
                        0
                      );
                      var i = new WebAssembly.Module(new Uint8Array(n));
                      return new WebAssembly.Instance(i, {
                        e: {
                          f: e,
                        },
                      }).exports.f;
                    })(e, t)
                  );
                }
                qe.set(e, r);
                return r;
              }
              function Ke(e, t, r) {
                var n = {};
                for (var i in e) {
                  var o = e[i];
                  if ("object" == typeof o) {
                    o = o.value;
                  }
                  if ("number" == typeof o) {
                    o += t;
                  }
                  n[i] = o;
                }
                (function (e, t) {
                  for (var r in e)
                    if (!je(r)) {
                      var n = e[r];
                      if (r.startsWith("orig$")) {
                        r = r.split("$")[1];
                        t = true;
                      }
                      if (xe[r]) {
                        xe[r] = new WebAssembly.Global({
                          value: "i32",
                          mutable: true,
                        });
                      }
                      if (t || 0 == xe[r].value) {
                        if ("function" == typeof n) {
                          xe[r].value = ze(n);
                        } else {
                          if ("number" == typeof n) {
                            xe[r].value = n;
                          } else {
                            E(
                              "unhandled export type for `" +
                                r +
                                "`: " +
                                typeof n
                            );
                          }
                        }
                      }
                    }
                })(n, r);
                return n;
              }
              function We(e, t) {
                var r;
                var i;
                if (t) {
                  r = _t["orig$" + e];
                }
                if (r) {
                  if ((r = _t[e]) && r.stub) {
                    r = undefined;
                  }
                }
                if (r) {
                  r = n[Ne(e)];
                }
                if (!r && e.startsWith("invoke_")) {
                  i = e.split("_")[1];
                  r = function () {
                    var e = kt();
                    try {
                      return Be(
                        i,
                        arguments[0],
                        Array.prototype.slice.call(arguments, 1)
                      );
                    } catch (t) {
                      It(e);
                      if (t !== t + 0) throw t;
                      Et(1, 0);
                    }
                  };
                }
                return r;
              }
              function Ge(e, t, r) {
                var n = Pe(e);
                ke = n.weakImports;
                var i = ee;
                function o() {
                  var o;
                  var s;
                  if (r && O((r + 24) >> 0, 1, 0)) {
                    c = O(4 * ((r + 28) >> 2), 4, 1);
                    l = O(4 * ((r + 36) >> 2), 4, 1);
                  } else {
                    var a = Math.pow(2, n.memoryAlign);
                    a = Math.max(a, 16);
                    var c = n.memorySize
                      ? ((o = (function (e) {
                          if (ae)
                            return (function (e, t) {
                              U.fill(0, e, e + t);
                              return e;
                            })(bt(e), e);
                          var t = Fe;
                          var r = (t + e + 15) & -16;
                          B(
                            r <= j.length,
                            "failure to getMemory - memory growth etc. is not supported there, call malloc/sbrk directly or increase INITIAL_MEMORY"
                          );
                          Fe = r;
                          xe.__heap_base.value = r;
                          return t;
                        })(n.memorySize + a)),
                        B((s = a), "alignment argument is required"),
                        Math.ceil(o / s) * s)
                      : 0;
                    var l = n.tableSize ? ee.length : 0;
                    if (r) {
                      R((r + 24) >> 0, 1, 1);
                      R(4 * ((r + 28) >> 2), c, 4);
                      R(4 * ((r + 32) >> 2), n.memorySize, 4);
                      R(4 * ((r + 36) >> 2), l, 4);
                      R(4 * ((r + 40) >> 2), n.tableSize, 4);
                    }
                  }
                  var u;
                  var d = l + n.tableSize - ee.length;
                  function p(e) {
                    var t = We(e, false);
                    if (t) {
                      t = u[e];
                    }
                    B(
                      t,
                      "undefined symbol `" +
                        e +
                        "`. perhaps a side module was not linked in? if this global was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=1 in the environment"
                    );
                    return t;
                  }
                  if (d > 0) {
                    ee.grow(d);
                  }
                  var h = {
                    get: function (e, t) {
                      switch (t) {
                        case "__memory_base":
                          return c;
                        case "__table_base":
                          return l;
                      }
                      return t in _t
                        ? _t[t]
                        : (t in e ||
                            (e[t] = function () {
                              if (r) {
                                r = p(t);
                              }
                              return r.apply(null, arguments);
                            }),
                          e[t]);
                      var r;
                    },
                  };
                  var f = new Proxy({}, h);
                  var g = {
                    "GOT.mem": new Proxy({}, Ie),
                    "GOT.func": new Proxy({}, Ie),
                    env: f,
                    wasi_snapshot_preview1: f,
                  };
                  function m(e) {
                    B(ee === i);
                    $e(l, n.tableSize);
                    u = Ke(e.exports, c);
                    if (t.allowUndefined) {
                      Je();
                    }
                    var r = u.__wasm_apply_data_relocs;
                    if (r) {
                      if (ae) {
                        r();
                      } else {
                        se.push(r);
                      }
                    }
                    var o = u.__wasm_call_ctors;
                    if (o) {
                      if (ae) {
                        o();
                      } else {
                        ne.push(o);
                      }
                    }
                    return u;
                  }
                  if (t.loadAsync) {
                    if (e instanceof WebAssembly.Module) {
                      var y = new WebAssembly.Instance(e, g);
                      return Promise.resolve(m(y));
                    }
                    return WebAssembly.instantiate(e, g).then(function (e) {
                      return m(e.instance);
                    });
                  }
                  var v =
                    e instanceof WebAssembly.Module
                      ? e
                      : new WebAssembly.Module(e);
                  return m((y = new WebAssembly.Instance(v, g)));
                }
                return t.loadAsync
                  ? n.neededDynlibs
                      .reduce(function (e, r) {
                        return e.then(function () {
                          return Qe(r, t);
                        });
                      }, Promise.resolve())
                      .then(function () {
                        return o();
                      })
                  : (n.neededDynlibs.forEach(function (e) {
                      Qe(e, t);
                    }),
                    o());
              }
              function Qe(e, t, r) {
                t = t || {
                  global: true,
                  nodelete: true,
                };
                var n = Le.loadedLibsByName[e];
                if (n) {
                  if (t.global && !n.global) {
                    n.global = true;
                    if ("loading" !== n.module) {
                      Oe(n.module);
                    }
                  }
                  if (t.nodelete && n.refcount !== 1 / 0) {
                    n.refcount = 1 / 0;
                  }
                  n.refcount++;
                  if (r) {
                    Le.loadedLibsByHandle[r] = n;
                  }
                  return !t.loadAsync || Promise.resolve(true);
                }
                function i(e) {
                  if (t.fs && t.fs.findObject(e)) {
                    var r = t.fs.readFile(e, {
                      encoding: "binary",
                    });
                    if (r instanceof Uint8Array) {
                      r = new Uint8Array(r);
                    }
                    return t.loadAsync ? Promise.resolve(r) : r;
                  }
                  if (t.loadAsync)
                    return new Promise(function (t, r) {
                      g(e, (e) => t(new Uint8Array(e)), r);
                    });
                  if (!m)
                    throw new Error(
                      e +
                        ": file not found, and synchronous loading of external files is not available"
                    );
                  return m(e);
                }
                function o() {
                  if ("undefined" != typeof preloadedWasm && preloadedWasm[e]) {
                    var n = preloadedWasm[e];
                    return t.loadAsync ? Promise.resolve(n) : n;
                  }
                  return t.loadAsync
                    ? i(e).then(function (e) {
                        return Ge(e, t, r);
                      })
                    : Ge(i(e), t, r);
                }
                function s(e) {
                  if (n.global) {
                    Oe(e);
                  }
                  n.module = e;
                }
                n = {
                  refcount: t.nodelete ? 1 / 0 : 1,
                  name: e,
                  module: "loading",
                  global: t.global,
                };
                Le.loadedLibsByName[e] = n;
                if (r) {
                  Le.loadedLibsByHandle[r] = n;
                }
                return t.loadAsync
                  ? o().then(function (e) {
                      s(e);
                      return true;
                    })
                  : (s(o()), true);
              }
              function Je() {
                for (var e in xe)
                  if (0 == xe[e].value) {
                    var t = We(e, true);
                    if (!t && !xe[e].required) continue;
                    B(
                      t,
                      "undefined symbol `" +
                        e +
                        "`. perhaps a side module was not linked in? if this global was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=1 in the environment"
                    );
                    if ("function" == typeof t) xe[e].value = ze(t, t.sig);
                    else {
                      if ("number" != typeof t)
                        throw new Error(
                          "bad export type for `" + e + "`: " + typeof t
                        );
                      xe[e].value = t;
                    }
                  }
              }
              function Ye(e, t, r = "i8") {
                switch ((r.endsWith("*") && (r = "*"), r)) {
                  case "i1":
                  case "i8":
                    R(e >> 0, t, 1);
                    break;
                  case "i16":
                    R(2 * (e >> 1), t, 2);
                    break;
                  case "i32":
                  case "*":
                    R(4 * (e >> 2), t, 4);
                    break;
                  case "i64":
                    R(
                      4 * (e >> 2),
                      (_e = [
                        t >>> 0,
                        ((ve = t),
                        +Math.abs(ve) >= 1
                          ? ve > 0
                            ? (0 |
                                Math.min(
                                  +Math.floor(ve / 4294967296),
                                  4294967295
                                )) >>>
                              0
                            : ~~+Math.ceil(
                                (ve - +(~~ve >>> 0)) / 4294967296
                              ) >>> 0
                          : 0),
                      ])[0],
                      4
                    );
                    R(4 * ((e + 4) >> 2), _e[1], 4);
                    break;
                  case "float":
                    N(4 * (e >> 2), t, 4);
                    break;
                  case "double":
                    N(8 * (e >> 3), t, 8);
                    break;
                  default:
                    ge("invalid type for setValue: " + r);
                }
              }
              function Xe(e) {
                if (Xe.shown) {
                  Xe.shown = {};
                }
                if (Xe.shown[e]) {
                  Xe.shown[e] = 1;
                  if (p) {
                    e = "warning: " + e;
                  }
                  E(e);
                }
              }
              var Ze;
              var et = new WebAssembly.Global(
                {
                  value: "i32",
                  mutable: false,
                },
                1024
              );
              var tt = new WebAssembly.Global(
                {
                  value: "i32",
                  mutable: true,
                },
                5255488
              );
              var rt = new WebAssembly.Global(
                {
                  value: "i32",
                  mutable: false,
                },
                1
              );
              function nt() {
                return true;
              }
              function it() {
                ge("native code called abort()");
              }
              function ot() {
                return Date.now();
              }
              function st(e, t, r) {
                U.copyWithin(e, t, t + r);
              }
              function at(e) {
                try {
                  I.grow((e - F.byteLength + 65535) >>> 16);
                  Y(I.buffer);
                  return 1;
                } catch (t) {
                  E(
                    "emscripten_realloc_buffer: Attempted to grow heap from " +
                      F.byteLength +
                      " bytes to " +
                      e +
                      " bytes, but got error: " +
                      t
                  );
                }
              }
              function ct(e) {
                var t = U.length;
                B((e >>>= 0) > t);
                var r;
                var n = 2147483648;
                if (e > n) {
                  E(
                    "Cannot enlarge memory, asked to go up to " +
                      e +
                      " bytes, but the limit is " +
                      n +
                      " bytes!"
                  );
                  return false;
                }
                for (var i = 1; i <= 4; i *= 2) {
                  var o = t * (1 + 0.2 / i);
                  o = Math.min(o, e + 100663296);
                  var s = Math.min(
                    n,
                    (r = Math.max(e, o)) + ((65536 - (r % 65536)) % 65536)
                  );
                  if (at(s)) return true;
                }
                E(
                  "Failed to grow the heap from " +
                    t +
                    " bytes to " +
                    s +
                    " bytes, not enough memory!"
                );
                return false;
              }
              nt.sig = "i";
              n._abort = it;
              it.sig = "v";
              ot.sig = "d";
              (Ze = p
                ? () => {
                    var e = process.hrtime();
                    return 1e3 * e[0] + e[1] / 1e6;
                  }
                : () => performance.now()).sig = "d";
              st.sig = "vppp";
              ct.sig = "ip";
              var lt = {
                DEFAULT_POLLMASK: 5,
                calculateAt: function (e, t, r) {
                  if (PATH.isAbs(t)) return t;
                  var n;
                  n = -100 === e ? be.cwd() : lt.getStreamFromFD(e).path;
                  if (0 == t.length) {
                    if (!r) throw new be.ErrnoError(44);
                    return n;
                  }
                  return PATH.join2(n, t);
                },
                doStat: function (e, t, r) {
                  try {
                    var n = e(t);
                  } catch (e) {
                    if (
                      e &&
                      e.node &&
                      PATH.normalize(t) !== PATH.normalize(be.getPath(e.node))
                    )
                      return -54;
                    throw e;
                  }
                  R(4 * (r >> 2), n.dev, 4);
                  R(4 * ((r + 8) >> 2), n.ino, 4);
                  R(4 * ((r + 12) >> 2), n.mode, 4);
                  R(4 * ((r + 16) >> 2), n.nlink, 4);
                  R(4 * ((r + 20) >> 2), n.uid, 4);
                  R(4 * ((r + 24) >> 2), n.gid, 4);
                  R(4 * ((r + 28) >> 2), n.rdev, 4);
                  R(
                    4 * ((r + 40) >> 2),
                    (_e = [
                      n.size >>> 0,
                      ((ve = n.size),
                      +Math.abs(ve) >= 1
                        ? ve > 0
                          ? (0 |
                              Math.min(
                                +Math.floor(ve / 4294967296),
                                4294967295
                              )) >>>
                            0
                          : ~~+Math.ceil((ve - +(~~ve >>> 0)) / 4294967296) >>>
                            0
                        : 0),
                    ])[0],
                    4
                  );
                  R(4 * ((r + 44) >> 2), _e[1], 4);
                  R(4 * ((r + 48) >> 2), 4096, 4);
                  R(4 * ((r + 52) >> 2), n.blocks, 4);
                  R(
                    4 * ((r + 56) >> 2),
                    (_e = [
                      Math.floor(n.atime.getTime() / 1e3) >>> 0,
                      ((ve = Math.floor(n.atime.getTime() / 1e3)),
                      +Math.abs(ve) >= 1
                        ? ve > 0
                          ? (0 |
                              Math.min(
                                +Math.floor(ve / 4294967296),
                                4294967295
                              )) >>>
                            0
                          : ~~+Math.ceil((ve - +(~~ve >>> 0)) / 4294967296) >>>
                            0
                        : 0),
                    ])[0],
                    4
                  );
                  R(4 * ((r + 60) >> 2), _e[1], 4);
                  R(4 * ((r + 64) >> 2), 0, 4);
                  R(
                    4 * ((r + 72) >> 2),
                    (_e = [
                      Math.floor(n.mtime.getTime() / 1e3) >>> 0,
                      ((ve = Math.floor(n.mtime.getTime() / 1e3)),
                      +Math.abs(ve) >= 1
                        ? ve > 0
                          ? (0 |
                              Math.min(
                                +Math.floor(ve / 4294967296),
                                4294967295
                              )) >>>
                            0
                          : ~~+Math.ceil((ve - +(~~ve >>> 0)) / 4294967296) >>>
                            0
                        : 0),
                    ])[0],
                    4
                  );
                  R(4 * ((r + 76) >> 2), _e[1], 4);
                  R(4 * ((r + 80) >> 2), 0, 4);
                  R(
                    4 * ((r + 88) >> 2),
                    (_e = [
                      Math.floor(n.ctime.getTime() / 1e3) >>> 0,
                      ((ve = Math.floor(n.ctime.getTime() / 1e3)),
                      +Math.abs(ve) >= 1
                        ? ve > 0
                          ? (0 |
                              Math.min(
                                +Math.floor(ve / 4294967296),
                                4294967295
                              )) >>>
                            0
                          : ~~+Math.ceil((ve - +(~~ve >>> 0)) / 4294967296) >>>
                            0
                        : 0),
                    ])[0],
                    4
                  );
                  R(4 * ((r + 92) >> 2), _e[1], 4);
                  R(4 * ((r + 96) >> 2), 0, 4);
                  R(
                    4 * ((r + 104) >> 2),
                    (_e = [
                      n.ino >>> 0,
                      ((ve = n.ino),
                      +Math.abs(ve) >= 1
                        ? ve > 0
                          ? (0 |
                              Math.min(
                                +Math.floor(ve / 4294967296),
                                4294967295
                              )) >>>
                            0
                          : ~~+Math.ceil((ve - +(~~ve >>> 0)) / 4294967296) >>>
                            0
                        : 0),
                    ])[0],
                    4
                  );
                  R(4 * ((r + 108) >> 2), _e[1], 4);
                  return 0;
                },
                doMsync: function (e, t, r, n, i) {
                  if (!be.isFile(t.node.mode)) throw new be.ErrnoError(43);
                  if (2 & n) return 0;
                  var o = U.slice(e, e + r);
                  be.msync(t, o, i, r, n);
                },
                varargs: undefined,
                get: function () {
                  B(null != lt.varargs);
                  lt.varargs += 4;
                  return O(4 * ((lt.varargs - 4) >> 2), 4, 0);
                },
                getStr: function (e) {
                  return W(e);
                },
                getStreamFromFD: function (e) {
                  var t = be.getStream(e);
                  if (!t) throw new be.ErrnoError(8);
                  return t;
                },
              };
              function ut(e) {
                D = e;
                if (ce()) {
                  if (n.onExit) {
                    n.onExit(e);
                  }
                  M = true;
                }
                l(e, new Se(e));
              }
              function dt(e, t) {
                D = e;
                (function () {
                  var e = C;
                  var t = E;
                  var r = false;
                  C = E = (e) => {
                    r = true;
                  };
                  try {
                    wt(0);
                  } catch (e) {}
                  C = e;
                  E = t;
                  if (r) {
                    Xe(
                      "stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc."
                    );
                    Xe(
                      "(this may also be due to not including full filesystem support - try building with -sFORCE_FILESYSTEM)"
                    );
                  }
                })();
                if (ce() && !t) {
                  E(
                    "program exited (with status: " +
                      e +
                      "), but EXIT_RUNTIME is not set, so halting execution but not exiting the runtime or preventing further async execution (build with EXIT_RUNTIME=1, if you want a true shutdown)"
                  );
                }
                ut(e);
              }
              ut.sig = "vi";
              var pt = dt;
              function ht(e) {
                try {
                  var t = lt.getStreamFromFD(e);
                  be.close(t);
                  return 0;
                } catch (e) {
                  if (undefined === be || !(e instanceof be.ErrnoError))
                    throw e;
                  return e.errno;
                }
              }
              function ft(e, t, r, n, i) {
                try {
                  var o =
                    ((c = r),
                    B((a = t) == a >>> 0 || a == (0 | a)),
                    B(c === (0 | c)),
                    (c + 2097152) >>> 0 < 4194305 - !!a
                      ? (a >>> 0) + 4294967296 * c
                      : NaN);
                  if (isNaN(o)) return 61;
                  var s = lt.getStreamFromFD(e);
                  be.llseek(s, o, n);
                  R(
                    4 * (i >> 2),
                    (_e = [
                      s.position >>> 0,
                      ((ve = s.position),
                      +Math.abs(ve) >= 1
                        ? ve > 0
                          ? (0 |
                              Math.min(
                                +Math.floor(ve / 4294967296),
                                4294967295
                              )) >>>
                            0
                          : ~~+Math.ceil((ve - +(~~ve >>> 0)) / 4294967296) >>>
                            0
                        : 0),
                    ])[0],
                    4
                  );
                  R(4 * ((i + 4) >> 2), _e[1], 4);
                  if (s.getdents && 0 === o && 0 === n) {
                    s.getdents = null;
                  }
                  return 0;
                } catch (e) {
                  if (undefined === be || !(e instanceof be.ErrnoError))
                    throw e;
                  return e.errno;
                }
                var a;
                var c;
              }
              function gt(e, t, r, n) {
                try {
                  var i = (function (e, t, r, n) {
                    for (i = 0, o = 0, undefined; o < r; o++) {
                      var i;
                      var o;
                      var s = O(4 * (t >> 2), 4, 1);
                      var a = O(4 * ((t + 4) >> 2), 4, 1);
                      t += 8;
                      var c = be.write(e, j, s, a, undefined);
                      if (c < 0) return -1;
                      i += c;
                    }
                    return i;
                  })(lt.getStreamFromFD(e), t, r);
                  R(4 * (n >> 2), i, 4);
                  return 0;
                } catch (e) {
                  if (undefined === be || !(e instanceof be.ErrnoError))
                    throw e;
                  return e.errno;
                }
              }
              function mt(e, t, r) {
                B(
                  t % 2 == 0,
                  "Pointer passed to stringToUTF16 must be aligned to two bytes!"
                );
                B(
                  "number" == typeof r,
                  "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"
                );
                if (undefined === r) {
                  r = 2147483647;
                }
                if (r < 2) return 0;
                for (
                  n = t,
                    i = (r -= 2) < 2 * e.length ? r / 2 : e.length,
                    o = 0,
                    undefined;
                  o < i;
                  ++o
                ) {
                  var n;
                  var i;
                  var o;
                  R(2 * (t >> 1), e.charCodeAt(o), 2);
                  t += 2;
                }
                R(2 * (t >> 1), 0, 2);
                return t - n;
              }
              function yt(e) {
                for (var t = ""; ; ) {
                  var r = O(e++ >> 0, 1, 1);
                  if (!r) return t;
                  t += String.fromCharCode(r);
                }
              }
              pt.sig = "vi";
              ht.sig = "ii";
              ft.sig = "iijip";
              gt.sig = "iippp";
              var vt;
              var _t = {
                __heap_base: Fe,
                __indirect_function_table: ee,
                __memory_base: et,
                __stack_high: 5255488,
                __stack_low: 12608,
                __stack_pointer: tt,
                __table_base: rt,
                _emscripten_get_now_is_monotonic: nt,
                abort: it,
                alignfault: function () {
                  ge("alignment fault");
                },
                emscripten_date_now: ot,
                emscripten_get_now: Ze,
                emscripten_memcpy_big: st,
                emscripten_resize_heap: ct,
                exit: pt,
                fd_close: ht,
                fd_seek: ft,
                fd_write: gt,
                memory: I,
                segfault: function () {
                  ge("segmentation fault");
                },
                tree_sitter_log_callback: function (e, t) {
                  if (Ht) {
                    const r = W(t);
                    Ht(r, 0 !== e);
                  }
                },
                tree_sitter_parse_callback: function (e, t, r, n, i) {
                  var o = qt(t, {
                    row: r,
                    column: n,
                  });
                  if ("string" == typeof o) {
                    Ye(i, o.length, "i32");
                    mt(o, e, 10240);
                  } else {
                    Ye(i, 0, "i32");
                  }
                },
              };
              var bt =
                ((function () {
                  var e = {
                    env: _t,
                    wasi_snapshot_preview1: _t,
                    "GOT.mem": new Proxy(_t, Ie),
                    "GOT.func": new Proxy(_t, Ie),
                  };
                  function t(e, t) {
                    var r = e.exports;
                    r = Ke(r, 1024);
                    var i;
                    var o = Pe(t);
                    if (o.neededDynlibs) {
                      k = o.neededDynlibs.concat(k);
                    }
                    Oe(r);
                    n.asm = r;
                    i = n.asm.__wasm_call_ctors;
                    ne.unshift(i);
                    se.push(n.asm.__wasm_apply_data_relocs);
                    fe("wasm-instantiate");
                  }
                  he("wasm-instantiate");
                  var r = n;
                  function i(e) {
                    B(
                      n === r,
                      "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"
                    );
                    r = null;
                    t(e.instance, e.module);
                  }
                  function o(t) {
                    return (function () {
                      if (!x && (u || d)) {
                        if ("function" == typeof fetch && !Ce(me))
                          return fetch(me, {
                            credentials: "same-origin",
                          })
                            .then(function (e) {
                              if (!e.ok)
                                throw (
                                  "failed to load wasm binary file at '" +
                                  me +
                                  "'"
                                );
                              return e.arrayBuffer();
                            })
                            .catch(function () {
                              return Te(me);
                            });
                        if (g)
                          return new Promise(function (e, t) {
                            g(
                              me,
                              function (t) {
                                e(new Uint8Array(t));
                              },
                              t
                            );
                          });
                      }
                      return Promise.resolve().then(function () {
                        return Te(me);
                      });
                    })()
                      .then(function (t) {
                        return WebAssembly.instantiate(t, e);
                      })
                      .then(function (e) {
                        return e;
                      })
                      .then(t, function (e) {
                        E("failed to asynchronously prepare wasm: " + e);
                        if (Ce(me)) {
                          E(
                            "warning: Loading from a file URI (" +
                              me +
                              ") is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing"
                          );
                        }
                        ge(e);
                      });
                  }
                  if (n.instantiateWasm)
                    try {
                      return n.instantiateWasm(e, t);
                    } catch (e) {
                      E(
                        "Module.instantiateWasm callback failed with error: " +
                          e
                      );
                      return false;
                    }
                  if (
                    x ||
                    "function" != typeof WebAssembly.instantiateStreaming ||
                    we(me) ||
                    Ce(me) ||
                    p ||
                    "function" != typeof fetch
                  ) {
                    o(i);
                  } else {
                    fetch(me, {
                      credentials: "same-origin",
                    }).then(function (t) {
                      return WebAssembly.instantiateStreaming(t, e).then(
                        i,
                        function (e) {
                          E("wasm streaming compile failed: " + e);
                          E("falling back to ArrayBuffer instantiation");
                          return o(i);
                        }
                      );
                    });
                  }
                })(),
                (n.___wasm_call_ctors = Ee("__wasm_call_ctors")),
                (n.___wasm_apply_data_relocs = Ee("__wasm_apply_data_relocs")),
                (n._malloc = Ee("malloc")));
              var wt =
                ((n._calloc = Ee("calloc")),
                (n._realloc = Ee("realloc")),
                (n._free = Ee("free")),
                (n._ts_language_symbol_count = Ee("ts_language_symbol_count")),
                (n._ts_language_version = Ee("ts_language_version")),
                (n._ts_language_field_count = Ee("ts_language_field_count")),
                (n._ts_language_symbol_name = Ee("ts_language_symbol_name")),
                (n._ts_language_symbol_for_name = Ee(
                  "ts_language_symbol_for_name"
                )),
                (n._ts_language_symbol_type = Ee("ts_language_symbol_type")),
                (n._ts_language_field_name_for_id = Ee(
                  "ts_language_field_name_for_id"
                )),
                (n._memset = Ee("memset")),
                (n._memcpy = Ee("memcpy")),
                (n._ts_parser_delete = Ee("ts_parser_delete")),
                (n._ts_parser_set_language = Ee("ts_parser_set_language")),
                (n._ts_parser_reset = Ee("ts_parser_reset")),
                (n._ts_parser_timeout_micros = Ee("ts_parser_timeout_micros")),
                (n._ts_parser_set_timeout_micros = Ee(
                  "ts_parser_set_timeout_micros"
                )),
                (n._ts_query_new = Ee("ts_query_new")),
                (n._ts_query_delete = Ee("ts_query_delete")),
                (n._iswspace = Ee("iswspace")),
                (n._ts_query_pattern_count = Ee("ts_query_pattern_count")),
                (n._ts_query_capture_count = Ee("ts_query_capture_count")),
                (n._ts_query_string_count = Ee("ts_query_string_count")),
                (n._ts_query_capture_name_for_id = Ee(
                  "ts_query_capture_name_for_id"
                )),
                (n._ts_query_string_value_for_id = Ee(
                  "ts_query_string_value_for_id"
                )),
                (n._ts_query_predicates_for_pattern = Ee(
                  "ts_query_predicates_for_pattern"
                )),
                (n._memmove = Ee("memmove")),
                (n._memcmp = Ee("memcmp")),
                (n._ts_tree_copy = Ee("ts_tree_copy")),
                (n._ts_tree_delete = Ee("ts_tree_delete")),
                (n._iswalnum = Ee("iswalnum")),
                (n._ts_init = Ee("ts_init")),
                (n._ts_parser_new_wasm = Ee("ts_parser_new_wasm")),
                (n._ts_parser_enable_logger_wasm = Ee(
                  "ts_parser_enable_logger_wasm"
                )),
                (n._ts_parser_parse_wasm = Ee("ts_parser_parse_wasm")),
                (n._ts_language_type_is_named_wasm = Ee(
                  "ts_language_type_is_named_wasm"
                )),
                (n._ts_language_type_is_visible_wasm = Ee(
                  "ts_language_type_is_visible_wasm"
                )),
                (n._ts_tree_root_node_wasm = Ee("ts_tree_root_node_wasm")),
                (n._ts_tree_edit_wasm = Ee("ts_tree_edit_wasm")),
                (n._ts_tree_get_changed_ranges_wasm = Ee(
                  "ts_tree_get_changed_ranges_wasm"
                )),
                (n._ts_tree_cursor_new_wasm = Ee("ts_tree_cursor_new_wasm")),
                (n._ts_tree_cursor_delete_wasm = Ee(
                  "ts_tree_cursor_delete_wasm"
                )),
                (n._ts_tree_cursor_reset_wasm = Ee(
                  "ts_tree_cursor_reset_wasm"
                )),
                (n._ts_tree_cursor_goto_first_child_wasm = Ee(
                  "ts_tree_cursor_goto_first_child_wasm"
                )),
                (n._ts_tree_cursor_goto_next_sibling_wasm = Ee(
                  "ts_tree_cursor_goto_next_sibling_wasm"
                )),
                (n._ts_tree_cursor_goto_parent_wasm = Ee(
                  "ts_tree_cursor_goto_parent_wasm"
                )),
                (n._ts_tree_cursor_current_node_type_id_wasm = Ee(
                  "ts_tree_cursor_current_node_type_id_wasm"
                )),
                (n._ts_tree_cursor_current_node_is_named_wasm = Ee(
                  "ts_tree_cursor_current_node_is_named_wasm"
                )),
                (n._ts_tree_cursor_current_node_is_missing_wasm = Ee(
                  "ts_tree_cursor_current_node_is_missing_wasm"
                )),
                (n._ts_tree_cursor_current_node_id_wasm = Ee(
                  "ts_tree_cursor_current_node_id_wasm"
                )),
                (n._ts_tree_cursor_start_position_wasm = Ee(
                  "ts_tree_cursor_start_position_wasm"
                )),
                (n._ts_tree_cursor_end_position_wasm = Ee(
                  "ts_tree_cursor_end_position_wasm"
                )),
                (n._ts_tree_cursor_start_index_wasm = Ee(
                  "ts_tree_cursor_start_index_wasm"
                )),
                (n._ts_tree_cursor_end_index_wasm = Ee(
                  "ts_tree_cursor_end_index_wasm"
                )),
                (n._ts_tree_cursor_current_field_id_wasm = Ee(
                  "ts_tree_cursor_current_field_id_wasm"
                )),
                (n._ts_tree_cursor_current_node_wasm = Ee(
                  "ts_tree_cursor_current_node_wasm"
                )),
                (n._ts_node_symbol_wasm = Ee("ts_node_symbol_wasm")),
                (n._ts_node_child_count_wasm = Ee("ts_node_child_count_wasm")),
                (n._ts_node_named_child_count_wasm = Ee(
                  "ts_node_named_child_count_wasm"
                )),
                (n._ts_node_child_wasm = Ee("ts_node_child_wasm")),
                (n._ts_node_named_child_wasm = Ee("ts_node_named_child_wasm")),
                (n._ts_node_child_by_field_id_wasm = Ee(
                  "ts_node_child_by_field_id_wasm"
                )),
                (n._ts_node_next_sibling_wasm = Ee(
                  "ts_node_next_sibling_wasm"
                )),
                (n._ts_node_prev_sibling_wasm = Ee(
                  "ts_node_prev_sibling_wasm"
                )),
                (n._ts_node_next_named_sibling_wasm = Ee(
                  "ts_node_next_named_sibling_wasm"
                )),
                (n._ts_node_prev_named_sibling_wasm = Ee(
                  "ts_node_prev_named_sibling_wasm"
                )),
                (n._ts_node_parent_wasm = Ee("ts_node_parent_wasm")),
                (n._ts_node_descendant_for_index_wasm = Ee(
                  "ts_node_descendant_for_index_wasm"
                )),
                (n._ts_node_named_descendant_for_index_wasm = Ee(
                  "ts_node_named_descendant_for_index_wasm"
                )),
                (n._ts_node_descendant_for_position_wasm = Ee(
                  "ts_node_descendant_for_position_wasm"
                )),
                (n._ts_node_named_descendant_for_position_wasm = Ee(
                  "ts_node_named_descendant_for_position_wasm"
                )),
                (n._ts_node_start_point_wasm = Ee("ts_node_start_point_wasm")),
                (n._ts_node_end_point_wasm = Ee("ts_node_end_point_wasm")),
                (n._ts_node_start_index_wasm = Ee("ts_node_start_index_wasm")),
                (n._ts_node_end_index_wasm = Ee("ts_node_end_index_wasm")),
                (n._ts_node_to_string_wasm = Ee("ts_node_to_string_wasm")),
                (n._ts_node_children_wasm = Ee("ts_node_children_wasm")),
                (n._ts_node_named_children_wasm = Ee(
                  "ts_node_named_children_wasm"
                )),
                (n._ts_node_descendants_of_type_wasm = Ee(
                  "ts_node_descendants_of_type_wasm"
                )),
                (n._ts_node_is_named_wasm = Ee("ts_node_is_named_wasm")),
                (n._ts_node_has_changes_wasm = Ee("ts_node_has_changes_wasm")),
                (n._ts_node_has_error_wasm = Ee("ts_node_has_error_wasm")),
                (n._ts_node_is_missing_wasm = Ee("ts_node_is_missing_wasm")),
                (n._ts_query_matches_wasm = Ee("ts_query_matches_wasm")),
                (n._ts_query_captures_wasm = Ee("ts_query_captures_wasm")),
                (n.___cxa_atexit = Ee("__cxa_atexit")),
                (n.___errno_location = Ee("__errno_location")),
                (n._fflush = Ee("fflush")));
              var Ct =
                ((n._strlen = Ee("strlen")),
                (n._iswdigit = Ee("iswdigit")),
                (n._iswalpha = Ee("iswalpha")),
                (n._iswlower = Ee("iswlower")),
                (n._memchr = Ee("memchr")),
                (n._towupper = Ee("towupper")),
                (n._sbrk = Ee("sbrk")));
              var Et =
                ((n._emscripten_get_sbrk_ptr = Ee("emscripten_get_sbrk_ptr")),
                (n._setThrew = Ee("setThrew")));
              var Tt = (n._emscripten_stack_set_limits = function () {
                return (Tt = n._emscripten_stack_set_limits =
                  n.asm.emscripten_stack_set_limits).apply(null, arguments);
              });
              var St =
                ((n._emscripten_stack_get_free = function () {
                  return (n._emscripten_stack_get_free =
                    n.asm.emscripten_stack_get_free).apply(null, arguments);
                }),
                (n._emscripten_stack_get_base = function () {
                  return (St = n._emscripten_stack_get_base =
                    n.asm.emscripten_stack_get_base).apply(null, arguments);
                }));
              var xt = (n._emscripten_stack_get_end = function () {
                return (xt = n._emscripten_stack_get_end =
                  n.asm.emscripten_stack_get_end).apply(null, arguments);
              });
              var kt = (n.stackSave = Ee("stackSave"));
              var It = (n.stackRestore = Ee("stackRestore"));
              var At = (n.stackAlloc = Ee("stackAlloc"));
              n.__Znwm = Ee("_Znwm");
              n.__ZdlPv = Ee("_ZdlPv");
              n.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev =
                Ee(
                  "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev"
                );
              n.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm =
                Ee(
                  "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm"
                );
              n.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm =
                Ee(
                  "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm"
                );
              n.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm =
                Ee(
                  "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm"
                );
              n.__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm =
                Ee(
                  "_ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm"
                );
              n.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc =
                Ee(
                  "_ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc"
                );
              n.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev =
                Ee(
                  "_ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev"
                );
              n.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw =
                Ee(
                  "_ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw"
                );
              n.dynCall_jiji = Ee("dynCall_jiji");
              n._orig$ts_parser_timeout_micros = Ee(
                "orig$ts_parser_timeout_micros"
              );
              n._orig$ts_parser_set_timeout_micros = Ee(
                "orig$ts_parser_set_timeout_micros"
              );
              n.AsciiToString = yt;
              n.stringToUTF16 = mt;
              [
                "run",
                "UTF8ArrayToString",
                "UTF8ToString",
                "stringToUTF8Array",
                "stringToUTF8",
                "lengthBytesUTF8",
                "addOnPreRun",
                "addOnInit",
                "addOnPreMain",
                "addOnExit",
                "addOnPostRun",
                "addRunDependency",
                "removeRunDependency",
                "FS_createFolder",
                "FS_createPath",
                "FS_createDataFile",
                "FS_createPreloadedFile",
                "FS_createLazyFile",
                "FS_createLink",
                "FS_createDevice",
                "FS_unlink",
                "getLEB",
                "getFunctionTables",
                "alignFunctionTables",
                "registerFunctions",
                "prettyPrint",
                "getCompilerSetting",
                "out",
                "err",
                "callMain",
                "abort",
                "keepRuntimeAlive",
                "wasmMemory",
                "stackAlloc",
                "stackSave",
                "stackRestore",
                "getTempRet0",
                "setTempRet0",
                "writeStackCookie",
                "checkStackCookie",
                "ptrToString",
                "zeroMemory",
                "stringToNewUTF8",
                "exitJS",
                "getHeapMax",
                "emscripten_realloc_buffer",
                "ENV",
                "ERRNO_CODES",
                "ERRNO_MESSAGES",
                "setErrNo",
                "inetPton4",
                "inetNtop4",
                "inetPton6",
                "inetNtop6",
                "readSockaddr",
                "writeSockaddr",
                "DNS",
                "getHostByName",
                "Protocols",
                "Sockets",
                "getRandomDevice",
                "warnOnce",
                "traverseStack",
                "UNWIND_CACHE",
                "convertPCtoSourceLocation",
                "readAsmConstArgsArray",
                "readAsmConstArgs",
                "mainThreadEM_ASM",
                "jstoi_q",
                "jstoi_s",
                "getExecutableName",
                "listenOnce",
                "autoResumeAudioContext",
                "dynCallLegacy",
                "getDynCaller",
                "dynCall",
                "handleException",
                "runtimeKeepalivePush",
                "runtimeKeepalivePop",
                "callUserCallback",
                "maybeExit",
                "safeSetTimeout",
                "asmjsMangle",
                "asyncLoad",
                "alignMemory",
                "mmapAlloc",
                "writeI53ToI64",
                "writeI53ToI64Clamped",
                "writeI53ToI64Signaling",
                "writeI53ToU64Clamped",
                "writeI53ToU64Signaling",
                "readI53FromI64",
                "readI53FromU64",
                "convertI32PairToI53",
                "convertI32PairToI53Checked",
                "convertU32PairToI53",
                "getCFunc",
                "ccall",
                "cwrap",
                "uleb128Encode",
                "sigToWasmTypes",
                "generateFuncType",
                "convertJsFunctionToWasm",
                "freeTableIndexes",
                "functionsInTableMap",
                "getEmptyTableSlot",
                "updateTableMap",
                "addFunction",
                "removeFunction",
                "reallyNegative",
                "unSign",
                "strLen",
                "reSign",
                "formatString",
                "setValue",
                "getValue",
                "PATH",
                "PATH_FS",
                "intArrayFromString",
                "intArrayToString",
                "stringToAscii",
                "UTF16Decoder",
                "UTF16ToString",
                "lengthBytesUTF16",
                "UTF32ToString",
                "stringToUTF32",
                "lengthBytesUTF32",
                "allocateUTF8",
                "allocateUTF8OnStack",
                "writeStringToMemory",
                "writeArrayToMemory",
                "writeAsciiToMemory",
                "SYSCALLS",
                "getSocketFromFD",
                "getSocketAddress",
                "JSEvents",
                "registerKeyEventCallback",
                "specialHTMLTargets",
                "maybeCStringToJsString",
                "findEventTarget",
                "findCanvasEventTarget",
                "getBoundingClientRect",
                "fillMouseEventData",
                "registerMouseEventCallback",
                "registerWheelEventCallback",
                "registerUiEventCallback",
                "registerFocusEventCallback",
                "fillDeviceOrientationEventData",
                "registerDeviceOrientationEventCallback",
                "fillDeviceMotionEventData",
                "registerDeviceMotionEventCallback",
                "screenOrientation",
                "fillOrientationChangeEventData",
                "registerOrientationChangeEventCallback",
                "fillFullscreenChangeEventData",
                "registerFullscreenChangeEventCallback",
                "JSEvents_requestFullscreen",
                "JSEvents_resizeCanvasForFullscreen",
                "registerRestoreOldStyle",
                "hideEverythingExceptGivenElement",
                "restoreHiddenElements",
                "setLetterbox",
                "currentFullscreenStrategy",
                "restoreOldWindowedStyle",
                "softFullscreenResizeWebGLRenderTarget",
                "doRequestFullscreen",
                "fillPointerlockChangeEventData",
                "registerPointerlockChangeEventCallback",
                "registerPointerlockErrorEventCallback",
                "requestPointerLock",
                "fillVisibilityChangeEventData",
                "registerVisibilityChangeEventCallback",
                "registerTouchEventCallback",
                "fillGamepadEventData",
                "registerGamepadEventCallback",
                "registerBeforeUnloadEventCallback",
                "fillBatteryEventData",
                "battery",
                "registerBatteryEventCallback",
                "setCanvasElementSize",
                "getCanvasElementSize",
                "demangle",
                "demangleAll",
                "jsStackTrace",
                "stackTrace",
                "ExitStatus",
                "getEnvStrings",
                "checkWasiClock",
                "doReadv",
                "doWritev",
                "GOT",
                "CurrentModuleWeakSymbols",
                "LDSO",
                "getMemory",
                "mergeLibSymbols",
                "loadWebAssemblyModule",
                "loadDynamicLibrary",
                "dlopenInternal",
                "createDyncallWrapper",
                "setImmediateWrapped",
                "clearImmediateWrapped",
                "polyfillSetImmediate",
                "Browser",
                "setMainLoop",
                "wget",
                "tempFixedLengthArray",
                "miniTempWebGLFloatBuffers",
                "heapObjectForWebGLType",
                "heapAccessShiftForWebGLHeap",
                "GL",
                "emscriptenWebGLGet",
                "computeUnpackAlignedImageSize",
                "emscriptenWebGLGetTexPixelData",
                "emscriptenWebGLGetUniform",
                "webglGetUniformLocation",
                "webglPrepareUniformLocationsBeforeFirstUse",
                "webglGetLeftBracePos",
                "emscriptenWebGLGetVertexAttrib",
                "writeGLArray",
                "AL",
                "SDL_unicode",
                "SDL_ttfContext",
                "SDL_audio",
                "SDL",
                "SDL_gfx",
                "GLUT",
                "EGL",
                "GLFW_Window",
                "GLFW",
                "GLEW",
                "IDBStore",
                "runAndAbortIfError",
                "ALLOC_NORMAL",
                "ALLOC_STACK",
                "allocate",
              ].forEach(function (e) {
                if (Object.getOwnPropertyDescriptor(n, e)) {
                  Object.defineProperty(n, e, {
                    configurable: true,
                    get: function () {
                      var t =
                        "'" +
                        e +
                        "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)";
                      if (S(e)) {
                        t +=
                          ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
                      }
                      ge(t);
                    },
                  });
                }
              });
              [
                "ptrToString",
                "stringToNewUTF8",
                "setErrNo",
                "inetPton4",
                "inetNtop4",
                "inetPton6",
                "inetNtop6",
                "readSockaddr",
                "writeSockaddr",
                "getHostByName",
                "getRandomDevice",
                "traverseStack",
                "convertPCtoSourceLocation",
                "readAsmConstArgs",
                "mainThreadEM_ASM",
                "jstoi_q",
                "jstoi_s",
                "getExecutableName",
                "listenOnce",
                "autoResumeAudioContext",
                "getDynCaller",
                "runtimeKeepalivePush",
                "runtimeKeepalivePop",
                "callUserCallback",
                "maybeExit",
                "safeSetTimeout",
                "asyncLoad",
                "mmapAlloc",
                "writeI53ToI64",
                "writeI53ToI64Clamped",
                "writeI53ToI64Signaling",
                "writeI53ToU64Clamped",
                "writeI53ToU64Signaling",
                "readI53FromI64",
                "readI53FromU64",
                "convertI32PairToI53",
                "convertU32PairToI53",
                "getCFunc",
                "ccall",
                "cwrap",
                "removeFunction",
                "reallyNegative",
                "strLen",
                "reSign",
                "formatString",
                "intArrayFromString",
                "intArrayToString",
                "stringToAscii",
                "UTF16ToString",
                "lengthBytesUTF16",
                "UTF32ToString",
                "stringToUTF32",
                "lengthBytesUTF32",
                "allocateUTF8",
                "writeStringToMemory",
                "writeArrayToMemory",
                "writeAsciiToMemory",
                "getSocketFromFD",
                "getSocketAddress",
                "registerKeyEventCallback",
                "maybeCStringToJsString",
                "findEventTarget",
                "findCanvasEventTarget",
                "getBoundingClientRect",
                "fillMouseEventData",
                "registerMouseEventCallback",
                "registerWheelEventCallback",
                "registerUiEventCallback",
                "registerFocusEventCallback",
                "fillDeviceOrientationEventData",
                "registerDeviceOrientationEventCallback",
                "fillDeviceMotionEventData",
                "registerDeviceMotionEventCallback",
                "screenOrientation",
                "fillOrientationChangeEventData",
                "registerOrientationChangeEventCallback",
                "fillFullscreenChangeEventData",
                "registerFullscreenChangeEventCallback",
                "JSEvents_requestFullscreen",
                "JSEvents_resizeCanvasForFullscreen",
                "registerRestoreOldStyle",
                "hideEverythingExceptGivenElement",
                "restoreHiddenElements",
                "setLetterbox",
                "softFullscreenResizeWebGLRenderTarget",
                "doRequestFullscreen",
                "fillPointerlockChangeEventData",
                "registerPointerlockChangeEventCallback",
                "registerPointerlockErrorEventCallback",
                "requestPointerLock",
                "fillVisibilityChangeEventData",
                "registerVisibilityChangeEventCallback",
                "registerTouchEventCallback",
                "fillGamepadEventData",
                "registerGamepadEventCallback",
                "registerBeforeUnloadEventCallback",
                "fillBatteryEventData",
                "battery",
                "registerBatteryEventCallback",
                "setCanvasElementSize",
                "getCanvasElementSize",
                "demangle",
                "demangleAll",
                "jsStackTrace",
                "stackTrace",
                "getEnvStrings",
                "checkWasiClock",
                "doReadv",
                "dlopenInternal",
                "createDyncallWrapper",
                "setImmediateWrapped",
                "clearImmediateWrapped",
                "polyfillSetImmediate",
                "setMainLoop",
                "heapObjectForWebGLType",
                "heapAccessShiftForWebGLHeap",
                "emscriptenWebGLGet",
                "computeUnpackAlignedImageSize",
                "emscriptenWebGLGetTexPixelData",
                "emscriptenWebGLGetUniform",
                "webglGetUniformLocation",
                "webglPrepareUniformLocationsBeforeFirstUse",
                "webglGetLeftBracePos",
                "emscriptenWebGLGetVertexAttrib",
                "writeGLArray",
                "SDL_unicode",
                "SDL_ttfContext",
                "SDL_audio",
                "GLFW_Window",
                "runAndAbortIfError",
                "ALLOC_NORMAL",
                "ALLOC_STACK",
                "allocate",
              ].forEach(function (e) {
                if (
                  "undefined" == typeof globalThis ||
                  Object.getOwnPropertyDescriptor(globalThis, e)
                ) {
                  Object.defineProperty(globalThis, e, {
                    configurable: true,
                    get: function () {
                      var t =
                        "`" +
                        e +
                        "` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line";
                      var r = e;
                      if (r.startsWith("_")) {
                        r = "$" + e;
                      }
                      t +=
                        " (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE=" + r + ")";
                      if (S(e)) {
                        t +=
                          ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
                      }
                      Xe(t);
                    },
                  });
                }
              });
              de = function e() {
                if (vt) {
                  Rt();
                }
                if (vt) {
                  de = e;
                }
              };
              var Pt = false;
              function Rt(e) {
                function t() {
                  if (vt) {
                    vt = true;
                    n.calledRun = true;
                    if (M) {
                      B(!ae);
                      ae = true;
                      te();
                      Ae(se);
                      Ae(ne);
                      te();
                      Ae(ie);
                      if (n.onRuntimeInitialized) {
                        n.onRuntimeInitialized();
                      }
                      if (Nt) {
                        (function (e) {
                          B(
                            0 == le,
                            'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])'
                          );
                          B(
                            0 == re.length,
                            "cannot call main when preRun functions remain to be called"
                          );
                          var t = n._main;
                          if (t) {
                            (e = e || []).unshift(c);
                            var r = e.length;
                            var i = At(4 * (r + 1));
                            var o = i >> 2;
                            e.forEach((e) => {
                              R(
                                4 * o++,
                                (function (e) {
                                  var t = J(e) + 1;
                                  var r = At(t);
                                  G(e, j, r, t);
                                  return r;
                                })(e),
                                4
                              );
                            });
                            R(4 * o, 0, 4);
                            try {
                              dt(t(r, i), true);
                            } catch (e) {
                              return (function (e) {
                                if (e instanceof Se || "unwind" == e) return D;
                                l(1, e);
                              })(e);
                            }
                          }
                        })(e);
                      }
                      (function () {
                        te();
                        if (n.postRun)
                          for (
                            "function" == typeof n.postRun &&
                            (n.postRun = [n.postRun]);
                            n.postRun.length;

                          )
                            (e = n.postRun.shift()), oe.unshift(e);
                        var e;
                        Ae(oe);
                      })();
                    }
                  }
                }
                var r;
                e = e || a;
                if (le > 0) {
                  Tt(5255488, 12608);
                  B(0 == (3 & (r = xt())));
                  R(4 * (r >> 2), 34821223, 4);
                  R(4 * ((r + 4) >> 2), 2310721022, 4);
                  if (
                    !Pt &&
                    (k.length
                      ? (he("preloadDylibs"),
                        k
                          .reduce(function (e, t) {
                            return e.then(function () {
                              return Qe(t, {
                                loadAsync: true,
                                global: true,
                                nodelete: true,
                                allowUndefined: true,
                              });
                            });
                          }, Promise.resolve())
                          .then(function () {
                            Je();
                            fe("preloadDylibs");
                          }))
                      : Je(),
                    (Pt = true),
                    le > 0)
                  ) {
                    (function () {
                      if (n.preRun)
                        for (
                          "function" == typeof n.preRun &&
                          (n.preRun = [n.preRun]);
                          n.preRun.length;

                        ) {
                          e = n.preRun.shift();
                          re.unshift(e);
                        }
                      var e;
                      Ae(re);
                    })();
                    if (le > 0) {
                      if (n.setStatus) {
                        n.setStatus("Running...");
                        setTimeout(function () {
                          setTimeout(function () {
                            n.setStatus("");
                          }, 1);
                          t();
                        }, 1);
                      } else {
                        t();
                      }
                      te();
                    }
                  }
                }
              }
              if (n.preInit)
                for (
                  "function" == typeof n.preInit && (n.preInit = [n.preInit]);
                  n.preInit.length > 0;

                )
                  n.preInit.pop()();
              var Nt = true;
              if (n.noInitialRun) {
                Nt = false;
              }
              Rt();
              const Ot = n;
              const Lt = {};
              const Dt = 20;
              const Mt = {
                row: 0,
                column: 0,
              };
              const Bt = /[\w-.]*/g;
              const Ft = /^_?tree_sitter_\w+/;
              var jt;
              var Ut;
              var $t;
              var qt;
              var Ht;
              class Vt {
                static init() {
                  $t = Ot._ts_init();
                  jt = Re($t, "i32");
                  Ut = Re($t + 4, "i32");
                }
                initialize() {
                  Ot._ts_parser_new_wasm();
                  this[0] = Re($t, "i32");
                  this[1] = Re($t + 4, "i32");
                }
                delete() {
                  Ot._ts_parser_delete(this[0]);
                  Ot._free(this[1]);
                  this[0] = 0;
                  this[1] = 0;
                }
                setLanguage(e) {
                  let t;
                  if (e) {
                    if (e.constructor !== Gt)
                      throw new Error("Argument must be a Language");
                    {
                      t = e[0];
                      const r = Ot._ts_language_version(t);
                      if (r < Ut || jt < r)
                        throw new Error(
                          `Incompatible language version ${r}. Compatibility range ${Ut} through ${jt}.`
                        );
                    }
                  } else {
                    t = 0;
                    e = null;
                  }
                  this.language = e;
                  Ot._ts_parser_set_language(this[0], t);
                  return this;
                }
                getLanguage() {
                  return this.language;
                }
                parse(e, t, r) {
                  if ("string" == typeof e) qt = (t, r, n) => e.slice(t, n);
                  else {
                    if ("function" != typeof e)
                      throw new Error(
                        "Argument must be a string or a function"
                      );
                    qt = e;
                  }
                  if (this.logCallback) {
                    Ht = this.logCallback;
                    Ot._ts_parser_enable_logger_wasm(this[0], 1);
                  } else {
                    Ht = null;
                    Ot._ts_parser_enable_logger_wasm(this[0], 0);
                  }
                  let n = 0;
                  let i = 0;
                  if (r && r.includedRanges) {
                    n = r.includedRanges.length;
                    i = Ot._calloc(n, 24);
                    let e = i;
                    for (let t = 0; t < n; t++) {
                      sr(e, r.includedRanges[t]);
                      e += 24;
                    }
                  }
                  const o = Ot._ts_parser_parse_wasm(
                    this[0],
                    this[1],
                    t ? t[0] : 0,
                    i,
                    n
                  );
                  if (!o)
                    throw (
                      ((qt = null), (Ht = null), new Error("Parsing failed"))
                    );
                  const s = new zt(Lt, o, this.language, qt);
                  qt = null;
                  Ht = null;
                  return s;
                }
                reset() {
                  Ot._ts_parser_reset(this[0]);
                }
                setTimeoutMicros(e) {
                  Ot._ts_parser_set_timeout_micros(this[0], e);
                }
                getTimeoutMicros() {
                  return Ot._ts_parser_timeout_micros(this[0]);
                }
                setLogger(e) {
                  if (e) {
                    if ("function" != typeof e)
                      throw new Error("Logger callback must be a function");
                  } else e = null;
                  this.logCallback = e;
                  return this;
                }
                getLogger() {
                  return this.logCallback;
                }
              }
              class zt {
                constructor(e, t, r, n) {
                  Xt(e);
                  this[0] = t;
                  this.language = r;
                  this.textCallback = n;
                }
                copy() {
                  const e = Ot._ts_tree_copy(this[0]);
                  return new zt(Lt, e, this.language, this.textCallback);
                }
                delete() {
                  Ot._ts_tree_delete(this[0]);
                  this[0] = 0;
                }
                edit(e) {
                  !(function (e) {
                    let t = $t;
                    ir(t, e.startPosition);
                    t += 8;
                    ir(t, e.oldEndPosition);
                    t += 8;
                    ir(t, e.newEndPosition);
                    t += 8;
                    Ye(t, e.startIndex, "i32");
                    t += 4;
                    Ye(t, e.oldEndIndex, "i32");
                    t += 4;
                    Ye(t, e.newEndIndex, "i32");
                    t += 4;
                  })(e);
                  Ot._ts_tree_edit_wasm(this[0]);
                }
                get rootNode() {
                  Ot._ts_tree_root_node_wasm(this[0]);
                  return tr(this);
                }
                getLanguage() {
                  return this.language;
                }
                walk() {
                  return this.rootNode.walk();
                }
                getChangedRanges(e) {
                  if (e.constructor !== zt)
                    throw new TypeError("Argument must be a Tree");
                  Ot._ts_tree_get_changed_ranges_wasm(this[0], e[0]);
                  const t = Re($t, "i32");
                  const r = Re($t + 4, "i32");
                  const n = new Array(t);
                  if (t > 0) {
                    let e = r;
                    for (let r = 0; r < t; r++) {
                      n[r] = ar(e);
                      e += 24;
                    }
                    Ot._free(r);
                  }
                  return n;
                }
              }
              class Kt {
                constructor(e, t) {
                  Xt(e);
                  this.tree = t;
                }
                get typeId() {
                  er(this);
                  return Ot._ts_node_symbol_wasm(this.tree[0]);
                }
                get type() {
                  return this.tree.language.types[this.typeId] || "ERROR";
                }
                get endPosition() {
                  er(this);
                  Ot._ts_node_end_point_wasm(this.tree[0]);
                  return or($t);
                }
                get endIndex() {
                  er(this);
                  return Ot._ts_node_end_index_wasm(this.tree[0]);
                }
                get text() {
                  return Jt(this.tree, this.startIndex, this.endIndex);
                }
                isNamed() {
                  er(this);
                  return 1 === Ot._ts_node_is_named_wasm(this.tree[0]);
                }
                hasError() {
                  er(this);
                  return 1 === Ot._ts_node_has_error_wasm(this.tree[0]);
                }
                hasChanges() {
                  er(this);
                  return 1 === Ot._ts_node_has_changes_wasm(this.tree[0]);
                }
                isMissing() {
                  er(this);
                  return 1 === Ot._ts_node_is_missing_wasm(this.tree[0]);
                }
                equals(e) {
                  return this.id === e.id;
                }
                child(e) {
                  er(this);
                  Ot._ts_node_child_wasm(this.tree[0], e);
                  return tr(this.tree);
                }
                namedChild(e) {
                  er(this);
                  Ot._ts_node_named_child_wasm(this.tree[0], e);
                  return tr(this.tree);
                }
                childForFieldId(e) {
                  er(this);
                  Ot._ts_node_child_by_field_id_wasm(this.tree[0], e);
                  return tr(this.tree);
                }
                childForFieldName(e) {
                  const t = this.tree.language.fields.indexOf(e);
                  if (-1 !== t) return this.childForFieldId(t);
                }
                get childCount() {
                  er(this);
                  return Ot._ts_node_child_count_wasm(this.tree[0]);
                }
                get namedChildCount() {
                  er(this);
                  return Ot._ts_node_named_child_count_wasm(this.tree[0]);
                }
                get firstChild() {
                  return this.child(0);
                }
                get firstNamedChild() {
                  return this.namedChild(0);
                }
                get lastChild() {
                  return this.child(this.childCount - 1);
                }
                get lastNamedChild() {
                  return this.namedChild(this.namedChildCount - 1);
                }
                get children() {
                  if (!this._children) {
                    er(this);
                    Ot._ts_node_children_wasm(this.tree[0]);
                    const e = Re($t, "i32");
                    const t = Re($t + 4, "i32");
                    this._children = new Array(e);
                    if (e > 0) {
                      let r = t;
                      for (let t = 0; t < e; t++)
                        (this._children[t] = tr(this.tree, r)), (r += Dt);
                      Ot._free(t);
                    }
                  }
                  return this._children;
                }
                get namedChildren() {
                  if (!this._namedChildren) {
                    er(this);
                    Ot._ts_node_named_children_wasm(this.tree[0]);
                    const e = Re($t, "i32");
                    const t = Re($t + 4, "i32");
                    this._namedChildren = new Array(e);
                    if (e > 0) {
                      let r = t;
                      for (let t = 0; t < e; t++)
                        (this._namedChildren[t] = tr(this.tree, r)), (r += Dt);
                      Ot._free(t);
                    }
                  }
                  return this._namedChildren;
                }
                descendantsOfType(e, t, r) {
                  if (Array.isArray(e)) {
                    e = [e];
                  }
                  if (t) {
                    t = Mt;
                  }
                  if (r) {
                    r = Mt;
                  }
                  const n = [];
                  const i = this.tree.language.types;
                  for (
                    (function () {
                      let t = 0;
                      let r = i.length;
                    })();
                    t < r;
                    t++
                  )
                    if (e.includes(i[t])) {
                      n.push(t);
                    }
                  const o = Ot._malloc(4 * n.length);
                  for (
                    (function () {
                      let e = 0;
                      let t = n.length;
                    })();
                    e < t;
                    e++
                  )
                    Ye(o + 4 * e, n[e], "i32");
                  er(this);
                  Ot._ts_node_descendants_of_type_wasm(
                    this.tree[0],
                    o,
                    n.length,
                    t.row,
                    t.column,
                    r.row,
                    r.column
                  );
                  const s = Re($t, "i32");
                  const a = Re($t + 4, "i32");
                  const c = new Array(s);
                  if (s > 0) {
                    let e = a;
                    for (let t = 0; t < s; t++) {
                      c[t] = tr(this.tree, e);
                      e += Dt;
                    }
                  }
                  Ot._free(a);
                  Ot._free(o);
                  return c;
                }
                get nextSibling() {
                  er(this);
                  Ot._ts_node_next_sibling_wasm(this.tree[0]);
                  return tr(this.tree);
                }
                get previousSibling() {
                  er(this);
                  Ot._ts_node_prev_sibling_wasm(this.tree[0]);
                  return tr(this.tree);
                }
                get nextNamedSibling() {
                  er(this);
                  Ot._ts_node_next_named_sibling_wasm(this.tree[0]);
                  return tr(this.tree);
                }
                get previousNamedSibling() {
                  er(this);
                  Ot._ts_node_prev_named_sibling_wasm(this.tree[0]);
                  return tr(this.tree);
                }
                get parent() {
                  er(this);
                  Ot._ts_node_parent_wasm(this.tree[0]);
                  return tr(this.tree);
                }
                descendantForIndex(e, t = e) {
                  if ("number" != typeof e || "number" != typeof t)
                    throw new Error("Arguments must be numbers");
                  er(this);
                  let r = $t + Dt;
                  Ye(r, e, "i32");
                  Ye(r + 4, t, "i32");
                  Ot._ts_node_descendant_for_index_wasm(this.tree[0]);
                  return tr(this.tree);
                }
                namedDescendantForIndex(e, t = e) {
                  if ("number" != typeof e || "number" != typeof t)
                    throw new Error("Arguments must be numbers");
                  er(this);
                  let r = $t + Dt;
                  Ye(r, e, "i32");
                  Ye(r + 4, t, "i32");
                  Ot._ts_node_named_descendant_for_index_wasm(this.tree[0]);
                  return tr(this.tree);
                }
                descendantForPosition(e, t = e) {
                  if (!Zt(e) || !Zt(t))
                    throw new Error("Arguments must be {row, column} objects");
                  er(this);
                  let r = $t + Dt;
                  ir(r, e);
                  ir(r + 8, t);
                  Ot._ts_node_descendant_for_position_wasm(this.tree[0]);
                  return tr(this.tree);
                }
                namedDescendantForPosition(e, t = e) {
                  if (!Zt(e) || !Zt(t))
                    throw new Error("Arguments must be {row, column} objects");
                  er(this);
                  let r = $t + Dt;
                  ir(r, e);
                  ir(r + 8, t);
                  Ot._ts_node_named_descendant_for_position_wasm(this.tree[0]);
                  return tr(this.tree);
                }
                walk() {
                  er(this);
                  Ot._ts_tree_cursor_new_wasm(this.tree[0]);
                  return new Wt(Lt, this.tree);
                }
                toString() {
                  er(this);
                  const e = Ot._ts_node_to_string_wasm(this.tree[0]);
                  const t = yt(e);
                  Ot._free(e);
                  return t;
                }
              }
              class Wt {
                constructor(e, t) {
                  Xt(e);
                  this.tree = t;
                  nr(this);
                }
                delete() {
                  rr(this);
                  Ot._ts_tree_cursor_delete_wasm(this.tree[0]);
                  this[0] = this[1] = this[2] = 0;
                }
                reset(e) {
                  er(e);
                  rr(this, $t + Dt);
                  Ot._ts_tree_cursor_reset_wasm(this.tree[0]);
                  nr(this);
                }
                get nodeType() {
                  return this.tree.language.types[this.nodeTypeId] || "ERROR";
                }
                get nodeTypeId() {
                  rr(this);
                  return Ot._ts_tree_cursor_current_node_type_id_wasm(
                    this.tree[0]
                  );
                }
                get nodeId() {
                  rr(this);
                  return Ot._ts_tree_cursor_current_node_id_wasm(this.tree[0]);
                }
                get nodeIsNamed() {
                  rr(this);
                  return (
                    1 ===
                    Ot._ts_tree_cursor_current_node_is_named_wasm(this.tree[0])
                  );
                }
                get nodeIsMissing() {
                  rr(this);
                  return (
                    1 ===
                    Ot._ts_tree_cursor_current_node_is_missing_wasm(
                      this.tree[0]
                    )
                  );
                }
                get nodeText() {
                  rr(this);
                  const e = Ot._ts_tree_cursor_start_index_wasm(this.tree[0]);
                  const t = Ot._ts_tree_cursor_end_index_wasm(this.tree[0]);
                  return Jt(this.tree, e, t);
                }
                get startPosition() {
                  rr(this);
                  Ot._ts_tree_cursor_start_position_wasm(this.tree[0]);
                  return or($t);
                }
                get endPosition() {
                  rr(this);
                  Ot._ts_tree_cursor_end_position_wasm(this.tree[0]);
                  return or($t);
                }
                get startIndex() {
                  rr(this);
                  return Ot._ts_tree_cursor_start_index_wasm(this.tree[0]);
                }
                get endIndex() {
                  rr(this);
                  return Ot._ts_tree_cursor_end_index_wasm(this.tree[0]);
                }
                currentNode() {
                  rr(this);
                  Ot._ts_tree_cursor_current_node_wasm(this.tree[0]);
                  return tr(this.tree);
                }
                currentFieldId() {
                  rr(this);
                  return Ot._ts_tree_cursor_current_field_id_wasm(this.tree[0]);
                }
                currentFieldName() {
                  return this.tree.language.fields[this.currentFieldId()];
                }
                gotoFirstChild() {
                  rr(this);
                  const e = Ot._ts_tree_cursor_goto_first_child_wasm(
                    this.tree[0]
                  );
                  nr(this);
                  return 1 === e;
                }
                gotoNextSibling() {
                  rr(this);
                  const e = Ot._ts_tree_cursor_goto_next_sibling_wasm(
                    this.tree[0]
                  );
                  nr(this);
                  return 1 === e;
                }
                gotoParent() {
                  rr(this);
                  const e = Ot._ts_tree_cursor_goto_parent_wasm(this.tree[0]);
                  nr(this);
                  return 1 === e;
                }
              }
              class Gt {
                constructor(e, t) {
                  var _this = this;
                  Xt(e);
                  this[0] = t;
                  this.types = new Array(Ot._ts_language_symbol_count(this[0]));
                  for (
                    (function () {
                      let e = 0;
                      let t = _this.types.length;
                    })();
                    e < t;
                    e++
                  )
                    if (Ot._ts_language_symbol_type(this[0], e) < 2) {
                      this.types[e] = W(
                        Ot._ts_language_symbol_name(this[0], e)
                      );
                    }
                  this.fields = new Array(
                    Ot._ts_language_field_count(this[0]) + 1
                  );
                  for (
                    (function () {
                      let e = 0;
                      let t = _this.fields.length;
                    })();
                    e < t;
                    e++
                  ) {
                    const t = Ot._ts_language_field_name_for_id(this[0], e);
                    this.fields[e] = 0 !== t ? W(t) : null;
                  }
                }
                get version() {
                  return Ot._ts_language_version(this[0]);
                }
                get fieldCount() {
                  return this.fields.length - 1;
                }
                fieldIdForName(e) {
                  const t = this.fields.indexOf(e);
                  return -1 !== t ? t : null;
                }
                fieldNameForId(e) {
                  return this.fields[e] || null;
                }
                idForNodeType(e, t) {
                  const r = J(e);
                  const n = Ot._malloc(r + 1);
                  Q(e, n, r + 1);
                  const i = Ot._ts_language_symbol_for_name(this[0], n, r, t);
                  Ot._free(n);
                  return i || null;
                }
                get nodeTypeCount() {
                  return Ot._ts_language_symbol_count(this[0]);
                }
                nodeTypeForId(e) {
                  const t = Ot._ts_language_symbol_name(this[0], e);
                  return t ? W(t) : null;
                }
                nodeTypeIsNamed(e) {
                  return !!Ot._ts_language_type_is_named_wasm(this[0], e);
                }
                nodeTypeIsVisible(e) {
                  return !!Ot._ts_language_type_is_visible_wasm(this[0], e);
                }
                query(e) {
                  const t = J(e);
                  const r = Ot._malloc(t + 1);
                  Q(e, r, t + 1);
                  const n = Ot._ts_query_new(this[0], r, t, $t, $t + 4);
                  if (!n) {
                    const t = Re($t + 4, "i32");
                    const n = W(r, Re($t, "i32")).length;
                    const i = e.substr(n, 100).split("\n")[0];
                    let o;
                    let s = i.match(Bt)[0];
                    switch (t) {
                      case 2:
                        o = new RangeError(`Bad node name '${s}'`);
                        break;
                      case 3:
                        o = new RangeError(`Bad field name '${s}'`);
                        break;
                      case 4:
                        o = new RangeError(`Bad capture name @${s}`);
                        break;
                      case 5:
                        o = new TypeError(
                          `Bad pattern structure at offset ${n}: '${i}'...`
                        );
                        s = "";
                        break;
                      default:
                        o = new SyntaxError(
                          `Bad syntax at offset ${n}: '${i}'...`
                        );
                        s = "";
                    }
                    throw (
                      ((o.index = n), (o.length = s.length), Ot._free(r), o)
                    );
                  }
                  const i = Ot._ts_query_string_count(n);
                  const o = Ot._ts_query_capture_count(n);
                  const s = Ot._ts_query_pattern_count(n);
                  const a = new Array(o);
                  const c = new Array(i);
                  for (let e = 0; e < o; e++) {
                    const t = Ot._ts_query_capture_name_for_id(n, e, $t);
                    const r = Re($t, "i32");
                    a[e] = W(t, r);
                  }
                  for (let e = 0; e < i; e++) {
                    const t = Ot._ts_query_string_value_for_id(n, e, $t);
                    const r = Re($t, "i32");
                    c[e] = W(t, r);
                  }
                  const l = new Array(s);
                  const u = new Array(s);
                  const d = new Array(s);
                  const p = new Array(s);
                  const h = new Array(s);
                  for (let e = 0; e < s; e++) {
                    const t = Ot._ts_query_predicates_for_pattern(n, e, $t);
                    const r = Re($t, "i32");
                    p[e] = [];
                    h[e] = [];
                    const i = [];
                    let o = t;
                    for (let t = 0; t < r; t++) {
                      const t = Re(o, "i32");
                      o += 4;
                      const r = Re(o, "i32");
                      o += 4;
                      if (1 === t)
                        i.push({
                          type: "capture",
                          name: a[r],
                        });
                      else if (2 === t)
                        i.push({
                          type: "string",
                          value: c[r],
                        });
                      else if (i.length > 0) {
                        if ("string" !== i[0].type)
                          throw new Error(
                            "Predicates must begin with a literal value"
                          );
                        const t = i[0].value;
                        let r = !0;
                        switch (t) {
                          case "not-eq?":
                            r = !1;
                          case "eq?":
                            if (3 !== i.length)
                              throw new Error(
                                "Wrong number of arguments to `#eq?` predicate. Expected 2, got " +
                                  (i.length - 1)
                              );
                            if ("capture" !== i[1].type)
                              throw new Error(
                                `First argument of \`#eq?\` predicate must be a capture. Got "${i[1].value}"`
                              );
                            if ("capture" === i[2].type) {
                              const t = i[1].name,
                                n = i[2].name;
                              h[e].push(function (e) {
                                let i, o;
                                for (const r of e)
                                  r.name === t && (i = r.node),
                                    r.name === n && (o = r.node);
                                return (
                                  void 0 === i ||
                                  void 0 === o ||
                                  (i.text === o.text) === r
                                );
                              });
                            } else {
                              const t = i[1].name,
                                n = i[2].value;
                              h[e].push(function (e) {
                                for (const i of e)
                                  if (i.name === t)
                                    return (i.node.text === n) === r;
                                return !0;
                              });
                            }
                            break;
                          case "not-match?":
                            r = !1;
                          case "match?":
                            if (3 !== i.length)
                              throw new Error(
                                `Wrong number of arguments to \`#match?\` predicate. Expected 2, got ${
                                  i.length - 1
                                }.`
                              );
                            if ("capture" !== i[1].type)
                              throw new Error(
                                `First argument of \`#match?\` predicate must be a capture. Got "${i[1].value}".`
                              );
                            if ("string" !== i[2].type)
                              throw new Error(
                                `Second argument of \`#match?\` predicate must be a string. Got @${i[2].value}.`
                              );
                            const n = i[1].name,
                              o = new RegExp(i[2].value);
                            h[e].push(function (e) {
                              for (const t of e)
                                if (t.name === n)
                                  return o.test(t.node.text) === r;
                              return !0;
                            });
                            break;
                          case "set!":
                            if (i.length < 2 || i.length > 3)
                              throw new Error(
                                `Wrong number of arguments to \`#set!\` predicate. Expected 1 or 2. Got ${
                                  i.length - 1
                                }.`
                              );
                            if (i.some((e) => "string" !== e.type))
                              throw new Error(
                                'Arguments to `#set!` predicate must be a strings.".'
                              );
                            l[e] || (l[e] = {}),
                              (l[e][i[1].value] = i[2] ? i[2].value : null);
                            break;
                          case "is?":
                          case "is-not?":
                            if (i.length < 2 || i.length > 3)
                              throw new Error(
                                `Wrong number of arguments to \`#${t}\` predicate. Expected 1 or 2. Got ${
                                  i.length - 1
                                }.`
                              );
                            if (i.some((e) => "string" !== e.type))
                              throw new Error(
                                `Arguments to \`#${t}\` predicate must be a strings.".`
                              );
                            const s = "is?" === t ? u : d;
                            s[e] || (s[e] = {}),
                              (s[e][i[1].value] = i[2] ? i[2].value : null);
                            break;
                          default:
                            p[e].push({
                              operator: t,
                              operands: i.slice(1),
                            });
                        }
                        i.length = 0;
                      }
                    }
                    Object.freeze(l[e]);
                    Object.freeze(u[e]);
                    Object.freeze(d[e]);
                  }
                  Ot._free(r);
                  return new Qt(
                    Lt,
                    n,
                    a,
                    h,
                    p,
                    Object.freeze(l),
                    Object.freeze(u),
                    Object.freeze(d)
                  );
                }
                static load(e) {
                  let t;
                  if (e instanceof Uint8Array) t = Promise.resolve(e);
                  else {
                    const n = e;
                    if (
                      "undefined" != typeof process &&
                      process.versions &&
                      process.versions.node
                    ) {
                      const e = r(747);
                      t = Promise.resolve(e.readFileSync(n));
                    } else
                      t = fetch(n).then((e) =>
                        e.arrayBuffer().then((t) => {
                          if (e.ok) return new Uint8Array(t);
                          {
                            const r = new TextDecoder("utf-8").decode(t);
                            throw new Error(
                              `Language.load failed with status ${e.status}.\n\n${r}`
                            );
                          }
                        })
                      );
                  }
                  const n =
                    "function" == typeof loadSideModule ? loadSideModule : Ge;
                  return t
                    .then((e) =>
                      n(e, {
                        loadAsync: true,
                      })
                    )
                    .then((e) => {
                      const t = Object.keys(e);
                      const r = t.find(
                        (e) => Ft.test(e) && !e.includes("external_scanner_")
                      );
                      if (r) {
                        console.log(
                          `Couldn't find language function in WASM file. Symbols:\n${JSON.stringify(
                            t,
                            null,
                            2
                          )}`
                        );
                      }
                      const n = e[r]();
                      return new Gt(Lt, n);
                    });
                }
              }
              class Qt {
                constructor(e, t, r, n, i, o, s, a) {
                  Xt(e);
                  this[0] = t;
                  this.captureNames = r;
                  this.textPredicates = n;
                  this.predicates = i;
                  this.setProperties = o;
                  this.assertedProperties = s;
                  this.refutedProperties = a;
                  this.exceededMatchLimit = false;
                }
                delete() {
                  Ot._ts_query_delete(this[0]);
                  this[0] = 0;
                }
                matches(e, t, r, n) {
                  if (t) {
                    t = Mt;
                  }
                  if (r) {
                    r = Mt;
                  }
                  if (n) {
                    n = {};
                  }
                  let i = n.matchLimit;
                  if (undefined === i) i = 0;
                  else if ("number" != typeof i)
                    throw new Error("Arguments must be numbers");
                  er(e);
                  Ot._ts_query_matches_wasm(
                    this[0],
                    e.tree[0],
                    t.row,
                    t.column,
                    r.row,
                    r.column,
                    i
                  );
                  const o = Re($t, "i32");
                  const s = Re($t + 4, "i32");
                  const a = Re($t + 8, "i32");
                  const c = new Array(o);
                  this.exceededMatchLimit = !!a;
                  let l = 0;
                  let u = s;
                  for (let t = 0; t < o; t++) {
                    const r = Re(u, "i32");
                    u += 4;
                    const n = Re(u, "i32");
                    u += 4;
                    const i = new Array(n);
                    u = Yt(this, e.tree, u, i);
                    if (this.textPredicates[r].every((e) => e(i))) {
                      c[l++] = {
                        pattern: r,
                        captures: i,
                      };
                      const e = this.setProperties[r];
                      e && (c[t].setProperties = e);
                      const n = this.assertedProperties[r];
                      n && (c[t].assertedProperties = n);
                      const o = this.refutedProperties[r];
                      o && (c[t].refutedProperties = o);
                    }
                  }
                  c.length = l;
                  Ot._free(s);
                  return c;
                }
                captures(e, t, r, n) {
                  if (t) {
                    t = Mt;
                  }
                  if (r) {
                    r = Mt;
                  }
                  if (n) {
                    n = {};
                  }
                  let i = n.matchLimit;
                  if (undefined === i) i = 0;
                  else if ("number" != typeof i)
                    throw new Error("Arguments must be numbers");
                  er(e);
                  Ot._ts_query_captures_wasm(
                    this[0],
                    e.tree[0],
                    t.row,
                    t.column,
                    r.row,
                    r.column,
                    i
                  );
                  const o = Re($t, "i32");
                  const s = Re($t + 4, "i32");
                  const a = Re($t + 8, "i32");
                  const c = [];
                  this.exceededMatchLimit = !!a;
                  const l = [];
                  let u = s;
                  for (let t = 0; t < o; t++) {
                    const t = Re(u, "i32");
                    u += 4;
                    const r = Re(u, "i32");
                    u += 4;
                    const n = Re(u, "i32");
                    u += 4;
                    l.length = r;
                    u = Yt(this, e.tree, u, l);
                    if (this.textPredicates[t].every((e) => e(l))) {
                      const e = l[n],
                        r = this.setProperties[t];
                      r && (e.setProperties = r);
                      const i = this.assertedProperties[t];
                      i && (e.assertedProperties = i);
                      const o = this.refutedProperties[t];
                      o && (e.refutedProperties = o), c.push(e);
                    }
                  }
                  Ot._free(s);
                  return c;
                }
                predicatesForPattern(e) {
                  return this.predicates[e];
                }
                didExceedMatchLimit() {
                  return this.exceededMatchLimit;
                }
              }
              function Jt(e, t, r) {
                const n = r - t;
                let i = e.textCallback(t, null, r);
                for (t += i.length; t < r; ) {
                  const n = e.textCallback(t, null, r);
                  if (!(n && n.length > 0)) break;
                  t += n.length;
                  i += n;
                }
                if (t > r) {
                  i = i.slice(0, n);
                }
                return i;
              }
              function Yt(e, t, r, n) {
                for (
                  (function () {
                    let i = 0;
                    let o = n.length;
                  })();
                  i < o;
                  i++
                ) {
                  const o = Re(r, "i32");
                  const s = tr(t, (r += 4));
                  r += Dt;
                  n[i] = {
                    name: e.captureNames[o],
                    node: s,
                  };
                }
                return r;
              }
              function Xt(e) {
                if (e !== Lt) throw new Error("Illegal constructor");
              }
              function Zt(e) {
                return (
                  e && "number" == typeof e.row && "number" == typeof e.column
                );
              }
              function er(e) {
                let t = $t;
                Ye(t, e.id, "i32");
                t += 4;
                Ye(t, e.startIndex, "i32");
                t += 4;
                Ye(t, e.startPosition.row, "i32");
                t += 4;
                Ye(t, e.startPosition.column, "i32");
                t += 4;
                Ye(t, e[0], "i32");
              }
              function tr(e, t = $t) {
                const r = Re(t, "i32");
                if (0 === r) return null;
                const n = Re((t += 4), "i32");
                const i = Re((t += 4), "i32");
                const o = Re((t += 4), "i32");
                const s = Re((t += 4), "i32");
                const a = new Kt(Lt, e);
                a.id = r;
                a.startIndex = n;
                a.startPosition = {
                  row: i,
                  column: o,
                };
                a[0] = s;
                return a;
              }
              function rr(e, t = $t) {
                Ye(t + 0, e[0], "i32");
                Ye(t + 4, e[1], "i32");
                Ye(t + 8, e[2], "i32");
              }
              function nr(e) {
                e[0] = Re($t + 0, "i32");
                e[1] = Re($t + 4, "i32");
                e[2] = Re($t + 8, "i32");
              }
              function ir(e, t) {
                Ye(e, t.row, "i32");
                Ye(e + 4, t.column, "i32");
              }
              function or(e) {
                return {
                  row: Re(e, "i32"),
                  column: Re(e + 4, "i32"),
                };
              }
              function sr(e, t) {
                ir(e, t.startPosition);
                ir((e += 8), t.endPosition);
                Ye((e += 8), t.startIndex, "i32");
                Ye((e += 4), t.endIndex, "i32");
                e += 4;
              }
              function ar(e) {
                const t = {};
                t.startPosition = or(e);
                e += 8;
                t.endPosition = or(e);
                e += 8;
                t.startIndex = Re(e, "i32");
                e += 4;
                t.endIndex = Re(e, "i32");
                return t;
              }
              for (const e of Object.getOwnPropertyNames(Vt.prototype))
                Object.defineProperty(o.prototype, e, {
                  value: Vt.prototype[e],
                  enumerable: false,
                  writable: false,
                });
              o.Language = Gt;
              n.onRuntimeInitialized = () => {
                Vt.init();
                t();
              };
            })))
          );
        }
      }
      return o;
    })();
    e.exports = i;
  },
  747: (e) => {
    "use strict";

    e.exports = require("fs");
  },
  622: (e) => {
    "use strict";

    e.exports = require("path");
  },
  669: (e) => {
    "use strict";

    e.exports = require("util");
  },
  13: (e) => {
    "use strict";

    e.exports = require("worker_threads");
  },
};
i = {};
o = (function e(t) {
  var r = i[t];
  if (undefined !== r) return r.exports;
  var o = (i[t] = {
    exports: {},
  });
  n[t].call(o.exports, o, o.exports, e);
  return o.exports;
})(563);
module.exports = o;
