Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_DiscriminatorErrorConstants_maybe = require("DiscriminatorErrorConstants");
const M_schema_compiler_utils_maybe = require("schema-compiler-utils");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const a = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: {
    message: ({ params: { discrError: e, tagName: t } }) =>
      e === M_DiscriminatorErrorConstants_maybe.DiscrError.Tag
        ? `tag "${t}" must be string`
        : `value of tag "${t}" must be in oneOf`,
    params: ({ params: { discrError: e, tag: t, tagName: r } }) =>
      M_LanguageMarkerConstants_maybe._`{error: ${e}, tag: ${r}, tagValue: ${t}}`,
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
    const h = t.const(
      "tag",
      M_LanguageMarkerConstants_maybe._`${r}${M_LanguageMarkerConstants_maybe.getProperty(
        d
      )}`
    );
    function f(r) {
      const i = t.name("valid");
      const o = e.subschema(
        {
          keyword: "oneOf",
          schemaProp: r,
        },
        i
      );
      e.mergeEvaluated(o, M_LanguageMarkerConstants_maybe.Name);
      return i;
    }
    t.if(
      M_LanguageMarkerConstants_maybe._`typeof ${h} == "string"`,
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
                !M_json_pointer_utils_maybe.schemaHasRulesButRef(
                  c,
                  l.self.RULES
                )
              ) {
                c = M_schema_compiler_utils_maybe.resolveRef.call(
                  l.self,
                  l.schemaEnv.root,
                  l.baseId,
                  null == c ? undefined : c.$ref
                );
                if (c instanceof M_schema_compiler_utils_maybe.SchemaEnv) {
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
            t.elseIf(M_LanguageMarkerConstants_maybe._`${h} === ${e}`);
            t.assign(p, f(r[e]));
          }
          t.else();
          e.error(false, {
            discrError: M_DiscriminatorErrorConstants_maybe.DiscrError.Mapping,
            tag: h,
            tagName: d,
          });
          t.endIf();
        })(),
      () =>
        e.error(false, {
          discrError: M_DiscriminatorErrorConstants_maybe.DiscrError.Tag,
          tag: h,
          tagName: d,
        })
    );
    e.ok(p);
  },
};
exports.default = a;
