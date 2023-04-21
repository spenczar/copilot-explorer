Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(892);
const i = require(86236);
const o = require(16630);
const s = require(70819);
const a = require(5381);
const c = n.Type.Object({
  uri: n.Type.String(),
});
const l = new i.default().compile(n.Type.Strict(c));
exports.default = async function (e, t, r) {
  if (!l(r)) {
    const e = a.extractAjvErrors(l.errors);
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
  return [
    {
      uri: r.uri,
      languageId: i?.languageId ?? "unknown",
      version: i?.version ?? -1,
      text: i?.getText() ?? "",
    },
    null,
  ];
};