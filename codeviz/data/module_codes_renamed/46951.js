Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_additional_items_validator_maybe = require("additional-items-validator");
const M_tuple_validation_module_maybe = require("tuple-validation-module");
const M_TupleValidator_maybe = require("TupleValidator");
const M_array_validation_module_maybe = require("array-validation-module");
const M_contains_validator_maybe = require("contains-validator");
const M_DependencyValidator_maybe = require("DependencyValidator");
const M_PropertyNameValidator_maybe = require("PropertyNameValidator");
const M_AdditionalPropertyManager_maybe = require("AdditionalPropertyManager");
const M_property_validator_module_maybe = require("property-validator-module");
const M_PatternPropertiesManager_maybe = require("PatternPropertiesManager");
const M_NotValidationModule_maybe = require("NotValidationModule");
const M_anyOf_validation_module_maybe = require("anyOf-validation-module");
const M_oneOf_validation_manager_maybe = require("oneOf-validation-manager");
const M_allOfSchemaHandler_maybe = require("allOfSchemaHandler");
const M_if_clause_validator_maybe = require("if-clause-validator");
const M_language_marker_constants_maybe = require("language-marker-constants");
exports.default = function (e = false) {
  const t = [
    M_NotValidationModule_maybe.default,
    M_anyOf_validation_module_maybe.default,
    M_oneOf_validation_manager_maybe.default,
    M_allOfSchemaHandler_maybe.default,
    M_if_clause_validator_maybe.default,
    M_language_marker_constants_maybe.default,
    M_PropertyNameValidator_maybe.default,
    M_AdditionalPropertyManager_maybe.default,
    M_DependencyValidator_maybe.default,
    M_property_validator_module_maybe.default,
    M_PatternPropertiesManager_maybe.default,
  ];
  if (e) {
    t.push(
      M_tuple_validation_module_maybe.default,
      M_array_validation_module_maybe.default
    );
  } else {
    t.push(
      M_additional_items_validator_maybe.default,
      M_TupleValidator_maybe.default
    );
  }
  t.push(M_contains_validator_maybe.default);
  return t;
};
