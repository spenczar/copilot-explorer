Object.defineProperty(exports, "__esModule", {
  value: true,
});
var n = require(13103);
var i = require(85512);
exports.performanceMetricsTelemetryProcessor = function (e, t) {
  switch ((t && t.addDocument(e), e.data.baseType)) {
    case i.TelemetryTypeString.Exception:
      n.countException();
      break;
    case i.TelemetryTypeString.Request:
      var r = e.data.baseData;
      n.countRequest(r.duration, r.success);
      break;
    case i.TelemetryTypeString.Dependency:
      var o = e.data.baseData;
      n.countDependency(o.duration, o.success);
  }
  return true;
};