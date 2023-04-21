Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.assignDefaults = undefined;
const n = require(15669);
const i = require(88936);
function o(e, t, r) {
  const { gen: o, compositeRule: s, data: a, opts: c } = e;
  if (undefined === r) return;
  const l = n._`${a}${n.getProperty(t)}`;
  if (s) return void i.checkStrictMode(e, `default is ignored for: ${l}`);
  let u = n._`${l} === undefined`;
  if ("empty" === c.useDefaults) {
    u = n._`${u} || ${l} === null || ${l} === ""`;
  }
  o.if(u, n._`${l} = ${n.stringify(r)}`);
}
exports.assignDefaults = function (e, t) {
  const { properties: r, items: n } = e.schema;
  if ("object" === t && r) for (const t in r) o(e, t, r[t].default);
  else if ("array" === t && Array.isArray(n)) {
    n.forEach((t, r) => o(e, r, t.default));
  }
};