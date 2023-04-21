Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.validateKeywordUsage =
  exports.validSchemaType =
  exports.funcKeywordCode =
  exports.macroKeywordCode =
    undefined;
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_language_marker_constants_maybe = require("language-marker-constants");
const M_ValidationUtils_maybe = require("ValidationUtils");
const M_ErrorReportingManager_maybe = require("ErrorReportingManager");
function a(e) {
  const { gen: t, data: r, it: i } = e;
  t.if(i.parentData, () =>
    t.assign(
      r,
      M_LanguageMarkerConstants_maybe._`${i.parentData}[${i.parentDataProperty}]`
    )
  );
}
function c(e, t, r) {
  if (undefined === r) throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue(
    "keyword",
    "function" == typeof r
      ? {
          ref: r,
        }
      : {
          ref: r,
          code: M_LanguageMarkerConstants_maybe.stringify(r),
        }
  );
}
exports.macroKeywordCode = function (e, t) {
  const { gen: r, keyword: i, schema: o, parentSchema: s, it: a } = e;
  const l = t.macro.call(a.self, o, s, a);
  const u = c(r, i, l);
  if (false !== a.opts.validateSchema) {
    a.self.validateSchema(l, true);
  }
  const d = r.name("valid");
  e.subschema(
    {
      schema: l,
      schemaPath: M_LanguageMarkerConstants_maybe.nil,
      errSchemaPath: `${a.errSchemaPath}/${i}`,
      topSchemaRef: u,
      compositeRule: true,
    },
    d
  );
  e.pass(d, () => e.error(true));
};
exports.funcKeywordCode = function (e, t) {
  var r;
  const { gen: l, keyword: u, schema: d, parentSchema: p, $data: h, it: f } = e;
  !(function ({ schemaEnv: e }, t) {
    if (t.async && !e.$async) throw new Error("async keyword in sync schema");
  })(f, t);
  const g = !h && t.compile ? t.compile.call(f.self, d, p, f) : t.validate;
  const m = c(l, u, g);
  const y = l.let("valid");
  function v(
    r = t.async
      ? M_LanguageMarkerConstants_maybe._`await `
      : M_LanguageMarkerConstants_maybe.nil
  ) {
    const s = f.opts.passContext
      ? M_language_marker_constants_maybe.default.this
      : M_language_marker_constants_maybe.default.self;
    const a = !(("compile" in t && !h) || false === t.schema);
    l.assign(
      y,
      M_LanguageMarkerConstants_maybe._`${r}${M_ValidationUtils_maybe.callValidateCode(
        e,
        m,
        s,
        a
      )}`,
      t.modifying
    );
  }
  function _(e) {
    var r;
    l.if(
      M_LanguageMarkerConstants_maybe.not(
        null !== (r = t.valid) && undefined !== r ? r : y
      ),
      e
    );
  }
  e.block$data(y, function () {
    if (false === t.errors) {
      v();
      if (t.modifying) {
        a(e);
      }
      _(() => e.error());
    } else {
      const r = t.async
        ? (function () {
            const e = l.let("ruleErrs", null);
            l.try(
              () => v(M_LanguageMarkerConstants_maybe._`await `),
              (t) =>
                l.assign(y, false).if(
                  M_LanguageMarkerConstants_maybe._`${t} instanceof ${f.ValidationError}`,
                  () =>
                    l.assign(e, M_LanguageMarkerConstants_maybe._`${t}.errors`),
                  () => l.throw(t)
                )
            );
            return e;
          })()
        : (function () {
            const e = M_LanguageMarkerConstants_maybe._`${m}.errors`;
            l.assign(e, null);
            v(M_LanguageMarkerConstants_maybe.nil);
            return e;
          })();
      if (t.modifying) {
        a(e);
      }
      _(() =>
        (function (e, t) {
          const { gen: r } = e;
          r.if(
            M_LanguageMarkerConstants_maybe._`Array.isArray(${t})`,
            () => {
              r.assign(
                M_language_marker_constants_maybe.default.vErrors,
                M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.vErrors} === null ? ${t} : ${M_language_marker_constants_maybe.default.vErrors}.concat(${t})`
              ).assign(
                M_language_marker_constants_maybe.default.errors,
                M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.vErrors}.length`
              );
              M_ErrorReportingManager_maybe.extendErrors(e);
            },
            () => e.error()
          );
        })(e, r)
      );
    }
  });
  e.ok(null !== (r = t.valid) && undefined !== r ? r : y);
};
exports.validSchemaType = function (e, t, r = false) {
  return (
    !t.length ||
    t.some((t) =>
      "array" === t
        ? Array.isArray(e)
        : "object" === t
        ? e && "object" == typeof e && !Array.isArray(e)
        : typeof e == t || (r && undefined === e)
    )
  );
};
exports.validateKeywordUsage = function (
  { schema: e, opts: t, self: r, errSchemaPath: n },
  i,
  o
) {
  if (Array.isArray(i.keyword) ? !i.keyword.includes(o) : i.keyword !== o)
    throw new Error("ajv implementation error");
  const s = i.dependencies;
  if (
    null == s
      ? undefined
      : s.some((t) => !Object.prototype.hasOwnProperty.call(e, t))
  )
    throw new Error(
      `parent schema must have dependencies of ${o}: ${s.join(",")}`
    );
  if (i.validateSchema && !i.validateSchema(e[o])) {
    const e =
      `keyword "${o}" value is invalid at path "${n}": ` +
      r.errorsText(i.validateSchema.errors);
    if ("log" !== t.validateSchema) throw new Error(e);
    r.logger.error(e);
  }
};
