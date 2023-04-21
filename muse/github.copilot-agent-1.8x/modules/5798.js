Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.logger =
  exports.toPlainText =
  exports.Logger =
  exports.MultiLog =
  exports.OutputChannelLog =
  exports.ConsoleLog =
  exports.LogTarget =
  exports.verboseLogging =
  exports.LogVerbose =
  exports.LogLevel =
    undefined;
const n = require(32137);
const i = require(39800);
const o = require(65489);
var s;
!(function (e) {
  e[(e.DEBUG = 0)] = "DEBUG";
  e[(e.INFO = 1)] = "INFO";
  e[(e.WARN = 2)] = "WARN";
  e[(e.ERROR = 3)] = "ERROR";
})((s = exports.LogLevel || (exports.LogLevel = {})));
class LogVerbose {
  constructor(e) {
    this.logVerbose = e;
  }
}
function verboseLogging(e) {
  return e.get(LogVerbose).logVerbose;
}
exports.LogVerbose = LogVerbose;
exports.verboseLogging = verboseLogging;
class LogTarget {
  shouldLog(e, t) {}
}
exports.LogTarget = LogTarget;
exports.ConsoleLog = class extends LogTarget {
  constructor(e) {
    super();
    this.console = e;
  }
  logIt(e, t, r, ...n) {
    if (verboseLogging(e) || t == s.ERROR) {
      this.console.error(r, ...n);
    } else {
      if (t == s.WARN) {
        this.console.warn(r, ...n);
      }
    }
  }
};
exports.OutputChannelLog = class extends LogTarget {
  constructor(e) {
    super();
    this.output = e;
  }
  logIt(e, t, r, ...n) {
    this.output.appendLine(`${r} ${n.map(toPlainText)}`);
  }
};
exports.MultiLog = class extends LogTarget {
  constructor(e) {
    super();
    this.targets = e;
  }
  logIt(e, t, r, ...n) {
    this.targets.forEach((i) => i.logIt(e, t, r, ...n));
  }
};
class Logger {
  constructor(e, t) {
    this.minLoggedLevel = e;
    this.context = t;
  }
  setLevel(e) {
    this.minLoggedLevel = e;
  }
  stringToLevel(e) {
    return s[e];
  }
  log(e, t, r, ...i) {
    const a = s[t];
    if (t == s.ERROR) {
      o.telemetryError(
        e,
        "log",
        o.TelemetryData.createAndMarkAsIssued({
          context: this.context,
          level: a,
          message: i.length > 0 ? JSON.stringify(i) : "no msg",
        }),
        r
      );
    }
    const c = e.get(LogTarget);
    const u = c.shouldLog(e, t);
    if (false === u) return;
    if (undefined === u && !this.shouldLog(e, t, this.context)) return;
    const d = e.get(n.Clock).now().toISOString();
    const p = `[${a}] [${this.context}] [${d}]`;
    c.logIt(e, t, p, ...i);
  }
  shouldLog(e, t, r) {
    if (verboseLogging(e)) return true;
    const n = i.getConfig(e, i.ConfigKey.DebugFilterLogCategories);
    if (n.length > 0 && !n.includes(r)) return false;
    if (i.isProduction(e)) return t >= this.minLoggedLevel;
    const o = i.getConfig(e, i.ConfigKey.DebugOverrideLogLevels);
    return (
      t >=
      (this.stringToLevel(o["*"]) ??
        this.stringToLevel(o[this.context]) ??
        this.minLoggedLevel)
    );
  }
  debug(e, ...t) {
    this.log(e, s.DEBUG, false, ...t);
  }
  info(e, ...t) {
    this.log(e, s.INFO, false, ...t);
  }
  warn(e, ...t) {
    this.log(e, s.WARN, false, ...t);
  }
  error(e, ...t) {
    this.log(e, s.ERROR, false, ...t);
  }
  secureError(e, t, ...r) {
    this.log(e, s.ERROR, false, t);
    this.log(e, s.ERROR, true, t, ...r);
  }
}
function toPlainText(e) {
  return "object" == typeof e ? JSON.stringify(e) : String(e);
}
exports.Logger = Logger;
exports.toPlainText = toPlainText;
exports.logger = new Logger(s.INFO, "default");