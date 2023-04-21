const { EventEmitter: n } = require("events");
module.exports = () => {
  const e = {};
  const t = new n();
  t.setMaxListeners(0);
  return {
    acquire: (r) =>
      new Promise((n) => {
        if (!e[r]) {
          e[r] = true;
          return void n();
        }
        const i = (o) => {
          if (e[r]) {
            e[r] = true;
            t.removeListener(r, i);
            n(o);
          }
        };
        t.on(r, i);
      }),
    release: (r, n) => {
      Reflect.deleteProperty(e, r);
      setImmediate(() => t.emit(r, n));
    },
  };
};
