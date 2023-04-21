Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.validateSchemaDeps =
  exports.validatePropertyDeps =
  exports.error =
    undefined;
const n = require(15669);
const i = require(88936);
const o = require(3499);
exports.error = {
  message: ({ params: { property: e, depsCount: t, deps: r } }) => {
    const i = 1 === t ? "property" : "properties";
    return n.str`must have ${i} ${r} when property ${e} is present`;
  },
  params: ({
    params: { property: e, depsCount: t, deps: r, missingProperty: i },
  }) => n._`{property: ${e},
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
    const u = o.propertyInData(r, i, c, s.opts.ownProperties);
    e.setParams({
      property: c,
      depsCount: l.length,
      deps: l.join(", "),
    });
    if (s.allErrors) {
      r.if(u, () => {
        for (const t of l) o.checkReportMissingProp(e, t);
      });
    } else {
      r.if(n._`${u} && (${o.checkMissingProp(e, l, a)})`);
      o.reportMissingProp(e, a);
      r.else();
    }
  }
}
function validateSchemaDeps(e, t = e.schema) {
  const { gen: r, data: n, keyword: s, it: a } = e;
  const c = r.name("valid");
  for (const l in t)
    if (i.alwaysValidSchema(a, t[l])) {
      r.if(
        o.propertyInData(r, n, l, a.opts.ownProperties),
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