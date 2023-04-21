var n = {
  "./crypt32-ia32.node": 60660,
  "./crypt32-x64.node": 91225,
};
function i(e) {
  var t = o(e);
  return require(t);
}
function o(e) {
  if (!require.o(n, e)) {
    var t = new Error("Cannot find module '" + e + "'");
    throw ((t.code = "MODULE_NOT_FOUND"), t);
  }
  return n[e];
}
i.keys = function () {
  return Object.keys(n);
};
i.resolve = o;
module.exports = i;
i.id = 51815;