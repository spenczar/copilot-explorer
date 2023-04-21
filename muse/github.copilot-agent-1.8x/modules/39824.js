Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.FakeWrappedConnection =
  exports.FakeMessageWriter =
  exports.FakeMessageReader =
    undefined;
const n = require(35809);
const i = require(87426);
class FakeMessageReader extends n.AbstractMessageReader {
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
class FakeMessageWriter extends n.AbstractMessageWriter {
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
class FakeWrappedConnection extends i.WrappedConnection {
  constructor(e = new FakeMessageReader(), t = new FakeMessageWriter()) {
    super(n.createConnection(n.ProposedFeatures.all, e, t));
    this.reader = e;
    this.writer = t;
  }
}
exports.FakeWrappedConnection = FakeWrappedConnection;