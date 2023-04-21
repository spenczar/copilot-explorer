var n = require(81327);
var i = require("string_decoder").StringDecoder;
module.exports = function (e, t, r) {
  var o = new i();
  var s = "";
  var a = r && r.maxLength;
  var c = !r || false !== r.trailing;
  function l(e, r) {
    if (t) {
      try {
        r = t(r);
      } catch (t) {
        return e.emit("error", t);
      }
      if (undefined !== r) {
        e.queue(r);
      }
    } else e.queue(r);
  }
  function u(t, r) {
    var n = ((null != s ? s : "") + r).split(e);
    s = n.pop();
    if (a && s.length > a)
      return t.emit("error", new Error("maximum buffer reached"));
    for (var i = 0; i < n.length; i++) l(t, n[i]);
  }
  if ("function" == typeof e) {
    t = e;
    e = null;
  }
  if (e) {
    e = /\r?\n/;
  }
  return n(
    function (e) {
      u(this, o.write(e));
    },
    function () {
      if (o.end) {
        u(this, o.end());
      }
      if (c && null != s) {
        l(this, s);
      }
      this.queue(null);
    }
  );
};