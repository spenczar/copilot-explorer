Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.callRef = exports.getValidate = undefined;
const M_ReferenceResolutionErrorManager_maybe = require("ReferenceResolutionErrorManager");
const M_ValidationUtils_maybe = require("ValidationUtils");
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_language_marker_constants_maybe = require("language-marker-constants");
const M_schema_compiler_utils_maybe = require("schema-compiler-utils");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const l = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: i } = e;
    const { baseId: s, schemaEnv: c, validateName: l, opts: p, self: h } = i;
    const { root: f } = c;
    if (("#" === r || "#/" === r) && s === f.baseId)
      return (function () {
        if (c === f) return callRef(e, l, c, c.$async);
        const r = t.scopeValue("root", {
          ref: f,
        });
        return callRef(
          e,
          M_LanguageMarkerConstants_maybe._`${r}.validate`,
          f,
          f.$async
        );
      })();
    const g = M_schema_compiler_utils_maybe.resolveRef.call(h, f, s, r);
    if (undefined === g)
      throw new M_ReferenceResolutionErrorManager_maybe.default(
        i.opts.uriResolver,
        s,
        r
      );
    return g instanceof M_schema_compiler_utils_maybe.SchemaEnv
      ? (function (t) {
          const r = getValidate(e, t);
          callRef(e, r, t, t.$async);
        })(g)
      : (function (n) {
          const i = t.scopeValue(
            "schema",
            true === p.code.source
              ? {
                  ref: n,
                  code: M_LanguageMarkerConstants_maybe.stringify(n),
                }
              : {
                  ref: n,
                }
          );
          const s = t.name("valid");
          const a = e.subschema(
            {
              schema: n,
              dataTypes: [],
              schemaPath: M_LanguageMarkerConstants_maybe.nil,
              topSchemaRef: i,
              errSchemaPath: r,
            },
            s
          );
          e.mergeEvaluated(a);
          e.ok(s);
        })(g);
  },
};
function getValidate(e, t) {
  const { gen: r } = e;
  return t.validate
    ? r.scopeValue("validate", {
        ref: t.validate,
      })
    : M_LanguageMarkerConstants_maybe._`${r.scopeValue("wrapper", {
        ref: t,
      })}.validate`;
}
function callRef(e, t, r, n) {
  const { gen: a, it: l } = e;
  const { allErrors: u, schemaEnv: d, opts: p } = l;
  const h = p.passContext
    ? M_language_marker_constants_maybe.default.this
    : M_LanguageMarkerConstants_maybe.nil;
  function f(e) {
    const t = M_LanguageMarkerConstants_maybe._`${e}.errors`;
    a.assign(
      M_language_marker_constants_maybe.default.vErrors,
      M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.vErrors} === null ? ${t} : ${M_language_marker_constants_maybe.default.vErrors}.concat(${t})`
    );
    a.assign(
      M_language_marker_constants_maybe.default.errors,
      M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.vErrors}.length`
    );
  }
  function g(e) {
    var t;
    if (!l.opts.unevaluated) return;
    const n =
      null === (t = null == r ? undefined : r.validate) || undefined === t
        ? undefined
        : t.evaluated;
    if (true !== l.props)
      if (n && !n.dynamicProps) {
        if (undefined !== n.props) {
          l.props = M_json_pointer_utils_maybe.mergeEvaluated.props(
            a,
            n.props,
            l.props
          );
        }
      } else {
        const t = a.var(
          "props",
          M_LanguageMarkerConstants_maybe._`${e}.evaluated.props`
        );
        l.props = M_json_pointer_utils_maybe.mergeEvaluated.props(
          a,
          t,
          l.props,
          M_LanguageMarkerConstants_maybe.Name
        );
      }
    if (true !== l.items)
      if (n && !n.dynamicItems) {
        if (undefined !== n.items) {
          l.items = M_json_pointer_utils_maybe.mergeEvaluated.items(
            a,
            n.items,
            l.items
          );
        }
      } else {
        const t = a.var(
          "items",
          M_LanguageMarkerConstants_maybe._`${e}.evaluated.items`
        );
        l.items = M_json_pointer_utils_maybe.mergeEvaluated.items(
          a,
          t,
          l.items,
          M_LanguageMarkerConstants_maybe.Name
        );
      }
  }
  if (n) {
    (function () {
      if (!d.$async) throw new Error("async schema referenced by sync schema");
      const r = a.let("valid");
      a.try(
        () => {
          a.code(
            M_LanguageMarkerConstants_maybe._`await ${M_ValidationUtils_maybe.callValidateCode(
              e,
              t,
              h
            )}`
          );
          g(t);
          if (u) {
            a.assign(r, true);
          }
        },
        (e) => {
          a.if(
            M_LanguageMarkerConstants_maybe._`!(${e} instanceof ${l.ValidationError})`,
            () => a.throw(e)
          );
          f(e);
          if (u) {
            a.assign(r, false);
          }
        }
      );
      e.ok(r);
    })();
  } else {
    e.result(
      M_ValidationUtils_maybe.callValidateCode(e, t, h),
      () => g(t),
      () => f(t)
    );
  }
}
exports.getValidate = getValidate;
exports.callRef = callRef;
exports.default = l;
