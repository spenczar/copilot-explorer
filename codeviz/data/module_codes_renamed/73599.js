Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const i = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: true,
  error: {
    message: ({ schemaCode: e }) =>
      M_LanguageMarkerConstants_maybe.str`must match format "${e}"`,
    params: ({ schemaCode: e }) =>
      M_LanguageMarkerConstants_maybe._`{format: ${e}}`,
  },
  code(e, t) {
    const { gen: r, data: i, $data: o, schema: s, schemaCode: a, it: c } = e;
    const { opts: l, errSchemaPath: u, schemaEnv: d, self: p } = c;
    if (l.validateFormats) {
      if (o) {
        (function () {
          const o = r.scopeValue("formats", {
            ref: p.formats,
            code: l.code.formats,
          });
          const s = r.const(
            "fDef",
            M_LanguageMarkerConstants_maybe._`${o}[${a}]`
          );
          const c = r.let("fType");
          const u = r.let("format");
          r.if(
            M_LanguageMarkerConstants_maybe._`typeof ${s} == "object" && !(${s} instanceof RegExp)`,
            () =>
              r
                .assign(
                  c,
                  M_LanguageMarkerConstants_maybe._`${s}.type || "string"`
                )
                .assign(u, M_LanguageMarkerConstants_maybe._`${s}.validate`),
            () =>
              r
                .assign(c, M_LanguageMarkerConstants_maybe._`"string"`)
                .assign(u, s)
          );
          e.fail$data(
            M_LanguageMarkerConstants_maybe.or(
              false === l.strictSchema
                ? M_LanguageMarkerConstants_maybe.nil
                : M_LanguageMarkerConstants_maybe._`${a} && !${u}`,
              (function () {
                const e = d.$async
                  ? M_LanguageMarkerConstants_maybe._`(${s}.async ? await ${u}(${i}) : ${u}(${i}))`
                  : M_LanguageMarkerConstants_maybe._`${u}(${i})`;
                const r = M_LanguageMarkerConstants_maybe._`(typeof ${u} == "function" ? ${e} : ${u}.test(${i}))`;
                return M_LanguageMarkerConstants_maybe._`${u} && ${u} !== true && ${c} === ${t} && !${r}`;
              })()
            )
          );
        })();
      } else {
        (function () {
          const o = p.formats[s];
          if (!o)
            return void (function () {
              if (false !== l.strictSchema) throw new Error(e());
              function e() {
                return `unknown format "${s}" ignored in schema at path "${u}"`;
              }
              p.logger.warn(e());
            })();
          if (true === o) return;
          const [a, c, h] = (function (e) {
            const t =
              e instanceof RegExp
                ? M_LanguageMarkerConstants_maybe.regexpCode(e)
                : l.code.formats
                ? M_LanguageMarkerConstants_maybe._`${
                    l.code.formats
                  }${M_LanguageMarkerConstants_maybe.getProperty(s)}`
                : undefined;
            const i = r.scopeValue("formats", {
              key: s,
              ref: e,
              code: t,
            });
            return "object" != typeof e || e instanceof RegExp
              ? ["string", e, i]
              : [
                  e.type || "string",
                  e.validate,
                  M_LanguageMarkerConstants_maybe._`${i}.validate`,
                ];
          })(o);
          if (a === t) {
            e.pass(
              (function () {
                if ("object" == typeof o && !(o instanceof RegExp) && o.async) {
                  if (!d.$async) throw new Error("async format in sync schema");
                  return M_LanguageMarkerConstants_maybe._`await ${h}(${i})`;
                }
                return "function" == typeof c
                  ? M_LanguageMarkerConstants_maybe._`${h}(${i})`
                  : M_LanguageMarkerConstants_maybe._`${h}.test(${i})`;
              })()
            );
          }
        })();
      }
    }
  },
};
exports.default = i;
