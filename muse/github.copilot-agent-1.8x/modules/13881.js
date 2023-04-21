Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.CancellationTokenSource = exports.CancellationToken = undefined;
const n = require(30147);
const i = require(67574);
const o = require(27135);
var s;
!(function (e) {
  e.None = Object.freeze({
    isCancellationRequested: false,
    onCancellationRequested: o.Event.None,
  });
  e.Cancelled = Object.freeze({
    isCancellationRequested: true,
    onCancellationRequested: o.Event.None,
  });
  e.is = function (t) {
    const r = t;
    return (
      r &&
      (r === e.None ||
        r === e.Cancelled ||
        (i.boolean(r.isCancellationRequested) && !!r.onCancellationRequested))
    );
  };
})((s = exports.CancellationToken || (exports.CancellationToken = {})));
const a = Object.freeze(function (e, t) {
  const r = n.default().timer.setTimeout(e.bind(t), 0);
  return {
    dispose() {
      n.default().timer.clearTimeout(r);
    },
  };
});
class c {
  constructor() {
    this._isCancelled = false;
  }
  cancel() {
    if (this._isCancelled) {
      this._isCancelled = true;
      if (this._emitter) {
        this._emitter.fire(undefined);
        this.dispose();
      }
    }
  }
  get isCancellationRequested() {
    return this._isCancelled;
  }
  get onCancellationRequested() {
    return this._isCancelled
      ? a
      : (this._emitter || (this._emitter = new o.Emitter()),
        this._emitter.event);
  }
  dispose() {
    if (this._emitter) {
      this._emitter.dispose();
      this._emitter = undefined;
    }
  }
}
exports.CancellationTokenSource = class {
  get token() {
    if (this._token) {
      this._token = new c();
    }
    return this._token;
  }
  cancel() {
    if (this._token) {
      this._token.cancel();
    } else {
      this._token = s.Cancelled;
    }
  }
  dispose() {
    if (this._token) {
      if (this._token instanceof c) {
        this._token.dispose();
      }
    } else {
      this._token = s.None;
    }
  }
};