var n =
  (this && this.__assign) ||
  Object.assign ||
  function (e) {
    for (r = 1, n = arguments.length, undefined; r < n; r++) {
      var t;
      var r;
      var n;
      for (var i in (t = arguments[r]))
        if (Object.prototype.hasOwnProperty.call(t, i)) {
          e[i] = t[i];
        }
    }
    return e;
  };
Object.defineProperty(exports, "__esModule", {
  value: true,
});
var M_ContextualFilterManager_maybe = require("ContextualFilterManager");
exports.tedious = {
  versionSpecifier: ">= 6.0.0 < 9.0.0",
  patch: function (e) {
    var t = e.Connection.prototype.makeRequest;
    e.Connection.prototype.makeRequest = function () {
      function e(e) {
        var t = process.hrtime();
        var r = {
          query: {},
          database: {
            host: null,
            port: null,
          },
          result: null,
          error: null,
          duration: 0,
        };
        return M_ContextualFilterManager_maybe.channel.bindToContext(function (
          o,
          s,
          a
        ) {
          var c = process.hrtime(t);
          r = n({}, r, {
            database: {
              host: this.connection.config.server,
              port: this.connection.config.options.port,
            },
            result: !o && {
              rowCount: s,
              rows: a,
            },
            query: {
              text: this.parametersByName.statement.value,
            },
            error: o,
            duration: Math.ceil(1e3 * c[0] + c[1] / 1e6),
          });
          M_ContextualFilterManager_maybe.channel.publish("tedious", r);
          e.call(this, o, s, a);
        });
      }
      var r = arguments[0];
      arguments[0].callback = e(r.callback);
      t.apply(this, arguments);
    };
    return e;
  },
};
exports.enable = function () {
  M_ContextualFilterManager_maybe.channel.registerMonkeyPatch(
    "tedious",
    exports.tedious
  );
};
