Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getLanguageDetection =
  exports.primeLanguageDetectionCache =
  exports.LanguageDetection =
  exports.Language =
    undefined;
const M_LRUCacheManager_maybe = require("LRUCacheManager");
const M_language_extension_constants_maybe = require("language-extension-constants");
const M_path = require("path");
class Language {
  constructor(e) {
    this.languageId = e;
  }
}
exports.Language = Language;
class LanguageDetection {}
exports.LanguageDetection = LanguageDetection;
exports.primeLanguageDetectionCache = function (e, t) {
  e.get(LanguageDetection).detectLanguage(t);
};
exports.getLanguageDetection = function () {
  return new c(new l());
};
class c extends LanguageDetection {
  constructor(e) {
    super();
    this.delegate = e;
    this.cache = new M_LRUCacheManager_maybe.LRUCache(100);
  }
  async detectLanguage(e) {
    const t = M_path.basename(e.fileName);
    let r = this.cache.get(t);
    if (r) {
      r = await this.delegate.detectLanguage(e);
      this.cache.put(t, r);
    }
    return r;
  }
}
class l extends LanguageDetection {
  async detectLanguage(e) {
    const t = M_path.basename(e.fileName);
    const r = M_path.extname(t);
    return new Language(this.detectLanguageId(t, r));
  }
  detectLanguageId(e, t) {
    const r = this.extensionWithoutTemplateLanguage(e, t.toLowerCase());
    const n = [];
    for (const t in M_language_extension_constants_maybe.knownLanguages) {
      const o = M_language_extension_constants_maybe.knownLanguages[t];
      if (o.filenames && o.filenames.includes(e)) return t;
      if (o.extensions.includes(r)) {
        n.push(t);
      }
    }
    return n.length >= 1 ? n[0] : "unknown";
  }
  extensionWithoutTemplateLanguage(e, t) {
    if (
      M_language_extension_constants_maybe.knownTemplateLanguageExtensions.includes(
        t
      )
    ) {
      const t = e.substring(0, e.lastIndexOf("."));
      const r = M_path.extname(t);
      if (
        r.length > 0 &&
        M_language_extension_constants_maybe.knownFileExtensions.includes(r)
      )
        return r;
    }
    return t;
  }
}
