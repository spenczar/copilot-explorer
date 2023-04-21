Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.FakeWrappedConnection =
  exports.FakeMessageWriter =
  exports.FakeMessageReader =
    undefined;
const M_connection_manager_maybe = require("connection-manager");
const M_DebugServerWrapper_maybe = require("DebugServerWrapper");
class FakeMessageReader extends M_connection_manager_maybe.AbstractMessageReader {
  listen(e) {
    this._callback = e;
    return {
      dispose: () => {
        this._callback = undefined;
      },
    };
  }
  sendMessage(e) {
    if (this._callback) {
      this._callback({
        jsonrpc: "2.0",
        ...e,
      });
    }
  }
}
exports.FakeMessageReader = FakeMessageReader;
class FakeMessageWriter extends M_connection_manager_maybe.AbstractMessageWriter {
  constructor() {
    super(...arguments);
    this.messages = [];
  }
  async write(e) {
    this.messages.push(e);
  }
  end() {}
}
exports.FakeMessageWriter = FakeMessageWriter;
class FakeWrappedConnection extends M_DebugServerWrapper_maybe.WrappedConnection {
  constructor(e = new FakeMessageReader(), t = new FakeMessageWriter()) {
    super(
      M_connection_manager_maybe.createConnection(
        M_connection_manager_maybe.ProposedFeatures.all,
        e,
        t
      )
    );
    this.reader = e;
    this.writer = t;
  }
}
exports.FakeWrappedConnection = FakeWrappedConnection;
