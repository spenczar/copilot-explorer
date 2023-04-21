var n =
  (this && this.__createBinding) ||
  (Object.create
    ? function (e, t, r, n) {
        if (undefined === n) {
          n = r;
        }
        Object.defineProperty(e, n, {
          enumerable: true,
          get: function () {
            return t[r];
          },
        });
      }
    : function (e, t, r, n) {
        if (undefined === n) {
          n = r;
        }
        e[n] = t[r];
      });
var i =
  (this && this.__exportStar) ||
  function (e, t) {
    for (var r in e)
      if ("default" === r || Object.prototype.hasOwnProperty.call(t, r)) {
        n(t, e, r);
      }
  };
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.createMessageConnection =
  exports.createServerSocketTransport =
  exports.createClientSocketTransport =
  exports.createServerPipeTransport =
  exports.createClientPipeTransport =
  exports.generateRandomPipeName =
  exports.StreamMessageWriter =
  exports.StreamMessageReader =
  exports.SocketMessageWriter =
  exports.SocketMessageReader =
  exports.IPCMessageWriter =
  exports.IPCMessageReader =
    undefined;
const o = require(23034);
o.default.install();
const s = require(23870);
const a = require("path");
const c = require("os");
const l = require("crypto");
const u = require("net");
i(require(23870), exports);
class IPCMessageReader extends s.AbstractMessageReader {
  constructor(e) {
    super();
    this.process = e;
    let t = this.process;
    t.on("error", (e) => this.fireError(e));
    t.on("close", () => this.fireClose());
  }
  listen(e) {
    this.process.on("message", e);
    return s.Disposable.create(() => this.process.off("message", e));
  }
}
exports.IPCMessageReader = IPCMessageReader;
class IPCMessageWriter extends s.AbstractMessageWriter {
  constructor(e) {
    super();
    this.process = e;
    this.errorCount = 0;
    let t = this.process;
    t.on("error", (e) => this.fireError(e));
    t.on("close", () => this.fireClose);
  }
  write(e) {
    try {
      if ("function" == typeof this.process.send) {
        this.process.send(e, undefined, undefined, (t) => {
          if (t) {
            this.errorCount++;
            this.handleError(t, e);
          } else {
            this.errorCount = 0;
          }
        });
      }
      return Promise.resolve();
    } catch (t) {
      this.handleError(t, e);
      return Promise.reject(t);
    }
  }
  handleError(e, t) {
    this.errorCount++;
    this.fireError(e, t, this.errorCount);
  }
  end() {}
}
exports.IPCMessageWriter = IPCMessageWriter;
class SocketMessageReader extends s.ReadableStreamMessageReader {
  constructor(e, t = "utf-8") {
    super(o.default().stream.asReadableStream(e), t);
  }
}
exports.SocketMessageReader = SocketMessageReader;
class SocketMessageWriter extends s.WriteableStreamMessageWriter {
  constructor(e, t) {
    super(o.default().stream.asWritableStream(e), t);
    this.socket = e;
  }
  dispose() {
    super.dispose();
    this.socket.destroy();
  }
}
exports.SocketMessageWriter = SocketMessageWriter;
class StreamMessageReader extends s.ReadableStreamMessageReader {
  constructor(e, t) {
    super(o.default().stream.asReadableStream(e), t);
  }
}
exports.StreamMessageReader = StreamMessageReader;
class StreamMessageWriter extends s.WriteableStreamMessageWriter {
  constructor(e, t) {
    super(o.default().stream.asWritableStream(e), t);
  }
}
exports.StreamMessageWriter = StreamMessageWriter;
const y = process.env.XDG_RUNTIME_DIR;
const v = new Map([
  ["linux", 107],
  ["darwin", 103],
]);
exports.generateRandomPipeName = function () {
  const e = l.randomBytes(21).toString("hex");
  if ("win32" === process.platform)
    return `\\\\.\\pipe\\vscode-jsonrpc-${e}-sock`;
  let t;
  t = y
    ? a.join(y, `vscode-ipc-${e}.sock`)
    : a.join(c.tmpdir(), `vscode-${e}.sock`);
  const r = v.get(process.platform);
  if (undefined !== r && t.length >= r) {
    o.default().console.warn(
      `WARNING: IPC handle "${t}" is longer than ${r} characters.`
    );
  }
  return t;
};
exports.createClientPipeTransport = function (e, t = "utf-8") {
  let r;
  const n = new Promise((e, t) => {
    r = e;
  });
  return new Promise((i, o) => {
    let s = u.createServer((e) => {
      s.close();
      r([new SocketMessageReader(e, t), new SocketMessageWriter(e, t)]);
    });
    s.on("error", o);
    s.listen(e, () => {
      s.removeListener("error", o);
      i({
        onConnected: () => n,
      });
    });
  });
};
exports.createServerPipeTransport = function (e, t = "utf-8") {
  const r = u.createConnection(e);
  return [new SocketMessageReader(r, t), new SocketMessageWriter(r, t)];
};
exports.createClientSocketTransport = function (e, t = "utf-8") {
  let r;
  const n = new Promise((e, t) => {
    r = e;
  });
  return new Promise((i, o) => {
    const s = u.createServer((e) => {
      s.close();
      r([new SocketMessageReader(e, t), new SocketMessageWriter(e, t)]);
    });
    s.on("error", o);
    s.listen(e, "127.0.0.1", () => {
      s.removeListener("error", o);
      i({
        onConnected: () => n,
      });
    });
  });
};
exports.createServerSocketTransport = function (e, t = "utf-8") {
  const r = u.createConnection(e, "127.0.0.1");
  return [new SocketMessageReader(r, t), new SocketMessageWriter(r, t)];
};
exports.createMessageConnection = function (e, t, r, n) {
  if (r) {
    r = s.NullLogger;
  }
  const i = (function (e) {
    const t = e;
    return undefined !== t.read && undefined !== t.addListener;
  })(e)
    ? new StreamMessageReader(e)
    : e;
  const o = (function (e) {
    const t = e;
    return undefined !== t.write && undefined !== t.addListener;
  })(t)
    ? new StreamMessageWriter(t)
    : t;
  if (s.ConnectionStrategy.is(n)) {
    n = {
      connectionStrategy: n,
    };
  }
  return s.createMessageConnection(i, o, r, n);
};