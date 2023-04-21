require.r(exports);
require.d(exports, {
  TextDocument: () => i,
});
class n {
  constructor(e, t, r, n) {
    this._uri = e;
    this._languageId = t;
    this._version = r;
    this._content = n;
    this._lineOffsets = undefined;
  }
  get uri() {
    return this._uri;
  }
  get languageId() {
    return this._languageId;
  }
  get version() {
    return this._version;
  }
  getText(e) {
    if (e) {
      const t = this.offsetAt(e.start);
      const r = this.offsetAt(e.end);
      return this._content.substring(t, r);
    }
    return this._content;
  }
  update(e, t) {
    for (let t of e)
      if (n.isIncremental(t)) {
        const e = a(t.range);
        const r = this.offsetAt(e.start);
        const n = this.offsetAt(e.end);
        this._content =
          this._content.substring(0, r) +
          t.text +
          this._content.substring(n, this._content.length);
        const i = Math.max(e.start.line, 0);
        const o = Math.max(e.end.line, 0);
        let c = this._lineOffsets;
        const l = s(t.text, false, r);
        if (o - i === l.length)
          for (
            (function () {
              let e = 0;
              let t = l.length;
            })();
            e < t;
            e++
          )
            c[e + i + 1] = l[e];
        else if (l.length < 1e4) {
          c.splice(i + 1, o - i, ...l);
        } else {
          this._lineOffsets = c = c.slice(0, i + 1).concat(l, c.slice(o + 1));
        }
        const u = t.text.length - (n - r);
        if (0 !== u)
          for (
            (function () {
              let e = i + 1 + l.length;
              let t = c.length;
            })();
            e < t;
            e++
          )
            c[e] = c[e] + u;
      } else {
        if (!n.isFull(t)) throw new Error("Unknown change event received");
        this._content = t.text;
        this._lineOffsets = undefined;
      }
    this._version = t;
  }
  getLineOffsets() {
    if (undefined === this._lineOffsets) {
      this._lineOffsets = s(this._content, true);
    }
    return this._lineOffsets;
  }
  positionAt(e) {
    e = Math.max(Math.min(e, this._content.length), 0);
    let t = this.getLineOffsets();
    let r = 0;
    let n = t.length;
    if (0 === n)
      return {
        line: 0,
        character: e,
      };
    for (; r < n; ) {
      let i = Math.floor((r + n) / 2);
      if (t[i] > e) {
        n = i;
      } else {
        r = i + 1;
      }
    }
    let i = r - 1;
    return {
      line: i,
      character: e - t[i],
    };
  }
  offsetAt(e) {
    let t = this.getLineOffsets();
    if (e.line >= t.length) return this._content.length;
    if (e.line < 0) return 0;
    let r = t[e.line];
    let n = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
    return Math.max(Math.min(r + e.character, n), r);
  }
  get lineCount() {
    return this.getLineOffsets().length;
  }
  static isIncremental(e) {
    let t = e;
    return (
      null != t &&
      "string" == typeof t.text &&
      undefined !== t.range &&
      (undefined === t.rangeLength || "number" == typeof t.rangeLength)
    );
  }
  static isFull(e) {
    let t = e;
    return (
      null != t &&
      "string" == typeof t.text &&
      undefined === t.range &&
      undefined === t.rangeLength
    );
  }
}
var i;
function o(e, t) {
  if (e.length <= 1) return e;
  const r = (e.length / 2) | 0;
  const n = e.slice(0, r);
  const i = e.slice(r);
  o(n, t);
  o(i, t);
  let s = 0;
  let a = 0;
  let c = 0;
  for (; s < n.length && a < i.length; ) {
    let r = t(n[s], i[a]);
    e[c++] = r <= 0 ? n[s++] : i[a++];
  }
  for (; s < n.length; ) e[c++] = n[s++];
  for (; a < i.length; ) e[c++] = i[a++];
  return e;
}
function s(e, t, r = 0) {
  const n = t ? [r] : [];
  for (let t = 0; t < e.length; t++) {
    let i = e.charCodeAt(t);
    if (13 !== i && 10 !== i) {
      if (13 === i && t + 1 < e.length && 10 === e.charCodeAt(t + 1)) {
        t++;
      }
      n.push(r + t + 1);
    }
  }
  return n;
}
function a(e) {
  const t = e.start;
  const r = e.end;
  return t.line > r.line || (t.line === r.line && t.character > r.character)
    ? {
        start: r,
        end: t,
      }
    : e;
}
function c(e) {
  const t = a(e.range);
  return t !== e.range
    ? {
        newText: e.newText,
        range: t,
      }
    : e;
}
!(function (e) {
  e.create = function (e, t, r, i) {
    return new n(e, t, r, i);
  };
  e.update = function (e, t, r) {
    if (e instanceof n) {
      e.update(t, r);
      return e;
    }
    throw new Error(
      "TextDocument.update: document must be created by TextDocument.create"
    );
  };
  e.applyEdits = function (e, t) {
    let r = e.getText();
    let n = o(t.map(c), (e, t) => {
      let r = e.range.start.line - t.range.start.line;
      return 0 === r ? e.range.start.character - t.range.start.character : r;
    });
    let i = 0;
    const s = [];
    for (const t of n) {
      let n = e.offsetAt(t.range.start);
      if (n < i) throw new Error("Overlapping edit");
      if (n > i) {
        s.push(r.substring(i, n));
      }
      if (t.newText.length) {
        s.push(t.newText);
      }
      i = e.offsetAt(t.range.end);
    }
    s.push(r.substr(i));
    return s.join("");
  };
})(i || (i = {}));
