Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(15669);
const i = require(77421);
const o = require(87382);
const s = require(88936);
const a = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: {
    message: ({ params: { discrError: e, tagName: t } }) =>
      e === i.DiscrError.Tag
        ? `tag "${t}" must be string`
        : `value of tag "${t}" must be in oneOf`,
    params: ({ params: { discrError: e, tag: t, tagName: r } }) =>
      n._`{error: ${e}, tag: ${r}, tagValue: ${t}}`,
  },
  code(e) {
    const { gen: t, data: r, schema: a, parentSchema: c, it: l } = e;
    const { oneOf: u } = c;
    if (!l.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const d = a.propertyName;
    if ("string" != typeof d)
      throw new Error("discriminator: requires propertyName");
    if (a.mapping) throw new Error("discriminator: mapping is not supported");
    if (!u) throw new Error("discriminator: requires oneOf keyword");
    const p = t.let("valid", false);
    const h = t.const("tag", n._`${r}${n.getProperty(d)}`);
    function f(r) {
      const i = t.name("valid");
      const o = e.subschema(
        {
          keyword: "oneOf",
          schemaProp: r,
        },
        i
      );
      e.mergeEvaluated(o, n.Name);
      return i;
    }
    t.if(
      n._`typeof ${h} == "string"`,
      () =>
        (function () {
          const r = (function () {
            var e;
            const t = {};
            const r = i(c);
            let n = true;
            for (let t = 0; t < u.length; t++) {
              let c = u[t];
              if (
                (null == c ? undefined : c.$ref) &&
                !s.schemaHasRulesButRef(c, l.self.RULES)
              ) {
                c = o.resolveRef.call(
                  l.self,
                  l.schemaEnv.root,
                  l.baseId,
                  null == c ? undefined : c.$ref
                );
                if (c instanceof o.SchemaEnv) {
                  c = c.schema;
                }
              }
              const p =
                null === (e = null == c ? undefined : c.properties) ||
                undefined === e
                  ? undefined
                  : e[d];
              if ("object" != typeof p)
                throw new Error(
                  `discriminator: oneOf subschemas (or referenced schemas) must have "properties/${d}"`
                );
              n = n && (r || i(c));
              a(p, t);
            }
            if (!n) throw new Error(`discriminator: "${d}" must be required`);
            return t;
            function i({ required: e }) {
              return Array.isArray(e) && e.includes(d);
            }
            function a(e, t) {
              if (e.const) p(e.const, t);
              else {
                if (!e.enum)
                  throw new Error(
                    `discriminator: "properties/${d}" must have "const" or "enum"`
                  );
                for (const r of e.enum) p(r, t);
              }
            }
            function p(e, r) {
              if ("string" != typeof e || e in t)
                throw new Error(
                  `discriminator: "${d}" values must be unique strings`
                );
              t[e] = r;
            }
          })();
          t.if(false);
          for (const e in r) {
            t.elseIf(n._`${h} === ${e}`);
            t.assign(p, f(r[e]));
          }
          t.else();
          e.error(false, {
            discrError: i.DiscrError.Mapping,
            tag: h,
            tagName: d,
          });
          t.endIf();
        })(),
      () =>
        e.error(false, {
          discrError: i.DiscrError.Tag,
          tag: h,
          tagName: d,
        })
    );
    e.ok(p);
  },
};
exports.default = a;