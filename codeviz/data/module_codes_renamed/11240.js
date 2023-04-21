const M_https = require("https");
const M_Certificate_Parser_Utils_maybe = require("Certificate-Parser-Utils");
if ("darwin" !== process.platform) {
  module.exports.all = () => [];
  module.exports.each = () => {};
} else {
  const M_child_process = require("child_process");
  const o = /(?=-----BEGIN\sCERTIFICATE-----)/g;
  const s = "/System/Library/Keychains/SystemRootCertificates.keychain";
  const a = ["find-certificate", "-a", "-p"];
  const c = M_child_process.spawnSync("/usr/bin/security", a)
    .stdout.toString()
    .split(o);
  const l = M_child_process.spawnSync("/usr/bin/security", a.concat(s))
    .stdout.toString()
    .split(o);
  M_https.globalAgent.options.ca = M_https.globalAgent.options.ca || [];
  const u = M_https.globalAgent.options.ca;
  const d = c.concat(l);
  d.filter(function (e, t, r) {
    return r.indexOf(e) === t;
  }).forEach((e) => u.push(e));
  module.exports.der2 = M_Certificate_Parser_Utils_maybe.validFormats;
  module.exports.all = function (e) {
    return d
      .map(M_Certificate_Parser_Utils_maybe.transform(e))
      .filter((e) => e);
  };
  module.exports.each = function (e, t) {
    if ("function" == typeof e) {
      t = e;
      e = undefined;
    }
    return d
      .map(M_Certificate_Parser_Utils_maybe.transform(e))
      .filter((e) => e)
      .forEach(t);
  };
}
