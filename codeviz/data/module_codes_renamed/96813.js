require.r(exports);
require.d(exports, {
  TextDocument: () => n,
});
var n;
var i = function (e, t, r) {
  if (r || 2 === arguments.length)
    for (i = 0, o = t.length, undefined; i < o; i++) {
      var n;
      var i;
      var o;
      if (!n && i in t) {
        if (n) {
          n = Array.prototype.slice.call(t, 0, i);
        }
        n[i] = t[i];
      }
    }
  return e.concat(n || Array.prototype.slice.call(t));
};
var o = (function () {
  function e(e, t, r, n) {
    this._uri = e;
    this._languageId = t;
    this._version = r;
    this._content = n;
    this._lineOffsets = undefined;
  }
  Object.defineProperty(e.prototype, "uri", {
    get: function () {
      return this._uri;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(e.prototype, "languageId", {
    get: function () {
      return this._languageId;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(e.prototype, "version", {
    get: function () {
      return this._version;
    },
    enumerable: false,
    configurable: true,
  });
  e.prototype.getText = function (e) {
    if (e) {
      var t = this.offsetAt(e.start);
      var r = this.offsetAt(e.end);
      return this._content.substring(t, r);
    }
    return this._content;
  };
  e.prototype.update = function (t, r) {
    for (n = 0, o = t, undefined; n < o.length; n++) {
      var n;
      var o;
      var s = o[n];
      if (e.isIncremental(s)) {
        var l = c(s.range);
        var u = this.offsetAt(l.start);
        var d = this.offsetAt(l.end);
        this._content =
          this._content.substring(0, u) +
          s.text +
          this._content.substring(d, this._content.length);
        var p = Math.max(l.start.line, 0);
        var h = Math.max(l.end.line, 0);
        var f = this._lineOffsets;
        var g = a(s.text, false, u);
        if (h - p === g.length)
          for (m = 0, y = g.length, undefined; m < y; m++) {
            var m;
            var y;
            f[m + p + 1] = g[m];
          }
        else if (g.length < 1e4) {
          f.splice.apply(f, i([p + 1, h - p], g, false));
        } else {
          this._lineOffsets = f = f.slice(0, p + 1).concat(g, f.slice(h + 1));
        }
        var v = s.text.length - (d - u);
        if (0 !== v)
          for (m = p + 1 + g.length, y = f.length; m < y; m++) f[m] = f[m] + v;
      } else {
        if (!e.isFull(s)) throw new Error("Unknown change event received");
        this._content = s.text;
        this._lineOffsets = undefined;
      }
    }
    this._version = r;
  };
  e.prototype.getLineOffsets = function () {
    if (undefined === this._lineOffsets) {
      this._lineOffsets = a(this._content, true);
    }
    return this._lineOffsets;
  };
  e.prototype.positionAt = function (e) {
    e = Math.max(Math.min(e, this._content.length), 0);
    var t = this.getLineOffsets();
    var r = 0;
    var n = t.length;
    if (0 === n)
      return {
        line: 0,
        character: e,
      };
    for (; r < n; ) {
      var i = Math.floor((r + n) / 2);
      if (t[i] > e) {
        n = i;
      } else {
        r = i + 1;
      }
    }
    var o = r - 1;
    return {
      line: o,
      character: e - t[o],
    };
  };
  e.prototype.offsetAt = function (e) {
    var t = this.getLineOffsets();
    if (e.line >= t.length) return this._content.length;
    if (e.line < 0) return 0;
    var r = t[e.line];
    var n = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
    return Math.max(Math.min(r + e.character, n), r);
  };
  Object.defineProperty(e.prototype, "lineCount", {
    get: function () {
      return this.getLineOffsets().length;
    },
    enumerable: false,
    configurable: true,
  });
  e.isIncremental = function (e) {
    var t = e;
    return (
      null != t &&
      "string" == typeof t.text &&
      undefined !== t.range &&
      (undefined === t.rangeLength || "number" == typeof t.rangeLength)
    );
  };
  e.isFull = function (e) {
    var t = e;
    return (
      null != t &&
      "string" == typeof t.text &&
      undefined === t.range &&
      undefined === t.rangeLength
    );
  };
  return e;
})();
function s(e, t) {
  if (e.length <= 1) return e;
  var r = (e.length / 2) | 0;
  var n = e.slice(0, r);
  var i = e.slice(r);
  s(n, t);
  s(i, t);
  for (o = 0, a = 0, c = 0, undefined; o < n.length && a < i.length; ) {
    var o;
    var a;
    var c;
    var l = t(n[o], i[a]);
    e[c++] = l <= 0 ? n[o++] : i[a++];
  }
  for (; o < n.length; ) e[c++] = n[o++];
  for (; a < i.length; ) e[c++] = i[a++];
  return e;
}
function a(e, t, r) {
  if (undefined === r) {
    r = 0;
  }
  for (n = t ? [r] : [], i = 0, undefined; i < e.length; i++) {
    var n;
    var i;
    var o = e.charCodeAt(i);
    if (13 !== o && 10 !== o) {
      if (13 === o && i + 1 < e.length && 10 === e.charCodeAt(i + 1)) {
        i++;
      }
      n.push(r + i + 1);
    }
  }
  return n;
}
function c(e) {
  var t = e.start;
  var r = e.end;
  return t.line > r.line || (t.line === r.line && t.character > r.character)
    ? {
        start: r,
        end: t,
      }
    : e;
}
function l(e) {
  var t = c(e.range);
  return t !== e.range
    ? {
        newText: e.newText,
        range: t,
      }
    : e;
}
!(function (e) {
  e.create = function (e, t, r, n) {
    return new o(e, t, r, n);
  };
  e.update = function (e, t, r) {
    if (e instanceof o) {
      e.update(t, r);
      return e;
    }
    throw new Error(
      "TextDocument.update: document must be created by TextDocument.create"
    );
  };
  e.applyEdits = function (e, t) {
    for (
      r = e.getText(),
        n = 0,
        i = [],
        o = 0,
        a = s(t.map(l), function (e, t) {
          var r = e.range.start.line - t.range.start.line;
          return 0 === r
            ? e.range.start.character - t.range.start.character
            : r;
        }),
        undefined;
      o < a.length;
      o++
    ) {
      var r;
      var n;
      var i;
      var o;
      var a;
      var c = a[o];
      var u = e.offsetAt(c.range.start);
      if (u < n) throw new Error("Overlapping edit");
      if (u > n) {
        i.push(r.substring(n, u));
      }
      if (c.newText.length) {
        i.push(c.newText);
      }
      n = e.offsetAt(c.range.end);
    }
    i.push(r.substr(n));
    return i.join("");
  };
})(n || (n = {}));
