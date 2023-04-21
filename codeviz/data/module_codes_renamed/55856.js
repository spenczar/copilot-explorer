Object.defineProperty(exports, "__esModule", {
  value: true,
});
var M_ContextualFilterManager_maybe = require("ContextualFilterManager");
var M_path = require("path");
exports.mysql = {
  versionSpecifier: ">= 2.0.0 < 3.0.0",
  patch: function (e, t) {
    var o = function (e, t) {
      return function (t, r) {
        var i = e[t];
        if (i) {
          e[t] = function () {
            for (
              e = arguments.length - 1, t = arguments.length - 1, undefined;
              t >= 0;
              --t
            ) {
              var e;
              var t;
              if ("function" == typeof arguments[t]) {
                e = t;
                break;
              }
              if (undefined !== arguments[t]) break;
            }
            var o = arguments[e];
            var s = {
              result: null,
              startTime: null,
              startDate: null,
            };
            if ("function" == typeof o) {
              if (r) {
                s.startTime = process.hrtime();
                s.startDate = new Date();
                arguments[e] =
                  M_ContextualFilterManager_maybe.channel.bindToContext(
                    r(s, o)
                  );
              } else {
                arguments[e] =
                  M_ContextualFilterManager_maybe.channel.bindToContext(o);
              }
            }
            var a = i.apply(this, arguments);
            s.result = a;
            return a;
          };
        }
      };
    };
    var s = function (e, t) {
      return o(e.prototype);
    };
    var a = require("moduleNotFoundHandler")(
      M_path.dirname(t) + "/lib/Connection"
    );
    ["connect", "changeUser", "ping", "statistics", "end"].forEach(function (
      e
    ) {
      return s(a)(e);
    });
    o(a)("createQuery", function (e, t) {
      return function (r) {
        var i = process.hrtime(e.startTime);
        var o = (1e3 * i[0] + i[1] / 1e6) | 0;
        M_ContextualFilterManager_maybe.channel.publish("mysql", {
          query: e.result,
          callbackArgs: arguments,
          err: r,
          duration: o,
          time: e.startDate,
        });
        t.apply(this, arguments);
      };
    });
    var c = require("moduleNotFoundHandler")(M_path.dirname(t) + "/lib/Pool");
    ["_enqueueCallback"].forEach(function (e) {
      return s(c)(e);
    });
    return e;
  },
};
exports.enable = function () {
  M_ContextualFilterManager_maybe.channel.registerMonkeyPatch(
    "mysql",
    exports.mysql
  );
};
