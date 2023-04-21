Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.notifyRejected = undefined;
const n = require(892);
const i = require(86236);
const o = require(93402);
const s = require(53007);
const a = require(5381);
const c = require(6159);
const l = require(56056);
const u = n.Type.Object({
  uuids: n.Type.Array(n.Type.String()),
  options: n.Type.Optional(l.TestingOptions),
});
const d = new i.default().compile(n.Type.Strict(u));
exports.notifyRejected = async function (e, t, r) {
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
  const i = r.uuids.flatMap((e) => n.get(e) ?? []);
  if (i.length > 0) {
    const t = i[0];
    for (const e of r.uuids) n.deleteKey(e);
    const s = i.map((e) => ({
      completionText: e.displayText,
      completionTelemetryData: e.telemetry,
    }));
    o.postRejectionTasks(e, "ghostText", t.offset, t.file, s);
  }
  return ["OK", null];
};