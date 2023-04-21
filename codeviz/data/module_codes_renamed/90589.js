var M_fs = require("fs");
var M_os = require("os");
var M_path = require("path");
var M_zlib = require("zlib");
var M_child_process = require("child_process");
var M_LoggingUtils_maybe = require("LoggingUtils");
var M_RequestTrackerModule_maybe = require("RequestTrackerModule");
var M_CookieParserUtils_maybe = require("CookieParserUtils");
var d = (function () {
  function e(t, r, i) {
    this._config = t;
    this._onSuccess = r;
    this._onError = i;
    this._enableDiskRetryMode = false;
    this._resendInterval = e.WAIT_BETWEEN_RESEND;
    this._maxBytesOnDisk = e.MAX_BYTES_ON_DISK;
    this._numConsecutiveFailures = 0;
    if (!e.OS_PROVIDES_FILE_PROTECTION)
      if (e.USE_ICACLS) {
        try {
          e.OS_PROVIDES_FILE_PROTECTION = M_fs.existsSync(e.ICACLS_PATH);
        } catch (e) {}
        e.OS_PROVIDES_FILE_PROTECTION ||
          M_LoggingUtils_maybe.warn(
            e.TAG,
            "Could not find ICACLS in expected location! This is necessary to use disk retry mode on Windows."
          );
      } else e.OS_PROVIDES_FILE_PROTECTION = !0;
  }
  e.prototype.setDiskRetryMode = function (t, r, n) {
    this._enableDiskRetryMode = e.OS_PROVIDES_FILE_PROTECTION && t;
    if ("number" == typeof r && r >= 0) {
      this._resendInterval = Math.floor(r);
    }
    if ("number" == typeof n && n >= 0) {
      this._maxBytesOnDisk = Math.floor(n);
    }
    if (t && !e.OS_PROVIDES_FILE_PROTECTION) {
      this._enableDiskRetryMode = false;
      M_LoggingUtils_maybe.warn(
        e.TAG,
        "Ignoring request to enable disk retry mode. Sufficient file protection capabilities were not detected."
      );
    }
  };
  e.prototype.send = function (t, r) {
    var n = this;
    var i = this._config.endpointUrl;
    var o = {
      method: "POST",
      withCredentials: false,
      headers: {
        "Content-Type": "application/x-json-stream",
      },
    };
    M_zlib.gzip(t, function (s, a) {
      var d = a;
      if (s) {
        M_LoggingUtils_maybe.warn(s);
        d = t;
        o.headers["Content-Length"] = t.length.toString();
      } else {
        o.headers["Content-Encoding"] = "gzip";
        o.headers["Content-Length"] = a.length;
      }
      M_LoggingUtils_maybe.info(e.TAG, o);
      o[M_RequestTrackerModule_maybe.disableCollectionRequestOption] = true;
      var p = M_CookieParserUtils_maybe.makeRequest(
        n._config,
        i,
        o,
        function (i) {
          i.setEncoding("utf-8");
          var o = "";
          i.on("data", function (e) {
            o += e;
          });
          i.on("end", function () {
            n._numConsecutiveFailures = 0;
            M_LoggingUtils_maybe.info(e.TAG, o);
            if ("function" == typeof n._onSuccess) {
              n._onSuccess(o);
            }
            if ("function" == typeof r) {
              r(o);
            }
            if (n._enableDiskRetryMode) {
              if (200 === i.statusCode) {
                setTimeout(function () {
                  return n._sendFirstFileOnDisk();
                }, n._resendInterval).unref();
              } else {
                if (
                  408 !== i.statusCode &&
                  429 !== i.statusCode &&
                  439 !== i.statusCode &&
                  500 !== i.statusCode &&
                  503 !== i.statusCode
                ) {
                  n._storeToDisk(t);
                }
              }
            }
          });
        }
      );
      p.on("error", function (i) {
        n._numConsecutiveFailures++;
        if (
          !n._enableDiskRetryMode ||
          (n._numConsecutiveFailures > 0 &&
            n._numConsecutiveFailures % e.MAX_CONNECTION_FAILURES_BEFORE_WARN ==
              0)
        ) {
          var o =
            "Ingestion endpoint could not be reached. This batch of telemetry items has been lost. Use Disk Retry Caching to enable resending of failed telemetry. Error:";
          n._enableDiskRetryMode &&
            (o =
              "Ingestion endpoint could not be reached " +
              n._numConsecutiveFailures +
              " consecutive times. There may be resulting telemetry loss. Most recent error:"),
            M_LoggingUtils_maybe.warn(e.TAG, o, i);
        } else (o = "Transient failure to reach ingestion endpoint. This batch of telemetry items will be retried. Error:"), M_LoggingUtils_maybe.info(e.TAG, o, i);
        n._onErrorHelper(i);
        if ("function" == typeof r) {
          var s = "error sending telemetry";
          i && "function" == typeof i.toString && (s = i.toString()), r(s);
        }
        if (n._enableDiskRetryMode) {
          n._storeToDisk(t);
        }
      });
      p.write(d);
      p.end();
    });
  };
  e.prototype.saveOnCrash = function (e) {
    if (this._enableDiskRetryMode) {
      this._storeToDiskSync(e);
    }
  };
  e.prototype._runICACLS = function (t, r) {
    var n = M_child_process.spawn(e.ICACLS_PATH, t, {
      windowsHide: true,
    });
    n.on("error", function (e) {
      return r(e);
    });
    n.on("close", function (e, t) {
      return r(
        0 === e
          ? null
          : new Error(
              "Setting ACL restrictions did not succeed (ICACLS returned code " +
                e +
                ")"
            )
      );
    });
  };
  e.prototype._runICACLSSync = function (t) {
    if (!M_child_process.spawnSync)
      throw new Error(
        "Could not synchronously call ICACLS under current version of Node.js"
      );
    var r = M_child_process.spawnSync(e.ICACLS_PATH, t, {
      windowsHide: true,
    });
    if (r.error) throw r.error;
    if (0 !== r.status)
      throw new Error(
        "Setting ACL restrictions did not succeed (ICACLS returned code " +
          r.status +
          ")"
      );
  };
  e.prototype._getACLIdentity = function (t) {
    if (e.ACL_IDENTITY) return t(null, e.ACL_IDENTITY);
    var r = M_child_process.spawn(
      e.POWERSHELL_PATH,
      [
        "-Command",
        "[System.Security.Principal.WindowsIdentity]::GetCurrent().Name",
      ],
      {
        windowsHide: true,
        stdio: ["ignore", "pipe", "pipe"],
      }
    );
    var n = "";
    r.stdout.on("data", function (e) {
      return (n += e);
    });
    r.on("error", function (e) {
      return t(e, null);
    });
    r.on("close", function (r, i) {
      e.ACL_IDENTITY = n && n.trim();
      return t(
        0 === r
          ? null
          : new Error(
              "Getting ACL identity did not succeed (PS returned code " +
                r +
                ")"
            ),
        e.ACL_IDENTITY
      );
    });
  };
  e.prototype._getACLIdentitySync = function () {
    if (e.ACL_IDENTITY) return e.ACL_IDENTITY;
    if (M_child_process.spawnSync) {
      var t = M_child_process.spawnSync(
        e.POWERSHELL_PATH,
        [
          "-Command",
          "[System.Security.Principal.WindowsIdentity]::GetCurrent().Name",
        ],
        {
          windowsHide: true,
          stdio: ["ignore", "pipe", "pipe"],
        }
      );
      if (t.error) throw t.error;
      if (0 !== t.status)
        throw new Error(
          "Getting ACL identity did not succeed (PS returned code " +
            t.status +
            ")"
        );
      e.ACL_IDENTITY = t.stdout && t.stdout.toString().trim();
      return e.ACL_IDENTITY;
    }
    throw new Error(
      "Could not synchronously get ACL identity under current version of Node.js"
    );
  };
  e.prototype._getACLArguments = function (e, t) {
    return [
      e,
      "/grant",
      "*S-1-5-32-544:(OI)(CI)F",
      "/grant",
      t + ":(OI)(CI)F",
      "/inheritance:r",
    ];
  };
  e.prototype._applyACLRules = function (t, r) {
    var n = this;
    return e.USE_ICACLS
      ? undefined !== e.ACLED_DIRECTORIES[t]
        ? r(
            e.ACLED_DIRECTORIES[t]
              ? null
              : new Error(
                  "Setting ACL restrictions did not succeed (cached result)"
                )
          )
        : ((e.ACLED_DIRECTORIES[t] = false),
          void this._getACLIdentity(function (i, o) {
            if (i) {
              e.ACLED_DIRECTORIES[t] = false;
              return r(i);
            }
            n._runICACLS(n._getACLArguments(t, o), function (n) {
              e.ACLED_DIRECTORIES[t] = !n;
              return r(n);
            });
          }))
      : r(null);
  };
  e.prototype._applyACLRulesSync = function (t) {
    if (e.USE_ICACLS) {
      if (undefined === e.ACLED_DIRECTORIES[t]) {
        this._runICACLSSync(
          this._getACLArguments(t, this._getACLIdentitySync())
        );
        return void (e.ACLED_DIRECTORIES[t] = true);
      }
      if (!e.ACLED_DIRECTORIES[t])
        throw new Error(
          "Setting ACL restrictions did not succeed (cached result)"
        );
    }
  };
  e.prototype._confirmDirExists = function (e, t) {
    var r = this;
    M_fs.lstat(e, function (i, o) {
      if (i && "ENOENT" === i.code) {
        M_fs.mkdir(e, function (n) {
          if (n && "EEXIST" !== n.code) {
            t(n);
          } else {
            r._applyACLRules(e, t);
          }
        });
      } else {
        if (!i && o.isDirectory()) {
          r._applyACLRules(e, t);
        } else {
          t(i || new Error("Path existed but was not a directory"));
        }
      }
    });
  };
  e.prototype._getShallowDirectorySize = function (e, t) {
    M_fs.readdir(e, function (r, i) {
      if (r) return t(r, -1);
      var s = null;
      var a = 0;
      var c = 0;
      if (0 !== i.length)
        for (var l = 0; l < i.length; l++)
          M_fs.stat(M_path.join(e, i[l]), function (e, r) {
            c++;
            if (e) {
              s = e;
            } else {
              if (r.isFile()) {
                a += r.size;
              }
            }
            if (c === i.length) {
              t(s, s ? -1 : a);
            }
          });
      else t(null, 0);
    });
  };
  e.prototype._getShallowDirectorySizeSync = function (e) {
    for (t = M_fs.readdirSync(e), r = 0, i = 0, undefined; i < t.length; i++) {
      var t;
      var r;
      var i;
      r += M_fs.statSync(M_path.join(e, t[i])).size;
    }
    return r;
  };
  e.prototype._storeToDisk = function (t) {
    var r = this;
    var s = M_path.join(
      M_os.tmpdir(),
      e.TEMPDIR_PREFIX + this._config.instrumentationKey
    );
    M_LoggingUtils_maybe.info(
      e.TAG,
      "Checking existance of data storage directory: " + s
    );
    this._confirmDirExists(s, function (i) {
      if (i) {
        M_LoggingUtils_maybe.warn(
          e.TAG,
          "Error while checking/creating directory: " + (i && i.message)
        );
        return void r._onErrorHelper(i);
      }
      r._getShallowDirectorySize(s, function (i, a) {
        if (i || a < 0) {
          M_LoggingUtils_maybe.warn(
            e.TAG,
            "Error while checking directory size: " + (i && i.message)
          );
          return void r._onErrorHelper(i);
        }
        if (a > r._maxBytesOnDisk)
          M_LoggingUtils_maybe.warn(
            e.TAG,
            "Not saving data due to max size limit being met. Directory size in bytes is: " +
              a
          );
        else {
          var l = new Date().getTime() + ".ai.json";
          var u = M_path.join(s, l);
          M_LoggingUtils_maybe.info(e.TAG, "saving data to disk at: " + u);
          M_fs.writeFile(
            u,
            t,
            {
              mode: 384,
            },
            function (e) {
              return r._onErrorHelper(e);
            }
          );
        }
      });
    });
  };
  e.prototype._storeToDiskSync = function (t) {
    var r = M_path.join(
      M_os.tmpdir(),
      e.TEMPDIR_PREFIX + this._config.instrumentationKey
    );
    try {
      M_LoggingUtils_maybe.info(
        e.TAG,
        "Checking existance of data storage directory: " + r
      );
      if (M_fs.existsSync(r)) {
        M_fs.mkdirSync(r);
      }
      this._applyACLRulesSync(r);
      var s = this._getShallowDirectorySizeSync(r);
      if (s > this._maxBytesOnDisk)
        return void M_LoggingUtils_maybe.info(
          e.TAG,
          "Not saving data due to max size limit being met. Directory size in bytes is: " +
            s
        );
      var a = new Date().getTime() + ".ai.json";
      var l = M_path.join(r, a);
      M_LoggingUtils_maybe.info(
        e.TAG,
        "saving data before crash to disk at: " + l
      );
      M_fs.writeFileSync(l, t, {
        mode: 384,
      });
    } catch (t) {
      M_LoggingUtils_maybe.warn(
        e.TAG,
        "Error while saving data to disk: " + (t && t.message)
      );
      this._onErrorHelper(t);
    }
  };
  e.prototype._sendFirstFileOnDisk = function () {
    var t = this;
    var r = M_path.join(
      M_os.tmpdir(),
      e.TEMPDIR_PREFIX + this._config.instrumentationKey
    );
    M_fs.exists(r, function (e) {
      if (e) {
        M_fs.readdir(r, function (e, i) {
          if (e) t._onErrorHelper(e);
          else if (
            (i = i.filter(function (e) {
              return M_path.basename(e).indexOf(".ai.json") > -1;
            })).length > 0
          ) {
            var s = i[0];
            var a = M_path.join(r, s);
            M_fs.readFile(a, function (e, r) {
              if (e) {
                t._onErrorHelper(e);
              } else {
                M_fs.unlink(a, function (e) {
                  if (e) {
                    t._onErrorHelper(e);
                  } else {
                    t.send(r);
                  }
                });
              }
            });
          }
        });
      }
    });
  };
  e.prototype._onErrorHelper = function (e) {
    if ("function" == typeof this._onError) {
      this._onError(e);
    }
  };
  e.TAG = "Sender";
  e.ICACLS_PATH = process.env.systemdrive + "/windows/system32/icacls.exe";
  e.POWERSHELL_PATH =
    process.env.systemdrive +
    "/windows/system32/windowspowershell/v1.0/powershell.exe";
  e.ACLED_DIRECTORIES = {};
  e.ACL_IDENTITY = null;
  e.WAIT_BETWEEN_RESEND = 6e4;
  e.MAX_BYTES_ON_DISK = 5e7;
  e.MAX_CONNECTION_FAILURES_BEFORE_WARN = 5;
  e.TEMPDIR_PREFIX = "appInsights-node";
  e.OS_PROVIDES_FILE_PROTECTION = false;
  e.USE_ICACLS = "Windows_NT" === M_os.type();
  return e;
})();
module.exports = d;
