var r;
exports = module.exports = SemVer;
r =
  "object" == typeof process &&
  process.env &&
  process.env.NODE_DEBUG &&
  /\bsemver\b/i.test(process.env.NODE_DEBUG)
    ? function () {
        var e = Array.prototype.slice.call(arguments, 0);
        e.unshift("SEMVER");
        console.log.apply(console, e);
      }
    : function () {};
exports.SEMVER_SPEC_VERSION = "2.0.0";
var n = Number.MAX_SAFE_INTEGER || 9007199254740991;
var i = (exports.re = []);
var o = (exports.src = []);
var s = 0;
var a = s++;
o[a] = "0|[1-9]\\d*";
var c = s++;
o[c] = "[0-9]+";
var l = s++;
o[l] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
var u = s++;
o[u] = "(" + o[a] + ")\\.(" + o[a] + ")\\.(" + o[a] + ")";
var d = s++;
o[d] = "(" + o[c] + ")\\.(" + o[c] + ")\\.(" + o[c] + ")";
var p = s++;
o[p] = "(?:" + o[a] + "|" + o[l] + ")";
var h = s++;
o[h] = "(?:" + o[c] + "|" + o[l] + ")";
var f = s++;
o[f] = "(?:-(" + o[p] + "(?:\\." + o[p] + ")*))";
var g = s++;
o[g] = "(?:-?(" + o[h] + "(?:\\." + o[h] + ")*))";
var m = s++;
o[m] = "[0-9A-Za-z-]+";
var y = s++;
o[y] = "(?:\\+(" + o[m] + "(?:\\." + o[m] + ")*))";
var v = s++;
var _ = "v?" + o[u] + o[f] + "?" + o[y] + "?";
o[v] = "^" + _ + "$";
var b = "[v=\\s]*" + o[d] + o[g] + "?" + o[y] + "?";
var w = s++;
o[w] = "^" + b + "$";
var C = s++;
o[C] = "((?:<|>)?=?)";
var E = s++;
o[E] = o[c] + "|x|X|\\*";
var T = s++;
o[T] = o[a] + "|x|X|\\*";
var S = s++;
o[S] =
  "[v=\\s]*(" +
  o[T] +
  ")(?:\\.(" +
  o[T] +
  ")(?:\\.(" +
  o[T] +
  ")(?:" +
  o[f] +
  ")?" +
  o[y] +
  "?)?)?";
var x = s++;
o[x] =
  "[v=\\s]*(" +
  o[E] +
  ")(?:\\.(" +
  o[E] +
  ")(?:\\.(" +
  o[E] +
  ")(?:" +
  o[g] +
  ")?" +
  o[y] +
  "?)?)?";
var k = s++;
o[k] = "^" + o[C] + "\\s*" + o[S] + "$";
var I = s++;
o[I] = "^" + o[C] + "\\s*" + o[x] + "$";
var A = s++;
o[A] =
  "(?:^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])";
var P = s++;
o[P] = "(?:~>?)";
var R = s++;
o[R] = "(\\s*)" + o[P] + "\\s+";
i[R] = new RegExp(o[R], "g");
var N = s++;
o[N] = "^" + o[P] + o[S] + "$";
var O = s++;
o[O] = "^" + o[P] + o[x] + "$";
var L = s++;
o[L] = "(?:\\^)";
var D = s++;
o[D] = "(\\s*)" + o[L] + "\\s+";
i[D] = new RegExp(o[D], "g");
var M = s++;
o[M] = "^" + o[L] + o[S] + "$";
var B = s++;
o[B] = "^" + o[L] + o[x] + "$";
var F = s++;
o[F] = "^" + o[C] + "\\s*(" + b + ")$|^$";
var j = s++;
o[j] = "^" + o[C] + "\\s*(" + _ + ")$|^$";
var U = s++;
o[U] = "(\\s*)" + o[C] + "\\s*(" + b + "|" + o[S] + ")";
i[U] = new RegExp(o[U], "g");
var $ = s++;
o[$] = "^\\s*(" + o[S] + ")\\s+-\\s+(" + o[S] + ")\\s*$";
var q = s++;
o[q] = "^\\s*(" + o[x] + ")\\s+-\\s+(" + o[x] + ")\\s*$";
var H = s++;
o[H] = "(<|>)?=?\\s*\\*";
for (var V = 0; V < 35; V++) {
  r(V, o[V]);
  if (i[V]) {
    i[V] = new RegExp(o[V]);
  }
}
function parse(e, t) {
  if (t && "object" == typeof t) {
    t = {
      loose: !!t,
      includePrerelease: false,
    };
  }
  if (e instanceof SemVer) return e;
  if ("string" != typeof e) return null;
  if (e.length > 256) return null;
  if (!(t.loose ? i[w] : i[v]).test(e)) return null;
  try {
    return new SemVer(e, t);
  } catch (e) {
    return null;
  }
}
function SemVer(e, t) {
  if (t && "object" == typeof t) {
    t = {
      loose: !!t,
      includePrerelease: false,
    };
  }
  if (e instanceof SemVer) {
    if (e.loose === t.loose) return e;
    e = e.version;
  } else if ("string" != typeof e) throw new TypeError("Invalid Version: " + e);
  if (e.length > 256)
    throw new TypeError("version is longer than 256 characters");
  if (!(this instanceof SemVer)) return new SemVer(e, t);
  r("SemVer", e, t);
  this.options = t;
  this.loose = !!t.loose;
  var o = e.trim().match(t.loose ? i[w] : i[v]);
  if (!o) throw new TypeError("Invalid Version: " + e);
  this.raw = e;
  this.major = +o[1];
  this.minor = +o[2];
  this.patch = +o[3];
  if (this.major > n || this.major < 0)
    throw new TypeError("Invalid major version");
  if (this.minor > n || this.minor < 0)
    throw new TypeError("Invalid minor version");
  if (this.patch > n || this.patch < 0)
    throw new TypeError("Invalid patch version");
  if (o[4]) {
    this.prerelease = o[4].split(".").map(function (e) {
      if (/^[0-9]+$/.test(e)) {
        var t = +e;
        if (t >= 0 && t < n) return t;
      }
      return e;
    });
  } else {
    this.prerelease = [];
  }
  this.build = o[5] ? o[5].split(".") : [];
  this.format();
}
exports.parse = parse;
exports.valid = function (e, t) {
  var r = parse(e, t);
  return r ? r.version : null;
};
exports.clean = function (e, t) {
  var r = parse(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
exports.SemVer = SemVer;
SemVer.prototype.format = function () {
  this.version = this.major + "." + this.minor + "." + this.patch;
  if (this.prerelease.length) {
    this.version += "-" + this.prerelease.join(".");
  }
  return this.version;
};
SemVer.prototype.toString = function () {
  return this.version;
};
SemVer.prototype.compare = function (e) {
  r("SemVer.compare", this.version, this.options, e);
  if (e instanceof SemVer) {
    e = new SemVer(e, this.options);
  }
  return this.compareMain(e) || this.comparePre(e);
};
SemVer.prototype.compareMain = function (e) {
  if (e instanceof SemVer) {
    e = new SemVer(e, this.options);
  }
  return (
    compareIdentifiers(this.major, e.major) ||
    compareIdentifiers(this.minor, e.minor) ||
    compareIdentifiers(this.patch, e.patch)
  );
};
SemVer.prototype.comparePre = function (e) {
  if (e instanceof SemVer) {
    e = new SemVer(e, this.options);
  }
  if (this.prerelease.length && !e.prerelease.length) return -1;
  if (!this.prerelease.length && e.prerelease.length) return 1;
  if (!this.prerelease.length && !e.prerelease.length) return 0;
  var t = 0;
  do {
    var n = this.prerelease[t];
    var i = e.prerelease[t];
    r("prerelease compare", t, n, i);
    if (void 0 === n && void 0 === i) return 0;
    if (undefined === i) return 1;
    if (undefined === n) return -1;
    if (n !== i) return compareIdentifiers(n, i);
  } while (++t);
};
SemVer.prototype.inc = function (e, t) {
  switch (e) {
    case "premajor":
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor = 0;
      this.major++;
      this.inc("pre", t);
      break;
    case "preminor":
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor++;
      this.inc("pre", t);
      break;
    case "prepatch":
      this.prerelease.length = 0;
      this.inc("patch", t);
      this.inc("pre", t);
      break;
    case "prerelease":
      if (0 === this.prerelease.length) {
        this.inc("patch", t);
      }
      this.inc("pre", t);
      break;
    case "major":
      if (
        0 === this.minor &&
        0 === this.patch &&
        0 !== this.prerelease.length
      ) {
        this.major++;
      }
      this.minor = 0;
      this.patch = 0;
      this.prerelease = [];
      break;
    case "minor":
      if (0 === this.patch && 0 !== this.prerelease.length) {
        this.minor++;
      }
      this.patch = 0;
      this.prerelease = [];
      break;
    case "patch":
      if (0 === this.prerelease.length) {
        this.patch++;
      }
      this.prerelease = [];
      break;
    case "pre":
      if (0 === this.prerelease.length) this.prerelease = [0];
      else {
        for (var r = this.prerelease.length; --r >= 0; )
          if ("number" == typeof this.prerelease[r]) {
            this.prerelease[r]++;
            r = -2;
          }
        if (-1 === r) {
          this.prerelease.push(0);
        }
      }
      if (t) {
        if (this.prerelease[0] === t) {
          if (isNaN(this.prerelease[1])) {
            this.prerelease = [t, 0];
          }
        } else {
          this.prerelease = [t, 0];
        }
      }
      break;
    default:
      throw new Error("invalid increment argument: " + e);
  }
  this.format();
  this.raw = this.version;
  return this;
};
exports.inc = function (e, t, r, n) {
  if ("string" == typeof r) {
    n = r;
    r = undefined;
  }
  try {
    return new SemVer(e, r).inc(t, n).version;
  } catch (e) {
    return null;
  }
};
exports.diff = function (e, t) {
  if (eq(e, t)) return null;
  var r = parse(e);
  var n = parse(t);
  var i = "";
  if (r.prerelease.length || n.prerelease.length) {
    i = "pre";
    var o = "prerelease";
  }
  for (var s in r)
    if (("major" === s || "minor" === s || "patch" === s) && r[s] !== n[s])
      return i + s;
  return o;
};
exports.compareIdentifiers = compareIdentifiers;
var W = /^[0-9]+$/;
function compareIdentifiers(e, t) {
  var r = W.test(e);
  var n = W.test(t);
  if (r && n) {
    e = +e;
    t = +t;
  }
  return e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}
function compare(e, t, r) {
  return new SemVer(e, r).compare(new SemVer(t, r));
}
function gt(e, t, r) {
  return compare(e, t, r) > 0;
}
function lt(e, t, r) {
  return compare(e, t, r) < 0;
}
function eq(e, t, r) {
  return 0 === compare(e, t, r);
}
function neq(e, t, r) {
  return 0 !== compare(e, t, r);
}
function ee(e, t, r) {
  return compare(e, t, r) >= 0;
}
function te(e, t, r) {
  return compare(e, t, r) <= 0;
}
function re(e, t, r, n) {
  switch (t) {
    case "===":
      if ("object" == typeof e) {
        e = e.version;
      }
      if ("object" == typeof r) {
        r = r.version;
      }
      return e === r;
    case "!==":
      if ("object" == typeof e) {
        e = e.version;
      }
      if ("object" == typeof r) {
        r = r.version;
      }
      return e !== r;
    case "":
    case "=":
    case "==":
      return eq(e, r, n);
    case "!=":
      return neq(e, r, n);
    case ">":
      return gt(e, r, n);
    case ">=":
      return ee(e, r, n);
    case "<":
      return lt(e, r, n);
    case "<=":
      return te(e, r, n);
    default:
      throw new TypeError("Invalid operator: " + t);
  }
}
function ne(e, t) {
  if (t && "object" == typeof t) {
    t = {
      loose: !!t,
      includePrerelease: false,
    };
  }
  if (e instanceof ne) {
    if (e.loose === !!t.loose) return e;
    e = e.value;
  }
  if (!(this instanceof ne)) return new ne(e, t);
  r("comparator", e, t);
  this.options = t;
  this.loose = !!t.loose;
  this.parse(e);
  if (this.semver === ie) {
    this.value = "";
  } else {
    this.value = this.operator + this.semver.version;
  }
  r("comp", this);
}
exports.rcompareIdentifiers = function (e, t) {
  return compareIdentifiers(t, e);
};
exports.major = function (e, t) {
  return new SemVer(e, t).major;
};
exports.minor = function (e, t) {
  return new SemVer(e, t).minor;
};
exports.patch = function (e, t) {
  return new SemVer(e, t).patch;
};
exports.compare = compare;
exports.compareLoose = function (e, t) {
  return compare(e, t, true);
};
exports.rcompare = function (e, t, r) {
  return compare(t, e, r);
};
exports.sort = function (e, r) {
  return e.sort(function (e, n) {
    return exports.compare(e, n, r);
  });
};
exports.rsort = function (e, r) {
  return e.sort(function (e, n) {
    return exports.rcompare(e, n, r);
  });
};
exports.gt = gt;
exports.lt = lt;
exports.eq = eq;
exports.neq = neq;
exports.gte = ee;
exports.lte = te;
exports.cmp = re;
exports.Comparator = ne;
var ie = {};
function oe(e, t) {
  if (t && "object" == typeof t) {
    t = {
      loose: !!t,
      includePrerelease: false,
    };
  }
  if (e instanceof oe)
    return e.loose === !!t.loose &&
      e.includePrerelease === !!t.includePrerelease
      ? e
      : new oe(e.raw, t);
  if (e instanceof ne) return new oe(e.value, t);
  if (!(this instanceof oe)) return new oe(e, t);
  this.options = t;
  this.loose = !!t.loose;
  this.includePrerelease = !!t.includePrerelease;
  this.raw = e;
  this.set = e
    .split(/\s*\|\|\s*/)
    .map(function (e) {
      return this.parseRange(e.trim());
    }, this)
    .filter(function (e) {
      return e.length;
    });
  if (!this.set.length) throw new TypeError("Invalid SemVer Range: " + e);
  this.format();
}
function se(e) {
  return !e || "x" === e.toLowerCase() || "*" === e;
}
function ae(e, t, r, n, i, o, s, a, c, l, u, d, p) {
  return (
    (t = se(r)
      ? ""
      : se(n)
      ? ">=" + r + ".0.0"
      : se(i)
      ? ">=" + r + "." + n + ".0"
      : ">=" + t) +
    " " +
    (a = se(c)
      ? ""
      : se(l)
      ? "<" + (+c + 1) + ".0.0"
      : se(u)
      ? "<" + c + "." + (+l + 1) + ".0"
      : d
      ? "<=" + c + "." + l + "." + u + "-" + d
      : "<=" + a)
  ).trim();
}
function ce(e, t, n) {
  for (var i = 0; i < e.length; i++) if (!e[i].test(t)) return false;
  if (t.prerelease.length && !n.includePrerelease) {
    for (i = 0; i < e.length; i++) {
      r(e[i].semver);
      if (e[i].semver !== ie && e[i].semver.prerelease.length > 0) {
        var o = e[i].semver;
        if (o.major === t.major && o.minor === t.minor && o.patch === t.patch)
          return true;
      }
    }
    return false;
  }
  return true;
}
function le(e, t, r) {
  try {
    t = new oe(t, r);
  } catch (e) {
    return false;
  }
  return t.test(e);
}
function ue(e, t, r, n) {
  var i;
  var o;
  var s;
  var a;
  var c;
  switch (((e = new SemVer(e, n)), (t = new oe(t, n)), r)) {
    case ">":
      i = gt;
      o = te;
      s = lt;
      a = ">";
      c = ">=";
      break;
    case "<":
      i = lt;
      o = ee;
      s = gt;
      a = "<";
      c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (le(e, t, n)) return false;
  for (var l = 0; l < t.set.length; ++l) {
    var u = t.set[l];
    var d = null;
    var p = null;
    u.forEach(function (e) {
      if (e.semver === ie) {
        e = new ne(">=0.0.0");
      }
      d = d || e;
      p = p || e;
      if (i(e.semver, d.semver, n)) {
        d = e;
      } else {
        if (s(e.semver, p.semver, n)) {
          p = e;
        }
      }
    });
    if (d.operator === a || d.operator === c) return !1;
    if ((!p.operator || p.operator === a) && o(e, p.semver)) return false;
    if (p.operator === c && s(e, p.semver)) return false;
  }
  return true;
}
ne.prototype.parse = function (e) {
  var t = this.options.loose ? i[F] : i[j];
  var r = e.match(t);
  if (!r) throw new TypeError("Invalid comparator: " + e);
  this.operator = r[1];
  if ("=" === this.operator) {
    this.operator = "";
  }
  if (r[2]) {
    this.semver = new SemVer(r[2], this.options.loose);
  } else {
    this.semver = ie;
  }
};
ne.prototype.toString = function () {
  return this.value;
};
ne.prototype.test = function (e) {
  r("Comparator.test", e, this.options.loose);
  return (
    this.semver === ie ||
    ("string" == typeof e && (e = new SemVer(e, this.options)),
    re(e, this.operator, this.semver, this.options))
  );
};
ne.prototype.intersects = function (e, t) {
  if (!(e instanceof ne)) throw new TypeError("a Comparator is required");
  var r;
  if (t && "object" == typeof t) {
    t = {
      loose: !!t,
      includePrerelease: false,
    };
  }
  if ("" === this.operator)
    return (r = new oe(e.value, t)), le(this.value, r, t);
  if ("" === e.operator) {
    r = new oe(this.value, t);
    return le(e.semver, r, t);
  }
  var n = !(
    (">=" !== this.operator && ">" !== this.operator) ||
    (">=" !== e.operator && ">" !== e.operator)
  );
  var i = !(
    ("<=" !== this.operator && "<" !== this.operator) ||
    ("<=" !== e.operator && "<" !== e.operator)
  );
  var o = this.semver.version === e.semver.version;
  var s = !(
    (">=" !== this.operator && "<=" !== this.operator) ||
    (">=" !== e.operator && "<=" !== e.operator)
  );
  var a =
    re(this.semver, "<", e.semver, t) &&
    (">=" === this.operator || ">" === this.operator) &&
    ("<=" === e.operator || "<" === e.operator);
  var c =
    re(this.semver, ">", e.semver, t) &&
    ("<=" === this.operator || "<" === this.operator) &&
    (">=" === e.operator || ">" === e.operator);
  return n || i || (o && s) || a || c;
};
exports.Range = oe;
oe.prototype.format = function () {
  this.range = this.set
    .map(function (e) {
      return e.join(" ").trim();
    })
    .join("||")
    .trim();
  return this.range;
};
oe.prototype.toString = function () {
  return this.range;
};
oe.prototype.parseRange = function (e) {
  var t = this.options.loose;
  e = e.trim();
  var n = t ? i[q] : i[$];
  e = e.replace(n, ae);
  r("hyphen replace", e);
  e = e.replace(i[U], "$1$2$3");
  r("comparator trim", e, i[U]);
  e = (e = (e = e.replace(i[R], "$1~")).replace(i[D], "$1^"))
    .split(/\s+/)
    .join(" ");
  var o = t ? i[F] : i[j];
  var s = e
    .split(" ")
    .map(function (e) {
      return (function (e, t) {
        r("comp", e, t);
        e = (function (e, t) {
          return e
            .trim()
            .split(/\s+/)
            .map(function (e) {
              return (function (e, t) {
                r("caret", e, t);
                var n = t.loose ? i[B] : i[M];
                return e.replace(n, function (t, n, i, o, s) {
                  var a;
                  r("caret", e, t, n, i, o, s);
                  if (se(n)) {
                    a = "";
                  } else {
                    if (se(i)) {
                      a = ">=" + n + ".0.0 <" + (+n + 1) + ".0.0";
                    } else {
                      if (se(o)) {
                        a =
                          "0" === n
                            ? ">=" +
                              n +
                              "." +
                              i +
                              ".0 <" +
                              n +
                              "." +
                              (+i + 1) +
                              ".0"
                            : ">=" + n + "." + i + ".0 <" + (+n + 1) + ".0.0";
                      } else {
                        if (s) {
                          r("replaceCaret pr", s);
                          a =
                            "0" === n
                              ? "0" === i
                                ? ">=" +
                                  n +
                                  "." +
                                  i +
                                  "." +
                                  o +
                                  "-" +
                                  s +
                                  " <" +
                                  n +
                                  "." +
                                  i +
                                  "." +
                                  (+o + 1)
                                : ">=" +
                                  n +
                                  "." +
                                  i +
                                  "." +
                                  o +
                                  "-" +
                                  s +
                                  " <" +
                                  n +
                                  "." +
                                  (+i + 1) +
                                  ".0"
                              : ">=" +
                                n +
                                "." +
                                i +
                                "." +
                                o +
                                "-" +
                                s +
                                " <" +
                                (+n + 1) +
                                ".0.0";
                        } else {
                          r("no pr");
                          a =
                            "0" === n
                              ? "0" === i
                                ? ">=" +
                                  n +
                                  "." +
                                  i +
                                  "." +
                                  o +
                                  " <" +
                                  n +
                                  "." +
                                  i +
                                  "." +
                                  (+o + 1)
                                : ">=" +
                                  n +
                                  "." +
                                  i +
                                  "." +
                                  o +
                                  " <" +
                                  n +
                                  "." +
                                  (+i + 1) +
                                  ".0"
                              : ">=" +
                                n +
                                "." +
                                i +
                                "." +
                                o +
                                " <" +
                                (+n + 1) +
                                ".0.0";
                        }
                      }
                    }
                  }
                  r("caret return", a);
                  return a;
                });
              })(e, t);
            })
            .join(" ");
        })(e, t);
        r("caret", e);
        e = (function (e, t) {
          return e
            .trim()
            .split(/\s+/)
            .map(function (e) {
              return (function (e, t) {
                var n = t.loose ? i[O] : i[N];
                return e.replace(n, function (t, n, i, o, s) {
                  var a;
                  r("tilde", e, t, n, i, o, s);
                  if (se(n)) {
                    a = "";
                  } else {
                    if (se(i)) {
                      a = ">=" + n + ".0.0 <" + (+n + 1) + ".0.0";
                    } else {
                      if (se(o)) {
                        a =
                          ">=" +
                          n +
                          "." +
                          i +
                          ".0 <" +
                          n +
                          "." +
                          (+i + 1) +
                          ".0";
                      } else {
                        if (s) {
                          r("replaceTilde pr", s);
                          a =
                            ">=" +
                            n +
                            "." +
                            i +
                            "." +
                            o +
                            "-" +
                            s +
                            " <" +
                            n +
                            "." +
                            (+i + 1) +
                            ".0";
                        } else {
                          a =
                            ">=" +
                            n +
                            "." +
                            i +
                            "." +
                            o +
                            " <" +
                            n +
                            "." +
                            (+i + 1) +
                            ".0";
                        }
                      }
                    }
                  }
                  r("tilde return", a);
                  return a;
                });
              })(e, t);
            })
            .join(" ");
        })(e, t);
        r("tildes", e);
        e = (function (e, t) {
          r("replaceXRanges", e, t);
          return e
            .split(/\s+/)
            .map(function (e) {
              return (function (e, t) {
                e = e.trim();
                var n = t.loose ? i[I] : i[k];
                return e.replace(n, function (t, n, i, o, s, a) {
                  r("xRange", e, t, n, i, o, s, a);
                  var c = se(i);
                  var l = c || se(o);
                  var u = l || se(s);
                  if ("=" === n && u) {
                    n = "";
                  }
                  if (c) {
                    t = ">" === n || "<" === n ? "<0.0.0" : "*";
                  } else {
                    if (n && u) {
                      if (l) {
                        o = 0;
                      }
                      s = 0;
                      if (">" === n) {
                        n = ">=";
                        if (l) {
                          i = +i + 1;
                          o = 0;
                          s = 0;
                        } else {
                          o = +o + 1;
                          s = 0;
                        }
                      } else {
                        if ("<=" === n) {
                          n = "<";
                          if (l) {
                            i = +i + 1;
                          } else {
                            o = +o + 1;
                          }
                        }
                      }
                      t = n + i + "." + o + "." + s;
                    } else {
                      if (l) {
                        t = ">=" + i + ".0.0 <" + (+i + 1) + ".0.0";
                      } else {
                        if (u) {
                          t =
                            ">=" +
                            i +
                            "." +
                            o +
                            ".0 <" +
                            i +
                            "." +
                            (+o + 1) +
                            ".0";
                        }
                      }
                    }
                  }
                  r("xRange return", t);
                  return t;
                });
              })(e, t);
            })
            .join(" ");
        })(e, t);
        r("xrange", e);
        e = (function (e, t) {
          r("replaceStars", e, t);
          return e.trim().replace(i[H], "");
        })(e, t);
        r("stars", e);
        return e;
      })(e, this.options);
    }, this)
    .join(" ")
    .split(/\s+/);
  if (this.options.loose) {
    s = s.filter(function (e) {
      return !!e.match(o);
    });
  }
  return s.map(function (e) {
    return new ne(e, this.options);
  }, this);
};
oe.prototype.intersects = function (e, t) {
  if (!(e instanceof oe)) throw new TypeError("a Range is required");
  return this.set.some(function (r) {
    return r.every(function (r) {
      return e.set.some(function (e) {
        return e.every(function (e) {
          return r.intersects(e, t);
        });
      });
    });
  });
};
exports.toComparators = function (e, t) {
  return new oe(e, t).set.map(function (e) {
    return e
      .map(function (e) {
        return e.value;
      })
      .join(" ")
      .trim()
      .split(" ");
  });
};
oe.prototype.test = function (e) {
  if (!e) return false;
  if ("string" == typeof e) {
    e = new SemVer(e, this.options);
  }
  for (var t = 0; t < this.set.length; t++)
    if (ce(this.set[t], e, this.options)) return true;
  return false;
};
exports.satisfies = le;
exports.maxSatisfying = function (e, t, r) {
  var n = null;
  var i = null;
  try {
    var o = new oe(t, r);
  } catch (e) {
    return null;
  }
  e.forEach(function (e) {
    if (o.test(e)) {
      if (n && -1 !== i.compare(e)) {
        i = new SemVer((n = e), r);
      }
    }
  });
  return n;
};
exports.minSatisfying = function (e, t, r) {
  var n = null;
  var i = null;
  try {
    var o = new oe(t, r);
  } catch (e) {
    return null;
  }
  e.forEach(function (e) {
    if (o.test(e)) {
      if (n && 1 !== i.compare(e)) {
        i = new SemVer((n = e), r);
      }
    }
  });
  return n;
};
exports.minVersion = function (e, t) {
  e = new oe(e, t);
  var r = new SemVer("0.0.0");
  if (e.test(r)) return r;
  r = new SemVer("0.0.0-0");
  if (e.test(r)) return r;
  r = null;
  for (var n = 0; n < e.set.length; ++n)
    e.set[n].forEach(function (e) {
      var t = new SemVer(e.semver.version);
      switch (e.operator) {
        case ">":
          if (0 === t.prerelease.length) {
            t.patch++;
          } else {
            t.prerelease.push(0);
          }
          t.raw = t.format();
        case "":
        case ">=":
          if (r && !gt(r, t)) {
            r = t;
          }
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error("Unexpected operation: " + e.operator);
      }
    });
  return r && e.test(r) ? r : null;
};
exports.validRange = function (e, t) {
  try {
    return new oe(e, t).range || "*";
  } catch (e) {
    return null;
  }
};
exports.ltr = function (e, t, r) {
  return ue(e, t, "<", r);
};
exports.gtr = function (e, t, r) {
  return ue(e, t, ">", r);
};
exports.outside = ue;
exports.prerelease = function (e, t) {
  var r = parse(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
exports.intersects = function (e, t, r) {
  e = new oe(e, r);
  t = new oe(t, r);
  return e.intersects(t);
};
exports.coerce = function (e) {
  if (e instanceof SemVer) return e;
  if ("string" != typeof e) return null;
  var t = e.match(i[A]);
  return null == t
    ? null
    : parse(t[1] + "." + (t[2] || "0") + "." + (t[3] || "0"));
};