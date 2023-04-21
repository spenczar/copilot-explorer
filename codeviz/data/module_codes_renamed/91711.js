function n(e) {
  for (var r in e)
    if (exports.hasOwnProperty(r)) {
      exports[r] = e[r];
    }
}
Object.defineProperty(exports, "__esModule", {
  value: true,
});
n(require("samplingHashCodeManager"));
n(require("TelemetryProcessorManager"));
