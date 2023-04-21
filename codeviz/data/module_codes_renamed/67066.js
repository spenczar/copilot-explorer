Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.FixedLanguageDetection = exports.TestLanguageDetection = undefined;
const M_assert = require("assert");
const M_LanguageDetectionManager_maybe = require("LanguageDetectionManager");
class TestLanguageDetection extends M_LanguageDetectionManager_maybe.LanguageDetection {
  constructor() {
    super(...arguments);
    this.documents = new Map();
  }
  async detectLanguage(e) {
    const t = e.uri.toString();
    let r = this.documents.get(t);
    if (r) {
      r = new M_LanguageDetectionManager_maybe.Language(e.languageId);
      this.documents.set(t, r);
    }
    return r;
  }
  assertLanguageHasBeenDetected(e, t) {
    const r = this.documents.get(e.toString());
    M_assert.ok(r, `No language detected for ${e}`);
    M_assert.deepStrictEqual(
      r.languageId,
      t,
      `Expected language ${t} but got ${r.languageId}`
    );
  }
}
exports.TestLanguageDetection = TestLanguageDetection;
class FixedLanguageDetection extends M_LanguageDetectionManager_maybe.LanguageDetection {
  constructor(e) {
    super();
    this.language = e;
  }
  async detectLanguage(e) {
    return new M_LanguageDetectionManager_maybe.Language(this.language);
  }
}
exports.FixedLanguageDetection = FixedLanguageDetection;
