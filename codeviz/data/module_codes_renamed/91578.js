Object.defineProperty(exports, "__esModule", {
  value: true,
});
const M_SchemaRefResolver_maybe = require("SchemaRefResolver");
class i extends Error {
  constructor(e, t, r, i) {
    super(i || `can't resolve reference ${r} from id ${t}`);
    this.missingRef = M_SchemaRefResolver_maybe.resolveUrl(e, t, r);
    this.missingSchema = M_SchemaRefResolver_maybe.normalizeId(
      M_SchemaRefResolver_maybe.getFullPath(e, this.missingRef)
    );
  }
}
exports.default = i;
