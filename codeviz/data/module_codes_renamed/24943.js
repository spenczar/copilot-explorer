Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_ValidationUtils_maybe = require("ValidationUtils");
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_language_marker_constants_maybe = require("language-marker-constants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const a = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: true,
  trackErrors: true,
  error: {
    message: "must NOT have additional properties",
    params: ({ params: e }) =>
      M_LanguageMarkerConstants_maybe._`{additionalProperty: ${e.additionalProperty}}`,
  },
  code(e) {
    const {
      gen: t,
      schema: r,
      parentSchema: a,
      data: c,
      errsCount: l,
      it: u,
    } = e;
    if (!l) throw new Error("ajv implementation error");
    const { allErrors: d, opts: p } = u;
    u.props = true;
    if (
      "all" !== p.removeAdditional &&
      (0, M_json_pointer_utils_maybe.alwaysValidSchema)(u, r)
    )
      return;
    const h = M_ValidationUtils_maybe.allSchemaProperties(a.properties);
    const f = M_ValidationUtils_maybe.allSchemaProperties(a.patternProperties);
    function g(e) {
      t.code(M_LanguageMarkerConstants_maybe._`delete ${c}[${e}]`);
    }
    function m(n) {
      if ("all" === p.removeAdditional || (p.removeAdditional && false === r))
        g(n);
      else {
        if (false === r) {
          e.setParams({
            additionalProperty: n,
          });
          e.error();
          return void (d || t.break());
        }
        if (
          "object" == typeof r &&
          !M_json_pointer_utils_maybe.alwaysValidSchema(u, r)
        ) {
          const r = t.name("valid");
          if ("failing" === p.removeAdditional) {
            y(n, r, false);
            t.if(M_LanguageMarkerConstants_maybe.not(r), () => {
              e.reset();
              g(n);
            });
          } else {
            y(n, r);
            if (d) {
              t.if(M_LanguageMarkerConstants_maybe.not(r), () => t.break());
            }
          }
        }
      }
    }
    function y(t, r, n) {
      const i = {
        keyword: "additionalProperties",
        dataProp: t,
        dataPropType: M_json_pointer_utils_maybe.Type.Str,
      };
      if (false === n) {
        Object.assign(i, {
          compositeRule: true,
          createErrors: false,
          allErrors: false,
        });
      }
      e.subschema(i, r);
    }
    t.forIn("key", c, (r) => {
      if (h.length || f.length) {
        t.if(
          (function (r) {
            let o;
            if (h.length > 8) {
              const e = M_json_pointer_utils_maybe.schemaRefOrVal(
                u,
                a.properties,
                "properties"
              );
              o = M_ValidationUtils_maybe.isOwnProperty(t, e, r);
            } else
              o = h.length
                ? M_LanguageMarkerConstants_maybe.or(
                    ...h.map(
                      (e) => M_LanguageMarkerConstants_maybe._`${r} === ${e}`
                    )
                  )
                : M_LanguageMarkerConstants_maybe.nil;
            if (f.length) {
              o = M_LanguageMarkerConstants_maybe.or(
                o,
                ...f.map(
                  (t) =>
                    M_LanguageMarkerConstants_maybe._`${M_ValidationUtils_maybe.usePattern(
                      e,
                      t
                    )}.test(${r})`
                )
              );
            }
            return M_LanguageMarkerConstants_maybe.not(o);
          })(r),
          () => m(r)
        );
      } else {
        m(r);
      }
    });
    e.ok(
      M_LanguageMarkerConstants_maybe._`${l} === ${M_language_marker_constants_maybe.default.errors}`
    );
  },
};
exports.default = a;
