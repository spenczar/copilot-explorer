Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(3499);
const i = require(15669);
const o = require(88936);
const s = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: true,
  error: {
    message: ({ params: { missingProperty: e } }) =>
      i.str`must have required property '${e}'`,
    params: ({ params: { missingProperty: e } }) =>
      i._`{missingProperty: ${e}}`,
  },
  code(e) {
    const { gen: t, schema: r, schemaCode: s, data: a, $data: c, it: l } = e;
    const { opts: u } = l;
    if (!c && 0 === r.length) return;
    const d = r.length >= u.loopRequired;
    if (l.allErrors) {
      (function () {
        if (d || c) e.block$data(i.nil, p);
        else for (const t of r) n.checkReportMissingProp(e, t);
      })();
    } else {
      (function () {
        const o = t.let("missing");
        if (d || c) {
          const r = t.let("valid", true);
          e.block$data(r, () =>
            (function (r, o) {
              e.setParams({
                missingProperty: r,
              });
              t.forOf(
                r,
                s,
                () => {
                  t.assign(o, n.propertyInData(t, a, r, u.ownProperties));
                  t.if(i.not(o), () => {
                    e.error();
                    t.break();
                  });
                },
                i.nil
              );
            })(o, r)
          );
          e.ok(r);
        } else {
          t.if(n.checkMissingProp(e, r, o));
          n.reportMissingProp(e, o);
          t.else();
        }
      })();
    }
    if (u.strictRequired) {
      const t = e.parentSchema.properties,
        { definedProperties: n } = e.it;
      for (const e of r)
        if (void 0 === (null == t ? void 0 : t[e]) && !n.has(e)) {
          const t = `required property "${e}" is not defined at "${
            l.schemaEnv.baseId + l.errSchemaPath
          }" (strictRequired)`;
          (0, o.checkStrictMode)(l, t, l.opts.strictRequired);
        }
    }
    function p() {
      t.forOf("prop", s, (r) => {
        e.setParams({
          missingProperty: r,
        });
        t.if(n.noPropertyInData(t, a, r, u.ownProperties), () => e.error());
      });
    }
  },
};
exports.default = s;