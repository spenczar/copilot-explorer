const { connect: n, constants: i } = require("http2");
const { Readable: o } = require("stream");
const s = require(41241)("helix-fetch:h2");
const { RequestAbortedError: a } = require(75899);
const { decodeStream: c } = require(45591);
const { NGHTTP2_CANCEL: l } = i;
const u = 3e5;
const d = 5e3;
const p = (e, t, r, n = () => {}) => {
  const i = {
    ...e,
  };
  const o = i[":status"];
  delete i[":status"];
  const s = r ? c(o, e, t, n) : t;
  return {
    statusCode: o,
    statusText: "",
    httpVersion: "2.0",
    httpVersionMajor: 2,
    httpVersionMinor: 0,
    headers: i,
    readable: s,
    decoded: !(!r || s === t),
  };
};
module.exports = {
  request: async (e, t, r) => {
    const { origin: i, pathname: c, search: h, hash: f } = t;
    const g = `${c}${h}${f}`;
    const {
      options: { h2: m = {} },
      h2: { sessionCache: y },
    } = e;
    const {
      idleSessionTimeout: v = u,
      pushPromiseHandler: _,
      pushHandler: b,
    } = m;
    const w = {
      ...r,
    };
    const { method: C, headers: E, socket: T, body: S, decode: x } = w;
    if (T) {
      delete w.socket;
    }
    if (E.host) {
      E[":authority"] = E.host;
      delete E.host;
    }
    return new Promise((r, c) => {
      let u;
      let h = y[i];
      if (!h || h.closed || h.destroyed) {
        const t = !(
          false === e.options.rejectUnauthorized ||
          false === m.rejectUnauthorized
        );
        const r = {
          ...m,
          rejectUnauthorized: t,
        };
        if (T && !T.inUse) {
          r.createConnection = () => (
            s(`reusing socket #${T.id} (${T.servername})`), (T.inUse = true), T
          );
        }
        const o = !(!_ && !b);
        h = n(i, {
          ...r,
          settings: {
            enablePush: o,
          },
        });
        h.setMaxListeners(1e3);
        h.setTimeout(v, () => {
          s(`closing session ${i} after ${v} ms of inactivity`);
          h.close();
        });
        h.once("connect", () => {
          s(`session ${i} established`);
          s(`caching session ${i}`);
          y[i] = h;
        });
        h.on("localSettings", (e) => {
          s(`session ${i} localSettings: ${JSON.stringify(e)}`);
        });
        h.on("remoteSettings", (e) => {
          s(`session ${i} remoteSettings: ${JSON.stringify(e)}`);
        });
        h.once("close", () => {
          s(`session ${i} closed`);
          if (y[i] === h) {
            s(`discarding cached session ${i}`);
            delete y[i];
          }
        });
        h.once("error", (e) => {
          s(`session ${i} encountered error: ${e}`);
          if (y[i] === h) {
            s(`discarding cached session ${i}`);
            delete y[i];
          }
        });
        h.on("frameError", (e, t, r) => {
          s(
            `session ${i} encountered frameError: type: ${e}, code: ${t}, id: ${r}`
          );
        });
        h.once("goaway", (e, t, r) => {
          s(
            `session ${i} received GOAWAY frame: errorCode: ${e}, lastStreamID: ${t}, opaqueData: ${
              r ? r.toString() : undefined
            }`
          );
        });
        h.on("stream", (t, r, n) => {
          ((e, t, r, n, i, o) => {
            const {
              options: {
                h2: {
                  pushPromiseHandler: a,
                  pushHandler: c,
                  pushedStreamIdleTimeout: u = d,
                },
              },
            } = e;
            const h = i[":path"];
            const f = `${t}${h}`;
            s(
              `received PUSH_PROMISE: ${f}, stream #${
                n.id
              }, headers: ${JSON.stringify(i)}, flags: ${o}`
            );
            if (a) {
              a(f, i, () => {
                n.close(l);
              });
            }
            n.on("push", (e, o) => {
              s(
                `received push headers for ${t}${h}, stream #${
                  n.id
                }, headers: ${JSON.stringify(e)}, flags: ${o}`
              );
              n.setTimeout(u, () => {
                s(`closing pushed stream #${n.id} after ${u} ms of inactivity`);
                n.close(l);
              });
              if (c) {
                c(f, i, p(e, n, r));
              }
            });
            n.on("aborted", () => {
              s(`pushed stream #${n.id} aborted`);
            });
            n.on("error", (e) => {
              s(`pushed stream #${n.id} encountered error: ${e}`);
            });
            n.on("frameError", (e, t, r) => {
              s(
                `pushed stream #${n.id} encountered frameError: type: ${e}, code: ${t}, id: ${r}`
              );
            });
          })(e, i, x, t, r, n);
        });
      } else if (T && T.id !== h.socket.id && !T.inUse) {
        s(
          `discarding redundant socket used for ALPN: #${T.id} ${T.servername}`
        );
        T.destroy();
      }
      s(`${C} ${t.host}${g}`);
      const { signal: f } = w;
      const k = () => {
        f.removeEventListener("abort", k);
        c(new a());
        if (u) {
          u.close(l);
        }
      };
      if (f) {
        if (f.aborted) return void c(new a());
        f.addEventListener("abort", k);
      }
      const I = (e) => {
        s(`session ${i} encountered error during ${w.method} ${t.href}: ${e}`);
        c(e);
      };
      h.once("error", I);
      u = h.request({
        ":method": C,
        ":path": g,
        ...E,
      });
      u.once("response", (e) => {
        h.off("error", I);
        if (f) {
          f.removeEventListener("abort", k);
        }
        r(p(e, u, w.decode, c));
      });
      u.once("error", (e) => {
        h.off("error", I);
        if (f) {
          f.removeEventListener("abort", k);
        }
        if (u.rstCode !== l) {
          s(`${w.method} ${t.href} failed with: ${e.message}`);
          u.close(l);
          c(e);
        }
      });
      u.once("frameError", (e, r, n) => {
        h.off("error", I);
        s(
          `encountered frameError during ${w.method} ${t.href}: type: ${e}, code: ${r}, id: ${n}`
        );
      });
      u.on("push", (e, t) => {
        s(`received 'push' event: headers: ${JSON.stringify(e)}, flags: ${t}`);
      });
      if (S instanceof o) {
        S.pipe(u);
      } else {
        if (S) {
          u.write(S);
        }
        u.end();
      }
    });
  },
  setupContext: (e) => {
    e.h2 = {
      sessionCache: {},
    };
  },
  resetContext: async ({ h2: e }) =>
    Promise.all(
      Object.values(e.sessionCache).map(
        (e) =>
          new Promise((t) => {
            e.on("close", t);
            s(
              `resetContext: destroying session (socket #${
                e.socket && e.socket.id
              }, ${e.socket && e.socket.servername})`
            );
            e.destroy();
          })
      )
    ),
};