const n = require(13573);
const { Headers: i } = require(48226);
const o = (e) => ({
  url: e.url,
  method: e.method,
  headers: e.headers.plain(),
});
const s = (e) => ({
  status: e.status,
  headers: e.headers.plain(),
});
module.exports = class {
  constructor(e, t, r) {
    this.policy = new n(o(e), s(t), r);
  }
  storable() {
    return this.policy.storable();
  }
  satisfiesWithoutRevalidation(e) {
    return this.policy.satisfiesWithoutRevalidation(o(e));
  }
  responseHeaders(e) {
    return new i(this.policy.responseHeaders(s(e)));
  }
  timeToLive() {
    return this.policy.timeToLive();
  }
};