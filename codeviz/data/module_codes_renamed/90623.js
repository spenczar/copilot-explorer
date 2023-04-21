Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.handleVerifyCertificate = undefined;
const M_TypeBox_maybe = require("TypeBox");
const M_schema_code_generator_maybe = require("schema-code-generator");
const M_os = require("os");
const M_RootCertificateReaderManager_maybe = require("RootCertificateReaderManager");
const M_cert_utils_maybe = require("cert-utils");
const M_AjvErrorManager_maybe = require("AjvErrorManager");
const l = M_TypeBox_maybe.Type.Object({
  expectedCertificate: M_TypeBox_maybe.Type.String(),
});
const u = new M_schema_code_generator_maybe.default().compile(
  M_TypeBox_maybe.Type.Strict(l)
);
exports.handleVerifyCertificate = async function (e, t, r) {
  if (!u(r)) {
    const e = M_AjvErrorManager_maybe.extractAjvErrors(u.errors);
    return [
      null,
      {
        code: M_AjvErrorManager_maybe.ErrorCode.InvalidParams,
        message: "Invalid params: " + e.join(";"),
      },
    ];
  }
  const n = M_RootCertificateReaderManager_maybe.getRootCertificateReader(e);
  const i = (await n.getAllRootCAs()).map(M_cert_utils_maybe.normalizeNewlines);
  const l = M_cert_utils_maybe.normalizeNewlines(r.expectedCertificate);
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
          message: `expected certificate not found - Expected to find certificate ${M_cert_utils_maybe.asReadableCert(
            l
          )}. Only found those installed on the system:${M_os.EOL}${i
            .map((e) => "- " + M_cert_utils_maybe.asReadableCert(e))
            .join(M_os.EOL)}`,
        },
        null,
      ];
};
