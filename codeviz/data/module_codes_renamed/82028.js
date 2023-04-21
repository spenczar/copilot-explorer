var M_os = require("os");
var M_fs = require("fs");
var M_path = require("path");
var M_ObjectPropertyManager_maybe = require("ObjectPropertyManager");
var M_LoggingUtils_maybe = require("LoggingUtils");
var c = (function () {
  function e(e) {
    this.keys = new M_ObjectPropertyManager_maybe.ContextTagKeys();
    this.tags = {};
    this._loadApplicationContext();
    this._loadDeviceContext();
    this._loadInternalContext();
  }
  e.prototype._loadApplicationContext = function (t) {
    t = t || M_path.resolve(__dirname, "../../../../package.json");
    if (!e.appVersion[t]) {
      e.appVersion[t] = "unknown";
      try {
        var r = JSON.parse(M_fs.readFileSync(t, "utf8"));
        r && "string" == typeof r.version && (e.appVersion[t] = r.version);
      } catch (e) {
        M_LoggingUtils_maybe.info("unable to read app version: ", e);
      }
    }
    this.tags[this.keys.applicationVersion] = e.appVersion[t];
  };
  e.prototype._loadDeviceContext = function () {
    this.tags[this.keys.deviceId] = "";
    this.tags[this.keys.cloudRoleInstance] = M_os && M_os.hostname();
    this.tags[this.keys.deviceOSVersion] =
      M_os && M_os.type() + " " + M_os.release();
    this.tags[this.keys.cloudRole] = e.DefaultRoleName;
    this.tags["ai.device.osArchitecture"] = M_os && M_os.arch();
    this.tags["ai.device.osPlatform"] = M_os && M_os.platform();
  };
  e.prototype._loadInternalContext = function () {
    var t = M_path.resolve(__dirname, "../../package.json");
    if (!e.sdkVersion) {
      e.sdkVersion = "unknown";
      try {
        var r = JSON.parse(M_fs.readFileSync(t, "utf8"));
        if (r && "string" == typeof r.version) {
          e.sdkVersion = r.version;
        }
      } catch (e) {
        M_LoggingUtils_maybe.info("unable to read app version: ", e);
      }
    }
    this.tags[this.keys.internalSdkVersion] = "node:" + e.sdkVersion;
  };
  e.DefaultRoleName = "Web";
  e.appVersion = {};
  e.sdkVersion = null;
  return e;
})();
module.exports = c;
