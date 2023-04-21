Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.callRef = exports.getValidate = undefined;
const n = require(91578);
const i = require(3499);
const o = require(15669);
const s = require(17250);
const a = require(87382);
const c = require(88936);
const l = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: i } = e;
    const { baseId: s, schemaEnv: c, validateName: l, opts: p, self: h } = i;
    const { root: f } = c;
    if (("#" === r || "#/" === r) && s === f.baseId)
      return (function () {
        if (c === f) return callRef(e, l, c, c.$async);
        const r = t.scopeValue("root", {
          ref: f,
        });
        return callRef(e, o._`${r}.validate`, f, f.$async);
      })();
    const g = a.resolveRef.call(h, f, s, r);
    if (undefined === g) throw new n.default(i.opts.uriResolver, s, r);
    return g instanceof a.SchemaEnv
      ? (function (t) {
          const r = getValidate(e, t);
          callRef(e, r, t, t.$async);
        })(g)
      : (function (n) {
          const i = t.scopeValue(
            "schema",
            true === p.code.source
              ? {
                  ref: n,
                  code: o.stringify(n),
                }
              : {
                  ref: n,
                }
          );
          const s = t.name("valid");
          const a = e.subschema(
            {
              schema: n,
              dataTypes: [],
              schemaPath: o.nil,
              topSchemaRef: i,
              errSchemaPath: r,
            },
            s
          );
          e.mergeEvaluated(a);
          e.ok(s);
        })(g);
  },
};
function getValidate(e, t) {
  const { gen: r } = e;
  return t.validate
    ? r.scopeValue("validate", {
        ref: t.validate,
      })
    : o._`${r.scopeValue("wrapper", {
        ref: t,
      })}.validate`;
}
function callRef(e, t, r, n) {
  const { gen: a, it: l } = e;
  const { allErrors: u, schemaEnv: d, opts: p } = l;
  const h = p.passContext ? s.default.this : o.nil;
  function f(e) {
    const t = o._`${e}.errors`;
    a.assign(
      s.default.vErrors,
      o._`${s.default.vErrors} === null ? ${t} : ${s.default.vErrors}.concat(${t})`
    );
    a.assign(s.default.errors, o._`${s.default.vErrors}.length`);
  }
  function g(e) {
    var t;
    if (!l.opts.unevaluated) return;
    const n =
      null === (t = null == r ? undefined : r.validate) || undefined === t
        ? undefined
        : t.evaluated;
    if (true !== l.props)
      if (n && !n.dynamicProps) {
        if (undefined !== n.props) {
          l.props = c.mergeEvaluated.props(a, n.props, l.props);
        }
      } else {
        const t = a.var("props", o._`${e}.evaluated.props`);
        l.props = c.mergeEvaluated.props(a, t, l.props, o.Name);
      }
    if (true !== l.items)
      if (n && !n.dynamicItems) {
        if (undefined !== n.items) {
          l.items = c.mergeEvaluated.items(a, n.items, l.items);
        }
      } else {
        const t = a.var("items", o._`${e}.evaluated.items`);
        l.items = c.mergeEvaluated.items(a, t, l.items, o.Name);
      }
  }
  if (n) {
    (function () {
      if (!d.$async) throw new Error("async schema referenced by sync schema");
      const r = a.let("valid");
      a.try(
        () => {
          a.code(o._`await ${i.callValidateCode(e, t, h)}`);
          g(t);
          if (u) {
            a.assign(r, true);
          }
        },
        (e) => {
          a.if(o._`!(${e} instanceof ${l.ValidationError})`, () => a.throw(e));
          f(e);
          if (u) {
            a.assign(r, false);
          }
        }
      );
      e.ok(r);
    })();
  } else {
    e.result(
      i.callValidateCode(e, t, h),
      () => g(t),
      () => f(t)
    );
  }
}
exports.getValidate = getValidate;
exports.callRef = callRef;
exports.default = l;