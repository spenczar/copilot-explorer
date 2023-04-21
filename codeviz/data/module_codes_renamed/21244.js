Object.defineProperty(exports, "__esModule", {
  value: true,
});
var M_ObjectPropertyManager_maybe = require("ObjectPropertyManager");
function getSamplingHashCode(e) {
  var t = 2147483647;
  var r = 5381;
  if (!e) return 0;
  for (; e.length < 8; ) e += e;
  for (var n = 0; n < e.length; n++)
    r = ((((r << 5) + r) | 0) + e.charCodeAt(n)) | 0;
  return ((r = r <= -2147483648 ? t : Math.abs(r)) / t) * 100;
}
exports.samplingTelemetryProcessor = function (e, t) {
  var r = e.sampleRate;
  return (
    null == r ||
    r >= 100 ||
    !(
      !e.data ||
      M_ObjectPropertyManager_maybe.TelemetryType.Metric !==
        M_ObjectPropertyManager_maybe.baseTypeToTelemetryType(e.data.baseType)
    ) ||
    (t.correlationContext && t.correlationContext.operation
      ? getSamplingHashCode(t.correlationContext.operation.id) < r
      : 100 * Math.random() < r)
  );
};
exports.getSamplingHashCode = getSamplingHashCode;
