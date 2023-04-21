Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.PanelCompletionDocuments = undefined;
const M_TypeBox_maybe = require("TypeBox");
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const M_TestContextManager_maybe = require("TestContextManager");
const a = M_TypeBox_maybe.Type.Object({
  text: M_TypeBox_maybe.Type.String(),
  score: M_TypeBox_maybe.Type.Number(),
});
const c = M_TypeBox_maybe.Type.Object({
  testingCtx: M_TypeBox_maybe.Type.Number(),
  documents: M_TypeBox_maybe.Type.Array(a),
  options: M_TypeBox_maybe.Type.Optional(M_TypeBox_maybe.Type.Object({})),
});
const l = new M_schema_code_generator_maybe.default().compile(
  M_TypeBox_maybe.Type.Strict(c)
);
class PanelCompletionDocuments {
  constructor(e) {
    this.documents = e;
  }
}
exports.PanelCompletionDocuments = PanelCompletionDocuments;
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
  M_TestContextManager_maybe.getTestingContext(r.testingCtx).forceSet(
    PanelCompletionDocuments,
    new PanelCompletionDocuments(r.documents)
  );
  return ["OK", null];
};
