var n =
  (this && this.__createBinding) ||
  (Object.create
    ? function (e, t, r, n) {
        if (undefined === n) {
          n = r;
        }
        var i = Object.getOwnPropertyDescriptor(t, r);
        if (i && !("get" in i ? !t.__esModule : i.writable || i.configurable)) {
          i = {
            enumerable: true,
            get: function () {
              return t[r];
            },
          };
        }
        Object.defineProperty(e, n, i);
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
const o = require(77651);
const s = require(53105);
const a = require(12563);
a.registerLanguageSpecificParser("markdown", s.processMarkdown);
a.registerLanguageSpecificParser("java", o.processJava);
i(require(34990), exports);
i(require(40842), exports);
i(require(72890), exports);
i(require(12563), exports);
i(require(64505), exports);