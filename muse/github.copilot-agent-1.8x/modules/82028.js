var n = require("os");
var i = require("fs");
var o = require("path");
var s = require(85512);
var a = require(12010);
var c = (function () {
  function e(e) {
    this.keys = new s.ContextTagKeys();
    this.tags = {};
    this._loadApplicationContext();
    this._loadDeviceContext();
    this._loadInternalContext();
  }
  e.prototype._loadApplicationContext = function (t) {
    t = t || o.resolve(__dirname, "../../../../package.json");
    if (!e.appVersion[t]) {
      e.appVersion[t] = "unknown";
      try {
        var r = JSON.parse(i.readFileSync(t, "utf8"));
        r && "string" == typeof r.version && (e.appVersion[t] = r.version);
      } catch (e) {
        a.info("unable to read app version: ", e);
      }
    }
    this.tags[this.keys.applicationVersion] = e.appVersion[t];
  };
  e.prototype._loadDeviceContext = function () {
    this.tags[this.keys.deviceId] = "";
    this.tags[this.keys.cloudRoleInstance] = n && n.hostname();
    this.tags[this.keys.deviceOSVersion] = n && n.type() + " " + n.release();
    this.tags[this.keys.cloudRole] = e.DefaultRoleName;
    this.tags["ai.device.osArchitecture"] = n && n.arch();
    this.tags["ai.device.osPlatform"] = n && n.platform();
  };
  e.prototype._loadInternalContext = function () {
    var t = o.resolve(__dirname, "../../package.json");
    if (!e.sdkVersion) {
      e.sdkVersion = "unknown";
      try {
        var r = JSON.parse(i.readFileSync(t, "utf8"));
        if (r && "string" == typeof r.version) {
          e.sdkVersion = r.version;
        }
      } catch (e) {
        a.info("unable to read app version: ", e);
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