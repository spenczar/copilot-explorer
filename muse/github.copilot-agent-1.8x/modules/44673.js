const n = require(41241)("helix-fetch:core");
const {
  request: i,
  setupContext: o,
  resetContext: s,
  RequestAbortedError: a,
  ALPN_HTTP2: c,
  ALPN_HTTP2C: l,
  ALPN_HTTP1_1: u,
  ALPN_HTTP1_0: d,
} = require(56633);
class p {
  constructor(e) {
    this.options = {
      ...(e || {}),
    };
    o(this);
  }
  api() {
    return {
      request: async (e, t) => this.request(e, t),
      context: (e = {}) => new p(e).api(),
      reset: async () => this.reset(),
      RequestAbortedError: a,
      ALPN_HTTP2: c,
      ALPN_HTTP2C: l,
      ALPN_HTTP1_1: u,
      ALPN_HTTP1_0: d,
    };
  }
  async request(e, t) {
    return i(this, e, t);
  }
  async reset() {
    n("resetting context");
    return s(this);
  }
}
module.exports = new p().api();