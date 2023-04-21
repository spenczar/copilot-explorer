Object.defineProperty(exports, "__esModule", {
  value: true,
});
process.env.APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL = true;
var M_fs = require("fs");
var M_os = require("os");
var M_path = require("path");
var M_workspace_environment_constants_maybe = require("workspace-environment-constants");
var M_TelemetryManager_maybe = require("TelemetryManager");
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
      c = M_path.join(c, e + ".txt");
      this.logStream = M_fs.createWriteStream(c, {
        flags: "a",
        encoding: "utf8",
        autoClose: true,
      });
    }
    this.updateUserOptIn(r);
    if (
      undefined !==
      M_workspace_environment_constants_maybe.env.onDidChangeTelemetryEnabled
    ) {
      this.optOutListener =
        M_workspace_environment_constants_maybe.env.onDidChangeTelemetryEnabled(
          function () {
            return a.updateUserOptIn(r);
          }
        );
    } else {
      this.optOutListener =
        M_workspace_environment_constants_maybe.workspace.onDidChangeConfiguration(
          function () {
            return a.updateUserOptIn(r);
          }
        );
    }
  }
  e.prototype.updateUserOptIn = function (t) {
    var r = M_workspace_environment_constants_maybe.workspace.getConfiguration(
      e.TELEMETRY_CONFIG_ID
    );
    var n =
      undefined ===
      M_workspace_environment_constants_maybe.env.isTelemetryEnabled
        ? r.get(e.TELEMETRY_CONFIG_ENABLED_ID, true)
        : M_workspace_environment_constants_maybe.env.isTelemetryEnabled;
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
    if (M_TelemetryManager_maybe.defaultClient) {
      this.appInsightsClient = new M_TelemetryManager_maybe.TelemetryClient(e);
      this.appInsightsClient.channel.setUseDiskRetryCaching(true);
    } else {
      M_TelemetryManager_maybe.setup(e)
        .setAutoCollectRequests(false)
        .setAutoCollectPerformance(false)
        .setAutoCollectExceptions(false)
        .setAutoCollectDependencies(false)
        .setAutoDependencyCorrelation(false)
        .setAutoCollectConsole(false)
        .setUseDiskRetryCaching(true)
        .start();
      this.appInsightsClient = M_TelemetryManager_maybe.defaultClient;
    }
    this.appInsightsClient.commonProperties = this.getCommonProperties();
    if (
      M_workspace_environment_constants_maybe &&
      M_workspace_environment_constants_maybe.env
    ) {
      this.appInsightsClient.context.tags[
        this.appInsightsClient.context.keys.userId
      ] = M_workspace_environment_constants_maybe.env.machineId;
      this.appInsightsClient.context.tags[
        this.appInsightsClient.context.keys.sessionId
      ] = M_workspace_environment_constants_maybe.env.sessionId;
    }
    if (e && 0 === e.indexOf("AIF-")) {
      this.appInsightsClient.config.endpointUrl =
        "https://vortex.data.microsoft.com/collect/v1";
      this.firstParty = true;
    }
  };
  e.prototype.getCommonProperties = function () {
    var e = Object.create(null);
    e["common.os"] = M_os.platform();
    e["common.platformversion"] = (M_os.release() || "").replace(
      /^(\d+)(\.\d+)?(\.\d+)?(.*)/,
      "$1$2$3"
    );
    e["common.extname"] = this.extensionId;
    e["common.extversion"] = this.extensionVersion;
    if (
      M_workspace_environment_constants_maybe &&
      M_workspace_environment_constants_maybe.env
    ) {
      switch (
        ((e["common.vscodemachineid"] =
          M_workspace_environment_constants_maybe.env.machineId),
        (e["common.vscodesessionid"] =
          M_workspace_environment_constants_maybe.env.sessionId),
        (e["common.vscodeversion"] =
          M_workspace_environment_constants_maybe.version),
        (e["common.isnewappinstall"] =
          M_workspace_environment_constants_maybe.env.isNewAppInstall),
        M_workspace_environment_constants_maybe.env.uiKind)
      ) {
        case M_workspace_environment_constants_maybe.UIKind.Web:
          e["common.uikind"] = "web";
          break;
        case M_workspace_environment_constants_maybe.UIKind.Desktop:
          e["common.uikind"] = "desktop";
          break;
        default:
          e["common.uikind"] = "unknown";
      }
      e["common.remotename"] = this.cleanRemoteName(
        M_workspace_environment_constants_maybe.env.remoteName
      );
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
      "other" !==
        this.cleanRemoteName(
          M_workspace_environment_constants_maybe.env.remoteName
        ) ||
      (undefined !== this.extension &&
        this.extension.extensionKind !==
          M_workspace_environment_constants_maybe.ExtensionKind.Workspace &&
        M_workspace_environment_constants_maybe.env.uiKind !==
          M_workspace_environment_constants_maybe.UIKind.Web)
    );
  };
  Object.defineProperty(e.prototype, "extension", {
    get: function () {
      if (undefined === this._extension) {
        this._extension =
          M_workspace_environment_constants_maybe.extensions.getExtension(
            this.extensionId
          );
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
      new RegExp(
        M_workspace_environment_constants_maybe.env.appRoot.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        ),
        "gi"
      ),
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
