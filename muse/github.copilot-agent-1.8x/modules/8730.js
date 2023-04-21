Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.PanelCompletionDocuments = undefined;
const n = require(892);
const i = require(86236);
const o = require(5381);
const s = require(6159);
const a = n.Type.Object({
  text: n.Type.String(),
  score: n.Type.Number(),
});
const c = n.Type.Object({
  testingCtx: n.Type.Number(),
  documents: n.Type.Array(a),
  options: n.Type.Optional(n.Type.Object({})),
});
const l = new i.default().compile(n.Type.Strict(c));
class PanelCompletionDocuments {
  constructor(e) {
    this.documents = e;
  }
}
exports.PanelCompletionDocuments = PanelCompletionDocuments;
exports.default = async function (e, t, r) {
  if (!l(r)) {
    const e = o.extractAjvErrors(l.errors);
    return [
      null,
      {
        code: o.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  s.getTestingContext(r.testingCtx).forceSet(
    PanelCompletionDocuments,
    new PanelCompletionDocuments(r.documents)
  );
  return ["OK", null];
};