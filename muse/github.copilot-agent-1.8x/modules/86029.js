const { randomBytes: n } = require("crypto");
const { Readable: i } = require("stream");
const o = (e) =>
  "object" == typeof e &&
  0 ===
    ["arrayBuffer", "stream", "text", "slice", "constructor"]
      .map((t) => typeof e[t])
      .filter((e) => "function" !== e).length &&
  "string" == typeof e.type &&
  "number" == typeof e.size &&
  /^(Blob|File)$/.test(e[Symbol.toStringTag]);
const s = (e) => `--${e}--\r\n\r\n`;
const a = (e, t, r) => {
  let n = "";
  n += `--${e}\r\n`;
  n += `Content-Disposition: form-data; name="${t}"`;
  if (o(r)) {
    n += `; filename="${r.name}"\r\n`;
    n += `Content-Type: ${r.type || "application/octet-stream"}`;
  }
  return `${n}\r\n\r\n`;
};
module.exports = {
  isFormData: (e) =>
    null != e &&
    "object" == typeof e &&
    0 ===
      [
        "append",
        "delete",
        "get",
        "getAll",
        "has",
        "set",
        "keys",
        "values",
        "entries",
        "constructor",
      ]
        .map((t) => typeof e[t])
        .filter((e) => "function" !== e).length &&
    "FormData" === e[Symbol.toStringTag],
  FormDataSerializer: class {
    constructor(e) {
      this.fd = e;
      this.boundary = n(8).toString("hex");
    }
    length() {
      if (undefined === this._length) {
        this._length = ((e, t) => {
          let r = 0;
          for (const [n, i] of e) {
            r += Buffer.byteLength(a(t, n, i));
            r += o(i) ? i.size : Buffer.byteLength(String(i));
            r += Buffer.byteLength("\r\n");
          }
          r += Buffer.byteLength(s(t));
          return r;
        })(this.fd, this.boundary);
      }
      return this._length;
    }
    contentType() {
      return `multipart/form-data; boundary=${this.boundary}`;
    }
    stream() {
      return i.from(
        (async function* (e, t) {
          for (const [r, n] of e) {
            yield a(t, r, n);
            if (o(n)) {
              yield* n.stream();
            } else {
              yield n;
            }
            yield "\r\n";
          }
          yield s(t);
        })(this.fd, this.boundary)
      );
    }
  },
};