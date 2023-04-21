Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.validateSchemaDeps =
  exports.validatePropertyDeps =
  exports.error =
    undefined;
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const M_ValidationUtils_maybe = require("ValidationUtils");
exports.error = {
  message: ({ params: { property: e, depsCount: t, deps: r } }) => {
    const i = 1 === t ? "property" : "properties";
    return M_LanguageMarkerConstants_maybe.str`must have ${i} ${r} when property ${e} is present`;
  },
  params: ({
    params: { property: e, depsCount: t, deps: r, missingProperty: i },
  }) => M_LanguageMarkerConstants_maybe._`{property: ${e},
    missingProperty: ${i},
    depsCount: ${t},
    deps: ${r}}`,
};
const s = {
  keyword: "dependencies",
  type: "object",
  schemaType: "object",
  error: exports.error,
  code(e) {
    const [t, r] = (function ({ schema: e }) {
      const t = {};
      const r = {};
      for (const n in e)
        if ("__proto__" !== n) {
          (Array.isArray(e[n]) ? t : r)[n] = e[n];
        }
      return [t, r];
    })(e);
    validatePropertyDeps(e, t);
    validateSchemaDeps(e, r);
  },
};
function validatePropertyDeps(e, t = e.schema) {
  const { gen: r, data: i, it: s } = e;
  if (0 === Object.keys(t).length) return;
  const a = r.let("missing");
  for (const c in t) {
    const l = t[c];
    if (0 === l.length) continue;
    const u = M_ValidationUtils_maybe.propertyInData(
      r,
      i,
      c,
      s.opts.ownProperties
    );
    e.setParams({
      property: c,
      depsCount: l.length,
      deps: l.join(", "),
    });
    if (s.allErrors) {
      r.if(u, () => {
        for (const t of l) M_ValidationUtils_maybe.checkReportMissingProp(e, t);
      });
    } else {
      r.if(
        M_LanguageMarkerConstants_maybe._`${u} && (${M_ValidationUtils_maybe.checkMissingProp(
          e,
          l,
          a
        )})`
      );
      M_ValidationUtils_maybe.reportMissingProp(e, a);
      r.else();
    }
  }
}
function validateSchemaDeps(e, t = e.schema) {
  const { gen: r, data: n, keyword: s, it: a } = e;
  const c = r.name("valid");
  for (const l in t)
    if (M_json_pointer_utils_maybe.alwaysValidSchema(a, t[l])) {
      r.if(
        M_ValidationUtils_maybe.propertyInData(r, n, l, a.opts.ownProperties),
        () => {
          const t = e.subschema(
            {
              keyword: s,
              schemaProp: l,
            },
            c
          );
          e.mergeValidEvaluated(t, c);
        },
        () => r.var(c, true)
      );
      e.ok(c);
    }
}
exports.validatePropertyDeps = validatePropertyDeps;
exports.validateSchemaDeps = validateSchemaDeps;
exports.default = s;
