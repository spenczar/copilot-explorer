Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.handleVerifyCertificate = undefined;
const n = require(892);
const i = require(86236);
const o = require("os");
const s = require(15291);
const a = require(72406);
const c = require(5381);
const l = n.Type.Object({
  expectedCertificate: n.Type.String(),
});
const u = new i.default().compile(n.Type.Strict(l));
exports.handleVerifyCertificate = async function (e, t, r) {
  if (!u(r)) {
    const e = c.extractAjvErrors(u.errors);
    return [
      null,
      {
        code: c.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  const n = s.getRootCertificateReader(e);
  const i = (await n.getAllRootCAs()).map(a.normalizeNewlines);
  const l = a.normalizeNewlines(r.expectedCertificate);
  return i.includes(l)
    ? [
        {
          status: true,
          message: "Certificate verified",
        },
        null,
      ]
    : [
        {
          status: false,
          message: `expected certificate not found - Expected to find certificate ${a.asReadableCert(
            l
          )}. Only found those installed on the system:${o.EOL}${i
            .map((e) => "- " + a.asReadableCert(e))
            .join(o.EOL)}`,
        },
        null,
      ];
};