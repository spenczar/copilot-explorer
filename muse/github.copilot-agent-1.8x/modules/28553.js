var n;
var i;
var o;
var s;
var a;
var c;
var l;
var u;
var d;
var p;
var h;
function f(e) {
  return function () {
    var t;
    var r = this;
    t = [].slice.call(arguments);
    return new Promise(function (n, i) {
      t.push(function (e, t) {
        if (e) {
          i(e);
        } else {
          n(t);
        }
      });
      e.apply(r, t);
    });
  };
}
function g() {}
n = require("fs");
i = require("os");
o = require("path");
s = require(46467);
a = require(59424);
c = require(54586);
module.exports = function (e) {
  var t;
  var a;
  var c;
  var f;
  var m;
  f = {};
  m = new Set();
  return function (e) {
    return Promise.resolve(e).then(y);
  };
  function y(p) {
    var h;
    var m;
    if (p) {
      if (a) {
        a = ((h = e.save || e.$ave),
        "string" == typeof h
          ? (h = [h])
          : Array.isArray(h) ||
            (h = [
              o.join(__dirname, "../pem"),
              o.join(i.homedir(), ".local/win-ca/pem"),
            ]),
        (m = 0),
        (function e() {
          return m < h.length ? s(h[m++]).catch(e) : Promise.resolve();
        })()).then(function (e) {
          return (t = e);
        });
      }
      a = a.then(function () {
        if (t)
          return (function (e) {
            var t;
            var r;
            (c || (c = n.createWriteStream(v("roots.pem")))).write((t = l(e)));
            if (f[(r = u(e))]) {
              f[r] = 0;
            }
            return d(v(r + "." + f[r]++), t).catch(g);
          })(p);
      });
    } else {
      if (a) {
        a.then(_).then(function () {
          if (null != c) {
            c.end();
          }
          if (t && e.$ave) {
            process.env.SSL_CERT_DIR = require(79321).path = t;
          }
          if ("function" == typeof e.onsave) {
            e.onsave(t);
          }
        });
      } else {
        if ("function" == typeof e.onsave) {
          e.onsave();
        }
      }
    }
  }
  function v(e) {
    m.add(e);
    return o.join(t, e);
  }
  function _() {
    if (t) {
      p(t)
        .then(function (e) {
          return Promise.all(
            e
              .filter(function (e) {
                return !m.has(e);
              })
              .map(function (e) {
                return o.join(t, e);
              })
              .map(function (e) {
                return h(e).catch(g);
              })
          );
        })
        .catch(g);
    }
  }
};
l = a(a.txt);
u = c();
d = f(n.writeFile);
p = f(n.readdir);
h = f(n.unlink);