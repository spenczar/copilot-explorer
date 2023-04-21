Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.ProtocolNotificationType =
  exports.ProtocolNotificationType0 =
  exports.ProtocolRequestType =
  exports.ProtocolRequestType0 =
  exports.RegistrationType =
    undefined;
const M_MessageTransportUtils_maybe = require("MessageTransportUtils");
exports.RegistrationType = class {
  constructor(e) {
    this.method = e;
  }
};
class ProtocolRequestType0 extends M_MessageTransportUtils_maybe.RequestType0 {
  constructor(e) {
    super(e);
  }
}
exports.ProtocolRequestType0 = ProtocolRequestType0;
class ProtocolRequestType extends M_MessageTransportUtils_maybe.RequestType {
  constructor(e) {
    super(e, M_MessageTransportUtils_maybe.ParameterStructures.byName);
  }
}
exports.ProtocolRequestType = ProtocolRequestType;
class ProtocolNotificationType0 extends M_MessageTransportUtils_maybe.NotificationType0 {
  constructor(e) {
    super(e);
  }
}
exports.ProtocolNotificationType0 = ProtocolNotificationType0;
class ProtocolNotificationType extends M_MessageTransportUtils_maybe.NotificationType {
  constructor(e) {
    super(e, M_MessageTransportUtils_maybe.ParameterStructures.byName);
  }
}
exports.ProtocolNotificationType = ProtocolNotificationType;
