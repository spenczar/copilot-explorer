Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.createProtocolConnection = undefined;
const M_MessageTransportUtils_maybe = require("MessageTransportUtils");
exports.createProtocolConnection = function (e, t, r, i) {
  if (M_MessageTransportUtils_maybe.ConnectionStrategy.is(i)) {
    i = {
      connectionStrategy: i,
    };
  }
  return M_MessageTransportUtils_maybe.createMessageConnection(e, t, r, i);
};
