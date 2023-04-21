Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getData = exports.KeywordCxt = exports.validateFunctionCode = undefined;
const n = require(12171);
const i = require(97332);
const o = require(89073);
const s = require(97332);
const a = require(91481);
const c = require(95782);
const l = require(38878);
const u = require(15669);
const d = require(17250);
const p = require(96696);
const h = require(88936);
const f = require(6930);
function g({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: i }, o) {
  if (i.code.es5) {
    e.func(t, u._`${d.default.data}, ${d.default.valCxt}`, n.$async, () => {
      e.code(u._`"use strict"; ${m(r, i)}`);
      (function (e, t) {
        e.if(
          d.default.valCxt,
          () => {
            e.var(
              d.default.instancePath,
              u._`${d.default.valCxt}.${d.default.instancePath}`
            );
            e.var(
              d.default.parentData,
              u._`${d.default.valCxt}.${d.default.parentData}`
            );
            e.var(
              d.default.parentDataProperty,
              u._`${d.default.valCxt}.${d.default.parentDataProperty}`
            );
            e.var(
              d.default.rootData,
              u._`${d.default.valCxt}.${d.default.rootData}`
            );
            if (t.dynamicRef) {
              e.var(
                d.default.dynamicAnchors,
                u._`${d.default.valCxt}.${d.default.dynamicAnchors}`
              );
            }
          },
          () => {
            e.var(d.default.instancePath, u._`""`);
            e.var(d.default.parentData, u._`undefined`);
            e.var(d.default.parentDataProperty, u._`undefined`);
            e.var(d.default.rootData, d.default.data);
            if (t.dynamicRef) {
              e.var(d.default.dynamicAnchors, u._`{}`);
            }
          }
        );
      })(e, i);
      e.code(o);
    });
  } else {
    e.func(
      t,
      u._`${d.default.data}, ${(function (e) {
        return u._`{${d.default.instancePath}="", ${d.default.parentData}, ${
          d.default.parentDataProperty
        }, ${d.default.rootData}=${d.default.data}${
          e.dynamicRef ? u._`, ${d.default.dynamicAnchors}={}` : u.nil
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
    ? u._`/*# sourceURL=${r} */`
    : u.nil;
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
  h.checkUnknownRules(e);
  (function (e) {
    const { schema: t, errSchemaPath: r, opts: n, self: i } = e;
    if (
      t.$ref &&
      n.ignoreKeywordsWithRef &&
      h.schemaHasRulesButRef(t, i.RULES)
    ) {
      i.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
    }
  })(e);
}
function b(e, t) {
  if (e.opts.jtd) return C(e, [], false, t);
  const r = i.getSchemaTypes(e.schema);
  C(e, r, !i.coerceAndCheckDataType(e, r), t);
}
function w({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: i }) {
  const o = r.$comment;
  if (true === i.$comment) e.code(u._`${d.default.self}.logger.log(${o})`);
  else if ("function" == typeof i.$comment) {
    const r = u.str`${n}/$comment`;
    const i = e.scopeValue("root", {
      ref: t.root,
    });
    e.code(u._`${d.default.self}.opts.$comment(${o}, ${r}, ${i}.schema)`);
  }
}
function C(e, t, r, n) {
  const { gen: i, schema: a, data: c, allErrors: l, opts: p, self: f } = e;
  const { RULES: g } = f;
  function m(h) {
    if (o.shouldUseGroup(a, h)) {
      if (h.type) {
        i.if(s.checkDataType(h.type, c, p.strictNumbers));
        E(e, h);
        if (1 === t.length && t[0] === h.type && r) {
          i.else();
          s.reportTypeError(e);
        }
        i.endIf();
      } else {
        E(e, h);
      }
      if (l) {
        i.if(u._`${d.default.errors} === ${n || 0}`);
      }
    }
  }
  if (!a.$ref || (!p.ignoreKeywordsWithRef && h.schemaHasRulesButRef(a, g))) {
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
              if ("object" == typeof i && o.shouldUseRule(e.schema, i)) {
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
    a.assignDefaults(e, t.type);
  }
  r.block(() => {
    for (const r of t.rules)
      if (o.shouldUseRule(n, r)) {
        k(e, r.keyword, r.definition, t.type);
      }
  });
}
function T(e, t) {
  return e.includes(t) || ("integer" === t && e.includes("number"));
}
function S(e, t) {
  t += ` at "${e.schemaEnv.baseId + e.errSchemaPath}" (strictTypes)`;
  h.checkStrictMode(e, t, e.opts.strictTypes);
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
            h.checkStrictMode(e, "default is ignored in the schema root");
          }
        })(e);
        n.let(d.default.vErrors, null);
        n.let(d.default.errors, 0);
        if (r.unevaluated) {
          (function (e) {
            const { gen: t, validateName: r } = e;
            e.evaluated = t.const("evaluated", u._`${r}.evaluated`);
            t.if(u._`${e.evaluated}.dynamicProps`, () =>
              t.assign(u._`${e.evaluated}.props`, u._`undefined`)
            );
            t.if(u._`${e.evaluated}.dynamicItems`, () =>
              t.assign(u._`${e.evaluated}.items`, u._`undefined`)
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
              u._`${d.default.errors} === 0`,
              () => t.return(d.default.data),
              () => t.throw(u._`new ${i}(${d.default.vErrors})`)
            );
          } else {
            t.assign(u._`${n}.errors`, d.default.vErrors);
            if (o.unevaluated) {
              (function ({ gen: e, evaluated: t, props: r, items: n }) {
                if (r instanceof u.Name) {
                  e.assign(u._`${t}.props`, r);
                }
                if (n instanceof u.Name) {
                  e.assign(u._`${t}.items`, n);
                }
              })(e);
            }
            t.return(u._`${d.default.errors} === 0`);
          }
        })(e);
      });
    })(e);
  } else {
    g(e, () => n.topBoolOrEmptySchema(e));
  }
};
class KeywordCxt {
  constructor(e, t, r) {
    c.validateKeywordUsage(e, t, r);
    this.gen = e.gen;
    this.allErrors = e.allErrors;
    this.keyword = r;
    this.data = e.data;
    this.schema = e.schema[r];
    this.$data = t.$data && e.opts.$data && this.schema && this.schema.$data;
    this.schemaValue = h.schemaRefOrVal(e, this.schema, r, this.$data);
    this.schemaType = t.schemaType;
    this.parentSchema = e.schema;
    this.params = {};
    this.it = e;
    this.def = t;
    if (this.$data)
      this.schemaCode = e.gen.const("vSchema", getData(this.$data, e));
    else if (
      ((this.schemaCode = this.schemaValue),
      !(0, c.validSchemaType)(this.schema, t.schemaType, t.allowUndefined))
    )
      throw new Error(`${r} value must be ${JSON.stringify(t.schemaType)}`);
    if ("code" in t ? t.trackErrors : false !== t.errors) {
      this.errsCount = e.gen.const("_errs", d.default.errors);
    }
  }
  result(e, t, r) {
    this.failResult(u.not(e), t, r);
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
    this.failResult(u.not(e), undefined, t);
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
    this.fail(u._`${t} !== undefined && (${u.or(this.invalid$data(), e)})`);
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
    (e ? f.reportExtraError : f.reportError)(this, this.def.error, t);
  }
  $dataError() {
    f.reportError(this, this.def.$dataError || f.keyword$DataError);
  }
  reset() {
    if (undefined === this.errsCount)
      throw new Error('add "trackErrors" to keyword definition');
    f.resetErrorsCount(this.gen, this.errsCount);
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
  block$data(e, t, r = u.nil) {
    this.gen.block(() => {
      this.check$data(e, r);
      t();
    });
  }
  check$data(e = u.nil, t = u.nil) {
    if (!this.$data) return;
    const { gen: r, schemaCode: n, schemaType: i, def: o } = this;
    r.if(u.or(u._`${n} === undefined`, t));
    if (e !== u.nil) {
      r.assign(e, true);
    }
    if (i.length || o.validateSchema) {
      r.elseIf(this.invalid$data());
      this.$dataError();
      if (e !== u.nil) {
        r.assign(e, false);
      }
    }
    r.else();
  }
  invalid$data() {
    const { gen: e, schemaCode: t, schemaType: r, def: n, it: i } = this;
    return u.or(
      (function () {
        if (r.length) {
          if (!(t instanceof u.Name))
            throw new Error("ajv implementation error");
          const e = Array.isArray(r) ? r : [r];
          return u._`${s.checkDataTypes(
            e,
            t,
            i.opts.strictNumbers,
            s.DataType.Wrong
          )}`;
        }
        return u.nil;
      })(),
      (function () {
        if (n.validateSchema) {
          const r = e.scopeValue("validate$data", {
            ref: n.validateSchema,
          });
          return u._`!${r}(${t})`;
        }
        return u.nil;
      })()
    );
  }
  subschema(e, t) {
    const r = l.getSubschema(this.it, e);
    l.extendSubschemaData(r, this.it, e);
    l.extendSubschemaMode(r, e);
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
              e.baseId = p.resolveUrl(e.opts.uriResolver, e.baseId, t);
            }
          })(e);
          (function (e) {
            if (e.schema.$async && !e.schemaEnv.$async)
              throw new Error("async schema in sync schema");
          })(e);
          const o = n.const("_errs", d.default.errors);
          b(e, o);
          n.var(t, u._`${o} === ${d.default.errors}`);
        })(e, t);
      } else {
        n.boolOrEmptySchema(e, t);
      }
    })(i, t);
    return i;
  }
  mergeEvaluated(e, t) {
    const { it: r, gen: n } = this;
    if (r.opts.unevaluated) {
      if (true !== r.props && undefined !== e.props) {
        r.props = h.mergeEvaluated.props(n, e.props, r.props, t);
      }
      if (true !== r.items && undefined !== e.items) {
        r.items = h.mergeEvaluated.items(n, e.items, r.items, t);
      }
    }
  }
  mergeValidEvaluated(e, t) {
    const { it: r, gen: n } = this;
    if (r.opts.unevaluated && (true !== r.props || true !== r.items)) {
      n.if(t, () => this.mergeEvaluated(e, u.Name));
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
      c.funcKeywordCode(i, r);
    } else {
      if ("macro" in r) {
        c.macroKeywordCode(i, r);
      } else {
        if (r.compile || r.validate) {
          c.funcKeywordCode(i, r);
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
  if ("" === e) return d.default.rootData;
  if ("/" === e[0]) {
    if (!I.test(e)) throw new Error(`Invalid JSON-pointer: ${e}`);
    i = e;
    o = d.default.rootData;
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
      o = u._`${o}${u.getProperty(h.unescapeJsonPointer(e))}`;
      s = u._`${s} && ${o}`;
    }
  return s;
  function c(e, r) {
    return `Cannot access ${e} ${r} levels up, current level is ${t}`;
  }
}
exports.getData = getData;