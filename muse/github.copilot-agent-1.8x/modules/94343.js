Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getNodeStart =
  exports.isBlockBodyFinished =
  exports.isEmptyBlockStart =
  exports.getBlockParser =
    undefined;
const n = require(42133);
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
            ("" == r ? e.namedChildren[0] : e.childForFieldName(r))?.type == t
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
        ("javascript" == this.languageId || "typescript" == this.languageId) &&
        n.parent &&
        "object" == n.parent.type &&
        "{" == n.parent.text.trim()
      )
        return true;
      if ("typescript" == this.languageId) {
        let r = n;
        for (; r.parent; ) {
          if ("function_signature" == r.type || "method_signature" == r.type) {
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
                  if ("ERROR" == e.type && ('"""' == e.text || "'''" == e.text))
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
              if ("=>" == r.type && r.nextSibling && "{" != r.nextSibling.type)
                return false;
              break;
            }
            case "typescript": {
              const t = e.find((e) => "{" == e.type);
              if (t && t.startIndex > r.endIndex && null != t.nextSibling)
                return false;
              if (e.find((e) => "do" == e.type) && "while" == r.type)
                return false;
              if ("=>" == r.type && r.nextSibling && "{" != r.nextSibling.type)
                return false;
              break;
            }
          }
          return !(o && o.startIndex > r.endIndex) || this.isBlockEmpty(o, t);
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
function getBlockParser(e) {
  return u[n.languageIdToWasmLanguage(e)];
}
exports.getBlockParser = getBlockParser;
exports.isEmptyBlockStart = async function (e, t, r) {
  return (
    !!n.isSupportedLanguageId(e) && getBlockParser(e).isEmptyBlockStart(t, r)
  );
};
exports.isBlockBodyFinished = async function (e, t, r, i) {
  if (n.isSupportedLanguageId(e))
    return getBlockParser(e).isBlockBodyFinished(t, r, i);
};
exports.getNodeStart = async function (e, t, r) {
  if (n.isSupportedLanguageId(e)) return getBlockParser(e).getNodeStart(t, r);
};