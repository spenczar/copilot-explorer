var M_fs;
var M_os;
var M_path;
var M_mkdir_recursive_maybe;
var M_X509CertificateUtils_maybe;
var M_CertificateHashGenerator_maybe;
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
M_fs = require("fs");
M_os = require("os");
M_path = require("path");
M_mkdir_recursive_maybe = require("mkdir-recursive");
M_X509CertificateUtils_maybe = require("X509CertificateUtils");
M_CertificateHashGenerator_maybe = require("CertificateHashGenerator");
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
              M_path.join(__dirname, "../pem"),
              M_path.join(M_os.homedir(), ".local/win-ca/pem"),
            ]),
        (m = 0),
        (function e() {
          return m < h.length
            ? M_mkdir_recursive_maybe(h[m++]).catch(e)
            : Promise.resolve();
        })()).then(function (e) {
          return (t = e);
        });
      }
      a = a.then(function () {
        if (t)
          return (function (e) {
            var t;
            var r;
            (c || (c = M_fs.createWriteStream(v("roots.pem")))).write(
              (t = l(e))
            );
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
            process.env.SSL_CERT_DIR =
              require("ContextualDataParsingUtils").path = t;
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
    return M_path.join(t, e);
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
                return M_path.join(t, e);
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
l = M_X509CertificateUtils_maybe(M_X509CertificateUtils_maybe.txt);
u = M_CertificateHashGenerator_maybe();
d = f(M_fs.writeFile);
p = f(M_fs.readdir);
h = f(M_fs.unlink);
