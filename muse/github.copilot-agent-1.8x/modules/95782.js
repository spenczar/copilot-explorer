Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.validateKeywordUsage =
  exports.validSchemaType =
  exports.funcKeywordCode =
  exports.macroKeywordCode =
    undefined;
const n = require(15669);
const i = require(17250);
const o = require(3499);
const s = require(6930);
function a(e) {
  const { gen: t, data: r, it: i } = e;
  t.if(i.parentData, () =>
    t.assign(r, n._`${i.parentData}[${i.parentDataProperty}]`)
  );
}
function c(e, t, r) {
  if (undefined === r) throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue(
    "keyword",
    "function" == typeof r
      ? {
          ref: r,
        }
      : {
          ref: r,
          code: n.stringify(r),
        }
  );
}
exports.macroKeywordCode = function (e, t) {
  const { gen: r, keyword: i, schema: o, parentSchema: s, it: a } = e;
  const l = t.macro.call(a.self, o, s, a);
  const u = c(r, i, l);
  if (false !== a.opts.validateSchema) {
    a.self.validateSchema(l, true);
  }
  const d = r.name("valid");
  e.subschema(
    {
      schema: l,
      schemaPath: n.nil,
      errSchemaPath: `${a.errSchemaPath}/${i}`,
      topSchemaRef: u,
      compositeRule: true,
    },
    d
  );
  e.pass(d, () => e.error(true));
};
exports.funcKeywordCode = function (e, t) {
  var r;
  const { gen: l, keyword: u, schema: d, parentSchema: p, $data: h, it: f } = e;
  !(function ({ schemaEnv: e }, t) {
    if (t.async && !e.$async) throw new Error("async keyword in sync schema");
  })(f, t);
  const g = !h && t.compile ? t.compile.call(f.self, d, p, f) : t.validate;
  const m = c(l, u, g);
  const y = l.let("valid");
  function v(r = t.async ? n._`await ` : n.nil) {
    const s = f.opts.passContext ? i.default.this : i.default.self;
    const a = !(("compile" in t && !h) || false === t.schema);
    l.assign(y, n._`${r}${o.callValidateCode(e, m, s, a)}`, t.modifying);
  }
  function _(e) {
    var r;
    l.if(n.not(null !== (r = t.valid) && undefined !== r ? r : y), e);
  }
  e.block$data(y, function () {
    if (false === t.errors) {
      v();
      if (t.modifying) {
        a(e);
      }
      _(() => e.error());
    } else {
      const r = t.async
        ? (function () {
            const e = l.let("ruleErrs", null);
            l.try(
              () => v(n._`await `),
              (t) =>
                l.assign(y, false).if(
                  n._`${t} instanceof ${f.ValidationError}`,
                  () => l.assign(e, n._`${t}.errors`),
                  () => l.throw(t)
                )
            );
            return e;
          })()
        : (function () {
            const e = n._`${m}.errors`;
            l.assign(e, null);
            v(n.nil);
            return e;
          })();
      if (t.modifying) {
        a(e);
      }
      _(() =>
        (function (e, t) {
          const { gen: r } = e;
          r.if(
            n._`Array.isArray(${t})`,
            () => {
              r.assign(
                i.default.vErrors,
                n._`${i.default.vErrors} === null ? ${t} : ${i.default.vErrors}.concat(${t})`
              ).assign(i.default.errors, n._`${i.default.vErrors}.length`);
              s.extendErrors(e);
            },
            () => e.error()
          );
        })(e, r)
      );
    }
  });
  e.ok(null !== (r = t.valid) && undefined !== r ? r : y);
};
exports.validSchemaType = function (e, t, r = false) {
  return (
    !t.length ||
    t.some((t) =>
      "array" === t
        ? Array.isArray(e)
        : "object" === t
        ? e && "object" == typeof e && !Array.isArray(e)
        : typeof e == t || (r && undefined === e)
    )
  );
};
exports.validateKeywordUsage = function (
  { schema: e, opts: t, self: r, errSchemaPath: n },
  i,
  o
) {
  if (Array.isArray(i.keyword) ? !i.keyword.includes(o) : i.keyword !== o)
    throw new Error("ajv implementation error");
  const s = i.dependencies;
  if (
    null == s
      ? undefined
      : s.some((t) => !Object.prototype.hasOwnProperty.call(e, t))
  )
    throw new Error(
      `parent schema must have dependencies of ${o}: ${s.join(",")}`
    );
  if (i.validateSchema && !i.validateSchema(e[o])) {
    const e =
      `keyword "${o}" value is invalid at path "${n}": ` +
      r.errorsText(i.validateSchema.errors);
    if ("log" !== t.validateSchema) throw new Error(e);
    r.logger.error(e);
  }
};