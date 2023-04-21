const M_tty = require("tty");
const M_util = require("util");
exports.init = function (e) {
  e.inspectOpts = {};
  const r = Object.keys(exports.inspectOpts);
  for (let n = 0; n < r.length; n++)
    e.inspectOpts[r[n]] = exports.inspectOpts[r[n]];
};
exports.log = function (...e) {
  return process.stderr.write(M_util.format(...e) + "\n");
};
exports.formatArgs = function (r) {
  const { namespace: n, useColors: i } = this;
  if (i) {
    const t = this.color;
    const i = "[3" + (t < 8 ? t : "8;5;" + t);
    const o = `  ${i};1m${n} [0m`;
    r[0] = o + r[0].split("\n").join("\n" + o);
    r.push(i + "m+" + module.exports.humanize(this.diff) + "[0m");
  } else
    r[0] =
      (exports.inspectOpts.hideDate ? "" : new Date().toISOString() + " ") +
      n +
      " " +
      r[0];
};
exports.save = function (e) {
  if (e) {
    process.env.DEBUG = e;
  } else {
    delete process.env.DEBUG;
  }
};
exports.load = function () {
  return process.env.DEBUG;
};
exports.useColors = function () {
  return "colors" in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : M_tty.isatty(process.stderr.fd);
};
exports.destroy = M_util.deprecate(() => {},
"Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
exports.colors = [6, 2, 3, 4, 5, 1];
try {
  const M_TerminalSupportDetector_maybe = require("TerminalSupportDetector");
  if (
    M_TerminalSupportDetector_maybe &&
    (M_TerminalSupportDetector_maybe.stderr || M_TerminalSupportDetector_maybe)
      .level >= 2
  ) {
    exports.colors = [
      20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63,
      68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128,
      129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169,
      170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202,
      203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221,
    ];
  }
} catch (e) {}
exports.inspectOpts = Object.keys(process.env)
  .filter((e) => /^debug_/i.test(e))
  .reduce((e, t) => {
    const r = t
      .substring(6)
      .toLowerCase()
      .replace(/_([a-z])/g, (e, t) => t.toUpperCase());
    let n = process.env[t];
    n =
      !!/^(yes|on|true|enabled)$/i.test(n) ||
      (!/^(no|off|false|disabled)$/i.test(n) &&
        ("null" === n ? null : Number(n)));
    e[r] = n;
    return e;
  }, {});
module.exports = require("Logging-Utils")(exports);
const { formatters: o } = module.exports;
o.o = function (e) {
  this.inspectOpts.colors = this.useColors;
  return M_util.inspect(e, this.inspectOpts)
    .split("\n")
    .map((e) => e.trim())
    .join(" ");
};
o.O = function (e) {
  this.inspectOpts.colors = this.useColors;
  return M_util.inspect(e, this.inspectOpts);
};
