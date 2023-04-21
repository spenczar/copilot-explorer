Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.WrappedConnection = undefined;
const n = require("fs");
const i = require("stream");
const o = require(35809);
const s = require(5798);
const a = require(20913);
const c = require(4445);
class WrappedConnection {
  constructor(e) {
    this.conn = e;
  }
  static from(e, t, r) {
    let u = r;
    const d = parseInt(process.env.GH_COPILOT_DEBUG_UI_PORT);
    if (!isNaN(d))
      try {
        u = new c.DebugServer(d).listen().wrapStdout(r);
      } catch (t) {
        new s.Logger(s.LogLevel.WARN, "agent").error(
          e,
          `Failed to start debug server on port ${d} (maybe it's in use?)`,
          t
        );
      }
    if (e.get(a.RuntimeMode).flags.recordInput) {
      const e = Date.now().toString();
      const r = `stdin${e}.log`;
      t.on("data", (e) => {
        n.appendFile(r, e, (e) => {
          if (e) {
            console.error(e);
          }
        });
      });
      const o = `stdout${e}.log`;
      p = u;
      h = (e) => {
        n.appendFile(o, e, (e) => {
          if (e) {
            console.error(e);
          }
        });
      };
      u = new i.Writable({
        write: (e, t, r) => (h(e.toString()), p.write(e, t, r)),
      });
    }
    var p;
    var h;
    const f = o.createConnection(
      o.ProposedFeatures.all,
      new o.StreamMessageReader(t),
      new o.StreamMessageWriter(u)
    );
    return new WrappedConnection(f);
  }
  listen() {
    this.conn.listen();
  }
}
exports.WrappedConnection = WrappedConnection;