var n = require("stream");
function i(e, t, r) {
  e =
    e ||
    function (e) {
      this.queue(e);
    };
  t =
    t ||
    function () {
      this.queue(null);
    };
  var i = false;
  var o = false;
  var s = [];
  var a = false;
  var c = new n();
  function l() {
    for (; s.length && !c.paused; ) {
      var e = s.shift();
      if (null === e) return c.emit("end");
      c.emit("data", e);
    }
  }
  function u() {
    c.writable = false;
    t.call(c);
    if (!c.readable && c.autoDestroy) {
      c.destroy();
    }
  }
  c.readable = c.writable = true;
  c.paused = false;
  c.autoDestroy = !(r && false === r.autoDestroy);
  c.write = function (t) {
    e.call(this, t);
    return !c.paused;
  };
  c.queue = c.push = function (e) {
    if (a) {
      if (null === e) {
        a = true;
      }
      s.push(e);
      l();
    }
    return c;
  };
  c.on("end", function () {
    c.readable = false;
    if (!c.writable && c.autoDestroy) {
      process.nextTick(function () {
        c.destroy();
      });
    }
  });
  c.end = function (e) {
    if (!i) {
      i = true;
      if (arguments.length) {
        c.write(e);
      }
      u();
      return c;
    }
  };
  c.destroy = function () {
    if (!o) {
      o = true;
      i = true;
      s.length = 0;
      c.writable = c.readable = false;
      c.emit("close");
      return c;
    }
  };
  c.pause = function () {
    if (!c.paused) {
      c.paused = true;
      return c;
    }
  };
  c.resume = function () {
    if (c.paused) {
      c.paused = false;
      c.emit("resume");
    }
    l();
    if (c.paused) {
      c.emit("drain");
    }
    return c;
  };
  return c;
}
module.exports = i;
i.through = i;