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
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const M_language_marker_constants_maybe = require("language-marker-constants");
function s(e, t) {
  const r = e.const("err", t);
  e.if(
    M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.vErrors} === null`,
    () =>
      e.assign(
        M_language_marker_constants_maybe.default.vErrors,
        M_LanguageMarkerConstants_maybe._`[${r}]`
      ),
    M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.vErrors}.push(${r})`
  );
  e.code(
    M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.errors}++`
  );
}
function a(e, t) {
  const { gen: r, validateName: i, schemaEnv: o } = e;
  if (o.$async) {
    r.throw(M_LanguageMarkerConstants_maybe._`new ${e.ValidationError}(${t})`);
  } else {
    r.assign(M_LanguageMarkerConstants_maybe._`${i}.errors`, t);
    r.return(false);
  }
}
exports.keywordError = {
  message: ({ keyword: e }) =>
    M_LanguageMarkerConstants_maybe.str`must pass "${e}" keyword validation`,
};
exports.keyword$DataError = {
  message: ({ keyword: e, schemaType: t }) =>
    t
      ? M_LanguageMarkerConstants_maybe.str`"${e}" keyword must be ${t} ($data)`
      : M_LanguageMarkerConstants_maybe.str`"${e}" keyword is invalid ($data)`,
};
exports.reportError = function (e, r = exports.keywordError, i, o) {
  const { it: c } = e;
  const { gen: u, compositeRule: d, allErrors: p } = c;
  const h = l(e, r, i);
  if (null != o ? o : d || p) {
    s(u, h);
  } else {
    a(c, M_LanguageMarkerConstants_maybe._`[${h}]`);
  }
};
exports.reportExtraError = function (e, r = exports.keywordError, n) {
  const { it: i } = e;
  const { gen: c, compositeRule: u, allErrors: d } = i;
  s(c, l(e, r, n));
  if (u || d) {
    a(i, M_language_marker_constants_maybe.default.vErrors);
  }
};
exports.resetErrorsCount = function (e, t) {
  e.assign(M_language_marker_constants_maybe.default.errors, t);
  e.if(
    M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.vErrors} !== null`,
    () =>
      e.if(
        t,
        () =>
          e.assign(
            M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.vErrors}.length`,
            t
          ),
        () => e.assign(M_language_marker_constants_maybe.default.vErrors, null)
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
  e.forRange("i", s, M_language_marker_constants_maybe.default.errors, (s) => {
    e.const(
      c,
      M_LanguageMarkerConstants_maybe._`${M_language_marker_constants_maybe.default.vErrors}[${s}]`
    );
    e.if(
      M_LanguageMarkerConstants_maybe._`${c}.instancePath === undefined`,
      () =>
        e.assign(
          M_LanguageMarkerConstants_maybe._`${c}.instancePath`,
          M_LanguageMarkerConstants_maybe.strConcat(
            M_language_marker_constants_maybe.default.instancePath,
            a.errorPath
          )
        )
    );
    e.assign(
      M_LanguageMarkerConstants_maybe._`${c}.schemaPath`,
      M_LanguageMarkerConstants_maybe.str`${a.errSchemaPath}/${t}`
    );
    if (a.opts.verbose) {
      e.assign(M_LanguageMarkerConstants_maybe._`${c}.schema`, r);
      e.assign(M_LanguageMarkerConstants_maybe._`${c}.data`, i);
    }
  });
};
const c = {
  keyword: new M_LanguageMarkerConstants_maybe.Name("keyword"),
  schemaPath: new M_LanguageMarkerConstants_maybe.Name("schemaPath"),
  params: new M_LanguageMarkerConstants_maybe.Name("params"),
  propertyName: new M_LanguageMarkerConstants_maybe.Name("propertyName"),
  message: new M_LanguageMarkerConstants_maybe.Name("message"),
  schema: new M_LanguageMarkerConstants_maybe.Name("schema"),
  parentSchema: new M_LanguageMarkerConstants_maybe.Name("parentSchema"),
};
function l(e, t, r) {
  const { createErrors: i } = e.it;
  return false === i
    ? M_LanguageMarkerConstants_maybe._`{}`
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
            [
              c.params,
              "function" == typeof t
                ? t(e)
                : t || M_LanguageMarkerConstants_maybe._`{}`,
            ]
          );
          if (d.messages) {
            i.push([c.message, "function" == typeof r ? r(e) : r]);
          }
          if (d.verbose) {
            i.push(
              [c.schema, l],
              [c.parentSchema, M_LanguageMarkerConstants_maybe._`${h}${f}`],
              [M_language_marker_constants_maybe.default.data, a]
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
  const r = t
    ? M_LanguageMarkerConstants_maybe.str`${e}${M_json_pointer_utils_maybe.getErrorPath(
        t,
        M_json_pointer_utils_maybe.Type.Str
      )}`
    : e;
  return [
    M_language_marker_constants_maybe.default.instancePath,
    M_LanguageMarkerConstants_maybe.strConcat(
      M_language_marker_constants_maybe.default.instancePath,
      r
    ),
  ];
}
function d(
  { keyword: e, it: { errSchemaPath: t } },
  { schemaPath: r, parentSchema: o }
) {
  let s = o ? t : M_LanguageMarkerConstants_maybe.str`${t}/${e}`;
  if (r) {
    s = M_LanguageMarkerConstants_maybe.str`${s}${M_json_pointer_utils_maybe.getErrorPath(
      r,
      M_json_pointer_utils_maybe.Type.Str
    )}`;
  }
  return [c.schemaPath, s];
}
