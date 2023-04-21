Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.CompletionDocuments = undefined;
const M_TypeBox_maybe = require("TypeBox");
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const M_TestContextManager_maybe = require("TestContextManager");
const a = M_TypeBox_maybe.Type.Object({
  testingCtx: M_TypeBox_maybe.Type.Number(),
  documents: M_TypeBox_maybe.Type.Array(M_TypeBox_maybe.Type.String()),
  options: M_TypeBox_maybe.Type.Optional(M_TypeBox_maybe.Type.Object({})),
});
const c = new M_schema_code_generator_maybe.default().compile(
  M_TypeBox_maybe.Type.Strict(a)
);
class CompletionDocuments {
  constructor(e) {
    this.documents = e;
  }
}
exports.CompletionDocuments = CompletionDocuments;
exports.default = async function (e, t, r) {
  if (!c(r)) {
    const e = M_AjvErrorManager_maybe.extractAjvErrors(c.errors);
    return [
      null,
      {
        code: M_AjvErrorManager_maybe.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  M_TestContextManager_maybe.getTestingContext(r.testingCtx).forceSet(
    CompletionDocuments,
    new CompletionDocuments(r.documents)
  );
  return ["OK", null];
};
