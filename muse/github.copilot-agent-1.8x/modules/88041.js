var n;
var i =
  (this && this.__extends) ||
  ((n =
    Object.setPrototypeOf ||
    ({
      __proto__: [],
    } instanceof Array &&
      function (e, t) {
        e.__proto__ = t;
      }) ||
    function (e, t) {
      for (var r in t)
        if (t.hasOwnProperty(r)) {
          e[r] = t[r];
        }
    }),
  function (e, t) {
    function r() {
      this.constructor = e;
    }
    n(e, t);
    e.prototype =
      null === t ? Object.create(t) : ((r.prototype = t.prototype), new r());
  });
var o =
  (this && this.__rest) ||
  function (e, t) {
    var r = {};
    for (var n in e)
      if (Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0) {
        r[n] = e[n];
      }
    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
      var i = 0;
      for (n = Object.getOwnPropertySymbols(e); i < n.length; i++)
        if (t.indexOf(n[i]) < 0) {
          r[n[i]] = e[n[i]];
        }
    }
    return r;
  };
Object.defineProperty(exports, "__esModule", {
  value: true,
});
var s = require(66932);
exports.winston3 = {
  versionSpecifier: "3.x",
  patch: function (e) {
    var t = (function (e) {
      function t(t, r) {
        var n = e.call(this, r) || this;
        n.winston = t;
        return n;
      }
      i(t, e);
      t.prototype.log = function (e, t) {
        var r = e.message;
        var n = e.level;
        var i = e.meta;
        var a = o(e, ["message", "level", "meta"]);
        n = "function" == typeof Symbol.for ? e[Symbol.for("level")] : n;
        r = e instanceof Error ? e : r;
        var c = (function (e, t) {
          return null != e.config.npm.levels[t]
            ? "npm"
            : null != e.config.syslog.levels[t]
            ? "syslog"
            : "unknown";
        })(this.winston, n);
        for (var l in ((i = i || {}), a))
          if (a.hasOwnProperty(l)) {
            i[l] = a[l];
          }
        s.channel.publish("winston", {
          message: r,
          level: n,
          levelKind: c,
          meta: i,
        });
        t();
      };
      return t;
    })(e.Transport);
    function r() {
      var r;
      var n = arguments[0].levels || e.config.npm.levels;
      for (var i in n)
        if (n.hasOwnProperty(i)) {
          r = undefined === r || n[i] > n[r] ? i : r;
        }
      this.add(
        new t(e, {
          level: r,
        })
      );
    }
    var n = e.createLogger;
    e.createLogger = function () {
      var i;
      var o = arguments[0].levels || e.config.npm.levels;
      for (var s in o)
        if (o.hasOwnProperty(s)) {
          i = undefined === i || o[s] > o[i] ? s : i;
        }
      var a = n.apply(this, arguments);
      a.add(
        new t(e, {
          level: i,
        })
      );
      var c = a.configure;
      a.configure = function () {
        c.apply(this, arguments);
        r.apply(this, arguments);
      };
      return a;
    };
    var a = e.createLogger;
    e.configure = function () {
      a.apply(this, arguments);
      r.apply(this, arguments);
    };
    e.add(new t(e));
    return e;
  },
};
exports.winston2 = {
  versionSpecifier: "2.x",
  patch: function (e) {
    var t;
    var r = e.Logger.prototype.log;
    var n = function (r, n, i) {
      var o;
      o =
        t === e.config.npm.levels
          ? "npm"
          : t === e.config.syslog.levels
          ? "syslog"
          : "unknown";
      s.channel.publish("winston", {
        level: r,
        message: n,
        meta: i,
        levelKind: o,
      });
      return n;
    };
    e.Logger.prototype.log = function () {
      t = this.levels;
      if (this.filters && 0 !== this.filters.length) {
        if (this.filters[this.filters.length - 1] !== n) {
          this.filters = this.filters.filter(function (e) {
            return e !== n;
          });
          this.filters.push(n);
        }
      } else {
        this.filters = [n];
      }
      return r.apply(this, arguments);
    };
    return e;
  },
};
exports.enable = function () {
  s.channel.registerMonkeyPatch("winston", exports.winston2);
  s.channel.registerMonkeyPatch("winston", exports.winston3);
};