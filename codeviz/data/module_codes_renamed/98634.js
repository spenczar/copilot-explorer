Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.validateTuple = undefined;
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const M_ValidationUtils_maybe = require("ValidationUtils");
const s = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t)) return validateTuple(e, "additionalItems", t);
    r.items = true;
    if (M_json_pointer_utils_maybe.alwaysValidSchema(r, t)) {
      e.ok(M_ValidationUtils_maybe.validateArray(e));
    }
  },
};
function validateTuple(e, t, r = e.schema) {
  const { gen: o, parentSchema: s, data: a, keyword: c, it: l } = e;
  !(function (e) {
    const { opts: n, errSchemaPath: o } = l;
    const s = r.length;
    const a = s === e.minItems && (s === e.maxItems || false === e[t]);
    if (n.strictTuples && !a) {
      const e = `"${c}" is ${s}-tuple, but minItems or maxItems/${t} are not specified or different at path "${o}"`;
      M_json_pointer_utils_maybe.checkStrictMode(l, e, n.strictTuples);
    }
  })(s);
  if (l.opts.unevaluated && r.length && true !== l.items) {
    l.items = M_json_pointer_utils_maybe.mergeEvaluated.items(
      o,
      r.length,
      l.items
    );
  }
  const u = o.name("valid");
  const d = o.const("len", M_LanguageMarkerConstants_maybe._`${a}.length`);
  r.forEach((t, r) => {
    if (M_json_pointer_utils_maybe.alwaysValidSchema(l, t)) {
      o.if(M_LanguageMarkerConstants_maybe._`${d} > ${r}`, () =>
        e.subschema(
          {
            keyword: c,
            schemaProp: r,
            dataProp: r,
          },
          u
        )
      );
      e.ok(u);
    }
  });
}
exports.validateTuple = validateTuple;
exports.default = s;
