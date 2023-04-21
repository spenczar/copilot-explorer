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
exports.LSPErrorCodes = exports.createProtocolConnection = undefined;
i(require("MessageTransportUtils"), exports);
i(require("LanguageMarkerConstants"), exports);
i(require("ProtocolTypeConstants"), exports);
i(require("LanguageRequestConstants"), exports);
var o;
var M_MessageConnectionManager_maybe = require("MessageConnectionManager");
exports.createProtocolConnection =
  M_MessageConnectionManager_maybe.createProtocolConnection;
(o =
  exports.LSPErrorCodes ||
  (exports.LSPErrorCodes = {})).lspReservedErrorRangeStart = -32899;
o.ContentModified = -32801;
o.RequestCancelled = -32800;
o.lspReservedErrorRangeEnd = -32800;
