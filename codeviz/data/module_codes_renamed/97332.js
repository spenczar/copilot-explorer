Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.reportTypeError =
  exports.checkDataTypes =
  exports.checkDataType =
  exports.coerceAndCheckDataType =
  exports.getJSONTypes =
  exports.getSchemaTypes =
  exports.DataType =
    undefined;
const M_JSON_type_validator_maybe = require("JSON-type-validator");
const M_RuleCheckerUtils_maybe = require("RuleCheckerUtils");
const M_ErrorReportingManager_maybe = require("ErrorReportingManager");
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
var c;
function getJSONTypes(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(M_JSON_type_validator_maybe.isJSONType)) return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
!(function (e) {
  e[(e.Correct = 0)] = "Correct";
  e[(e.Wrong = 1)] = "Wrong";
})((c = exports.DataType || (exports.DataType = {})));
exports.getSchemaTypes = function (e) {
  const t = getJSONTypes(e.type);
  if (t.includes("null")) {
    if (false === e.nullable)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && undefined !== e.nullable)
      throw new Error('"nullable" cannot be used without "type"');
    if (true === e.nullable) {
      t.push("null");
    }
  }
  return t;
};
exports.getJSONTypes = getJSONTypes;
exports.coerceAndCheckDataType = function (e, t) {
  const { gen: r, data: n, opts: o } = e;
  const a = (function (e, t) {
    return t
      ? e.filter((e) => u.has(e) || ("array" === t && "array" === e))
      : [];
  })(t, o.coerceTypes);
  const l =
    t.length > 0 &&
    !(
      0 === a.length &&
      1 === t.length &&
      M_RuleCheckerUtils_maybe.schemaHasRulesForType(e, t[0])
    );
  if (l) {
    const i = checkDataTypes(t, n, o.strictNumbers, c.Wrong);
    r.if(i, () => {
      if (a.length) {
        (function (e, t, r) {
          const { gen: n, data: i, opts: o } = e;
          const a = n.let(
            "dataType",
            M_LanguageMarkerConstants_maybe._`typeof ${i}`
          );
          const c = n.let(
            "coerced",
            M_LanguageMarkerConstants_maybe._`undefined`
          );
          if ("array" === o.coerceTypes) {
            n.if(
              M_LanguageMarkerConstants_maybe._`${a} == 'object' && Array.isArray(${i}) && ${i}.length == 1`,
              () =>
                n
                  .assign(i, M_LanguageMarkerConstants_maybe._`${i}[0]`)
                  .assign(a, M_LanguageMarkerConstants_maybe._`typeof ${i}`)
                  .if(checkDataTypes(t, i, o.strictNumbers), () =>
                    n.assign(c, i)
                  )
            );
          }
          n.if(M_LanguageMarkerConstants_maybe._`${c} !== undefined`);
          for (const e of r)
            if (u.has(e) || ("array" === e && "array" === o.coerceTypes)) {
              l(e);
            }
          function l(e) {
            switch (e) {
              case "string":
                return void n
                  .elseIf(
                    M_LanguageMarkerConstants_maybe._`${a} == "number" || ${a} == "boolean"`
                  )
                  .assign(c, M_LanguageMarkerConstants_maybe._`"" + ${i}`)
                  .elseIf(M_LanguageMarkerConstants_maybe._`${i} === null`)
                  .assign(c, M_LanguageMarkerConstants_maybe._`""`);
              case "number":
                return void n
                  .elseIf(
                    M_LanguageMarkerConstants_maybe._`${a} == "boolean" || ${i} === null
              || (${a} == "string" && ${i} && ${i} == +${i})`
                  )
                  .assign(c, M_LanguageMarkerConstants_maybe._`+${i}`);
              case "integer":
                return void n
                  .elseIf(
                    M_LanguageMarkerConstants_maybe._`${a} === "boolean" || ${i} === null
              || (${a} === "string" && ${i} && ${i} == +${i} && !(${i} % 1))`
                  )
                  .assign(c, M_LanguageMarkerConstants_maybe._`+${i}`);
              case "boolean":
                return void n
                  .elseIf(
                    M_LanguageMarkerConstants_maybe._`${i} === "false" || ${i} === 0 || ${i} === null`
                  )
                  .assign(c, false)
                  .elseIf(
                    M_LanguageMarkerConstants_maybe._`${i} === "true" || ${i} === 1`
                  )
                  .assign(c, true);
              case "null":
                n.elseIf(
                  M_LanguageMarkerConstants_maybe._`${i} === "" || ${i} === 0 || ${i} === false`
                );
                return void n.assign(c, null);
              case "array":
                n.elseIf(
                  M_LanguageMarkerConstants_maybe._`${a} === "string" || ${a} === "number"
              || ${a} === "boolean" || ${i} === null`
                ).assign(c, M_LanguageMarkerConstants_maybe._`[${i}]`);
            }
          }
          n.else();
          reportTypeError(e);
          n.endIf();
          n.if(M_LanguageMarkerConstants_maybe._`${c} !== undefined`, () => {
            n.assign(i, c);
            (function ({ gen: e, parentData: t, parentDataProperty: r }, n) {
              e.if(M_LanguageMarkerConstants_maybe._`${t} !== undefined`, () =>
                e.assign(M_LanguageMarkerConstants_maybe._`${t}[${r}]`, n)
              );
            })(e, c);
          });
        })(e, t, a);
      } else {
        reportTypeError(e);
      }
    });
  }
  return l;
};
const u = new Set(["string", "number", "integer", "boolean", "null"]);
function checkDataType(e, t, r, n = c.Correct) {
  const i =
    n === c.Correct
      ? M_LanguageMarkerConstants_maybe.operators.EQ
      : M_LanguageMarkerConstants_maybe.operators.NEQ;
  let o;
  switch (e) {
    case "null":
      return M_LanguageMarkerConstants_maybe._`${t} ${i} null`;
    case "array":
      o = M_LanguageMarkerConstants_maybe._`Array.isArray(${t})`;
      break;
    case "object":
      o = M_LanguageMarkerConstants_maybe._`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      o = a(M_LanguageMarkerConstants_maybe._`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      o = a();
      break;
    default:
      return M_LanguageMarkerConstants_maybe._`typeof ${t} ${i} ${e}`;
  }
  return n === c.Correct ? o : M_LanguageMarkerConstants_maybe.not(o);
  function a(e = M_LanguageMarkerConstants_maybe.nil) {
    return M_LanguageMarkerConstants_maybe.and(
      M_LanguageMarkerConstants_maybe._`typeof ${t} == "number"`,
      e,
      r
        ? M_LanguageMarkerConstants_maybe._`isFinite(${t})`
        : M_LanguageMarkerConstants_maybe.nil
    );
  }
}
function checkDataTypes(e, t, r, n) {
  if (1 === e.length) return checkDataType(e[0], t, r, n);
  let i;
  const o = M_json_pointer_utils_maybe.toHash(e);
  if (o.array && o.object) {
    const e = M_LanguageMarkerConstants_maybe._`typeof ${t} != "object"`;
    i = o.null ? e : M_LanguageMarkerConstants_maybe._`!${t} || ${e}`;
    delete o.null;
    delete o.array;
    delete o.object;
  } else i = M_LanguageMarkerConstants_maybe.nil;
  if (o.number) {
    delete o.integer;
  }
  for (const e in o)
    i = M_LanguageMarkerConstants_maybe.and(i, checkDataType(e, t, r, n));
  return i;
}
exports.checkDataType = checkDataType;
exports.checkDataTypes = checkDataTypes;
const h = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) =>
    "string" == typeof e
      ? M_LanguageMarkerConstants_maybe._`{type: ${e}}`
      : M_LanguageMarkerConstants_maybe._`{type: ${t}}`,
};
function reportTypeError(e) {
  const t = (function (e) {
    const { gen: t, data: r, schema: n } = e;
    const i = M_json_pointer_utils_maybe.schemaRefOrVal(e, n, "type");
    return {
      gen: t,
      keyword: "type",
      data: r,
      schema: n.type,
      schemaCode: i,
      schemaValue: i,
      parentSchema: n,
      params: {},
      it: e,
    };
  })(e);
  M_ErrorReportingManager_maybe.reportError(t, h);
}
exports.reportTypeError = reportTypeError;
