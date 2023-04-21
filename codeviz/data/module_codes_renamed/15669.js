Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.or =
  exports.and =
  exports.not =
  exports.CodeGen =
  exports.operators =
  exports.varKinds =
  exports.ValueScopeName =
  exports.ValueScope =
  exports.Scope =
  exports.Name =
  exports.regexpCode =
  exports.stringify =
  exports.getProperty =
  exports.nil =
  exports.strConcat =
  exports.str =
  exports._ =
    undefined;
const M_CodeGenerationUtils_maybe = require("CodeGenerationUtils");
const M_ValueScopeManager_maybe = require("ValueScopeManager");
var M_CodeGenerationUtils_maybe = require("CodeGenerationUtils");
exports._ = M_CodeGenerationUtils_maybe._;
exports.str = M_CodeGenerationUtils_maybe.str;
exports.strConcat = M_CodeGenerationUtils_maybe.strConcat;
exports.nil = M_CodeGenerationUtils_maybe.nil;
exports.getProperty = M_CodeGenerationUtils_maybe.getProperty;
exports.stringify = M_CodeGenerationUtils_maybe.stringify;
exports.regexpCode = M_CodeGenerationUtils_maybe.regexpCode;
exports.Name = M_CodeGenerationUtils_maybe.Name;
var M_ValueScopeManager_maybe = require("ValueScopeManager");
exports.Scope = M_ValueScopeManager_maybe.Scope;
exports.ValueScope = M_ValueScopeManager_maybe.ValueScope;
exports.ValueScopeName = M_ValueScopeManager_maybe.ValueScopeName;
exports.varKinds = M_ValueScopeManager_maybe.varKinds;
exports.operators = {
  GT: new M_CodeGenerationUtils_maybe._Code(">"),
  GTE: new M_CodeGenerationUtils_maybe._Code(">="),
  LT: new M_CodeGenerationUtils_maybe._Code("<"),
  LTE: new M_CodeGenerationUtils_maybe._Code("<="),
  EQ: new M_CodeGenerationUtils_maybe._Code("==="),
  NEQ: new M_CodeGenerationUtils_maybe._Code("!=="),
  NOT: new M_CodeGenerationUtils_maybe._Code("!"),
  OR: new M_CodeGenerationUtils_maybe._Code("||"),
  AND: new M_CodeGenerationUtils_maybe._Code("&&"),
  ADD: new M_CodeGenerationUtils_maybe._Code("+"),
};
class a {
  optimizeNodes() {
    return this;
  }
  optimizeNames(e, t) {
    return this;
  }
}
class c extends a {
  constructor(e, t, r) {
    super();
    this.varKind = e;
    this.name = t;
    this.rhs = r;
  }
  render({ es5: e, _n: t }) {
    const r = e ? M_ValueScopeManager_maybe.varKinds.var : this.varKind;
    const n = undefined === this.rhs ? "" : ` = ${this.rhs}`;
    return `${r} ${this.name}${n};` + t;
  }
  optimizeNames(e, t) {
    if (e[this.name.str]) {
      if (this.rhs) {
        this.rhs = R(this.rhs, e, t);
      }
      return this;
    }
  }
  get names() {
    return this.rhs instanceof M_CodeGenerationUtils_maybe._CodeOrName
      ? this.rhs.names
      : {};
  }
}
class l extends a {
  constructor(e, t, r) {
    super();
    this.lhs = e;
    this.rhs = t;
    this.sideEffects = r;
  }
  render({ _n: e }) {
    return `${this.lhs} = ${this.rhs};` + e;
  }
  optimizeNames(e, t) {
    if (
      !(this.lhs instanceof M_CodeGenerationUtils_maybe.Name) ||
      e[this.lhs.str] ||
      this.sideEffects
    ) {
      this.rhs = R(this.rhs, e, t);
      return this;
    }
  }
  get names() {
    return P(
      this.lhs instanceof M_CodeGenerationUtils_maybe.Name
        ? {}
        : {
            ...this.lhs.names,
          },
      this.rhs
    );
  }
}
class u extends l {
  constructor(e, t, r, n) {
    super(e, r, n);
    this.op = t;
  }
  render({ _n: e }) {
    return `${this.lhs} ${this.op}= ${this.rhs};` + e;
  }
}
class d extends a {
  constructor(e) {
    super();
    this.label = e;
    this.names = {};
  }
  render({ _n: e }) {
    return `${this.label}:` + e;
  }
}
class p extends a {
  constructor(e) {
    super();
    this.label = e;
    this.names = {};
  }
  render({ _n: e }) {
    return `break${this.label ? ` ${this.label}` : ""};` + e;
  }
}
class h extends a {
  constructor(e) {
    super();
    this.error = e;
  }
  render({ _n: e }) {
    return `throw ${this.error};` + e;
  }
  get names() {
    return this.error.names;
  }
}
class f extends a {
  constructor(e) {
    super();
    this.code = e;
  }
  render({ _n: e }) {
    return `${this.code};` + e;
  }
  optimizeNodes() {
    return `${this.code}` ? this : undefined;
  }
  optimizeNames(e, t) {
    this.code = R(this.code, e, t);
    return this;
  }
  get names() {
    return this.code instanceof M_CodeGenerationUtils_maybe._CodeOrName
      ? this.code.names
      : {};
  }
}
class g extends a {
  constructor(e = []) {
    super();
    this.nodes = e;
  }
  render(e) {
    return this.nodes.reduce((t, r) => t + r.render(e), "");
  }
  optimizeNodes() {
    const { nodes: e } = this;
    let t = e.length;
    for (; t--; ) {
      const r = e[t].optimizeNodes();
      if (Array.isArray(r)) {
        e.splice(t, 1, ...r);
      } else {
        if (r) {
          e[t] = r;
        } else {
          e.splice(t, 1);
        }
      }
    }
    return e.length > 0 ? this : undefined;
  }
  optimizeNames(e, t) {
    const { nodes: r } = this;
    let n = r.length;
    for (; n--; ) {
      const i = r[n];
      if (i.optimizeNames(e, t)) {
        N(e, i.names);
        r.splice(n, 1);
      }
    }
    return r.length > 0 ? this : undefined;
  }
  get names() {
    return this.nodes.reduce((e, t) => A(e, t.names), {});
  }
}
class m extends g {
  render(e) {
    return "{" + e._n + super.render(e) + "}" + e._n;
  }
}
class y extends g {}
class v extends m {}
v.kind = "else";
class _ extends m {
  constructor(e, t) {
    super(t);
    this.condition = e;
  }
  render(e) {
    let t = `if(${this.condition})` + super.render(e);
    if (this.else) {
      t += "else " + this.else.render(e);
    }
    return t;
  }
  optimizeNodes() {
    super.optimizeNodes();
    const e = this.condition;
    if (true === e) return this.nodes;
    let t = this.else;
    if (t) {
      const e = t.optimizeNodes();
      t = this.else = Array.isArray(e) ? new v(e) : e;
    }
    return t
      ? false === e
        ? t instanceof _
          ? t
          : t.nodes
        : this.nodes.length
        ? this
        : new _(not(e), t instanceof _ ? [t] : t.nodes)
      : false !== e && this.nodes.length
      ? this
      : undefined;
  }
  optimizeNames(e, t) {
    var r;
    this.else =
      null === (r = this.else) || undefined === r
        ? undefined
        : r.optimizeNames(e, t);
    if (super.optimizeNames(e, t) || this.else)
      return (this.condition = R(this.condition, e, t)), this;
  }
  get names() {
    const e = super.names;
    P(e, this.condition);
    if (this.else) {
      A(e, this.else.names);
    }
    return e;
  }
}
_.kind = "if";
class b extends m {}
b.kind = "for";
class w extends b {
  constructor(e) {
    super();
    this.iteration = e;
  }
  render(e) {
    return `for(${this.iteration})` + super.render(e);
  }
  optimizeNames(e, t) {
    if (super.optimizeNames(e, t)) {
      this.iteration = R(this.iteration, e, t);
      return this;
    }
  }
  get names() {
    return A(super.names, this.iteration.names);
  }
}
class C extends b {
  constructor(e, t, r, n) {
    super();
    this.varKind = e;
    this.name = t;
    this.from = r;
    this.to = n;
  }
  render(e) {
    const t = e.es5 ? M_ValueScopeManager_maybe.varKinds.var : this.varKind;
    const { name: r, from: n, to: o } = this;
    return `for(${t} ${r}=${n}; ${r}<${o}; ${r}++)` + super.render(e);
  }
  get names() {
    const e = P(super.names, this.from);
    return P(e, this.to);
  }
}
class E extends b {
  constructor(e, t, r, n) {
    super();
    this.loop = e;
    this.varKind = t;
    this.name = r;
    this.iterable = n;
  }
  render(e) {
    return (
      `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` +
      super.render(e)
    );
  }
  optimizeNames(e, t) {
    if (super.optimizeNames(e, t)) {
      this.iterable = R(this.iterable, e, t);
      return this;
    }
  }
  get names() {
    return A(super.names, this.iterable.names);
  }
}
class T extends m {
  constructor(e, t, r) {
    super();
    this.name = e;
    this.args = t;
    this.async = r;
  }
  render(e) {
    return (
      `${this.async ? "async " : ""}function ${this.name}(${this.args})` +
      super.render(e)
    );
  }
}
T.kind = "func";
class S extends g {
  render(e) {
    return "return " + super.render(e);
  }
}
S.kind = "return";
class x extends m {
  render(e) {
    let t = "try" + super.render(e);
    if (this.catch) {
      t += this.catch.render(e);
    }
    if (this.finally) {
      t += this.finally.render(e);
    }
    return t;
  }
  optimizeNodes() {
    var e;
    var t;
    super.optimizeNodes();
    if (null === (e = this.catch) || undefined === e) {
      e.optimizeNodes();
    }
    if (null === (t = this.finally) || undefined === t) {
      t.optimizeNodes();
    }
    return this;
  }
  optimizeNames(e, t) {
    var r;
    var n;
    super.optimizeNames(e, t);
    if (null === (r = this.catch) || undefined === r) {
      r.optimizeNames(e, t);
    }
    if (null === (n = this.finally) || undefined === n) {
      n.optimizeNames(e, t);
    }
    return this;
  }
  get names() {
    const e = super.names;
    if (this.catch) {
      A(e, this.catch.names);
    }
    if (this.finally) {
      A(e, this.finally.names);
    }
    return e;
  }
}
class k extends m {
  constructor(e) {
    super();
    this.error = e;
  }
  render(e) {
    return `catch(${this.error})` + super.render(e);
  }
}
k.kind = "catch";
class I extends m {
  render(e) {
    return "finally" + super.render(e);
  }
}
function A(e, t) {
  for (const r in t) e[r] = (e[r] || 0) + (t[r] || 0);
  return e;
}
function P(e, t) {
  return t instanceof M_CodeGenerationUtils_maybe._CodeOrName
    ? A(e, t.names)
    : e;
}
function R(e, t, r) {
  return e instanceof M_CodeGenerationUtils_maybe.Name
    ? o(e)
    : (i = e) instanceof M_CodeGenerationUtils_maybe._Code &&
      i._items.some(
        (e) =>
          e instanceof M_CodeGenerationUtils_maybe.Name &&
          1 === t[e.str] &&
          undefined !== r[e.str]
      )
    ? new M_CodeGenerationUtils_maybe._Code(
        e._items.reduce(
          (e, t) => (
            t instanceof M_CodeGenerationUtils_maybe.Name && (t = o(t)),
            t instanceof M_CodeGenerationUtils_maybe._Code
              ? e.push(...t._items)
              : e.push(t),
            e
          ),
          []
        )
      )
    : e;
  var i;
  function o(e) {
    const n = r[e.str];
    return undefined === n || 1 !== t[e.str] ? e : (delete t[e.str], n);
  }
}
function N(e, t) {
  for (const r in t) e[r] = (e[r] || 0) - (t[r] || 0);
}
function not(e) {
  return "boolean" == typeof e || "number" == typeof e || null === e
    ? !e
    : M_CodeGenerationUtils_maybe._`!${B(e)}`;
}
I.kind = "finally";
exports.CodeGen = class {
  constructor(e, t = {}) {
    this._values = {};
    this._blockStarts = [];
    this._constants = {};
    this.opts = {
      ...t,
      _n: t.lines ? "\n" : "",
    };
    this._extScope = e;
    this._scope = new M_ValueScopeManager_maybe.Scope({
      parent: e,
    });
    this._nodes = [new y()];
  }
  toString() {
    return this._root.render(this.opts);
  }
  name(e) {
    return this._scope.name(e);
  }
  scopeName(e) {
    return this._extScope.name(e);
  }
  scopeValue(e, t) {
    const r = this._extScope.value(e, t);
    (this._values[r.prefix] || (this._values[r.prefix] = new Set())).add(r);
    return r;
  }
  getScopeValue(e, t) {
    return this._extScope.getValue(e, t);
  }
  scopeRefs(e) {
    return this._extScope.scopeRefs(e, this._values);
  }
  scopeCode() {
    return this._extScope.scopeCode(this._values);
  }
  _def(e, t, r, n) {
    const i = this._scope.toName(t);
    if (undefined !== r && n) {
      this._constants[i.str] = r;
    }
    this._leafNode(new c(e, i, r));
    return i;
  }
  const(e, t, r) {
    return this._def(M_ValueScopeManager_maybe.varKinds.const, e, t, r);
  }
  let(e, t, r) {
    return this._def(M_ValueScopeManager_maybe.varKinds.let, e, t, r);
  }
  var(e, t, r) {
    return this._def(M_ValueScopeManager_maybe.varKinds.var, e, t, r);
  }
  assign(e, t, r) {
    return this._leafNode(new l(e, t, r));
  }
  add(e, r) {
    return this._leafNode(new u(e, exports.operators.ADD, r));
  }
  code(e) {
    if ("function" == typeof e) {
      e();
    } else {
      if (e !== M_CodeGenerationUtils_maybe.nil) {
        this._leafNode(new f(e));
      }
    }
    return this;
  }
  object(...e) {
    const t = ["{"];
    for (const [r, i] of e) {
      if (t.length > 1) {
        t.push(",");
      }
      t.push(r);
      if (r !== i || this.opts.es5) {
        t.push(":");
        M_CodeGenerationUtils_maybe.addCodeArg(t, i);
      }
    }
    t.push("}");
    return new M_CodeGenerationUtils_maybe._Code(t);
  }
  if(e, t, r) {
    this._blockNode(new _(e));
    if (t && r) this.code(t).else().code(r).endIf();
    else if (t) this.code(t).endIf();
    else if (r) throw new Error('CodeGen: "else" body without "then" body');
    return this;
  }
  elseIf(e) {
    return this._elseNode(new _(e));
  }
  else() {
    return this._elseNode(new v());
  }
  endIf() {
    return this._endBlockNode(_, v);
  }
  _for(e, t) {
    this._blockNode(e);
    if (t) {
      this.code(t).endFor();
    }
    return this;
  }
  for(e, t) {
    return this._for(new w(e), t);
  }
  forRange(
    e,
    t,
    r,
    n,
    o = this.opts.es5
      ? M_ValueScopeManager_maybe.varKinds.var
      : M_ValueScopeManager_maybe.varKinds.let
  ) {
    const s = this._scope.toName(e);
    return this._for(new C(o, s, t, r), () => n(s));
  }
  forOf(e, t, r, o = M_ValueScopeManager_maybe.varKinds.const) {
    const s = this._scope.toName(e);
    if (this.opts.es5) {
      const e =
        t instanceof M_CodeGenerationUtils_maybe.Name ? t : this.var("_arr", t);
      return this.forRange(
        "_i",
        0,
        M_CodeGenerationUtils_maybe._`${e}.length`,
        (t) => {
          this.var(s, M_CodeGenerationUtils_maybe._`${e}[${t}]`);
          r(s);
        }
      );
    }
    return this._for(new E("of", o, s, t), () => r(s));
  }
  forIn(
    e,
    t,
    r,
    o = this.opts.es5
      ? M_ValueScopeManager_maybe.varKinds.var
      : M_ValueScopeManager_maybe.varKinds.const
  ) {
    if (this.opts.ownProperties)
      return this.forOf(e, M_CodeGenerationUtils_maybe._`Object.keys(${t})`, r);
    const s = this._scope.toName(e);
    return this._for(new E("in", o, s, t), () => r(s));
  }
  endFor() {
    return this._endBlockNode(b);
  }
  label(e) {
    return this._leafNode(new d(e));
  }
  break(e) {
    return this._leafNode(new p(e));
  }
  return(e) {
    const t = new S();
    this._blockNode(t);
    this.code(e);
    if (1 !== t.nodes.length)
      throw new Error('CodeGen: "return" should have one node');
    return this._endBlockNode(S);
  }
  try(e, t, r) {
    if (!t && !r)
      throw new Error('CodeGen: "try" without "catch" and "finally"');
    const n = new x();
    this._blockNode(n);
    this.code(e);
    if (t) {
      const e = this.name("e");
      (this._currNode = n.catch = new k(e)), t(e);
    }
    if (r) {
      this._currNode = n.finally = new I();
      this.code(r);
    }
    return this._endBlockNode(k, I);
  }
  throw(e) {
    return this._leafNode(new h(e));
  }
  block(e, t) {
    this._blockStarts.push(this._nodes.length);
    if (e) {
      this.code(e).endBlock(t);
    }
    return this;
  }
  endBlock(e) {
    const t = this._blockStarts.pop();
    if (undefined === t)
      throw new Error("CodeGen: not in self-balancing block");
    const r = this._nodes.length - t;
    if (r < 0 || (undefined !== e && r !== e))
      throw new Error(`CodeGen: wrong number of nodes: ${r} vs ${e} expected`);
    this._nodes.length = t;
    return this;
  }
  func(e, t = M_CodeGenerationUtils_maybe.nil, r, i) {
    this._blockNode(new T(e, t, r));
    if (i) {
      this.code(i).endFunc();
    }
    return this;
  }
  endFunc() {
    return this._endBlockNode(T);
  }
  optimize(e = 1) {
    for (; e-- > 0; ) {
      this._root.optimizeNodes();
      this._root.optimizeNames(this._root.names, this._constants);
    }
  }
  _leafNode(e) {
    this._currNode.nodes.push(e);
    return this;
  }
  _blockNode(e) {
    this._currNode.nodes.push(e);
    this._nodes.push(e);
  }
  _endBlockNode(e, t) {
    const r = this._currNode;
    if (r instanceof e || (t && r instanceof t)) {
      this._nodes.pop();
      return this;
    }
    throw new Error(
      `CodeGen: not in block "${t ? `${e.kind}/${t.kind}` : e.kind}"`
    );
  }
  _elseNode(e) {
    const t = this._currNode;
    if (!(t instanceof _)) throw new Error('CodeGen: "else" without "if"');
    this._currNode = t.else = e;
    return this;
  }
  get _root() {
    return this._nodes[0];
  }
  get _currNode() {
    const e = this._nodes;
    return e[e.length - 1];
  }
  set _currNode(e) {
    const t = this._nodes;
    t[t.length - 1] = e;
  }
};
exports.not = not;
const L = M(exports.operators.AND);
exports.and = function (...e) {
  return e.reduce(L);
};
const D = M(exports.operators.OR);
function M(e) {
  return (t, r) =>
    t === M_CodeGenerationUtils_maybe.nil
      ? r
      : r === M_CodeGenerationUtils_maybe.nil
      ? t
      : M_CodeGenerationUtils_maybe._`${B(t)} ${e} ${B(r)}`;
}
function B(e) {
  return e instanceof M_CodeGenerationUtils_maybe.Name
    ? e
    : M_CodeGenerationUtils_maybe._`(${e})`;
}
exports.or = function (...e) {
  return e.reduce(D);
};
