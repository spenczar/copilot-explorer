Object.defineProperty(exports, "__esModule", {
  value: true,
});
var n = require(8497);
var i = require(8497);
exports.makePatchingRequire = i.makePatchingRequire;
var o = function (e) {
  return true;
};
var s = (function () {
  function e() {
    this.version = require(99674).i8;
    this.subscribers = {};
    this.contextPreservationFunction = function (e) {
      return e;
    };
    this.knownPatches = {};
    this.currentlyPublishing = false;
  }
  e.prototype.shouldPublish = function (e) {
    var t = this.subscribers[e];
    return (
      !!t &&
      t.some(function (e) {
        var t = e.filter;
        return !t || t(false);
      })
    );
  };
  e.prototype.publish = function (e, t) {
    if (!this.currentlyPublishing) {
      var r = this.subscribers[e];
      if (r) {
        var n = {
          timestamp: Date.now(),
          data: t,
        };
        this.currentlyPublishing = true;
        r.forEach(function (e) {
          var t = e.listener;
          var r = e.filter;
          try {
            if (r && r(true)) {
              t(n);
            }
          } catch (e) {}
        });
        this.currentlyPublishing = false;
      }
    }
  };
  e.prototype.subscribe = function (e, t, r) {
    if (undefined === r) {
      r = o;
    }
    if (this.subscribers[e]) {
      this.subscribers[e] = [];
    }
    this.subscribers[e].push({
      listener: t,
      filter: r,
    });
  };
  e.prototype.unsubscribe = function (e, t, r) {
    if (undefined === r) {
      r = o;
    }
    var n = this.subscribers[e];
    if (n)
      for (var i = 0; i < n.length; ++i)
        if (n[i].listener === t && n[i].filter === r) {
          n.splice(i, 1);
          return true;
        }
    return false;
  };
  e.prototype.reset = function () {
    var e = this;
    this.subscribers = {};
    this.contextPreservationFunction = function (e) {
      return e;
    };
    Object.getOwnPropertyNames(this.knownPatches).forEach(function (t) {
      return delete e.knownPatches[t];
    });
  };
  e.prototype.bindToContext = function (e) {
    return this.contextPreservationFunction(e);
  };
  e.prototype.addContextPreservation = function (e) {
    var t = this.contextPreservationFunction;
    this.contextPreservationFunction = function (r) {
      return e(t(r));
    };
  };
  e.prototype.registerMonkeyPatch = function (e, t) {
    if (this.knownPatches[e]) {
      this.knownPatches[e] = [];
    }
    this.knownPatches[e].push(t);
  };
  e.prototype.getPatchesObject = function () {
    return this.knownPatches;
  };
  return e;
})();
if (global.diagnosticsSource) {
  global.diagnosticsSource = new s();
  require("module").prototype.require = n.makePatchingRequire(
    global.diagnosticsSource.getPatchesObject()
  );
}
exports.channel = global.diagnosticsSource;