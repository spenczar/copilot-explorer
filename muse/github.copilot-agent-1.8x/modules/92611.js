var n = require("assert");
var i = require(7267);
var o = "cls@contexts";
var s = "error@context";
function a(e) {
  this.name = e;
  this.active = null;
  this._set = [];
  this.id = null;
}
function c(e) {
  return process.namespaces[e];
}
function l(e) {
  var t = c(e);
  n.ok(t, "can't delete nonexistent namespace!");
  n.ok(t.id, "don't assign to process.namespaces directly!");
  process.removeAsyncListener(t.id);
  process.namespaces[e] = null;
}
function u() {
  if (process.namespaces) {
    Object.keys(process.namespaces).forEach(function (e) {
      l(e);
    });
  }
  process.namespaces = Object.create(null);
}
if (process.addAsyncListener) {
  require(71274);
}
a.prototype.set = function (e, t) {
  if (!this.active)
    throw new Error(
      "No context available. ns.run() or ns.bind() must be called first."
    );
  this.active[e] = t;
  return t;
};
a.prototype.get = function (e) {
  if (this.active) return this.active[e];
};
a.prototype.createContext = function () {
  return Object.create(this.active);
};
a.prototype.run = function (e) {
  var t = this.createContext();
  this.enter(t);
  try {
    e(t);
    return t;
  } catch (e) {
    throw (e && (e[s] = t), e);
  } finally {
    this.exit(t);
  }
};
a.prototype.runAndReturn = function (e) {
  var t;
  this.run(function (r) {
    t = e(r);
  });
  return t;
};
a.prototype.bind = function (e, t) {
  if (t) {
    t = this.active ? this.active : this.createContext();
  }
  var r = this;
  return function () {
    r.enter(t);
    try {
      return e.apply(this, arguments);
    } catch (e) {
      throw (e && (e[s] = t), e);
    } finally {
      r.exit(t);
    }
  };
};
a.prototype.enter = function (e) {
  n.ok(e, "context must be provided for entering");
  this._set.push(this.active);
  this.active = e;
};
a.prototype.exit = function (e) {
  n.ok(e, "context must be provided for exiting");
  if (this.active === e)
    return (
      n.ok(this._set.length, "can't remove top context"),
      void (this.active = this._set.pop())
    );
  var t = this._set.lastIndexOf(e);
  n.ok(t >= 0, "context not currently entered; can't exit");
  n.ok(t, "can't remove top context");
  this._set.splice(t, 1);
};
a.prototype.bindEmitter = function (e) {
  n.ok(e.on && e.addListener && e.emit, "can only bind real EEs");
  var t = this;
  var r = "context@" + this.name;
  i(
    e,
    function (e) {
      if (e) {
        if (e[o]) {
          e[o] = Object.create(null);
        }
        e[o][r] = {
          namespace: t,
          context: t.active,
        };
      }
    },
    function (e) {
      if (!e || !e[o]) return e;
      var t = e;
      var r = e[o];
      Object.keys(r).forEach(function (e) {
        var n = r[e];
        t = n.namespace.bind(t, n.context);
      });
      return t;
    }
  );
};
a.prototype.fromException = function (e) {
  return e[s];
};
if (process.namespaces) {
  u();
}
module.exports = {
  getNamespace: c,
  createNamespace: function (e) {
    n.ok(e, "namespace must be given a name!");
    var t = new a(e);
    t.id = process.addAsyncListener({
      create: function () {
        return t.active;
      },
      before: function (e, r) {
        if (r) {
          t.enter(r);
        }
      },
      after: function (e, r) {
        if (r) {
          t.exit(r);
        }
      },
      error: function (e) {
        if (e) {
          t.exit(e);
        }
      },
    });
    process.namespaces[e] = t;
    return t;
  },
  destroyNamespace: l,
  reset: u,
};