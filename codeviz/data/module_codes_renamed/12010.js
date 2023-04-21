var t = (function () {
  function e() {}
  e.info = function (t) {
    for (r = [], n = 1, undefined; n < arguments.length; n++) {
      var r;
      var n;
      r[n - 1] = arguments[n];
    }
    if (e.enableDebug) {
      console.info(e.TAG + t, r);
    }
  };
  e.warn = function (t) {
    for (r = [], n = 1, undefined; n < arguments.length; n++) {
      var r;
      var n;
      r[n - 1] = arguments[n];
    }
    if (e.disableWarnings) {
      console.warn(e.TAG + t, r);
    }
  };
  e.enableDebug = false;
  e.disableWarnings = false;
  e.disableErrors = false;
  e.TAG = "ApplicationInsights:";
  return e;
})();
module.exports = t;
