Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(15669);
const i = require(88936);
const o = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: true,
  error: {
    message: ({ params: { min: e, max: t } }) =>
      undefined === t
        ? n.str`must contain at least ${e} valid item(s)`
        : n.str`must contain at least ${e} and no more than ${t} valid item(s)`,
    params: ({ params: { min: e, max: t } }) =>
      undefined === t
        ? n._`{minContains: ${e}}`
        : n._`{minContains: ${e}, maxContains: ${t}}`,
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
    const p = t.const("len", n._`${s}.length`);
    e.setParams({
      min: c,
      max: l,
    });
    if (void 0 === l && 0 === c)
      return void (0, i.checkStrictMode)(
        a,
        '"minContains" == 0 without "maxContains": "contains" keyword ignored'
      );
    if (undefined !== l && c > l) {
      i.checkStrictMode(a, '"minContains" > "maxContains" is always invalid');
      return void e.fail();
    }
    if (i.alwaysValidSchema(a, r)) {
      let t = n._`${p} >= ${c}`;
      if (undefined !== l) {
        t = n._`${t} && ${p} <= ${l}`;
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
            t.code(n._`${e}++`);
            if (undefined === l) {
              t.if(n._`${e} >= ${c}`, () => t.assign(h, true).break());
            } else {
              t.if(n._`${e} > ${l}`, () => t.assign(h, false).break());
              if (1 === c) {
                t.assign(h, true);
              } else {
                t.if(n._`${e} >= ${c}`, () => t.assign(h, true));
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
            dataPropType: i.Type.Num,
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
          t.if(n._`${s}.length > 0`, f);
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