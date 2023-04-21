Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.regexpCode =
  exports.getEsmExportName =
  exports.getProperty =
  exports.safeStringify =
  exports.stringify =
  exports.strConcat =
  exports.addCodeArg =
  exports.str =
  exports._ =
  exports.nil =
  exports._Code =
  exports.Name =
  exports.IDENTIFIER =
  exports._CodeOrName =
    undefined;
class _CodeOrName {}
exports._CodeOrName = _CodeOrName;
exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
class Name extends _CodeOrName {
  constructor(e) {
    super();
    if (!exports.IDENTIFIER.test(e))
      throw new Error("CodeGen: name must be a valid identifier");
    this.str = e;
  }
  toString() {
    return this.str;
  }
  emptyStr() {
    return false;
  }
  get names() {
    return {
      [this.str]: 1,
    };
  }
}
exports.Name = Name;
class _Code extends _CodeOrName {
  constructor(e) {
    super();
    this._items = "string" == typeof e ? [e] : e;
  }
  toString() {
    return this.str;
  }
  emptyStr() {
    if (this._items.length > 1) return false;
    const e = this._items[0];
    return "" === e || '""' === e;
  }
  get str() {
    var e;
    return null !== (e = this._str) && undefined !== e
      ? e
      : (this._str = this._items.reduce((e, t) => `${e}${t}`, ""));
  }
  get names() {
    var e;
    return null !== (e = this._names) && undefined !== e
      ? e
      : (this._names = this._items.reduce(
          (e, t) => (t instanceof Name && (e[t.str] = (e[t.str] || 0) + 1), e),
          {}
        ));
  }
}
function _(e, ...t) {
  const r = [e[0]];
  let n = 0;
  for (; n < t.length; ) {
    addCodeArg(r, t[n]);
    r.push(e[++n]);
  }
  return new _Code(r);
}
exports._Code = _Code;
exports.nil = new _Code("");
exports._ = _;
const s = new _Code("+");
function str(e, ...t) {
  const r = [safeStringify(e[0])];
  let n = 0;
  for (; n < t.length; ) {
    r.push(s);
    addCodeArg(r, t[n]);
    r.push(s, safeStringify(e[++n]));
  }
  (function (e) {
    let t = 1;
    for (; t < e.length - 1; ) {
      if (e[t] === s) {
        const r = l(e[t - 1], e[t + 1]);
        if (undefined !== r) {
          e.splice(t - 1, 3, r);
          continue;
        }
        e[t++] = "+";
      }
      t++;
    }
  })(r);
  return new _Code(r);
}
function addCodeArg(e, t) {
  var r;
  if (t instanceof _Code) {
    e.push(...t._items);
  } else {
    if (t instanceof Name) {
      e.push(t);
    } else {
      e.push(
        "number" == typeof (r = t) || "boolean" == typeof r || null === r
          ? r
          : safeStringify(Array.isArray(r) ? r.join(",") : r)
      );
    }
  }
}
function l(e, t) {
  if ('""' === t) return e;
  if ('""' === e) return t;
  if ("string" == typeof e) {
    if (t instanceof Name || '"' !== e[e.length - 1]) return;
    return "string" != typeof t
      ? `${e.slice(0, -1)}${t}"`
      : '"' === t[0]
      ? e.slice(0, -1) + t.slice(1)
      : undefined;
  }
  return "string" != typeof t || '"' !== t[0] || e instanceof Name
    ? undefined
    : `"${e}${t.slice(1)}`;
}
function safeStringify(e) {
  return JSON.stringify(e)
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
exports.str = str;
exports.addCodeArg = addCodeArg;
exports.strConcat = function (e, t) {
  return t.emptyStr() ? e : e.emptyStr() ? t : str`${e}${t}`;
};
exports.stringify = function (e) {
  return new _Code(safeStringify(e));
};
exports.safeStringify = safeStringify;
exports.getProperty = function (e) {
  return "string" == typeof e && exports.IDENTIFIER.test(e)
    ? new _Code(`.${e}`)
    : _`[${e}]`;
};
exports.getEsmExportName = function (e) {
  if ("string" == typeof e && exports.IDENTIFIER.test(e))
    return new _Code(`${e}`);
  throw new Error(
    `CodeGen: invalid export name: ${e}, use explicit $id name mapping`
  );
};
exports.regexpCode = function (e) {
  return new _Code(e.toString());
};