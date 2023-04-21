Object.defineProperty(exports, "__esModule", {
  value: true,
});
var n = require(66932);
var i = require("events");
exports.postgres6 = {
  versionSpecifier: "6.*",
  patch: function (e, t) {
    var r = e.Client.prototype.query;
    var o = "__diagnosticOriginalFunc";
    e.Client.prototype.query = function (e, t, s) {
      var a;
      var c = {
        query: {},
        database: {
          host: this.connectionParameters.host,
          port: this.connectionParameters.port,
        },
        result: null,
        error: null,
        duration: 0,
        time: new Date(),
      };
      var l = process.hrtime();
      function u(e) {
        if (e && e[o]) {
          e = e[o];
        }
        var t = n.channel.bindToContext(function (t, r) {
          var o = process.hrtime(l);
          c.result = r && {
            rowCount: r.rowCount,
            command: r.command,
          };
          c.error = t;
          c.duration = Math.ceil(1e3 * o[0] + o[1] / 1e6);
          n.channel.publish("postgres", c);
          if (t) {
            if (e) return e.apply(this, arguments);
            a && a instanceof i.EventEmitter && a.emit("error", t);
          } else e && e.apply(this, arguments);
        });
        try {
          Object.defineProperty(t, o, {
            value: e,
          });
          return t;
        } catch (t) {
          return e;
        }
      }
      try {
        if ("string" == typeof e) {
          if (t instanceof Array) {
            c.query.preparable = {
              text: e,
              args: t,
            };
            s = u(s);
          } else {
            c.query.text = e;
            if (s) {
              s = u(s);
            } else {
              t = u(t);
            }
          }
        } else {
          if ("string" == typeof e.name) {
            c.query.plan = e.name;
          } else {
            if (e.values instanceof Array) {
              c.query.preparable = {
                text: e.text,
                args: e.values,
              };
            } else {
              c.query.text = e.text;
            }
          }
          if (s) {
            s = u(s);
          } else {
            if (t) {
              t = u(t);
            } else {
              e.callback = u(e.callback);
            }
          }
        }
      } catch (e) {
        return r.apply(this, arguments);
      }
      arguments[0] = e;
      arguments[1] = t;
      arguments[2] = s;
      arguments.length = arguments.length > 3 ? arguments.length : 3;
      return (a = r.apply(this, arguments));
    };
    return e;
  },
};
exports.postgres7 = {
  versionSpecifier: ">=7.* <=8.*",
  patch: function (e, t) {
    var r = e.Client.prototype.query;
    var o = "__diagnosticOriginalFunc";
    e.Client.prototype.query = function (e, t, s) {
      var a;
      var c = this;
      var l = !!s;
      var u = {
        query: {},
        database: {
          host: this.connectionParameters.host,
          port: this.connectionParameters.port,
        },
        result: null,
        error: null,
        duration: 0,
        time: new Date(),
      };
      var d = process.hrtime();
      function p(e) {
        if (e && e[o]) {
          e = e[o];
        }
        var t = n.channel.bindToContext(function (t, r) {
          var o = process.hrtime(d);
          u.result = r && {
            rowCount: r.rowCount,
            command: r.command,
          };
          u.error = t;
          u.duration = Math.ceil(1e3 * o[0] + o[1] / 1e6);
          n.channel.publish("postgres", u);
          if (t) {
            if (e) return e.apply(this, arguments);
            a && a instanceof i.EventEmitter && a.emit("error", t);
          } else e && e.apply(this, arguments);
        });
        try {
          Object.defineProperty(t, o, {
            value: e,
          });
          return t;
        } catch (t) {
          return e;
        }
      }
      try {
        if ("string" == typeof e) {
          if (t instanceof Array) {
            u.query.preparable = {
              text: e,
              args: t,
            };
            s = (l = "function" == typeof s) ? p(s) : s;
          } else {
            u.query.text = e;
            if (s) {
              s = (l = "function" == typeof s) ? p(s) : s;
            } else {
              t = (l = "function" == typeof t) ? p(t) : t;
            }
          }
        } else {
          if ("string" == typeof e.name) {
            u.query.plan = e.name;
          } else {
            if (e.values instanceof Array) {
              u.query.preparable = {
                text: e.text,
                args: e.values,
              };
            } else {
              u.query.text = e.text;
            }
          }
          if (s) {
            l = "function" == typeof s;
            s = p(s);
          } else {
            if (t) {
              t = (l = "function" == typeof t) ? p(t) : t;
            } else {
              l = "function" == typeof e.callback;
              e.callback = l ? p(e.callback) : e.callback;
            }
          }
        }
      } catch (e) {
        return r.apply(this, arguments);
      }
      arguments[0] = e;
      arguments[1] = t;
      arguments[2] = s;
      arguments.length = arguments.length > 3 ? arguments.length : 3;
      a = r.apply(this, arguments);
      return l
        ? a
        : a
            .then(function (e) {
              p()(undefined, e);
              return new c._Promise(function (t, r) {
                t(e);
              });
            })
            .catch(function (e) {
              p()(e, undefined);
              return new c._Promise(function (t, r) {
                r(e);
              });
            });
    };
    return e;
  },
};
exports.enable = function () {
  n.channel.registerMonkeyPatch("pg", exports.postgres6);
  n.channel.registerMonkeyPatch("pg", exports.postgres7);
};