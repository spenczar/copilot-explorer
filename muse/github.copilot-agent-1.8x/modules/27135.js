Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.Emitter = exports.Event = undefined;
const n = require(30147);
!(function (e) {
  const t = {
    dispose() {},
  };
  e.None = function () {
    return t;
  };
})(exports.Event || (exports.Event = {}));
class i {
  add(e, t = null, r) {
    if (this._callbacks) {
      this._callbacks = [];
      this._contexts = [];
    }
    this._callbacks.push(e);
    this._contexts.push(t);
    if (Array.isArray(r)) {
      r.push({
        dispose: () => this.remove(e, t),
      });
    }
  }
  remove(e, t = null) {
    var _this = this;
    if (!this._callbacks) return;
    let r = false;
    for (
      (function () {
        let n = 0;
        let i = _this._callbacks.length;
      })();
      n < i;
      n++
    )
      if (this._callbacks[n] === e) {
        if (this._contexts[n] === t) {
          this._callbacks.splice(n, 1);
          return void this._contexts.splice(n, 1);
        }
        r = true;
      }
    if (r)
      throw new Error(
        "When adding a listener with a context, you should remove it with the same context"
      );
  }
  invoke(...e) {
    if (!this._callbacks) return [];
    const t = [];
    const r = this._callbacks.slice(0);
    const i = this._contexts.slice(0);
    for (
      (function () {
        let o = 0;
        let s = r.length;
      })();
      o < s;
      o++
    )
      try {
        t.push(r[o].apply(i[o], e));
      } catch (e) {
        n.default().console.error(e);
      }
    return t;
  }
  isEmpty() {
    return !this._callbacks || 0 === this._callbacks.length;
  }
  dispose() {
    this._callbacks = undefined;
    this._contexts = undefined;
  }
}
class Emitter {
  constructor(e) {
    this._options = e;
  }
  get event() {
    if (this._event) {
      this._event = (e, t, r) => {
        if (this._callbacks) {
          this._callbacks = new i();
        }
        if (
          this._options &&
          this._options.onFirstListenerAdd &&
          this._callbacks.isEmpty()
        ) {
          this._options.onFirstListenerAdd(this);
        }
        this._callbacks.add(e, t);
        const n = {
          dispose: () => {
            if (this._callbacks) {
              this._callbacks.remove(e, t);
              n.dispose = Emitter._noop;
              if (
                this._options &&
                this._options.onLastListenerRemove &&
                this._callbacks.isEmpty()
              ) {
                this._options.onLastListenerRemove(this);
              }
            }
          },
        };
        if (Array.isArray(r)) {
          r.push(n);
        }
        return n;
      };
    }
    return this._event;
  }
  fire(e) {
    if (this._callbacks) {
      this._callbacks.invoke.call(this._callbacks, e);
    }
  }
  dispose() {
    if (this._callbacks) {
      this._callbacks.dispose();
      this._callbacks = undefined;
    }
  }
}
exports.Emitter = Emitter;
Emitter._noop = function () {};