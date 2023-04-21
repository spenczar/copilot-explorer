Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_NumberComparisonOperators_maybe = require("NumberComparisonOperators");
const M_MultipleOfValidator_maybe = require("MultipleOfValidator");
const M_StringLengthValidationModule_maybe = require("StringLengthValidationModule");
const M_PatternValidatorModule_maybe = require("PatternValidatorModule");
const M_ObjectPropertyLimitValidator_maybe = require("ObjectPropertyLimitValidator");
const M_required_property_validator_maybe = require("required-property-validator");
const M_ArrayItemLimitValidator_maybe = require("ArrayItemLimitValidator");
const M_UniqueItemsChecker_maybe = require("UniqueItemsChecker");
const M_language_constant_validator_maybe = require("language-constant-validator");
const M_EnumValidatorModule_maybe = require("EnumValidatorModule");
const h = [
  M_NumberComparisonOperators_maybe.default,
  M_MultipleOfValidator_maybe.default,
  M_StringLengthValidationModule_maybe.default,
  M_PatternValidatorModule_maybe.default,
  M_ObjectPropertyLimitValidator_maybe.default,
  M_required_property_validator_maybe.default,
  M_ArrayItemLimitValidator_maybe.default,
  M_UniqueItemsChecker_maybe.default,
  {
    keyword: "type",
    schemaType: ["string", "array"],
  },
  {
    keyword: "nullable",
    schemaType: "boolean",
  },
  M_language_constant_validator_maybe.default,
  M_EnumValidatorModule_maybe.default,
];
exports.default = h;
