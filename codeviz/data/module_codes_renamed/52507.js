Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.ConfigurationFeature = undefined;
const M_MessageConnectionManager_maybe = require("MessageConnectionManager");
const M_TypeChecker_maybe = require("TypeChecker");
exports.ConfigurationFeature = (e) =>
  class extends e {
    getConfiguration(e) {
      return e
        ? M_TypeChecker_maybe.string(e)
          ? this._getConfiguration({
              section: e,
            })
          : this._getConfiguration(e)
        : this._getConfiguration({});
    }
    _getConfiguration(e) {
      let t = {
        items: Array.isArray(e) ? e : [e],
      };
      return this.connection
        .sendRequest(
          M_MessageConnectionManager_maybe.ConfigurationRequest.type,
          t
        )
        .then((t) => (Array.isArray(e) ? t : t[0]));
    }
  };
