Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.WrappedConnection = undefined;
const M_fs = require("fs");
const M_stream = require("stream");
const M_connection_manager_maybe = require("connection-manager");
const M_LoggingUtils_maybe = require("LoggingUtils");
const M_RuntimeModeManager_maybe = require("RuntimeModeManager");
const M_DebugServerModule_maybe = require("DebugServerModule");
class WrappedConnection {
  constructor(e) {
    this.conn = e;
  }
  static from(e, t, r) {
    let u = r;
    const d = parseInt(process.env.GH_COPILOT_DEBUG_UI_PORT);
    if (!isNaN(d))
      try {
        u = new M_DebugServerModule_maybe.DebugServer(d).listen().wrapStdout(r);
      } catch (t) {
        new M_LoggingUtils_maybe.Logger(
          M_LoggingUtils_maybe.LogLevel.WARN,
          "agent"
        ).error(
          e,
          `Failed to start debug server on port ${d} (maybe it's in use?)`,
          t
        );
      }
    if (e.get(M_RuntimeModeManager_maybe.RuntimeMode).flags.recordInput) {
      const e = Date.now().toString();
      const r = `stdin${e}.log`;
      t.on("data", (e) => {
        M_fs.appendFile(r, e, (e) => {
          if (e) {
            console.error(e);
          }
        });
      });
      const o = `stdout${e}.log`;
      p = u;
      h = (e) => {
        M_fs.appendFile(o, e, (e) => {
          if (e) {
            console.error(e);
          }
        });
      };
      u = new M_stream.Writable({
        write: (e, t, r) => (h(e.toString()), p.write(e, t, r)),
      });
    }
    var p;
    var h;
    const f = M_connection_manager_maybe.createConnection(
      M_connection_manager_maybe.ProposedFeatures.all,
      new M_connection_manager_maybe.StreamMessageReader(t),
      new M_connection_manager_maybe.StreamMessageWriter(u)
    );
    return new WrappedConnection(f);
  }
  listen() {
    this.conn.listen();
  }
}
exports.WrappedConnection = WrappedConnection;
