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
var i = require("os");
var o = require(85512);
var s = require(85315);
var a = require(77649);
var c = require(12010);
var l = a.w3cTraceId();
var u = (function () {
  function e() {}
  e.createQuickPulseEnvelope = function (e, t, r, n) {
    var o = (i && "function" == typeof i.hostname && i.hostname()) || "Unknown";
    var s =
      (n.tags &&
        n.keys &&
        n.keys.cloudRoleInstance &&
        n.tags[n.keys.cloudRoleInstance]) ||
      o;
    return {
      Documents: t.length > 0 ? t : null,
      InstrumentationKey: r.instrumentationKey || "",
      Metrics: e.length > 0 ? e : null,
      InvariantVersion: 1,
      Timestamp: "/Date(" + Date.now() + ")/",
      Version: n.tags[n.keys.internalSdkVersion],
      StreamId: l,
      MachineName: o,
      Instance: s,
    };
  };
  e.createQuickPulseMetric = function (e) {
    return {
      Name: e.name,
      Value: e.value,
      Weight: e.count || 1,
    };
  };
  e.telemetryEnvelopeToQuickPulseDocument = function (t) {
    switch (t.data.baseType) {
      case o.TelemetryTypeString.Event:
        return e.createQuickPulseEventDocument(t);
      case o.TelemetryTypeString.Exception:
        return e.createQuickPulseExceptionDocument(t);
      case o.TelemetryTypeString.Trace:
        return e.createQuickPulseTraceDocument(t);
      case o.TelemetryTypeString.Dependency:
        return e.createQuickPulseDependencyDocument(t);
      case o.TelemetryTypeString.Request:
        return e.createQuickPulseRequestDocument(t);
    }
    return null;
  };
  e.createQuickPulseEventDocument = function (t) {
    var r = e.createQuickPulseDocument(t);
    var i = t.data.baseData.name;
    return n({}, r, {
      Name: i,
    });
  };
  e.createQuickPulseTraceDocument = function (t) {
    var r = e.createQuickPulseDocument(t);
    var i = t.data.baseData.severityLevel || 0;
    return n({}, r, {
      Message: t.data.baseData.message,
      SeverityLevel: o.SeverityLevel[i],
    });
  };
  e.createQuickPulseExceptionDocument = function (t) {
    var r = e.createQuickPulseDocument(t);
    var i = t.data.baseData.exceptions;
    var o = "";
    var s = "";
    var a = "";
    if (i && i.length > 0) {
      if (i[0].parsedStack && i[0].parsedStack.length > 0) {
        i[0].parsedStack.forEach(function (e) {
          o += e.assembly + "\n";
        });
      } else {
        if (i[0].stack && i[0].stack.length > 0) {
          o = i[0].stack;
        }
      }
      s = i[0].message;
      a = i[0].typeName;
    }
    return n({}, r, {
      Exception: o,
      ExceptionMessage: s,
      ExceptionType: a,
    });
  };
  e.createQuickPulseRequestDocument = function (t) {
    var r = e.createQuickPulseDocument(t);
    var i = t.data.baseData;
    return n({}, r, {
      Name: i.name,
      Success: i.success,
      Duration: i.duration,
      ResponseCode: i.responseCode,
      OperationName: i.name,
    });
  };
  e.createQuickPulseDependencyDocument = function (t) {
    var r = e.createQuickPulseDocument(t);
    var i = t.data.baseData;
    return n({}, r, {
      Name: i.name,
      Target: i.target,
      Success: i.success,
      Duration: i.duration,
      ResultCode: i.resultCode,
      CommandName: i.data,
      OperationName: r.OperationId,
      DependencyTypeName: i.type,
    });
  };
  e.createQuickPulseDocument = function (t) {
    var r;
    var n;
    if (t.data.baseType) {
      n = s.TelemetryTypeStringToQuickPulseType[t.data.baseType];
      r = s.TelemetryTypeStringToQuickPulseDocumentType[t.data.baseType];
    } else {
      c.warn(
        "Document type invalid; not sending live metric document",
        t.data.baseType
      );
    }
    return {
      DocumentType: r,
      __type: n,
      OperationId: t.tags[e.keys.operationId],
      Version: "1.0",
      Properties: e.aggregateProperties(t),
    };
  };
  e.aggregateProperties = function (e) {
    var t = [];
    var r = e.data.baseData.measurements || {};
    for (var n in r)
      if (r.hasOwnProperty(n)) {
        var i = {
          key: n,
          value: r[n],
        };
        t.push(i);
      }
    var o = e.data.baseData.properties || {};
    for (var n in o)
      if (o.hasOwnProperty(n)) {
        i = {
          key: n,
          value: o[n],
        };
        t.push(i);
      }
    return t;
  };
  e.keys = new o.ContextTagKeys();
  return e;
})();
module.exports = u;