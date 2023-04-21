Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.Semaphore = undefined;
const n = require(30147);
exports.Semaphore = class {
  constructor(e = 1) {
    if (e <= 0) throw new Error("Capacity must be greater than 0");
    this._capacity = e;
    this._active = 0;
    this._waiting = [];
  }
  lock(e) {
    return new Promise((t, r) => {
      this._waiting.push({
        thunk: e,
        resolve: t,
        reject: r,
      });
      this.runNext();
    });
  }
  get active() {
    return this._active;
  }
  runNext() {
    if (0 !== this._waiting.length && this._active !== this._capacity) {
      n.default().timer.setImmediate(() => this.doRunNext());
    }
  }
  doRunNext() {
    if (0 === this._waiting.length || this._active === this._capacity) return;
    const e = this._waiting.shift();
    this._active++;
    if (this._active > this._capacity) throw new Error("To many thunks active");
    try {
      const t = e.thunk();
      if (t instanceof Promise) {
        t.then(
          (t) => {
            this._active--;
            e.resolve(t);
            this.runNext();
          },
          (t) => {
            this._active--;
            e.reject(t);
            this.runNext();
          }
        );
      } else {
        this._active--;
        e.resolve(t);
        this.runNext();
      }
    } catch (t) {
      this._active--;
      e.reject(t);
      this.runNext();
    }
  }
};