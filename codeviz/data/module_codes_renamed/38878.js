Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.extendSubschemaMode =
  exports.extendSubschemaData =
  exports.getSubschema =
    undefined;
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
exports.getSubschema = function (
  e,
  {
    keyword: t,
    schemaProp: r,
    schema: o,
    schemaPath: s,
    errSchemaPath: a,
    topSchemaRef: c,
  }
) {
  if (undefined !== t && undefined !== o)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (undefined !== t) {
    const o = e.schema[t];
    return undefined === r
      ? {
          schema: o,
          schemaPath: M_LanguageMarkerConstants_maybe._`${
            e.schemaPath
          }${M_LanguageMarkerConstants_maybe.getProperty(t)}`,
          errSchemaPath: `${e.errSchemaPath}/${t}`,
        }
      : {
          schema: o[r],
          schemaPath: M_LanguageMarkerConstants_maybe._`${
            e.schemaPath
          }${M_LanguageMarkerConstants_maybe.getProperty(
            t
          )}${M_LanguageMarkerConstants_maybe.getProperty(r)}`,
          errSchemaPath: `${
            e.errSchemaPath
          }/${t}/${M_json_pointer_utils_maybe.escapeFragment(r)}`,
        };
  }
  if (undefined !== o) {
    if (undefined === s || undefined === a || undefined === c)
      throw new Error(
        '"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"'
      );
    return {
      schema: o,
      schemaPath: s,
      topSchemaRef: c,
      errSchemaPath: a,
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
};
exports.extendSubschemaData = function (
  e,
  t,
  { dataProp: r, dataPropType: o, data: s, dataTypes: a, propertyName: c }
) {
  if (undefined !== s && undefined !== r)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: l } = t;
  if (undefined !== r) {
    const { errorPath: s, dataPathArr: a, opts: c } = t;
    u(
      l.let(
        "data",
        M_LanguageMarkerConstants_maybe._`${
          t.data
        }${M_LanguageMarkerConstants_maybe.getProperty(r)}`,
        true
      )
    );
    e.errorPath = M_LanguageMarkerConstants_maybe.str`${s}${M_json_pointer_utils_maybe.getErrorPath(
      r,
      o,
      c.jsPropertySyntax
    )}`;
    e.parentDataProperty = M_LanguageMarkerConstants_maybe._`${r}`;
    e.dataPathArr = [...a, e.parentDataProperty];
  }
  function u(r) {
    e.data = r;
    e.dataLevel = t.dataLevel + 1;
    e.dataTypes = [];
    t.definedProperties = new Set();
    e.parentData = t.data;
    e.dataNames = [...t.dataNames, r];
  }
  if (undefined !== s) {
    u(
      s instanceof M_LanguageMarkerConstants_maybe.Name
        ? s
        : l.let("data", s, true)
    );
    if (undefined !== c) {
      e.propertyName = c;
    }
  }
  if (a) {
    e.dataTypes = a;
  }
};
exports.extendSubschemaMode = function (
  e,
  {
    jtdDiscriminator: t,
    jtdMetadata: r,
    compositeRule: n,
    createErrors: i,
    allErrors: o,
  }
) {
  if (undefined !== n) {
    e.compositeRule = n;
  }
  if (undefined !== i) {
    e.createErrors = i;
  }
  if (undefined !== o) {
    e.allErrors = o;
  }
  e.jtdDiscriminator = t;
  e.jtdMetadata = r;
};
