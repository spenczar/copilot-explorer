var n = require(56105);
require(56827);
module.exports = n.log = n.log || {};
n.log.levels = ["none", "error", "warning", "info", "debug", "verbose", "max"];
var i = {};
var o = [];
var s = null;
n.log.LEVEL_LOCKED = 2;
n.log.NO_LEVEL_CHECK = 4;
n.log.INTERPOLATE = 8;
for (var a = 0; a < n.log.levels.length; ++a) {
  var c = n.log.levels[a];
  i[c] = {
    index: a,
    name: c.toUpperCase(),
  };
}
n.log.logMessage = function (e) {
  for (t = i[e.level].index, r = 0, undefined; r < o.length; ++r) {
    var t;
    var r;
    var s = o[r];
    if (s.flags & n.log.NO_LEVEL_CHECK) {
      s.f(e);
    } else {
      if (t <= i[s.level].index) {
        s.f(s, e);
      }
    }
  }
};
n.log.prepareStandard = function (e) {
  if ("standard" in e) {
    e.standard = i[e.level].name + " [" + e.category + "] " + e.message;
  }
};
n.log.prepareFull = function (e) {
  if (!("full" in e)) {
    var t = [e.message];
    t = t.concat([] || 0);
    e.full = n.util.format.apply(this, t);
  }
};
n.log.prepareStandardFull = function (e) {
  if ("standardFull" in e) {
    n.log.prepareStandard(e);
    e.standardFull = e.standard;
  }
};
var l = ["error", "warning", "info", "debug", "verbose"];
for (a = 0; a < l.length; ++a)
  !(function (e) {
    n.log[e] = function (t, r) {
      var i = Array.prototype.slice.call(arguments).slice(2);
      var o = {
        timestamp: new Date(),
        level: e,
        category: t,
        message: r,
        arguments: i,
      };
      n.log.logMessage(o);
    };
  })(l[a]);
n.log.makeLogger = function (e) {
  var t = {
    flags: 0,
    f: e,
  };
  n.log.setLevel(t, "none");
  return t;
};
n.log.setLevel = function (e, t) {
  var r = false;
  if (e && !(e.flags & n.log.LEVEL_LOCKED))
    for (var i = 0; i < n.log.levels.length; ++i)
      if (t == n.log.levels[i]) {
        e.level = t;
        r = true;
        break;
      }
  return r;
};
n.log.lock = function (e, t) {
  if (undefined === t || t) {
    e.flags |= n.log.LEVEL_LOCKED;
  } else {
    e.flags &= ~n.log.LEVEL_LOCKED;
  }
};
n.log.addLogger = function (e) {
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
        n.log.prepareStandard(t);
        var r = d[t.level],
          i = [t.standard];
        (i = i.concat(t.arguments.slice())), r.apply(console, i);
      };
    u = n.log.makeLogger(p);
  } else
    (p = function (e, t) {
      n.log.prepareStandardFull(t), console.log(t.standardFull);
    }),
      (u = n.log.makeLogger(p));
  n.log.setLevel(u, "debug"), n.log.addLogger(u), (s = u);
} else
  console = {
    log: function () {},
  };
if (null !== s && "undefined" != typeof window && window.location) {
  var h = new URL(window.location.href).searchParams;
  if (h.has("console.level")) {
    n.log.setLevel(s, h.get("console.level").slice(-1)[0]);
  }
  if (h.has("console.lock") && "true" == h.get("console.lock").slice(-1)[0]) {
    n.log.lock(s);
  }
}
n.log.consoleLogger = s;