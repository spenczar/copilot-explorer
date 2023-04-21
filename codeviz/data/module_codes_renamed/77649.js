var n =
  (this && this.__assign) ||
  Object.assign ||
  function (e) {
    for (r = 1, n = arguments.length, undefined; r < n; r++) {
      var t;
      var r;
      var n;
      for (var i in (t = arguments[r]))
        if (Object.prototype.hasOwnProperty.call(t, i)) {
          e[i] = t[i];
        }
    }
    return e;
  };
var M_http = require("http");
var M_https = require("https");
var M_url = require("url");
var M_constants = require("constants");
var M_LoggingUtils_maybe = require("LoggingUtils");
var M_RequestContextHeadersModule_maybe = require("RequestContextHeadersModule");
var u = (function () {
  function e() {}
  e.getCookie = function (t, r) {
    var n = "";
    if (t && t.length && "string" == typeof r)
      for (i = t + "=", o = r.split(";"), s = 0, undefined; s < o.length; s++) {
        var i;
        var o;
        var s;
        r = o[s];
        if ((r = e.trim(r)) && 0 === r.indexOf(i)) {
          n = r.substring(i.length, o[s].length);
          break;
        }
      }
    return n;
  };
  e.trim = function (e) {
    return "string" == typeof e ? e.replace(/^\s+|\s+$/g, "") : "";
  };
  e.int32ArrayToBase64 = function (e) {
    var t = function (e, t) {
      return String.fromCharCode((e >> t) & 255);
    };
    var r = e
      .map(function (e) {
        return t(e, 24) + t(e, 16) + t(e, 8) + t(e, 0);
      })
      .join("");
    var n = (
      Buffer.from ? Buffer.from(r, "binary") : new Buffer(r, "binary")
    ).toString("base64");
    return n.substr(0, n.indexOf("="));
  };
  e.random32 = function () {
    return (4294967296 * Math.random()) | 0;
  };
  e.randomu32 = function () {
    return e.random32() + 2147483648;
  };
  e.w3cTraceId = function () {
    for (
      r = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
      ],
        n = "",
        i = 0,
        undefined;
      i < 4;
      i++
    ) {
      var t;
      var r;
      var n;
      var i;
      n +=
        r[15 & (t = e.random32())] +
        r[(t >> 4) & 15] +
        r[(t >> 8) & 15] +
        r[(t >> 12) & 15] +
        r[(t >> 16) & 15] +
        r[(t >> 20) & 15] +
        r[(t >> 24) & 15] +
        r[(t >> 28) & 15];
    }
    var o = r[(8 + 4 * Math.random()) | 0];
    return (
      n.substr(0, 8) +
      n.substr(9, 4) +
      "4" +
      n.substr(13, 3) +
      o +
      n.substr(16, 3) +
      n.substr(19, 12)
    );
  };
  e.isValidW3CId = function (e) {
    return 32 === e.length && "00000000000000000000000000000000" !== e;
  };
  e.isArray = function (e) {
    return "[object Array]" === Object.prototype.toString.call(e);
  };
  e.isError = function (e) {
    return e instanceof Error;
  };
  e.isPrimitive = function (e) {
    var t = typeof e;
    return "string" === t || "number" === t || "boolean" === t;
  };
  e.isDate = function (e) {
    return "[object Date]" === Object.prototype.toString.call(e);
  };
  e.msToTimeSpan = function (e) {
    if (isNaN(e) || e < 0) {
      e = 0;
    }
    var t = ((e / 1e3) % 60).toFixed(7).replace(/0{0,4}$/, "");
    var r = "" + (Math.floor(e / 6e4) % 60);
    var n = "" + (Math.floor(e / 36e5) % 24);
    var i = Math.floor(e / 864e5);
    t = t.indexOf(".") < 2 ? "0" + t : t;
    r = r.length < 2 ? "0" + r : r;
    return (
      (i > 0 ? i + "." : "") +
      (n = n.length < 2 ? "0" + n : n) +
      ":" +
      r +
      ":" +
      t
    );
  };
  e.extractError = function (e) {
    var t = e;
    return {
      message: e.message,
      code: t.code || t.id || "",
    };
  };
  e.extractObject = function (t) {
    return t instanceof Error
      ? e.extractError(t)
      : "function" == typeof t.toJSON
      ? t.toJSON()
      : t;
  };
  e.validateStringMap = function (t) {
    if ("object" == typeof t) {
      var r = {};
      for (var n in t) {
        var i = "";
        var o = t[n];
        var s = typeof o;
        if (e.isPrimitive(o)) i = o.toString();
        else if (null === o || "undefined" === s) i = "";
        else {
          if ("function" === s) {
            M_LoggingUtils_maybe.info(
              "key: " + n + " was function; will not serialize"
            );
            continue;
          }
          var a = e.isArray(o) ? o : e.extractObject(o);
          try {
            i = e.isPrimitive(a) ? a : JSON.stringify(a);
          } catch (e) {
            i = o.constructor.name.toString() + " (Error: " + e.message + ")";
            M_LoggingUtils_maybe.info(
              "key: " + n + ", could not be serialized"
            );
          }
        }
        r[n] = i.substring(0, e.MAX_PROPERTY_LENGTH);
      }
      return r;
    }
    M_LoggingUtils_maybe.info("Invalid properties dropped from payload");
  };
  e.canIncludeCorrelationHeader = function (e, t) {
    var r = e && e.config && e.config.correlationHeaderExcludedDomains;
    if (!r || 0 == r.length || !t) return true;
    for (var n = 0; n < r.length; n++)
      if (
        new RegExp(r[n].replace(/\./g, ".").replace(/\*/g, ".*")).test(
          M_url.parse(t).hostname
        )
      )
        return false;
    return true;
  };
  e.getCorrelationContextTarget = function (e, t) {
    var r =
      e.headers &&
      e.headers[M_RequestContextHeadersModule_maybe.requestContextHeader];
    if (r)
      for (n = r.split(","), i = 0, undefined; i < n.length; ++i) {
        var n;
        var i;
        var o = n[i].split("=");
        if (2 == o.length && o[0] == t) return o[1];
      }
  };
  e.makeRequest = function (t, r, a, l) {
    if (r && 0 === r.indexOf("//")) {
      r = "https:" + r;
    }
    var u = M_url.parse(r);
    var d = n({}, a, {
      host: u.hostname,
      port: u.port,
      path: u.pathname,
    });
    var p = undefined;
    if ("https:" === u.protocol) {
      p = t.proxyHttpsUrl || undefined;
    }
    if ("http:" === u.protocol) {
      p = t.proxyHttpUrl || undefined;
    }
    if (p) {
      0 === p.indexOf("//") && (p = "http:" + p);
      var h = M_url.parse(p);
      "https:" === h.protocol
        ? (M_LoggingUtils_maybe.info(
            "Proxies that use HTTPS are not supported"
          ),
          (p = void 0))
        : (d = n({}, d, {
            host: h.hostname,
            port: h.port || "80",
            path: r,
            headers: n({}, d.headers, {
              Host: u.hostname,
            }),
          }));
    }
    var f = "https:" === u.protocol && !p;
    if (f && undefined !== t.httpsAgent) {
      d.agent = t.httpsAgent;
    } else {
      if (f || undefined === t.httpAgent) {
        if (f) {
          d.agent = e.tlsRestrictedAgent;
        }
      } else {
        d.agent = t.httpAgent;
      }
    }
    return f ? M_https.request(d, l) : M_http.request(d, l);
  };
  e.safeIncludeCorrelationHeader = function (t, r, n) {
    var i;
    if ("string" == typeof n) i = n;
    else if (n instanceof Array) i = n.join(",");
    else if (n && "function" == typeof n.toString)
      try {
        i = n.toString();
      } catch (e) {
        M_LoggingUtils_maybe.warn(
          "Outgoing request-context header could not be read. Correlation of requests may be lost.",
          e,
          n
        );
      }
    if (i) {
      e.addCorrelationIdHeaderFromString(t, r, i);
    } else {
      r.setHeader(
        M_RequestContextHeadersModule_maybe.requestContextHeader,
        M_RequestContextHeadersModule_maybe.requestContextSourceKey +
          "=" +
          t.config.correlationId
      );
    }
  };
  e.addCorrelationIdHeaderFromString = function (e, t, r) {
    var n = r.split(",");
    var i = M_RequestContextHeadersModule_maybe.requestContextSourceKey + "=";
    if (
      n.some(function (e) {
        return e.substring(0, i.length) === i;
      })
    ) {
      t.setHeader(
        M_RequestContextHeadersModule_maybe.requestContextHeader,
        r +
          "," +
          M_RequestContextHeadersModule_maybe.requestContextSourceKey +
          "=" +
          e.config.correlationId
      );
    }
  };
  e.MAX_PROPERTY_LENGTH = 8192;
  e.tlsRestrictedAgent = new M_https.Agent({
    secureOptions:
      M_constants.SSL_OP_NO_SSLv2 |
      M_constants.SSL_OP_NO_SSLv3 |
      M_constants.SSL_OP_NO_TLSv1 |
      M_constants.SSL_OP_NO_TLSv1_1,
  });
  return e;
})();
module.exports = u;
