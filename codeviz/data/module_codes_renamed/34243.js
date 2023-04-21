Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_schema_validation_utils_maybe = require("schema-validation-utils");
const M_ValidationUtils_maybe = require("ValidationUtils");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const M_AdditionalPropertyManager_maybe = require("AdditionalPropertyManager");
const a = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: a, data: c, it: l } = e;
    if (
      "all" === l.opts.removeAdditional &&
      undefined === a.additionalProperties
    ) {
      M_AdditionalPropertyManager_maybe.default.code(
        new M_schema_validation_utils_maybe.KeywordCxt(
          l,
          M_AdditionalPropertyManager_maybe.default,
          "additionalProperties"
        )
      );
    }
    const u = M_ValidationUtils_maybe.allSchemaProperties(r);
    for (const e of u) l.definedProperties.add(e);
    if (l.opts.unevaluated && u.length && true !== l.props) {
      l.props = M_json_pointer_utils_maybe.mergeEvaluated.props(
        t,
        M_json_pointer_utils_maybe.toHash(u),
        l.props
      );
    }
    const d = u.filter(
      (e) => !M_json_pointer_utils_maybe.alwaysValidSchema(l, r[e])
    );
    if (0 === d.length) return;
    const p = t.name("valid");
    for (const r of d) {
      if (h(r)) {
        f(r);
      } else {
        t.if(
          M_ValidationUtils_maybe.propertyInData(t, c, r, l.opts.ownProperties)
        );
        f(r);
        if (l.allErrors) {
          t.else().var(p, true);
        }
        t.endIf();
      }
      e.it.definedProperties.add(r);
      e.ok(p);
    }
    function h(e) {
      return (
        l.opts.useDefaults && !l.compositeRule && undefined !== r[e].default
      );
    }
    function f(t) {
      e.subschema(
        {
          keyword: "properties",
          schemaProp: t,
          dataProp: t,
        },
        p
      );
    }
  },
};
exports.default = a;
