var t = 1e3;
var r = 60 * t;
var n = 60 * r;
var i = 24 * n;
function o(e, t, r, n) {
  var i = t >= 1.5 * r;
  return Math.round(e / r) + " " + n + (i ? "s" : "");
}
module.exports = function (e, s) {
  s = s || {};
  var a;
  var c;
  var l = typeof e;
  if ("string" === l && e.length > 0)
    return (function (e) {
      if (!((e = String(e)).length > 100)) {
        var o =
          /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
            e
          );
        if (o) {
          var s = parseFloat(o[1]);
          switch ((o[2] || "ms").toLowerCase()) {
            case "years":
            case "year":
            case "yrs":
            case "yr":
            case "y":
              return 315576e5 * s;
            case "weeks":
            case "week":
            case "w":
              return 6048e5 * s;
            case "days":
            case "day":
            case "d":
              return s * i;
            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
              return s * n;
            case "minutes":
            case "minute":
            case "mins":
            case "min":
            case "m":
              return s * r;
            case "seconds":
            case "second":
            case "secs":
            case "sec":
            case "s":
              return s * t;
            case "milliseconds":
            case "millisecond":
            case "msecs":
            case "msec":
            case "ms":
              return s;
            default:
              return;
          }
        }
      }
    })(e);
  if ("number" === l && isFinite(e))
    return s.long
      ? ((a = e),
        (c = Math.abs(a)) >= i
          ? o(a, c, i, "day")
          : c >= n
          ? o(a, c, n, "hour")
          : c >= r
          ? o(a, c, r, "minute")
          : c >= t
          ? o(a, c, t, "second")
          : a + " ms")
      : (function (e) {
          var o = Math.abs(e);
          return o >= i
            ? Math.round(e / i) + "d"
            : o >= n
            ? Math.round(e / n) + "h"
            : o >= r
            ? Math.round(e / r) + "m"
            : o >= t
            ? Math.round(e / t) + "s"
            : e + "ms";
        })(e);
  throw new Error(
    "val is not a non-empty string or a valid number. val=" + JSON.stringify(e)
  );
};