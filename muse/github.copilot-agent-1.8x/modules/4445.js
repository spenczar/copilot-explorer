Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.DebugServer = undefined;
const n = require("events");
const i = require("fs");
const o = require("http");
const s = require("path");
const a = require("stream");
function c(e, t) {
  e.write("data: " + t.toString().replace(/\n/g, "\ndata: ") + "\n\n");
}
exports.DebugServer = class {
  constructor(e) {
    this.port = e;
    this.stdoutEmitter = new n.EventEmitter();
    this.server = o.createServer((e, t) => {
      if (e.headers.accept && "text/event-stream" == e.headers.accept)
        switch (
          (t.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          }),
          e.url)
        ) {
          case "/stdin":
            return void process.stdin.on("data", (e) => {
              c(t, e);
            });
          case "/stdout":
            return void this.stdoutEmitter.on("data", (e) => {
              c(t, e);
            });
          default:
            t.writeHead(404);
            return void t.end();
        }
      t.writeHead(200, {
        "Content-Type": "text/html",
      });
      let r;
      let n = __dirname;
      if ("dist" === s.basename(__dirname)) {
        n = s.dirname(__dirname);
      }
      try {
        r = i.readFileSync(s.join(n, "dist", "debugServer.html"));
      } catch (e) {
        r = e.toString();
      }
      t.write(r);
      t.end();
    });
  }
  wrapStdout(e) {
    return new a.Writable({
      write: (t, r, n) => (
        this.stdoutEmitter.emit("data", t), e.write(t, r, n)
      ),
    });
  }
  listen() {
    this.server.listen(this.port);
    return this;
  }
};