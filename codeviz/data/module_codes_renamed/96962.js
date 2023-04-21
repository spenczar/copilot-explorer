Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_ValidationUtils_maybe = require("ValidationUtils");
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const s = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: true,
  error: {
    message: ({ params: { missingProperty: e } }) =>
      M_LanguageMarkerConstants_maybe.str`must have required property '${e}'`,
    params: ({ params: { missingProperty: e } }) =>
      M_LanguageMarkerConstants_maybe._`{missingProperty: ${e}}`,
  },
  code(e) {
    const { gen: t, schema: r, schemaCode: s, data: a, $data: c, it: l } = e;
    const { opts: u } = l;
    if (!c && 0 === r.length) return;
    const d = r.length >= u.loopRequired;
    if (l.allErrors) {
      (function () {
        if (d || c) e.block$data(M_LanguageMarkerConstants_maybe.nil, p);
        else
          for (const t of r)
            M_ValidationUtils_maybe.checkReportMissingProp(e, t);
      })();
    } else {
      (function () {
        const o = t.let("missing");
        if (d || c) {
          const r = t.let("valid", true);
          e.block$data(r, () =>
            (function (r, o) {
              e.setParams({
                missingProperty: r,
              });
              t.forOf(
                r,
                s,
                () => {
                  t.assign(
                    o,
                    M_ValidationUtils_maybe.propertyInData(
                      t,
                      a,
                      r,
                      u.ownProperties
                    )
                  );
                  t.if(M_LanguageMarkerConstants_maybe.not(o), () => {
                    e.error();
                    t.break();
                  });
                },
                M_LanguageMarkerConstants_maybe.nil
              );
            })(o, r)
          );
          e.ok(r);
        } else {
          t.if(M_ValidationUtils_maybe.checkMissingProp(e, r, o));
          M_ValidationUtils_maybe.reportMissingProp(e, o);
          t.else();
        }
      })();
    }
    if (u.strictRequired) {
      const t = e.parentSchema.properties,
        { definedProperties: n } = e.it;
      for (const e of r)
        if (void 0 === (null == t ? void 0 : t[e]) && !n.has(e)) {
          const t = `required property "${e}" is not defined at "${
            l.schemaEnv.baseId + l.errSchemaPath
          }" (strictRequired)`;
          (0, M_json_pointer_utils_maybe.checkStrictMode)(
            l,
            t,
            l.opts.strictRequired
          );
        }
    }
    function p() {
      t.forOf("prop", s, (r) => {
        e.setParams({
          missingProperty: r,
        });
        t.if(
          M_ValidationUtils_maybe.noPropertyInData(t, a, r, u.ownProperties),
          () => e.error()
        );
      });
    }
  },
};
exports.default = s;
