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
exports.ProposedFeatures = exports.SemanticTokensBuilder = undefined;
const M_SemanticTokensManager_maybe = require("SemanticTokensManager");
exports.SemanticTokensBuilder =
  M_SemanticTokensManager_maybe.SemanticTokensBuilder;
i(require("MessageConnectionManager"), exports);
i(require("DocumentManager"), exports);
(exports.ProposedFeatures || (exports.ProposedFeatures = {})).all = {
  __brand: "features",
};
