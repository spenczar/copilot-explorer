Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.resolveSchema =
  exports.getCompilingSchema =
  exports.resolveRef =
  exports.compileSchema =
  exports.SchemaEnv =
    undefined;
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_ValidationErrorManager_maybe = require("ValidationErrorManager");
const M_language_marker_constants_maybe = require("language-marker-constants");
const M_SchemaRefResolver_maybe = require("SchemaRefResolver");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const M_schema_validation_utils_maybe = require("schema-validation-utils");
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
        : M_SchemaRefResolver_maybe.normalizeId(
            null == r ? undefined : r[e.schemaId || "$id"]
          );
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
  const r = M_SchemaRefResolver_maybe.getFullPath(
    this.opts.uriResolver,
    e.root.baseId
  );
  const { es5: a, lines: l } = this.opts.code;
  const { ownProperties: u } = this.opts;
  const d = new M_LanguageMarkerConstants_maybe.CodeGen(this.scope, {
    es5: a,
    lines: l,
    ownProperties: u,
  });
  let h;
  if (e.$async) {
    h = d.scopeValue("Error", {
      ref: M_ValidationErrorManager_maybe.default,
      code: M_LanguageMarkerConstants_maybe._`require("ajv/dist/runtime/validation_error").default`,
    });
  }
  const f = d.scopeName("validate");
  e.validateName = f;
  const g = {
    gen: d,
    allErrors: this.opts.allErrors,
    data: M_language_marker_constants_maybe.default.data,
    parentData: M_language_marker_constants_maybe.default.parentData,
    parentDataProperty:
      M_language_marker_constants_maybe.default.parentDataProperty,
    dataNames: [M_language_marker_constants_maybe.default.data],
    dataPathArr: [M_LanguageMarkerConstants_maybe.nil],
    dataLevel: 0,
    dataTypes: [],
    definedProperties: new Set(),
    topSchemaRef: d.scopeValue(
      "schema",
      true === this.opts.code.source
        ? {
            ref: e.schema,
            code: M_LanguageMarkerConstants_maybe.stringify(e.schema),
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
    schemaPath: M_LanguageMarkerConstants_maybe.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: M_LanguageMarkerConstants_maybe._`""`,
    opts: this.opts,
    self: this,
  };
  let m;
  try {
    this._compilations.add(e);
    M_schema_validation_utils_maybe.validateFunctionCode(g);
    d.optimize(this.opts.code.optimize);
    const t = d.toString();
    m = `${d.scopeRefs(
      M_language_marker_constants_maybe.default.scope
    )}return ${t}`;
    if (this.opts.code.process) {
      m = this.opts.code.process(m, e);
    }
    const r = new Function(
      `${M_language_marker_constants_maybe.default.self}`,
      `${M_language_marker_constants_maybe.default.scope}`,
      m
    )(this, this.scope.get());
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
        props: e instanceof M_LanguageMarkerConstants_maybe.Name ? void 0 : e,
        items: t instanceof M_LanguageMarkerConstants_maybe.Name ? void 0 : t,
        dynamicProps: e instanceof M_LanguageMarkerConstants_maybe.Name,
        dynamicItems: t instanceof M_LanguageMarkerConstants_maybe.Name,
      }),
        r.source &&
          (r.source.evaluated = (0, M_LanguageMarkerConstants_maybe.stringify)(
            r.evaluated
          ));
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
  return M_SchemaRefResolver_maybe.inlineRef(e.schema, this.opts.inlineRefs)
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
  const n = M_SchemaRefResolver_maybe._getFullPath(this.opts.uriResolver, r);
  let i = M_SchemaRefResolver_maybe.getFullPath(
    this.opts.uriResolver,
    e.baseId,
    undefined
  );
  if (Object.keys(e.schema).length > 0 && n === i) return m.call(this, r, e);
  const o = M_SchemaRefResolver_maybe.normalizeId(n);
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
    if (o === (0, M_SchemaRefResolver_maybe.normalizeId)(t)) {
      const { schema: t } = a,
        { schemaId: r } = this.opts,
        n = t[r];
      return (
        n &&
          (i = (0, M_SchemaRefResolver_maybe.resolveUrl)(
            this.opts.uriResolver,
            i,
            n
          )),
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
  r = M_SchemaRefResolver_maybe.resolveUrl(this.opts.uriResolver, t, r);
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
    const e = r[M_json_pointer_utils_maybe.unescapeFragment(n)];
    if (undefined === e) return;
    const i = "object" == typeof (r = e) && r[this.opts.schemaId];
    if (!g.has(n) && i) {
      t = M_SchemaRefResolver_maybe.resolveUrl(this.opts.uriResolver, t, i);
    }
  }
  let o;
  if (
    "boolean" != typeof r &&
    r.$ref &&
    !M_json_pointer_utils_maybe.schemaHasRulesButRef(r, this.RULES)
  ) {
    const e = M_SchemaRefResolver_maybe.resolveUrl(
      this.opts.uriResolver,
      t,
      r.$ref
    );
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
