var n = require(85315);
var i = (function () {
  function e() {}
  e.parse = function (t) {
    if (!t) return {};
    var r = t.split(e._FIELDS_SEPARATOR).reduce(function (t, r) {
      var n = r.split(e._FIELD_KEY_VALUE_SEPARATOR);
      if (2 === n.length) {
        var i = n[0].toLowerCase();
        var o = n[1];
        t[i] = o;
      }
      return t;
    }, {});
    if (Object.keys(r).length > 0) {
      if (r.endpointsuffix) {
        var i = r.location ? r.location + "." : "";
        r.ingestionendpoint =
          r.ingestionendpoint || "https://" + i + "dc." + r.endpointsuffix;
        r.liveendpoint =
          r.liveendpoint || "https://" + i + "live." + r.endpointsuffix;
      }
      r.ingestionendpoint = r.ingestionendpoint || n.DEFAULT_BREEZE_ENDPOINT;
      r.liveendpoint = r.liveendpoint || n.DEFAULT_LIVEMETRICS_ENDPOINT;
    }
    return r;
  };
  e._FIELDS_SEPARATOR = ";";
  e._FIELD_KEY_VALUE_SEPARATOR = "=";
  return e;
})();
module.exports = i;