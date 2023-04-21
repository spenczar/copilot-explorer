Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.extractLocalImportContext = exports.getDocComment = undefined;
const n = require("path");
const i = require(42133);
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
    return "function_declaration" === t.type || "function_signature" === t.type
      ? "declare " + n
      : n;
  }
  return "";
}
function getDocComment(e, t) {
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
  const n = getDocComment(e, t);
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
      if (undefined !== i) return r + n + e.substring(t.startIndex, i) + ";";
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
              i = getDocComment(s, e) + i;
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
exports.getDocComment = getDocComment;
const h = /^\s*import\s*(type|)\s*\{[^}]*\}\s*from\s*['"]\./gm;
exports.extractLocalImportContext = async function (e, t) {
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