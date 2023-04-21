var M_OptionsManager_maybe = require("OptionsManager");
require("binary-data-reader");
var i =
  (module.exports =
  M_OptionsManager_maybe.pem =
    M_OptionsManager_maybe.pem || {});
function o(e) {
  for (
    t = e.name + ": ",
      r = [],
      n = function (e, t) {
        return " " + t;
      },
      i = 0,
      undefined;
    i < e.values.length;
    ++i
  ) {
    var t;
    var r;
    var n;
    var i;
    r.push(e.values[i].replace(/^(\S+\r\n)/, n));
  }
  t += r.join(",") + "\r\n";
  var o = 0;
  var s = -1;
  for (i = 0; i < t.length; ++i, ++o)
    if (o > 65 && -1 !== s) {
      var a = t[s];
      if ("," === a) {
        ++s;
        t = t.substr(0, s) + "\r\n " + t.substr(s);
      } else {
        t = t.substr(0, s) + "\r\n" + a + t.substr(s + 1);
      }
      o = i - s - 1;
      s = -1;
      ++i;
    } else if (" " !== t[i] && "\t" !== t[i] && "," !== t[i]) {
      s = i;
    }
  return t;
}
function s(e) {
  return e.replace(/^\s+/, "");
}
i.encode = function (e, t) {
  t = t || {};
  var r;
  var i = "-----BEGIN " + e.type + "-----\r\n";
  if (e.procType) {
    i += o(
      (r = {
        name: "Proc-Type",
        values: [String(e.procType.version), e.procType.type],
      })
    );
  }
  if (e.contentDomain) {
    i += o(
      (r = {
        name: "Content-Domain",
        values: [e.contentDomain],
      })
    );
  }
  if (e.dekInfo) {
    r = {
      name: "DEK-Info",
      values: [e.dekInfo.algorithm],
    };
    if (e.dekInfo.parameters) {
      r.values.push(e.dekInfo.parameters);
    }
    i += o(r);
  }
  if (e.headers)
    for (var s = 0; s < e.headers.length; ++s) i += o(e.headers[s]);
  if (e.procType) {
    i += "\r\n";
  }
  return (
    (i +=
      M_OptionsManager_maybe.util.encode64(e.body, t.maxline || 64) + "\r\n") +
    "-----END " +
    e.type +
    "-----\r\n"
  );
};
i.decode = function (e) {
  for (
    r = [],
      i =
        /\s*-----BEGIN ([A-Z0-9- ]+)-----\r?\n?([\x21-\x7e\s]+?(?:\r?\n\r?\n))?([:A-Za-z0-9+\/=\s]+?)-----END \1-----/g,
      o = /([\x21-\x7e]+):\s*([\x21-\x7e\s^:]+)/,
      a = /\r?\n/,
      undefined;
    (t = i.exec(e));

  ) {
    var t;
    var r;
    var i;
    var o;
    var a;
    var c = t[1];
    if ("NEW CERTIFICATE REQUEST" === c) {
      c = "CERTIFICATE REQUEST";
    }
    var l = {
      type: c,
      procType: null,
      contentDomain: null,
      dekInfo: null,
      headers: [],
      body: M_OptionsManager_maybe.util.decode64(t[3]),
    };
    r.push(l);
    if (t[2]) {
      for (var u = t[2].split(a), d = 0; t && d < u.length; ) {
        for (var p = u[d].replace(/\s+$/, ""), h = d + 1; h < u.length; ++h) {
          var f = u[h];
          if (!/\s/.test(f[0])) break;
          (p += f), (d = h);
        }
        if ((t = p.match(o))) {
          for (
            var g = {
                name: t[1],
                values: [],
              },
              m = t[2].split(","),
              y = 0;
            y < m.length;
            ++y
          )
            g.values.push(s(m[y]));
          if (l.procType) {
            if (l.contentDomain || "Content-Domain" !== g.name) {
              if (l.dekInfo || "DEK-Info" !== g.name) l.headers.push(g);
              else {
                if (0 === g.values.length)
                  throw new Error(
                    'Invalid PEM formatted message. The "DEK-Info" header must have at least one subfield.'
                  );
                l.dekInfo = {
                  algorithm: m[0],
                  parameters: m[1] || null,
                };
              }
            } else l.contentDomain = m[0] || "";
          } else {
            if ("Proc-Type" !== g.name)
              throw new Error(
                'Invalid PEM formatted message. The first encapsulated header must be "Proc-Type".'
              );
            if (2 !== g.values.length)
              throw new Error(
                'Invalid PEM formatted message. The "Proc-Type" header must have two subfields.'
              );
            l.procType = {
              version: m[0],
              type: m[1],
            };
          }
        }
        ++d;
      }
      if ("ENCRYPTED" === l.procType && !l.dekInfo)
        throw new Error(
          'Invalid PEM formatted message. The "DEK-Info" header must be present if "Proc-Type" is "ENCRYPTED".'
        );
    }
  }
  if (0 === r.length) throw new Error("Invalid PEM formatted message.");
  return r;
};
