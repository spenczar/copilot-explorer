module.exports = (e, t, r) => {
  const n = (r) =>
    Object.defineProperty(e, t, {
      value: r,
      enumerable: true,
      writable: true,
    });
  Object.defineProperty(e, t, {
    configurable: true,
    enumerable: true,
    get() {
      const e = r();
      n(e);
      return e;
    },
    set(e) {
      n(e);
    },
  });
  return e;
};
