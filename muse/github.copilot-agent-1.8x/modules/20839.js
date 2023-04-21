Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.isResponseMessage =
  exports.isNotificationMessage =
  exports.isRequestMessage =
  exports.NotificationType9 =
  exports.NotificationType8 =
  exports.NotificationType7 =
  exports.NotificationType6 =
  exports.NotificationType5 =
  exports.NotificationType4 =
  exports.NotificationType3 =
  exports.NotificationType2 =
  exports.NotificationType1 =
  exports.NotificationType0 =
  exports.NotificationType =
  exports.RequestType9 =
  exports.RequestType8 =
  exports.RequestType7 =
  exports.RequestType6 =
  exports.RequestType5 =
  exports.RequestType4 =
  exports.RequestType3 =
  exports.RequestType2 =
  exports.RequestType1 =
  exports.RequestType =
  exports.RequestType0 =
  exports.AbstractMessageSignature =
  exports.ParameterStructures =
  exports.ResponseError =
  exports.ErrorCodes =
    undefined;
const n = require(67574);
var i;
!(function (e) {
  e.ParseError = -32700;
  e.InvalidRequest = -32600;
  e.MethodNotFound = -32601;
  e.InvalidParams = -32602;
  e.InternalError = -32603;
  e.jsonrpcReservedErrorRangeStart = -32099;
  e.serverErrorStart = e.jsonrpcReservedErrorRangeStart;
  e.MessageWriteError = -32099;
  e.MessageReadError = -32098;
  e.ServerNotInitialized = -32002;
  e.UnknownErrorCode = -32001;
  e.jsonrpcReservedErrorRangeEnd = -32000;
  e.serverErrorEnd = e.jsonrpcReservedErrorRangeEnd;
})((i = exports.ErrorCodes || (exports.ErrorCodes = {})));
class ResponseError extends Error {
  constructor(e, t, r) {
    super(t);
    this.code = n.number(e) ? e : i.UnknownErrorCode;
    this.data = r;
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
  toJson() {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
    };
  }
}
exports.ResponseError = ResponseError;
class ParameterStructures {
  constructor(e) {
    this.kind = e;
  }
  static is(e) {
    return (
      e === ParameterStructures.auto ||
      e === ParameterStructures.byName ||
      e === ParameterStructures.byPosition
    );
  }
  toString() {
    return this.kind;
  }
}
exports.ParameterStructures = ParameterStructures;
ParameterStructures.auto = new ParameterStructures("auto");
ParameterStructures.byPosition = new ParameterStructures("byPosition");
ParameterStructures.byName = new ParameterStructures("byName");
class AbstractMessageSignature {
  constructor(e, t) {
    this.method = e;
    this.numberOfParams = t;
  }
  get parameterStructures() {
    return ParameterStructures.auto;
  }
}
exports.AbstractMessageSignature = AbstractMessageSignature;
exports.RequestType0 = class extends AbstractMessageSignature {
  constructor(e) {
    super(e, 0);
  }
};
exports.RequestType = class extends AbstractMessageSignature {
  constructor(e, t = ParameterStructures.auto) {
    super(e, 1);
    this._parameterStructures = t;
  }
  get parameterStructures() {
    return this._parameterStructures;
  }
};
exports.RequestType1 = class extends AbstractMessageSignature {
  constructor(e, t = ParameterStructures.auto) {
    super(e, 1);
    this._parameterStructures = t;
  }
  get parameterStructures() {
    return this._parameterStructures;
  }
};
exports.RequestType2 = class extends AbstractMessageSignature {
  constructor(e) {
    super(e, 2);
  }
};
exports.RequestType3 = class extends AbstractMessageSignature {
  constructor(e) {
    super(e, 3);
  }
};
exports.RequestType4 = class extends AbstractMessageSignature {
  constructor(e) {
    super(e, 4);
  }
};
exports.RequestType5 = class extends AbstractMessageSignature {
  constructor(e) {
    super(e, 5);
  }
};
exports.RequestType6 = class extends AbstractMessageSignature {
  constructor(e) {
    super(e, 6);
  }
};
exports.RequestType7 = class extends AbstractMessageSignature {
  constructor(e) {
    super(e, 7);
  }
};
exports.RequestType8 = class extends AbstractMessageSignature {
  constructor(e) {
    super(e, 8);
  }
};
exports.RequestType9 = class extends AbstractMessageSignature {
  constructor(e) {
    super(e, 9);
  }
};
exports.NotificationType = class extends AbstractMessageSignature {
  constructor(e, t = ParameterStructures.auto) {
    super(e, 1);
    this._parameterStructures = t;
  }
  get parameterStructures() {
    return this._parameterStructures;
  }
};
exports.NotificationType0 = class extends AbstractMessageSignature {
  constructor(e) {
    super(e, 0);
  }
};
exports.NotificationType1 = class extends AbstractMessageSignature {
  constructor(e, t = ParameterStructures.auto) {
    super(e, 1);
    this._parameterStructures = t;
  }
  get parameterStructures() {
    return this._parameterStructures;
  }
};
exports.NotificationType2 = class extends AbstractMessageSignature {
  constructor(e) {
    super(e, 2);
  }
};
exports.NotificationType3 = class extends AbstractMessageSignature {
  constructor(e) {
    super(e, 3);
  }
};
exports.NotificationType4 = class extends AbstractMessageSignature {
  constructor(e) {
    super(e, 4);
  }
};
exports.NotificationType5 = class extends AbstractMessageSignature {
  constructor(e) {
    super(e, 5);
  }
};
exports.NotificationType6 = class extends AbstractMessageSignature {
  constructor(e) {
    super(e, 6);
  }
};
exports.NotificationType7 = class extends AbstractMessageSignature {
  constructor(e) {
    super(e, 7);
  }
};
exports.NotificationType8 = class extends AbstractMessageSignature {
  constructor(e) {
    super(e, 8);
  }
};
exports.NotificationType9 = class extends AbstractMessageSignature {
  constructor(e) {
    super(e, 9);
  }
};
exports.isRequestMessage = function (e) {
  const t = e;
  return t && n.string(t.method) && (n.string(t.id) || n.number(t.id));
};
exports.isNotificationMessage = function (e) {
  const t = e;
  return t && n.string(t.method) && undefined === e.id;
};
exports.isResponseMessage = function (e) {
  const t = e;
  return (
    t &&
    (undefined !== t.result || !!t.error) &&
    (n.string(t.id) || n.number(t.id) || null === t.id)
  );
};