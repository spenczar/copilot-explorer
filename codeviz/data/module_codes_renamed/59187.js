Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.ValueScope =
  exports.ValueScopeName =
  exports.Scope =
  exports.varKinds =
  exports.UsedValueState =
    undefined;
const M_CodeGenerationUtils_maybe = require("CodeGenerationUtils");
class i extends Error {
  constructor(e) {
    super(`CodeGen: "code" for ${e} not defined`);
    this.value = e.value;
  }
}
var o;
!(function (e) {
  e[(e.Started = 0)] = "Started";
  e[(e.Completed = 1)] = "Completed";
})((o = exports.UsedValueState || (exports.UsedValueState = {})));
exports.varKinds = {
  const: new M_CodeGenerationUtils_maybe.Name("const"),
  let: new M_CodeGenerationUtils_maybe.Name("let"),
  var: new M_CodeGenerationUtils_maybe.Name("var"),
};
class Scope {
  constructor({ prefixes: e, parent: t } = {}) {
    this._names = {};
    this._prefixes = e;
    this._parent = t;
  }
  toName(e) {
    return e instanceof M_CodeGenerationUtils_maybe.Name ? e : this.name(e);
  }
  name(e) {
    return new M_CodeGenerationUtils_maybe.Name(this._newName(e));
  }
  _newName(e) {
    return `${e}${(this._names[e] || this._nameGroup(e)).index++}`;
  }
  _nameGroup(e) {
    var t;
    var r;
    if (
      (null ===
        (r =
          null === (t = this._parent) || undefined === t
            ? undefined
            : t._prefixes) || undefined === r
        ? undefined
        : r.has(e)) ||
      (this._prefixes && !this._prefixes.has(e))
    )
      throw new Error(`CodeGen: prefix "${e}" is not allowed in this scope`);
    return (this._names[e] = {
      prefix: e,
      index: 0,
    });
  }
}
exports.Scope = Scope;
class ValueScopeName extends M_CodeGenerationUtils_maybe.Name {
  constructor(e, t) {
    super(t);
    this.prefix = e;
  }
  setValue(e, { property: t, itemIndex: r }) {
    this.value = e;
    this.scopePath = M_CodeGenerationUtils_maybe._`.${new M_CodeGenerationUtils_maybe.Name(
      t
    )}[${r}]`;
  }
}
exports.ValueScopeName = ValueScopeName;
const c = M_CodeGenerationUtils_maybe._`\n`;
exports.ValueScope = class extends Scope {
  constructor(e) {
    super(e);
    this._values = {};
    this._scope = e.scope;
    this.opts = {
      ...e,
      _n: e.lines ? c : M_CodeGenerationUtils_maybe.nil,
    };
  }
  get() {
    return this._scope;
  }
  name(e) {
    return new ValueScopeName(e, this._newName(e));
  }
  value(e, t) {
    var r;
    if (undefined === t.ref)
      throw new Error("CodeGen: ref must be passed in value");
    const n = this.toName(e);
    const { prefix: i } = n;
    const o = null !== (r = t.key) && undefined !== r ? r : t.ref;
    let s = this._values[i];
    if (s) {
      const e = s.get(o);
      if (e) return e;
    } else s = this._values[i] = new Map();
    s.set(o, n);
    const a = this._scope[i] || (this._scope[i] = []);
    const c = a.length;
    a[c] = t.ref;
    n.setValue(t, {
      property: i,
      itemIndex: c,
    });
    return n;
  }
  getValue(e, t) {
    const r = this._values[e];
    if (r) return r.get(t);
  }
  scopeRefs(e, t = this._values) {
    return this._reduceValues(t, (t) => {
      if (undefined === t.scopePath)
        throw new Error(`CodeGen: name "${t}" has no value`);
      return M_CodeGenerationUtils_maybe._`${e}${t.scopePath}`;
    });
  }
  scopeCode(e = this._values, t, r) {
    return this._reduceValues(
      e,
      (e) => {
        if (undefined === e.value)
          throw new Error(`CodeGen: name "${e}" has no value`);
        return e.value.code;
      },
      t,
      r
    );
  }
  _reduceValues(e, r, s = {}, a) {
    let c = M_CodeGenerationUtils_maybe.nil;
    for (const l in e) {
      const u = e[l];
      if (!u) continue;
      const d = (s[l] = s[l] || new Map());
      u.forEach((e) => {
        if (d.has(e)) return;
        d.set(e, o.Started);
        let s = r(e);
        if (s) {
          const r = this.opts.es5
            ? exports.varKinds.var
            : exports.varKinds.const;
          c = M_CodeGenerationUtils_maybe._`${c}${r} ${e} = ${s};${this.opts._n}`;
        } else {
          if (!(s = null == a ? undefined : a(e))) throw new i(e);
          c = M_CodeGenerationUtils_maybe._`${c}${s}${this.opts._n}`;
        }
        d.set(e, o.Completed);
      });
    }
    return c;
  }
};
