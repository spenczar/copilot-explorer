Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_language_marker_module_maybe = require("language-marker-module");
const M_SchemaKeywordsModule_maybe = require("SchemaKeywordsModule");
const M_ModuleManager_maybe = require("ModuleManager");
const M_language_marker_constants_maybe = require("language-marker-constants");
const M_VocabularyConstants_maybe = require("VocabularyConstants");
const c = [
  M_language_marker_module_maybe.default,
  M_SchemaKeywordsModule_maybe.default,
  M_ModuleManager_maybe.default(),
  M_language_marker_constants_maybe.default,
  M_VocabularyConstants_maybe.metadataVocabulary,
  M_VocabularyConstants_maybe.contentVocabulary,
];
exports.default = c;
