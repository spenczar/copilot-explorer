class t extends Error {
  constructor(e, t) {
    super(e);
    this.type = t;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
}
module.exports = {
  FetchBaseError: t,
  FetchError: class extends t {
    constructor(e, t, r) {
      super(e, t);
      if (r) {
        this.code = this.errno = r.code;
        this.erroredSysCall = r.syscall;
      }
    }
  },
  AbortError: class extends t {
    constructor(e, t = "aborted") {
      super(e, t);
    }
  },
};