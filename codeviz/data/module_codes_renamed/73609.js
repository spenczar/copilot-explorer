Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_TypeBox_maybe = require("TypeBox");
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_Path_Parsing_Utils_maybe = require("Path-Parsing-Utils");
const M_PathUtilsManager_maybe = require("PathUtilsManager");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const c = M_TypeBox_maybe.Type.Object({
  uri: M_TypeBox_maybe.Type.String(),
});
const l = new M_schema_code_generator_maybe.default().compile(
  M_TypeBox_maybe.Type.Strict(c)
);
exports.default = async function (e, t, r) {
  if (!l(r)) {
    const e = M_AjvErrorManager_maybe.extractAjvErrors(l.errors);
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
