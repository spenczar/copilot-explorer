var M_LoggingUtils_maybe = require("LoggingUtils");
var i = (function () {
  function e(e, t, r, n) {
    this._buffer = [];
    this._lastSend = 0;
    this._isDisabled = e;
    this._getBatchSize = t;
    this._getBatchIntervalMs = r;
    this._sender = n;
  }
  e.prototype.setUseDiskRetryCaching = function (e, t, r) {
    this._sender.setDiskRetryMode(e, t, r);
  };
  e.prototype.send = function (e) {
    var t = this;
    if (!this._isDisabled())
      if (e) {
        var r = this._stringify(e);
        if ("string" == typeof r) {
          this._buffer.push(r);
          if (this._buffer.length >= this._getBatchSize()) {
            this.triggerSend(false);
          } else {
            if (!this._timeoutHandle && this._buffer.length > 0) {
              this._timeoutHandle = setTimeout(function () {
                t._timeoutHandle = null;
                t.triggerSend(false);
              }, this._getBatchIntervalMs());
            }
          }
        }
      } else M_LoggingUtils_maybe.warn("Cannot send null/undefined telemetry");
  };
  e.prototype.triggerSend = function (e, t) {
    var r = this._buffer.length < 1;
    if (!r) {
      var n = this._buffer.join("\n");
      if (e) {
        this._sender.saveOnCrash(n);
        if ("function" == typeof t) {
          t("data saved on crash");
        }
      } else {
        this._sender.send(Buffer.from ? Buffer.from(n) : new Buffer(n), t);
      }
    }
    this._lastSend = +new Date();
    this._buffer.length = 0;
    clearTimeout(this._timeoutHandle);
    this._timeoutHandle = null;
    if (r && "function" == typeof t) {
      t("no data to send");
    }
  };
  e.prototype._stringify = function (e) {
    try {
      return JSON.stringify(e);
    } catch (t) {
      M_LoggingUtils_maybe.warn("Failed to serialize payload", t, e);
    }
  };
  return e;
})();
module.exports = i;
