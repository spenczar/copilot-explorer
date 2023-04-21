Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: true,
  code: require("ValidationUtils").validateUnion,
  error: {
    message: "must match a schema in anyOf",
  },
};
exports.default = n;
