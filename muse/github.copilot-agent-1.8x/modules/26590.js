var n = require(77649);
var i = require(12010);
var o = (function () {
  function e() {}
  e.queryCorrelationId = function (t, r) {
    var o =
      t.profileQueryEndpoint +
      "/api/profiles/" +
      t.instrumentationKey +
      "/appId";
    if (e.completedLookups.hasOwnProperty(o)) r(e.completedLookups[o]);
    else if (e.pendingLookups[o]) e.pendingLookups[o].push(r);
    else {
      e.pendingLookups[o] = [r];
      var s = function () {
        if (e.pendingLookups[o]) {
          var r = {
            method: "GET",
            disableAppInsightsAutoCollection: true,
          };
          i.info(e.TAG, r);
          var a = n.makeRequest(t, o, r, function (r) {
            if (200 === r.statusCode) {
              var n = "";
              r.setEncoding("utf-8");
              r.on("data", function (e) {
                n += e;
              });
              r.on("end", function () {
                i.info(e.TAG, n);
                var t = e.correlationIdPrefix + n;
                e.completedLookups[o] = t;
                if (e.pendingLookups[o]) {
                  e.pendingLookups[o].forEach(function (e) {
                    return e(t);
                  });
                }
                delete e.pendingLookups[o];
              });
            } else if (r.statusCode >= 400 && r.statusCode < 500) {
              e.completedLookups[o] = undefined;
              delete e.pendingLookups[o];
            } else {
              setTimeout(s, t.correlationIdRetryIntervalMs);
            }
          });
          if (a) {
            a.on("error", function (t) {
              i.warn(e.TAG, t);
            });
            a.end();
          }
        }
      };
      setTimeout(s, 0);
    }
  };
  e.cancelCorrelationIdQuery = function (t, r) {
    var n =
      t.profileQueryEndpoint +
      "/api/profiles/" +
      t.instrumentationKey +
      "/appId";
    var i = e.pendingLookups[n];
    if (i) {
      e.pendingLookups[n] = i.filter(function (e) {
        return e != r;
      });
      if (0 == e.pendingLookups[n].length) {
        delete e.pendingLookups[n];
      }
    }
  };
  e.generateRequestId = function (t) {
    if (t) {
      if ("." !== (t = "|" == t[0] ? t : "|" + t)[t.length - 1]) {
        t += ".";
      }
      var r = (e.currentRootId++).toString(16);
      return e.appendSuffix(t, r, "_");
    }
    return e.generateRootId();
  };
  e.getRootId = function (e) {
    var t = e.indexOf(".");
    if (t < 0) {
      t = e.length;
    }
    var r = "|" === e[0] ? 1 : 0;
    return e.substring(r, t);
  };
  e.generateRootId = function () {
    return "|" + n.w3cTraceId() + ".";
  };
  e.appendSuffix = function (t, r, i) {
    if (t.length + r.length < e.requestIdMaxLength) return t + r + i;
    var o = e.requestIdMaxLength - 9;
    if (t.length > o)
      for (; o > 1; --o) {
        var s = t[o - 1];
        if ("." === s || "_" === s) break;
      }
    if (o <= 1) return e.generateRootId();
    for (r = n.randomu32().toString(16); r.length < 8; ) r = "0" + r;
    return t.substring(0, o) + r + "#";
  };
  e.TAG = "CorrelationIdManager";
  e.correlationIdPrefix = "cid-v1:";
  e.w3cEnabled = false;
  e.pendingLookups = {};
  e.completedLookups = {};
  e.requestIdMaxLength = 1024;
  e.currentRootId = n.randomu32();
  return e;
})();
module.exports = o;