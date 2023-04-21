Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.assignDefaults = undefined;
const M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
const M_json_pointer_utils_maybe = require("json-pointer-utils");
function o(e, t, r) {
  const { gen: o, compositeRule: s, data: a, opts: c } = e;
  if (undefined === r) return;
  const l = M_LanguageMarkerConstants_maybe._`${a}${M_LanguageMarkerConstants_maybe.getProperty(
    t
  )}`;
  if (s)
    return void M_json_pointer_utils_maybe.checkStrictMode(
      e,
      `default is ignored for: ${l}`
    );
  let u = M_LanguageMarkerConstants_maybe._`${l} === undefined`;
  if ("empty" === c.useDefaults) {
    u = M_LanguageMarkerConstants_maybe._`${u} || ${l} === null || ${l} === ""`;
  }
  o.if(
    u,
    M_LanguageMarkerConstants_maybe._`${l} = ${M_LanguageMarkerConstants_maybe.stringify(
      r
    )}`
  );
}
exports.assignDefaults = function (e, t) {
  const { properties: r, items: n } = e.schema;
  if ("object" === t && r) for (const t in r) o(e, t, r[t].default);
  else if ("array" === t && Array.isArray(n)) {
    n.forEach((t, r) => o(e, r, t.default));
  }
};
