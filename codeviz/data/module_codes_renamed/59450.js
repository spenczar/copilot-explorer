Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const M_ajv_runtime_equal_module_maybe = require("ajv-runtime-equal-module");
const s = {
  keyword: "enum",
  schemaType: "array",
  $data: true,
  error: {
    message: "must be equal to one of the allowed values",
    params: ({ schemaCode: e }) =>
      M_LanguageMarkerConstants_maybe._`{allowedValues: ${e}}`,
  },
  code(e) {
    const { gen: t, data: r, $data: s, schema: a, schemaCode: c, it: l } = e;
    if (!s && 0 === a.length) throw new Error("enum must have non-empty array");
    const u = a.length >= l.opts.loopEnum;
    let d;
    const p = () =>
      null != d
        ? d
        : (d = M_json_pointer_utils_maybe.useFunc(
            t,
            M_ajv_runtime_equal_module_maybe.default
          ));
    let h;
    if (u || s) {
      h = t.let("valid");
      e.block$data(h, function () {
        t.assign(h, false);
        t.forOf("v", c, (e) =>
          t.if(M_LanguageMarkerConstants_maybe._`${p()}(${r}, ${e})`, () =>
            t.assign(h, true).break()
          )
        );
      });
    } else {
      if (!Array.isArray(a)) throw new Error("ajv implementation error");
      const e = t.const("vSchema", c);
      h = M_LanguageMarkerConstants_maybe.or(
        ...a.map((t, i) =>
          (function (e, t) {
            const i = a[t];
            return "object" == typeof i && null !== i
              ? M_LanguageMarkerConstants_maybe._`${p()}(${r}, ${e}[${t}])`
              : M_LanguageMarkerConstants_maybe._`${r} === ${i}`;
          })(e, i)
        )
      );
    }
    e.pass(h);
  },
};
exports.default = s;
