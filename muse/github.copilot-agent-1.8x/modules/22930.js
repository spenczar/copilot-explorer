Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.CompletionDocuments = undefined;
const n = require(892);
const i = require(86236);
const o = require(5381);
const s = require(6159);
const a = n.Type.Object({
  testingCtx: n.Type.Number(),
  documents: n.Type.Array(n.Type.String()),
  options: n.Type.Optional(n.Type.Object({})),
});
const c = new i.default().compile(n.Type.Strict(a));
class CompletionDocuments {
  constructor(e) {
    this.documents = e;
  }
}
exports.CompletionDocuments = CompletionDocuments;
exports.default = async function (e, t, r) {
  if (!c(r)) {
    const e = o.extractAjvErrors(c.errors);
    return [
      null,
      {
        code: o.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  s.getTestingContext(r.testingCtx).forceSet(
    CompletionDocuments,
    new CompletionDocuments(r.documents)
  );
  return ["OK", null];
};