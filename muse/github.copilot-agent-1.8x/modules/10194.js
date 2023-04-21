Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(97332);
const i = require(15669);
const o = require(88936);
const s = require(94285);
const a = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: true,
  error: {
    message: ({ params: { i: e, j: t } }) =>
      i.str`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
    params: ({ params: { i: e, j: t } }) => i._`{i: ${e}, j: ${t}}`,
  },
  code(e) {
    const {
      gen: t,
      data: r,
      $data: a,
      schema: c,
      parentSchema: l,
      schemaCode: u,
      it: d,
    } = e;
    if (!a && !c) return;
    const p = t.let("valid");
    const h = l.items ? n.getSchemaTypes(l.items) : [];
    function f(o, s) {
      const a = t.name("item");
      const c = n.checkDataTypes(h, a, d.opts.strictNumbers, n.DataType.Wrong);
      const l = t.const("indices", i._`{}`);
      t.for(i._`;${o}--;`, () => {
        t.let(a, i._`${r}[${o}]`);
        t.if(c, i._`continue`);
        if (h.length > 1) {
          t.if(i._`typeof ${a} == "string"`, i._`${a} += "_"`);
        }
        t.if(i._`typeof ${l}[${a}] == "number"`, () => {
          t.assign(s, i._`${l}[${a}]`);
          e.error();
          t.assign(p, false).break();
        }).code(i._`${l}[${a}] = ${o}`);
      });
    }
    function g(n, a) {
      const c = o.useFunc(t, s.default);
      const l = t.name("outer");
      t.label(l).for(i._`;${n}--;`, () =>
        t.for(i._`${a} = ${n}; ${a}--;`, () =>
          t.if(i._`${c}(${r}[${n}], ${r}[${a}])`, () => {
            e.error();
            t.assign(p, false).break(l);
          })
        )
      );
    }
    e.block$data(
      p,
      function () {
        const n = t.let("i", i._`${r}.length`);
        const o = t.let("j");
        e.setParams({
          i: n,
          j: o,
        });
        t.assign(p, true);
        t.if(i._`${n} > 1`, () =>
          (h.length > 0 && !h.some((e) => "object" === e || "array" === e)
            ? f
            : g)(n, o)
        );
      },
      i._`${u} === false`
    );
    e.ok(p);
  },
};
exports.default = a;