Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.validateTuple = undefined;
const n = require(15669);
const i = require(88936);
const o = require(3499);
const s = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t)) return validateTuple(e, "additionalItems", t);
    r.items = true;
    if (i.alwaysValidSchema(r, t)) {
      e.ok(o.validateArray(e));
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
      i.checkStrictMode(l, e, n.strictTuples);
    }
  })(s);
  if (l.opts.unevaluated && r.length && true !== l.items) {
    l.items = i.mergeEvaluated.items(o, r.length, l.items);
  }
  const u = o.name("valid");
  const d = o.const("len", n._`${a}.length`);
  r.forEach((t, r) => {
    if (i.alwaysValidSchema(l, t)) {
      o.if(n._`${d} > ${r}`, () =>
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