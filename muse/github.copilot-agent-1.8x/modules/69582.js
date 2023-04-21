Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.CancellationTokenSource = exports.MergedToken = undefined;
const r = Object.freeze(function (e, t) {
  const r = setTimeout(e.bind(t), 0);
  return {
    dispose() {
      clearTimeout(r);
    },
  };
});
const n = Object.freeze({
  isCancellationRequested: false,
  onCancellationRequested: () => ({
    dispose: () => {},
  }),
});
const i = Object.freeze({
  isCancellationRequested: true,
  onCancellationRequested: r,
});
class o {
  constructor() {
    this._isCancelled = false;
    this.handlers = [];
  }
  cancel() {
    if (this._isCancelled) {
      this._isCancelled = true;
      this.handlers.forEach((e) => e(undefined));
    }
  }
  get isCancellationRequested() {
    return this._isCancelled;
  }
  onCancellationRequested(e, t, n) {
    return this._isCancelled
      ? r(e, t)
      : (this.handlers.push(e.bind(t)),
        {
          dispose: () => {},
        });
  }
  dispose() {
    this.handlers = [];
  }
}
exports.MergedToken = class {
  cancel() {
    if (this._isCancelled) {
      this._isCancelled = true;
      this.handlers.forEach((e) => e(undefined));
    }
  }
  constructor(e) {
    this.tokens = [];
    this.handlers = [];
    this._isCancelled = false;
    this.tokens = e;
    this._isCancelled = e.some((e) => e.isCancellationRequested);
    e.forEach((e) => {
      e.onCancellationRequested(this.cancel, this);
    });
  }
  dispose() {
    this.tokens = [];
  }
  get isCancellationRequested() {
    return this.tokens.some((e) => e.isCancellationRequested);
  }
  onCancellationRequested(e, t, n) {
    return this._isCancelled
      ? r(e, t)
      : (this.handlers.push(e.bind(t)),
        {
          dispose: () => {},
        });
  }
};
exports.CancellationTokenSource = class {
  constructor(e) {
    this._token = undefined;
    this._parentListener = undefined;
    this._parentListener = e && e.onCancellationRequested(this.cancel, this);
  }
  get token() {
    if (this._token) {
      this._token = new o();
    }
    return this._token;
  }
  cancel() {
    if (this._token) {
      if (this._token instanceof o) {
        this._token.cancel();
      }
    } else {
      this._token = i;
    }
  }
  dispose(e = false) {
    if (e) {
      this.cancel();
    }
    if (this._parentListener) {
      this._parentListener.dispose();
    }
    if (this._token) {
      if (this._token instanceof o) {
        this._token.dispose();
      }
    } else {
      this._token = n;
    }
  }
};