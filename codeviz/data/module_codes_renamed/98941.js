const { Readable: n } = require("stream");
const { Headers: i } = require("HTTP-Header-Validator");
const { Response: o } = require("ResponseManager");
const s = Symbol("CacheableResponse internals");
class a extends o {
  constructor(e, t) {
    super(e, t);
    const r = new i(t.headers);
    this[s] = {
      headers: r,
      bufferedBody: e,
    };
  }
  get headers() {
    return this[s].headers;
  }
  set headers(e) {
    if (!(e instanceof i)) throw new TypeError("instance of Headers expected");
    this[s].headers = e;
  }
  get body() {
    return n.from(this[s].bufferedBody);
  }
  get bodyUsed() {
    return false;
  }
  async buffer() {
    return this[s].bufferedBody;
  }
  async arrayBuffer() {
    return (e = this[s].bufferedBody).buffer.slice(
      e.byteOffset,
      e.byteOffset + e.byteLength
    );
    var e;
  }
  async text() {
    return this[s].bufferedBody.toString();
  }
  async json() {
    return JSON.parse(await this.text());
  }
  clone() {
    const {
      url: e,
      status: t,
      statusText: r,
      headers: n,
      httpVersion: i,
      decoded: o,
      counter: c,
    } = this;
    return new a(this[s].bufferedBody, {
      url: e,
      status: t,
      statusText: r,
      headers: n,
      httpVersion: i,
      decoded: o,
      counter: c,
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
}
module.exports = {
  cacheableResponse: async (e) => {
    const t = await e.buffer();
    const {
      url: r,
      status: n,
      statusText: i,
      headers: o,
      httpVersion: s,
      decoded: c,
      counter: l,
    } = e;
    return new a(t, {
      url: r,
      status: n,
      statusText: i,
      headers: o,
      httpVersion: s,
      decoded: c,
      counter: l,
    });
  },
};
