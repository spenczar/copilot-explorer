Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(98634);
const i = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => n.validateTuple(e, "items"),
};
exports.default = i;