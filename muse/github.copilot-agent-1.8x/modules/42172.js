const n = require("util");
const i = require("assert");
const o = require(7267);
const s = require(20632);
const a = "cls@contexts";
const c = "error@context";
const l = [];
for (let e in s.providers) l[s.providers[e]] = e;
const u = process.env.DEBUG_CLS_HOOKED;
let d = -1;
function p(e) {
  this.name = e;
  this.active = null;
  this._set = [];
  this.id = null;
  this._contexts = new Map();
}
function h(e) {
  return process.namespaces[e];
}
function f(e) {
  let t = h(e);
  i.ok(t, "can't delete nonexistent namespace! \"" + e + '"');
  i.ok(t.id, "don't assign to process.namespaces directly! " + n.inspect(t));
  process.namespaces[e] = null;
}
function g(e) {
  if (process.env.DEBUG) {
    process._rawDebug(e);
  }
}
function m(e) {
  return e
    ? "function" == typeof e
      ? e.name
        ? e.name
        : (e
            .toString()
            .trim()
            .match(/^function\s*([^\s(]+)/) || [])[1]
      : e.constructor && e.constructor.name
      ? e.constructor.name
      : undefined
    : e;
}
module.exports = {
  getNamespace: h,
  createNamespace: function (e) {
    i.ok(e, "namespace must be given a name.");
    if (u) {
      g("CREATING NAMESPACE " + e);
    }
    let t = new p(e);
    t.id = d;
    s.addHooks({
      init(r, i, o, s, a) {
        d = r;
        if (s) {
          t._contexts.set(r, t._contexts.get(s));
          if (u) {
            g(
              "PARENTID: " + e + " uid:" + r + " parent:" + s + " provider:" + o
            );
          }
        } else {
          t._contexts.set(d, t.active);
        }
        if (u) {
          g(
            "INIT " +
              e +
              " uid:" +
              r +
              " parent:" +
              s +
              " provider:" +
              l[o] +
              " active:" +
              n.inspect(t.active, true)
          );
        }
      },
      pre(r, i) {
        d = r;
        let o = t._contexts.get(r);
        if (o) {
          if (u) {
            g(
              " PRE " +
                e +
                " uid:" +
                r +
                " handle:" +
                m(i) +
                " context:" +
                n.inspect(o)
            );
          }
          t.enter(o);
        } else {
          if (u) {
            g(" PRE MISSING CONTEXT " + e + " uid:" + r + " handle:" + m(i));
          }
        }
      },
      post(r, i) {
        d = r;
        let o = t._contexts.get(r);
        if (o) {
          if (u) {
            g(
              " POST " +
                e +
                " uid:" +
                r +
                " handle:" +
                m(i) +
                " context:" +
                n.inspect(o)
            );
          }
          t.exit(o);
        } else {
          if (u) {
            g(" POST MISSING CONTEXT " + e + " uid:" + r + " handle:" + m(i));
          }
        }
      },
      destroy(r) {
        d = r;
        if (u) {
          g(
            "DESTROY " +
              e +
              " uid:" +
              r +
              " context:" +
              n.inspect(t._contexts.get(d)) +
              " active:" +
              n.inspect(t.active, true)
          );
        }
        t._contexts.delete(r);
      },
    });
    process.namespaces[e] = t;
    return t;
  },
  destroyNamespace: f,
  reset: function () {
    if (process.namespaces) {
      Object.keys(process.namespaces).forEach(function (e) {
        f(e);
      });
    }
    process.namespaces = Object.create(null);
  },
  ERROR_SYMBOL: c,
};
p.prototype.set = function (e, t) {
  if (!this.active)
    throw new Error(
      "No context available. ns.run() or ns.bind() must be called first."
    );
  if (u) {
    g(
      "    SETTING KEY:" +
        e +
        "=" +
        t +
        " in ns:" +
        this.name +
        " uid:" +
        d +
        " active:" +
        n.inspect(this.active, true)
    );
  }
  this.active[e] = t;
  return t;
};
p.prototype.get = function (e) {
  if (this.active) {
    if (u) {
      g(
        "    GETTING KEY:" +
          e +
          "=" +
          this.active[e] +
          " " +
          this.name +
          " uid:" +
          d +
          " active:" +
          n.inspect(this.active, true)
      );
    }
    return this.active[e];
  }
  if (u) {
    g(
      "    GETTING KEY:" +
        e +
        "=undefined " +
        this.name +
        " uid:" +
        d +
        " active:" +
        n.inspect(this.active, true)
    );
  }
};
p.prototype.createContext = function () {
  if (u) {
    g(
      "   CREATING Context: " +
        this.name +
        " uid:" +
        d +
        " len:" +
        this._set.length +
        "  active:" +
        n.inspect(this.active, true, 2, true)
    );
  }
  let e = Object.create(this.active ? this.active : Object.prototype);
  e._ns_name = this.name;
  e.id = d;
  if (u) {
    g(
      "   CREATED Context: " +
        this.name +
        " uid:" +
        d +
        " len:" +
        this._set.length +
        "  context:" +
        n.inspect(e, true, 2, true)
    );
  }
  return e;
};
p.prototype.run = function (e) {
  let t = this.createContext();
  this.enter(t);
  try {
    if (u) {
      g(
        " BEFORE RUN: " +
          this.name +
          " uid:" +
          d +
          " len:" +
          this._set.length +
          " " +
          n.inspect(t)
      );
    }
    e(t);
    return t;
  } catch (e) {
    throw (e && (e[c] = t), e);
  } finally {
    if (u) {
      g(
        " AFTER RUN: " +
          this.name +
          " uid:" +
          d +
          " len:" +
          this._set.length +
          " " +
          n.inspect(t)
      );
    }
    this.exit(t);
  }
};
p.prototype.runAndReturn = function (e) {
  var t;
  this.run(function (r) {
    t = e(r);
  });
  return t;
};
p.prototype.runPromise = function (e) {
  let t = this.createContext();
  this.enter(t);
  let r = e(t);
  if (!r || !r.then || !r.catch) throw new Error("fn must return a promise.");
  if (u) {
    g(
      " BEFORE runPromise: " +
        this.name +
        " uid:" +
        d +
        " len:" +
        this._set.length +
        " " +
        n.inspect(t)
    );
  }
  return r
    .then(
      (e) => (
        u &&
          g(
            " AFTER runPromise: " +
              this.name +
              " uid:" +
              d +
              " len:" +
              this._set.length +
              " " +
              n.inspect(t)
          ),
        this.exit(t),
        e
      )
    )
    .catch((e) => {
      throw (
        ((e[c] = t),
        u &&
          g(
            " AFTER runPromise: " +
              this.name +
              " uid:" +
              d +
              " len:" +
              this._set.length +
              " " +
              n.inspect(t)
          ),
        this.exit(t),
        e)
      );
    });
};
p.prototype.bind = function (e, t) {
  if (t) {
    t = this.active ? this.active : this.createContext();
  }
  let r = this;
  return function () {
    r.enter(t);
    try {
      return e.apply(this, arguments);
    } catch (e) {
      throw (e && (e[c] = t), e);
    } finally {
      r.exit(t);
    }
  };
};
p.prototype.enter = function (e) {
  i.ok(e, "context must be provided for entering");
  if (u) {
    g(
      "  ENTER " +
        this.name +
        " uid:" +
        d +
        " len:" +
        this._set.length +
        " context: " +
        n.inspect(e)
    );
  }
  this._set.push(this.active);
  this.active = e;
};
p.prototype.exit = function (e) {
  i.ok(e, "context must be provided for exiting");
  if (u) {
    g(
      "  EXIT " +
        this.name +
        " uid:" +
        d +
        " len:" +
        this._set.length +
        " context: " +
        n.inspect(e)
    );
  }
  if (this.active === e)
    return (
      i.ok(this._set.length, "can't remove top context"),
      void (this.active = this._set.pop())
    );
  let t = this._set.lastIndexOf(e);
  if (t < 0) {
    if (u) {
      g(
        "??ERROR?? context exiting but not entered - ignoring: " + n.inspect(e)
      );
    }
    i.ok(
      t >= 0,
      "context not currently entered; can't exit. \n" +
        n.inspect(this) +
        "\n" +
        n.inspect(e)
    );
  } else {
    i.ok(t, "can't remove top context");
    this._set.splice(t, 1);
  }
};
p.prototype.bindEmitter = function (e) {
  i.ok(e.on && e.addListener && e.emit, "can only bind real EEs");
  let t = this;
  let r = "context@" + this.name;
  o(
    e,
    function (e) {
      if (e) {
        if (e[a]) {
          e[a] = Object.create(null);
        }
        e[a][r] = {
          namespace: t,
          context: t.active,
        };
      }
    },
    function (e) {
      if (!e || !e[a]) return e;
      let t = e;
      let r = e[a];
      Object.keys(r).forEach(function (e) {
        let n = r[e];
        t = n.namespace.bind(t, n.context);
      });
      return t;
    }
  );
};
p.prototype.fromException = function (e) {
  return e[c];
};
process.namespaces = {};
if (s._state && !s._state.enabled) {
  s.enable();
}
if (u) {
  var y = require(26818);
  for (var v in y.filter._modifiers) y.filter.deattach(v);
}