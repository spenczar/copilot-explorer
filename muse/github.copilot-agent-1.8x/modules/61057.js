var n = require(56105);
require(56827);
require(81877);
var i = (module.exports = n.asn1 = n.asn1 || {});
function o(e, t, r) {
  if (r > t) {
    var n = new Error("Too few bytes to parse DER.");
    throw ((n.available = e.length()), (n.remaining = t), (n.requested = r), n);
  }
}
function s(e, t, r, n) {
  var a;
  o(e, t, 2);
  var c = e.getByte();
  t--;
  var l = 192 & c;
  var u = 31 & c;
  a = e.length();
  var d;
  var p;
  var h = (function (e, t) {
    var r = e.getByte();
    t--;
    if (128 !== r) {
      var n;
      if (128 & r) {
        var i = 127 & r;
        o(e, t, i), (n = e.getInt(i << 3));
      } else n = r;
      if (n < 0) throw new Error("Negative length: " + n);
      return n;
    }
  })(e, t);
  t -= a - e.length();
  if (void 0 !== h && h > t) {
    if (n.strict) {
      var f = new Error("Too few bytes to read ASN.1 value.");
      throw (
        ((f.available = e.length()), (f.remaining = t), (f.requested = h), f)
      );
    }
    h = t;
  }
  var g = 32 == (32 & c);
  if (g) {
    d = [];
    if (undefined === h)
      for (;;) {
        o(e, t, 2);
        if (e.bytes(2) === String.fromCharCode(0, 0)) {
          e.getBytes(2), (t -= 2);
          break;
        }
        a = e.length();
        d.push(s(e, t, r + 1, n));
        t -= a - e.length();
      }
    else
      for (; h > 0; ) {
        a = e.length();
        d.push(s(e, h, r + 1, n));
        t -= a - e.length();
        h -= a - e.length();
      }
  }
  if (undefined === d && l === i.Class.UNIVERSAL && u === i.Type.BITSTRING) {
    p = e.bytes(h);
  }
  if (
    void 0 === d &&
    n.decodeBitStrings &&
    l === i.Class.UNIVERSAL &&
    u === i.Type.BITSTRING &&
    h > 1
  ) {
    var m = e.read,
      y = t,
      v = 0;
    if (
      (u === i.Type.BITSTRING && (o(e, t, 1), (v = e.getByte()), t--), 0 === v)
    )
      try {
        a = e.length();
        var _ = s(e, t, r + 1, {
            strict: !0,
            decodeBitStrings: !0,
          }),
          b = a - e.length();
        (t -= b), u == i.Type.BITSTRING && b++;
        var w = _.tagClass;
        b !== h ||
          (w !== i.Class.UNIVERSAL && w !== i.Class.CONTEXT_SPECIFIC) ||
          (d = [_]);
      } catch (e) {}
    void 0 === d && ((e.read = m), (t = y));
  }
  if (undefined === d) {
    if (undefined === h) {
      if (n.strict)
        throw new Error("Non-constructed ASN.1 object of indefinite length.");
      h = t;
    }
    if (u === i.Type.BMPSTRING)
      for (d = ""; h > 0; h -= 2) {
        o(e, t, 2);
        d += String.fromCharCode(e.getInt16());
        t -= 2;
      }
    else {
      d = e.getBytes(h);
      t -= h;
    }
  }
  var C =
    undefined === p
      ? null
      : {
          bitStringContents: p,
        };
  return i.create(l, u, g, d, C);
}
i.Class = {
  UNIVERSAL: 0,
  APPLICATION: 64,
  CONTEXT_SPECIFIC: 128,
  PRIVATE: 192,
};
i.Type = {
  NONE: 0,
  BOOLEAN: 1,
  INTEGER: 2,
  BITSTRING: 3,
  OCTETSTRING: 4,
  NULL: 5,
  OID: 6,
  ODESC: 7,
  EXTERNAL: 8,
  REAL: 9,
  ENUMERATED: 10,
  EMBEDDED: 11,
  UTF8: 12,
  ROID: 13,
  SEQUENCE: 16,
  SET: 17,
  PRINTABLESTRING: 19,
  IA5STRING: 22,
  UTCTIME: 23,
  GENERALIZEDTIME: 24,
  BMPSTRING: 30,
};
i.create = function (e, t, r, o, s) {
  if (n.util.isArray(o)) {
    for (a = [], c = 0, undefined; c < o.length; ++c) {
      var a;
      var c;
      if (undefined !== o[c]) {
        a.push(o[c]);
      }
    }
    o = a;
  }
  var l = {
    tagClass: e,
    type: t,
    constructed: r,
    composed: r || n.util.isArray(o),
    value: o,
  };
  if (s && "bitStringContents" in s) {
    l.bitStringContents = s.bitStringContents;
    l.original = i.copy(l);
  }
  return l;
};
i.copy = function (e, t) {
  var r;
  if (n.util.isArray(e)) {
    r = [];
    for (var o = 0; o < e.length; ++o) r.push(i.copy(e[o], t));
    return r;
  }
  return "string" == typeof e
    ? e
    : ((r = {
        tagClass: e.tagClass,
        type: e.type,
        constructed: e.constructed,
        composed: e.composed,
        value: i.copy(e.value, t),
      }),
      t &&
        !t.excludeBitStringContents &&
        (r.bitStringContents = e.bitStringContents),
      r);
};
i.equals = function (e, t, r) {
  if (n.util.isArray(e)) {
    if (!n.util.isArray(t)) return false;
    if (e.length !== t.length) return false;
    for (var o = 0; o < e.length; ++o) if (!i.equals(e[o], t[o])) return false;
    return true;
  }
  if (typeof e != typeof t) return false;
  if ("string" == typeof e) return e === t;
  var s =
    e.tagClass === t.tagClass &&
    e.type === t.type &&
    e.constructed === t.constructed &&
    e.composed === t.composed &&
    i.equals(e.value, t.value);
  if (r && r.includeBitStringContents) {
    s = s && e.bitStringContents === t.bitStringContents;
  }
  return s;
};
i.getBerValueLength = function (e) {
  var t = e.getByte();
  if (128 !== t) return 128 & t ? e.getInt((127 & t) << 3) : t;
};
i.fromDer = function (e, t) {
  if (undefined === t) {
    t = {
      strict: true,
      parseAllBytes: true,
      decodeBitStrings: true,
    };
  }
  if ("boolean" == typeof t) {
    t = {
      strict: t,
      parseAllBytes: true,
      decodeBitStrings: true,
    };
  }
  if ("strict" in t) {
    t.strict = true;
  }
  if ("parseAllBytes" in t) {
    t.parseAllBytes = true;
  }
  if ("decodeBitStrings" in t) {
    t.decodeBitStrings = true;
  }
  if ("string" == typeof e) {
    e = n.util.createBuffer(e);
  }
  var r = e.length();
  var i = s(e, e.length(), 0, t);
  if (t.parseAllBytes && 0 !== e.length()) {
    var o = new Error("Unparsed DER bytes remain after ASN.1 parsing.");
    throw ((o.byteCount = r), (o.remaining = e.length()), o);
  }
  return i;
};
i.toDer = function (e) {
  var t = n.util.createBuffer();
  var r = e.tagClass | e.type;
  var o = n.util.createBuffer();
  var s = false;
  if ("bitStringContents" in e) {
    s = true;
    if (e.original) {
      s = i.equals(e, e.original);
    }
  }
  if (s) o.putBytes(e.bitStringContents);
  else if (e.composed) {
    e.constructed ? (r |= 32) : o.putByte(0);
    for (var a = 0; a < e.value.length; ++a)
      void 0 !== e.value[a] && o.putBuffer(i.toDer(e.value[a]));
  } else if (e.type === i.Type.BMPSTRING)
    for (a = 0; a < e.value.length; ++a) o.putInt16(e.value.charCodeAt(a));
  else
    e.type === i.Type.INTEGER &&
    e.value.length > 1 &&
    ((0 === e.value.charCodeAt(0) && 0 == (128 & e.value.charCodeAt(1))) ||
      (255 === e.value.charCodeAt(0) && 128 == (128 & e.value.charCodeAt(1))))
      ? o.putBytes(e.value.substr(1))
      : o.putBytes(e.value);
  t.putByte(r);
  if (o.length() <= 127) t.putByte(127 & o.length());
  else {
    var c = o.length(),
      l = "";
    do {
      (l += String.fromCharCode(255 & c)), (c >>>= 8);
    } while (c > 0);
    for (t.putByte(128 | l.length), a = l.length - 1; a >= 0; --a)
      t.putByte(l.charCodeAt(a));
  }
  t.putBuffer(o);
  return t;
};
i.oidToDer = function (e) {
  var t;
  var r;
  var i;
  var o;
  var s = e.split(".");
  var a = n.util.createBuffer();
  a.putByte(40 * parseInt(s[0], 10) + parseInt(s[1], 10));
  for (var c = 2; c < s.length; ++c) {
    t = true;
    r = [];
    i = parseInt(s[c], 10);
    do {
      o = 127 & i;
      i >>>= 7;
      if (t) {
        o |= 128;
      }
      r.push(o);
      t = false;
    } while (i > 0);
    for (var l = r.length - 1; l >= 0; --l) a.putByte(r[l]);
  }
  return a;
};
i.derToOid = function (e) {
  var t;
  if ("string" == typeof e) {
    e = n.util.createBuffer(e);
  }
  var r = e.getByte();
  t = Math.floor(r / 40) + "." + (r % 40);
  for (var i = 0; e.length() > 0; ) {
    i <<= 7;
    if (128 & (r = e.getByte())) {
      i += 127 & r;
    } else {
      t += "." + (i + r);
      i = 0;
    }
  }
  return t;
};
i.utcTimeToDate = function (e) {
  var t = new Date();
  var r = parseInt(e.substr(0, 2), 10);
  r = r >= 50 ? 1900 + r : 2e3 + r;
  var n = parseInt(e.substr(2, 2), 10) - 1;
  var i = parseInt(e.substr(4, 2), 10);
  var o = parseInt(e.substr(6, 2), 10);
  var s = parseInt(e.substr(8, 2), 10);
  var a = 0;
  if (e.length > 11) {
    var c = e.charAt(10);
    var l = 10;
    if ("+" !== c && "-" !== c) {
      a = parseInt(e.substr(10, 2), 10);
      l += 2;
    }
  }
  t.setUTCFullYear(r, n, i);
  t.setUTCHours(o, s, a, 0);
  if (l && ("+" === (c = e.charAt(l)) || "-" === c)) {
    var u =
      60 * parseInt(e.substr(l + 1, 2), 10) + parseInt(e.substr(l + 4, 2), 10);
    (u *= 6e4), "+" === c ? t.setTime(+t - u) : t.setTime(+t + u);
  }
  return t;
};
i.generalizedTimeToDate = function (e) {
  var t = new Date();
  var r = parseInt(e.substr(0, 4), 10);
  var n = parseInt(e.substr(4, 2), 10) - 1;
  var i = parseInt(e.substr(6, 2), 10);
  var o = parseInt(e.substr(8, 2), 10);
  var s = parseInt(e.substr(10, 2), 10);
  var a = parseInt(e.substr(12, 2), 10);
  var c = 0;
  var l = 0;
  var u = false;
  if ("Z" === e.charAt(e.length - 1)) {
    u = true;
  }
  var d = e.length - 5;
  var p = e.charAt(d);
  if ("+" !== p && "-" !== p) {
    l =
      60 * parseInt(e.substr(d + 1, 2), 10) + parseInt(e.substr(d + 4, 2), 10);
    l *= 6e4;
    if ("+" === p) {
      l *= -1;
    }
    u = true;
  }
  if ("." === e.charAt(14)) {
    c = 1e3 * parseFloat(e.substr(14), 10);
  }
  if (u) {
    t.setUTCFullYear(r, n, i);
    t.setUTCHours(o, s, a, c);
    t.setTime(+t + l);
  } else {
    t.setFullYear(r, n, i);
    t.setHours(o, s, a, c);
  }
  return t;
};
i.dateToUtcTime = function (e) {
  if ("string" == typeof e) return e;
  var t = "";
  var r = [];
  r.push(("" + e.getUTCFullYear()).substr(2));
  r.push("" + (e.getUTCMonth() + 1));
  r.push("" + e.getUTCDate());
  r.push("" + e.getUTCHours());
  r.push("" + e.getUTCMinutes());
  r.push("" + e.getUTCSeconds());
  for (var n = 0; n < r.length; ++n) {
    if (r[n].length < 2) {
      t += "0";
    }
    t += r[n];
  }
  return t + "Z";
};
i.dateToGeneralizedTime = function (e) {
  if ("string" == typeof e) return e;
  var t = "";
  var r = [];
  r.push("" + e.getUTCFullYear());
  r.push("" + (e.getUTCMonth() + 1));
  r.push("" + e.getUTCDate());
  r.push("" + e.getUTCHours());
  r.push("" + e.getUTCMinutes());
  r.push("" + e.getUTCSeconds());
  for (var n = 0; n < r.length; ++n) {
    if (r[n].length < 2) {
      t += "0";
    }
    t += r[n];
  }
  return t + "Z";
};
i.integerToDer = function (e) {
  var t = n.util.createBuffer();
  if (e >= -128 && e < 128) return t.putSignedInt(e, 8);
  if (e >= -32768 && e < 32768) return t.putSignedInt(e, 16);
  if (e >= -8388608 && e < 8388608) return t.putSignedInt(e, 24);
  if (e >= -2147483648 && e < 2147483648) return t.putSignedInt(e, 32);
  var r = new Error("Integer too large; max is 32-bits.");
  throw ((r.integer = e), r);
};
i.derToInteger = function (e) {
  if ("string" == typeof e) {
    e = n.util.createBuffer(e);
  }
  var t = 8 * e.length();
  if (t > 32) throw new Error("Integer too large; max is 32-bits.");
  return e.getSignedInt(t);
};
i.validate = function (e, t, r, o) {
  var s = false;
  if (
    (e.tagClass !== t.tagClass && undefined !== t.tagClass) ||
    (e.type !== t.type && undefined !== t.type)
  ) {
    if (o) {
      if (e.tagClass !== t.tagClass) {
        o.push(
          "[" +
            t.name +
            '] Expected tag class "' +
            t.tagClass +
            '", got "' +
            e.tagClass +
            '"'
        );
      }
      if (e.type !== t.type) {
        o.push(
          "[" +
            t.name +
            '] Expected type "' +
            t.type +
            '", got "' +
            e.type +
            '"'
        );
      }
    }
  } else if (e.constructed === t.constructed || undefined === t.constructed) {
    s = true;
    if (t.value && n.util.isArray(t.value))
      for (var a = 0, c = 0; s && c < t.value.length; ++c)
        (s = t.value[c].optional || !1),
          e.value[a] &&
            ((s = i.validate(e.value[a], t.value[c], r, o))
              ? ++a
              : t.value[c].optional && (s = !0)),
          !s &&
            o &&
            o.push(
              "[" +
                t.name +
                '] Tag class "' +
                t.tagClass +
                '", type "' +
                t.type +
                '" expected value length "' +
                t.value.length +
                '", got "' +
                e.value.length +
                '"'
            );
    if (
      s &&
      r &&
      (t.capture && (r[t.capture] = e.value),
      t.captureAsn1 && (r[t.captureAsn1] = e),
      t.captureBitStringContents &&
        "bitStringContents" in e &&
        (r[t.captureBitStringContents] = e.bitStringContents),
      t.captureBitStringValue && "bitStringContents" in e)
    )
      if (e.bitStringContents.length < 2) r[t.captureBitStringValue] = "";
      else {
        if (0 !== e.bitStringContents.charCodeAt(0))
          throw new Error(
            "captureBitStringValue only supported for zero unused bits"
          );
        r[t.captureBitStringValue] = e.bitStringContents.slice(1);
      }
  } else if (o) {
    o.push(
      "[" +
        t.name +
        '] Expected constructed "' +
        t.constructed +
        '", got "' +
        e.constructed +
        '"'
    );
  }
  return s;
};
var a = /[^\\u0000-\\u00ff]/;
i.prettyPrint = function (e, t, r) {
  var o = "";
  r = r || 2;
  if ((t = t || 0) > 0) {
    o += "\n";
  }
  for (s = "", c = 0, undefined; c < t * r; ++c) {
    var s;
    var c;
    s += " ";
  }
  switch (((o += s + "Tag: "), e.tagClass)) {
    case i.Class.UNIVERSAL:
      o += "Universal:";
      break;
    case i.Class.APPLICATION:
      o += "Application:";
      break;
    case i.Class.CONTEXT_SPECIFIC:
      o += "Context-Specific:";
      break;
    case i.Class.PRIVATE:
      o += "Private:";
  }
  if (e.tagClass === i.Class.UNIVERSAL)
    switch (((o += e.type), e.type)) {
      case i.Type.NONE:
        o += " (None)";
        break;
      case i.Type.BOOLEAN:
        o += " (Boolean)";
        break;
      case i.Type.INTEGER:
        o += " (Integer)";
        break;
      case i.Type.BITSTRING:
        o += " (Bit string)";
        break;
      case i.Type.OCTETSTRING:
        o += " (Octet string)";
        break;
      case i.Type.NULL:
        o += " (Null)";
        break;
      case i.Type.OID:
        o += " (Object Identifier)";
        break;
      case i.Type.ODESC:
        o += " (Object Descriptor)";
        break;
      case i.Type.EXTERNAL:
        o += " (External or Instance of)";
        break;
      case i.Type.REAL:
        o += " (Real)";
        break;
      case i.Type.ENUMERATED:
        o += " (Enumerated)";
        break;
      case i.Type.EMBEDDED:
        o += " (Embedded PDV)";
        break;
      case i.Type.UTF8:
        o += " (UTF8)";
        break;
      case i.Type.ROID:
        o += " (Relative Object Identifier)";
        break;
      case i.Type.SEQUENCE:
        o += " (Sequence)";
        break;
      case i.Type.SET:
        o += " (Set)";
        break;
      case i.Type.PRINTABLESTRING:
        o += " (Printable String)";
        break;
      case i.Type.IA5String:
        o += " (IA5String (ASCII))";
        break;
      case i.Type.UTCTIME:
        o += " (UTC time)";
        break;
      case i.Type.GENERALIZEDTIME:
        o += " (Generalized time)";
        break;
      case i.Type.BMPSTRING:
        o += " (BMP String)";
    }
  else o += e.type;
  o += "\n";
  o += s + "Constructed: " + e.constructed + "\n";
  if (e.composed) {
    var l = 0,
      u = "";
    for (c = 0; c < e.value.length; ++c)
      void 0 !== e.value[c] &&
        ((l += 1),
        (u += i.prettyPrint(e.value[c], t + 1, r)),
        c + 1 < e.value.length && (u += ","));
    o += s + "Sub values: " + l + u;
  } else {
    if (((o += s + "Value: "), e.type === i.Type.OID)) {
      var d = i.derToOid(e.value);
      (o += d),
        n.pki &&
          n.pki.oids &&
          d in n.pki.oids &&
          (o += " (" + n.pki.oids[d] + ") ");
    }
    if (e.type === i.Type.INTEGER)
      try {
        o += i.derToInteger(e.value);
      } catch (t) {
        o += "0x" + n.util.bytesToHex(e.value);
      }
    else if (e.type === i.Type.BITSTRING) {
      if (
        (e.value.length > 1
          ? (o += "0x" + n.util.bytesToHex(e.value.slice(1)))
          : (o += "(none)"),
        e.value.length > 0)
      ) {
        var p = e.value.charCodeAt(0);
        1 == p
          ? (o += " (1 unused bit shown)")
          : p > 1 && (o += " (" + p + " unused bits shown)");
      }
    } else if (e.type === i.Type.OCTETSTRING)
      a.test(e.value) || (o += "(" + e.value + ") "),
        (o += "0x" + n.util.bytesToHex(e.value));
    else if (e.type === i.Type.UTF8)
      try {
        o += n.util.decodeUtf8(e.value);
      } catch (t) {
        if ("URI malformed" !== t.message) throw t;
        o += "0x" + n.util.bytesToHex(e.value) + " (malformed UTF8)";
      }
    else
      e.type === i.Type.PRINTABLESTRING || e.type === i.Type.IA5String
        ? (o += e.value)
        : a.test(e.value)
        ? (o += "0x" + n.util.bytesToHex(e.value))
        : 0 === e.value.length
        ? (o += "[null]")
        : (o += e.value);
  }
  return o;
};