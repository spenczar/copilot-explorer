!(function (e) {
  "use strict";

  function t() {
    for (e = arguments.length, t = Array(e), r = 0, undefined; r < e; r++) {
      var e;
      var t;
      var r;
      t[r] = arguments[r];
    }
    if (t.length > 1) {
      t[0] = t[0].slice(0, -1);
      for (n = t.length - 1, i = 1, undefined; i < n; ++i) {
        var n;
        var i;
        t[i] = t[i].slice(1, -1);
      }
      t[n] = t[n].slice(1);
      return t.join("");
    }
    return t[0];
  }
  function r(e) {
    return "(?:" + e + ")";
  }
  function n(e) {
    return undefined === e
      ? "undefined"
      : null === e
      ? "null"
      : Object.prototype.toString
          .call(e)
          .split(" ")
          .pop()
          .split("]")
          .shift()
          .toLowerCase();
  }
  function i(e) {
    return e.toUpperCase();
  }
  function o(e) {
    var n = "[A-Za-z]";
    var i = "[0-9]";
    var o = t(i, "[A-Fa-f]");
    var s = r(
      r("%[EFef]" + o + "%" + o + o + "%" + o + o) +
        "|" +
        r("%[89A-Fa-f]" + o + "%" + o + o) +
        "|" +
        r("%" + o + o)
    );
    var a = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]";
    var c = t("[\\:\\/\\?\\#\\[\\]\\@]", a);
    var l = e ? "[\\uE000-\\uF8FF]" : "[]";
    var u = t(
      n,
      i,
      "[\\-\\.\\_\\~]",
      e
        ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]"
        : "[]"
    );
    var d = r(n + t(n, i, "[\\+\\-\\.]") + "*");
    var p = r(r(s + "|" + t(u, a, "[\\:]")) + "*");
    var h =
      (r(
        r("25[0-5]") +
          "|" +
          r("2[0-4]" + i) +
          "|" +
          r("1" + i + i) +
          "|" +
          r("[1-9]" + i) +
          "|" +
          i
      ),
      r(
        r("25[0-5]") +
          "|" +
          r("2[0-4]" + i) +
          "|" +
          r("1" + i + i) +
          "|" +
          r("0?[1-9]" + i) +
          "|0?0?" +
          i
      ));
    var f = r(h + "\\." + h + "\\." + h + "\\." + h);
    var g = r(o + "{1,4}");
    var m = r(r(g + "\\:" + g) + "|" + f);
    var y = r(r(g + "\\:") + "{6}" + m);
    var v = r("\\:\\:" + r(g + "\\:") + "{5}" + m);
    var _ = r(r(g) + "?\\:\\:" + r(g + "\\:") + "{4}" + m);
    var b = r(
      r(r(g + "\\:") + "{0,1}" + g) + "?\\:\\:" + r(g + "\\:") + "{3}" + m
    );
    var w = r(
      r(r(g + "\\:") + "{0,2}" + g) + "?\\:\\:" + r(g + "\\:") + "{2}" + m
    );
    var C = r(r(r(g + "\\:") + "{0,3}" + g) + "?\\:\\:" + g + "\\:" + m);
    var E = r(r(r(g + "\\:") + "{0,4}" + g) + "?\\:\\:" + m);
    var T = r(r(r(g + "\\:") + "{0,5}" + g) + "?\\:\\:" + g);
    var S = r(r(r(g + "\\:") + "{0,6}" + g) + "?\\:\\:");
    var x = r([y, v, _, b, w, C, E, T, S].join("|"));
    var k = r(r(u + "|" + s) + "+");
    var I = (r(x + "\\%25" + k), r(x + r("\\%25|\\%(?!" + o + "{2})") + k));
    var A = r("[vV]" + o + "+\\." + t(u, a, "[\\:]") + "+");
    var P = r("\\[" + r(I + "|" + x + "|" + A) + "\\]");
    var R = r(r(s + "|" + t(u, a)) + "*");
    var N = r(P + "|" + f + "(?!" + R + ")|" + R);
    var O = r(i + "*");
    var L = r(r(p + "@") + "?" + N + r("\\:" + O) + "?");
    var D = r(s + "|" + t(u, a, "[\\:\\@]"));
    var M = r(D + "*");
    var B = r(D + "+");
    var F = r(r(s + "|" + t(u, a, "[\\@]")) + "+");
    var j = r(r("\\/" + M) + "*");
    var U = r("\\/" + r(B + j) + "?");
    var $ = r(F + j);
    var q = r(B + j);
    var H = "(?!" + D + ")";
    var V =
      (r(j + "|" + U + "|" + $ + "|" + q + "|" + H),
      r(r(D + "|" + t("[\\/\\?]", l)) + "*"));
    var z = r(r(D + "|[\\/\\?]") + "*");
    var K = r(r("\\/\\/" + L + j) + "|" + U + "|" + q + "|" + H);
    var W = r(d + "\\:" + K + r("\\?" + V) + "?" + r("\\#" + z) + "?");
    var G = r(r("\\/\\/" + L + j) + "|" + U + "|" + $ + "|" + H);
    var Q = r(G + r("\\?" + V) + "?" + r("\\#" + z) + "?");
    r(W + "|" + Q);
    r(d + "\\:" + K + r("\\?" + V) + "?");
    r(
      r(
        "\\/\\/(" +
          r("(" + p + ")@") +
          "?(" +
          N +
          ")" +
          r("\\:(" + O + ")") +
          "?)"
      ) +
        "?(" +
        j +
        "|" +
        U +
        "|" +
        q +
        "|" +
        H +
        ")"
    );
    r("\\?(" + V + ")");
    r("\\#(" + z + ")");
    r(
      r(
        "\\/\\/(" +
          r("(" + p + ")@") +
          "?(" +
          N +
          ")" +
          r("\\:(" + O + ")") +
          "?)"
      ) +
        "?(" +
        j +
        "|" +
        U +
        "|" +
        $ +
        "|" +
        H +
        ")"
    );
    r("\\?(" + V + ")");
    r("\\#(" + z + ")");
    r(
      r(
        "\\/\\/(" +
          r("(" + p + ")@") +
          "?(" +
          N +
          ")" +
          r("\\:(" + O + ")") +
          "?)"
      ) +
        "?(" +
        j +
        "|" +
        U +
        "|" +
        q +
        "|" +
        H +
        ")"
    );
    r("\\?(" + V + ")");
    r("\\#(" + z + ")");
    r("(" + p + ")@");
    r("\\:(" + O + ")");
    return {
      NOT_SCHEME: new RegExp(t("[^]", n, i, "[\\+\\-\\.]"), "g"),
      NOT_USERINFO: new RegExp(t("[^\\%\\:]", u, a), "g"),
      NOT_HOST: new RegExp(t("[^\\%\\[\\]\\:]", u, a), "g"),
      NOT_PATH: new RegExp(t("[^\\%\\/\\:\\@]", u, a), "g"),
      NOT_PATH_NOSCHEME: new RegExp(t("[^\\%\\/\\@]", u, a), "g"),
      NOT_QUERY: new RegExp(t("[^\\%]", u, a, "[\\:\\@\\/\\?]", l), "g"),
      NOT_FRAGMENT: new RegExp(t("[^\\%]", u, a, "[\\:\\@\\/\\?]"), "g"),
      ESCAPE: new RegExp(t("[^]", u, a), "g"),
      UNRESERVED: new RegExp(u, "g"),
      OTHER_CHARS: new RegExp(t("[^\\%]", u, c), "g"),
      PCT_ENCODED: new RegExp(s, "g"),
      IPV4ADDRESS: new RegExp("^(" + f + ")$"),
      IPV6ADDRESS: new RegExp(
        "^\\[?(" +
          x +
          ")" +
          r(r("\\%25|\\%(?!" + o + "{2})") + "(" + k + ")") +
          "?\\]?$"
      ),
    };
  }
  var s = o(false);
  var a = o(true);
  var c = function (e, t) {
    if (Array.isArray(e)) return e;
    if (Symbol.iterator in Object(e))
      return (function (e, t) {
        var r = [];
        var n = true;
        var i = false;
        var o = undefined;
        try {
          for (
            a = e[Symbol.iterator](), undefined;
            !(n = (s = a.next()).done) &&
            (r.push(s.value), !t || r.length !== t);
            n = true
          ) {
            var s;
            var a;
          }
        } catch (e) {
          i = true;
          o = e;
        } finally {
          try {
            if (!n && a.return) {
              a.return();
            }
          } finally {
            if (i) throw o;
          }
        }
        return r;
      })(e, t);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  };
  var l = 2147483647;
  var u = 36;
  var d = /^xn--/;
  var p = /[^\0-\x7E]/;
  var h = /[\x2E\u3002\uFF0E\uFF61]/g;
  var f = {
    overflow: "Overflow: input needs wider integers to process",
    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
    "invalid-input": "Invalid input",
  };
  var g = Math.floor;
  var m = String.fromCharCode;
  function y(e) {
    throw new RangeError(f[e]);
  }
  function v(e, t) {
    var r = e.split("@");
    var n = "";
    if (r.length > 1) {
      n = r[0] + "@";
      e = r[1];
    }
    return (
      n +
      (function (e, t) {
        for (r = [], n = e.length, undefined; n--; ) {
          var r;
          var n;
          r[n] = t(e[n]);
        }
        return r;
      })((e = e.replace(h, ".")).split("."), t).join(".")
    );
  }
  function _(e) {
    for (t = [], r = 0, n = e.length, undefined; r < n; ) {
      var t;
      var r;
      var n;
      var i = e.charCodeAt(r++);
      if (i >= 55296 && i <= 56319 && r < n) {
        var o = e.charCodeAt(r++);
        if (56320 == (64512 & o)) {
          t.push(((1023 & i) << 10) + (1023 & o) + 65536);
        } else {
          t.push(i);
          r--;
        }
      } else t.push(i);
    }
    return t;
  }
  var b = function (e, t) {
    return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
  };
  var w = function (e, t, r) {
    var n = 0;
    for (e = r ? g(e / 700) : e >> 1, e += g(e / t); e > 455; n += u)
      e = g(e / 35);
    return g(n + (36 * e) / (e + 38));
  };
  var C = function (e) {
    var t;
    var r = [];
    var n = e.length;
    var i = 0;
    var o = 128;
    var s = 72;
    var a = e.lastIndexOf("-");
    if (a < 0) {
      a = 0;
    }
    for (var c = 0; c < a; ++c) {
      if (e.charCodeAt(c) >= 128) {
        y("not-basic");
      }
      r.push(e.charCodeAt(c));
    }
    for (var d = a > 0 ? a + 1 : 0; d < n; ) {
      for (p = i, h = 1, f = u, undefined; ; f += u) {
        var p;
        var h;
        var f;
        if (d >= n) {
          y("invalid-input");
        }
        var m =
          (t = e.charCodeAt(d++)) - 48 < 10
            ? t - 22
            : t - 65 < 26
            ? t - 65
            : t - 97 < 26
            ? t - 97
            : u;
        if (m >= u || m > g((l - i) / h)) {
          y("overflow");
        }
        i += m * h;
        var v = f <= s ? 1 : f >= s + 26 ? 26 : f - s;
        if (m < v) break;
        var _ = u - v;
        if (h > g(l / _)) {
          y("overflow");
        }
        h *= _;
      }
      var b = r.length + 1;
      s = w(i - p, b, 0 == p);
      if (g(i / b) > l - o) {
        y("overflow");
      }
      o += g(i / b);
      i %= b;
      r.splice(i++, 0, o);
    }
    return String.fromCodePoint.apply(String, r);
  };
  var E = function (e) {
    var t = [];
    var r = (e = _(e)).length;
    var n = 128;
    var i = 0;
    var o = 72;
    var s = true;
    var a = false;
    var c = undefined;
    try {
      for (
        p = e[Symbol.iterator](), undefined;
        !(s = (d = p.next()).done);
        s = true
      ) {
        var d;
        var p;
        var h = d.value;
        if (h < 128) {
          t.push(m(h));
        }
      }
    } catch (e) {
      a = true;
      c = e;
    } finally {
      try {
        if (!s && p.return) {
          p.return();
        }
      } finally {
        if (a) throw c;
      }
    }
    var f = t.length;
    var v = f;
    for (f && t.push("-"); v < r; ) {
      var C = l;
      var E = true;
      var T = false;
      var S = undefined;
      try {
        for (
          k = e[Symbol.iterator](), undefined;
          !(E = (x = k.next()).done);
          E = true
        ) {
          var x;
          var k;
          var I = x.value;
          if (I >= n && I < C) {
            C = I;
          }
        }
      } catch (e) {
        T = true;
        S = e;
      } finally {
        try {
          if (!E && k.return) {
            k.return();
          }
        } finally {
          if (T) throw S;
        }
      }
      var A = v + 1;
      if (C - n > g((l - i) / A)) {
        y("overflow");
      }
      i += (C - n) * A;
      n = C;
      var P = true;
      var R = false;
      var N = undefined;
      try {
        for (
          L = e[Symbol.iterator](), undefined;
          !(P = (O = L.next()).done);
          P = true
        ) {
          var O;
          var L;
          var D = O.value;
          if (D < n && ++i > l) {
            y("overflow");
          }
          if (D == n) {
            for (var M = i, B = u; ; B += u) {
              var F = B <= o ? 1 : B >= o + 26 ? 26 : B - o;
              if (M < F) break;
              var j = M - F,
                U = u - F;
              t.push(m(b(F + (j % U), 0))), (M = g(j / U));
            }
            t.push(m(b(M, 0))), (o = w(i, A, v == f)), (i = 0), ++v;
          }
        }
      } catch (e) {
        R = true;
        N = e;
      } finally {
        try {
          if (!P && L.return) {
            L.return();
          }
        } finally {
          if (R) throw N;
        }
      }
      ++i;
      ++n;
    }
    return t.join("");
  };
  var T = function (e) {
    return v(e, function (e) {
      return p.test(e) ? "xn--" + E(e) : e;
    });
  };
  var S = function (e) {
    return v(e, function (e) {
      return d.test(e) ? C(e.slice(4).toLowerCase()) : e;
    });
  };
  var x = {};
  function k(e) {
    var t = e.charCodeAt(0);
    return t < 16
      ? "%0" + t.toString(16).toUpperCase()
      : t < 128
      ? "%" + t.toString(16).toUpperCase()
      : t < 2048
      ? "%" +
        ((t >> 6) | 192).toString(16).toUpperCase() +
        "%" +
        ((63 & t) | 128).toString(16).toUpperCase()
      : "%" +
        ((t >> 12) | 224).toString(16).toUpperCase() +
        "%" +
        (((t >> 6) & 63) | 128).toString(16).toUpperCase() +
        "%" +
        ((63 & t) | 128).toString(16).toUpperCase();
  }
  function I(e) {
    for (t = "", r = 0, n = e.length, undefined; r < n; ) {
      var t;
      var r;
      var n;
      var i = parseInt(e.substr(r + 1, 2), 16);
      if (i < 128) {
        t += String.fromCharCode(i);
        r += 3;
      } else if (i >= 194 && i < 224) {
        if (n - r >= 6) {
          var o = parseInt(e.substr(r + 4, 2), 16);
          t += String.fromCharCode(((31 & i) << 6) | (63 & o));
        } else t += e.substr(r, 6);
        r += 6;
      } else if (i >= 224) {
        if (n - r >= 9) {
          var s = parseInt(e.substr(r + 4, 2), 16);
          var a = parseInt(e.substr(r + 7, 2), 16);
          t += String.fromCharCode(
            ((15 & i) << 12) | ((63 & s) << 6) | (63 & a)
          );
        } else t += e.substr(r, 9);
        r += 9;
      } else {
        t += e.substr(r, 3);
        r += 3;
      }
    }
    return t;
  }
  function A(e, t) {
    function r(e) {
      var r = I(e);
      return r.match(t.UNRESERVED) ? r : e;
    }
    if (e.scheme) {
      e.scheme = String(e.scheme)
        .replace(t.PCT_ENCODED, r)
        .toLowerCase()
        .replace(t.NOT_SCHEME, "");
    }
    if (undefined !== e.userinfo) {
      e.userinfo = String(e.userinfo)
        .replace(t.PCT_ENCODED, r)
        .replace(t.NOT_USERINFO, k)
        .replace(t.PCT_ENCODED, i);
    }
    if (undefined !== e.host) {
      e.host = String(e.host)
        .replace(t.PCT_ENCODED, r)
        .toLowerCase()
        .replace(t.NOT_HOST, k)
        .replace(t.PCT_ENCODED, i);
    }
    if (undefined !== e.path) {
      e.path = String(e.path)
        .replace(t.PCT_ENCODED, r)
        .replace(e.scheme ? t.NOT_PATH : t.NOT_PATH_NOSCHEME, k)
        .replace(t.PCT_ENCODED, i);
    }
    if (undefined !== e.query) {
      e.query = String(e.query)
        .replace(t.PCT_ENCODED, r)
        .replace(t.NOT_QUERY, k)
        .replace(t.PCT_ENCODED, i);
    }
    if (undefined !== e.fragment) {
      e.fragment = String(e.fragment)
        .replace(t.PCT_ENCODED, r)
        .replace(t.NOT_FRAGMENT, k)
        .replace(t.PCT_ENCODED, i);
    }
    return e;
  }
  function P(e) {
    return e.replace(/^0*(.*)/, "$1") || "0";
  }
  function R(e, t) {
    var r = e.match(t.IPV4ADDRESS) || [];
    var n = c(r, 2)[1];
    return n ? n.split(".").map(P).join(".") : e;
  }
  function N(e, t) {
    var r = e.match(t.IPV6ADDRESS) || [];
    var n = c(r, 3);
    var i = n[1];
    var o = n[2];
    if (i) {
      for (
        s = i.toLowerCase().split("::").reverse(),
          a = c(s, 2),
          l = a[0],
          u = a[1],
          d = u ? u.split(":").map(P) : [],
          p = l.split(":").map(P),
          h = t.IPV4ADDRESS.test(p[p.length - 1]),
          f = h ? 7 : 8,
          g = p.length - f,
          m = Array(f),
          y = 0,
          undefined;
        y < f;
        ++y
      ) {
        var s;
        var a;
        var l;
        var u;
        var d;
        var p;
        var h;
        var f;
        var g;
        var m;
        var y;
        m[y] = d[y] || p[g + y] || "";
      }
      if (h) {
        m[f - 1] = R(m[f - 1], t);
      }
      var v = m
        .reduce(function (e, t, r) {
          if (!t || "0" === t) {
            var n = e[e.length - 1];
            if (n && n.index + n.length === r) {
              n.length++;
            } else {
              e.push({
                index: r,
                length: 1,
              });
            }
          }
          return e;
        }, [])
        .sort(function (e, t) {
          return t.length - e.length;
        })[0];
      var _ = undefined;
      if (v && v.length > 1) {
        var b = m.slice(0, v.index);
        var w = m.slice(v.index + v.length);
        _ = b.join(":") + "::" + w.join(":");
      } else _ = m.join(":");
      if (o) {
        _ += "%" + o;
      }
      return _;
    }
    return e;
  }
  var O =
    /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
  var L = undefined === "".match(/(){0}/)[1];
  function D(e) {
    var t =
      arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {};
    var r = {};
    var n = false !== t.iri ? a : s;
    if ("suffix" === t.reference) {
      e = (t.scheme ? t.scheme + ":" : "") + "//" + e;
    }
    var i = e.match(O);
    if (i) {
      if (L) {
        r.scheme = i[1];
        r.userinfo = i[3];
        r.host = i[4];
        r.port = parseInt(i[5], 10);
        r.path = i[6] || "";
        r.query = i[7];
        r.fragment = i[8];
        if (isNaN(r.port)) {
          r.port = i[5];
        }
      } else {
        r.scheme = i[1] || undefined;
        r.userinfo = -1 !== e.indexOf("@") ? i[3] : undefined;
        r.host = -1 !== e.indexOf("//") ? i[4] : undefined;
        r.port = parseInt(i[5], 10);
        r.path = i[6] || "";
        r.query = -1 !== e.indexOf("?") ? i[7] : undefined;
        r.fragment = -1 !== e.indexOf("#") ? i[8] : undefined;
        if (isNaN(r.port)) {
          r.port = e.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? i[4] : undefined;
        }
      }
      if (r.host) {
        r.host = N(R(r.host, n), n);
      }
      if (
        undefined !== r.scheme ||
        undefined !== r.userinfo ||
        undefined !== r.host ||
        undefined !== r.port ||
        r.path ||
        undefined !== r.query
      ) {
        if (undefined === r.scheme) {
          r.reference = "relative";
        } else {
          if (undefined === r.fragment) {
            r.reference = "absolute";
          } else {
            r.reference = "uri";
          }
        }
      } else {
        r.reference = "same-document";
      }
      if (
        t.reference &&
        "suffix" !== t.reference &&
        t.reference !== r.reference
      ) {
        r.error = r.error || "URI is not a " + t.reference + " reference.";
      }
      var o = x[(t.scheme || r.scheme || "").toLowerCase()];
      if (t.unicodeSupport || (o && o.unicodeSupport)) A(r, n);
      else {
        if (r.host && (t.domainHost || (o && o.domainHost)))
          try {
            r.host = T(r.host.replace(n.PCT_ENCODED, I).toLowerCase());
          } catch (e) {
            r.error =
              r.error ||
              "Host's domain name can not be converted to ASCII via punycode: " +
                e;
          }
        A(r, s);
      }
      if (o && o.parse) {
        o.parse(r, t);
      }
    } else r.error = r.error || "URI can not be parsed.";
    return r;
  }
  function M(e, t) {
    var r = false !== t.iri ? a : s;
    var n = [];
    if (undefined !== e.userinfo) {
      n.push(e.userinfo);
      n.push("@");
    }
    if (undefined !== e.host) {
      n.push(
        N(R(String(e.host), r), r).replace(r.IPV6ADDRESS, function (e, t, r) {
          return "[" + t + (r ? "%25" + r : "") + "]";
        })
      );
    }
    if ("number" != typeof e.port && "string" != typeof e.port) {
      n.push(":");
      n.push(String(e.port));
    }
    return n.length ? n.join("") : undefined;
  }
  var B = /^\.\.?\//;
  var F = /^\/\.(\/|$)/;
  var j = /^\/\.\.(\/|$)/;
  var U = /^\/?(?:.|\n)*?(?=\/|$)/;
  function $(e) {
    for (var t = []; e.length; )
      if (e.match(B)) e = e.replace(B, "");
      else if (e.match(F)) e = e.replace(F, "/");
      else if (e.match(j)) {
        e = e.replace(j, "/");
        t.pop();
      } else if ("." === e || ".." === e) e = "";
      else {
        var r = e.match(U);
        if (!r) throw new Error("Unexpected dot segment condition");
        var n = r[0];
        e = e.slice(n.length);
        t.push(n);
      }
    return t.join("");
  }
  function q(e) {
    var t =
      arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {};
    var r = t.iri ? a : s;
    var n = [];
    var i = x[(t.scheme || e.scheme || "").toLowerCase()];
    if (i && i.serialize) {
      i.serialize(e, t);
    }
    if (e.host)
      if (r.IPV6ADDRESS.test(e.host));
      else if (t.domainHost || (i && i.domainHost))
        try {
          e.host = t.iri
            ? S(e.host)
            : T(e.host.replace(r.PCT_ENCODED, I).toLowerCase());
        } catch (r) {
          e.error =
            e.error ||
            "Host's domain name can not be converted to " +
              (t.iri ? "Unicode" : "ASCII") +
              " via punycode: " +
              r;
        }
    A(e, r);
    if ("suffix" !== t.reference && e.scheme) {
      n.push(e.scheme);
      n.push(":");
    }
    var o = M(e, t);
    if (undefined !== o) {
      if ("suffix" !== t.reference) {
        n.push("//");
      }
      n.push(o);
      if (e.path && "/" !== e.path.charAt(0)) {
        n.push("/");
      }
    }
    if (void 0 !== e.path) {
      var c = e.path;
      t.absolutePath || (i && i.absolutePath) || (c = $(c)),
        void 0 === o && (c = c.replace(/^\/\//, "/%2F")),
        n.push(c);
    }
    if (undefined !== e.query) {
      n.push("?");
      n.push(e.query);
    }
    if (undefined !== e.fragment) {
      n.push("#");
      n.push(e.fragment);
    }
    return n.join("");
  }
  function H(e, t) {
    var r =
      arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : {};
    var n = {};
    if (arguments[3]) {
      e = D(q(e, r), r);
      t = D(q(t, r), r);
    }
    if (!(r = r || {}).tolerant && t.scheme) {
      n.scheme = t.scheme;
      n.userinfo = t.userinfo;
      n.host = t.host;
      n.port = t.port;
      n.path = $(t.path || "");
      n.query = t.query;
    } else {
      if (
        undefined !== t.userinfo ||
        undefined !== t.host ||
        undefined !== t.port
      ) {
        n.userinfo = t.userinfo;
        n.host = t.host;
        n.port = t.port;
        n.path = $(t.path || "");
        n.query = t.query;
      } else {
        if (t.path) {
          if ("/" === t.path.charAt(0)) {
            n.path = $(t.path);
          } else {
            if (
              (undefined === e.userinfo &&
                undefined === e.host &&
                undefined === e.port) ||
              e.path
            ) {
              if (e.path) {
                n.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path;
              } else {
                n.path = t.path;
              }
            } else {
              n.path = "/" + t.path;
            }
            n.path = $(n.path);
          }
          n.query = t.query;
        } else {
          n.path = e.path;
          if (undefined !== t.query) {
            n.query = t.query;
          } else {
            n.query = e.query;
          }
        }
        n.userinfo = e.userinfo;
        n.host = e.host;
        n.port = e.port;
      }
      n.scheme = e.scheme;
    }
    n.fragment = t.fragment;
    return n;
  }
  function V(e, t) {
    return (
      e && e.toString().replace(t && t.iri ? a.PCT_ENCODED : s.PCT_ENCODED, I)
    );
  }
  var z = {
    scheme: "http",
    domainHost: true,
    parse: function (e, t) {
      if (e.host) {
        e.error = e.error || "HTTP URIs must have a host.";
      }
      return e;
    },
    serialize: function (e, t) {
      var r = "https" === String(e.scheme).toLowerCase();
      if (e.port !== (r ? 443 : 80) && "" !== e.port) {
        e.port = undefined;
      }
      if (e.path) {
        e.path = "/";
      }
      return e;
    },
  };
  var K = {
    scheme: "https",
    domainHost: z.domainHost,
    parse: z.parse,
    serialize: z.serialize,
  };
  function W(e) {
    return "boolean" == typeof e.secure
      ? e.secure
      : "wss" === String(e.scheme).toLowerCase();
  }
  var G = {
    scheme: "ws",
    domainHost: true,
    parse: function (e, t) {
      var r = e;
      r.secure = W(r);
      r.resourceName = (r.path || "/") + (r.query ? "?" + r.query : "");
      r.path = undefined;
      r.query = undefined;
      return r;
    },
    serialize: function (e, t) {
      if (e.port !== (W(e) ? 443 : 80) && "" !== e.port) {
        e.port = undefined;
      }
      if ("boolean" == typeof e.secure) {
        e.scheme = e.secure ? "wss" : "ws";
        e.secure = undefined;
      }
      if (e.resourceName) {
        var r = e.resourceName.split("?"),
          n = c(r, 2),
          i = n[0],
          o = n[1];
        (e.path = i && "/" !== i ? i : void 0),
          (e.query = o),
          (e.resourceName = void 0);
      }
      e.fragment = undefined;
      return e;
    },
  };
  var Q = {
    scheme: "wss",
    domainHost: G.domainHost,
    parse: G.parse,
    serialize: G.serialize,
  };
  var J = {};
  var Y =
    "[A-Za-z0-9\\-\\.\\_\\~\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]";
  var X = "[0-9A-Fa-f]";
  var Z = r(
    r("%[EFef]" + X + "%" + X + X + "%" + X + X) +
      "|" +
      r("%[89A-Fa-f]" + X + "%" + X + X) +
      "|" +
      r("%" + X + X)
  );
  var ee = t(
    "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]",
    '[\\"\\\\]'
  );
  var te = new RegExp(Y, "g");
  var re = new RegExp(Z, "g");
  var ne = new RegExp(
    t(
      "[^]",
      "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]",
      "[\\.]",
      '[\\"]',
      ee
    ),
    "g"
  );
  var ie = new RegExp(t("[^]", Y, "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]"), "g");
  var oe = ie;
  function se(e) {
    var t = I(e);
    return t.match(te) ? t : e;
  }
  var ae = {
    scheme: "mailto",
    parse: function (e, t) {
      var r = e;
      var n = (r.to = r.path ? r.path.split(",") : []);
      r.path = undefined;
      if (r.query) {
        for (
          var i = !1, o = {}, s = r.query.split("&"), a = 0, c = s.length;
          a < c;
          ++a
        ) {
          var l = s[a].split("=");
          switch (l[0]) {
            case "to":
              for (var u = l[1].split(","), d = 0, p = u.length; d < p; ++d)
                n.push(u[d]);
              break;
            case "subject":
              r.subject = V(l[1], t);
              break;
            case "body":
              r.body = V(l[1], t);
              break;
            default:
              (i = !0), (o[V(l[0], t)] = V(l[1], t));
          }
        }
        i && (r.headers = o);
      }
      r.query = undefined;
      for (h = 0, f = n.length, undefined; h < f; ++h) {
        var h;
        var f;
        var g = n[h].split("@");
        g[0] = V(g[0]);
        if (t.unicodeSupport) g[1] = V(g[1], t).toLowerCase();
        else
          try {
            g[1] = T(V(g[1], t).toLowerCase());
          } catch (e) {
            r.error =
              r.error ||
              "Email address's domain name can not be converted to ASCII via punycode: " +
                e;
          }
        n[h] = g.join("@");
      }
      return r;
    },
    serialize: function (e, t) {
      var r;
      var n = e;
      var o =
        null != (r = e.to)
          ? r instanceof Array
            ? r
            : "number" != typeof r.length || r.split || r.setInterval || r.call
            ? [r]
            : Array.prototype.slice.call(r)
          : [];
      if (o) {
        for (s = 0, a = o.length, undefined; s < a; ++s) {
          var s;
          var a;
          var c = String(o[s]);
          var l = c.lastIndexOf("@");
          var u = c.slice(0, l).replace(re, se).replace(re, i).replace(ne, k);
          var d = c.slice(l + 1);
          try {
            d = t.iri ? S(d) : T(V(d, t).toLowerCase());
          } catch (e) {
            n.error =
              n.error ||
              "Email address's domain name can not be converted to " +
                (t.iri ? "Unicode" : "ASCII") +
                " via punycode: " +
                e;
          }
          o[s] = u + "@" + d;
        }
        n.path = o.join(",");
      }
      var p = (e.headers = e.headers || {});
      if (e.subject) {
        p.subject = e.subject;
      }
      if (e.body) {
        p.body = e.body;
      }
      var h = [];
      for (var f in p)
        if (p[f] !== J[f]) {
          h.push(
            f.replace(re, se).replace(re, i).replace(ie, k) +
              "=" +
              p[f].replace(re, se).replace(re, i).replace(oe, k)
          );
        }
      if (h.length) {
        n.query = h.join("&");
      }
      return n;
    },
  };
  var ce = /^([^\:]+)\:(.*)/;
  var le = {
    scheme: "urn",
    parse: function (e, t) {
      var r = e.path && e.path.match(ce);
      var n = e;
      if (r) {
        var i = t.scheme || n.scheme || "urn";
        var o = r[1].toLowerCase();
        var s = r[2];
        var a = i + ":" + (t.nid || o);
        var c = x[a];
        n.nid = o;
        n.nss = s;
        n.path = undefined;
        if (c) {
          n = c.parse(n, t);
        }
      } else n.error = n.error || "URN can not be parsed.";
      return n;
    },
    serialize: function (e, t) {
      var r = t.scheme || e.scheme || "urn";
      var n = e.nid;
      var i = r + ":" + (t.nid || n);
      var o = x[i];
      if (o) {
        e = o.serialize(e, t);
      }
      var s = e;
      var a = e.nss;
      s.path = (n || t.nid) + ":" + a;
      return s;
    },
  };
  var ue = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
  var de = {
    scheme: "urn:uuid",
    parse: function (e, t) {
      var r = e;
      r.uuid = r.nss;
      r.nss = undefined;
      if (t.tolerant || (r.uuid && r.uuid.match(ue))) {
        r.error = r.error || "UUID is not valid.";
      }
      return r;
    },
    serialize: function (e, t) {
      var r = e;
      r.nss = (e.uuid || "").toLowerCase();
      return r;
    },
  };
  x[z.scheme] = z;
  x[K.scheme] = K;
  x[G.scheme] = G;
  x[Q.scheme] = Q;
  x[ae.scheme] = ae;
  x[le.scheme] = le;
  x[de.scheme] = de;
  e.SCHEMES = x;
  e.pctEncChar = k;
  e.pctDecChars = I;
  e.parse = D;
  e.removeDotSegments = $;
  e.serialize = q;
  e.resolveComponents = H;
  e.resolve = function (e, t, r) {
    var n = (function (e, t) {
      var r = e;
      if (t) for (var n in t) r[n] = t[n];
      return r;
    })(
      {
        scheme: "null",
      },
      r
    );
    return q(H(D(e, n), D(t, n), n, true), n);
  };
  e.normalize = function (e, t) {
    if ("string" == typeof e) {
      e = q(D(e, t), t);
    } else {
      if ("object" === n(e)) {
        e = D(q(e, t), t);
      }
    }
    return e;
  };
  e.equal = function (e, t, r) {
    if ("string" == typeof e) {
      e = q(D(e, r), r);
    } else {
      if ("object" === n(e)) {
        e = q(e, r);
      }
    }
    if ("string" == typeof t) {
      t = q(D(t, r), r);
    } else {
      if ("object" === n(t)) {
        t = q(t, r);
      }
    }
    return e === t;
  };
  e.escapeComponent = function (e, t) {
    return e && e.toString().replace(t && t.iri ? a.ESCAPE : s.ESCAPE, k);
  };
  e.unescapeComponent = V;
  Object.defineProperty(e, "__esModule", {
    value: true,
  });
})(exports);