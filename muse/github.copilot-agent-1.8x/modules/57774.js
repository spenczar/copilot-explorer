var t = (function () {
  function e() {}
  e.prototype.getUrl = function () {
    return this.url;
  };
  e.prototype.RequestParser = function () {
    this.startTime = +new Date();
  };
  e.prototype._setStatus = function (e, t) {
    var r = +new Date();
    this.duration = r - this.startTime;
    this.statusCode = e;
    var n = this.properties || {};
    if (t)
      if ("string" == typeof t) n.error = t;
      else if (t instanceof Error) n.error = t.message;
      else if ("object" == typeof t)
        for (var i in t) n[i] = t[i] && t[i].toString && t[i].toString();
    this.properties = n;
  };
  e.prototype._isSuccess = function () {
    return 0 < this.statusCode && this.statusCode < 400;
  };
  return e;
})();
module.exports = t;