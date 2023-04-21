Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.checkStrictMode =
  exports.getErrorPath =
  exports.Type =
  exports.useFunc =
  exports.setEvaluated =
  exports.evaluatedPropsToName =
  exports.mergeEvaluated =
  exports.eachItem =
  exports.unescapeJsonPointer =
  exports.escapeJsonPointer =
  exports.escapeFragment =
  exports.unescapeFragment =
  exports.schemaRefOrVal =
  exports.schemaHasRulesButRef =
  exports.schemaHasRules =
  exports.checkUnknownRules =
  exports.alwaysValidSchema =
  exports.toHash =
    undefined;
const n = require(15669);
const i = require(66545);
function checkUnknownRules(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema) return;
  if ("boolean" == typeof t) return;
  const i = n.RULES.keywords;
  for (const r in t)
    if (i[r]) {
      checkStrictMode(e, `unknown keyword: "${r}"`);
    }
}
function schemaHasRules(e, t) {
  if ("boolean" == typeof e) return !e;
  for (const r in e) if (t[r]) return true;
  return false;
}
function escapeJsonPointer(e) {
  return "number" == typeof e
    ? `${e}`
    : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function unescapeJsonPointer(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
function l({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: i }) {
  return (o, s, a, c) => {
    const l =
      undefined === a
        ? s
        : a instanceof n.Name
        ? (s instanceof n.Name ? e(o, s, a) : t(o, s, a), a)
        : s instanceof n.Name
        ? (t(o, a, s), s)
        : r(s, a);
    return c !== n.Name || l instanceof n.Name ? l : i(o, l);
  };
}
function evaluatedPropsToName(e, t) {
  if (true === t) return e.var("props", true);
  const r = e.var("props", n._`{}`);
  if (undefined !== t) {
    setEvaluated(e, r, t);
  }
  return r;
}
function setEvaluated(e, t, r) {
  Object.keys(r).forEach((r) => e.assign(n._`${t}${n.getProperty(r)}`, true));
}
exports.toHash = function (e) {
  const t = {};
  for (const r of e) t[r] = true;
  return t;
};
exports.alwaysValidSchema = function (e, t) {
  return "boolean" == typeof t
    ? t
    : 0 === Object.keys(t).length ||
        (checkUnknownRules(e, t), !schemaHasRules(t, e.self.RULES.all));
};
exports.checkUnknownRules = checkUnknownRules;
exports.schemaHasRules = schemaHasRules;
exports.schemaHasRulesButRef = function (e, t) {
  if ("boolean" == typeof e) return !e;
  for (const r in e) if ("$ref" !== r && t.all[r]) return true;
  return false;
};
exports.schemaRefOrVal = function (
  { topSchemaRef: e, schemaPath: t },
  r,
  i,
  o
) {
  if (!o) {
    if ("number" == typeof r || "boolean" == typeof r) return r;
    if ("string" == typeof r) return n._`${r}`;
  }
  return n._`${e}${t}${n.getProperty(i)}`;
};
exports.unescapeFragment = function (e) {
  return unescapeJsonPointer(decodeURIComponent(e));
};
exports.escapeFragment = function (e) {
  return encodeURIComponent(escapeJsonPointer(e));
};
exports.escapeJsonPointer = escapeJsonPointer;
exports.unescapeJsonPointer = unescapeJsonPointer;
exports.eachItem = function (e, t) {
  if (Array.isArray(e)) for (const r of e) t(r);
  else t(e);
};
exports.mergeEvaluated = {
  props: l({
    mergeNames: (e, t, r) =>
      e.if(n._`${r} !== true && ${t} !== undefined`, () => {
        e.if(
          n._`${t} === true`,
          () => e.assign(r, true),
          () =>
            e.assign(r, n._`${r} || {}`).code(n._`Object.assign(${r}, ${t})`)
        );
      }),
    mergeToName: (e, t, r) =>
      e.if(n._`${r} !== true`, () => {
        if (true === t) {
          e.assign(r, true);
        } else {
          e.assign(r, n._`${r} || {}`);
          setEvaluated(e, r, t);
        }
      }),
    mergeValues: (e, t) =>
      true === e || {
        ...e,
        ...t,
      },
    resultToName: evaluatedPropsToName,
  }),
  items: l({
    mergeNames: (e, t, r) =>
      e.if(n._`${r} !== true && ${t} !== undefined`, () =>
        e.assign(r, n._`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)
      ),
    mergeToName: (e, t, r) =>
      e.if(n._`${r} !== true`, () =>
        e.assign(r, true === t || n._`${r} > ${t} ? ${r} : ${t}`)
      ),
    mergeValues: (e, t) => true === e || Math.max(e, t),
    resultToName: (e, t) => e.var("items", t),
  }),
};
exports.evaluatedPropsToName = evaluatedPropsToName;
exports.setEvaluated = setEvaluated;
const p = {};
var h;
function checkStrictMode(e, t, r = e.opts.strictSchema) {
  if (r) {
    t = `strict mode: ${t}`;
    if (!0 === r) throw new Error(t);
    e.self.logger.warn(t);
  }
}
exports.useFunc = function (e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: p[t.code] || (p[t.code] = new i._Code(t.code)),
  });
};
(function (e) {
  e[(e.Num = 0)] = "Num";
  e[(e.Str = 1)] = "Str";
})((h = exports.Type || (exports.Type = {})));
exports.getErrorPath = function (e, t, r) {
  if (e instanceof n.Name) {
    const i = t === h.Num;
    return r
      ? i
        ? n._`"[" + ${e} + "]"`
        : n._`"['" + ${e} + "']"`
      : i
      ? n._`"/" + ${e}`
      : n._`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? n.getProperty(e).toString() : "/" + escapeJsonPointer(e);
};
exports.checkStrictMode = checkStrictMode;