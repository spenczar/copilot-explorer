const n = require("https");
const i = require(60325);
if ("darwin" !== process.platform) {
  module.exports.all = () => [];
  module.exports.each = () => {};
} else {
  const t = require("child_process");
  const o = /(?=-----BEGIN\sCERTIFICATE-----)/g;
  const s = "/System/Library/Keychains/SystemRootCertificates.keychain";
  const a = ["find-certificate", "-a", "-p"];
  const c = t.spawnSync("/usr/bin/security", a).stdout.toString().split(o);
  const l = t
    .spawnSync("/usr/bin/security", a.concat(s))
    .stdout.toString()
    .split(o);
  n.globalAgent.options.ca = n.globalAgent.options.ca || [];
  const u = n.globalAgent.options.ca;
  const d = c.concat(l);
  d.filter(function (e, t, r) {
    return r.indexOf(e) === t;
  }).forEach((e) => u.push(e));
  module.exports.der2 = i.validFormats;
  module.exports.all = function (e) {
    return d.map(i.transform(e)).filter((e) => e);
  };
  module.exports.each = function (e, t) {
    if ("function" == typeof e) {
      t = e;
      e = undefined;
    }
    return d
      .map(i.transform(e))
      .filter((e) => e)
      .forEach(t);
  };
}