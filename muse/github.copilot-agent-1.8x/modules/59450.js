Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(15669);
const i = require(88936);
const o = require(94285);
const s = {
  keyword: "enum",
  schemaType: "array",
  $data: true,
  error: {
    message: "must be equal to one of the allowed values",
    params: ({ schemaCode: e }) => n._`{allowedValues: ${e}}`,
  },
  code(e) {
    const { gen: t, data: r, $data: s, schema: a, schemaCode: c, it: l } = e;
    if (!s && 0 === a.length) throw new Error("enum must have non-empty array");
    const u = a.length >= l.opts.loopEnum;
    let d;
    const p = () => (null != d ? d : (d = i.useFunc(t, o.default)));
    let h;
    if (u || s) {
      h = t.let("valid");
      e.block$data(h, function () {
        t.assign(h, false);
        t.forOf("v", c, (e) =>
          t.if(n._`${p()}(${r}, ${e})`, () => t.assign(h, true).break())
        );
      });
    } else {
      if (!Array.isArray(a)) throw new Error("ajv implementation error");
      const e = t.const("vSchema", c);
      h = n.or(
        ...a.map((t, i) =>
          (function (e, t) {
            const i = a[t];
            return "object" == typeof i && null !== i
              ? n._`${p()}(${r}, ${e}[${t}])`
              : n._`${r} === ${i}`;
          })(e, i)
        )
      );
    }
    e.pass(h);
  },
};
exports.default = s;