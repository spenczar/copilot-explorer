let r;
function n() {
  if (undefined === r)
    throw new Error("No runtime abstraction layer installed");
  return r;
}
Object.defineProperty(exports, "__esModule", {
  value: true,
});
(function (e) {
  e.install = function (e) {
    if (undefined === e)
      throw new Error("No runtime abstraction layer provided");
    r = e;
  };
})(n || (n = {}));
exports.default = n;