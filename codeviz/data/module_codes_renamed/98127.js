Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.handleVerifyWorkspaceState = exports.handleVerifyState = undefined;
const M_TypeBox_maybe = require("TypeBox");
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_Path_Parsing_Utils_maybe = require("Path-Parsing-Utils");
const M_PathUtilsManager_maybe = require("PathUtilsManager");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const M_AgentTextDocumentManagerModule_maybe = require("AgentTextDocumentManagerModule");
const l = M_TypeBox_maybe.Type.Object({
  source: M_TypeBox_maybe.Type.String(),
  languageId: M_TypeBox_maybe.Type.String(),
  version: M_TypeBox_maybe.Type.Number(),
  uri: M_TypeBox_maybe.Type.String(),
});
const u = new M_schema_code_generator_maybe.default().compile(
  M_TypeBox_maybe.Type.Strict(l)
);
exports.handleVerifyState = async function (e, t, r) {
  if (!u(r)) {
    const e = M_AjvErrorManager_maybe.extractAjvErrors(u.errors);
    return [
      null,
      {
        code: M_AjvErrorManager_maybe.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  const n = e.get(M_PathUtilsManager_maybe.TextDocumentManager);
  const i = await n.getTextDocument(
    M_Path_Parsing_Utils_maybe.URI.parse(r.uri)
  );
  return i
    ? i.languageId !== r.languageId
      ? [
          {
            status: false,
            message: `Language id mismatch: [State] ${i.languageId} !== [Request] ${r.languageId}`,
          },
          null,
        ]
      : i.getText() !== r.source
      ? [
          {
            status: false,
            message: `Source mismatch: [State] ${i.getText()} !== [Request] ${
              r.source
            }`,
          },
          null,
        ]
      : i.version !== r.version
      ? [
          {
            status: false,
            message: `Version mismatch: [State] ${i.version} !== [Request] ${r.version}`,
          },
          null,
        ]
      : [
          {
            status: true,
            message: "",
          },
          null,
        ]
    : [
        {
          status: false,
          message: `Document not found: "${M_Path_Parsing_Utils_maybe.URI.parse(
            r.uri
          )}" (given by the editor: "${r.uri}")`,
        },
        null,
      ];
};
exports.handleVerifyWorkspaceState = async function (e, t, r) {
  return [
    e.get(M_AgentTextDocumentManagerModule_maybe.AgentTextDocumentManager)
      .workspaceFolders,
    null,
  ];
};
