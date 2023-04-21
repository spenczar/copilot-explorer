Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.handleVerifyWorkspaceState = exports.handleVerifyState = undefined;
const n = require(892);
const i = require(86236);
const o = require(16630);
const s = require(70819);
const a = require(5381);
const c = require(10540);
const l = n.Type.Object({
  source: n.Type.String(),
  languageId: n.Type.String(),
  version: n.Type.Number(),
  uri: n.Type.String(),
});
const u = new i.default().compile(n.Type.Strict(l));
exports.handleVerifyState = async function (e, t, r) {
  if (!u(r)) {
    const e = a.extractAjvErrors(u.errors);
    return [
      null,
      {
        code: a.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  const n = e.get(s.TextDocumentManager);
  const i = await n.getTextDocument(o.URI.parse(r.uri));
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
          message: `Document not found: "${o.URI.parse(
            r.uri
          )}" (given by the editor: "${r.uri}")`,
        },
        null,
      ];
};
exports.handleVerifyWorkspaceState = async function (e, t, r) {
  return [e.get(c.AgentTextDocumentManager).workspaceFolders, null];
};