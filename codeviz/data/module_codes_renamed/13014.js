var t = (function () {
  function e(t) {
    if (e.INSTANCE)
      throw new Error(
        "Exception tracking should be configured from the applicationInsights object"
      );
    e.INSTANCE = this;
    this._client = t;
    var r = process.versions.node.split(".");
    e._canUseUncaughtExceptionMonitor =
      parseInt(r[0]) > 13 || (13 === parseInt(r[0]) && parseInt(r[1]) >= 7);
  }
  e.prototype.isInitialized = function () {
    return this._isInitialized;
  };
  e.prototype.enable = function (t) {
    var r = this;
    if (t) {
      this._isInitialized = true;
      if (!this._exceptionListenerHandle) {
        var n = function (t, n, i) {
          void 0 === i && (i = new Error(e._FALLBACK_ERROR_MESSAGE)),
            r._client.trackException({
              exception: i,
            }),
            r._client.flush({
              isAppCrashing: !0,
            }),
            t &&
              n &&
              1 === process.listeners(n).length &&
              (console.error(i), process.exit(1));
        };
        e._canUseUncaughtExceptionMonitor
          ? ((this._exceptionListenerHandle = n.bind(this, !1)),
            process.on(
              e.UNCAUGHT_EXCEPTION_MONITOR_HANDLER_NAME,
              this._exceptionListenerHandle
            ))
          : ((this._exceptionListenerHandle = n.bind(
              this,
              !0,
              e.UNCAUGHT_EXCEPTION_HANDLER_NAME
            )),
            (this._rejectionListenerHandle = n.bind(this, !1)),
            process.on(
              e.UNCAUGHT_EXCEPTION_HANDLER_NAME,
              this._exceptionListenerHandle
            ),
            process.on(
              e.UNHANDLED_REJECTION_HANDLER_NAME,
              this._rejectionListenerHandle
            ));
      }
    } else if (this._exceptionListenerHandle) {
      if (e._canUseUncaughtExceptionMonitor) {
        process.removeListener(
          e.UNCAUGHT_EXCEPTION_MONITOR_HANDLER_NAME,
          this._exceptionListenerHandle
        );
      } else {
        process.removeListener(
          e.UNCAUGHT_EXCEPTION_HANDLER_NAME,
          this._exceptionListenerHandle
        );
        process.removeListener(
          e.UNHANDLED_REJECTION_HANDLER_NAME,
          this._rejectionListenerHandle
        );
      }
      this._exceptionListenerHandle = undefined;
      this._rejectionListenerHandle = undefined;
      delete this._exceptionListenerHandle;
      delete this._rejectionListenerHandle;
    }
  };
  e.prototype.dispose = function () {
    e.INSTANCE = null;
    this.enable(false);
    this._isInitialized = false;
  };
  e.INSTANCE = null;
  e.UNCAUGHT_EXCEPTION_MONITOR_HANDLER_NAME = "uncaughtExceptionMonitor";
  e.UNCAUGHT_EXCEPTION_HANDLER_NAME = "uncaughtException";
  e.UNHANDLED_REJECTION_HANDLER_NAME = "unhandledRejection";
  e._RETHROW_EXIT_MESSAGE = "Application Insights Rethrow Exception Handler";
  e._FALLBACK_ERROR_MESSAGE =
    "A promise was rejected without providing an error. Application Insights generated this error stack for you.";
  e._canUseUncaughtExceptionMonitor = false;
  return e;
})();
module.exports = t;
