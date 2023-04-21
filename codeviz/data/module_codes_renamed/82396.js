var M_ErrorFormatter_maybe = require("ErrorFormatter");
function i() {
  this.extend = new a();
  this.filter = new a();
  this.format = new c();
  this.version = require("version-constants").i8;
}
var o = false;
i.prototype.callSite = function e(t) {
  if (t) {
    t = {};
  }
  o = true;
  var r = {};
  Error.captureStackTrace(r, e);
  var n = r.stack;
  o = false;
  n = n.slice(t.slice || 0);
  if (t.extend) {
    n = this.extend._modify(r, n);
  }
  if (t.filter) {
    n = this.filter._modify(r, n);
  }
  return n;
};
var s = new i();
function a() {
  this._modifiers = [];
}
function c() {
  this._formater = M_ErrorFormatter_maybe;
  this._previous = undefined;
}
a.prototype._modify = function (e, t) {
  for (r = 0, n = this._modifiers.length, undefined; r < n; r++) {
    var r;
    var n;
    t = this._modifiers[r](e, t);
  }
  return t;
};
a.prototype.attach = function (e) {
  this._modifiers.push(e);
};
a.prototype.deattach = function (e) {
  var t = this._modifiers.indexOf(e);
  return -1 !== t && (this._modifiers.splice(t, 1), true);
};
c.prototype.replace = function (e) {
  if (e) {
    this._formater = e;
  } else {
    this.restore();
  }
};
c.prototype.restore = function () {
  this._formater = M_ErrorFormatter_maybe;
  this._previous = undefined;
};
c.prototype._backup = function () {
  this._previous = this._formater;
};
c.prototype._roolback = function () {
  if (this._previous === M_ErrorFormatter_maybe) {
    this.replace(undefined);
  } else {
    this.replace(this._previous);
  }
  this._previous = undefined;
};
if (Error.prepareStackTrace) {
  s.format.replace(Error.prepareStackTrace);
}
var l = false;
function u(e, t) {
  if (o) return t;
  if (l) return M_ErrorFormatter_maybe(e, t);
  var r = t.concat();
  r = s.extend._modify(e, r);
  r = (r = s.filter._modify(e, r)).slice(0, Error.stackTraceLimit);
  if (
    Object.isExtensible(e) &&
    undefined === Object.getOwnPropertyDescriptor(e, "callSite")
  ) {
    e.callSite = {
      original: t,
      mutated: r,
    };
  }
  l = true;
  var i = s.format._formater(e, r);
  l = false;
  return i;
}
Object.defineProperty(Error, "prepareStackTrace", {
  get: function () {
    return u;
  },
  set: function (e) {
    if (e === u) {
      s.format._roolback();
    } else {
      s.format._backup();
      s.format.replace(e);
    }
  },
});
Object.defineProperty(Error.prototype, "callSite", {
  get: function () {
    this.stack;
    return this.callSite;
  },
  set: function (e) {
    Object.defineProperty(this, "callSite", {
      value: e,
      writable: true,
      configurable: true,
    });
  },
  configurable: true,
});
module.exports = s;
