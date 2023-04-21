const M_HTTPHeaderParser_maybe = require("HTTPHeaderParser");
const { Headers: i } = require("HTTP-Header-Validator");
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
    this.policy = new M_HTTPHeaderParser_maybe(o(e), s(t), r);
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
