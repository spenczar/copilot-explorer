const { EventEmitter: n } = require("events");
const i = Symbol("AbortSignal internals");
class o {
  constructor() {
    this[i] = {
      eventEmitter: new n(),
      onabort: null,
      aborted: false,
    };
  }
  get aborted() {
    return this[i].aborted;
  }
  get onabort() {
    return this[i].onabort;
  }
  set onabort(e) {
    this[i].onabort = e;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  removeEventListener(e, t) {
    this[i].eventEmitter.removeListener(e, t);
  }
  addEventListener(e, t) {
    this[i].eventEmitter.on(e, t);
  }
  dispatchEvent(e) {
    const t = {
      type: e,
      target: this,
    };
    const r = `on${e}`;
    if ("function" == typeof this[i][r]) {
      this[r](t);
    }
    this[i].eventEmitter.emit(e, t);
  }
  fire() {
    this[i].aborted = true;
    this.dispatchEvent("abort");
  }
}
Object.defineProperties(o.prototype, {
  addEventListener: {
    enumerable: true,
  },
  removeEventListener: {
    enumerable: true,
  },
  dispatchEvent: {
    enumerable: true,
  },
  aborted: {
    enumerable: true,
  },
  onabort: {
    enumerable: true,
  },
});
class s extends o {
  constructor(e) {
    if (!Number.isInteger(e))
      throw new TypeError("Expected an integer, got " + typeof e);
    super();
    this[i].timerId = setTimeout(() => {
      this.fire();
    }, e);
  }
  clear() {
    clearTimeout(this[i].timerId);
  }
}
Object.defineProperties(s.prototype, {
  clear: {
    enumerable: true,
  },
});
const a = Symbol("AbortController internals");
class c {
  constructor() {
    this[a] = {
      signal: new o(),
    };
  }
  get signal() {
    return this[a].signal;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  abort() {
    if (this[a].signal.aborted) {
      this[a].signal.fire();
    }
  }
}
Object.defineProperties(c.prototype, {
  signal: {
    enumerable: true,
  },
  abort: {
    enumerable: true,
  },
});
module.exports = {
  AbortController: c,
  AbortSignal: o,
  TimeoutSignal: s,
};