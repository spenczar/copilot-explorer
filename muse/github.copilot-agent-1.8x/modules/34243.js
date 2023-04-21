Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(91686);
const i = require(3499);
const o = require(88936);
const s = require(24943);
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
      s.default.code(new n.KeywordCxt(l, s.default, "additionalProperties"));
    }
    const u = i.allSchemaProperties(r);
    for (const e of u) l.definedProperties.add(e);
    if (l.opts.unevaluated && u.length && true !== l.props) {
      l.props = o.mergeEvaluated.props(t, o.toHash(u), l.props);
    }
    const d = u.filter((e) => !o.alwaysValidSchema(l, r[e]));
    if (0 === d.length) return;
    const p = t.name("valid");
    for (const r of d) {
      if (h(r)) {
        f(r);
      } else {
        t.if(i.propertyInData(t, c, r, l.opts.ownProperties));
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