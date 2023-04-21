Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.extendErrors =
  exports.resetErrorsCount =
  exports.reportExtraError =
  exports.reportError =
  exports.keyword$DataError =
  exports.keywordError =
    undefined;
const n = require(15669);
const i = require(88936);
const o = require(17250);
function s(e, t) {
  const r = e.const("err", t);
  e.if(
    n._`${o.default.vErrors} === null`,
    () => e.assign(o.default.vErrors, n._`[${r}]`),
    n._`${o.default.vErrors}.push(${r})`
  );
  e.code(n._`${o.default.errors}++`);
}
function a(e, t) {
  const { gen: r, validateName: i, schemaEnv: o } = e;
  if (o.$async) {
    r.throw(n._`new ${e.ValidationError}(${t})`);
  } else {
    r.assign(n._`${i}.errors`, t);
    r.return(false);
  }
}
exports.keywordError = {
  message: ({ keyword: e }) => n.str`must pass "${e}" keyword validation`,
};
exports.keyword$DataError = {
  message: ({ keyword: e, schemaType: t }) =>
    t
      ? n.str`"${e}" keyword must be ${t} ($data)`
      : n.str`"${e}" keyword is invalid ($data)`,
};
exports.reportError = function (e, r = exports.keywordError, i, o) {
  const { it: c } = e;
  const { gen: u, compositeRule: d, allErrors: p } = c;
  const h = l(e, r, i);
  if (null != o ? o : d || p) {
    s(u, h);
  } else {
    a(c, n._`[${h}]`);
  }
};
exports.reportExtraError = function (e, r = exports.keywordError, n) {
  const { it: i } = e;
  const { gen: c, compositeRule: u, allErrors: d } = i;
  s(c, l(e, r, n));
  if (u || d) {
    a(i, o.default.vErrors);
  }
};
exports.resetErrorsCount = function (e, t) {
  e.assign(o.default.errors, t);
  e.if(n._`${o.default.vErrors} !== null`, () =>
    e.if(
      t,
      () => e.assign(n._`${o.default.vErrors}.length`, t),
      () => e.assign(o.default.vErrors, null)
    )
  );
};
exports.extendErrors = function ({
  gen: e,
  keyword: t,
  schemaValue: r,
  data: i,
  errsCount: s,
  it: a,
}) {
  if (undefined === s) throw new Error("ajv implementation error");
  const c = e.name("err");
  e.forRange("i", s, o.default.errors, (s) => {
    e.const(c, n._`${o.default.vErrors}[${s}]`);
    e.if(n._`${c}.instancePath === undefined`, () =>
      e.assign(
        n._`${c}.instancePath`,
        n.strConcat(o.default.instancePath, a.errorPath)
      )
    );
    e.assign(n._`${c}.schemaPath`, n.str`${a.errSchemaPath}/${t}`);
    if (a.opts.verbose) {
      e.assign(n._`${c}.schema`, r);
      e.assign(n._`${c}.data`, i);
    }
  });
};
const c = {
  keyword: new n.Name("keyword"),
  schemaPath: new n.Name("schemaPath"),
  params: new n.Name("params"),
  propertyName: new n.Name("propertyName"),
  message: new n.Name("message"),
  schema: new n.Name("schema"),
  parentSchema: new n.Name("parentSchema"),
};
function l(e, t, r) {
  const { createErrors: i } = e.it;
  return false === i
    ? n._`{}`
    : (function (e, t, r = {}) {
        const { gen: i, it: s } = e;
        const a = [u(s, r), d(e, r)];
        (function (e, { params: t, message: r }, i) {
          const { keyword: s, data: a, schemaValue: l, it: u } = e;
          const {
            opts: d,
            propertyName: p,
            topSchemaRef: h,
            schemaPath: f,
          } = u;
          i.push(
            [c.keyword, s],
            [c.params, "function" == typeof t ? t(e) : t || n._`{}`]
          );
          if (d.messages) {
            i.push([c.message, "function" == typeof r ? r(e) : r]);
          }
          if (d.verbose) {
            i.push(
              [c.schema, l],
              [c.parentSchema, n._`${h}${f}`],
              [o.default.data, a]
            );
          }
          if (p) {
            i.push([c.propertyName, p]);
          }
        })(e, t, a);
        return i.object(...a);
      })(e, t, r);
}
function u({ errorPath: e }, { instancePath: t }) {
  const r = t ? n.str`${e}${i.getErrorPath(t, i.Type.Str)}` : e;
  return [o.default.instancePath, n.strConcat(o.default.instancePath, r)];
}
function d(
  { keyword: e, it: { errSchemaPath: t } },
  { schemaPath: r, parentSchema: o }
) {
  let s = o ? t : n.str`${t}/${e}`;
  if (r) {
    s = n.str`${s}${i.getErrorPath(r, i.Type.Str)}`;
  }
  return [c.schemaPath, s];
}