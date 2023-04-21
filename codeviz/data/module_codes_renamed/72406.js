function normalizeNewlines(e) {
  return e.replace(/\s/g, "");
}
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.normalizeNewlines = exports.asReadableCert = undefined;
exports.asReadableCert = function (e) {
  const t = e.indexOf("-----BEGIN CERTIFICATE-----") + 27;
  const n = e.indexOf("-----END CERTIFICATE-----");
  return normalizeNewlines(
    e.substring(t, t + 30) + "..." + e.substring(n - 30, n - 1)
  );
};
exports.normalizeNewlines = normalizeNewlines;
