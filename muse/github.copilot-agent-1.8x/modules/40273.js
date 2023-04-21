var n =
  (this && this.__createBinding) ||
  (Object.create
    ? function (e, t, r, n) {
        if (undefined === n) {
          n = r;
        }
        Object.defineProperty(e, n, {
          enumerable: true,
          get: function () {
            return t[r];
          },
        });
      }
    : function (e, t, r, n) {
        if (undefined === n) {
          n = r;
        }
        e[n] = t[r];
      });
var i =
  (this && this.__exportStar) ||
  function (e, t) {
    for (var r in e)
      if ("default" === r || Object.prototype.hasOwnProperty.call(t, r)) {
        n(t, e, r);
      }
  };
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.createProtocolConnection = undefined;
const o = require(74389);
i(require(74389), exports);
i(require(51661), exports);
exports.createProtocolConnection = function (e, t, r, n) {
  return o.createMessageConnection(e, t, r, n);
};