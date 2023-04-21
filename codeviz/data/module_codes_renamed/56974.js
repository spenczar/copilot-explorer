const M_os = require("os");
const M_command_line_option_parser_maybe = require("command-line-option-parser");
const o = process.env;
let s;
function a(e) {
  const t = (function (e) {
    if (false === s) return 0;
    if (
      M_command_line_option_parser_maybe("color=16m") ||
      M_command_line_option_parser_maybe("color=full") ||
      M_command_line_option_parser_maybe("color=truecolor")
    )
      return 3;
    if (M_command_line_option_parser_maybe("color=256")) return 2;
    if (e && !e.isTTY && true !== s) return 0;
    const t = s ? 1 : 0;
    if ("win32" === process.platform) {
      const e = M_os.release().split(".");
      return Number(process.versions.node.split(".")[0]) >= 8 &&
        Number(e[0]) >= 10 &&
        Number(e[2]) >= 10586
        ? Number(e[2]) >= 14931
          ? 3
          : 2
        : 1;
    }
    if ("CI" in o)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(
        (e) => e in o
      ) || "codeship" === o.CI_NAME
        ? 1
        : t;
    if ("TEAMCITY_VERSION" in o)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(o.TEAMCITY_VERSION) ? 1 : 0;
    if ("truecolor" === o.COLORTERM) return 3;
    if ("TERM_PROGRAM" in o) {
      const e = parseInt((o.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (o.TERM_PROGRAM) {
        case "iTerm.app":
          return e >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(o.TERM)
      ? 2
      : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
          o.TERM
        ) || "COLORTERM" in o
      ? 1
      : (o.TERM, t);
  })(e);
  return (function (e) {
    return (
      0 !== e && {
        level: e,
        hasBasic: true,
        has256: e >= 2,
        has16m: e >= 3,
      }
    );
  })(t);
}
if (
  M_command_line_option_parser_maybe("no-color") ||
  M_command_line_option_parser_maybe("no-colors") ||
  M_command_line_option_parser_maybe("color=false")
) {
  s = false;
} else {
  if (
    M_command_line_option_parser_maybe("color") ||
    M_command_line_option_parser_maybe("colors") ||
    M_command_line_option_parser_maybe("color=true") ||
    M_command_line_option_parser_maybe("color=always")
  ) {
    s = true;
  }
}
if ("FORCE_COLOR" in o) {
  s = 0 === o.FORCE_COLOR.length || 0 !== parseInt(o.FORCE_COLOR, 10);
}
module.exports = {
  supportsColor: a,
  stdout: a(process.stdout),
  stderr: a(process.stderr),
};
