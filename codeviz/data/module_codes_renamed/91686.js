Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getData = exports.KeywordCxt = exports.validateFunctionCode = undefined;
const M_boolOrEmptySchemaManager_maybe = require("boolOrEmptySchemaManager");
const M_data_type_validator_maybe = require("data-type-validator");
const M_RuleCheckerUtils_maybe = require("RuleCheckerUtils");
const M_data_type_validator_maybe = require("data-type-validator");
const M_default_value_assigner_maybe = require("default-value-assigner");
const M_keyword_validation_utils_maybe = require("keyword-validation-utils");
const M_SubschemaExtender_maybe = require("SubschemaExtender");
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_language_marker_constants_maybe = require("language-marker-constants");
const M_SchemaRefResolver_maybe = require("SchemaRefResolver");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const M_ErrorReportingManager_maybe = require("ErrorReportingManager");
function g({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: i }, o) {
  if (i.code.es5) {
    e.func(
      t,
      M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.data}, ${M_language_marker_constants_maybe.default.valCxt}`,
      n.$async,
      () => {
        e.code(M_LanguageMarkerConstants_maybe._`"use strict"; ${m(r, i)}`);
        (function (e, t) {
          e.if(
            M_language_marker_constants_maybe.default.valCxt,
            () => {
              e.var(
                M_language_marker_constants_maybe.default.instancePath,
                M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.valCxt}.${M_language_marker_constants_maybe.default.instancePath}`
              );
              e.var(
                M_language_marker_constants_maybe.default.parentData,
                M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.valCxt}.${M_language_marker_constants_maybe.default.parentData}`
              );
              e.var(
                M_language_marker_constants_maybe.default.parentDataProperty,
                M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.valCxt}.${M_language_marker_constants_maybe.default.parentDataProperty}`
              );
              e.var(
                M_language_marker_constants_maybe.default.rootData,
                M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.valCxt}.${M_language_marker_constants_maybe.default.rootData}`
              );
              if (t.dynamicRef) {
                e.var(
                  M_language_marker_constants_maybe.default.dynamicAnchors,
                  M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.valCxt}.${M_language_marker_constants_maybe.default.dynamicAnchors}`
                );
              }
            },
            () => {
              e.var(
                M_language_marker_constants_maybe.default.instancePath,
                M_LanguageMarkerConstants_maybe._`""`
              );
              e.var(
                M_language_marker_constants_maybe.default.parentData,
                M_LanguageMarkerConstants_maybe._`undefined`
              );
              e.var(
                M_language_marker_constants_maybe.default.parentDataProperty,
                M_LanguageMarkerConstants_maybe._`undefined`
              );
              e.var(
                M_language_marker_constants_maybe.default.rootData,
                M_language_marker_constants_maybe.default.data
              );
              if (t.dynamicRef) {
                e.var(
                  M_language_marker_constants_maybe.default.dynamicAnchors,
                  M_LanguageMarkerConstants_maybe._`{}`
                );
              }
            }
          );
        })(e, i);
        e.code(o);
      }
    );
  } else {
    e.func(
      t,
      M_LanguageMarkerConstants_maybe._`${
        M_language_marker_constants_maybe.default.data
      }, ${(function (e) {
        return M_LanguageMarkerConstants_maybe._`{${
          M_language_marker_constants_maybe.default.instancePath
        }="", ${M_language_marker_constants_maybe.default.parentData}, ${
          M_language_marker_constants_maybe.default.parentDataProperty
        }, ${M_language_marker_constants_maybe.default.rootData}=${
          M_language_marker_constants_maybe.default.data
        }${
          e.dynamicRef
            ? M_LanguageMarkerConstants_maybe._`, ${M_language_marker_constants_maybe.default.dynamicAnchors}={}`
            : M_LanguageMarkerConstants_maybe.nil
        }}={}`;
      })(i)}`,
      n.$async,
      () => e.code(m(r, i)).code(o)
    );
  }
}
function m(e, t) {
  const r = "object" == typeof e && e[t.schemaId];
  return r && (t.code.source || t.code.process)
    ? M_LanguageMarkerConstants_maybe._`/*# sourceURL=${r} */`
    : M_LanguageMarkerConstants_maybe.nil;
}
function y({ schema: e, self: t }) {
  if ("boolean" == typeof e) return !e;
  for (const r in e) if (t.RULES.all[r]) return true;
  return false;
}
function v(e) {
  return "boolean" != typeof e.schema;
}
function _(e) {
  M_json_pointer_utils_maybe.checkUnknownRules(e);
  (function (e) {
    const { schema: t, errSchemaPath: r, opts: n, self: i } = e;
    if (
      t.$ref &&
      n.ignoreKeywordsWithRef &&
      M_json_pointer_utils_maybe.schemaHasRulesButRef(t, i.RULES)
    ) {
      i.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
    }
  })(e);
}
function b(e, t) {
  if (e.opts.jtd) return C(e, [], false, t);
  const r = M_data_type_validator_maybe.getSchemaTypes(e.schema);
  C(e, r, !M_data_type_validator_maybe.coerceAndCheckDataType(e, r), t);
}
function w({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: i }) {
  const o = r.$comment;
  if (true === i.$comment)
    e.code(
      M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.self}.logger.log(${o})`
    );
  else if ("function" == typeof i.$comment) {
    const r = M_LanguageMarkerConstants_maybe.str`${n}/$comment`;
    const i = e.scopeValue("root", {
      ref: t.root,
    });
    e.code(
      M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.self}.opts.$comment(${o}, ${r}, ${i}.schema)`
    );
  }
}
function C(e, t, r, n) {
  const { gen: i, schema: a, data: c, allErrors: l, opts: p, self: f } = e;
  const { RULES: g } = f;
  function m(h) {
    if (M_RuleCheckerUtils_maybe.shouldUseGroup(a, h)) {
      if (h.type) {
        i.if(
          M_data_type_validator_maybe.checkDataType(h.type, c, p.strictNumbers)
        );
        E(e, h);
        if (1 === t.length && t[0] === h.type && r) {
          i.else();
          M_data_type_validator_maybe.reportTypeError(e);
        }
        i.endIf();
      } else {
        E(e, h);
      }
      if (l) {
        i.if(
          M_LanguageMarkerConstants_maybe._`${
            M_language_marker_constants_maybe.default.errors
          } === ${n || 0}`
        );
      }
    }
  }
  if (
    !a.$ref ||
    (!p.ignoreKeywordsWithRef &&
      M_json_pointer_utils_maybe.schemaHasRulesButRef(a, g))
  ) {
    if (p.jtd) {
      (function (e, t) {
        if (!e.schemaEnv.meta && e.opts.strictTypes) {
          (function (e, t) {
            if (t.length) {
              if (e.dataTypes.length) {
                t.forEach((t) => {
                  if (T(e.dataTypes, t)) {
                    S(
                      e,
                      `type "${t}" not allowed by context "${e.dataTypes.join(
                        ","
                      )}"`
                    );
                  }
                });
                e.dataTypes = e.dataTypes.filter((e) => T(t, e));
              } else {
                e.dataTypes = t;
              }
            }
          })(e, t);
          if (e.opts.allowUnionTypes) {
            (function (e, t) {
              if (t.length > 1 && (2 !== t.length || !t.includes("null"))) {
                S(e, "use allowUnionTypes to allow union type keyword");
              }
            })(e, t);
          }
          (function (e, t) {
            const r = e.self.RULES.all;
            for (const n in r) {
              const i = r[n];
              if (
                "object" == typeof i &&
                M_RuleCheckerUtils_maybe.shouldUseRule(e.schema, i)
              ) {
                const { type: r } = i.definition;
                if (
                  r.length &&
                  !r.some((e) => {
                    n = e;
                    return (
                      (r = t).includes(n) ||
                      ("number" === n && r.includes("integer"))
                    );
                    var r;
                    var n;
                  })
                ) {
                  S(e, `missing type "${r.join(",")}" for keyword "${n}"`);
                }
              }
            }
          })(e, e.dataTypes);
        }
      })(e, t);
    }
    i.block(() => {
      for (const e of g.rules) m(e);
      m(g.post);
    });
  } else {
    i.block(() => k(e, "$ref", g.all.$ref.definition));
  }
}
function E(e, t) {
  const {
    gen: r,
    schema: n,
    opts: { useDefaults: i },
  } = e;
  if (i) {
    M_default_value_assigner_maybe.assignDefaults(e, t.type);
  }
  r.block(() => {
    for (const r of t.rules)
      if (M_RuleCheckerUtils_maybe.shouldUseRule(n, r)) {
        k(e, r.keyword, r.definition, t.type);
      }
  });
}
function T(e, t) {
  return e.includes(t) || ("integer" === t && e.includes("number"));
}
function S(e, t) {
  t += ` at "${e.schemaEnv.baseId + e.errSchemaPath}" (strictTypes)`;
  M_json_pointer_utils_maybe.checkStrictMode(e, t, e.opts.strictTypes);
}
exports.validateFunctionCode = function (e) {
  if (v(e) && (_(e), y(e))) {
    (function (e) {
      const { schema: t, opts: r, gen: n } = e;
      g(e, () => {
        if (r.$comment && t.$comment) {
          w(e);
        }
        (function (e) {
          const { schema: t, opts: r } = e;
          if (undefined !== t.default && r.useDefaults && r.strictSchema) {
            M_json_pointer_utils_maybe.checkStrictMode(
              e,
              "default is ignored in the schema root"
            );
          }
        })(e);
        n.let(M_language_marker_constants_maybe.default.vErrors, null);
        n.let(M_language_marker_constants_maybe.default.errors, 0);
        if (r.unevaluated) {
          (function (e) {
            const { gen: t, validateName: r } = e;
            e.evaluated = t.const(
              "evaluated",
              M_LanguageMarkerConstants_maybe._`${r}.evaluated`
            );
            t.if(
              M_LanguageMarkerConstants_maybe._`${e.evaluated}.dynamicProps`,
              () =>
                t.assign(
                  M_LanguageMarkerConstants_maybe._`${e.evaluated}.props`,
                  M_LanguageMarkerConstants_maybe._`undefined`
                )
            );
            t.if(
              M_LanguageMarkerConstants_maybe._`${e.evaluated}.dynamicItems`,
              () =>
                t.assign(
                  M_LanguageMarkerConstants_maybe._`${e.evaluated}.items`,
                  M_LanguageMarkerConstants_maybe._`undefined`
                )
            );
          })(e);
        }
        b(e);
        (function (e) {
          const {
            gen: t,
            schemaEnv: r,
            validateName: n,
            ValidationError: i,
            opts: o,
          } = e;
          if (r.$async) {
            t.if(
              M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.errors} === 0`,
              () => t.return(M_language_marker_constants_maybe.default.data),
              () =>
                t.throw(
                  M_LanguageMarkerConstants_maybe._`new ${i}(${M_language_marker_constants_maybe.default.vErrors})`
                )
            );
          } else {
            t.assign(
              M_LanguageMarkerConstants_maybe._`${n}.errors`,
              M_language_marker_constants_maybe.default.vErrors
            );
            if (o.unevaluated) {
              (function ({ gen: e, evaluated: t, props: r, items: n }) {
                if (r instanceof M_LanguageMarkerConstants_maybe.Name) {
                  e.assign(M_LanguageMarkerConstants_maybe._`${t}.props`, r);
                }
                if (n instanceof M_LanguageMarkerConstants_maybe.Name) {
                  e.assign(M_LanguageMarkerConstants_maybe._`${t}.items`, n);
                }
              })(e);
            }
            t.return(
              M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.errors} === 0`
            );
          }
        })(e);
      });
    })(e);
  } else {
    g(e, () => M_boolOrEmptySchemaManager_maybe.topBoolOrEmptySchema(e));
  }
};
class KeywordCxt {
  constructor(e, t, r) {
    M_keyword_validation_utils_maybe.validateKeywordUsage(e, t, r);
    this.gen = e.gen;
    this.allErrors = e.allErrors;
    this.keyword = r;
    this.data = e.data;
    this.schema = e.schema[r];
    this.$data = t.$data && e.opts.$data && this.schema && this.schema.$data;
    this.schemaValue = M_json_pointer_utils_maybe.schemaRefOrVal(
      e,
      this.schema,
      r,
      this.$data
    );
    this.schemaType = t.schemaType;
    this.parentSchema = e.schema;
    this.params = {};
    this.it = e;
    this.def = t;
    if (this.$data)
      this.schemaCode = e.gen.const("vSchema", getData(this.$data, e));
    else if (
      ((this.schemaCode = this.schemaValue),
      !(0, M_keyword_validation_utils_maybe.validSchemaType)(
        this.schema,
        t.schemaType,
        t.allowUndefined
      ))
    )
      throw new Error(`${r} value must be ${JSON.stringify(t.schemaType)}`);
    if ("code" in t ? t.trackErrors : false !== t.errors) {
      this.errsCount = e.gen.const(
        "_errs",
        M_language_marker_constants_maybe.default.errors
      );
    }
  }
  result(e, t, r) {
    this.failResult(M_LanguageMarkerConstants_maybe.not(e), t, r);
  }
  failResult(e, t, r) {
    this.gen.if(e);
    if (r) {
      r();
    } else {
      this.error();
    }
    if (t) {
      this.gen.else();
      t();
      if (this.allErrors) {
        this.gen.endIf();
      }
    } else {
      if (this.allErrors) {
        this.gen.endIf();
      } else {
        this.gen.else();
      }
    }
  }
  pass(e, t) {
    this.failResult(M_LanguageMarkerConstants_maybe.not(e), undefined, t);
  }
  fail(e) {
    if (undefined === e) {
      this.error();
      return void (this.allErrors || this.gen.if(false));
    }
    this.gen.if(e);
    this.error();
    if (this.allErrors) {
      this.gen.endIf();
    } else {
      this.gen.else();
    }
  }
  fail$data(e) {
    if (!this.$data) return this.fail(e);
    const { schemaCode: t } = this;
    this.fail(
      M_LanguageMarkerConstants_maybe._`${t} !== undefined && (${M_LanguageMarkerConstants_maybe.or(
        this.invalid$data(),
        e
      )})`
    );
  }
  error(e, t, r) {
    if (t) {
      this.setParams(t);
      this._error(e, r);
      return void this.setParams({});
    }
    this._error(e, r);
  }
  _error(e, t) {
    (e
      ? M_ErrorReportingManager_maybe.reportExtraError
      : M_ErrorReportingManager_maybe.reportError)(this, this.def.error, t);
  }
  $dataError() {
    M_ErrorReportingManager_maybe.reportError(
      this,
      this.def.$dataError || M_ErrorReportingManager_maybe.keyword$DataError
    );
  }
  reset() {
    if (undefined === this.errsCount)
      throw new Error('add "trackErrors" to keyword definition');
    M_ErrorReportingManager_maybe.resetErrorsCount(this.gen, this.errsCount);
  }
  ok(e) {
    if (this.allErrors) {
      this.gen.if(e);
    }
  }
  setParams(e, t) {
    if (t) {
      Object.assign(this.params, e);
    } else {
      this.params = e;
    }
  }
  block$data(e, t, r = M_LanguageMarkerConstants_maybe.nil) {
    this.gen.block(() => {
      this.check$data(e, r);
      t();
    });
  }
  check$data(
    e = M_LanguageMarkerConstants_maybe.nil,
    t = M_LanguageMarkerConstants_maybe.nil
  ) {
    if (!this.$data) return;
    const { gen: r, schemaCode: n, schemaType: i, def: o } = this;
    r.if(
      M_LanguageMarkerConstants_maybe.or(
        M_LanguageMarkerConstants_maybe._`${n} === undefined`,
        t
      )
    );
    if (e !== M_LanguageMarkerConstants_maybe.nil) {
      r.assign(e, true);
    }
    if (i.length || o.validateSchema) {
      r.elseIf(this.invalid$data());
      this.$dataError();
      if (e !== M_LanguageMarkerConstants_maybe.nil) {
        r.assign(e, false);
      }
    }
    r.else();
  }
  invalid$data() {
    const { gen: e, schemaCode: t, schemaType: r, def: n, it: i } = this;
    return M_LanguageMarkerConstants_maybe.or(
      (function () {
        if (r.length) {
          if (!(t instanceof M_LanguageMarkerConstants_maybe.Name))
            throw new Error("ajv implementation error");
          const e = Array.isArray(r) ? r : [r];
          return M_LanguageMarkerConstants_maybe._`${M_data_type_validator_maybe.checkDataTypes(
            e,
            t,
            i.opts.strictNumbers,
            M_data_type_validator_maybe.DataType.Wrong
          )}`;
        }
        return M_LanguageMarkerConstants_maybe.nil;
      })(),
      (function () {
        if (n.validateSchema) {
          const r = e.scopeValue("validate$data", {
            ref: n.validateSchema,
          });
          return M_LanguageMarkerConstants_maybe._`!${r}(${t})`;
        }
        return M_LanguageMarkerConstants_maybe.nil;
      })()
    );
  }
  subschema(e, t) {
    const r = M_SubschemaExtender_maybe.getSubschema(this.it, e);
    M_SubschemaExtender_maybe.extendSubschemaData(r, this.it, e);
    M_SubschemaExtender_maybe.extendSubschemaMode(r, e);
    const i = {
      ...this.it,
      ...r,
      items: undefined,
      props: undefined,
    };
    (function (e, t) {
      if (v(e) && (_(e), y(e))) {
        (function (e, t) {
          const { schema: r, gen: n, opts: i } = e;
          if (i.$comment && r.$comment) {
            w(e);
          }
          (function (e) {
            const t = e.schema[e.opts.schemaId];
            if (t) {
              e.baseId = M_SchemaRefResolver_maybe.resolveUrl(
                e.opts.uriResolver,
                e.baseId,
                t
              );
            }
          })(e);
          (function (e) {
            if (e.schema.$async && !e.schemaEnv.$async)
              throw new Error("async schema in sync schema");
          })(e);
          const o = n.const(
            "_errs",
            M_language_marker_constants_maybe.default.errors
          );
          b(e, o);
          n.var(
            t,
            M_LanguageMarkerConstants_maybe._`${o} === ${M_language_marker_constants_maybe.default.errors}`
          );
        })(e, t);
      } else {
        M_boolOrEmptySchemaManager_maybe.boolOrEmptySchema(e, t);
      }
    })(i, t);
    return i;
  }
  mergeEvaluated(e, t) {
    const { it: r, gen: n } = this;
    if (r.opts.unevaluated) {
      if (true !== r.props && undefined !== e.props) {
        r.props = M_json_pointer_utils_maybe.mergeEvaluated.props(
          n,
          e.props,
          r.props,
          t
        );
      }
      if (true !== r.items && undefined !== e.items) {
        r.items = M_json_pointer_utils_maybe.mergeEvaluated.items(
          n,
          e.items,
          r.items,
          t
        );
      }
    }
  }
  mergeValidEvaluated(e, t) {
    const { it: r, gen: n } = this;
    if (r.opts.unevaluated && (true !== r.props || true !== r.items)) {
      n.if(t, () =>
        this.mergeEvaluated(e, M_LanguageMarkerConstants_maybe.Name)
      );
      return true;
    }
  }
}
function k(e, t, r, n) {
  const i = new KeywordCxt(e, r, t);
  if ("code" in r) {
    r.code(i, n);
  } else {
    if (i.$data && r.validate) {
      M_keyword_validation_utils_maybe.funcKeywordCode(i, r);
    } else {
      if ("macro" in r) {
        M_keyword_validation_utils_maybe.macroKeywordCode(i, r);
      } else {
        if (r.compile || r.validate) {
          M_keyword_validation_utils_maybe.funcKeywordCode(i, r);
        }
      }
    }
  }
}
exports.KeywordCxt = KeywordCxt;
const I = /^\/(?:[^~]|~0|~1)*$/;
const A = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function getData(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let i;
  let o;
  if ("" === e) return M_language_marker_constants_maybe.default.rootData;
  if ("/" === e[0]) {
    if (!I.test(e)) throw new Error(`Invalid JSON-pointer: ${e}`);
    i = e;
    o = M_language_marker_constants_maybe.default.rootData;
  } else {
    const s = A.exec(e);
    if (!s) throw new Error(`Invalid JSON-pointer: ${e}`);
    const a = +s[1];
    i = s[2];
    if ("#" === i) {
      if (a >= t) throw new Error(c("property/index", a));
      return n[t - a];
    }
    if (a > t) throw new Error(c("data", a));
    o = r[t - a];
    if (!i) return o;
  }
  let s = o;
  const a = i.split("/");
  for (const e of a)
    if (e) {
      o = M_LanguageMarkerConstants_maybe._`${o}${M_LanguageMarkerConstants_maybe.getProperty(
        M_json_pointer_utils_maybe.unescapeJsonPointer(e)
      )}`;
      s = M_LanguageMarkerConstants_maybe._`${s} && ${o}`;
    }
  return s;
  function c(e, r) {
    return `Cannot access ${e} ${r} levels up, current level is ${t}`;
  }
}
exports.getData = getData;
