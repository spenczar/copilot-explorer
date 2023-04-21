Object.defineProperty(exports, "__esModule", {
  value: true,
});
var n = require("path");
var i = require(56190);
var o = require("module");
var s = Object.keys(process.binding("natives"));
var a = o.prototype.require;
exports.makePatchingRequire = function (e) {
  var t = {};
  return function (r) {
    var c = a.apply(this, arguments);
    if (e[r]) {
      var l = o._resolveFilename(r, this);
      if (t.hasOwnProperty(l)) return t[l];
      var u = undefined;
      if (s.indexOf(r) < 0)
        try {
          u = a.call(this, n.join(r, "package.json")).version;
        } catch (e) {
          return c;
        }
      else u = process.version.substring(1);
      var d = u.indexOf("-");
      if (d >= 0) {
        u = u.substring(0, d);
      }
      for (p = c, h = 0, f = e[r], undefined; h < f.length; h++) {
        var p;
        var h;
        var f;
        var g = f[h];
        if (i.satisfies(u, g.versionSpecifier)) {
          p = g.patch(p, l);
        }
      }
      return (t[l] = p);
    }
    return c;
  };
};