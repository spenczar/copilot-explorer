var n = require(1767);
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
    if (n.IsInitialized) {
      require(72469).wp(e && t, this._client);
      require(23805).wp(e, this._client);
      require(27916).wp(e, this._client);
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