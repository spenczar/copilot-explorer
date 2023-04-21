const n = process.binding("async_wrap");
const i = n.Providers.TIMERWRAP;
const o = {
  nextTick: require(13191),
  promise: require(20493),
  timers: require(68280),
};
const s = new Set();
function a() {
  this.enabled = false;
  this.counter = 0;
}
function c() {
  const e = (this.initFns = []);
  const t = (this.preFns = []);
  const r = (this.postFns = []);
  const n = (this.destroyFns = []);
  this.init = function (t, r, n, o) {
    if (r !== i) for (const i of e) i(t, this, r, n, o);
    else s.add(t);
  };
  this.pre = function (e) {
    if (!s.has(e)) for (const r of t) r(e, this);
  };
  this.post = function (e, t) {
    if (!s.has(e)) for (const n of r) n(e, this, t);
  };
  this.destroy = function (e) {
    if (s.has(e)) s.delete(e);
    else for (const t of n) t(e);
  };
}
function l(e, t) {
  const r = e.indexOf(t);
  if (-1 !== r) {
    e.splice(r, 1);
  }
}
function u() {
  this._state = new a();
  this._hooks = new c();
  this.version = require(43186).i8;
  this.providers = n.Providers;
  for (const e of Object.keys(o)) o[e].call(this);
  if (process.env.hasOwnProperty("NODE_ASYNC_HOOK_WARNING")) {
    console.warn("warning: you are using async-hook-jl which is unstable.");
  }
  n.setupHooks({
    init: this._hooks.init,
    pre: this._hooks.pre,
    post: this._hooks.post,
    destroy: this._hooks.destroy,
  });
}
c.prototype.add = function (e) {
  if (e.init) {
    this.initFns.push(e.init);
  }
  if (e.pre) {
    this.preFns.push(e.pre);
  }
  if (e.post) {
    this.postFns.push(e.post);
  }
  if (e.destroy) {
    this.destroyFns.push(e.destroy);
  }
};
c.prototype.remove = function (e) {
  if (e.init) {
    l(this.initFns, e.init);
  }
  if (e.pre) {
    l(this.preFns, e.pre);
  }
  if (e.post) {
    l(this.postFns, e.post);
  }
  if (e.destroy) {
    l(this.destroyFns, e.destroy);
  }
};
module.exports = u;
u.prototype.addHooks = function (e) {
  this._hooks.add(e);
};
u.prototype.removeHooks = function (e) {
  this._hooks.remove(e);
};
u.prototype.enable = function () {
  this._state.enabled = true;
  n.enable();
};
u.prototype.disable = function () {
  this._state.enabled = false;
  n.disable();
};