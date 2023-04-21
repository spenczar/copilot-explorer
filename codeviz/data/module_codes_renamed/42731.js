Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.attachPartialResult =
  exports.ProgressFeature =
  exports.attachWorkDone =
    undefined;
const M_MessageConnectionManager_maybe = require("MessageConnectionManager");
const M_UUID_Generator_maybe = require("UUID_Generator");
class o {
  constructor(e, t) {
    this._connection = e;
    this._token = t;
    o.Instances.set(this._token, this);
  }
  begin(e, t, r, i) {
    let o = {
      kind: "begin",
      title: e,
      percentage: t,
      message: r,
      cancellable: i,
    };
    this._connection.sendProgress(
      M_MessageConnectionManager_maybe.WorkDoneProgress.type,
      this._token,
      o
    );
  }
  report(e, t) {
    let r = {
      kind: "report",
    };
    if ("number" == typeof e) {
      r.percentage = e;
      if (undefined !== t) {
        r.message = t;
      }
    } else {
      r.message = e;
    }
    this._connection.sendProgress(
      M_MessageConnectionManager_maybe.WorkDoneProgress.type,
      this._token,
      r
    );
  }
  done() {
    o.Instances.delete(this._token);
    this._connection.sendProgress(
      M_MessageConnectionManager_maybe.WorkDoneProgress.type,
      this._token,
      {
        kind: "end",
      }
    );
  }
}
o.Instances = new Map();
class s extends o {
  constructor(e, t) {
    super(e, t);
    this._source =
      new M_MessageConnectionManager_maybe.CancellationTokenSource();
  }
  get token() {
    return this._source.token;
  }
  done() {
    this._source.dispose();
    super.done();
  }
  cancel() {
    this._source.cancel();
  }
}
class a {
  constructor() {}
  begin() {}
  report() {}
  done() {}
}
class c extends a {
  constructor() {
    super();
    this._source =
      new M_MessageConnectionManager_maybe.CancellationTokenSource();
  }
  get token() {
    return this._source.token;
  }
  done() {
    this._source.dispose();
  }
  cancel() {
    this._source.cancel();
  }
}
var l;
exports.attachWorkDone = function (e, t) {
  if (undefined === t || undefined === t.workDoneToken) return new a();
  const r = t.workDoneToken;
  delete t.workDoneToken;
  return new o(e, r);
};
exports.ProgressFeature = (e) =>
  class extends e {
    constructor() {
      super();
      this._progressSupported = false;
    }
    initialize(e) {
      var t;
      if (
        true ===
        (null === (t = null == e ? undefined : e.window) || undefined === t
          ? undefined
          : t.workDoneProgress)
      ) {
        this._progressSupported = true;
        this.connection.onNotification(
          M_MessageConnectionManager_maybe.WorkDoneProgressCancelNotification
            .type,
          (e) => {
            let t = o.Instances.get(e.token);
            if (t instanceof s || t instanceof c) {
              t.cancel();
            }
          }
        );
      }
    }
    attachWorkDoneProgress(e) {
      return undefined === e ? new a() : new o(this.connection, e);
    }
    createWorkDoneProgress() {
      if (this._progressSupported) {
        const e = M_UUID_Generator_maybe.generateUuid();
        return this.connection
          .sendRequest(
            M_MessageConnectionManager_maybe.WorkDoneProgressCreateRequest.type,
            {
              token: e,
            }
          )
          .then(() => new s(this.connection, e));
      }
      return Promise.resolve(new c());
    }
  };
(function (e) {
  e.type = new M_MessageConnectionManager_maybe.ProgressType();
})(l || (l = {}));
class u {
  constructor(e, t) {
    this._connection = e;
    this._token = t;
  }
  report(e) {
    this._connection.sendProgress(l.type, this._token, e);
  }
}
exports.attachPartialResult = function (e, t) {
  if (undefined === t || undefined === t.partialResultToken) return;
  const r = t.partialResultToken;
  delete t.partialResultToken;
  return new u(e, r);
};
