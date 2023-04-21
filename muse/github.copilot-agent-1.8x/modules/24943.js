Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(3499);
const i = require(15669);
const o = require(17250);
const s = require(88936);
const a = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: true,
  trackErrors: true,
  error: {
    message: "must NOT have additional properties",
    params: ({ params: e }) =>
      i._`{additionalProperty: ${e.additionalProperty}}`,
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
    if ("all" !== p.removeAdditional && (0, s.alwaysValidSchema)(u, r)) return;
    const h = n.allSchemaProperties(a.properties);
    const f = n.allSchemaProperties(a.patternProperties);
    function g(e) {
      t.code(i._`delete ${c}[${e}]`);
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
        if ("object" == typeof r && !s.alwaysValidSchema(u, r)) {
          const r = t.name("valid");
          if ("failing" === p.removeAdditional) {
            y(n, r, false);
            t.if(i.not(r), () => {
              e.reset();
              g(n);
            });
          } else {
            y(n, r);
            if (d) {
              t.if(i.not(r), () => t.break());
            }
          }
        }
      }
    }
    function y(t, r, n) {
      const i = {
        keyword: "additionalProperties",
        dataProp: t,
        dataPropType: s.Type.Str,
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
              const e = s.schemaRefOrVal(u, a.properties, "properties");
              o = n.isOwnProperty(t, e, r);
            } else
              o = h.length ? i.or(...h.map((e) => i._`${r} === ${e}`)) : i.nil;
            if (f.length) {
              o = i.or(
                o,
                ...f.map((t) => i._`${n.usePattern(e, t)}.test(${r})`)
              );
            }
            return i.not(o);
          })(r),
          () => m(r)
        );
      } else {
        m(r);
      }
    });
    e.ok(i._`${l} === ${o.default.errors}`);
  },
};
exports.default = a;