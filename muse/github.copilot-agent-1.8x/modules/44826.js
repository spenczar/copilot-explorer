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
var i = require(66932);
exports.mongo2 = {
  versionSpecifier: ">= 2.0.0 <= 3.0.5",
  patch: function (e) {
    var t = e.instrument({
      operationIdGenerator: {
        next: function () {
          return i.channel.bindToContext(function (e) {
            return e();
          });
        },
      },
    });
    var r = {};
    t.on("started", function (e) {
      if (r[e.requestId]) {
        r[e.requestId] = n({}, e, {
          time: new Date(),
        });
      }
    });
    t.on("succeeded", function (e) {
      var t = r[e.requestId];
      if (t) {
        delete r[e.requestId];
      }
      if ("function" == typeof e.operationId) {
        e.operationId(function () {
          return i.channel.publish("mongodb", {
            startedData: t,
            event: e,
            succeeded: true,
          });
        });
      } else {
        i.channel.publish("mongodb", {
          startedData: t,
          event: e,
          succeeded: true,
        });
      }
    });
    t.on("failed", function (e) {
      var t = r[e.requestId];
      if (t) {
        delete r[e.requestId];
      }
      if ("function" == typeof e.operationId) {
        e.operationId(function () {
          return i.channel.publish("mongodb", {
            startedData: t,
            event: e,
            succeeded: false,
          });
        });
      } else {
        i.channel.publish("mongodb", {
          startedData: t,
          event: e,
          succeeded: false,
        });
      }
    });
    return e;
  },
};
exports.mongo3 = {
  versionSpecifier: "> 3.0.5 < 3.3.0",
  patch: function (e) {
    var t = e.instrument();
    var r = {};
    var o = {};
    t.on("started", function (e) {
      if (r[e.requestId]) {
        o[e.requestId] = i.channel.bindToContext(function (e) {
          return e();
        });
        r[e.requestId] = n({}, e, {
          time: new Date(),
        });
      }
    });
    t.on("succeeded", function (e) {
      var t = r[e.requestId];
      if (t) {
        delete r[e.requestId];
      }
      if ("object" == typeof e && "function" == typeof o[e.requestId]) {
        o[e.requestId](function () {
          return i.channel.publish("mongodb", {
            startedData: t,
            event: e,
            succeeded: true,
          });
        });
        delete o[e.requestId];
      }
    });
    t.on("failed", function (e) {
      var t = r[e.requestId];
      if (t) {
        delete r[e.requestId];
      }
      if ("object" == typeof e && "function" == typeof o[e.requestId]) {
        o[e.requestId](function () {
          return i.channel.publish("mongodb", {
            startedData: t,
            event: e,
            succeeded: false,
          });
        });
        delete o[e.requestId];
      }
    });
    return e;
  },
};
exports.mongo330 = {
  versionSpecifier: ">= 3.3.0 < 4.0.0",
  patch: function (e) {
    !(function (e) {
      var t = e.Server.prototype.connect;
      e.Server.prototype.connect = function () {
        var e = t.apply(this, arguments);
        var r = this.s.coreTopology.s.pool.write;
        this.s.coreTopology.s.pool.write = function () {
          var e = "function" == typeof arguments[1] ? 1 : 2;
          if ("function" == typeof arguments[e]) {
            arguments[e] = i.channel.bindToContext(arguments[e]);
          }
          return r.apply(this, arguments);
        };
        var n = this.s.coreTopology.s.pool.logout;
        this.s.coreTopology.s.pool.logout = function () {
          if ("function" == typeof arguments[1]) {
            arguments[1] = i.channel.bindToContext(arguments[1]);
          }
          return n.apply(this, arguments);
        };
        return e;
      };
    })(e);
    var t = e.instrument();
    var r = {};
    var n = {};
    t.on("started", function (e) {
      if (r[e.requestId]) {
        n[e.requestId] = i.channel.bindToContext(function (e) {
          return e();
        });
        r[e.requestId] = e;
      }
    });
    t.on("succeeded", function (e) {
      var t = r[e.requestId];
      if (t) {
        delete r[e.requestId];
      }
      if ("object" == typeof e && "function" == typeof n[e.requestId]) {
        n[e.requestId](function () {
          return i.channel.publish("mongodb", {
            startedData: t,
            event: e,
            succeeded: true,
          });
        });
        delete n[e.requestId];
      }
    });
    t.on("failed", function (e) {
      var t = r[e.requestId];
      if (t) {
        delete r[e.requestId];
      }
      if ("object" == typeof e && "function" == typeof n[e.requestId]) {
        n[e.requestId](function () {
          return i.channel.publish("mongodb", {
            startedData: t,
            event: e,
            succeeded: false,
          });
        });
        delete n[e.requestId];
      }
    });
    return e;
  },
};
exports.enable = function () {
  i.channel.registerMonkeyPatch("mongodb", exports.mongo2);
  i.channel.registerMonkeyPatch("mongodb", exports.mongo3);
  i.channel.registerMonkeyPatch("mongodb", exports.mongo330);
};