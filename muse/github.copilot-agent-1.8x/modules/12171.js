Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = undefined;
const n = require(6930);
const i = require(15669);
const o = require(17250);
const s = {
  message: "boolean schema is false",
};
function a(e, t) {
  const { gen: r, data: i } = e;
  const o = {
    gen: r,
    keyword: "false schema",
    data: i,
    schema: false,
    schemaCode: false,
    schemaValue: false,
    params: {},
    it: e,
  };
  n.reportError(o, s, undefined, t);
}
exports.topBoolOrEmptySchema = function (e) {
  const { gen: t, schema: r, validateName: n } = e;
  if (false === r) {
    a(e, false);
  } else {
    if ("object" == typeof r && true === r.$async) {
      t.return(o.default.data);
    } else {
      t.assign(i._`${n}.errors`, null);
      t.return(true);
    }
  }
};
exports.boolOrEmptySchema = function (e, t) {
  const { gen: r, schema: n } = e;
  if (false === n) {
    r.var(t, false);
    a(e);
  } else {
    r.var(t, true);
  }
};