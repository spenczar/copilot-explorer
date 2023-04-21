var n = require(77649);
var i = require(26590);
var o = (function () {
  function e(t, r) {
    this.traceFlag = e.DEFAULT_TRACE_FLAG;
    this.version = e.DEFAULT_VERSION;
    if (t && "string" == typeof t) {
      if (t.split(",").length > 1)
        (this.traceId = n.w3cTraceId()),
          (this.spanId = n.w3cTraceId().substr(0, 16));
      else {
        var o = t.trim().split("-"),
          s = o.length;
        s >= 4
          ? ((this.version = o[0]),
            (this.traceId = o[1]),
            (this.spanId = o[2]),
            (this.traceFlag = o[3]))
          : ((this.traceId = n.w3cTraceId()),
            (this.spanId = n.w3cTraceId().substr(0, 16))),
          this.version.match(/^[0-9a-f]{2}$/g) ||
            ((this.version = e.DEFAULT_VERSION),
            (this.traceId = n.w3cTraceId())),
          "00" === this.version &&
            4 !== s &&
            ((this.traceId = n.w3cTraceId()),
            (this.spanId = n.w3cTraceId().substr(0, 16))),
          "ff" === this.version &&
            ((this.version = e.DEFAULT_VERSION),
            (this.traceId = n.w3cTraceId()),
            (this.spanId = n.w3cTraceId().substr(0, 16))),
          this.version.match(/^0[0-9a-f]$/g) ||
            (this.version = e.DEFAULT_VERSION),
          this.traceFlag.match(/^[0-9a-f]{2}$/g) ||
            ((this.traceFlag = e.DEFAULT_TRACE_FLAG),
            (this.traceId = n.w3cTraceId())),
          e.isValidTraceId(this.traceId) || (this.traceId = n.w3cTraceId()),
          e.isValidSpanId(this.spanId) ||
            ((this.spanId = n.w3cTraceId().substr(0, 16)),
            (this.traceId = n.w3cTraceId())),
          (this.parentId = this.getBackCompatRequestId());
      }
    } else if (r) {
      this.parentId = r.slice();
      var a = i.getRootId(r);
      e.isValidTraceId(a) || ((this.legacyRootId = a), (a = n.w3cTraceId())),
        -1 !== r.indexOf("|") &&
          (r = r.substring(
            1 + r.substring(0, r.length - 1).lastIndexOf("."),
            r.length - 1
          )),
        (this.traceId = a),
        (this.spanId = r);
    } else
      (this.traceId = n.w3cTraceId()),
        (this.spanId = n.w3cTraceId().substr(0, 16));
  }
  e.isValidTraceId = function (e) {
    return (
      e.match(/^[0-9a-f]{32}$/) && "00000000000000000000000000000000" !== e
    );
  };
  e.isValidSpanId = function (e) {
    return e.match(/^[0-9a-f]{16}$/) && "0000000000000000" !== e;
  };
  e.prototype.getBackCompatRequestId = function () {
    return "|" + this.traceId + "." + this.spanId + ".";
  };
  e.prototype.toString = function () {
    return (
      this.version +
      "-" +
      this.traceId +
      "-" +
      this.spanId +
      "-" +
      this.traceFlag
    );
  };
  e.prototype.updateSpanId = function () {
    this.spanId = n.w3cTraceId().substr(0, 16);
  };
  e.DEFAULT_TRACE_FLAG = "01";
  e.DEFAULT_VERSION = "00";
  return e;
})();
module.exports = o;