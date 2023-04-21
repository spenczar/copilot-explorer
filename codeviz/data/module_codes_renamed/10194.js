Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_data_type_validator_maybe = require("data-type-validator");
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const M_ajv_runtime_equal_module_maybe = require("ajv-runtime-equal-module");
const a = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: true,
  error: {
    message: ({ params: { i: e, j: t } }) =>
      M_LanguageMarkerConstants_maybe.str`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
    params: ({ params: { i: e, j: t } }) =>
      M_LanguageMarkerConstants_maybe._`{i: ${e}, j: ${t}}`,
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
    const h = l.items
      ? M_data_type_validator_maybe.getSchemaTypes(l.items)
      : [];
    function f(o, s) {
      const a = t.name("item");
      const c = M_data_type_validator_maybe.checkDataTypes(
        h,
        a,
        d.opts.strictNumbers,
        M_data_type_validator_maybe.DataType.Wrong
      );
      const l = t.const("indices", M_LanguageMarkerConstants_maybe._`{}`);
      t.for(M_LanguageMarkerConstants_maybe._`;${o}--;`, () => {
        t.let(a, M_LanguageMarkerConstants_maybe._`${r}[${o}]`);
        t.if(c, M_LanguageMarkerConstants_maybe._`continue`);
        if (h.length > 1) {
          t.if(
            M_LanguageMarkerConstants_maybe._`typeof ${a} == "string"`,
            M_LanguageMarkerConstants_maybe._`${a} += "_"`
          );
        }
        t.if(
          M_LanguageMarkerConstants_maybe._`typeof ${l}[${a}] == "number"`,
          () => {
            t.assign(s, M_LanguageMarkerConstants_maybe._`${l}[${a}]`);
            e.error();
            t.assign(p, false).break();
          }
        ).code(M_LanguageMarkerConstants_maybe._`${l}[${a}] = ${o}`);
      });
    }
    function g(n, a) {
      const c = M_json_pointer_utils_maybe.useFunc(
        t,
        M_ajv_runtime_equal_module_maybe.default
      );
      const l = t.name("outer");
      t.label(l).for(M_LanguageMarkerConstants_maybe._`;${n}--;`, () =>
        t.for(M_LanguageMarkerConstants_maybe._`${a} = ${n}; ${a}--;`, () =>
          t.if(
            M_LanguageMarkerConstants_maybe._`${c}(${r}[${n}], ${r}[${a}])`,
            () => {
              e.error();
              t.assign(p, false).break(l);
            }
          )
        )
      );
    }
    e.block$data(
      p,
      function () {
        const n = t.let("i", M_LanguageMarkerConstants_maybe._`${r}.length`);
        const o = t.let("j");
        e.setParams({
          i: n,
          j: o,
        });
        t.assign(p, true);
        t.if(M_LanguageMarkerConstants_maybe._`${n} > 1`, () =>
          (h.length > 0 && !h.some((e) => "object" === e || "array" === e)
            ? f
            : g)(n, o)
        );
      },
      M_LanguageMarkerConstants_maybe._`${u} === false`
    );
    e.ok(p);
  },
};
exports.default = a;
