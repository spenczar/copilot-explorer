var t = (module.exports = function (e, t, n) {
  if ("function" == typeof t) {
    n = t;
    t = {};
  }
  r(
    t,
    "function" == typeof (n = t.cb || n) ? n : n.pre || function () {},
    n.post || function () {},
    e,
    "",
    e
  );
});
function r(e, n, i, o, s, a, c, l, u, d) {
  if (o && "object" == typeof o && !Array.isArray(o)) {
    for (var p in (n(o, s, a, c, l, u, d), o)) {
      var h = o[p];
      if (Array.isArray(h)) {
        if (p in t.arrayKeywords)
          for (var f = 0; f < h.length; f++)
            r(e, n, i, h[f], s + "/" + p + "/" + f, a, s, p, o, f);
      } else if (p in t.propsKeywords) {
        if (h && "object" == typeof h)
          for (var g in h)
            r(
              e,
              n,
              i,
              h[g],
              s + "/" + p + "/" + g.replace(/~/g, "~0").replace(/\//g, "~1"),
              a,
              s,
              p,
              o,
              g
            );
      } else if (p in t.keywords || (e.allKeys && !(p in t.skipKeywords))) {
        r(e, n, i, h, s + "/" + p, a, s, p, o);
      }
    }
    i(o, s, a, c, l, u, d);
  }
}
t.keywords = {
  additionalItems: true,
  items: true,
  contains: true,
  additionalProperties: true,
  propertyNames: true,
  not: true,
  if: true,
  then: true,
  else: true,
};
t.arrayKeywords = {
  items: true,
  allOf: true,
  anyOf: true,
  oneOf: true,
};
t.propsKeywords = {
  $defs: true,
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true,
};
t.skipKeywords = {
  default: true,
  enum: true,
  const: true,
  required: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  multipleOf: true,
  maxLength: true,
  minLength: true,
  pattern: true,
  format: true,
  maxItems: true,
  minItems: true,
  uniqueItems: true,
  maxProperties: true,
  minProperties: true,
};