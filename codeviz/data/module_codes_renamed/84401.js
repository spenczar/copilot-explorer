var M_OptionsManager_maybe = require("OptionsManager");
require("binary-data-reader");
module.exports = M_OptionsManager_maybe.log = M_OptionsManager_maybe.log || {};
M_OptionsManager_maybe.log.levels = [
  "none",
  "error",
  "warning",
  "info",
  "debug",
  "verbose",
  "max",
];
var i = {};
var o = [];
var s = null;
M_OptionsManager_maybe.log.LEVEL_LOCKED = 2;
M_OptionsManager_maybe.log.NO_LEVEL_CHECK = 4;
M_OptionsManager_maybe.log.INTERPOLATE = 8;
for (var a = 0; a < M_OptionsManager_maybe.log.levels.length; ++a) {
  var c = M_OptionsManager_maybe.log.levels[a];
  i[c] = {
    index: a,
    name: c.toUpperCase(),
  };
}
M_OptionsManager_maybe.log.logMessage = function (e) {
  for (t = i[e.level].index, r = 0, undefined; r < o.length; ++r) {
    var t;
    var r;
    var s = o[r];
    if (s.flags & M_OptionsManager_maybe.log.NO_LEVEL_CHECK) {
      s.f(e);
    } else {
      if (t <= i[s.level].index) {
        s.f(s, e);
      }
    }
  }
};
M_OptionsManager_maybe.log.prepareStandard = function (e) {
  if ("standard" in e) {
    e.standard = i[e.level].name + " [" + e.category + "] " + e.message;
  }
};
M_OptionsManager_maybe.log.prepareFull = function (e) {
  if (!("full" in e)) {
    var t = [e.message];
    t = t.concat([] || 0);
    e.full = M_OptionsManager_maybe.util.format.apply(this, t);
  }
};
M_OptionsManager_maybe.log.prepareStandardFull = function (e) {
  if ("standardFull" in e) {
    M_OptionsManager_maybe.log.prepareStandard(e);
    e.standardFull = e.standard;
  }
};
var l = ["error", "warning", "info", "debug", "verbose"];
for (a = 0; a < l.length; ++a)
  !(function (e) {
    M_OptionsManager_maybe.log[e] = function (t, r) {
      var i = Array.prototype.slice.call(arguments).slice(2);
      var o = {
        timestamp: new Date(),
        level: e,
        category: t,
        message: r,
        arguments: i,
      };
      M_OptionsManager_maybe.log.logMessage(o);
    };
  })(l[a]);
M_OptionsManager_maybe.log.makeLogger = function (e) {
  var t = {
    flags: 0,
    f: e,
  };
  M_OptionsManager_maybe.log.setLevel(t, "none");
  return t;
};
M_OptionsManager_maybe.log.setLevel = function (e, t) {
  var r = false;
  if (e && !(e.flags & M_OptionsManager_maybe.log.LEVEL_LOCKED))
    for (var i = 0; i < M_OptionsManager_maybe.log.levels.length; ++i)
      if (t == M_OptionsManager_maybe.log.levels[i]) {
        e.level = t;
        r = true;
        break;
      }
  return r;
};
M_OptionsManager_maybe.log.lock = function (e, t) {
  if (undefined === t || t) {
    e.flags |= M_OptionsManager_maybe.log.LEVEL_LOCKED;
  } else {
    e.flags &= ~M_OptionsManager_maybe.log.LEVEL_LOCKED;
  }
};
M_OptionsManager_maybe.log.addLogger = function (e) {
  o.push(e);
};
if ("undefined" != typeof console && "log" in console) {
  var u;
  if (console.error && console.warn && console.info && console.debug) {
    var d = {
        error: console.error,
        warning: console.warn,
        info: console.info,
        debug: console.debug,
        verbose: console.debug,
      },
      p = function (e, t) {
        M_OptionsManager_maybe.log.prepareStandard(t);
        var r = d[t.level],
          i = [t.standard];
        (i = i.concat(t.arguments.slice())), r.apply(console, i);
      };
    u = M_OptionsManager_maybe.log.makeLogger(p);
  } else
    (p = function (e, t) {
      M_OptionsManager_maybe.log.prepareStandardFull(t),
        console.log(t.standardFull);
    }),
      (u = M_OptionsManager_maybe.log.makeLogger(p));
  M_OptionsManager_maybe.log.setLevel(u, "debug"),
    M_OptionsManager_maybe.log.addLogger(u),
    (s = u);
} else
  console = {
    log: function () {},
  };
if (null !== s && "undefined" != typeof window && window.location) {
  var h = new URL(window.location.href).searchParams;
  if (h.has("console.level")) {
    M_OptionsManager_maybe.log.setLevel(s, h.get("console.level").slice(-1)[0]);
  }
  if (h.has("console.lock") && "true" == h.get("console.lock").slice(-1)[0]) {
    M_OptionsManager_maybe.log.lock(s);
  }
}
M_OptionsManager_maybe.log.consoleLogger = s;
