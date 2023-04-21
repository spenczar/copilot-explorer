Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.validateUnion =
  exports.validateArray =
  exports.usePattern =
  exports.callValidateCode =
  exports.schemaProperties =
  exports.allSchemaProperties =
  exports.noPropertyInData =
  exports.propertyInData =
  exports.isOwnProperty =
  exports.hasPropFunc =
  exports.reportMissingProp =
  exports.checkMissingProp =
  exports.checkReportMissingProp =
    undefined;
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const M_language_marker_constants_maybe = require("language-marker-constants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
function hasPropFunc(e) {
  return e.scopeValue("func", {
    ref: Object.prototype.hasOwnProperty,
    code: M_LanguageMarkerConstants_maybe._`Object.prototype.hasOwnProperty`,
  });
}
function isOwnProperty(e, t, r) {
  return M_LanguageMarkerConstants_maybe._`${hasPropFunc(e)}.call(${t}, ${r})`;
}
function noPropertyInData(e, t, r, i) {
  const o = M_LanguageMarkerConstants_maybe._`${t}${M_LanguageMarkerConstants_maybe.getProperty(
    r
  )} === undefined`;
  return i
    ? M_LanguageMarkerConstants_maybe.or(
        o,
        M_LanguageMarkerConstants_maybe.not(isOwnProperty(e, t, r))
      )
    : o;
}
function allSchemaProperties(e) {
  return e ? Object.keys(e).filter((e) => "__proto__" !== e) : [];
}
exports.checkReportMissingProp = function (e, t) {
  const { gen: r, data: i, it: o } = e;
  r.if(noPropertyInData(r, i, t, o.opts.ownProperties), () => {
    e.setParams(
      {
        missingProperty: M_LanguageMarkerConstants_maybe._`${t}`,
      },
      true
    );
    e.error();
  });
};
exports.checkMissingProp = function (
  { gen: e, data: t, it: { opts: r } },
  i,
  o
) {
  return M_LanguageMarkerConstants_maybe.or(
    ...i.map((i) =>
      M_LanguageMarkerConstants_maybe.and(
        noPropertyInData(e, t, i, r.ownProperties),
        M_LanguageMarkerConstants_maybe._`${o} = ${i}`
      )
    )
  );
};
exports.reportMissingProp = function (e, t) {
  e.setParams(
    {
      missingProperty: t,
    },
    true
  );
  e.error();
};
exports.hasPropFunc = hasPropFunc;
exports.isOwnProperty = isOwnProperty;
exports.propertyInData = function (e, t, r, i) {
  const o = M_LanguageMarkerConstants_maybe._`${t}${M_LanguageMarkerConstants_maybe.getProperty(
    r
  )} !== undefined`;
  return i
    ? M_LanguageMarkerConstants_maybe._`${o} && ${isOwnProperty(e, t, r)}`
    : o;
};
exports.noPropertyInData = noPropertyInData;
exports.allSchemaProperties = allSchemaProperties;
exports.schemaProperties = function (e, t) {
  return allSchemaProperties(t).filter(
    (r) => !M_json_pointer_utils_maybe.alwaysValidSchema(e, t[r])
  );
};
exports.callValidateCode = function (
  {
    schemaCode: e,
    data: t,
    it: { gen: r, topSchemaRef: i, schemaPath: s, errorPath: a },
    it: c,
  },
  l,
  u,
  d
) {
  const p = d ? M_LanguageMarkerConstants_maybe._`${e}, ${t}, ${i}${s}` : t;
  const h = [
    [
      M_language_marker_constants_maybe.default.instancePath,
      M_LanguageMarkerConstants_maybe.strConcat(
        M_language_marker_constants_maybe.default.instancePath,
        a
      ),
    ],
    [M_language_marker_constants_maybe.default.parentData, c.parentData],
    [
      M_language_marker_constants_maybe.default.parentDataProperty,
      c.parentDataProperty,
    ],
    [
      M_language_marker_constants_maybe.default.rootData,
      M_language_marker_constants_maybe.default.rootData,
    ],
  ];
  if (c.opts.dynamicRef) {
    h.push([
      M_language_marker_constants_maybe.default.dynamicAnchors,
      M_language_marker_constants_maybe.default.dynamicAnchors,
    ]);
  }
  const f = M_LanguageMarkerConstants_maybe._`${p}, ${r.object(...h)}`;
  return u !== M_LanguageMarkerConstants_maybe.nil
    ? M_LanguageMarkerConstants_maybe._`${l}.call(${u}, ${f})`
    : M_LanguageMarkerConstants_maybe._`${l}(${f})`;
};
const d = M_LanguageMarkerConstants_maybe._`new RegExp`;
exports.usePattern = function ({ gen: e, it: { opts: t } }, r) {
  const i = t.unicodeRegExp ? "u" : "";
  const { regExp: o } = t.code;
  const a = o(r, i);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: M_LanguageMarkerConstants_maybe._`${
      "new RegExp" === o.code ? d : M_json_pointer_utils_maybe.useFunc(e, o)
    }(${r}, ${i})`,
  });
};
exports.validateArray = function (e) {
  const { gen: t, data: r, keyword: o, it: s } = e;
  const a = t.name("valid");
  if (s.allErrors) {
    const e = t.let("valid", true);
    c(() => t.assign(e, false));
    return e;
  }
  t.var(a, true);
  c(() => t.break());
  return a;
  function c(s) {
    const c = t.const("len", M_LanguageMarkerConstants_maybe._`${r}.length`);
    t.forRange("i", 0, c, (r) => {
      e.subschema(
        {
          keyword: o,
          dataProp: r,
          dataPropType: M_json_pointer_utils_maybe.Type.Num,
        },
        a
      );
      t.if(M_LanguageMarkerConstants_maybe.not(a), s);
    });
  }
};
exports.validateUnion = function (e) {
  const { gen: t, schema: r, keyword: o, it: s } = e;
  if (!Array.isArray(r)) throw new Error("ajv implementation error");
  if (
    r.some((e) => M_json_pointer_utils_maybe.alwaysValidSchema(s, e)) &&
    !s.opts.unevaluated
  )
    return;
  const a = t.let("valid", false);
  const c = t.name("_valid");
  t.block(() =>
    r.forEach((r, i) => {
      const s = e.subschema(
        {
          keyword: o,
          schemaProp: i,
          compositeRule: true,
        },
        c
      );
      t.assign(a, M_LanguageMarkerConstants_maybe._`${a} || ${c}`);
      if (e.mergeValidEvaluated(s, c)) {
        t.if(M_LanguageMarkerConstants_maybe.not(a));
      }
    })
  );
  e.result(
    a,
    () => e.reset(),
    () => e.error(true)
  );
};
