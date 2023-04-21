Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getSchemaRefs =
  exports.resolveUrl =
  exports.normalizeId =
  exports._getFullPath =
  exports.getFullPath =
  exports.inlineRef =
    undefined;
const M_json_pointer_utils_maybe = require("json-pointer-utils");
const M_DeepEqualComparer_maybe = require("DeepEqualComparer");
const M_json_traverser_maybe = require("json-traverser");
const s = new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const",
]);
exports.inlineRef = function (e, t = true) {
  return "boolean" == typeof e || (true === t ? !c(e) : !!t && l(e) <= t);
};
const a = new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor",
]);
function c(e) {
  for (const t in e) {
    if (a.has(t)) return true;
    const r = e[t];
    if (Array.isArray(r) && r.some(c)) return true;
    if ("object" == typeof r && c(r)) return true;
  }
  return false;
}
function l(e) {
  let t = 0;
  for (const r in e) {
    if ("$ref" === r) return 1 / 0;
    t++;
    if (
      !s.has(r) &&
      ("object" == typeof e[r] &&
        (0, M_json_pointer_utils_maybe.eachItem)(e[r], (e) => (t += l(e))),
      t === 1 / 0)
    )
      return 1 / 0;
  }
  return t;
}
function getFullPath(e, t = "", r) {
  if (false !== r) {
    t = normalizeId(t);
  }
  const n = e.parse(t);
  return _getFullPath(e, n);
}
function _getFullPath(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
exports.getFullPath = getFullPath;
exports._getFullPath = _getFullPath;
const p = /#\/?$/;
function normalizeId(e) {
  return e ? e.replace(p, "") : "";
}
exports.normalizeId = normalizeId;
exports.resolveUrl = function (e, t, r) {
  r = normalizeId(r);
  return e.resolve(t, r);
};
const f = /^[a-z_][-a-z0-9._]*$/i;
exports.getSchemaRefs = function (e, t) {
  if ("boolean" == typeof e) return {};
  const { schemaId: r, uriResolver: n } = this.opts;
  const s = normalizeId(e[r] || t);
  const a = {
    "": s,
  };
  const c = getFullPath(n, s, false);
  const l = {};
  const d = new Set();
  M_json_traverser_maybe(
    e,
    {
      allKeys: true,
    },
    (e, t, n, i) => {
      if (undefined === i) return;
      const o = c + t;
      let s = a[i];
      function u(t) {
        const r = this.opts.uriResolver.resolve;
        t = normalizeId(s ? r(s, t) : t);
        if (d.has(t)) throw g(t);
        d.add(t);
        let n = this.refs[t];
        if ("string" == typeof n) {
          n = this.refs[n];
        }
        if ("object" == typeof n) {
          p(e, n.schema, t);
        } else {
          if (t !== normalizeId(o)) {
            if ("#" === t[0]) {
              p(e, l[t], t);
              l[t] = e;
            } else {
              this.refs[t] = o;
            }
          }
        }
        return t;
      }
      function m(e) {
        if ("string" == typeof e) {
          if (!f.test(e)) throw new Error(`invalid anchor "${e}"`);
          u.call(this, `#${e}`);
        }
      }
      if ("string" == typeof e[r]) {
        s = u.call(this, e[r]);
      }
      m.call(this, e.$anchor);
      m.call(this, e.$dynamicAnchor);
      a[t] = s;
    }
  );
  return l;
  function p(e, t, r) {
    if (undefined !== t && !M_DeepEqualComparer_maybe(e, t)) throw g(r);
  }
  function g(e) {
    return new Error(`reference "${e}" resolves to more than one schema`);
  }
};
