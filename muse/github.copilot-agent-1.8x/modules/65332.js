Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.NotificationHandlers =
  exports.getAllMethods =
  exports.MethodHandlers =
    undefined;
const n = require(86934);
const i = require(33340);
const o = require(79638);
const s = require(61025);
const a = require(55581);
const c = require(71382);
const l = require(91300);
const u = require(89629);
const d = require(66885);
const p = require(31451);
const h = require(96656);
const f = require(31620);
const g = require(72530);
const m = require(8269);
const y = require(73609);
const v = require(86584);
const _ = require(22930);
const b = require(8730);
const w = require(82043);
const C = require(22229);
const E = require(90623);
const T = require(98127);
class MethodHandlers {
  constructor(e) {
    this.handlers = e;
  }
}
exports.MethodHandlers = MethodHandlers;
exports.getAllMethods = function () {
  const e = new Map();
  e.set("getCompletions", i.handleGetCompletions);
  e.set("getCompletionsCycling", i.handleGetCompletionsCycling);
  e.set("getPanelCompletions", o.handleGetPanelCompletions);
  e.set("getVersion", s.default);
  e.set("setEditorInfo", u.handleSetEditorInfo);
  e.set("checkStatus", n.default);
  e.set("signInInitiate", p.default);
  e.set("signInConfirm", d.default);
  e.set("signOut", h.default);
  e.set("notifyShown", l.notifyShown);
  e.set("notifyAccepted", a.notifyAccepted);
  e.set("notifyRejected", c.notifyRejected);
  e.set("telemetry/exception", f.telemetryExceptionMethod);
  e.set("testing/createContext", m.default);
  e.set("testing/alwaysAuth", g.default);
  e.set("testing/neverAuth", v.default);
  e.set("testing/useTestingToken", C.default);
  e.set("testing/setCompletionDocuments", _.default);
  e.set("testing/setPanelCompletionDocuments", b.default);
  e.set("testing/triggerShowMessageRequest", w.default);
  e.set("testing/getDocument", y.default);
  e.set("debug/verifyState", T.handleVerifyState);
  e.set("debug/verifyCertificate", E.handleVerifyCertificate);
  e.set("debug/verifyWorkspaceState", T.handleVerifyWorkspaceState);
  return new MethodHandlers(e);
};
exports.NotificationHandlers = class {
  constructor(e = new Map()) {
    this.handlers = e;
  }
};