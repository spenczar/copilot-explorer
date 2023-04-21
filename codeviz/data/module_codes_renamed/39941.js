const t =
  "object" == typeof performance &&
  performance &&
  "function" == typeof performance.now
    ? performance
    : Date;
const r =
  "function" == typeof AbortController
    ? AbortController
    : class {
        constructor() {
          this.signal = new o();
        }
        abort() {
          this.signal.dispatchEvent("abort");
        }
      };
const n = "function" == typeof AbortSignal;
const i = "function" == typeof r.AbortSignal;
const o = n
  ? AbortSignal
  : i
  ? r.AbortController
  : class {
      constructor() {
        this.aborted = false;
        this._listeners = [];
      }
      dispatchEvent(e) {
        if ("abort" === e) {
          this.aborted = true;
          const t = {
            type: e,
            target: this,
          };
          this.onabort(t);
          this._listeners.forEach((e) => e(t), this);
        }
      }
      onabort() {}
      addEventListener(e, t) {
        if ("abort" === e) {
          this._listeners.push(t);
        }
      }
      removeEventListener(e, t) {
        if ("abort" === e) {
          this._listeners = this._listeners.filter((e) => e !== t);
        }
      }
    };
const s = new Set();
const a = (e, t) => {
  const r = `LRU_CACHE_OPTION_${e}`;
  if (u(r)) {
    d(r, `${e} option`, `options.${t}`, m);
  }
};
const c = (e, t) => {
  const r = `LRU_CACHE_METHOD_${e}`;
  if (u(r)) {
    const { prototype: n } = m;
    const { get: i } = Object.getOwnPropertyDescriptor(n, e);
    d(r, `${e} method`, `cache.${t}()`, i);
  }
};
const l = (...e) => {
  if (
    "object" == typeof process &&
    process &&
    "function" == typeof process.emitWarning
  ) {
    process.emitWarning(...e);
  } else {
    console.error(...e);
  }
};
const u = (e) => !s.has(e);
const d = (e, t, r, n) => {
  s.add(e);
  l(
    `The ${t} is deprecated. Please use ${r} instead.`,
    "DeprecationWarning",
    e,
    n
  );
};
const p = (e) => e && e === Math.floor(e) && e > 0 && isFinite(e);
const h = (e) =>
  p(e)
    ? e <= Math.pow(2, 8)
      ? Uint8Array
      : e <= Math.pow(2, 16)
      ? Uint16Array
      : e <= Math.pow(2, 32)
      ? Uint32Array
      : e <= Number.MAX_SAFE_INTEGER
      ? f
      : null
    : null;
class f extends Array {
  constructor(e) {
    super(e);
    this.fill(0);
  }
}
class g {
  constructor(e) {
    if (0 === e) return [];
    const t = h(e);
    this.heap = new t(e);
    this.length = 0;
  }
  push(e) {
    this.heap[this.length++] = e;
  }
  pop() {
    return this.heap[--this.length];
  }
}
class m {
  constructor(e = {}) {
    const {
      max: t = 0,
      ttl: r,
      ttlResolution: n = 1,
      ttlAutopurge: i,
      updateAgeOnGet: o,
      updateAgeOnHas: c,
      allowStale: d,
      dispose: f,
      disposeAfter: y,
      noDisposeOnSet: v,
      noUpdateTTL: _,
      maxSize: b = 0,
      sizeCalculation: w,
      fetchMethod: C,
      fetchContext: E,
      noDeleteOnFetchRejection: T,
      noDeleteOnStaleGet: S,
    } = e;
    const { length: x, maxAge: k, stale: I } = e instanceof m ? {} : e;
    if (0 !== t && !p(t))
      throw new TypeError("max option must be a nonnegative integer");
    const A = t ? h(t) : Array;
    if (!A) throw new Error("invalid max value: " + t);
    this.max = t;
    this.maxSize = b;
    this.sizeCalculation = w || x;
    if (this.sizeCalculation) {
      if (!this.maxSize)
        throw new TypeError(
          "cannot set sizeCalculation without setting maxSize"
        );
      if ("function" != typeof this.sizeCalculation)
        throw new TypeError("sizeCalculation set to non-function");
    }
    this.fetchMethod = C || null;
    if (this.fetchMethod && "function" != typeof this.fetchMethod)
      throw new TypeError("fetchMethod must be a function if specified");
    this.fetchContext = E;
    if (!this.fetchMethod && void 0 !== E)
      throw new TypeError("cannot set fetchContext without fetchMethod");
    this.keyMap = new Map();
    this.keyList = new Array(t).fill(null);
    this.valList = new Array(t).fill(null);
    this.next = new A(t);
    this.prev = new A(t);
    this.head = 0;
    this.tail = 0;
    this.free = new g(t);
    this.initialFill = 1;
    this.size = 0;
    if ("function" == typeof f) {
      this.dispose = f;
    }
    if ("function" == typeof y) {
      this.disposeAfter = y;
      this.disposed = [];
    } else {
      this.disposeAfter = null;
      this.disposed = null;
    }
    this.noDisposeOnSet = !!v;
    this.noUpdateTTL = !!_;
    this.noDeleteOnFetchRejection = !!T;
    if (0 !== this.maxSize) {
      if (!p(this.maxSize))
        throw new TypeError("maxSize must be a positive integer if specified");
      this.initializeSizeTracking();
    }
    this.allowStale = !!d || !!I;
    this.noDeleteOnStaleGet = !!S;
    this.updateAgeOnGet = !!o;
    this.updateAgeOnHas = !!c;
    this.ttlResolution = p(n) || 0 === n ? n : 1;
    this.ttlAutopurge = !!i;
    this.ttl = r || k || 0;
    if (this.ttl) {
      if (!p(this.ttl))
        throw new TypeError("ttl must be a positive integer if specified");
      this.initializeTTLTracking();
    }
    if (0 === this.max && 0 === this.ttl && 0 === this.maxSize)
      throw new TypeError("At least one of max, maxSize, or ttl is required");
    if (!this.ttlAutopurge && !this.max && !this.maxSize) {
      const e = "LRU_CACHE_UNBOUNDED";
      if (u(e)) {
        s.add(e);
        l(
          "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.",
          "UnboundedCacheWarning",
          e,
          m
        );
      }
    }
    if (I) {
      a("stale", "allowStale");
    }
    if (k) {
      a("maxAge", "ttl");
    }
    if (x) {
      a("length", "sizeCalculation");
    }
  }
  getRemainingTTL(e) {
    return this.has(e, {
      updateAgeOnHas: false,
    })
      ? 1 / 0
      : 0;
  }
  initializeTTLTracking() {
    this.ttls = new f(this.max);
    this.starts = new f(this.max);
    this.setItemTTL = (e, r, n = t.now()) => {
      this.starts[e] = 0 !== r ? n : 0;
      this.ttls[e] = r;
      if (0 !== r && this.ttlAutopurge) {
        const t = setTimeout(() => {
          this.isStale(e) && this.delete(this.keyList[e]);
        }, r + 1);
        t.unref && t.unref();
      }
    };
    this.updateItemAge = (e) => {
      this.starts[e] = 0 !== this.ttls[e] ? t.now() : 0;
    };
    let e = 0;
    const r = () => {
      const r = t.now();
      if (this.ttlResolution > 0) {
        e = r;
        const t = setTimeout(() => (e = 0), this.ttlResolution);
        if (t.unref) {
          t.unref();
        }
      }
      return r;
    };
    this.getRemainingTTL = (t) => {
      const n = this.keyMap.get(t);
      return undefined === n
        ? 0
        : 0 === this.ttls[n] || 0 === this.starts[n]
        ? 1 / 0
        : this.starts[n] + this.ttls[n] - (e || r());
    };
    this.isStale = (t) =>
      0 !== this.ttls[t] &&
      0 !== this.starts[t] &&
      (e || r()) - this.starts[t] > this.ttls[t];
  }
  updateItemAge(e) {}
  setItemTTL(e, t, r) {}
  isStale(e) {
    return false;
  }
  initializeSizeTracking() {
    this.calculatedSize = 0;
    this.sizes = new f(this.max);
    this.removeItemSize = (e) => {
      this.calculatedSize -= this.sizes[e];
      this.sizes[e] = 0;
    };
    this.requireSize = (e, t, r, n) => {
      if (!p(r)) {
        if (!n)
          throw new TypeError("invalid size value (must be positive integer)");
        if ("function" != typeof n)
          throw new TypeError("sizeCalculation must be a function");
        r = n(t, e);
        if (!p(r))
          throw new TypeError(
            "sizeCalculation return invalid (expect positive integer)"
          );
      }
      return r;
    };
    this.addItemSize = (e, t) => {
      this.sizes[e] = t;
      const r = this.maxSize - this.sizes[e];
      for (; this.calculatedSize > r; ) this.evict(true);
      this.calculatedSize += this.sizes[e];
    };
  }
  removeItemSize(e) {}
  addItemSize(e, t) {}
  requireSize(e, t, r, n) {
    if (r || n)
      throw new TypeError("cannot set size without setting maxSize on cache");
  }
  *indexes({ allowStale: e = this.allowStale } = {}) {
    if (this.size)
      for (
        let t = this.tail;
        this.isValidIndex(t) &&
        ((!e && this.isStale(t)) || (yield t), t !== this.head);

      )
        t = this.prev[t];
  }
  *rindexes({ allowStale: e = this.allowStale } = {}) {
    if (this.size)
      for (
        let t = this.head;
        this.isValidIndex(t) &&
        ((!e && this.isStale(t)) || (yield t), t !== this.tail);

      )
        t = this.next[t];
  }
  isValidIndex(e) {
    return this.keyMap.get(this.keyList[e]) === e;
  }
  *entries() {
    for (const e of this.indexes()) yield [this.keyList[e], this.valList[e]];
  }
  *rentries() {
    for (const e of this.rindexes()) yield [this.keyList[e], this.valList[e]];
  }
  *keys() {
    for (const e of this.indexes()) yield this.keyList[e];
  }
  *rkeys() {
    for (const e of this.rindexes()) yield this.keyList[e];
  }
  *values() {
    for (const e of this.indexes()) yield this.valList[e];
  }
  *rvalues() {
    for (const e of this.rindexes()) yield this.valList[e];
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  find(e, t = {}) {
    for (const r of this.indexes())
      if (e(this.valList[r], this.keyList[r], this))
        return this.get(this.keyList[r], t);
  }
  forEach(e, t = this) {
    for (const r of this.indexes())
      e.call(t, this.valList[r], this.keyList[r], this);
  }
  rforEach(e, t = this) {
    for (const r of this.rindexes())
      e.call(t, this.valList[r], this.keyList[r], this);
  }
  get prune() {
    c("prune", "purgeStale");
    return this.purgeStale;
  }
  purgeStale() {
    let e = false;
    for (const t of this.rindexes({
      allowStale: true,
    }))
      if (this.isStale(t)) {
        this.delete(this.keyList[t]);
        e = true;
      }
    return e;
  }
  dump() {
    const e = [];
    for (const r of this.indexes({
      allowStale: true,
    })) {
      const n = this.keyList[r];
      const i = this.valList[r];
      const o = {
        value: this.isBackgroundFetch(i) ? i.__staleWhileFetching : i,
      };
      if (this.ttls) {
        o.ttl = this.ttls[r];
        const e = t.now() - this.starts[r];
        o.start = Math.floor(Date.now() - e);
      }
      if (this.sizes) {
        o.size = this.sizes[r];
      }
      e.unshift([n, o]);
    }
    return e;
  }
  load(e) {
    this.clear();
    for (const [r, n] of e) {
      if (n.start) {
        const e = Date.now() - n.start;
        n.start = t.now() - e;
      }
      this.set(r, n.value, n);
    }
  }
  dispose(e, t, r) {}
  set(
    e,
    t,
    {
      ttl: r = this.ttl,
      start: n,
      noDisposeOnSet: i = this.noDisposeOnSet,
      size: o = 0,
      sizeCalculation: s = this.sizeCalculation,
      noUpdateTTL: a = this.noUpdateTTL,
    } = {}
  ) {
    o = this.requireSize(e, t, o, s);
    if (this.maxSize && o > this.maxSize) return this;
    let c = 0 === this.size ? undefined : this.keyMap.get(e);
    if (undefined === c) {
      c = this.newIndex();
      this.keyList[c] = e;
      this.valList[c] = t;
      this.keyMap.set(e, c);
      this.next[this.tail] = c;
      this.prev[c] = this.tail;
      this.tail = c;
      this.size++;
      this.addItemSize(c, o);
      a = false;
    } else {
      const r = this.valList[c];
      if (t !== r) {
        if (this.isBackgroundFetch(r)) {
          r.__abortController.abort();
        } else {
          if (i) {
            this.dispose(r, e, "set");
            if (this.disposeAfter) {
              this.disposed.push([r, e, "set"]);
            }
          }
        }
        this.removeItemSize(c);
        this.valList[c] = t;
        this.addItemSize(c, o);
      }
      this.moveToTail(c);
    }
    if (0 === r || 0 !== this.ttl || this.ttls) {
      this.initializeTTLTracking();
    }
    if (a) {
      this.setItemTTL(c, r, n);
    }
    if (this.disposeAfter)
      for (; this.disposed.length; )
        this.disposeAfter(...this.disposed.shift());
    return this;
  }
  newIndex() {
    return 0 === this.size
      ? this.tail
      : this.size === this.max && 0 !== this.max
      ? this.evict(false)
      : 0 !== this.free.length
      ? this.free.pop()
      : this.initialFill++;
  }
  pop() {
    if (this.size) {
      const e = this.valList[this.head];
      this.evict(true);
      return e;
    }
  }
  evict(e) {
    const t = this.head;
    const r = this.keyList[t];
    const n = this.valList[t];
    if (this.isBackgroundFetch(n)) {
      n.__abortController.abort();
    } else {
      this.dispose(n, r, "evict");
      if (this.disposeAfter) {
        this.disposed.push([n, r, "evict"]);
      }
    }
    this.removeItemSize(t);
    if (e) {
      this.keyList[t] = null;
      this.valList[t] = null;
      this.free.push(t);
    }
    this.head = this.next[t];
    this.keyMap.delete(r);
    this.size--;
    return t;
  }
  has(e, { updateAgeOnHas: t = this.updateAgeOnHas } = {}) {
    const r = this.keyMap.get(e);
    return (
      undefined !== r && !this.isStale(r) && (t && this.updateItemAge(r), true)
    );
  }
  peek(e, { allowStale: t = this.allowStale } = {}) {
    const r = this.keyMap.get(e);
    if (undefined !== r && (t || !this.isStale(r))) {
      const e = this.valList[r];
      return this.isBackgroundFetch(e) ? e.__staleWhileFetching : e;
    }
  }
  backgroundFetch(e, t, n, i) {
    const o = undefined === t ? undefined : this.valList[t];
    if (this.isBackgroundFetch(o)) return o;
    const s = new r();
    const a = {
      signal: s.signal,
      options: n,
      context: i,
    };
    const c = new Promise((t) => t(this.fetchMethod(e, o, a))).then(
      (t) => (s.signal.aborted || this.set(e, t, a.options), t),
      (r) => {
        if (this.valList[t] === c) {
          if (
            n.noDeleteOnFetchRejection &&
            undefined !== c.__staleWhileFetching
          ) {
            this.valList[t] = c.__staleWhileFetching;
          } else {
            this.delete(e);
          }
        }
        if (c.__returned === c) throw r;
      }
    );
    c.__abortController = s;
    c.__staleWhileFetching = o;
    c.__returned = null;
    if (undefined === t) {
      this.set(e, c, a.options);
      t = this.keyMap.get(e);
    } else {
      this.valList[t] = c;
    }
    return c;
  }
  isBackgroundFetch(e) {
    return (
      e &&
      "object" == typeof e &&
      "function" == typeof e.then &&
      Object.prototype.hasOwnProperty.call(e, "__staleWhileFetching") &&
      Object.prototype.hasOwnProperty.call(e, "__returned") &&
      (e.__returned === e || null === e.__returned)
    );
  }
  async fetch(
    e,
    {
      allowStale: t = this.allowStale,
      updateAgeOnGet: r = this.updateAgeOnGet,
      noDeleteOnStaleGet: n = this.noDeleteOnStaleGet,
      ttl: i = this.ttl,
      noDisposeOnSet: o = this.noDisposeOnSet,
      size: s = 0,
      sizeCalculation: a = this.sizeCalculation,
      noUpdateTTL: c = this.noUpdateTTL,
      noDeleteOnFetchRejection: l = this.noDeleteOnFetchRejection,
      fetchContext: u = this.fetchContext,
      forceRefresh: d = false,
    } = {}
  ) {
    if (!this.fetchMethod)
      return this.get(e, {
        allowStale: t,
        updateAgeOnGet: r,
        noDeleteOnStaleGet: n,
      });
    const p = {
      allowStale: t,
      updateAgeOnGet: r,
      noDeleteOnStaleGet: n,
      ttl: i,
      noDisposeOnSet: o,
      size: s,
      sizeCalculation: a,
      noUpdateTTL: c,
      noDeleteOnFetchRejection: l,
    };
    let h = this.keyMap.get(e);
    if (undefined === h) {
      const t = this.backgroundFetch(e, h, p, u);
      return (t.__returned = t);
    }
    {
      const n = this.valList[h];
      if (this.isBackgroundFetch(n))
        return t && undefined !== n.__staleWhileFetching
          ? n.__staleWhileFetching
          : (n.__returned = n);
      if (!d && !this.isStale(h)) {
        this.moveToTail(h);
        if (r) {
          this.updateItemAge(h);
        }
        return n;
      }
      const i = this.backgroundFetch(e, h, p, u);
      return t && undefined !== i.__staleWhileFetching
        ? i.__staleWhileFetching
        : (i.__returned = i);
    }
  }
  get(
    e,
    {
      allowStale: t = this.allowStale,
      updateAgeOnGet: r = this.updateAgeOnGet,
      noDeleteOnStaleGet: n = this.noDeleteOnStaleGet,
    } = {}
  ) {
    const i = this.keyMap.get(e);
    if (undefined !== i) {
      const o = this.valList[i];
      const s = this.isBackgroundFetch(o);
      if (this.isStale(i))
        return s
          ? t
            ? o.__staleWhileFetching
            : undefined
          : (n || this.delete(e), t ? o : undefined);
      if (s) return;
      this.moveToTail(i);
      if (r) {
        this.updateItemAge(i);
      }
      return o;
    }
  }
  connect(e, t) {
    this.prev[t] = e;
    this.next[e] = t;
  }
  moveToTail(e) {
    if (e !== this.tail) {
      if (e === this.head) {
        this.head = this.next[e];
      } else {
        this.connect(this.prev[e], this.next[e]);
      }
      this.connect(this.tail, e);
      this.tail = e;
    }
  }
  get del() {
    c("del", "delete");
    return this.delete;
  }
  delete(e) {
    let t = false;
    if (0 !== this.size) {
      const r = this.keyMap.get(e);
      if (undefined !== r) {
        t = true;
        if (1 === this.size) this.clear();
        else {
          this.removeItemSize(r);
          const t = this.valList[r];
          if (this.isBackgroundFetch(t)) {
            t.__abortController.abort();
          } else {
            this.dispose(t, e, "delete");
            if (this.disposeAfter) {
              this.disposed.push([t, e, "delete"]);
            }
          }
          this.keyMap.delete(e);
          this.keyList[r] = null;
          this.valList[r] = null;
          if (r === this.tail) {
            this.tail = this.prev[r];
          } else {
            if (r === this.head) {
              this.head = this.next[r];
            } else {
              this.next[this.prev[r]] = this.next[r];
              this.prev[this.next[r]] = this.prev[r];
            }
          }
          this.size--;
          this.free.push(r);
        }
      }
    }
    if (this.disposed)
      for (; this.disposed.length; )
        this.disposeAfter(...this.disposed.shift());
    return t;
  }
  clear() {
    for (const e of this.rindexes({
      allowStale: true,
    })) {
      const t = this.valList[e];
      if (this.isBackgroundFetch(t)) t.__abortController.abort();
      else {
        const r = this.keyList[e];
        this.dispose(t, r, "delete");
        if (this.disposeAfter) {
          this.disposed.push([t, r, "delete"]);
        }
      }
    }
    this.keyMap.clear();
    this.valList.fill(null);
    this.keyList.fill(null);
    if (this.ttls) {
      this.ttls.fill(0);
      this.starts.fill(0);
    }
    if (this.sizes) {
      this.sizes.fill(0);
    }
    this.head = 0;
    this.tail = 0;
    this.initialFill = 1;
    this.free.length = 0;
    this.calculatedSize = 0;
    this.size = 0;
    if (this.disposed)
      for (; this.disposed.length; )
        this.disposeAfter(...this.disposed.shift());
  }
  get reset() {
    c("reset", "clear");
    return this.clear;
  }
  get length() {
    ((e, t) => {
      const r = `LRU_CACHE_PROPERTY_${e}`;
      if (u(r)) {
        const { prototype: t } = m;
        const { get: n } = Object.getOwnPropertyDescriptor(t, e);
        d(r, `${e} property`, "cache.size", n);
      }
    })("length");
    return this.size;
  }
  static get AbortController() {
    return r;
  }
  static get AbortSignal() {
    return o;
  }
}
module.exports = m;
