Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.debounce = exports.Debouncer = undefined;
exports.Debouncer = class {
  async debounce(e) {
    if (this.state) {
      clearTimeout(this.state.timer);
      this.state.reject();
      this.state = undefined;
    }
    return new Promise((t, r) => {
      this.state = {
        timer: setTimeout(() => t(), e),
        reject: r,
      };
    });
  }
};
exports.debounce = function (e, t) {
  let r;
  return (...n) => (
    r && clearTimeout(r),
    new Promise((i) => {
      r = setTimeout(() => {
        const e = t(...n);
        i(e);
      }, e);
    })
  );
};