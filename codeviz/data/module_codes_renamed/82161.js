Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.createFakeStreamResponse =
  exports.createFakeResponse =
  exports.createTestCertificateReader =
    undefined;
const M_stream = require("stream");
const M_FetcherRequestManager_maybe = require("FetcherRequestManager");
const M_RootCertificateReaderManager_maybe = require("RootCertificateReaderManager");
class s extends M_RootCertificateReaderManager_maybe.RootCertificateReader {
  constructor(e) {
    super();
    this.certificates = e;
  }
  async getAllRootCAs() {
    return this.certificates;
  }
}
exports.createTestCertificateReader = (e) => new s(e);
exports.createFakeResponse = function (e, t = "body") {
  return new M_FetcherRequestManager_maybe.Response(
    e,
    "status text",
    new a(),
    () => Promise.resolve("response-text"),
    () => Promise.resolve(t),
    async () => null
  );
};
exports.createFakeStreamResponse = function (e) {
  return new M_FetcherRequestManager_maybe.Response(
    200,
    "Success",
    new a(),
    async () => e,
    async () => null,
    async () =>
      (function (...e) {
        const t = new M_stream.Readable();
        t._read = () => {};
        for (const r of e) t.push(r);
        t.push(null);
        return t;
      })(e)
  );
};
class a {
  constructor() {
    this.headers = new Map();
  }
  append(e, t) {
    this.headers.set(e, t);
  }
  delete(e) {
    this.headers.delete(e);
  }
  get(e) {
    return this.headers.get(e) ?? null;
  }
  has(e) {
    return this.headers.has(e);
  }
  set(e, t) {
    this.headers.set(e, t);
  }
  entries() {
    return this.headers.entries();
  }
  keys() {
    return this.headers.keys();
  }
  values() {
    return this.headers.values();
  }
  [Symbol.iterator]() {
    return this.headers.entries();
  }
}
