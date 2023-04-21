Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(15669);
const i = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: true,
  error: {
    message: ({ schemaCode: e }) => n.str`must match format "${e}"`,
    params: ({ schemaCode: e }) => n._`{format: ${e}}`,
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
          const s = r.const("fDef", n._`${o}[${a}]`);
          const c = r.let("fType");
          const u = r.let("format");
          r.if(
            n._`typeof ${s} == "object" && !(${s} instanceof RegExp)`,
            () =>
              r
                .assign(c, n._`${s}.type || "string"`)
                .assign(u, n._`${s}.validate`),
            () => r.assign(c, n._`"string"`).assign(u, s)
          );
          e.fail$data(
            n.or(
              false === l.strictSchema ? n.nil : n._`${a} && !${u}`,
              (function () {
                const e = d.$async
                  ? n._`(${s}.async ? await ${u}(${i}) : ${u}(${i}))`
                  : n._`${u}(${i})`;
                const r = n._`(typeof ${u} == "function" ? ${e} : ${u}.test(${i}))`;
                return n._`${u} && ${u} !== true && ${c} === ${t} && !${r}`;
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
                ? n.regexpCode(e)
                : l.code.formats
                ? n._`${l.code.formats}${n.getProperty(s)}`
                : undefined;
            const i = r.scopeValue("formats", {
              key: s,
              ref: e,
              code: t,
            });
            return "object" != typeof e || e instanceof RegExp
              ? ["string", e, i]
              : [e.type || "string", e.validate, n._`${i}.validate`];
          })(o);
          if (a === t) {
            e.pass(
              (function () {
                if ("object" == typeof o && !(o instanceof RegExp) && o.async) {
                  if (!d.$async) throw new Error("async format in sync schema");
                  return n._`await ${h}(${i})`;
                }
                return "function" == typeof c
                  ? n._`${h}(${i})`
                  : n._`${h}.test(${i})`;
              })()
            );
          }
        })();
      }
    }
  },
};
exports.default = i;