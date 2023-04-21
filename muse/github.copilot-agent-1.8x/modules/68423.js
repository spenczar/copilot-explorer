const n = require("util");
const i = require("assert");
const o = require(7267);
const s = require("async_hooks");
const a = "cls@contexts";
const c = "error@context";
const l = process.env.DEBUG_CLS_HOOKED;
let u = -1;
function d(e) {
  this.name = e;
  this.active = null;
  this._set = [];
  this.id = null;
  this._contexts = new Map();
  this._indent = 0;
}
function p(e) {
  return process.namespaces[e];
}
function h(e) {
  let t = p(e);
  i.ok(t, "can't delete nonexistent namespace! \"" + e + '"');
  i.ok(t.id, "don't assign to process.namespaces directly! " + n.inspect(t));
  process.namespaces[e] = null;
}
function f(...e) {
  if (l) {
    process._rawDebug(`${n.format(...e)}`);
  }
}
module.exports = {
  getNamespace: p,
  createNamespace: function (e) {
    i.ok(e, "namespace must be given a name.");
    if (l) {
      f(`NS-CREATING NAMESPACE (${e})`);
    }
    let t = new d(e);
    t.id = u;
    s.createHook({
      init(r, i, o, a) {
        u = s.executionAsyncId();
        if (t.active) {
          if ((t._contexts.set(r, t.active), l)) {
            f(
              `${" ".repeat(
                t._indent < 0 ? 0 : t._indent
              )}INIT [${i}] (${e}) asyncId:${r} currentUid:${u} triggerId:${o} active:${n.inspect(
                t.active,
                {
                  showHidden: !0,
                  depth: 2,
                  colors: !0,
                }
              )} resource:${a}`
            );
          }
        } else if (0 === u) {
          const o = s.triggerAsyncId(),
            c = t._contexts.get(o);
          if (c) {
            if ((t._contexts.set(r, c), l)) {
              f(
                `${" ".repeat(
                  t._indent < 0 ? 0 : t._indent
                )}INIT USING CONTEXT FROM TRIGGERID [${i}] (${e}) asyncId:${r} currentUid:${u} triggerId:${o} active:${n.inspect(
                  t.active,
                  {
                    showHidden: !0,
                    depth: 2,
                    colors: !0,
                  }
                )} resource:${a}`
              );
            }
          } else if (l) {
            f(
              `${" ".repeat(
                t._indent < 0 ? 0 : t._indent
              )}INIT MISSING CONTEXT [${i}] (${e}) asyncId:${r} currentUid:${u} triggerId:${o} active:${n.inspect(
                t.active,
                {
                  showHidden: !0,
                  depth: 2,
                  colors: !0,
                }
              )} resource:${a}`
            );
          }
        }
        if (l && "PROMISE" === i) {
          f(
            n.inspect(a, {
              showHidden: true,
            })
          );
          const s = a.parentId;
          f(
            `${" ".repeat(
              t._indent < 0 ? 0 : t._indent
            )}INIT RESOURCE-PROMISE [${i}] (${e}) parentId:${s} asyncId:${r} currentUid:${u} triggerId:${o} active:${n.inspect(
              t.active,
              {
                showHidden: true,
                depth: 2,
                colors: true,
              }
            )} resource:${a}`
          );
        }
      },
      before(r) {
        let i;
        u = s.executionAsyncId();
        i = t._contexts.get(r) || t._contexts.get(u);
        if (i) {
          if (l) {
            const o = s.triggerAsyncId();
            f(
              `${" ".repeat(
                t._indent < 0 ? 0 : t._indent
              )}BEFORE (${e}) asyncId:${r} currentUid:${u} triggerId:${o} active:${n.inspect(
                t.active,
                {
                  showHidden: !0,
                  depth: 2,
                  colors: !0,
                }
              )} context:${n.inspect(i)}`
            ),
              (t._indent += 2);
          }
          t.enter(i);
        } else if (l) {
          const i = s.triggerAsyncId();
          f(
            `${" ".repeat(
              t._indent < 0 ? 0 : t._indent
            )}BEFORE MISSING CONTEXT (${e}) asyncId:${r} currentUid:${u} triggerId:${i} active:${n.inspect(
              t.active,
              {
                showHidden: !0,
                depth: 2,
                colors: !0,
              }
            )} namespace._contexts:${n.inspect(t._contexts, {
              showHidden: !0,
              depth: 2,
              colors: !0,
            })}`
          ),
            (t._indent += 2);
        }
      },
      after(r) {
        let i;
        u = s.executionAsyncId();
        i = t._contexts.get(r) || t._contexts.get(u);
        if (i) {
          if (l) {
            const o = s.triggerAsyncId();
            t._indent -= 2;
            f(
              `${" ".repeat(
                t._indent < 0 ? 0 : t._indent
              )}AFTER (${e}) asyncId:${r} currentUid:${u} triggerId:${o} active:${n.inspect(
                t.active,
                {
                  showHidden: !0,
                  depth: 2,
                  colors: !0,
                }
              )} context:${n.inspect(i)}`
            );
          }
          t.exit(i);
        } else if (l) {
          const o = s.triggerAsyncId();
          t._indent -= 2;
          f(
            `${" ".repeat(
              t._indent < 0 ? 0 : t._indent
            )}AFTER MISSING CONTEXT (${e}) asyncId:${r} currentUid:${u} triggerId:${o} active:${n.inspect(
              t.active,
              {
                showHidden: !0,
                depth: 2,
                colors: !0,
              }
            )} context:${n.inspect(i)}`
          );
        }
      },
      destroy(r) {
        u = s.executionAsyncId();
        if (l) {
          const i = s.triggerAsyncId();
          f(
            `${" ".repeat(
              t._indent < 0 ? 0 : t._indent
            )}DESTROY (${e}) currentUid:${u} asyncId:${r} triggerId:${i} active:${n.inspect(
              t.active,
              {
                showHidden: !0,
                depth: 2,
                colors: !0,
              }
            )} context:${n.inspect(t._contexts.get(u))}`
          );
        }
        t._contexts.delete(r);
      },
    }).enable();
    process.namespaces[e] = t;
    return t;
  },
  destroyNamespace: h,
  reset: function () {
    if (process.namespaces) {
      Object.keys(process.namespaces).forEach(function (e) {
        h(e);
      });
    }
    process.namespaces = Object.create(null);
  },
  ERROR_SYMBOL: c,
};
d.prototype.set = function (e, t) {
  if (!this.active)
    throw new Error(
      "No context available. ns.run() or ns.bind() must be called first."
    );
  this.active[e] = t;
  if (l) {
    f(
      " ".repeat(this._indent < 0 ? 0 : this._indent) +
        "CONTEXT-SET KEY:" +
        e +
        "=" +
        t +
        " in ns:" +
        this.name +
        " currentUid:" +
        u +
        " active:" +
        n.inspect(this.active, {
          showHidden: true,
          depth: 2,
          colors: true,
        })
    );
  }
  return t;
};
d.prototype.get = function (e) {
  if (this.active) {
    if (l) {
      const t = s.executionAsyncId();
      const r = s.triggerAsyncId();
      const i = " ".repeat(this._indent < 0 ? 0 : this._indent);
      f(
        i +
          "CONTEXT-GETTING KEY:" +
          e +
          "=" +
          this.active[e] +
          " (" +
          this.name +
          ") currentUid:" +
          u +
          " active:" +
          n.inspect(this.active, {
            showHidden: true,
            depth: 2,
            colors: true,
          })
      );
      f(
        `${i}CONTEXT-GETTING KEY: (${this.name}) ${e}=${
          this.active[e]
        } currentUid:${u} asyncHooksCurrentId:${t} triggerId:${r} len:${
          this._set.length
        } active:${n.inspect(this.active)}`
      );
    }
    return this.active[e];
  }
  if (l) {
    const t = s.currentId();
    const r = s.triggerAsyncId();
    f(
      `${" ".repeat(
        this._indent < 0 ? 0 : this._indent
      )}CONTEXT-GETTING KEY NO ACTIVE NS: (${
        this.name
      }) ${e}=undefined currentUid:${u} asyncHooksCurrentId:${t} triggerId:${r} len:${
        this._set.length
      }`
    );
  }
};
d.prototype.createContext = function () {
  let e = Object.create(this.active ? this.active : Object.prototype);
  e._ns_name = this.name;
  e.id = u;
  if (l) {
    const t = s.executionAsyncId(),
      r = s.triggerAsyncId();
    f(
      `${" ".repeat(
        this._indent < 0 ? 0 : this._indent
      )}CONTEXT-CREATED Context: (${
        this.name
      }) currentUid:${u} asyncHooksCurrentId:${t} triggerId:${r} len:${
        this._set.length
      } context:${n.inspect(e, {
        showHidden: !0,
        depth: 2,
        colors: !0,
      })}`
    );
  }
  return e;
};
d.prototype.run = function (e) {
  let t = this.createContext();
  this.enter(t);
  try {
    if (l) {
      const e = s.triggerAsyncId();
      const r = s.executionAsyncId();
      f(
        `${" ".repeat(
          this._indent < 0 ? 0 : this._indent
        )}CONTEXT-RUN BEGIN: (${
          this.name
        }) currentUid:${u} triggerId:${e} asyncHooksCurrentId:${r} len:${
          this._set.length
        } context:${n.inspect(t)}`
      );
    }
    e(t);
    return t;
  } catch (e) {
    throw (e && (e[c] = t), e);
  } finally {
    if (l) {
      const e = s.triggerAsyncId();
      const r = s.executionAsyncId();
      f(
        `${" ".repeat(this._indent < 0 ? 0 : this._indent)}CONTEXT-RUN END: (${
          this.name
        }) currentUid:${u} triggerId:${e} asyncHooksCurrentId:${r} len:${
          this._set.length
        } ${n.inspect(t)}`
      );
    }
    this.exit(t);
  }
};
d.prototype.runAndReturn = function (e) {
  let t;
  this.run(function (r) {
    t = e(r);
  });
  return t;
};
d.prototype.runPromise = function (e) {
  let t = this.createContext();
  this.enter(t);
  let r = e(t);
  if (!r || !r.then || !r.catch) throw new Error("fn must return a promise.");
  if (l) {
    f(
      "CONTEXT-runPromise BEFORE: (" +
        this.name +
        ") currentUid:" +
        u +
        " len:" +
        this._set.length +
        " " +
        n.inspect(t)
    );
  }
  return r
    .then(
      (e) => (
        l &&
          f(
            "CONTEXT-runPromise AFTER then: (" +
              this.name +
              ") currentUid:" +
              u +
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
        l &&
          f(
            "CONTEXT-runPromise AFTER catch: (" +
              this.name +
              ") currentUid:" +
              u +
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
d.prototype.bind = function (e, t) {
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
d.prototype.enter = function (e) {
  i.ok(e, "context must be provided for entering");
  if (l) {
    const t = s.executionAsyncId(),
      r = s.triggerAsyncId();
    f(
      `${" ".repeat(this._indent < 0 ? 0 : this._indent)}CONTEXT-ENTER: (${
        this.name
      }) currentUid:${u} triggerId:${r} asyncHooksCurrentId:${t} len:${
        this._set.length
      } ${n.inspect(e)}`
    );
  }
  this._set.push(this.active);
  this.active = e;
};
d.prototype.exit = function (e) {
  i.ok(e, "context must be provided for exiting");
  if (l) {
    const t = s.executionAsyncId(),
      r = s.triggerAsyncId();
    f(
      `${" ".repeat(this._indent < 0 ? 0 : this._indent)}CONTEXT-EXIT: (${
        this.name
      }) currentUid:${u} triggerId:${r} asyncHooksCurrentId:${t} len:${
        this._set.length
      } ${n.inspect(e)}`
    );
  }
  if (this.active === e) {
    i.ok(this._set.length, "can't remove top context");
    return void (this.active = this._set.pop());
  }
  let t = this._set.lastIndexOf(e);
  if (t < 0) {
    if (l) {
      f(
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
d.prototype.bindEmitter = function (e) {
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
d.prototype.fromException = function (e) {
  return e[c];
};
process.namespaces = {};