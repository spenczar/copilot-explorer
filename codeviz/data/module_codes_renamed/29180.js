Object.defineProperty(exports, "__esModule", {
  value: true,
});
var M_PerformanceTracker_maybe = require("PerformanceTracker");
var M_ObjectPropertyManager_maybe = require("ObjectPropertyManager");
exports.performanceMetricsTelemetryProcessor = function (e, t) {
  switch ((t && t.addDocument(e), e.data.baseType)) {
    case M_ObjectPropertyManager_maybe.TelemetryTypeString.Exception:
      M_PerformanceTracker_maybe.countException();
      break;
    case M_ObjectPropertyManager_maybe.TelemetryTypeString.Request:
      var r = e.data.baseData;
      M_PerformanceTracker_maybe.countRequest(r.duration, r.success);
      break;
    case M_ObjectPropertyManager_maybe.TelemetryTypeString.Dependency:
      var o = e.data.baseData;
      M_PerformanceTracker_maybe.countDependency(o.duration, o.success);
  }
  return true;
};
