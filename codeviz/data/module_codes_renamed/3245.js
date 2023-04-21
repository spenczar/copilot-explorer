var M_DiagnosticChannelManager_maybe = require("DiagnosticChannelManager");
var i = (function () {
  function e(t) {
    if (e.INSTANCE)
      throw new Error(
        "Console logging adapter tracking should be configured from the applicationInsights object"
      );
    this._client = t;
    e.INSTANCE = this;
  }
  e.prototype.enable = function (e, t) {
    if (M_DiagnosticChannelManager_maybe.IsInitialized) {
      require("LoggingListenerModule").wp(e && t, this._client);
      require("Bunyan-Logging-Handler").wp(e, this._client);
      require("LoggingTranslator").wp(e, this._client);
    }
  };
  e.prototype.isInitialized = function () {
    return this._isInitialized;
  };
  e.prototype.dispose = function () {
    e.INSTANCE = null;
    this.enable(false, false);
  };
  e._methodNames = ["debug", "info", "log", "warn", "error"];
  return e;
})();
module.exports = i;
