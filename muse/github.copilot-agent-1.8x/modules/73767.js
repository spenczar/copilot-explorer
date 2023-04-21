Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.createProtocolConnection = undefined;
const n = require(74389);
exports.createProtocolConnection = function (e, t, r, i) {
  if (n.ConnectionStrategy.is(i)) {
    i = {
      connectionStrategy: i,
    };
  }
  return n.createMessageConnection(e, t, r, i);
};