Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.CancellationSenderStrategy =
  exports.CancellationReceiverStrategy =
  exports.ConnectionError =
  exports.ConnectionErrors =
  exports.LogTraceNotification =
  exports.SetTraceNotification =
  exports.TraceFormat =
  exports.Trace =
  exports.ProgressType =
  exports.createMessageConnection =
  exports.NullLogger =
  exports.ConnectionOptions =
  exports.ConnectionStrategy =
  exports.WriteableStreamMessageWriter =
  exports.AbstractMessageWriter =
  exports.MessageWriter =
  exports.ReadableStreamMessageReader =
  exports.AbstractMessageReader =
  exports.MessageReader =
  exports.CancellationToken =
  exports.CancellationTokenSource =
  exports.Emitter =
  exports.Event =
  exports.Disposable =
  exports.ParameterStructures =
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
  exports.ErrorCodes =
  exports.ResponseError =
  exports.RequestType9 =
  exports.RequestType8 =
  exports.RequestType7 =
  exports.RequestType6 =
  exports.RequestType5 =
  exports.RequestType4 =
  exports.RequestType3 =
  exports.RequestType2 =
  exports.RequestType1 =
  exports.RequestType0 =
  exports.RequestType =
  exports.RAL =
    undefined;
exports.CancellationStrategy = undefined;
const M_message_signature_constants_maybe = require("message-signature-constants");
exports.RequestType = M_message_signature_constants_maybe.RequestType;
exports.RequestType0 = M_message_signature_constants_maybe.RequestType0;
exports.RequestType1 = M_message_signature_constants_maybe.RequestType1;
exports.RequestType2 = M_message_signature_constants_maybe.RequestType2;
exports.RequestType3 = M_message_signature_constants_maybe.RequestType3;
exports.RequestType4 = M_message_signature_constants_maybe.RequestType4;
exports.RequestType5 = M_message_signature_constants_maybe.RequestType5;
exports.RequestType6 = M_message_signature_constants_maybe.RequestType6;
exports.RequestType7 = M_message_signature_constants_maybe.RequestType7;
exports.RequestType8 = M_message_signature_constants_maybe.RequestType8;
exports.RequestType9 = M_message_signature_constants_maybe.RequestType9;
exports.ResponseError = M_message_signature_constants_maybe.ResponseError;
exports.ErrorCodes = M_message_signature_constants_maybe.ErrorCodes;
exports.NotificationType = M_message_signature_constants_maybe.NotificationType;
exports.NotificationType0 =
  M_message_signature_constants_maybe.NotificationType0;
exports.NotificationType1 =
  M_message_signature_constants_maybe.NotificationType1;
exports.NotificationType2 =
  M_message_signature_constants_maybe.NotificationType2;
exports.NotificationType3 =
  M_message_signature_constants_maybe.NotificationType3;
exports.NotificationType4 =
  M_message_signature_constants_maybe.NotificationType4;
exports.NotificationType5 =
  M_message_signature_constants_maybe.NotificationType5;
exports.NotificationType6 =
  M_message_signature_constants_maybe.NotificationType6;
exports.NotificationType7 =
  M_message_signature_constants_maybe.NotificationType7;
exports.NotificationType8 =
  M_message_signature_constants_maybe.NotificationType8;
exports.NotificationType9 =
  M_message_signature_constants_maybe.NotificationType9;
exports.ParameterStructures =
  M_message_signature_constants_maybe.ParameterStructures;
const M_DisposableManager_maybe = require("DisposableManager");
exports.Disposable = M_DisposableManager_maybe.Disposable;
const M_EventEmitterManager_maybe = require("EventEmitterManager");
exports.Event = M_EventEmitterManager_maybe.Event;
exports.Emitter = M_EventEmitterManager_maybe.Emitter;
const M_CancellationTokenManager_maybe = require("CancellationTokenManager");
exports.CancellationTokenSource =
  M_CancellationTokenManager_maybe.CancellationTokenSource;
exports.CancellationToken = M_CancellationTokenManager_maybe.CancellationToken;
const M_MessageReaderModule_maybe = require("MessageReaderModule");
exports.MessageReader = M_MessageReaderModule_maybe.MessageReader;
exports.AbstractMessageReader =
  M_MessageReaderModule_maybe.AbstractMessageReader;
exports.ReadableStreamMessageReader =
  M_MessageReaderModule_maybe.ReadableStreamMessageReader;
const M_MessageWriterModule_maybe = require("MessageWriterModule");
exports.MessageWriter = M_MessageWriterModule_maybe.MessageWriter;
exports.AbstractMessageWriter =
  M_MessageWriterModule_maybe.AbstractMessageWriter;
exports.WriteableStreamMessageWriter =
  M_MessageWriterModule_maybe.WriteableStreamMessageWriter;
const M_MessageConnectionManager_maybe = require("MessageConnectionManager");
exports.ConnectionStrategy =
  M_MessageConnectionManager_maybe.ConnectionStrategy;
exports.ConnectionOptions = M_MessageConnectionManager_maybe.ConnectionOptions;
exports.NullLogger = M_MessageConnectionManager_maybe.NullLogger;
exports.createMessageConnection =
  M_MessageConnectionManager_maybe.createMessageConnection;
exports.ProgressType = M_MessageConnectionManager_maybe.ProgressType;
exports.Trace = M_MessageConnectionManager_maybe.Trace;
exports.TraceFormat = M_MessageConnectionManager_maybe.TraceFormat;
exports.SetTraceNotification =
  M_MessageConnectionManager_maybe.SetTraceNotification;
exports.LogTraceNotification =
  M_MessageConnectionManager_maybe.LogTraceNotification;
exports.ConnectionErrors = M_MessageConnectionManager_maybe.ConnectionErrors;
exports.ConnectionError = M_MessageConnectionManager_maybe.ConnectionError;
exports.CancellationReceiverStrategy =
  M_MessageConnectionManager_maybe.CancellationReceiverStrategy;
exports.CancellationSenderStrategy =
  M_MessageConnectionManager_maybe.CancellationSenderStrategy;
exports.CancellationStrategy =
  M_MessageConnectionManager_maybe.CancellationStrategy;
const M_RuntimeAbstractionLayerManager_maybe = require("RuntimeAbstractionLayerManager");
exports.RAL = M_RuntimeAbstractionLayerManager_maybe.default;
