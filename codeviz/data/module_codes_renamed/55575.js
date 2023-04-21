const t = (e, t) =>
  function () {
    const r = t.promiseModule;
    const n = new Array(arguments.length);
    for (let e = 0; e < arguments.length; e++) n[e] = arguments[e];
    return new r((r, i) => {
      if (t.errorFirst) {
        n.push(function (e, n) {
          if (t.multiArgs) {
            const t = new Array(arguments.length - 1);
            for (let e = 1; e < arguments.length; e++) t[e - 1] = arguments[e];
            if (e) {
              t.unshift(e);
              i(t);
            } else {
              r(t);
            }
          } else if (e) {
            i(e);
          } else {
            r(n);
          }
        });
      } else {
        n.push(function (e) {
          if (t.multiArgs) {
            const e = new Array(arguments.length - 1);
            for (let t = 0; t < arguments.length; t++) e[t] = arguments[t];
            r(e);
          } else r(e);
        });
      }
      e.apply(this, n);
    });
  };
module.exports = (e, r) => {
  r = Object.assign(
    {
      exclude: [/.+(Sync|Stream)$/],
      errorFirst: true,
      promiseModule: Promise,
    },
    r
  );
  const n = (e) => {
    const t = (t) => ("string" == typeof t ? e === t : t.test(e));
    return r.include ? r.include.some(t) : !r.exclude.some(t);
  };
  let i;
  i =
    "function" == typeof e
      ? function () {
          return r.excludeMain
            ? e.apply(this, arguments)
            : t(e, r).apply(this, arguments);
        }
      : Object.create(Object.getPrototypeOf(e));
  for (const o in e) {
    const s = e[o];
    i[o] = "function" == typeof s && n(o) ? t(s, r) : s;
  }
  return i;
};
