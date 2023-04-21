Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.AbstractMessageBuffer = undefined;
exports.AbstractMessageBuffer = class {
  constructor(e = "utf-8") {
    this._encoding = e;
    this._chunks = [];
    this._totalLength = 0;
  }
  get encoding() {
    return this._encoding;
  }
  append(e) {
    const t = "string" == typeof e ? this.fromString(e, this._encoding) : e;
    this._chunks.push(t);
    this._totalLength += t.byteLength;
  }
  tryReadHeaders() {
    if (0 === this._chunks.length) return;
    let e = 0;
    let t = 0;
    let r = 0;
    let n = 0;
    e: for (; t < this._chunks.length; ) {
      const i = this._chunks[t];
      for (r = 0; r < i.length; ) {
        switch (i[r]) {
          case 13:
            switch (e) {
              case 0:
                e = 1;
                break;
              case 2:
                e = 3;
                break;
              default:
                e = 0;
            }
            break;
          case 10:
            switch (e) {
              case 1:
                e = 2;
                break;
              case 3:
                e = 4;
                r++;
                break e;
              default:
                e = 0;
            }
            break;
          default:
            e = 0;
        }
        r++;
      }
      n += i.byteLength;
      t++;
    }
    if (4 !== e) return;
    const i = this._read(n + r);
    const o = new Map();
    const s = this.toString(i, "ascii").split("\r\n");
    if (s.length < 2) return o;
    for (let e = 0; e < s.length - 2; e++) {
      const t = s[e];
      const r = t.indexOf(":");
      if (-1 === r)
        throw new Error("Message header must separate key and value using :");
      const n = t.substr(0, r);
      const i = t.substr(r + 1).trim();
      o.set(n, i);
    }
    return o;
  }
  tryReadBody(e) {
    if (!(this._totalLength < e)) return this._read(e);
  }
  get numberOfBytes() {
    return this._totalLength;
  }
  _read(e) {
    if (0 === e) return this.emptyBuffer();
    if (e > this._totalLength) throw new Error("Cannot read so many bytes!");
    if (this._chunks[0].byteLength === e) {
      const t = this._chunks[0];
      this._chunks.shift();
      this._totalLength -= e;
      return this.asNative(t);
    }
    if (this._chunks[0].byteLength > e) {
      const t = this._chunks[0];
      const r = this.asNative(t, e);
      this._chunks[0] = t.slice(e);
      this._totalLength -= e;
      return r;
    }
    const t = this.allocNative(e);
    let r = 0;
    for (; e > 0; ) {
      const n = this._chunks[0];
      if (n.byteLength > e) {
        const i = n.slice(0, e);
        t.set(i, r);
        r += e;
        this._chunks[0] = n.slice(e);
        this._totalLength -= e;
        e -= e;
      } else {
        t.set(n, r);
        r += n.byteLength;
        this._chunks.shift();
        this._totalLength -= n.byteLength;
        e -= n.byteLength;
      }
    }
    return t;
  }
};