Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.ConfigurationFeature = undefined;
const n = require(40273);
const i = require(40289);
exports.ConfigurationFeature = (e) =>
  class extends e {
    getConfiguration(e) {
      return e
        ? i.string(e)
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
        .sendRequest(n.ConfigurationRequest.type, t)
        .then((t) => (Array.isArray(e) ? t : t[0]));
    }
  };