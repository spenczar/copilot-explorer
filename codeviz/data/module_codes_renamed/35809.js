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
exports.createConnection = exports.Files = undefined;
const M_TypeChecker_maybe = require("TypeChecker");
const M_DocumentManager_maybe = require("DocumentManager");
const M_ModuleResolver_maybe = require("ModuleResolver");
const M_MessageConnectionManager_maybe = require("MessageConnectionManager");
var l;
i(require("MessageConnectionManager"), exports);
i(require("language-semantic-tokens-builder"), exports);
(l = exports.Files || (exports.Files = {})).uriToFilePath =
  M_ModuleResolver_maybe.uriToFilePath;
l.resolveGlobalNodePath = M_ModuleResolver_maybe.resolveGlobalNodePath;
l.resolveGlobalYarnPath = M_ModuleResolver_maybe.resolveGlobalYarnPath;
l.resolve = M_ModuleResolver_maybe.resolve;
l.resolveModulePath = M_ModuleResolver_maybe.resolveModulePath;
let u;
let d = false;
!(function () {
  const e = "--clientProcessId";
  function t(e) {
    try {
      let t = parseInt(e);
      if (isNaN(t)) {
        u = setInterval(() => {
          try {
            process.kill(t, 0);
          } catch (e) {
            process.exit(d ? 0 : 1);
          }
        }, 3e3);
      }
    } catch (e) {}
  }
  for (let r = 2; r < process.argv.length; r++) {
    let n = process.argv[r];
    if (n === e && r + 1 < process.argv.length)
      return void t(process.argv[r + 1]);
    {
      let r = n.split("=");
      if (r[0] === e) {
        t(r[1]);
      }
    }
  }
})();
const p = {
  initialize: (e) => {
    const t = e.processId;
    if (M_TypeChecker_maybe.number(t) && undefined === u) {
      setInterval(() => {
        try {
          process.kill(t, 0);
        } catch (e) {
          process.exit(d ? 0 : 1);
        }
      }, 3e3);
    }
  },
  get shutdownReceived() {
    return d;
  },
  set shutdownReceived(e) {
    d = e;
  },
  exit: (e) => {
    process.exit(e);
  },
};
exports.createConnection = function (e, t, r, n) {
  let i;
  let a;
  let l;
  let u;
  if (undefined !== e && "features" === e.__brand) {
    i = e;
    e = t;
    t = r;
    r = n;
  }
  if (
    M_MessageConnectionManager_maybe.ConnectionStrategy.is(e) ||
    M_MessageConnectionManager_maybe.ConnectionOptions.is(e)
  ) {
    u = e;
  } else {
    a = e;
    l = t;
    u = r;
  }
  return (function (e, t, r, n) {
    if (!e && !t && process.argv.length > 2) {
      let r;
      let n;
      let o = process.argv.slice(2);
      for (let s = 0; s < o.length; s++) {
        let a = o[s];
        if ("--node-ipc" === a) {
          e = new M_MessageConnectionManager_maybe.IPCMessageReader(process);
          t = new M_MessageConnectionManager_maybe.IPCMessageWriter(process);
          break;
        }
        if ("--stdio" === a) {
          e = process.stdin;
          t = process.stdout;
          break;
        }
        if ("--socket" === a) {
          r = parseInt(o[s + 1]);
          break;
        }
        if ("--pipe" === a) {
          n = o[s + 1];
          break;
        }
        var i = a.split("=");
        if ("--socket" === i[0]) {
          r = parseInt(i[1]);
          break;
        }
        if ("--pipe" === i[0]) {
          n = i[1];
          break;
        }
      }
      if (r) {
        let n = M_MessageConnectionManager_maybe.createServerSocketTransport(r);
        e = n[0];
        t = n[1];
      } else if (n) {
        let r = M_MessageConnectionManager_maybe.createServerPipeTransport(n);
        e = r[0];
        t = r[1];
      }
    }
    var a =
      "Use arguments of createConnection or set command line parameters: '--node-ipc', '--stdio' or '--socket={number}'";
    if (!e) throw new Error("Connection input stream is not set. " + a);
    if (!t) throw new Error("Connection output stream is not set. " + a);
    if (M_TypeChecker_maybe.func(e.read) && M_TypeChecker_maybe.func(e.on)) {
      let t = e;
      t.on("end", () => {
        process.exit(d ? 0 : 1);
      });
      t.on("close", () => {
        process.exit(d ? 0 : 1);
      });
    }
    return M_DocumentManager_maybe.createConnection(
      (n) =>
        M_MessageConnectionManager_maybe.createProtocolConnection(e, t, n, r),
      p,
      n
    );
  })(a, l, u, i);
};
