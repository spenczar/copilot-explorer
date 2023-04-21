Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.notifyAccepted = undefined;
const n = require(892);
const i = require(86236);
const o = require(93402);
const s = require(53007);
const a = require(5381);
const c = require(6159);
const l = require(56056);
const u = n.Type.Object({
  uuid: n.Type.String({
    minLength: 1,
  }),
  options: n.Type.Optional(l.TestingOptions),
});
const d = new i.default().compile(n.Type.Strict(u));
exports.notifyAccepted = async function (e, t, r) {
  if (!d(r)) {
    const e = a.extractAjvErrors(d.errors);
    return [
      null,
      {
        code: a.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  if (undefined !== r.options?.testingCtx) {
    e = c.getTestingContext(r.options.testingCtx);
  }
  const n = e.get(s.CopilotCompletionCache);
  const i = n.get(r.uuid);
  if (i) {
    n.deleteKey(r.uuid);
    o.postInsertionTasks(e, "ghostText", i.text, i.offset, i.file, i.telemetry);
  }
  return ["OK", null];
};