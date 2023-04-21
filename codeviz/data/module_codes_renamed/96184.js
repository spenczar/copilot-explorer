var r;
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.LRUCache = exports.LinkedMap = exports.Touch = undefined;
(function (e) {
  e.None = 0;
  e.First = 1;
  e.AsOld = e.First;
  e.Last = 2;
  e.AsNew = e.Last;
})((r = exports.Touch || (exports.Touch = {})));
class LinkedMap {
  constructor() {
    this[Symbol.toStringTag] = "LinkedMap";
    this._map = new Map();
    this._head = undefined;
    this._tail = undefined;
    this._size = 0;
    this._state = 0;
  }
  clear() {
    this._map.clear();
    this._head = undefined;
    this._tail = undefined;
    this._size = 0;
    this._state++;
  }
  isEmpty() {
    return !this._head && !this._tail;
  }
  get size() {
    return this._size;
  }
  get first() {
    var e;
    return null === (e = this._head) || undefined === e ? undefined : e.value;
  }
  get last() {
    var e;
    return null === (e = this._tail) || undefined === e ? undefined : e.value;
  }
  has(e) {
    return this._map.has(e);
  }
  get(e, t = r.None) {
    const n = this._map.get(e);
    if (n) {
      if (t !== r.None) {
        this.touch(n, t);
      }
      return n.value;
    }
  }
  set(e, t, n = r.None) {
    let i = this._map.get(e);
    if (i) {
      i.value = t;
      if (n !== r.None) {
        this.touch(i, n);
      }
    } else {
      switch (
        ((i = {
          key: e,
          value: t,
          next: undefined,
          previous: undefined,
        }),
        n)
      ) {
        case r.None:
          this.addItemLast(i);
          break;
        case r.First:
          this.addItemFirst(i);
          break;
        case r.Last:
        default:
          this.addItemLast(i);
      }
      this._map.set(e, i);
      this._size++;
    }
    return this;
  }
  delete(e) {
    return !!this.remove(e);
  }
  remove(e) {
    const t = this._map.get(e);
    if (t) {
      this._map.delete(e);
      this.removeItem(t);
      this._size--;
      return t.value;
    }
  }
  shift() {
    if (!this._head && !this._tail) return;
    if (!this._head || !this._tail) throw new Error("Invalid list");
    const e = this._head;
    this._map.delete(e.key);
    this.removeItem(e);
    this._size--;
    return e.value;
  }
  forEach(e, t) {
    const r = this._state;
    let n = this._head;
    for (; n; ) {
      if (t) {
        e.bind(t)(n.value, n.key, this);
      } else {
        e(n.value, n.key, this);
      }
      if (this._state !== r)
        throw new Error("LinkedMap got modified during iteration.");
      n = n.next;
    }
  }
  keys() {
    const e = this;
    const t = this._state;
    let r = this._head;
    const n = {
      [Symbol.iterator]: () => n,
      next() {
        if (e._state !== t)
          throw new Error("LinkedMap got modified during iteration.");
        if (r) {
          const e = {
            value: r.key,
            done: false,
          };
          r = r.next;
          return e;
        }
        return {
          value: undefined,
          done: true,
        };
      },
    };
    return n;
  }
  values() {
    const e = this;
    const t = this._state;
    let r = this._head;
    const n = {
      [Symbol.iterator]: () => n,
      next() {
        if (e._state !== t)
          throw new Error("LinkedMap got modified during iteration.");
        if (r) {
          const e = {
            value: r.value,
            done: false,
          };
          r = r.next;
          return e;
        }
        return {
          value: undefined,
          done: true,
        };
      },
    };
    return n;
  }
  entries() {
    const e = this;
    const t = this._state;
    let r = this._head;
    const n = {
      [Symbol.iterator]: () => n,
      next() {
        if (e._state !== t)
          throw new Error("LinkedMap got modified during iteration.");
        if (r) {
          const e = {
            value: [r.key, r.value],
            done: false,
          };
          r = r.next;
          return e;
        }
        return {
          value: undefined,
          done: true,
        };
      },
    };
    return n;
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  trimOld(e) {
    if (e >= this.size) return;
    if (0 === e) return void this.clear();
    let t = this._head;
    let r = this.size;
    for (; t && r > e; ) {
      this._map.delete(t.key);
      t = t.next;
      r--;
    }
    this._head = t;
    this._size = r;
    if (t) {
      t.previous = undefined;
    }
    this._state++;
  }
  addItemFirst(e) {
    if (this._head || this._tail) {
      if (!this._head) throw new Error("Invalid list");
      e.next = this._head;
      this._head.previous = e;
    } else this._tail = e;
    this._head = e;
    this._state++;
  }
  addItemLast(e) {
    if (this._head || this._tail) {
      if (!this._tail) throw new Error("Invalid list");
      e.previous = this._tail;
      this._tail.next = e;
    } else this._head = e;
    this._tail = e;
    this._state++;
  }
  removeItem(e) {
    if (e === this._head && e === this._tail) {
      this._head = undefined;
      this._tail = undefined;
    } else if (e === this._head) {
      if (!e.next) throw new Error("Invalid list");
      e.next.previous = undefined;
      this._head = e.next;
    } else if (e === this._tail) {
      if (!e.previous) throw new Error("Invalid list");
      e.previous.next = undefined;
      this._tail = e.previous;
    } else {
      const t = e.next;
      const r = e.previous;
      if (!t || !r) throw new Error("Invalid list");
      t.previous = r;
      r.next = t;
    }
    e.next = undefined;
    e.previous = undefined;
    this._state++;
  }
  touch(e, t) {
    if (!this._head || !this._tail) throw new Error("Invalid list");
    if (t === r.First || t === r.Last)
      if (t === r.First) {
        if (e === this._head) return;
        const t = e.next;
        const r = e.previous;
        if (e === this._tail) {
          r.next = undefined;
          this._tail = r;
        } else {
          t.previous = r;
          r.next = t;
        }
        e.previous = undefined;
        e.next = this._head;
        this._head.previous = e;
        this._head = e;
        this._state++;
      } else if (t === r.Last) {
        if (e === this._tail) return;
        const t = e.next;
        const r = e.previous;
        if (e === this._head) {
          t.previous = undefined;
          this._head = t;
        } else {
          t.previous = r;
          r.next = t;
        }
        e.next = undefined;
        e.previous = this._tail;
        this._tail.next = e;
        this._tail = e;
        this._state++;
      }
  }
  toJSON() {
    const e = [];
    this.forEach((t, r) => {
      e.push([r, t]);
    });
    return e;
  }
  fromJSON(e) {
    this.clear();
    for (const [t, r] of e) this.set(t, r);
  }
}
exports.LinkedMap = LinkedMap;
exports.LRUCache = class extends LinkedMap {
  constructor(e, t = 1) {
    super();
    this._limit = e;
    this._ratio = Math.min(Math.max(0, t), 1);
  }
  get limit() {
    return this._limit;
  }
  set limit(e) {
    this._limit = e;
    this.checkTrim();
  }
  get ratio() {
    return this._ratio;
  }
  set ratio(e) {
    this._ratio = Math.min(Math.max(0, e), 1);
    this.checkTrim();
  }
  get(e, t = r.AsNew) {
    return super.get(e, t);
  }
  peek(e) {
    return super.get(e, r.None);
  }
  set(e, t) {
    super.set(e, t, r.Last);
    this.checkTrim();
    return this;
  }
  checkTrim() {
    if (this.size > this._limit) {
      this.trimOld(Math.round(this._limit * this._ratio));
    }
  }
};
