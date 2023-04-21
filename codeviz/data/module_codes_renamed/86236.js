Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.CodeGen =
  exports.Name =
  exports.nil =
  exports.stringify =
  exports.str =
  exports._ =
  exports.KeywordCxt =
    undefined;
const M_schema_validation_utils_maybe = require("schema-validation-utils");
const M_LanguageVocabularyManager_maybe = require("LanguageVocabularyManager");
const M_DiscriminatorManager_maybe = require("DiscriminatorManager");
const M_JSON_Schema_Meta_Schema_maybe = require("JSON-Schema-Meta-Schema");
const a = ["/properties"];
const c = "http://json-schema.org/draft-07/schema";
class l extends M_schema_validation_utils_maybe.default {
  _addVocabularies() {
    super._addVocabularies();
    M_LanguageVocabularyManager_maybe.default.forEach((e) =>
      this.addVocabulary(e)
    );
    if (this.opts.discriminator) {
      this.addKeyword(M_DiscriminatorManager_maybe.default);
    }
  }
  _addDefaultMetaSchema() {
    super._addDefaultMetaSchema();
    if (!this.opts.meta) return;
    const e = this.opts.$data
      ? this.$dataMetaSchema(M_JSON_Schema_Meta_Schema_maybe, a)
      : M_JSON_Schema_Meta_Schema_maybe;
    this.addMetaSchema(e, c, false);
    this.refs["http://json-schema.org/schema"] = c;
  }
  defaultMeta() {
    return (this.opts.defaultMeta =
      super.defaultMeta() || (this.getSchema(c) ? c : undefined));
  }
}
module.exports = exports = l;
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = l;
var M_schema_validation_utils_maybe = require("schema-validation-utils");
exports.KeywordCxt = M_schema_validation_utils_maybe.KeywordCxt;
var M_LanguageMarkerConstants_maybe = require("LanguageMarkerConstants");
exports._ = M_LanguageMarkerConstants_maybe._;
exports.str = M_LanguageMarkerConstants_maybe.str;
exports.stringify = M_LanguageMarkerConstants_maybe.stringify;
exports.nil = M_LanguageMarkerConstants_maybe.nil;
exports.Name = M_LanguageMarkerConstants_maybe.Name;
exports.CodeGen = M_LanguageMarkerConstants_maybe.CodeGen;
