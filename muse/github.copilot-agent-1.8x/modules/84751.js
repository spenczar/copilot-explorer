const n = require("http");
const i = require("https");
const { Readable: o } = require("stream");
const s = require(41241)("helix-fetch:h1");
const { RequestAbortedError: a } = require(75899);
const { decodeStream: c } = require(45591);
module.exports = {
  request: async (e, t, r) => {
    const { request: l } = "https:" === t.protocol ? i : n;
    const u = ((e, t) => {
      const {
        h1: r,
        options: { h1: o, rejectUnauthorized: s },
      } = e;
      return "https:" === t
        ? r.httpsAgent
          ? r.httpsAgent
          : o || "boolean" == typeof s
          ? ((r.httpsAgent = new i.Agent(
              "boolean" == typeof s
                ? {
                    ...(o || {}),
                    rejectUnauthorized: s,
                  }
                : o
            )),
            r.httpsAgent)
          : undefined
        : r.httpAgent
        ? r.httpAgent
        : o
        ? ((r.httpAgent = new n.Agent(o)), r.httpAgent)
        : undefined;
    })(e, t.protocol);
    const d = {
      ...r,
      agent: u,
    };
    const { socket: p, body: h } = d;
    if (p) {
      delete d.socket;
      if (p.assigned) {
        p.assigned = true;
        if (u) {
          d.agent = new Proxy(u, {
            get: (e, t) =>
              "createConnection" !== t || p.inUse
                ? e[t]
                : (e, t) => {
                    s(`agent reusing socket #${p.id} (${p.servername})`);
                    p.inUse = true;
                    t(null, p);
                  },
          });
        } else {
          d.createConnection = (e, t) => {
            s(`reusing socket #${p.id} (${p.servername})`);
            p.inUse = true;
            t(null, p);
          };
        }
      }
    }
    return new Promise((e, r) => {
      let n;
      s(`${d.method} ${t.href}`);
      const { signal: i } = d;
      const u = () => {
        i.removeEventListener("abort", u);
        if (p && !p.inUse) {
          s(
            `discarding redundant socket used for ALPN: #${p.id} ${p.servername}`
          );
          p.destroy();
        }
        r(new a());
        if (n) {
          n.abort();
        }
      };
      if (i) {
        if (i.aborted) return void r(new a());
        i.addEventListener("abort", u);
      }
      n = l(t, d);
      n.once("response", (t) => {
        if (i) {
          i.removeEventListener("abort", u);
        }
        if (p && !p.inUse) {
          s(
            `discarding redundant socket used for ALPN: #${p.id} ${p.servername}`
          );
          p.destroy();
        }
        e(
          ((e, t, r) => {
            const {
              statusCode: n,
              statusMessage: i,
              httpVersion: o,
              httpVersionMajor: s,
              httpVersionMinor: a,
              headers: l,
            } = e;
            const u = t ? c(n, l, e, r) : e;
            return {
              statusCode: n,
              statusText: i,
              httpVersion: o,
              httpVersionMajor: s,
              httpVersionMinor: a,
              headers: l,
              readable: u,
              decoded: !(!t || u === e),
            };
          })(t, d.decode, r)
        );
      });
      n.once("error", (e) => {
        if (i) {
          i.removeEventListener("abort", u);
        }
        if (p && !p.inUse) {
          s(
            `discarding redundant socket used for ALPN: #${p.id} ${p.servername}`
          );
          p.destroy();
        }
        if (n.aborted) {
          s(`${d.method} ${t.href} failed with: ${e.message}`);
          n.abort();
          r(e);
        }
      });
      if (h instanceof o) {
        h.pipe(n);
      } else {
        if (h) {
          n.write(h);
        }
        n.end();
      }
    });
  },
  setupContext: (e) => {
    e.h1 = {};
  },
  resetContext: async ({ h1: e }) => {
    if (e.httpAgent) {
      s("resetContext: destroying httpAgent");
      e.httpAgent.destroy();
      delete e.httpAgent;
    }
    if (e.httpsAgent) {
      s("resetContext: destroying httpsAgent");
      e.httpsAgent.destroy();
      delete e.httpsAgent;
    }
  },
};