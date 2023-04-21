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
const n = require(15669);
const i = require(88936);
const o = require(17250);
const s = require(88936);
function hasPropFunc(e) {
  return e.scopeValue("func", {
    ref: Object.prototype.hasOwnProperty,
    code: n._`Object.prototype.hasOwnProperty`,
  });
}
function isOwnProperty(e, t, r) {
  return n._`${hasPropFunc(e)}.call(${t}, ${r})`;
}
function noPropertyInData(e, t, r, i) {
  const o = n._`${t}${n.getProperty(r)} === undefined`;
  return i ? n.or(o, n.not(isOwnProperty(e, t, r))) : o;
}
function allSchemaProperties(e) {
  return e ? Object.keys(e).filter((e) => "__proto__" !== e) : [];
}
exports.checkReportMissingProp = function (e, t) {
  const { gen: r, data: i, it: o } = e;
  r.if(noPropertyInData(r, i, t, o.opts.ownProperties), () => {
    e.setParams(
      {
        missingProperty: n._`${t}`,
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
  return n.or(
    ...i.map((i) =>
      n.and(noPropertyInData(e, t, i, r.ownProperties), n._`${o} = ${i}`)
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
  const o = n._`${t}${n.getProperty(r)} !== undefined`;
  return i ? n._`${o} && ${isOwnProperty(e, t, r)}` : o;
};
exports.noPropertyInData = noPropertyInData;
exports.allSchemaProperties = allSchemaProperties;
exports.schemaProperties = function (e, t) {
  return allSchemaProperties(t).filter((r) => !i.alwaysValidSchema(e, t[r]));
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
  const p = d ? n._`${e}, ${t}, ${i}${s}` : t;
  const h = [
    [o.default.instancePath, n.strConcat(o.default.instancePath, a)],
    [o.default.parentData, c.parentData],
    [o.default.parentDataProperty, c.parentDataProperty],
    [o.default.rootData, o.default.rootData],
  ];
  if (c.opts.dynamicRef) {
    h.push([o.default.dynamicAnchors, o.default.dynamicAnchors]);
  }
  const f = n._`${p}, ${r.object(...h)}`;
  return u !== n.nil ? n._`${l}.call(${u}, ${f})` : n._`${l}(${f})`;
};
const d = n._`new RegExp`;
exports.usePattern = function ({ gen: e, it: { opts: t } }, r) {
  const i = t.unicodeRegExp ? "u" : "";
  const { regExp: o } = t.code;
  const a = o(r, i);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: n._`${"new RegExp" === o.code ? d : s.useFunc(e, o)}(${r}, ${i})`,
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
    const c = t.const("len", n._`${r}.length`);
    t.forRange("i", 0, c, (r) => {
      e.subschema(
        {
          keyword: o,
          dataProp: r,
          dataPropType: i.Type.Num,
        },
        a
      );
      t.if(n.not(a), s);
    });
  }
};
exports.validateUnion = function (e) {
  const { gen: t, schema: r, keyword: o, it: s } = e;
  if (!Array.isArray(r)) throw new Error("ajv implementation error");
  if (r.some((e) => i.alwaysValidSchema(s, e)) && !s.opts.unevaluated) return;
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
      t.assign(a, n._`${a} || ${c}`);
      if (e.mergeValidEvaluated(s, c)) {
        t.if(n.not(a));
      }
    })
  );
  e.result(
    a,
    () => e.reset(),
    () => e.error(true)
  );
};