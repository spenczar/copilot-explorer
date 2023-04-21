require("net");
var debug;
var i = require("tls");
var o = require("http");
var s = require("https");
var a = require("events");
var c = (require("assert"), require("util"));
function l(e) {
  var t = this;
  t.options = e || {};
  t.proxyOptions = t.options.proxy || {};
  t.maxSockets = t.options.maxSockets || o.Agent.defaultMaxSockets;
  t.requests = [];
  t.sockets = [];
  t.on("free", function (e, r, n, i) {
    for (o = d(r, n, i), s = 0, a = t.requests.length, undefined; s < a; ++s) {
      var o;
      var s;
      var a;
      var c = t.requests[s];
      if (c.host === o.host && c.port === o.port) {
        t.requests.splice(s, 1);
        return void c.request.onSocket(e);
      }
    }
    e.destroy();
    t.removeSocket(e);
  });
}
function u(e, t) {
  var r = this;
  l.prototype.createSocket.call(r, e, function (n) {
    var o = e.request.getHeader("host");
    var s = p({}, r.options, {
      socket: n,
      servername: o ? o.replace(/:.*$/, "") : e.host,
    });
    var a = i.connect(0, s);
    r.sockets[r.sockets.indexOf(n)] = a;
    t(a);
  });
}
function d(e, t, r) {
  return "string" == typeof e
    ? {
        host: e,
        port: t,
        localAddress: r,
      }
    : e;
}
function p(e) {
  for (t = 1, r = arguments.length, undefined; t < r; ++t) {
    var t;
    var r;
    var n = arguments[t];
    if ("object" == typeof n)
      for (i = Object.keys(n), o = 0, s = i.length, undefined; o < s; ++o) {
        var i;
        var o;
        var s;
        var a = i[o];
        if (undefined !== n[a]) {
          e[a] = n[a];
        }
      }
  }
  return e;
}
exports.httpOverHttp = function (e) {
  var t = new l(e);
  t.request = o.request;
  return t;
};
exports.httpsOverHttp = function (e) {
  var t = new l(e);
  t.request = o.request;
  t.createSocket = u;
  t.defaultPort = 443;
  return t;
};
exports.httpOverHttps = function (e) {
  var t = new l(e);
  t.request = s.request;
  return t;
};
exports.httpsOverHttps = function (e) {
  var t = new l(e);
  t.request = s.request;
  t.createSocket = u;
  t.defaultPort = 443;
  return t;
};
c.inherits(l, a.EventEmitter);
l.prototype.addRequest = function (e, t, r, n) {
  var i = this;
  var o = p(
    {
      request: e,
    },
    i.options,
    d(t, r, n)
  );
  if (i.sockets.length >= this.maxSockets) {
    i.requests.push(o);
  } else {
    i.createSocket(o, function (t) {
      function r() {
        i.emit("free", t, o);
      }
      function n(e) {
        i.removeSocket(t);
        t.removeListener("free", r);
        t.removeListener("close", n);
        t.removeListener("agentRemove", n);
      }
      t.on("free", r);
      t.on("close", n);
      t.on("agentRemove", n);
      e.onSocket(t);
    });
  }
};
l.prototype.createSocket = function (e, t) {
  var r = this;
  var i = {};
  r.sockets.push(i);
  var o = p({}, r.proxyOptions, {
    method: "CONNECT",
    path: e.host + ":" + e.port,
    agent: false,
    headers: {
      host: e.host + ":" + e.port,
    },
  });
  if (e.localAddress) {
    o.localAddress = e.localAddress;
  }
  if (o.proxyAuth) {
    o.headers = o.headers || {};
    o.headers["Proxy-Authorization"] =
      "Basic " + new Buffer(o.proxyAuth).toString("base64");
  }
  debug("making CONNECT request");
  var s = r.request(o);
  function a(o, a, c) {
    var l;
    s.removeAllListeners();
    a.removeAllListeners();
    return 200 !== o.statusCode
      ? (debug(
          "tunneling socket could not be established, statusCode=%d",
          o.statusCode
        ),
        a.destroy(),
        ((l = new Error(
          "tunneling socket could not be established, statusCode=" +
            o.statusCode
        )).code = "ECONNRESET"),
        e.request.emit("error", l),
        void r.removeSocket(i))
      : c.length > 0
      ? (debug("got illegal response body from proxy"),
        a.destroy(),
        ((l = new Error("got illegal response body from proxy")).code =
          "ECONNRESET"),
        e.request.emit("error", l),
        void r.removeSocket(i))
      : (debug("tunneling connection has established"),
        (r.sockets[r.sockets.indexOf(i)] = a),
        t(a));
  }
  s.useChunkedEncodingByDefault = false;
  s.once("response", function (e) {
    e.upgrade = true;
  });
  s.once("upgrade", function (e, t, r) {
    process.nextTick(function () {
      a(e, t, r);
    });
  });
  s.once("connect", a);
  s.once("error", function (t) {
    s.removeAllListeners();
    debug(
      "tunneling socket could not be established, cause=%s\n",
      t.message,
      t.stack
    );
    var o = new Error(
      "tunneling socket could not be established, cause=" + t.message
    );
    o.code = "ECONNRESET";
    e.request.emit("error", o);
    r.removeSocket(i);
  });
  s.end();
};
l.prototype.removeSocket = function (e) {
  var t = this.sockets.indexOf(e);
  if (-1 !== t) {
    this.sockets.splice(t, 1);
    var r = this.requests.shift();
    if (r) {
      this.createSocket(r, function (e) {
        r.request.onSocket(e);
      });
    }
  }
};
debug =
  process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)
    ? function () {
        var e = Array.prototype.slice.call(arguments);
        if ("string" == typeof e[0]) {
          e[0] = "TUNNEL: " + e[0];
        } else {
          e.unshift("TUNNEL:");
        }
        console.error.apply(console, e);
      }
    : function () {};
exports.debug = debug;