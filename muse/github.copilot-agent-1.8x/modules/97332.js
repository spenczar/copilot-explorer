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
const n = require(82881);
const i = require(89073);
const o = require(6930);
const s = require(15669);
const a = require(88936);
var c;
function getJSONTypes(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(n.isJSONType)) return t;
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
    !(0 === a.length && 1 === t.length && i.schemaHasRulesForType(e, t[0]));
  if (l) {
    const i = checkDataTypes(t, n, o.strictNumbers, c.Wrong);
    r.if(i, () => {
      if (a.length) {
        (function (e, t, r) {
          const { gen: n, data: i, opts: o } = e;
          const a = n.let("dataType", s._`typeof ${i}`);
          const c = n.let("coerced", s._`undefined`);
          if ("array" === o.coerceTypes) {
            n.if(
              s._`${a} == 'object' && Array.isArray(${i}) && ${i}.length == 1`,
              () =>
                n
                  .assign(i, s._`${i}[0]`)
                  .assign(a, s._`typeof ${i}`)
                  .if(checkDataTypes(t, i, o.strictNumbers), () =>
                    n.assign(c, i)
                  )
            );
          }
          n.if(s._`${c} !== undefined`);
          for (const e of r)
            if (u.has(e) || ("array" === e && "array" === o.coerceTypes)) {
              l(e);
            }
          function l(e) {
            switch (e) {
              case "string":
                return void n
                  .elseIf(s._`${a} == "number" || ${a} == "boolean"`)
                  .assign(c, s._`"" + ${i}`)
                  .elseIf(s._`${i} === null`)
                  .assign(c, s._`""`);
              case "number":
                return void n
                  .elseIf(
                    s._`${a} == "boolean" || ${i} === null
              || (${a} == "string" && ${i} && ${i} == +${i})`
                  )
                  .assign(c, s._`+${i}`);
              case "integer":
                return void n
                  .elseIf(
                    s._`${a} === "boolean" || ${i} === null
              || (${a} === "string" && ${i} && ${i} == +${i} && !(${i} % 1))`
                  )
                  .assign(c, s._`+${i}`);
              case "boolean":
                return void n
                  .elseIf(s._`${i} === "false" || ${i} === 0 || ${i} === null`)
                  .assign(c, false)
                  .elseIf(s._`${i} === "true" || ${i} === 1`)
                  .assign(c, true);
              case "null":
                n.elseIf(s._`${i} === "" || ${i} === 0 || ${i} === false`);
                return void n.assign(c, null);
              case "array":
                n.elseIf(
                  s._`${a} === "string" || ${a} === "number"
              || ${a} === "boolean" || ${i} === null`
                ).assign(c, s._`[${i}]`);
            }
          }
          n.else();
          reportTypeError(e);
          n.endIf();
          n.if(s._`${c} !== undefined`, () => {
            n.assign(i, c);
            (function ({ gen: e, parentData: t, parentDataProperty: r }, n) {
              e.if(s._`${t} !== undefined`, () => e.assign(s._`${t}[${r}]`, n));
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
  const i = n === c.Correct ? s.operators.EQ : s.operators.NEQ;
  let o;
  switch (e) {
    case "null":
      return s._`${t} ${i} null`;
    case "array":
      o = s._`Array.isArray(${t})`;
      break;
    case "object":
      o = s._`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      o = a(s._`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      o = a();
      break;
    default:
      return s._`typeof ${t} ${i} ${e}`;
  }
  return n === c.Correct ? o : s.not(o);
  function a(e = s.nil) {
    return s.and(
      s._`typeof ${t} == "number"`,
      e,
      r ? s._`isFinite(${t})` : s.nil
    );
  }
}
function checkDataTypes(e, t, r, n) {
  if (1 === e.length) return checkDataType(e[0], t, r, n);
  let i;
  const o = a.toHash(e);
  if (o.array && o.object) {
    const e = s._`typeof ${t} != "object"`;
    i = o.null ? e : s._`!${t} || ${e}`;
    delete o.null;
    delete o.array;
    delete o.object;
  } else i = s.nil;
  if (o.number) {
    delete o.integer;
  }
  for (const e in o) i = s.and(i, checkDataType(e, t, r, n));
  return i;
}
exports.checkDataType = checkDataType;
exports.checkDataTypes = checkDataTypes;
const h = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) =>
    "string" == typeof e ? s._`{type: ${e}}` : s._`{type: ${t}}`,
};
function reportTypeError(e) {
  const t = (function (e) {
    const { gen: t, data: r, schema: n } = e;
    const i = a.schemaRefOrVal(e, n, "type");
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
  o.reportError(t, h);
}
exports.reportTypeError = reportTypeError;