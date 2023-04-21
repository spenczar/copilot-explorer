Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.ProtocolNotificationType =
  exports.ProtocolNotificationType0 =
  exports.ProtocolRequestType =
  exports.ProtocolRequestType0 =
  exports.RegistrationType =
    undefined;
const n = require(74389);
exports.RegistrationType = class {
  constructor(e) {
    this.method = e;
  }
};
class ProtocolRequestType0 extends n.RequestType0 {
  constructor(e) {
    super(e);
  }
}
exports.ProtocolRequestType0 = ProtocolRequestType0;
class ProtocolRequestType extends n.RequestType {
  constructor(e) {
    super(e, n.ParameterStructures.byName);
  }
}
exports.ProtocolRequestType = ProtocolRequestType;
class ProtocolNotificationType0 extends n.NotificationType0 {
  constructor(e) {
    super(e);
  }
}
exports.ProtocolNotificationType0 = ProtocolNotificationType0;
class ProtocolNotificationType extends n.NotificationType {
  constructor(e) {
    super(e, n.ParameterStructures.byName);
  }
}
exports.ProtocolNotificationType = ProtocolNotificationType;