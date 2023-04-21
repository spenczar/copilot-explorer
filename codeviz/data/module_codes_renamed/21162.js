Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_TupleValidator_maybe = require("TupleValidator");
const i = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => M_TupleValidator_maybe.validateTuple(e, "items"),
};
exports.default = i;
