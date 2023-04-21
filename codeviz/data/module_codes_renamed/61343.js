Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.createMessageConnection =
  exports.ConnectionOptions =
  exports.CancellationStrategy =
  exports.CancellationSenderStrategy =
  exports.CancellationReceiverStrategy =
  exports.ConnectionStrategy =
  exports.ConnectionError =
  exports.ConnectionErrors =
  exports.LogTraceNotification =
  exports.SetTraceNotification =
  exports.TraceFormat =
  exports.Trace =
  exports.NullLogger =
  exports.ProgressType =
    undefined;
const M_RuntimeAbstractionLayerManager_maybe = require("RuntimeAbstractionLayerManager");
const M_TypeChecker_maybe = require("TypeChecker");
const M_message_signature_constants_maybe = require("message-signature-constants");
const M_LinkedMapCacheUtils_maybe = require("LinkedMapCacheUtils");
const M_EventEmitterManager_maybe = require("EventEmitterManager");
const M_CancellationTokenManager_maybe = require("CancellationTokenManager");
var l;
var u;
var d;
var p;
var h;
var f;
var g;
var m;
var y;
var v;
var _;
var b;
var w;
!(function (e) {
  e.type = new M_message_signature_constants_maybe.NotificationType(
    "$/cancelRequest"
  );
})(l || (l = {}));
(function (e) {
  e.type = new M_message_signature_constants_maybe.NotificationType(
    "$/progress"
  );
})(u || (u = {}));
exports.ProgressType = class {
  constructor() {}
};
(function (e) {
  e.is = function (e) {
    return M_TypeChecker_maybe.func(e);
  };
})(d || (d = {}));
exports.NullLogger = Object.freeze({
  error: () => {},
  warn: () => {},
  info: () => {},
  log: () => {},
});
(function (e) {
  e[(e.Off = 0)] = "Off";
  e[(e.Messages = 1)] = "Messages";
  e[(e.Verbose = 2)] = "Verbose";
})((p = exports.Trace || (exports.Trace = {})));
(function (e) {
  e.fromString = function (t) {
    if (!M_TypeChecker_maybe.string(t)) return e.Off;
    switch ((t = t.toLowerCase())) {
      case "off":
      default:
        return e.Off;
      case "messages":
        return e.Messages;
      case "verbose":
        return e.Verbose;
    }
  };
  e.toString = function (t) {
    switch (t) {
      case e.Off:
        return "off";
      case e.Messages:
        return "messages";
      case e.Verbose:
        return "verbose";
      default:
        return "off";
    }
  };
})((p = exports.Trace || (exports.Trace = {})));
(function (e) {
  e.Text = "text";
  e.JSON = "json";
})(exports.TraceFormat || (exports.TraceFormat = {}));
(function (e) {
  e.fromString = function (t) {
    return "json" === (t = t.toLowerCase()) ? e.JSON : e.Text;
  };
})((h = exports.TraceFormat || (exports.TraceFormat = {})));
(function (e) {
  e.type = new M_message_signature_constants_maybe.NotificationType(
    "$/setTrace"
  );
})((f = exports.SetTraceNotification || (exports.SetTraceNotification = {})));
(function (e) {
  e.type = new M_message_signature_constants_maybe.NotificationType(
    "$/logTrace"
  );
})((g = exports.LogTraceNotification || (exports.LogTraceNotification = {})));
(function (e) {
  e[(e.Closed = 1)] = "Closed";
  e[(e.Disposed = 2)] = "Disposed";
  e[(e.AlreadyListening = 3)] = "AlreadyListening";
})((m = exports.ConnectionErrors || (exports.ConnectionErrors = {})));
class ConnectionError extends Error {
  constructor(e, t) {
    super(t);
    this.code = e;
    Object.setPrototypeOf(this, ConnectionError.prototype);
  }
}
exports.ConnectionError = ConnectionError;
(function (e) {
  e.is = function (e) {
    const t = e;
    return t && M_TypeChecker_maybe.func(t.cancelUndispatched);
  };
})((y = exports.ConnectionStrategy || (exports.ConnectionStrategy = {})));
(function (e) {
  e.Message = Object.freeze({
    createCancellationTokenSource: (e) =>
      new M_CancellationTokenManager_maybe.CancellationTokenSource(),
  });
  e.is = function (e) {
    const t = e;
    return t && M_TypeChecker_maybe.func(t.createCancellationTokenSource);
  };
})(
  (v =
    exports.CancellationReceiverStrategy ||
    (exports.CancellationReceiverStrategy = {}))
);
(function (e) {
  e.Message = Object.freeze({
    sendCancellation(e, t) {
      e.sendNotification(l.type, {
        id: t,
      });
    },
    cleanup(e) {},
  });
  e.is = function (e) {
    const t = e;
    return (
      t &&
      M_TypeChecker_maybe.func(t.sendCancellation) &&
      M_TypeChecker_maybe.func(t.cleanup)
    );
  };
})(
  (_ =
    exports.CancellationSenderStrategy ||
    (exports.CancellationSenderStrategy = {}))
);
(function (e) {
  e.Message = Object.freeze({
    receiver: v.Message,
    sender: _.Message,
  });
  e.is = function (e) {
    const t = e;
    return t && v.is(t.receiver) && _.is(t.sender);
  };
})((b = exports.CancellationStrategy || (exports.CancellationStrategy = {})));
(exports.ConnectionOptions || (exports.ConnectionOptions = {})).is = function (
  e
) {
  const t = e;
  return t && (b.is(t.cancellationStrategy) || y.is(t.connectionStrategy));
};
(function (e) {
  e[(e.New = 1)] = "New";
  e[(e.Listening = 2)] = "Listening";
  e[(e.Closed = 3)] = "Closed";
  e[(e.Disposed = 4)] = "Disposed";
})(w || (w = {}));
exports.createMessageConnection = function (e, r, y, v) {
  const _ = undefined !== y ? y : exports.NullLogger;
  let E = 0;
  let T = 0;
  let S = 0;
  const x = "2.0";
  let k;
  const I = Object.create(null);
  let A;
  const P = Object.create(null);
  const R = new Map();
  let N;
  let O;
  let L = new M_LinkedMapCacheUtils_maybe.LinkedMap();
  let D = Object.create(null);
  let M = Object.create(null);
  let B = p.Off;
  let F = h.Text;
  let j = w.New;
  const U = new M_EventEmitterManager_maybe.Emitter();
  const $ = new M_EventEmitterManager_maybe.Emitter();
  const q = new M_EventEmitterManager_maybe.Emitter();
  const H = new M_EventEmitterManager_maybe.Emitter();
  const V = new M_EventEmitterManager_maybe.Emitter();
  const z = v && v.cancellationStrategy ? v.cancellationStrategy : b.Message;
  function K(e) {
    if (null === e)
      throw new Error(
        "Can't send requests with id null since the response can't be correlated."
      );
    return "req-" + e.toString();
  }
  function W(e) {}
  function G() {
    return j === w.Listening;
  }
  function Q() {
    return j === w.Closed;
  }
  function J() {
    return j === w.Disposed;
  }
  function Y() {
    if (j !== w.New && j !== w.Listening) {
      j = w.Closed;
      $.fire(undefined);
    }
  }
  function X() {
    if (N || 0 === L.size) {
      N = M_RuntimeAbstractionLayerManager_maybe.default().timer.setImmediate(
        () => {
          N = undefined;
          (function () {
            if (0 === L.size) return;
            const e = L.shift();
            try {
              if (M_message_signature_constants_maybe.isRequestMessage(e)) {
                (function (e) {
                  if (J()) return;
                  function t(t, n, i) {
                    const s = {
                      jsonrpc: x,
                      id: e.id,
                    };
                    if (
                      t instanceof
                      M_message_signature_constants_maybe.ResponseError
                    ) {
                      s.error = t.toJson();
                    } else {
                      s.result = undefined === t ? null : t;
                    }
                    ee(s, n, i);
                    r.write(s);
                  }
                  function n(t, n, i) {
                    const o = {
                      jsonrpc: x,
                      id: e.id,
                      error: t.toJson(),
                    };
                    ee(o, n, i);
                    r.write(o);
                  }
                  !(function (e) {
                    if (B !== p.Off && O)
                      if (F === h.Text) {
                        let t;
                        if (B === p.Verbose && e.params) {
                          t = `Params: ${JSON.stringify(
                            e.params,
                            null,
                            4
                          )}\n\n`;
                        }
                        O.log(`Received request '${e.method} - (${e.id})'.`, t);
                      } else te("receive-request", e);
                  })(e);
                  const s = I[e.method];
                  let a;
                  let c;
                  if (s) {
                    a = s.type;
                    c = s.handler;
                  }
                  const l = Date.now();
                  if (c || k) {
                    const s = String(e.id);
                    const u = z.receiver.createCancellationTokenSource(s);
                    M[s] = u;
                    try {
                      let d;
                      if (c) {
                        if (undefined === e.params) {
                          if (undefined !== a && 0 !== a.numberOfParams)
                            return void n(
                              new M_message_signature_constants_maybe.ResponseError(
                                M_message_signature_constants_maybe.ErrorCodes.InvalidParams,
                                `Request ${e.method} defines ${a.numberOfParams} params but recevied none.`
                              ),
                              e.method,
                              l
                            );
                          d = c(u.token);
                        } else if (Array.isArray(e.params)) {
                          if (
                            undefined !== a &&
                            a.parameterStructures ===
                              M_message_signature_constants_maybe
                                .ParameterStructures.byName
                          )
                            return void n(
                              new M_message_signature_constants_maybe.ResponseError(
                                M_message_signature_constants_maybe.ErrorCodes.InvalidParams,
                                `Request ${e.method} defines parameters by name but received parameters by position`
                              ),
                              e.method,
                              l
                            );
                          d = c(...e.params, u.token);
                        } else {
                          if (
                            undefined !== a &&
                            a.parameterStructures ===
                              M_message_signature_constants_maybe
                                .ParameterStructures.byPosition
                          )
                            return void n(
                              new M_message_signature_constants_maybe.ResponseError(
                                M_message_signature_constants_maybe.ErrorCodes.InvalidParams,
                                `Request ${e.method} defines parameters by position but received parameters by name`
                              ),
                              e.method,
                              l
                            );
                          d = c(e.params, u.token);
                        }
                      } else if (k) {
                        d = k(e.method, e.params, u.token);
                      }
                      const p = d;
                      if (d) {
                        if (p.then) {
                          p.then(
                            (r) => {
                              delete M[s];
                              t(r, e.method, l);
                            },
                            (t) => {
                              delete M[s];
                              if (
                                t instanceof
                                M_message_signature_constants_maybe.ResponseError
                              ) {
                                n(t, e.method, l);
                              } else {
                                if (
                                  t &&
                                  M_TypeChecker_maybe.string(t.message)
                                ) {
                                  n(
                                    new M_message_signature_constants_maybe.ResponseError(
                                      M_message_signature_constants_maybe.ErrorCodes.InternalError,
                                      `Request ${e.method} failed with message: ${t.message}`
                                    ),
                                    e.method,
                                    l
                                  );
                                } else {
                                  n(
                                    new M_message_signature_constants_maybe.ResponseError(
                                      M_message_signature_constants_maybe.ErrorCodes.InternalError,
                                      `Request ${e.method} failed unexpectedly without providing any details.`
                                    ),
                                    e.method,
                                    l
                                  );
                                }
                              }
                            }
                          );
                        } else {
                          delete M[s];
                          t(d, e.method, l);
                        }
                      } else {
                        delete M[s];
                        (function (t, n, i) {
                          if (undefined === t) {
                            t = null;
                          }
                          const o = {
                            jsonrpc: x,
                            id: e.id,
                            result: t,
                          };
                          ee(o, n, i);
                          r.write(o);
                        })(d, e.method, l);
                      }
                    } catch (r) {
                      delete M[s];
                      if (
                        r instanceof
                        M_message_signature_constants_maybe.ResponseError
                      ) {
                        t(r, e.method, l);
                      } else {
                        if (r && M_TypeChecker_maybe.string(r.message)) {
                          n(
                            new M_message_signature_constants_maybe.ResponseError(
                              M_message_signature_constants_maybe.ErrorCodes.InternalError,
                              `Request ${e.method} failed with message: ${r.message}`
                            ),
                            e.method,
                            l
                          );
                        } else {
                          n(
                            new M_message_signature_constants_maybe.ResponseError(
                              M_message_signature_constants_maybe.ErrorCodes.InternalError,
                              `Request ${e.method} failed unexpectedly without providing any details.`
                            ),
                            e.method,
                            l
                          );
                        }
                      }
                    }
                  } else
                    n(
                      new M_message_signature_constants_maybe.ResponseError(
                        M_message_signature_constants_maybe.ErrorCodes.MethodNotFound,
                        `Unhandled method ${e.method}`
                      ),
                      e.method,
                      l
                    );
                })(e);
              } else {
                if (
                  M_message_signature_constants_maybe.isNotificationMessage(e)
                ) {
                  (function (e) {
                    if (J()) return;
                    let t;
                    let r;
                    if (e.method === l.type.method)
                      r = (e) => {
                        const t = e.id;
                        const r = M[String(t)];
                        if (r) {
                          r.cancel();
                        }
                      };
                    else {
                      const n = P[e.method];
                      if (n) {
                        r = n.handler;
                        t = n.type;
                      }
                    }
                    if (r || A)
                      try {
                        !(function (e) {
                          if (B !== p.Off && O && e.method !== g.type.method)
                            if (F === h.Text) {
                              let t;
                              if (B === p.Verbose) {
                                t = e.params
                                  ? `Params: ${JSON.stringify(
                                      e.params,
                                      null,
                                      4
                                    )}\n\n`
                                  : "No parameters provided.\n\n";
                              }
                              O.log(`Received notification '${e.method}'.`, t);
                            } else te("receive-notification", e);
                        })(e);
                        if (r) {
                          if (undefined === e.params) {
                            if (
                              undefined !== t &&
                              0 !== t.numberOfParams &&
                              t.parameterStructures !==
                                M_message_signature_constants_maybe
                                  .ParameterStructures.byName
                            ) {
                              _.error(
                                `Notification ${e.method} defines ${t.numberOfParams} params but recevied none.`
                              );
                            }
                            r();
                          } else {
                            if (Array.isArray(e.params)) {
                              if (undefined !== t) {
                                if (
                                  t.parameterStructures ===
                                  M_message_signature_constants_maybe
                                    .ParameterStructures.byName
                                ) {
                                  _.error(
                                    `Notification ${e.method} defines parameters by name but received parameters by position`
                                  );
                                }
                                if (t.numberOfParams !== e.params.length) {
                                  _.error(
                                    `Notification ${e.method} defines ${t.numberOfParams} params but received ${e.params.length} argumennts`
                                  );
                                }
                              }
                              r(...e.params);
                            } else {
                              if (
                                undefined !== t &&
                                t.parameterStructures ===
                                  M_message_signature_constants_maybe
                                    .ParameterStructures.byPosition
                              ) {
                                _.error(
                                  `Notification ${e.method} defines parameters by position but received parameters by name`
                                );
                              }
                              r(e.params);
                            }
                          }
                        } else {
                          if (A) {
                            A(e.method, e.params);
                          }
                        }
                      } catch (t) {
                        if (t.message) {
                          _.error(
                            `Notification handler '${e.method}' failed with message: ${t.message}`
                          );
                        } else {
                          _.error(
                            `Notification handler '${e.method}' failed unexpectedly.`
                          );
                        }
                      }
                    else q.fire(e);
                  })(e);
                } else {
                  if (
                    M_message_signature_constants_maybe.isResponseMessage(e)
                  ) {
                    (function (e) {
                      if (!J())
                        if (null === e.id) {
                          if (e.error) {
                            _.error(
                              `Received response message without id: Error is: \n${JSON.stringify(
                                e.error,
                                undefined,
                                4
                              )}`
                            );
                          } else {
                            _.error(
                              "Received response message without id. No further error information provided."
                            );
                          }
                        } else {
                          const t = String(e.id);
                          const r = D[t];
                          (function (e, t) {
                            if (B !== p.Off && O)
                              if (F === h.Text) {
                                let r;
                                if (B === p.Verbose) {
                                  if (e.error && e.error.data) {
                                    r = `Error data: ${JSON.stringify(
                                      e.error.data,
                                      null,
                                      4
                                    )}\n\n`;
                                  } else {
                                    if (e.result) {
                                      r = `Result: ${JSON.stringify(
                                        e.result,
                                        null,
                                        4
                                      )}\n\n`;
                                    } else {
                                      if (undefined === e.error) {
                                        r = "No result returned.\n\n";
                                      }
                                    }
                                  }
                                }
                                if (t) {
                                  const n = e.error
                                    ? ` Request failed: ${e.error.message} (${e.error.code}).`
                                    : "";
                                  O.log(
                                    `Received response '${t.method} - (${
                                      e.id
                                    })' in ${Date.now() - t.timerStart}ms.${n}`,
                                    r
                                  );
                                } else
                                  O.log(
                                    `Received response ${e.id} without active response promise.`,
                                    r
                                  );
                              } else te("receive-response", e);
                          })(e, r);
                          if (r) {
                            delete D[t];
                            try {
                              if (e.error) {
                                const t = e.error;
                                r.reject(
                                  new M_message_signature_constants_maybe.ResponseError(
                                    t.code,
                                    t.message,
                                    t.data
                                  )
                                );
                              } else {
                                if (void 0 === e.result)
                                  throw new Error("Should never happen.");
                                r.resolve(e.result);
                              }
                            } catch (e) {
                              e.message
                                ? _.error(
                                    `Response handler '${r.method}' failed with message: ${e.message}`
                                  )
                                : _.error(
                                    `Response handler '${r.method}' failed unexpectedly.`
                                  );
                            }
                          }
                        }
                    })(e);
                  } else {
                    (function (e) {
                      if (!e) return void _.error("Received empty message.");
                      _.error(
                        `Received message which is neither a response nor a notification message:\n${JSON.stringify(
                          e,
                          null,
                          4
                        )}`
                      );
                      const t = e;
                      if (
                        M_TypeChecker_maybe.string(t.id) ||
                        M_TypeChecker_maybe.number(t.id)
                      ) {
                        const e = String(t.id);
                        const r = D[e];
                        if (r) {
                          r.reject(
                            new Error(
                              "The received response has neither a result nor an error property."
                            )
                          );
                        }
                      }
                    })(e);
                  }
                }
              }
            } finally {
              X();
            }
          })();
        }
      );
    }
  }
  e.onClose(Y);
  e.onError(function (e) {
    U.fire([e, undefined, undefined]);
  });
  r.onClose(Y);
  r.onError(function (e) {
    U.fire(e);
  });
  const Z = (e) => {
    try {
      if (
        M_message_signature_constants_maybe.isNotificationMessage(e) &&
        e.method === l.type.method
      ) {
        const t = K(e.params.id);
        const n = L.get(t);
        if (M_message_signature_constants_maybe.isRequestMessage(n)) {
          const i = null == v ? undefined : v.connectionStrategy;
          const o =
            i && i.cancelUndispatched ? i.cancelUndispatched(n, W) : undefined;
          if (o && (undefined !== o.error || undefined !== o.result)) {
            L.delete(t);
            o.id = n.id;
            ee(o, e.method, Date.now());
            return void r.write(o);
          }
        }
      }
      !(function (e, t) {
        var r;
        if (M_message_signature_constants_maybe.isRequestMessage(t)) {
          e.set(K(t.id), t);
        } else {
          if (M_message_signature_constants_maybe.isResponseMessage(t)) {
            e.set(
              null === (r = t.id)
                ? "res-unknown-" + (++S).toString()
                : "res-" + r.toString(),
              t
            );
          } else {
            e.set("not-" + (++T).toString(), t);
          }
        }
      })(L, e);
    } finally {
      X();
    }
  };
  function ee(e, t, r) {
    if (B !== p.Off && O)
      if (F === h.Text) {
        let n;
        if (B === p.Verbose) {
          if (e.error && e.error.data) {
            n = `Error data: ${JSON.stringify(e.error.data, null, 4)}\n\n`;
          } else {
            if (e.result) {
              n = `Result: ${JSON.stringify(e.result, null, 4)}\n\n`;
            } else {
              if (undefined === e.error) {
                n = "No result returned.\n\n";
              }
            }
          }
        }
        O.log(
          `Sending response '${t} - (${e.id})'. Processing request took ${
            Date.now() - r
          }ms`,
          n
        );
      } else te("send-response", e);
  }
  function te(e, t) {
    if (!O || B === p.Off) return;
    const r = {
      isLSPMessage: true,
      type: e,
      message: t,
      timestamp: Date.now(),
    };
    O.log(r);
  }
  function re() {
    if (Q()) throw new ConnectionError(m.Closed, "Connection is closed.");
    if (J()) throw new ConnectionError(m.Disposed, "Connection is disposed.");
  }
  function ne(e) {
    return undefined === e ? null : e;
  }
  function ie(e) {
    return null === e ? undefined : e;
  }
  function oe(e) {
    return null != e && !Array.isArray(e) && "object" == typeof e;
  }
  function se(e, t) {
    switch (e) {
      case M_message_signature_constants_maybe.ParameterStructures.auto:
        return oe(t) ? ie(t) : [ne(t)];
      case M_message_signature_constants_maybe.ParameterStructures.byName:
        if (!oe(t))
          throw new Error(
            "Recevied parameters by name but param is not an object literal."
          );
        return ie(t);
      case M_message_signature_constants_maybe.ParameterStructures.byPosition:
        return [ne(t)];
      default:
        throw new Error(`Unknown parameter structure ${e.toString()}`);
    }
  }
  function ae(e, t) {
    let r;
    const n = e.numberOfParams;
    switch (n) {
      case 0:
        r = undefined;
        break;
      case 1:
        r = se(e.parameterStructures, t[0]);
        break;
      default:
        r = [];
        for (let e = 0; e < t.length && e < n; e++) r.push(ne(t[e]));
        if (t.length < n) for (let e = t.length; e < n; e++) r.push(null);
    }
    return r;
  }
  const ce = {
    sendNotification: (e, ...t) => {
      let n;
      let s;
      re();
      if (M_TypeChecker_maybe.string(e)) {
        n = e;
        const r = t[0];
        let i = 0,
          a = M_message_signature_constants_maybe.ParameterStructures.auto;
        M_message_signature_constants_maybe.ParameterStructures.is(r) &&
          ((i = 1), (a = r));
        let c = t.length;
        const l = c - i;
        switch (l) {
          case 0:
            s = void 0;
            break;
          case 1:
            s = se(a, t[i]);
            break;
          default:
            if (
              a ===
              M_message_signature_constants_maybe.ParameterStructures.byName
            )
              throw new Error(
                `Recevied ${l} parameters for 'by Name' notification parameter structure.`
              );
            s = t.slice(i, c).map((e) => ne(e));
        }
      } else {
        const r = t;
        (n = e.method), (s = ae(e, r));
      }
      const a = {
        jsonrpc: x,
        method: n,
        params: s,
      };
      !(function (e) {
        if (B !== p.Off && O)
          if (F === h.Text) {
            let t;
            if (B === p.Verbose) {
              t = e.params
                ? `Params: ${JSON.stringify(e.params, null, 4)}\n\n`
                : "No parameters provided.\n\n";
            }
            O.log(`Sending notification '${e.method}'.`, t);
          } else te("send-notification", e);
      })(a);
      r.write(a);
    },
    onNotification: (e, t) => {
      let r;
      re();
      if (M_TypeChecker_maybe.func(e)) {
        A = e;
      } else {
        if (t) {
          if (M_TypeChecker_maybe.string(e)) {
            r = e;
            P[e] = {
              type: undefined,
              handler: t,
            };
          } else {
            r = e.method;
            P[e.method] = {
              type: e,
              handler: t,
            };
          }
        }
      }
      return {
        dispose: () => {
          if (undefined !== r) {
            delete P[r];
          } else {
            A = undefined;
          }
        },
      };
    },
    onProgress: (e, t, r) => {
      if (R.has(t))
        throw new Error(`Progress handler for token ${t} already registered`);
      R.set(t, r);
      return {
        dispose: () => {
          R.delete(t);
        },
      };
    },
    sendProgress: (e, t, r) => {
      ce.sendNotification(u.type, {
        token: t,
        value: r,
      });
    },
    onUnhandledProgress: H.event,
    sendRequest: (e, ...t) => {
      let n;
      let s;
      let a;
      re();
      (function () {
        if (!G()) throw new Error("Call listen() first.");
      })();
      if (M_TypeChecker_maybe.string(e)) {
        n = e;
        const r = t[0],
          i = t[t.length - 1];
        let l = 0,
          u = M_message_signature_constants_maybe.ParameterStructures.auto;
        M_message_signature_constants_maybe.ParameterStructures.is(r) &&
          ((l = 1), (u = r));
        let d = t.length;
        M_CancellationTokenManager_maybe.CancellationToken.is(i) &&
          ((d -= 1), (a = i));
        const p = d - l;
        switch (p) {
          case 0:
            s = void 0;
            break;
          case 1:
            s = se(u, t[l]);
            break;
          default:
            if (
              u ===
              M_message_signature_constants_maybe.ParameterStructures.byName
            )
              throw new Error(
                `Recevied ${p} parameters for 'by Name' request parameter structure.`
              );
            s = t.slice(l, d).map((e) => ne(e));
        }
      } else {
        const r = t;
        (n = e.method), (s = ae(e, r));
        const i = e.numberOfParams;
        a = M_CancellationTokenManager_maybe.CancellationToken.is(r[i])
          ? r[i]
          : void 0;
      }
      const l = E++;
      let u;
      if (a) {
        u = a.onCancellationRequested(() => {
          z.sender.sendCancellation(ce, l);
        });
      }
      return new Promise((e, t) => {
        const i = {
          jsonrpc: x,
          id: l,
          method: n,
          params: s,
        };
        let a = {
          method: n,
          timerStart: Date.now(),
          resolve: (t) => {
            e(t);
            z.sender.cleanup(l);
            if (null == u) {
              u.dispose();
            }
          },
          reject: (e) => {
            t(e);
            z.sender.cleanup(l);
            if (null == u) {
              u.dispose();
            }
          },
        };
        !(function (e) {
          if (B !== p.Off && O)
            if (F === h.Text) {
              let t;
              if (B === p.Verbose && e.params) {
                t = `Params: ${JSON.stringify(e.params, null, 4)}\n\n`;
              }
              O.log(`Sending request '${e.method} - (${e.id})'.`, t);
            } else te("send-request", e);
        })(i);
        try {
          r.write(i);
        } catch (e) {
          a.reject(
            new M_message_signature_constants_maybe.ResponseError(
              M_message_signature_constants_maybe.ErrorCodes.MessageWriteError,
              e.message ? e.message : "Unknown reason"
            )
          );
          a = null;
        }
        if (a) {
          D[String(l)] = a;
        }
      });
    },
    onRequest: (e, t) => {
      re();
      let r = null;
      if (d.is(e)) {
        r = undefined;
        k = e;
      } else {
        if (M_TypeChecker_maybe.string(e)) {
          r = null;
          if (undefined !== t) {
            r = e;
            I[e] = {
              handler: t,
              type: undefined,
            };
          }
        } else {
          if (undefined !== t) {
            r = e.method;
            I[e.method] = {
              type: e,
              handler: t,
            };
          }
        }
      }
      return {
        dispose: () => {
          if (null !== r) {
            if (undefined !== r) {
              delete I[r];
            } else {
              k = undefined;
            }
          }
        },
      };
    },
    trace: (e, t, r) => {
      let n = false;
      let o = h.Text;
      if (undefined !== r) {
        if (M_TypeChecker_maybe.boolean(r)) {
          n = r;
        } else {
          n = r.sendNotification || false;
          o = r.traceFormat || h.Text;
        }
      }
      B = e;
      F = o;
      O = B === p.Off ? undefined : t;
      if (!n || Q() || J()) {
        ce.sendNotification(f.type, {
          value: p.toString(e),
        });
      }
    },
    onError: U.event,
    onClose: $.event,
    onUnhandledNotification: q.event,
    onDispose: V.event,
    end: () => {
      r.end();
    },
    dispose: () => {
      if (J()) return;
      j = w.Disposed;
      V.fire(undefined);
      const t = new Error("Connection got disposed.");
      Object.keys(D).forEach((e) => {
        D[e].reject(t);
      });
      D = Object.create(null);
      M = Object.create(null);
      L = new M_LinkedMapCacheUtils_maybe.LinkedMap();
      if (M_TypeChecker_maybe.func(r.dispose)) {
        r.dispose();
      }
      if (M_TypeChecker_maybe.func(e.dispose)) {
        e.dispose();
      }
    },
    listen: () => {
      re();
      (function () {
        if (G())
          throw new ConnectionError(
            m.AlreadyListening,
            "Connection is already listening"
          );
      })();
      j = w.Listening;
      e.listen(Z);
    },
    inspect: () => {
      M_RuntimeAbstractionLayerManager_maybe.default().console.log("inspect");
    },
  };
  ce.onNotification(g.type, (e) => {
    if (B !== p.Off && O) {
      O.log(e.message, B === p.Verbose ? e.verbose : undefined);
    }
  });
  ce.onNotification(u.type, (e) => {
    const t = R.get(e.token);
    if (t) {
      t(e.value);
    } else {
      H.fire(e);
    }
  });
  return ce;
};
