Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.NotificationHandlers =
  exports.getAllMethods =
  exports.MethodHandlers =
    undefined;
const M_contextual_auth_manager_maybe = require("contextual-auth-manager");
const M_completion_manager_maybe = require("completion-manager");
const M_PanelCompletionHandler_maybe = require("PanelCompletionHandler");
const M_ParamValidatorManager_maybe = require("ParamValidatorManager");
const M_CopilotCompletionNotifier_maybe = require("CopilotCompletionNotifier");
const M_CompletionNotificationManager_maybe = require("CompletionNotificationManager");
const M_notifyShownManager_maybe = require("notifyShownManager");
const M_editor_info_handler_maybe = require("editor-info-handler");
const M_getPendingSignInManager_maybe = require("getPendingSignInManager");
const M_GitHubDeviceFlowManager_maybe = require("GitHubDeviceFlowManager");
const M_auth_status_manager_maybe = require("auth-status-manager");
const M_telemetryExceptionHandler_maybe = require("telemetryExceptionHandler");
const M_contextual_auth_manager_maybe = require("contextual-auth-manager");
const M_validation_context_manager_maybe = require("validation-context-manager");
const M_text_document_manager_utils_maybe = require("text-document-manager-utils");
const M_contextual_auth_manager_maybe = require("contextual-auth-manager");
const M_CompletionDocumentsManager_maybe = require("CompletionDocumentsManager");
const M_PanelCompletionDocumentsManager_maybe = require("PanelCompletionDocumentsManager");
const M_showWarningMessageManager_maybe = require("showWarningMessageManager");
const M_FakeAuthManagerModule_maybe = require("FakeAuthManagerModule");
const M_CertificateVerificationManager_maybe = require("CertificateVerificationManager");
const M_TextDocumentVerifier_maybe = require("TextDocumentVerifier");
class MethodHandlers {
  constructor(e) {
    this.handlers = e;
  }
}
exports.MethodHandlers = MethodHandlers;
exports.getAllMethods = function () {
  const e = new Map();
  e.set("getCompletions", M_completion_manager_maybe.handleGetCompletions);
  e.set(
    "getCompletionsCycling",
    M_completion_manager_maybe.handleGetCompletionsCycling
  );
  e.set(
    "getPanelCompletions",
    M_PanelCompletionHandler_maybe.handleGetPanelCompletions
  );
  e.set("getVersion", M_ParamValidatorManager_maybe.default);
  e.set("setEditorInfo", M_editor_info_handler_maybe.handleSetEditorInfo);
  e.set("checkStatus", M_contextual_auth_manager_maybe.default);
  e.set("signInInitiate", M_GitHubDeviceFlowManager_maybe.default);
  e.set("signInConfirm", M_getPendingSignInManager_maybe.default);
  e.set("signOut", M_auth_status_manager_maybe.default);
  e.set("notifyShown", M_notifyShownManager_maybe.notifyShown);
  e.set("notifyAccepted", M_CopilotCompletionNotifier_maybe.notifyAccepted);
  e.set("notifyRejected", M_CompletionNotificationManager_maybe.notifyRejected);
  e.set(
    "telemetry/exception",
    M_telemetryExceptionHandler_maybe.telemetryExceptionMethod
  );
  e.set("testing/createContext", M_validation_context_manager_maybe.default);
  e.set("testing/alwaysAuth", M_contextual_auth_manager_maybe.default);
  e.set("testing/neverAuth", M_contextual_auth_manager_maybe.default);
  e.set("testing/useTestingToken", M_FakeAuthManagerModule_maybe.default);
  e.set(
    "testing/setCompletionDocuments",
    M_CompletionDocumentsManager_maybe.default
  );
  e.set(
    "testing/setPanelCompletionDocuments",
    M_PanelCompletionDocumentsManager_maybe.default
  );
  e.set(
    "testing/triggerShowMessageRequest",
    M_showWarningMessageManager_maybe.default
  );
  e.set("testing/getDocument", M_text_document_manager_utils_maybe.default);
  e.set("debug/verifyState", M_TextDocumentVerifier_maybe.handleVerifyState);
  e.set(
    "debug/verifyCertificate",
    M_CertificateVerificationManager_maybe.handleVerifyCertificate
  );
  e.set(
    "debug/verifyWorkspaceState",
    M_TextDocumentVerifier_maybe.handleVerifyWorkspaceState
  );
  return new MethodHandlers(e);
};
exports.NotificationHandlers = class {
  constructor(e = new Map()) {
    this.handlers = e;
  }
};
