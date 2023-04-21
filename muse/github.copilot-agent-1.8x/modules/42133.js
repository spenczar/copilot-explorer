Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getFunctionPositions =
  exports.getFirstPrecedingComment =
  exports.isFunctionDefinition =
  exports.isFunction =
  exports.getAncestorWithSiblingFunctions =
  exports.queryPythonIsDocstring =
  exports.queryGlobalVars =
  exports.queryExports =
  exports.queryImports =
  exports.queryFunctions =
  exports.getBlockCloseToken =
  exports.parsesWithoutError =
  exports.parseTreeSitter =
  exports.getLanguage =
  exports.languageIdToWasmLanguage =
  exports.isSupportedLanguageId =
  exports.WASMLanguage =
    undefined;
const n = require("path");
const i = require(60498);
const o = require(60498);
var s;
!(function (e) {
  e.Python = "python";
  e.JavaScript = "javascript";
  e.TypeScript = "typescript";
  e.Go = "go";
  e.Ruby = "ruby";
})((s = exports.WASMLanguage || (exports.WASMLanguage = {})));
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
function languageIdToWasmLanguage(e) {
  if (!(e in a)) throw new Error(`Unrecognized language: ${e}`);
  return a[e];
}
exports.isSupportedLanguageId = function (e) {
  return e in a;
};
exports.languageIdToWasmLanguage = languageIdToWasmLanguage;
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
async function getLanguage(e) {
  const t = languageIdToWasmLanguage(e);
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
async function parseTreeSitter(e, t) {
  let r = await getLanguage(e);
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
function queryFunctions(e, t) {
  return b(l[languageIdToWasmLanguage(e)], t);
}
exports.getLanguage = getLanguage;
exports.parseTreeSitter = parseTreeSitter;
exports.parsesWithoutError = async function (e, t) {
  const r = await parseTreeSitter(e, t);
  const n = !r.rootNode.hasError();
  r.delete();
  return n;
};
exports.getBlockCloseToken = function (e) {
  switch (languageIdToWasmLanguage(e)) {
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
exports.queryFunctions = queryFunctions;
exports.queryImports = function (e, t) {
  return b(p[languageIdToWasmLanguage(e)], t);
};
exports.queryExports = function (e, t) {
  return b(h[languageIdToWasmLanguage(e)], t);
};
exports.queryGlobalVars = function (e, t) {
  return b(f[languageIdToWasmLanguage(e)], t);
};
const C = [
  "[\n    (class_definition (block (expression_statement (string))))\n    (function_definition (block (expression_statement (string))))\n]",
];
function isFunction(e, t) {
  return g[languageIdToWasmLanguage(e)].has(t.type);
}
exports.queryPythonIsDocstring = function (e) {
  return 1 == b([C], e).length;
};
exports.getAncestorWithSiblingFunctions = function (e, t) {
  const r = m[languageIdToWasmLanguage(e)];
  for (; t.parent; ) {
    if (r(t.parent)) return t;
    t = t.parent;
  }
  return t.parent ? t : null;
};
exports.isFunction = isFunction;
exports.isFunctionDefinition = function (e, t) {
  switch (languageIdToWasmLanguage(e)) {
    case s.Python:
    case s.Go:
    case s.Ruby:
      return isFunction(e, t);
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
        return null !== n && isFunction(e, n);
      }
      if ("expression_statement" === t.type) {
        let r = t.namedChild(0);
        if ("assignment_expression" === r?.type) {
          let t = r.namedChild(1);
          return null !== t && isFunction(e, t);
        }
      }
      return false;
  }
};
exports.getFirstPrecedingComment = function (e) {
  let t = e;
  for (; "comment" === t.previousSibling?.type; ) {
    let e = t.previousSibling;
    if (e.endPosition.row < t.startPosition.row - 1) break;
    t = e;
  }
  return "comment" === t?.type ? t : null;
};
exports.getFunctionPositions = async function (e, t) {
  const r = await parseTreeSitter(e, t);
  const n = queryFunctions(e, r.rootNode).map((e) => {
    const t = e.captures.find((e) => "function" === e.name).node;
    return {
      startIndex: t.startIndex,
      endIndex: t.endIndex,
    };
  });
  r.delete();
  return n;
};