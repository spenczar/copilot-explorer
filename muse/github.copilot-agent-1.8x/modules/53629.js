var n = require("https");
var i = require(29816);
var o = require(12010);
var s = (function () {
  function e(e) {
    this._config = e;
    this._consecutiveErrors = 0;
  }
  e.prototype.ping = function (e, t) {
    this._submitData(e, t, "ping");
  };
  e.prototype.post = function (e, t) {
    this._submitData([e], t, "post");
  };
  e.prototype._submitData = function (t, r, s) {
    var a;
    var c;
    var l = this;
    var u = JSON.stringify(t);
    var d =
      (((a = {})[i.disableCollectionRequestOption] = true),
      (a.host = this._config.quickPulseHost),
      (a.method = "POST"),
      (a.path =
        "/QuickPulseService.svc/" +
        s +
        "?ikey=" +
        this._config.instrumentationKey),
      (a.headers =
        (((c = {
          Expect: "100-continue",
        })["x-ms-qps-transmission-time"] = 1e4 * Date.now()),
        (c["Content-Type"] = "application/json"),
        (c["Content-Length"] = Buffer.byteLength(u)),
        c)),
      a);
    var p = n.request(d, function (e) {
      var t = "true" === e.headers["x-ms-qps-subscribed"];
      l._consecutiveErrors = 0;
      r(t, e);
    });
    p.on("error", function (t) {
      l._consecutiveErrors++;
      var n =
        "Transient error connecting to the Live Metrics endpoint. This packet will not appear in your Live Metrics Stream. Error:";
      if (l._consecutiveErrors % e.MAX_QPS_FAILURES_BEFORE_WARN == 0) {
        n =
          "Live Metrics endpoint could not be reached " +
          l._consecutiveErrors +
          " consecutive times. Most recent error:";
        o.warn(e.TAG, n, t);
      } else {
        o.info(e.TAG, n, t);
      }
      r();
    });
    p.write(u);
    p.end();
  };
  e.TAG = "QuickPulseSender";
  e.MAX_QPS_FAILURES_BEFORE_WARN = 25;
  return e;
})();
module.exports = s;