Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.TestingOptions = undefined;
const M_TypeBox_maybe = require("TypeBox");
exports.TestingOptions = M_TypeBox_maybe.Type.Object({
  testingCtx: M_TypeBox_maybe.Type.Optional(M_TypeBox_maybe.Type.Number()),
});
