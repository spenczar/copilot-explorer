Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_ValidationUtils_maybe = require("ValidationUtils");
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const a = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: a, parentSchema: c, it: l } = e;
    const { opts: u } = l;
    const d = M_ValidationUtils_maybe.allSchemaProperties(r);
    const p = d.filter((e) =>
      M_json_pointer_utils_maybe.alwaysValidSchema(l, r[e])
    );
    if (
      0 === d.length ||
      (p.length === d.length && (!l.opts.unevaluated || true === l.props))
    )
      return;
    const h = u.strictSchema && !u.allowMatchingProperties && c.properties;
    const f = t.name("valid");
    if (
      true === l.props ||
      l.props instanceof M_LanguageMarkerConstants_maybe.Name
    ) {
      l.props = M_json_pointer_utils_maybe.evaluatedPropsToName(t, l.props);
    }
    const { props: g } = l;
    function m(e) {
      for (const t in h)
        if (new RegExp(e).test(t)) {
          M_json_pointer_utils_maybe.checkStrictMode(
            l,
            `property ${t} matches pattern ${e} (use allowMatchingProperties)`
          );
        }
    }
    function y(r) {
      t.forIn("key", a, (o) => {
        t.if(
          M_LanguageMarkerConstants_maybe._`${M_ValidationUtils_maybe.usePattern(
            e,
            r
          )}.test(${o})`,
          () => {
            const n = p.includes(r);
            if (n) {
              e.subschema(
                {
                  keyword: "patternProperties",
                  schemaProp: r,
                  dataProp: o,
                  dataPropType: M_json_pointer_utils_maybe.Type.Str,
                },
                f
              );
            }
            if (l.opts.unevaluated && true !== g) {
              t.assign(M_LanguageMarkerConstants_maybe._`${g}[${o}]`, true);
            } else {
              if (n || l.allErrors) {
                t.if(M_LanguageMarkerConstants_maybe.not(f), () => t.break());
              }
            }
          }
        );
      });
    }
    !(function () {
      for (const e of d) {
        if (h) {
          m(e);
        }
        if (l.allErrors) {
          y(e);
        } else {
          t.var(f, true);
          y(e);
          t.if(f);
        }
      }
    })();
  },
};
exports.default = a;
