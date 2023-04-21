Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.FixedLanguageDetection = exports.TestLanguageDetection = undefined;
const n = require("assert");
const i = require(20190);
class TestLanguageDetection extends i.LanguageDetection {
  constructor() {
    super(...arguments);
    this.documents = new Map();
  }
  async detectLanguage(e) {
    const t = e.uri.toString();
    let r = this.documents.get(t);
    if (r) {
      r = new i.Language(e.languageId);
      this.documents.set(t, r);
    }
    return r;
  }
  assertLanguageHasBeenDetected(e, t) {
    const r = this.documents.get(e.toString());
    n.ok(r, `No language detected for ${e}`);
    n.deepStrictEqual(
      r.languageId,
      t,
      `Expected language ${t} but got ${r.languageId}`
    );
  }
}
exports.TestLanguageDetection = TestLanguageDetection;
class FixedLanguageDetection extends i.LanguageDetection {
  constructor(e) {
    super();
    this.language = e;
  }
  async detectLanguage(e) {
    return new i.Language(this.language);
  }
}
exports.FixedLanguageDetection = FixedLanguageDetection;