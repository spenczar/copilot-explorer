const M_require_manager_maybe = require("require-manager");
const M_mac_ca_parser_maybe = require("mac-ca-parser");
var o = (module.exports.validFormats = {
  der: 0,
  pem: 1,
  txt: 2,
  asn1: 3,
});
function s(e) {
  const t = M_require_manager_maybe.pki.pemToDer(e);
  const r = M_require_manager_maybe.asn1;
  const i = r.fromDer(t.data.toString("binary")).value[0].value;
  const o = i[0];
  const s =
    o.tagClass === r.Class.CONTEXT_SPECIFIC && 0 === o.type && o.constructed;
  const a = i.slice(s);
  return {
    serial: a[0],
    issuer: a[2],
    valid: a[3],
    subject: a[4],
  };
}
module.exports.transform = function (e) {
  return function (t) {
    try {
      switch (e) {
        case o.der:
          return M_require_manager_maybe.pki.pemToDer(t);
        case o.pem:
          return t;
        case o.txt:
          return (function (e) {
            const t = s(e);
            const r = new Date();
            const n = t.subject.value
              .map((e) => e.value[0].value[1].value)
              .join("/");
            const o = t.valid.value.map((e) => e.value).join(" - ");
            const a = r.toTimeString().replace(/\s*\(.*\)\s*/, "");
            return [
              `Subject\t${n}`,
              `Valid\t${o}`,
              `Saved\t${r.toLocaleDateString()} ${a} by ${
                M_mac_ca_parser_maybe.name
              }@${M_mac_ca_parser_maybe.version}`,
              String(e),
            ].join("\n");
          })(t);
        case o.asn1:
          return s(t);
        default:
          return M_require_manager_maybe.pki.certificateFromPem(t);
      }
    } catch (e) {
      return;
    }
  };
};
