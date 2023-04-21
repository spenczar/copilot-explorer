Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(3499);
const i = require(15669);
const o = require(88936);
const s = require(88936);
const a = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: a, parentSchema: c, it: l } = e;
    const { opts: u } = l;
    const d = n.allSchemaProperties(r);
    const p = d.filter((e) => o.alwaysValidSchema(l, r[e]));
    if (
      0 === d.length ||
      (p.length === d.length && (!l.opts.unevaluated || true === l.props))
    )
      return;
    const h = u.strictSchema && !u.allowMatchingProperties && c.properties;
    const f = t.name("valid");
    if (true === l.props || l.props instanceof i.Name) {
      l.props = s.evaluatedPropsToName(t, l.props);
    }
    const { props: g } = l;
    function m(e) {
      for (const t in h)
        if (new RegExp(e).test(t)) {
          o.checkStrictMode(
            l,
            `property ${t} matches pattern ${e} (use allowMatchingProperties)`
          );
        }
    }
    function y(r) {
      t.forIn("key", a, (o) => {
        t.if(i._`${n.usePattern(e, r)}.test(${o})`, () => {
          const n = p.includes(r);
          if (n) {
            e.subschema(
              {
                keyword: "patternProperties",
                schemaProp: r,
                dataProp: o,
                dataPropType: s.Type.Str,
              },
              f
            );
          }
          if (l.opts.unevaluated && true !== g) {
            t.assign(i._`${g}[${o}]`, true);
          } else {
            if (n || l.allErrors) {
              t.if(i.not(f), () => t.break());
            }
          }
        });
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