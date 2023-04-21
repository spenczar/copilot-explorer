Object.defineProperty(exports, "__esModule", {
  value: true,
});
const n = require(96696);
class i extends Error {
  constructor(e, t, r, i) {
    super(i || `can't resolve reference ${r} from id ${t}`);
    this.missingRef = n.resolveUrl(e, t, r);
    this.missingSchema = n.normalizeId(n.getFullPath(e, this.missingRef));
  }
}
exports.default = i;