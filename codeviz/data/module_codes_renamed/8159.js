Object.defineProperty(exports, "__esModule", {
  value: true,
});
var M_ContextualFilterManager_maybe = require("ContextualFilterManager");
var M_stream = require("stream");
exports.console = {
  versionSpecifier: ">= 4.0.0",
  patch: function (e) {
    var t = new M_stream.Writable();
    var r = new M_stream.Writable();
    t.write = function (e) {
      if (!e) return true;
      var t = e.toString();
      M_ContextualFilterManager_maybe.channel.publish("console", {
        message: t,
      });
      return true;
    };
    r.write = function (e) {
      if (!e) return true;
      var t = e.toString();
      M_ContextualFilterManager_maybe.channel.publish("console", {
        message: t,
        stderr: true,
      });
      return true;
    };
    for (
      o = new e.Console(t, r),
        s = function (t) {
          var r = e[t];
          if (r) {
            e[t] = function () {
              if (o[t])
                try {
                  o[t].apply(o, arguments);
                } catch (e) {}
              return r.apply(e, arguments);
            };
          }
        },
        a = 0,
        c = [
          "log",
          "info",
          "warn",
          "error",
          "dir",
          "time",
          "timeEnd",
          "trace",
          "assert",
        ],
        undefined;
      a < c.length;
      a++
    ) {
      var o;
      var s;
      var a;
      var c;
      s(c[a]);
    }
    return e;
  },
};
exports.enable = function () {
  M_ContextualFilterManager_maybe.channel.registerMonkeyPatch(
    "console",
    exports.console
  );
  require("console");
};
