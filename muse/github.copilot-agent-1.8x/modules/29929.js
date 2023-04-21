Object.defineProperty(exports, "__esModule", {
  value: true,
});
process.env.APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL = true;
var n = require("fs");
var i = require("os");
var o = require("path");
var s = require(58212);
var a = require(58144);
var c = (function () {
  function e(e, t, r, i) {
    var a = this;
    this.extensionId = e;
    this.extensionVersion = t;
    this.firstParty = false;
    this.userOptIn = false;
    this.firstParty = !!i;
    var c = process.env.VSCODE_LOGS || "";
    if (c && e && "trace" === process.env.VSCODE_LOG_LEVEL) {
      c = o.join(c, e + ".txt");
      this.logStream = n.createWriteStream(c, {
        flags: "a",
        encoding: "utf8",
        autoClose: true,
      });
    }
    this.updateUserOptIn(r);
    if (undefined !== s.env.onDidChangeTelemetryEnabled) {
      this.optOutListener = s.env.onDidChangeTelemetryEnabled(function () {
        return a.updateUserOptIn(r);
      });
    } else {
      this.optOutListener = s.workspace.onDidChangeConfiguration(function () {
        return a.updateUserOptIn(r);
      });
    }
  }
  e.prototype.updateUserOptIn = function (t) {
    var r = s.workspace.getConfiguration(e.TELEMETRY_CONFIG_ID);
    var n =
      undefined === s.env.isTelemetryEnabled
        ? r.get(e.TELEMETRY_CONFIG_ENABLED_ID, true)
        : s.env.isTelemetryEnabled;
    if (this.userOptIn !== n) {
      this.userOptIn = n;
      if (this.userOptIn) {
        this.createAppInsightsClient(t);
      } else {
        this.dispose();
      }
    }
  };
  e.prototype.createAppInsightsClient = function (e) {
    if (a.defaultClient) {
      this.appInsightsClient = new a.TelemetryClient(e);
      this.appInsightsClient.channel.setUseDiskRetryCaching(true);
    } else {
      a.setup(e)
        .setAutoCollectRequests(false)
        .setAutoCollectPerformance(false)
        .setAutoCollectExceptions(false)
        .setAutoCollectDependencies(false)
        .setAutoDependencyCorrelation(false)
        .setAutoCollectConsole(false)
        .setUseDiskRetryCaching(true)
        .start();
      this.appInsightsClient = a.defaultClient;
    }
    this.appInsightsClient.commonProperties = this.getCommonProperties();
    if (s && s.env) {
      this.appInsightsClient.context.tags[
        this.appInsightsClient.context.keys.userId
      ] = s.env.machineId;
      this.appInsightsClient.context.tags[
        this.appInsightsClient.context.keys.sessionId
      ] = s.env.sessionId;
    }
    if (e && 0 === e.indexOf("AIF-")) {
      this.appInsightsClient.config.endpointUrl =
        "https://vortex.data.microsoft.com/collect/v1";
      this.firstParty = true;
    }
  };
  e.prototype.getCommonProperties = function () {
    var e = Object.create(null);
    e["common.os"] = i.platform();
    e["common.platformversion"] = (i.release() || "").replace(
      /^(\d+)(\.\d+)?(\.\d+)?(.*)/,
      "$1$2$3"
    );
    e["common.extname"] = this.extensionId;
    e["common.extversion"] = this.extensionVersion;
    if (s && s.env) {
      switch (
        ((e["common.vscodemachineid"] = s.env.machineId),
        (e["common.vscodesessionid"] = s.env.sessionId),
        (e["common.vscodeversion"] = s.version),
        (e["common.isnewappinstall"] = s.env.isNewAppInstall),
        s.env.uiKind)
      ) {
        case s.UIKind.Web:
          e["common.uikind"] = "web";
          break;
        case s.UIKind.Desktop:
          e["common.uikind"] = "desktop";
          break;
        default:
          e["common.uikind"] = "unknown";
      }
      e["common.remotename"] = this.cleanRemoteName(s.env.remoteName);
    }
    return e;
  };
  e.prototype.cleanRemoteName = function (e) {
    if (!e) return "none";
    var t = "other";
    ["ssh-remote", "dev-container", "attached-container", "wsl"].forEach(
      function (r) {
        if (0 === e.indexOf(r + "+")) {
          t = r;
        }
      }
    );
    return t;
  };
  e.prototype.shouldSendErrorTelemetry = function () {
    return (
      !this.firstParty ||
      "other" !== this.cleanRemoteName(s.env.remoteName) ||
      (undefined !== this.extension &&
        this.extension.extensionKind !== s.ExtensionKind.Workspace &&
        s.env.uiKind !== s.UIKind.Web)
    );
  };
  Object.defineProperty(e.prototype, "extension", {
    get: function () {
      if (undefined === this._extension) {
        this._extension = s.extensions.getExtension(this.extensionId);
      }
      return this._extension;
    },
    enumerable: false,
    configurable: true,
  });
  e.prototype.cloneAndChange = function (e, t) {
    if (null === e || "object" != typeof e) return e;
    if ("function" != typeof t) return e;
    var r = {};
    for (var n in e) r[n] = t(n, e[n]);
    return r;
  };
  e.prototype.anonymizeFilePaths = function (e, t) {
    if (null == e) return "";
    var r = [
      new RegExp(s.env.appRoot.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
    ];
    if (this.extension) {
      r.push(
        new RegExp(
          this.extension.extensionPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          "gi"
        )
      );
    }
    var n = e;
    if (t) {
      for (i = [], o = 0, a = r, undefined; o < a.length; o++) {
        var i;
        var o;
        var a;
        for (var c = a[o]; ; ) {
          var l = c.exec(e);
          if (!l) break;
          i.push([l.index, c.lastIndex]);
        }
      }
      var u = /^[\\\/]?(node_modules|node_modules\.asar)[\\\/]/;
      var d =
        /(file:\/\/)?([a-zA-Z]:(\\\\|\\|\/)|(\\\\|\\|\/))?([\w-\._]+(\\\\|\\|\/))+[\w-\._]*/g;
      var p = 0;
      n = "";
      for (
        var h = function () {
          var t = d.exec(e);
          if (!t) return "break";
          if (
            !u.test(t[0]) &&
            i.every(function (e) {
              var r = e[0];
              var n = e[1];
              return t.index < r || t.index >= n;
            })
          ) {
            n += e.substring(p, t.index) + "<REDACTED: user-file-path>";
            p = d.lastIndex;
          }
        };
        "break" !== h();

      );
      if (p < e.length) {
        n += e.substr(p);
      }
    }
    for (f = 0, g = r, undefined; f < g.length; f++) {
      var f;
      var g;
      c = g[f];
      n = n.replace(c, "");
    }
    return n;
  };
  e.prototype.sendTelemetryEvent = function (e, t, r) {
    var n = this;
    if (this.userOptIn && e && this.appInsightsClient) {
      var i = this.cloneAndChange(t, function (e, t) {
        return n.anonymizeFilePaths(t, n.firstParty);
      });
      this.appInsightsClient.trackEvent({
        name: this.extensionId + "/" + e,
        properties: i,
        measurements: r,
      });
      if (this.logStream) {
        this.logStream.write(
          "telemetry/" +
            e +
            " " +
            JSON.stringify({
              properties: t,
              measurements: r,
            }) +
            "\n"
        );
      }
    }
  };
  e.prototype.sendTelemetryErrorEvent = function (e, t, r, n) {
    var i = this;
    if (this.userOptIn && e && this.appInsightsClient) {
      var o = this.cloneAndChange(t, function (e, t) {
        return i.shouldSendErrorTelemetry()
          ? i.anonymizeFilePaths(t, i.firstParty)
          : undefined === n || -1 !== n.indexOf(e)
          ? "REDACTED"
          : i.anonymizeFilePaths(t, i.firstParty);
      });
      this.appInsightsClient.trackEvent({
        name: this.extensionId + "/" + e,
        properties: o,
        measurements: r,
      });
      if (this.logStream) {
        this.logStream.write(
          "telemetry/" +
            e +
            " " +
            JSON.stringify({
              properties: t,
              measurements: r,
            }) +
            "\n"
        );
      }
    }
  };
  e.prototype.sendTelemetryException = function (e, t, r) {
    var n = this;
    if (
      this.shouldSendErrorTelemetry() &&
      this.userOptIn &&
      e &&
      this.appInsightsClient
    ) {
      var i = this.cloneAndChange(t, function (e, t) {
        return n.anonymizeFilePaths(t, n.firstParty);
      });
      this.appInsightsClient.trackException({
        exception: e,
        properties: i,
        measurements: r,
      });
      if (this.logStream) {
        this.logStream.write(
          "telemetry/" +
            e.name +
            " " +
            e.message +
            " " +
            JSON.stringify({
              properties: t,
              measurements: r,
            }) +
            "\n"
        );
      }
    }
  };
  e.prototype.dispose = function () {
    var e = this;
    this.optOutListener.dispose();
    var t = new Promise(function (t) {
      if (!e.logStream) return t(undefined);
      e.logStream.on("finish", t);
      e.logStream.end();
    });
    var r = new Promise(function (t) {
      if (e.appInsightsClient) {
        e.appInsightsClient.flush({
          callback: function () {
            e.appInsightsClient = undefined;
            t(undefined);
          },
        });
      } else {
        t(undefined);
      }
    });
    return Promise.all([r, t]);
  };
  e.TELEMETRY_CONFIG_ID = "telemetry";
  e.TELEMETRY_CONFIG_ENABLED_ID = "enableTelemetry";
  return e;
})();
exports.default = c;