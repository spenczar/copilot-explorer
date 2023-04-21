Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.DocumentLinkRequest =
  exports.CodeLensRefreshRequest =
  exports.CodeLensResolveRequest =
  exports.CodeLensRequest =
  exports.WorkspaceSymbolRequest =
  exports.CodeActionResolveRequest =
  exports.CodeActionRequest =
  exports.DocumentSymbolRequest =
  exports.DocumentHighlightRequest =
  exports.ReferencesRequest =
  exports.DefinitionRequest =
  exports.SignatureHelpRequest =
  exports.SignatureHelpTriggerKind =
  exports.HoverRequest =
  exports.CompletionResolveRequest =
  exports.CompletionRequest =
  exports.CompletionTriggerKind =
  exports.PublishDiagnosticsNotification =
  exports.WatchKind =
  exports.FileChangeType =
  exports.DidChangeWatchedFilesNotification =
  exports.WillSaveTextDocumentWaitUntilRequest =
  exports.WillSaveTextDocumentNotification =
  exports.TextDocumentSaveReason =
  exports.DidSaveTextDocumentNotification =
  exports.DidCloseTextDocumentNotification =
  exports.DidChangeTextDocumentNotification =
  exports.TextDocumentContentChangeEvent =
  exports.DidOpenTextDocumentNotification =
  exports.TextDocumentSyncKind =
  exports.TelemetryEventNotification =
  exports.LogMessageNotification =
  exports.ShowMessageRequest =
  exports.ShowMessageNotification =
  exports.MessageType =
  exports.DidChangeConfigurationNotification =
  exports.ExitNotification =
  exports.ShutdownRequest =
  exports.InitializedNotification =
  exports.InitializeError =
  exports.InitializeRequest =
  exports.WorkDoneProgressOptions =
  exports.TextDocumentRegistrationOptions =
  exports.StaticRegistrationOptions =
  exports.FailureHandlingKind =
  exports.ResourceOperationKind =
  exports.UnregistrationRequest =
  exports.RegistrationRequest =
  exports.DocumentSelector =
  exports.DocumentFilter =
    undefined;
exports.MonikerRequest =
  exports.MonikerKind =
  exports.UniquenessLevel =
  exports.WillDeleteFilesRequest =
  exports.DidDeleteFilesNotification =
  exports.WillRenameFilesRequest =
  exports.DidRenameFilesNotification =
  exports.WillCreateFilesRequest =
  exports.DidCreateFilesNotification =
  exports.FileOperationPatternKind =
  exports.LinkedEditingRangeRequest =
  exports.ShowDocumentRequest =
  exports.SemanticTokensRegistrationType =
  exports.SemanticTokensRefreshRequest =
  exports.SemanticTokensRangeRequest =
  exports.SemanticTokensDeltaRequest =
  exports.SemanticTokensRequest =
  exports.TokenFormat =
  exports.SemanticTokens =
  exports.SemanticTokenModifiers =
  exports.SemanticTokenTypes =
  exports.CallHierarchyPrepareRequest =
  exports.CallHierarchyOutgoingCallsRequest =
  exports.CallHierarchyIncomingCallsRequest =
  exports.WorkDoneProgressCancelNotification =
  exports.WorkDoneProgressCreateRequest =
  exports.WorkDoneProgress =
  exports.SelectionRangeRequest =
  exports.DeclarationRequest =
  exports.FoldingRangeRequest =
  exports.ColorPresentationRequest =
  exports.DocumentColorRequest =
  exports.ConfigurationRequest =
  exports.DidChangeWorkspaceFoldersNotification =
  exports.WorkspaceFoldersRequest =
  exports.TypeDefinitionRequest =
  exports.ImplementationRequest =
  exports.ApplyWorkspaceEditRequest =
  exports.ExecuteCommandRequest =
  exports.PrepareRenameRequest =
  exports.RenameRequest =
  exports.PrepareSupportDefaultBehavior =
  exports.DocumentOnTypeFormattingRequest =
  exports.DocumentRangeFormattingRequest =
  exports.DocumentFormattingRequest =
  exports.DocumentLinkResolveRequest =
    undefined;
const M_typeCheckerUtils_maybe = require("typeCheckerUtils");
const M_ProtocolTypeConstants_maybe = require("ProtocolTypeConstants");
const M_language_marker_constants_maybe = require("language-marker-constants");
exports.ImplementationRequest =
  M_language_marker_constants_maybe.ImplementationRequest;
const M_type_definition_request_manager_maybe = require("type-definition-request-manager");
exports.TypeDefinitionRequest =
  M_type_definition_request_manager_maybe.TypeDefinitionRequest;
const M_WorkspaceFolderManager_maybe = require("WorkspaceFolderManager");
exports.WorkspaceFoldersRequest =
  M_WorkspaceFolderManager_maybe.WorkspaceFoldersRequest;
exports.DidChangeWorkspaceFoldersNotification =
  M_WorkspaceFolderManager_maybe.DidChangeWorkspaceFoldersNotification;
const M_ConfigurationRequestManager_maybe = require("ConfigurationRequestManager");
exports.ConfigurationRequest =
  M_ConfigurationRequestManager_maybe.ConfigurationRequest;
const M_language_color_constants_maybe = require("language-color-constants");
exports.DocumentColorRequest =
  M_language_color_constants_maybe.DocumentColorRequest;
exports.ColorPresentationRequest =
  M_language_color_constants_maybe.ColorPresentationRequest;
const M_language_folding_constants_maybe = require("language-folding-constants");
exports.FoldingRangeRequest =
  M_language_folding_constants_maybe.FoldingRangeRequest;
const M_language_marker_constants_maybe = require("language-marker-constants");
exports.DeclarationRequest =
  M_language_marker_constants_maybe.DeclarationRequest;
const M_selection_range_request_constants_maybe = require("selection-range-request-constants");
exports.SelectionRangeRequest =
  M_selection_range_request_constants_maybe.SelectionRangeRequest;
const M_WorkDoneProgressModule_maybe = require("WorkDoneProgressModule");
exports.WorkDoneProgress = M_WorkDoneProgressModule_maybe.WorkDoneProgress;
exports.WorkDoneProgressCreateRequest =
  M_WorkDoneProgressModule_maybe.WorkDoneProgressCreateRequest;
exports.WorkDoneProgressCancelNotification =
  M_WorkDoneProgressModule_maybe.WorkDoneProgressCancelNotification;
const M_CallHierarchyRequestManager_maybe = require("CallHierarchyRequestManager");
exports.CallHierarchyIncomingCallsRequest =
  M_CallHierarchyRequestManager_maybe.CallHierarchyIncomingCallsRequest;
exports.CallHierarchyOutgoingCallsRequest =
  M_CallHierarchyRequestManager_maybe.CallHierarchyOutgoingCallsRequest;
exports.CallHierarchyPrepareRequest =
  M_CallHierarchyRequestManager_maybe.CallHierarchyPrepareRequest;
const M_SemanticTokenConstants_maybe = require("SemanticTokenConstants");
exports.SemanticTokenTypes = M_SemanticTokenConstants_maybe.SemanticTokenTypes;
exports.SemanticTokenModifiers =
  M_SemanticTokenConstants_maybe.SemanticTokenModifiers;
exports.SemanticTokens = M_SemanticTokenConstants_maybe.SemanticTokens;
exports.TokenFormat = M_SemanticTokenConstants_maybe.TokenFormat;
exports.SemanticTokensRequest =
  M_SemanticTokenConstants_maybe.SemanticTokensRequest;
exports.SemanticTokensDeltaRequest =
  M_SemanticTokenConstants_maybe.SemanticTokensDeltaRequest;
exports.SemanticTokensRangeRequest =
  M_SemanticTokenConstants_maybe.SemanticTokensRangeRequest;
exports.SemanticTokensRefreshRequest =
  M_SemanticTokenConstants_maybe.SemanticTokensRefreshRequest;
exports.SemanticTokensRegistrationType =
  M_SemanticTokenConstants_maybe.SemanticTokensRegistrationType;
const M_WindowShowDocumentRequestModule_maybe = require("WindowShowDocumentRequestModule");
exports.ShowDocumentRequest =
  M_WindowShowDocumentRequestModule_maybe.ShowDocumentRequest;
const M_language_marker_request_constants_maybe = require("language-marker-request-constants");
exports.LinkedEditingRangeRequest =
  M_language_marker_request_constants_maybe.LinkedEditingRangeRequest;
const M_file_operation_constants_maybe = require("file-operation-constants");
exports.FileOperationPatternKind =
  M_file_operation_constants_maybe.FileOperationPatternKind;
exports.DidCreateFilesNotification =
  M_file_operation_constants_maybe.DidCreateFilesNotification;
exports.WillCreateFilesRequest =
  M_file_operation_constants_maybe.WillCreateFilesRequest;
exports.DidRenameFilesNotification =
  M_file_operation_constants_maybe.DidRenameFilesNotification;
exports.WillRenameFilesRequest =
  M_file_operation_constants_maybe.WillRenameFilesRequest;
exports.DidDeleteFilesNotification =
  M_file_operation_constants_maybe.DidDeleteFilesNotification;
exports.WillDeleteFilesRequest =
  M_file_operation_constants_maybe.WillDeleteFilesRequest;
const M_MonikerConstants_maybe = require("MonikerConstants");
var b;
var w;
var C;
var E;
var T;
var S;
var x;
var k;
var I;
var A;
var P;
var R;
var N;
var O;
var L;
var D;
var M;
var B;
var F;
var j;
var U;
var $;
var q;
var H;
var V;
var z;
var K;
var W;
var G;
var Q;
var J;
var Y;
var X;
var Z;
var ee;
var te;
var re;
var ne;
var ie;
var oe;
exports.UniquenessLevel = M_MonikerConstants_maybe.UniquenessLevel;
exports.MonikerKind = M_MonikerConstants_maybe.MonikerKind;
exports.MonikerRequest = M_MonikerConstants_maybe.MonikerRequest;
(function (e) {
  e.is = function (e) {
    const t = e;
    return (
      M_typeCheckerUtils_maybe.string(t.language) ||
      M_typeCheckerUtils_maybe.string(t.scheme) ||
      M_typeCheckerUtils_maybe.string(t.pattern)
    );
  };
})((b = exports.DocumentFilter || (exports.DocumentFilter = {})));
(function (e) {
  e.is = function (e) {
    if (!Array.isArray(e)) return false;
    for (let t of e)
      if (!M_typeCheckerUtils_maybe.string(t) && !b.is(t)) return false;
    return true;
  };
})((w = exports.DocumentSelector || (exports.DocumentSelector = {})));
(exports.RegistrationRequest || (exports.RegistrationRequest = {})).type =
  new M_ProtocolTypeConstants_maybe.ProtocolRequestType(
    "client/registerCapability"
  );
(exports.UnregistrationRequest || (exports.UnregistrationRequest = {})).type =
  new M_ProtocolTypeConstants_maybe.ProtocolRequestType(
    "client/unregisterCapability"
  );
(oe =
  exports.ResourceOperationKind ||
  (exports.ResourceOperationKind = {})).Create = "create";
oe.Rename = "rename";
oe.Delete = "delete";
(ie = exports.FailureHandlingKind || (exports.FailureHandlingKind = {})).Abort =
  "abort";
ie.Transactional = "transactional";
ie.TextOnlyTransactional = "textOnlyTransactional";
ie.Undo = "undo";
(
  exports.StaticRegistrationOptions || (exports.StaticRegistrationOptions = {})
).hasId = function (e) {
  const t = e;
  return t && M_typeCheckerUtils_maybe.string(t.id) && t.id.length > 0;
};
(
  exports.TextDocumentRegistrationOptions ||
  (exports.TextDocumentRegistrationOptions = {})
).is = function (e) {
  const t = e;
  return t && (null === t.documentSelector || w.is(t.documentSelector));
};
(ne =
  exports.WorkDoneProgressOptions ||
  (exports.WorkDoneProgressOptions = {})).is = function (e) {
  const t = e;
  return (
    M_typeCheckerUtils_maybe.objectLiteral(t) &&
    (undefined === t.workDoneProgress ||
      M_typeCheckerUtils_maybe.boolean(t.workDoneProgress))
  );
};
ne.hasWorkDoneProgress = function (e) {
  const t = e;
  return t && M_typeCheckerUtils_maybe.boolean(t.workDoneProgress);
};
(exports.InitializeRequest || (exports.InitializeRequest = {})).type =
  new M_ProtocolTypeConstants_maybe.ProtocolRequestType("initialize");
(
  exports.InitializeError || (exports.InitializeError = {})
).unknownProtocolVersion = 1;
(
  exports.InitializedNotification || (exports.InitializedNotification = {})
).type = new M_ProtocolTypeConstants_maybe.ProtocolNotificationType(
  "initialized"
);
(exports.ShutdownRequest || (exports.ShutdownRequest = {})).type =
  new M_ProtocolTypeConstants_maybe.ProtocolRequestType0("shutdown");
(exports.ExitNotification || (exports.ExitNotification = {})).type =
  new M_ProtocolTypeConstants_maybe.ProtocolNotificationType0("exit");
(
  exports.DidChangeConfigurationNotification ||
  (exports.DidChangeConfigurationNotification = {})
).type = new M_ProtocolTypeConstants_maybe.ProtocolNotificationType(
  "workspace/didChangeConfiguration"
);
(re = exports.MessageType || (exports.MessageType = {})).Error = 1;
re.Warning = 2;
re.Info = 3;
re.Log = 4;
(
  exports.ShowMessageNotification || (exports.ShowMessageNotification = {})
).type = new M_ProtocolTypeConstants_maybe.ProtocolNotificationType(
  "window/showMessage"
);
(exports.ShowMessageRequest || (exports.ShowMessageRequest = {})).type =
  new M_ProtocolTypeConstants_maybe.ProtocolRequestType(
    "window/showMessageRequest"
  );
(exports.LogMessageNotification || (exports.LogMessageNotification = {})).type =
  new M_ProtocolTypeConstants_maybe.ProtocolNotificationType(
    "window/logMessage"
  );
(
  exports.TelemetryEventNotification ||
  (exports.TelemetryEventNotification = {})
).type = new M_ProtocolTypeConstants_maybe.ProtocolNotificationType(
  "telemetry/event"
);
(te =
  exports.TextDocumentSyncKind || (exports.TextDocumentSyncKind = {})).None = 0;
te.Full = 1;
te.Incremental = 2;
(ee =
  exports.DidOpenTextDocumentNotification ||
  (exports.DidOpenTextDocumentNotification = {})).method =
  "textDocument/didOpen";
ee.type = new M_ProtocolTypeConstants_maybe.ProtocolNotificationType(ee.method);
(Z =
  exports.TextDocumentContentChangeEvent ||
  (exports.TextDocumentContentChangeEvent = {})).isIncremental = function (e) {
  let t = e;
  return (
    null != t &&
    "string" == typeof t.text &&
    undefined !== t.range &&
    (undefined === t.rangeLength || "number" == typeof t.rangeLength)
  );
};
Z.isFull = function (e) {
  let t = e;
  return (
    null != t &&
    "string" == typeof t.text &&
    undefined === t.range &&
    undefined === t.rangeLength
  );
};
(X =
  exports.DidChangeTextDocumentNotification ||
  (exports.DidChangeTextDocumentNotification = {})).method =
  "textDocument/didChange";
X.type = new M_ProtocolTypeConstants_maybe.ProtocolNotificationType(X.method);
(Y =
  exports.DidCloseTextDocumentNotification ||
  (exports.DidCloseTextDocumentNotification = {})).method =
  "textDocument/didClose";
Y.type = new M_ProtocolTypeConstants_maybe.ProtocolNotificationType(Y.method);
(J =
  exports.DidSaveTextDocumentNotification ||
  (exports.DidSaveTextDocumentNotification = {})).method =
  "textDocument/didSave";
J.type = new M_ProtocolTypeConstants_maybe.ProtocolNotificationType(J.method);
(Q =
  exports.TextDocumentSaveReason ||
  (exports.TextDocumentSaveReason = {})).Manual = 1;
Q.AfterDelay = 2;
Q.FocusOut = 3;
(G =
  exports.WillSaveTextDocumentNotification ||
  (exports.WillSaveTextDocumentNotification = {})).method =
  "textDocument/willSave";
G.type = new M_ProtocolTypeConstants_maybe.ProtocolNotificationType(G.method);
(W =
  exports.WillSaveTextDocumentWaitUntilRequest ||
  (exports.WillSaveTextDocumentWaitUntilRequest = {})).method =
  "textDocument/willSaveWaitUntil";
W.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(W.method);
(
  exports.DidChangeWatchedFilesNotification ||
  (exports.DidChangeWatchedFilesNotification = {})
).type = new M_ProtocolTypeConstants_maybe.ProtocolNotificationType(
  "workspace/didChangeWatchedFiles"
);
(K = exports.FileChangeType || (exports.FileChangeType = {})).Created = 1;
K.Changed = 2;
K.Deleted = 3;
(z = exports.WatchKind || (exports.WatchKind = {})).Create = 1;
z.Change = 2;
z.Delete = 4;
(
  exports.PublishDiagnosticsNotification ||
  (exports.PublishDiagnosticsNotification = {})
).type = new M_ProtocolTypeConstants_maybe.ProtocolNotificationType(
  "textDocument/publishDiagnostics"
);
(V =
  exports.CompletionTriggerKind ||
  (exports.CompletionTriggerKind = {})).Invoked = 1;
V.TriggerCharacter = 2;
V.TriggerForIncompleteCompletions = 3;
(H = exports.CompletionRequest || (exports.CompletionRequest = {})).method =
  "textDocument/completion";
H.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(H.method);
(q =
  exports.CompletionResolveRequest ||
  (exports.CompletionResolveRequest = {})).method = "completionItem/resolve";
q.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(q.method);
($ = exports.HoverRequest || (exports.HoverRequest = {})).method =
  "textDocument/hover";
$.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType($.method);
(U =
  exports.SignatureHelpTriggerKind ||
  (exports.SignatureHelpTriggerKind = {})).Invoked = 1;
U.TriggerCharacter = 2;
U.ContentChange = 3;
(j =
  exports.SignatureHelpRequest || (exports.SignatureHelpRequest = {})).method =
  "textDocument/signatureHelp";
j.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(j.method);
(F = exports.DefinitionRequest || (exports.DefinitionRequest = {})).method =
  "textDocument/definition";
F.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(F.method);
(B = exports.ReferencesRequest || (exports.ReferencesRequest = {})).method =
  "textDocument/references";
B.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(B.method);
(M =
  exports.DocumentHighlightRequest ||
  (exports.DocumentHighlightRequest = {})).method =
  "textDocument/documentHighlight";
M.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(M.method);
(D =
  exports.DocumentSymbolRequest ||
  (exports.DocumentSymbolRequest = {})).method = "textDocument/documentSymbol";
D.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(D.method);
(L = exports.CodeActionRequest || (exports.CodeActionRequest = {})).method =
  "textDocument/codeAction";
L.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(L.method);
(O =
  exports.CodeActionResolveRequest ||
  (exports.CodeActionResolveRequest = {})).method = "codeAction/resolve";
O.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(O.method);
(N =
  exports.WorkspaceSymbolRequest ||
  (exports.WorkspaceSymbolRequest = {})).method = "workspace/symbol";
N.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(N.method);
(R = exports.CodeLensRequest || (exports.CodeLensRequest = {})).method =
  "textDocument/codeLens";
R.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(R.method);
(P =
  exports.CodeLensResolveRequest ||
  (exports.CodeLensResolveRequest = {})).method = "codeLens/resolve";
P.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(P.method);
(A =
  exports.CodeLensRefreshRequest ||
  (exports.CodeLensRefreshRequest = {})).method = "workspace/codeLens/refresh";
A.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType0(A.method);
(I = exports.DocumentLinkRequest || (exports.DocumentLinkRequest = {})).method =
  "textDocument/documentLink";
I.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(I.method);
(k =
  exports.DocumentLinkResolveRequest ||
  (exports.DocumentLinkResolveRequest = {})).method = "documentLink/resolve";
k.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(k.method);
(x =
  exports.DocumentFormattingRequest ||
  (exports.DocumentFormattingRequest = {})).method = "textDocument/formatting";
x.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(x.method);
(S =
  exports.DocumentRangeFormattingRequest ||
  (exports.DocumentRangeFormattingRequest = {})).method =
  "textDocument/rangeFormatting";
S.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(S.method);
(T =
  exports.DocumentOnTypeFormattingRequest ||
  (exports.DocumentOnTypeFormattingRequest = {})).method =
  "textDocument/onTypeFormatting";
T.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(T.method);
(
  exports.PrepareSupportDefaultBehavior ||
  (exports.PrepareSupportDefaultBehavior = {})
).Identifier = 1;
(E = exports.RenameRequest || (exports.RenameRequest = {})).method =
  "textDocument/rename";
E.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(E.method);
(C =
  exports.PrepareRenameRequest || (exports.PrepareRenameRequest = {})).method =
  "textDocument/prepareRename";
C.type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(C.method);
(exports.ExecuteCommandRequest || (exports.ExecuteCommandRequest = {})).type =
  new M_ProtocolTypeConstants_maybe.ProtocolRequestType(
    "workspace/executeCommand"
  );
(
  exports.ApplyWorkspaceEditRequest || (exports.ApplyWorkspaceEditRequest = {})
).type = new M_ProtocolTypeConstants_maybe.ProtocolRequestType(
  "workspace/applyEdit"
);
