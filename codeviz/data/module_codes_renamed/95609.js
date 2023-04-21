Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const o = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: true,
  error: {
    message: ({ params: { min: e, max: t } }) =>
      undefined === t
        ? M_LanguageMarkerConstants_maybe.str`must contain at least ${e} valid item(s)`
        : M_LanguageMarkerConstants_maybe.str`must contain at least ${e} and no more than ${t} valid item(s)`,
    params: ({ params: { min: e, max: t } }) =>
      undefined === t
        ? M_LanguageMarkerConstants_maybe._`{minContains: ${e}}`
        : M_LanguageMarkerConstants_maybe._`{minContains: ${e}, maxContains: ${t}}`,
  },
  code(e) {
    const { gen: t, schema: r, parentSchema: o, data: s, it: a } = e;
    let c;
    let l;
    const { minContains: u, maxContains: d } = o;
    if (a.opts.next) {
      c = undefined === u ? 1 : u;
      l = d;
    } else {
      c = 1;
    }
    const p = t.const("len", M_LanguageMarkerConstants_maybe._`${s}.length`);
    e.setParams({
      min: c,
      max: l,
    });
    if (void 0 === l && 0 === c)
      return void (0, M_json_pointer_utils_maybe.checkStrictMode)(
        a,
        '"minContains" == 0 without "maxContains": "contains" keyword ignored'
      );
    if (undefined !== l && c > l) {
      M_json_pointer_utils_maybe.checkStrictMode(
        a,
        '"minContains" > "maxContains" is always invalid'
      );
      return void e.fail();
    }
    if (M_json_pointer_utils_maybe.alwaysValidSchema(a, r)) {
      let t = M_LanguageMarkerConstants_maybe._`${p} >= ${c}`;
      if (undefined !== l) {
        t = M_LanguageMarkerConstants_maybe._`${t} && ${p} <= ${l}`;
      }
      return void e.pass(t);
    }
    a.items = true;
    const h = t.name("valid");
    function f() {
      const e = t.name("_valid");
      const r = t.let("count", 0);
      g(e, () =>
        t.if(e, () =>
          (function (e) {
            t.code(M_LanguageMarkerConstants_maybe._`${e}++`);
            if (undefined === l) {
              t.if(M_LanguageMarkerConstants_maybe._`${e} >= ${c}`, () =>
                t.assign(h, true).break()
              );
            } else {
              t.if(M_LanguageMarkerConstants_maybe._`${e} > ${l}`, () =>
                t.assign(h, false).break()
              );
              if (1 === c) {
                t.assign(h, true);
              } else {
                t.if(M_LanguageMarkerConstants_maybe._`${e} >= ${c}`, () =>
                  t.assign(h, true)
                );
              }
            }
          })(r)
        )
      );
    }
    function g(r, n) {
      t.forRange("i", 0, p, (t) => {
        e.subschema(
          {
            keyword: "contains",
            dataProp: t,
            dataPropType: M_json_pointer_utils_maybe.Type.Num,
            compositeRule: true,
          },
          r
        );
        n();
      });
    }
    if (undefined === l && 1 === c) {
      g(h, () => t.if(h, () => t.break()));
    } else {
      if (0 === c) {
        t.let(h, true);
        if (undefined !== l) {
          t.if(M_LanguageMarkerConstants_maybe._`${s}.length > 0`, f);
        }
      } else {
        t.let(h, false);
        f();
      }
    }
    e.result(h, () => e.reset());
  },
};
exports.default = o;
