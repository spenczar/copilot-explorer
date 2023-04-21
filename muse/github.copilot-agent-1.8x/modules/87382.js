Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.resolveSchema =
  exports.getCompilingSchema =
  exports.resolveRef =
  exports.compileSchema =
  exports.SchemaEnv =
    undefined;
const n = require(15669);
const i = require(46448);
const o = require(17250);
const s = require(96696);
const a = require(88936);
const c = require(91686);
class SchemaEnv {
  constructor(e) {
    var t;
    let r;
    this.refs = {};
    this.dynamicAnchors = {};
    if ("object" == typeof e.schema) {
      r = e.schema;
    }
    this.schema = e.schema;
    this.schemaId = e.schemaId;
    this.root = e.root || this;
    this.baseId =
      null !== (t = e.baseId) && undefined !== t
        ? t
        : s.normalizeId(null == r ? undefined : r[e.schemaId || "$id"]);
    this.schemaPath = e.schemaPath;
    this.localRefs = e.localRefs;
    this.meta = e.meta;
    this.$async = null == r ? undefined : r.$async;
    this.refs = {};
  }
}
function compileSchema(e) {
  const t = getCompilingSchema.call(this, e);
  if (t) return t;
  const r = s.getFullPath(this.opts.uriResolver, e.root.baseId);
  const { es5: a, lines: l } = this.opts.code;
  const { ownProperties: u } = this.opts;
  const d = new n.CodeGen(this.scope, {
    es5: a,
    lines: l,
    ownProperties: u,
  });
  let h;
  if (e.$async) {
    h = d.scopeValue("Error", {
      ref: i.default,
      code: n._`require("ajv/dist/runtime/validation_error").default`,
    });
  }
  const f = d.scopeName("validate");
  e.validateName = f;
  const g = {
    gen: d,
    allErrors: this.opts.allErrors,
    data: o.default.data,
    parentData: o.default.parentData,
    parentDataProperty: o.default.parentDataProperty,
    dataNames: [o.default.data],
    dataPathArr: [n.nil],
    dataLevel: 0,
    dataTypes: [],
    definedProperties: new Set(),
    topSchemaRef: d.scopeValue(
      "schema",
      true === this.opts.code.source
        ? {
            ref: e.schema,
            code: n.stringify(e.schema),
          }
        : {
            ref: e.schema,
          }
    ),
    validateName: f,
    ValidationError: h,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: n.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: n._`""`,
    opts: this.opts,
    self: this,
  };
  let m;
  try {
    this._compilations.add(e);
    c.validateFunctionCode(g);
    d.optimize(this.opts.code.optimize);
    const t = d.toString();
    m = `${d.scopeRefs(o.default.scope)}return ${t}`;
    if (this.opts.code.process) {
      m = this.opts.code.process(m, e);
    }
    const r = new Function(`${o.default.self}`, `${o.default.scope}`, m)(
      this,
      this.scope.get()
    );
    this.scope.value(f, {
      ref: r,
    });
    r.errors = null;
    r.schema = e.schema;
    r.schemaEnv = e;
    if (e.$async) {
      r.$async = true;
    }
    if (true === this.opts.code.source) {
      r.source = {
        validateName: f,
        validateCode: t,
        scopeValues: d._values,
      };
    }
    if (this.opts.unevaluated) {
      const { props: e, items: t } = g;
      (r.evaluated = {
        props: e instanceof n.Name ? void 0 : e,
        items: t instanceof n.Name ? void 0 : t,
        dynamicProps: e instanceof n.Name,
        dynamicItems: t instanceof n.Name,
      }),
        r.source && (r.source.evaluated = (0, n.stringify)(r.evaluated));
    }
    e.validate = r;
    return e;
  } catch (t) {
    throw (
      (delete e.validate,
      delete e.validateName,
      m && this.logger.error("Error compiling schema, function code:", m),
      t)
    );
  } finally {
    this._compilations.delete(e);
  }
}
function d(e) {
  return s.inlineRef(e.schema, this.opts.inlineRefs)
    ? e.schema
    : e.validate
    ? e
    : compileSchema.call(this, e);
}
function getCompilingSchema(e) {
  for (const n of this._compilations) {
    r = e;
    if (
      (t = n).schema === r.schema &&
      t.root === r.root &&
      t.baseId === r.baseId
    )
      return n;
  }
  var t;
  var r;
}
function h(e, t) {
  let r;
  for (; "string" == typeof (r = this.refs[t]); ) t = r;
  return r || this.schemas[t] || resolveSchema.call(this, e, t);
}
function resolveSchema(e, t) {
  const r = this.opts.uriResolver.parse(t);
  const n = s._getFullPath(this.opts.uriResolver, r);
  let i = s.getFullPath(this.opts.uriResolver, e.baseId, undefined);
  if (Object.keys(e.schema).length > 0 && n === i) return m.call(this, r, e);
  const o = s.normalizeId(n);
  const a = this.refs[o] || this.schemas[o];
  if ("string" == typeof a) {
    const t = resolveSchema.call(this, e, a);
    if ("object" != typeof (null == t ? undefined : t.schema)) return;
    return m.call(this, r, t);
  }
  if ("object" == typeof (null == a ? undefined : a.schema)) {
    if (a.validate) {
      compileSchema.call(this, a);
    }
    if (o === (0, s.normalizeId)(t)) {
      const { schema: t } = a,
        { schemaId: r } = this.opts,
        n = t[r];
      return (
        n && (i = (0, s.resolveUrl)(this.opts.uriResolver, i, n)),
        new SchemaEnv({
          schema: t,
          schemaId: r,
          root: e,
          baseId: i,
        })
      );
    }
    return m.call(this, r, a);
  }
}
exports.SchemaEnv = SchemaEnv;
exports.compileSchema = compileSchema;
exports.resolveRef = function (e, t, r) {
  var n;
  r = s.resolveUrl(this.opts.uriResolver, t, r);
  const i = e.refs[r];
  if (i) return i;
  let o = h.call(this, e, r);
  if (undefined === o) {
    const i = null === (n = e.localRefs) || undefined === n ? undefined : n[r];
    const { schemaId: s } = this.opts;
    if (i) {
      o = new SchemaEnv({
        schema: i,
        schemaId: s,
        root: e,
        baseId: t,
      });
    }
  }
  return undefined !== o ? (e.refs[r] = d.call(this, o)) : undefined;
};
exports.getCompilingSchema = getCompilingSchema;
exports.resolveSchema = resolveSchema;
const g = new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions",
]);
function m(e, { baseId: t, schema: r, root: n }) {
  var i;
  if ("/" !== (null === (i = e.fragment) || undefined === i ? undefined : i[0]))
    return;
  for (const n of e.fragment.slice(1).split("/")) {
    if ("boolean" == typeof r) return;
    const e = r[a.unescapeFragment(n)];
    if (undefined === e) return;
    const i = "object" == typeof (r = e) && r[this.opts.schemaId];
    if (!g.has(n) && i) {
      t = s.resolveUrl(this.opts.uriResolver, t, i);
    }
  }
  let o;
  if (
    "boolean" != typeof r &&
    r.$ref &&
    !a.schemaHasRulesButRef(r, this.RULES)
  ) {
    const e = s.resolveUrl(this.opts.uriResolver, t, r.$ref);
    o = resolveSchema.call(this, n, e);
  }
  const { schemaId: c } = this.opts;
  o =
    o ||
    new SchemaEnv({
      schema: r,
      schemaId: c,
      root: n,
      baseId: t,
    });
  return o.schema !== o.root.schema ? o : undefined;
}