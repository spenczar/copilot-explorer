Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.CodeGen =
  exports.Name =
  exports.nil =
  exports.stringify =
  exports.str =
  exports._ =
  exports.KeywordCxt =
    undefined;
var M_schema_validation_utils_maybe = require("schema-validation-utils");
exports.KeywordCxt = M_schema_validation_utils_maybe.KeywordCxt;
var M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
exports._ = M_LanguageMarkerConstants_maybe._;
exports.str = M_LanguageMarkerConstants_maybe.str;
exports.stringify = M_LanguageMarkerConstants_maybe.stringify;
exports.nil = M_LanguageMarkerConstants_maybe.nil;
exports.Name = M_LanguageMarkerConstants_maybe.Name;
exports.CodeGen = M_LanguageMarkerConstants_maybe.CodeGen;
const M_ValidationErrorManager_maybe = require("ValidationErrorManager");
const M_ReferenceResolutionErrorManager_maybe = require("ReferenceResolutionErrorManager");
const M_JSON_type_validator_maybe = require("JSON-type-validator");
const M_schema_compiler_utils_maybe = require("schema-compiler-utils");
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_SchemaRefResolver_maybe = require("SchemaRefResolver");
const M_data_type_validator_maybe = require("data-type-validator");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const M_data_ref_schema_parser_maybe = require("data-ref-schema-parser");
const M_ajv_runtime_uri_module_maybe = require("ajv-runtime-uri-module");
const g = (e, t) => new RegExp(e, t);
g.code = "new RegExp";
const m = ["removeAdditional", "useDefaults", "coerceTypes"];
const y = new Set([
  "validate",
  "serialize",
  "parse",
  "wrapper",
  "root",
  "schema",
  "keyword",
  "pattern",
  "formats",
  "validate$data",
  "func",
  "obj",
  "Error",
]);
const v = {
  errorDataPath: "",
  format: "`validateFormats: false` can be used instead.",
  nullable: '"nullable" keyword is supported by default.',
  jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
  extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
  missingRefs:
    "Pass empty schema with $id that should be ignored to ajv.addSchema.",
  processCode:
    "Use option `code: {process: (code, schemaEnv: object) => string}`",
  sourceCode: "Use option `code: {source: true}`",
  strictDefaults: "It is default now, see option `strict`.",
  strictKeywords: "It is default now, see option `strict`.",
  uniqueItems: '"uniqueItems" keyword is always validated.',
  unknownFormats:
    "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
  cache: "Map is used as cache, schema object as key.",
  serialize: "Map is used as cache, schema object as key.",
  ajvErrors: "It is default now.",
};
const _ = {
  ignoreKeywordsWithRef: "",
  jsPropertySyntax: "",
  unicode: '"minLength"/"maxLength" account for unicode characters by default.',
};
function b(e) {
  var t;
  var r;
  var n;
  var i;
  var o;
  var s;
  var a;
  var c;
  var l;
  var u;
  var d;
  var p;
  var h;
  var m;
  var y;
  var v;
  var _;
  var b;
  var w;
  var C;
  var E;
  var T;
  var S;
  var x;
  var k;
  const I = e.strict;
  const A = null === (t = e.code) || undefined === t ? undefined : t.optimize;
  const P = true === A || undefined === A ? 1 : A || 0;
  const R =
    null !==
      (n = null === (r = e.code) || undefined === r ? undefined : r.regExp) &&
    undefined !== n
      ? n
      : g;
  const N =
    null !== (i = e.uriResolver) && undefined !== i
      ? i
      : M_ajv_runtime_uri_module_maybe.default;
  return {
    strictSchema:
      null === (s = null !== (o = e.strictSchema) && undefined !== o ? o : I) ||
      undefined === s ||
      s,
    strictNumbers:
      null ===
        (c = null !== (a = e.strictNumbers) && undefined !== a ? a : I) ||
      undefined === c ||
      c,
    strictTypes:
      null !== (u = null !== (l = e.strictTypes) && undefined !== l ? l : I) &&
      undefined !== u
        ? u
        : "log",
    strictTuples:
      null !== (p = null !== (d = e.strictTuples) && undefined !== d ? d : I) &&
      undefined !== p
        ? p
        : "log",
    strictRequired:
      null !==
        (m = null !== (h = e.strictRequired) && undefined !== h ? h : I) &&
      undefined !== m &&
      m,
    code: e.code
      ? {
          ...e.code,
          optimize: P,
          regExp: R,
        }
      : {
          optimize: P,
          regExp: R,
        },
    loopRequired: null !== (y = e.loopRequired) && undefined !== y ? y : 200,
    loopEnum: null !== (v = e.loopEnum) && undefined !== v ? v : 200,
    meta: null === (_ = e.meta) || undefined === _ || _,
    messages: null === (b = e.messages) || undefined === b || b,
    inlineRefs: null === (w = e.inlineRefs) || undefined === w || w,
    schemaId: null !== (C = e.schemaId) && undefined !== C ? C : "$id",
    addUsedSchema: null === (E = e.addUsedSchema) || undefined === E || E,
    validateSchema: null === (T = e.validateSchema) || undefined === T || T,
    validateFormats: null === (S = e.validateFormats) || undefined === S || S,
    unicodeRegExp: null === (x = e.unicodeRegExp) || undefined === x || x,
    int32range: null === (k = e.int32range) || undefined === k || k,
    uriResolver: N,
  };
}
class w {
  constructor(e = {}) {
    this.schemas = {};
    this.refs = {};
    this.formats = {};
    this._compilations = new Set();
    this._loading = {};
    this._cache = new Map();
    e = this.opts = {
      ...e,
      ...b(e),
    };
    const { es5: t, lines: r } = this.opts.code;
    this.scope = new M_LanguageMarkerConstants_maybe.ValueScope({
      scope: {},
      prefixes: y,
      es5: t,
      lines: r,
    });
    this.logger = (function (e) {
      if (false === e) return I;
      if (undefined === e) return console;
      if (e.log && e.warn && e.error) return e;
      throw new Error("logger must implement log, warn and error methods");
    })(e.logger);
    const n = e.validateFormats;
    e.validateFormats = false;
    this.RULES = M_JSON_type_validator_maybe.getRules();
    C.call(this, v, e, "NOT SUPPORTED");
    C.call(this, _, e, "DEPRECATED", "warn");
    this._metaOpts = k.call(this);
    if (e.formats) {
      S.call(this);
    }
    this._addVocabularies();
    this._addDefaultMetaSchema();
    if (e.keywords) {
      x.call(this, e.keywords);
    }
    if ("object" == typeof e.meta) {
      this.addMetaSchema(e.meta);
    }
    T.call(this);
    e.validateFormats = n;
  }
  _addVocabularies() {
    this.addKeyword("$async");
  }
  _addDefaultMetaSchema() {
    const { $data: e, meta: t, schemaId: r } = this.opts;
    let n = M_data_ref_schema_parser_maybe;
    if ("id" === r) {
      n = {
        ...M_data_ref_schema_parser_maybe,
      };
      n.id = n.$id;
      delete n.$id;
    }
    if (t && e) {
      this.addMetaSchema(n, n[r], false);
    }
  }
  defaultMeta() {
    const { meta: e, schemaId: t } = this.opts;
    return (this.opts.defaultMeta =
      "object" == typeof e ? e[t] || e : undefined);
  }
  validate(e, t) {
    let r;
    if ("string" == typeof e) {
      r = this.getSchema(e);
      if (!r) throw new Error(`no schema with key or ref "${e}"`);
    } else r = this.compile(e);
    const n = r(t);
    if ("$async" in r) {
      this.errors = r.errors;
    }
    return n;
  }
  compile(e, t) {
    const r = this._addSchema(e, t);
    return r.validate || this._compileSchemaEnv(r);
  }
  compileAsync(e, t) {
    if ("function" != typeof this.opts.loadSchema)
      throw new Error("options.loadSchema should be a function");
    const { loadSchema: r } = this.opts;
    return n.call(this, e, t);
    async function n(e, t) {
      await i.call(this, e.$schema);
      const r = this._addSchema(e, t);
      return r.validate || o.call(this, r);
    }
    async function i(e) {
      if (e && !this.getSchema(e)) {
        await n.call(
          this,
          {
            $ref: e,
          },
          true
        );
      }
    }
    async function o(e) {
      try {
        return this._compileSchemaEnv(e);
      } catch (t) {
        if (!(t instanceof M_ReferenceResolutionErrorManager_maybe.default))
          throw t;
        a.call(this, t);
        await c.call(this, t.missingSchema);
        return o.call(this, e);
      }
    }
    function a({ missingSchema: e, missingRef: t }) {
      if (this.refs[e])
        throw new Error(`AnySchema ${e} is loaded but ${t} cannot be resolved`);
    }
    async function c(e) {
      const r = await l.call(this, e);
      if (this.refs[e]) {
        await i.call(this, r.$schema);
      }
      if (this.refs[e]) {
        this.addSchema(r, e, t);
      }
    }
    async function l(e) {
      const t = this._loading[e];
      if (t) return t;
      try {
        return await (this._loading[e] = r(e));
      } finally {
        delete this._loading[e];
      }
    }
  }
  addSchema(e, t, r, n = this.opts.validateSchema) {
    if (Array.isArray(e)) {
      for (const t of e) this.addSchema(t, undefined, r, n);
      return this;
    }
    let i;
    if ("object" == typeof e) {
      const { schemaId: t } = this.opts;
      i = e[t];
      if (void 0 !== i && "string" != typeof i)
        throw new Error(`schema ${t} must be string`);
    }
    t = M_SchemaRefResolver_maybe.normalizeId(t || i);
    this._checkUnique(t);
    this.schemas[t] = this._addSchema(e, r, t, n, true);
    return this;
  }
  addMetaSchema(e, t, r = this.opts.validateSchema) {
    this.addSchema(e, t, true, r);
    return this;
  }
  validateSchema(e, t) {
    if ("boolean" == typeof e) return true;
    let r;
    r = e.$schema;
    if (void 0 !== r && "string" != typeof r)
      throw new Error("$schema must be a string");
    r = r || this.opts.defaultMeta || this.defaultMeta();
    if (!r)
      return (
        this.logger.warn("meta-schema not available"), (this.errors = null), !0
      );
    const n = this.validate(r, e);
    if (!n && t) {
      const e = "schema is invalid: " + this.errorsText();
      if ("log" !== this.opts.validateSchema) throw new Error(e);
      this.logger.error(e);
    }
    return n;
  }
  getSchema(e) {
    let t;
    for (; "string" == typeof (t = E.call(this, e)); ) e = t;
    if (undefined === t) {
      const { schemaId: r } = this.opts;
      const n = new M_schema_compiler_utils_maybe.SchemaEnv({
        schema: {},
        schemaId: r,
      });
      t = M_schema_compiler_utils_maybe.resolveSchema.call(this, n, e);
      if (!t) return;
      this.refs[e] = t;
    }
    return t.validate || this._compileSchemaEnv(t);
  }
  removeSchema(e) {
    if (e instanceof RegExp) {
      this._removeAllSchemas(this.schemas, e);
      this._removeAllSchemas(this.refs, e);
      return this;
    }
    switch (typeof e) {
      case "undefined":
        this._removeAllSchemas(this.schemas);
        this._removeAllSchemas(this.refs);
        this._cache.clear();
        return this;
      case "string": {
        const t = E.call(this, e);
        if ("object" == typeof t) {
          this._cache.delete(t.schema);
        }
        delete this.schemas[e];
        delete this.refs[e];
        return this;
      }
      case "object": {
        const t = e;
        this._cache.delete(t);
        let r = e[this.opts.schemaId];
        if (r) {
          r = M_SchemaRefResolver_maybe.normalizeId(r);
          delete this.schemas[r];
          delete this.refs[r];
        }
        return this;
      }
      default:
        throw new Error("ajv.removeSchema: invalid parameter");
    }
  }
  addVocabulary(e) {
    for (const t of e) this.addKeyword(t);
    return this;
  }
  addKeyword(e, t) {
    let r;
    if ("string" == typeof e) {
      r = e;
      if ("object" == typeof t) {
        this.logger.warn(
          "these parameters are deprecated, see docs for addKeyword"
        );
        t.keyword = r;
      }
    } else {
      if ("object" != typeof e || undefined !== t)
        throw new Error("invalid addKeywords parameters");
      r = (t = e).keyword;
      if (Array.isArray(r) && !r.length)
        throw new Error(
          "addKeywords: keyword must be string or non-empty array"
        );
    }
    P.call(this, r, t);
    if (!t)
      return (
        (0, M_json_pointer_utils_maybe.eachItem)(r, (e) => R.call(this, e)),
        this
      );
    O.call(this, t);
    const n = {
      ...t,
      type: M_data_type_validator_maybe.getJSONTypes(t.type),
      schemaType: M_data_type_validator_maybe.getJSONTypes(t.schemaType),
    };
    M_json_pointer_utils_maybe.eachItem(
      r,
      0 === n.type.length
        ? (e) => R.call(this, e, n)
        : (e) => n.type.forEach((t) => R.call(this, e, n, t))
    );
    return this;
  }
  getKeyword(e) {
    const t = this.RULES.all[e];
    return "object" == typeof t ? t.definition : !!t;
  }
  removeKeyword(e) {
    const { RULES: t } = this;
    delete t.keywords[e];
    delete t.all[e];
    for (const r of t.rules) {
      const t = r.rules.findIndex((t) => t.keyword === e);
      if (t >= 0) {
        r.rules.splice(t, 1);
      }
    }
    return this;
  }
  addFormat(e, t) {
    if ("string" == typeof t) {
      t = new RegExp(t);
    }
    this.formats[e] = t;
    return this;
  }
  errorsText(
    e = this.errors,
    { separator: t = ", ", dataVar: r = "data" } = {}
  ) {
    return e && 0 !== e.length
      ? e
          .map((e) => `${r}${e.instancePath} ${e.message}`)
          .reduce((e, r) => e + t + r)
      : "No errors";
  }
  $dataMetaSchema(e, t) {
    const r = this.RULES.all;
    e = JSON.parse(JSON.stringify(e));
    for (const n of t) {
      const t = n.split("/").slice(1);
      let i = e;
      for (const e of t) i = i[e];
      for (const e in r) {
        const t = r[e];
        if ("object" != typeof t) continue;
        const { $data: n } = t.definition;
        const o = i[e];
        if (n && o) {
          i[e] = D(o);
        }
      }
    }
    return e;
  }
  _removeAllSchemas(e, t) {
    for (const r in e) {
      const n = e[r];
      if (t && !t.test(r)) {
        if ("string" == typeof n) {
          delete e[r];
        } else {
          if (n && !n.meta) {
            this._cache.delete(n.schema);
            delete e[r];
          }
        }
      }
    }
  }
  _addSchema(
    e,
    t,
    r,
    n = this.opts.validateSchema,
    i = this.opts.addUsedSchema
  ) {
    let o;
    const { schemaId: s } = this.opts;
    if ("object" == typeof e) o = e[s];
    else {
      if (this.opts.jtd) throw new Error("schema must be object");
      if ("boolean" != typeof e)
        throw new Error("schema must be object or boolean");
    }
    let a = this._cache.get(e);
    if (undefined !== a) return a;
    r = M_SchemaRefResolver_maybe.normalizeId(o || r);
    const l = M_SchemaRefResolver_maybe.getSchemaRefs.call(this, e, r);
    a = new M_schema_compiler_utils_maybe.SchemaEnv({
      schema: e,
      schemaId: s,
      meta: t,
      baseId: r,
      localRefs: l,
    });
    this._cache.set(a.schema, a);
    if (i && !r.startsWith("#")) {
      if (r) {
        this._checkUnique(r);
      }
      this.refs[r] = a;
    }
    if (n) {
      this.validateSchema(e, true);
    }
    return a;
  }
  _checkUnique(e) {
    if (this.schemas[e] || this.refs[e])
      throw new Error(`schema with key or id "${e}" already exists`);
  }
  _compileSchemaEnv(e) {
    if (e.meta) {
      this._compileMetaSchema(e);
    } else {
      M_schema_compiler_utils_maybe.compileSchema.call(this, e);
    }
    if (!e.validate) throw new Error("ajv implementation error");
    return e.validate;
  }
  _compileMetaSchema(e) {
    const t = this.opts;
    this.opts = this._metaOpts;
    try {
      M_schema_compiler_utils_maybe.compileSchema.call(this, e);
    } finally {
      this.opts = t;
    }
  }
}
function C(e, t, r, n = "error") {
  for (const i in e) {
    const o = i;
    if (o in t) {
      this.logger[n](`${r}: option ${i}. ${e[o]}`);
    }
  }
}
function E(e) {
  e = M_SchemaRefResolver_maybe.normalizeId(e);
  return this.schemas[e] || this.refs[e];
}
function T() {
  const e = this.opts.schemas;
  if (e)
    if (Array.isArray(e)) this.addSchema(e);
    else for (const t in e) this.addSchema(e[t], t);
}
function S() {
  for (const e in this.opts.formats) {
    const t = this.opts.formats[e];
    if (t) {
      this.addFormat(e, t);
    }
  }
}
function x(e) {
  if (Array.isArray(e)) this.addVocabulary(e);
  else {
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const t in e) {
      const r = e[t];
      if (r.keyword) {
        r.keyword = t;
      }
      this.addKeyword(r);
    }
  }
}
function k() {
  const e = {
    ...this.opts,
  };
  for (const t of m) delete e[t];
  return e;
}
exports.default = w;
w.ValidationError = M_ValidationErrorManager_maybe.default;
w.MissingRefError = M_ReferenceResolutionErrorManager_maybe.default;
const I = {
  log() {},
  warn() {},
  error() {},
};
const A = /^[a-z_$][a-z0-9_$:-]*$/i;
function P(e, t) {
  const { RULES: r } = this;
  M_json_pointer_utils_maybe.eachItem(e, (e) => {
    if (r.keywords[e]) throw new Error(`Keyword ${e} is already defined`);
    if (!A.test(e)) throw new Error(`Keyword ${e} has invalid name`);
  });
  if (t && t.$data && !("code" in t) && !("validate" in t))
    throw new Error('$data keyword must have "code" or "validate" function');
}
function R(e, t, r) {
  var n;
  const i = null == t ? undefined : t.post;
  if (r && i) throw new Error('keyword with "post" flag cannot have "type"');
  const { RULES: o } = this;
  let s = i ? o.post : o.rules.find(({ type: e }) => e === r);
  if (s) {
    s = {
      type: r,
      rules: [],
    };
    o.rules.push(s);
  }
  o.keywords[e] = true;
  if (!t) return;
  const a = {
    keyword: e,
    definition: {
      ...t,
      type: M_data_type_validator_maybe.getJSONTypes(t.type),
      schemaType: M_data_type_validator_maybe.getJSONTypes(t.schemaType),
    },
  };
  if (t.before) {
    N.call(this, s, a, t.before);
  } else {
    s.rules.push(a);
  }
  o.all[e] = a;
  if (null === (n = t.implements) || undefined === n) {
    n.forEach((e) => this.addKeyword(e));
  }
}
function N(e, t, r) {
  const n = e.rules.findIndex((e) => e.keyword === r);
  if (n >= 0) {
    e.rules.splice(n, 0, t);
  } else {
    e.rules.push(t);
    this.logger.warn(`rule ${r} is not defined`);
  }
}
function O(e) {
  let { metaSchema: t } = e;
  if (undefined !== t) {
    if (e.$data && this.opts.$data) {
      t = D(t);
    }
    e.validateSchema = this.compile(t, true);
  }
}
const L = {
  $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
};
function D(e) {
  return {
    anyOf: [e, L],
  };
}
