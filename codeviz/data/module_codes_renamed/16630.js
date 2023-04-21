var n;
require.r(exports);
require.d(exports, {
  URI: () => i,
  Utils: () => o,
});
n = (() => {
  var e = {
    470: (e) => {
      function t(e) {
        if ("string" != typeof e)
          throw new TypeError(
            "Path must be a string. Received " + JSON.stringify(e)
          );
      }
      function r(e, t) {
        for (
          n = "", i = 0, o = -1, s = 0, a = 0, undefined;
          a <= e.length;
          ++a
        ) {
          var r;
          var n;
          var i;
          var o;
          var s;
          var a;
          if (a < e.length) r = e.charCodeAt(a);
          else {
            if (47 === r) break;
            r = 47;
          }
          if (47 === r) {
            if (o === a - 1 || 1 === s);
            else if (o !== a - 1 && 2 === s) {
              if (
                n.length < 2 ||
                2 !== i ||
                46 !== n.charCodeAt(n.length - 1) ||
                46 !== n.charCodeAt(n.length - 2)
              )
                if (n.length > 2) {
                  var c = n.lastIndexOf("/");
                  if (c !== n.length - 1) {
                    if (-1 === c) {
                      n = "";
                      i = 0;
                    } else {
                      i = (n = n.slice(0, c)).length - 1 - n.lastIndexOf("/");
                    }
                    o = a;
                    s = 0;
                    continue;
                  }
                } else if (2 === n.length || 1 === n.length) {
                  n = "";
                  i = 0;
                  o = a;
                  s = 0;
                  continue;
                }
              if (t) {
                if (n.length > 0) {
                  n += "/..";
                } else {
                  n = "..";
                }
                i = 2;
              }
            } else {
              if (n.length > 0) {
                n += "/" + e.slice(o + 1, a);
              } else {
                n = e.slice(o + 1, a);
              }
              i = a - o - 1;
            }
            o = a;
            s = 0;
          } else if (46 === r && -1 !== s) {
            ++s;
          } else {
            s = -1;
          }
        }
        return n;
      }
      var n = {
        resolve: function () {
          for (
            n = "", i = false, o = arguments.length - 1, undefined;
            o >= -1 && !i;
            o--
          ) {
            var e;
            var n;
            var i;
            var o;
            var s;
            if (o >= 0) {
              s = arguments[o];
            } else {
              if (undefined === e) {
                e = process.cwd();
              }
              s = e;
            }
            t(s);
            if (0 !== s.length) {
              n = s + "/" + n;
              i = 47 === s.charCodeAt(0);
            }
          }
          n = r(n, !i);
          return i ? (n.length > 0 ? "/" + n : "/") : n.length > 0 ? n : ".";
        },
        normalize: function (e) {
          t(e);
          if (0 === e.length) return ".";
          var n = 47 === e.charCodeAt(0);
          var i = 47 === e.charCodeAt(e.length - 1);
          if (0 !== (e = r(e, !n)).length || n) {
            e = ".";
          }
          if (e.length > 0 && i) {
            e += "/";
          }
          return n ? "/" + e : e;
        },
        isAbsolute: function (e) {
          t(e);
          return e.length > 0 && 47 === e.charCodeAt(0);
        },
        join: function () {
          if (0 === arguments.length) return ".";
          for (r = 0, undefined; r < arguments.length; ++r) {
            var e;
            var r;
            var i = arguments[r];
            t(i);
            if (i.length > 0) {
              if (undefined === e) {
                e = i;
              } else {
                e += "/" + i;
              }
            }
          }
          return undefined === e ? "." : n.normalize(e);
        },
        relative: function (e, r) {
          t(e);
          t(r);
          if (e === r) return "";
          if ((e = n.resolve(e)) === (r = n.resolve(r))) return "";
          for (var i = 1; i < e.length && 47 === e.charCodeAt(i); ++i);
          for (
            o = e.length, s = o - i, a = 1, undefined;
            a < r.length && 47 === r.charCodeAt(a);
            ++a
          ) {
            var o;
            var s;
            var a;
          }
          for (
            c = r.length - a, l = s < c ? s : c, u = -1, d = 0, undefined;
            d <= l;
            ++d
          ) {
            var c;
            var l;
            var u;
            var d;
            if (d === l) {
              if (c > l) {
                if (47 === r.charCodeAt(a + d)) return r.slice(a + d + 1);
                if (0 === d) return r.slice(a + d);
              } else if (s > l) {
                if (47 === e.charCodeAt(i + d)) {
                  u = d;
                } else {
                  if (0 === d) {
                    u = 0;
                  }
                }
              }
              break;
            }
            var p = e.charCodeAt(i + d);
            if (p !== r.charCodeAt(a + d)) break;
            if (47 === p) {
              u = d;
            }
          }
          var h = "";
          for (d = i + u + 1; d <= o; ++d)
            if (d !== o && 47 !== e.charCodeAt(d)) {
              if (0 === h.length) {
                h += "..";
              } else {
                h += "/..";
              }
            }
          return h.length > 0
            ? h + r.slice(a + u)
            : ((a += u), 47 === r.charCodeAt(a) && ++a, r.slice(a));
        },
        _makeLong: function (e) {
          return e;
        },
        dirname: function (e) {
          t(e);
          if (0 === e.length) return ".";
          for (
            r = e.charCodeAt(0),
              n = 47 === r,
              i = -1,
              o = true,
              s = e.length - 1,
              undefined;
            s >= 1;
            --s
          ) {
            var r;
            var n;
            var i;
            var o;
            var s;
            if (47 === (r = e.charCodeAt(s))) {
              if (!o) {
                i = s;
                break;
              }
            } else o = false;
          }
          return -1 === i
            ? n
              ? "/"
              : "."
            : n && 1 === i
            ? "//"
            : e.slice(0, i);
        },
        basename: function (e, r) {
          if (undefined !== r && "string" != typeof r)
            throw new TypeError('"ext" argument must be a string');
          t(e);
          var n;
          var i = 0;
          var o = -1;
          var s = true;
          if (undefined !== r && r.length > 0 && r.length <= e.length) {
            if (r.length === e.length && r === e) return "";
            var a = r.length - 1;
            var c = -1;
            for (n = e.length - 1; n >= 0; --n) {
              var l = e.charCodeAt(n);
              if (47 === l) {
                if (!s) {
                  i = n + 1;
                  break;
                }
              } else {
                if (-1 === c) {
                  s = false;
                  c = n + 1;
                }
                if (a >= 0) {
                  if (l === r.charCodeAt(a)) {
                    if (-1 == --a) {
                      o = n;
                    }
                  } else {
                    a = -1;
                    o = c;
                  }
                }
              }
            }
            if (i === o) {
              o = c;
            } else {
              if (-1 === o) {
                o = e.length;
              }
            }
            return e.slice(i, o);
          }
          for (n = e.length - 1; n >= 0; --n)
            if (47 === e.charCodeAt(n)) {
              if (!s) {
                i = n + 1;
                break;
              }
            } else if (-1 === o) {
              s = false;
              o = n + 1;
            }
          return -1 === o ? "" : e.slice(i, o);
        },
        extname: function (e) {
          t(e);
          for (
            r = -1, n = 0, i = -1, o = true, s = 0, a = e.length - 1, undefined;
            a >= 0;
            --a
          ) {
            var r;
            var n;
            var i;
            var o;
            var s;
            var a;
            var c = e.charCodeAt(a);
            if (47 !== c) {
              if (-1 === i) {
                o = false;
                i = a + 1;
              }
              if (46 === c) {
                if (-1 === r) {
                  r = a;
                } else {
                  if (1 !== s) {
                    s = 1;
                  }
                }
              } else {
                if (-1 !== r) {
                  s = -1;
                }
              }
            } else if (!o) {
              n = a + 1;
              break;
            }
          }
          return -1 === r ||
            -1 === i ||
            0 === s ||
            (1 === s && r === i - 1 && r === n + 1)
            ? ""
            : e.slice(r, i);
        },
        format: function (e) {
          if (null === e || "object" != typeof e)
            throw new TypeError(
              'The "pathObject" argument must be of type Object. Received type ' +
                typeof e
            );
          return (function (e, t) {
            var r = t.dir || t.root;
            var n = t.base || (t.name || "") + (t.ext || "");
            return r ? (r === t.root ? r + n : r + "/" + n) : n;
          })(0, e);
        },
        parse: function (e) {
          t(e);
          var r = {
            root: "",
            dir: "",
            base: "",
            ext: "",
            name: "",
          };
          if (0 === e.length) return r;
          var n;
          var i = e.charCodeAt(0);
          var o = 47 === i;
          if (o) {
            r.root = "/";
            n = 1;
          } else {
            n = 0;
          }
          for (
            s = -1, a = 0, c = -1, l = true, u = e.length - 1, d = 0, undefined;
            u >= n;
            --u
          ) {
            var s;
            var a;
            var c;
            var l;
            var u;
            var d;
            if (47 !== (i = e.charCodeAt(u))) {
              if (-1 === c) {
                l = false;
                c = u + 1;
              }
              if (46 === i) {
                if (-1 === s) {
                  s = u;
                } else {
                  if (1 !== d) {
                    d = 1;
                  }
                }
              } else {
                if (-1 !== s) {
                  d = -1;
                }
              }
            } else if (!l) {
              a = u + 1;
              break;
            }
          }
          if (
            -1 === s ||
            -1 === c ||
            0 === d ||
            (1 === d && s === c - 1 && s === a + 1)
          ) {
            if (-1 !== c) {
              r.base = r.name = 0 === a && o ? e.slice(1, c) : e.slice(a, c);
            }
          } else {
            if (0 === a && o) {
              r.name = e.slice(1, s);
              r.base = e.slice(1, c);
            } else {
              r.name = e.slice(a, s);
              r.base = e.slice(a, c);
            }
            r.ext = e.slice(s, c);
          }
          if (a > 0) {
            r.dir = e.slice(0, a - 1);
          } else {
            if (o) {
              r.dir = "/";
            }
          }
          return r;
        },
        sep: "/",
        delimiter: ":",
        win32: null,
        posix: null,
      };
      n.posix = n;
      e.exports = n;
    },
    447: (e, t, r) => {
      var n;
      r.r(t);
      r.d(t, {
        URI: () => f,
        Utils: () => S,
      });
      if ("object" == typeof process) n = "win32" === process.platform;
      else if ("object" == typeof navigator) {
        var i = navigator.userAgent;
        n = i.indexOf("Windows") >= 0;
      }
      var o;
      var s;
      var a =
        ((o = function (e, t) {
          return (o =
            Object.setPrototypeOf ||
            ({
              __proto__: [],
            } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var r in t)
                if (Object.prototype.hasOwnProperty.call(t, r)) {
                  e[r] = t[r];
                }
            })(e, t);
        }),
        function (e, t) {
          function r() {
            this.constructor = e;
          }
          o(e, t);
          e.prototype =
            null === t
              ? Object.create(t)
              : ((r.prototype = t.prototype), new r());
        });
      var c = /^\w[\w\d+.-]*$/;
      var l = /^\//;
      var u = /^\/\//;
      var d = "";
      var p = "/";
      var h = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
      var f = (function () {
        function e(e, t, r, n, i, o) {
          if (undefined === o) {
            o = false;
          }
          if ("object" == typeof e) {
            this.scheme = e.scheme || d;
            this.authority = e.authority || d;
            this.path = e.path || d;
            this.query = e.query || d;
            this.fragment = e.fragment || d;
          } else {
            this.scheme = (function (e, t) {
              return e || t ? e : "file";
            })(e, o);
            this.authority = t || d;
            this.path = (function (e, t) {
              switch (e) {
                case "https":
                case "http":
                case "file":
                  if (t) {
                    if (t[0] !== p) {
                      t = p + t;
                    }
                  } else {
                    t = p;
                  }
              }
              return t;
            })(this.scheme, r || d);
            this.query = n || d;
            this.fragment = i || d;
            (function (e, t) {
              if (!e.scheme && t)
                throw new Error(
                  '[UriError]: Scheme is missing: {scheme: "", authority: "' +
                    e.authority +
                    '", path: "' +
                    e.path +
                    '", query: "' +
                    e.query +
                    '", fragment: "' +
                    e.fragment +
                    '"}'
                );
              if (e.scheme && !c.test(e.scheme))
                throw new Error(
                  "[UriError]: Scheme contains illegal characters."
                );
              if (e.path)
                if (e.authority) {
                  if (!l.test(e.path))
                    throw new Error(
                      '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character'
                    );
                } else if (u.test(e.path))
                  throw new Error(
                    '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'
                  );
            })(this, o);
          }
        }
        e.isUri = function (t) {
          return (
            t instanceof e ||
            (!!t &&
              "string" == typeof t.authority &&
              "string" == typeof t.fragment &&
              "string" == typeof t.path &&
              "string" == typeof t.query &&
              "string" == typeof t.scheme &&
              "function" == typeof t.fsPath &&
              "function" == typeof t.with &&
              "function" == typeof t.toString)
          );
        };
        Object.defineProperty(e.prototype, "fsPath", {
          get: function () {
            return b(this, false);
          },
          enumerable: false,
          configurable: true,
        });
        e.prototype.with = function (e) {
          if (!e) return this;
          var t = e.scheme;
          var r = e.authority;
          var n = e.path;
          var i = e.query;
          var o = e.fragment;
          if (undefined === t) {
            t = this.scheme;
          } else {
            if (null === t) {
              t = d;
            }
          }
          if (undefined === r) {
            r = this.authority;
          } else {
            if (null === r) {
              r = d;
            }
          }
          if (undefined === n) {
            n = this.path;
          } else {
            if (null === n) {
              n = d;
            }
          }
          if (undefined === i) {
            i = this.query;
          } else {
            if (null === i) {
              i = d;
            }
          }
          if (undefined === o) {
            o = this.fragment;
          } else {
            if (null === o) {
              o = d;
            }
          }
          return t === this.scheme &&
            r === this.authority &&
            n === this.path &&
            i === this.query &&
            o === this.fragment
            ? this
            : new m(t, r, n, i, o);
        };
        e.parse = function (e, t) {
          if (undefined === t) {
            t = false;
          }
          var r = h.exec(e);
          return r
            ? new m(
                r[2] || d,
                T(r[4] || d),
                T(r[5] || d),
                T(r[7] || d),
                T(r[9] || d),
                t
              )
            : new m(d, d, d, d, d);
        };
        e.file = function (e) {
          var t = d;
          if (n) {
            e = e.replace(/\\/g, p);
          }
          if (e[0] === p && e[1] === p) {
            var r = e.indexOf(p, 2);
            -1 === r
              ? ((t = e.substring(2)), (e = p))
              : ((t = e.substring(2, r)), (e = e.substring(r) || p));
          }
          return new m("file", t, e, d, d);
        };
        e.from = function (e) {
          return new m(e.scheme, e.authority, e.path, e.query, e.fragment);
        };
        e.prototype.toString = function (e) {
          if (undefined === e) {
            e = false;
          }
          return w(this, e);
        };
        e.prototype.toJSON = function () {
          return this;
        };
        e.revive = function (t) {
          if (t) {
            if (t instanceof e) return t;
            var r = new m(t);
            r._formatted = t.external;
            r._fsPath = t._sep === g ? t.fsPath : null;
            return r;
          }
          return t;
        };
        return e;
      })();
      var g = n ? 1 : undefined;
      var m = (function (e) {
        function t() {
          var t = (null !== e && e.apply(this, arguments)) || this;
          t._formatted = null;
          t._fsPath = null;
          return t;
        }
        a(t, e);
        Object.defineProperty(t.prototype, "fsPath", {
          get: function () {
            if (this._fsPath) {
              this._fsPath = b(this, false);
            }
            return this._fsPath;
          },
          enumerable: false,
          configurable: true,
        });
        t.prototype.toString = function (e) {
          if (undefined === e) {
            e = false;
          }
          return e
            ? w(this, true)
            : (this._formatted || (this._formatted = w(this, false)),
              this._formatted);
        };
        t.prototype.toJSON = function () {
          var e = {
            $mid: 1,
          };
          if (this._fsPath) {
            e.fsPath = this._fsPath;
            e._sep = g;
          }
          if (this._formatted) {
            e.external = this._formatted;
          }
          if (this.path) {
            e.path = this.path;
          }
          if (this.scheme) {
            e.scheme = this.scheme;
          }
          if (this.authority) {
            e.authority = this.authority;
          }
          if (this.query) {
            e.query = this.query;
          }
          if (this.fragment) {
            e.fragment = this.fragment;
          }
          return e;
        };
        return t;
      })(f);
      var y =
        (((s = {})[58] = "%3A"),
        (s[47] = "%2F"),
        (s[63] = "%3F"),
        (s[35] = "%23"),
        (s[91] = "%5B"),
        (s[93] = "%5D"),
        (s[64] = "%40"),
        (s[33] = "%21"),
        (s[36] = "%24"),
        (s[38] = "%26"),
        (s[39] = "%27"),
        (s[40] = "%28"),
        (s[41] = "%29"),
        (s[42] = "%2A"),
        (s[43] = "%2B"),
        (s[44] = "%2C"),
        (s[59] = "%3B"),
        (s[61] = "%3D"),
        (s[32] = "%20"),
        s);
      function v(e, t) {
        for (r = undefined, n = -1, i = 0, undefined; i < e.length; i++) {
          var r;
          var n;
          var i;
          var o = e.charCodeAt(i);
          if (
            (o >= 97 && o <= 122) ||
            (o >= 65 && o <= 90) ||
            (o >= 48 && o <= 57) ||
            45 === o ||
            46 === o ||
            95 === o ||
            126 === o ||
            (t && 47 === o)
          ) {
            if (-1 !== n) {
              r += encodeURIComponent(e.substring(n, i));
              n = -1;
            }
            if (undefined !== r) {
              r += e.charAt(i);
            }
          } else {
            if (undefined === r) {
              r = e.substr(0, i);
            }
            var s = y[o];
            if (undefined !== s) {
              if (-1 !== n) {
                r += encodeURIComponent(e.substring(n, i));
                n = -1;
              }
              r += s;
            } else {
              if (-1 === n) {
                n = i;
              }
            }
          }
        }
        if (-1 !== n) {
          r += encodeURIComponent(e.substring(n));
        }
        return undefined !== r ? r : e;
      }
      function _(e) {
        for (t = undefined, r = 0, undefined; r < e.length; r++) {
          var t;
          var r;
          var n = e.charCodeAt(r);
          if (35 === n || 63 === n) {
            if (undefined === t) {
              t = e.substr(0, r);
            }
            t += y[n];
          } else {
            if (undefined !== t) {
              t += e[r];
            }
          }
        }
        return undefined !== t ? t : e;
      }
      function b(e, t) {
        var r;
        r =
          e.authority && e.path.length > 1 && "file" === e.scheme
            ? "//" + e.authority + e.path
            : 47 === e.path.charCodeAt(0) &&
              ((e.path.charCodeAt(1) >= 65 && e.path.charCodeAt(1) <= 90) ||
                (e.path.charCodeAt(1) >= 97 && e.path.charCodeAt(1) <= 122)) &&
              58 === e.path.charCodeAt(2)
            ? t
              ? e.path.substr(1)
              : e.path[1].toLowerCase() + e.path.substr(2)
            : e.path;
        if (n) {
          r = r.replace(/\//g, "\\");
        }
        return r;
      }
      function w(e, t) {
        var r = t ? _ : v;
        var n = "";
        var i = e.scheme;
        var o = e.authority;
        var s = e.path;
        var a = e.query;
        var c = e.fragment;
        if (i) {
          n += i;
          n += ":";
        }
        if (o || "file" === i) {
          n += p;
          n += p;
        }
        if (o) {
          var l = o.indexOf("@");
          if (-1 !== l) {
            var u = o.substr(0, l);
            (o = o.substr(l + 1)),
              -1 === (l = u.indexOf(":"))
                ? (n += r(u, !1))
                : ((n += r(u.substr(0, l), !1)),
                  (n += ":"),
                  (n += r(u.substr(l + 1), !1))),
              (n += "@");
          }
          -1 === (l = (o = o.toLowerCase()).indexOf(":"))
            ? (n += r(o, !1))
            : ((n += r(o.substr(0, l), !1)), (n += o.substr(l)));
        }
        if (s) {
          if (
            s.length >= 3 &&
            47 === s.charCodeAt(0) &&
            58 === s.charCodeAt(2)
          ) {
            if ((d = s.charCodeAt(1)) >= 65 && d <= 90) {
              s = "/" + String.fromCharCode(d + 32) + ":" + s.substr(3);
            }
          } else if (s.length >= 2 && 58 === s.charCodeAt(1)) {
            var d;
            if ((d = s.charCodeAt(0)) >= 65 && d <= 90) {
              s = String.fromCharCode(d + 32) + ":" + s.substr(2);
            }
          }
          n += r(s, true);
        }
        if (a) {
          n += "?";
          n += r(a, false);
        }
        if (c) {
          n += "#";
          n += t ? c : v(c, false);
        }
        return n;
      }
      function C(e) {
        try {
          return decodeURIComponent(e);
        } catch (t) {
          return e.length > 3 ? e.substr(0, 3) + C(e.substr(3)) : e;
        }
      }
      var E = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
      function T(e) {
        return e.match(E)
          ? e.replace(E, function (e) {
              return C(e);
            })
          : e;
      }
      var S;
      var x = r(470);
      var k = function () {
        for (e = 0, t = 0, r = arguments.length, undefined; t < r; t++) {
          var e;
          var t;
          var r;
          e += arguments[t].length;
        }
        var n = Array(e);
        var i = 0;
        for (t = 0; t < r; t++)
          for (
            o = arguments[t], s = 0, a = o.length, undefined;
            s < a;
            s++, i++
          ) {
            var o;
            var s;
            var a;
            n[i] = o[s];
          }
        return n;
      };
      var I = x.posix || x;
      !(function (e) {
        e.joinPath = function (e) {
          for (t = [], r = 1, undefined; r < arguments.length; r++) {
            var t;
            var r;
            t[r - 1] = arguments[r];
          }
          return e.with({
            path: I.join.apply(I, k([e.path], t)),
          });
        };
        e.resolvePath = function (e) {
          for (t = [], r = 1, undefined; r < arguments.length; r++) {
            var t;
            var r;
            t[r - 1] = arguments[r];
          }
          var n = e.path || "/";
          return e.with({
            path: I.resolve.apply(I, k([n], t)),
          });
        };
        e.dirname = function (e) {
          var t = I.dirname(e.path);
          return 1 === t.length && 46 === t.charCodeAt(0)
            ? e
            : e.with({
                path: t,
              });
        };
        e.basename = function (e) {
          return I.basename(e.path);
        };
        e.extname = function (e) {
          return I.extname(e.path);
        };
      })(S || (S = {}));
    },
  };
  var t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    var i = (t[n] = {
      exports: {},
    });
    e[n](i, i.exports, r);
    return i.exports;
  }
  r.d = (e, t) => {
    for (var n in t)
      if (r.o(t, n) && !r.o(e, n)) {
        Object.defineProperty(e, n, {
          enumerable: true,
          get: t[n],
        });
      }
  };
  r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
  r.r = (e) => {
    if ("undefined" != typeof Symbol && Symbol.toStringTag) {
      Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module",
      });
    }
    Object.defineProperty(e, "__esModule", {
      value: true,
    });
  };
  return r(447);
})();
const { URI: i, Utils: o } = n;
