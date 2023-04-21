Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.HeaderContributors = undefined;
exports.HeaderContributors = class {
  constructor() {
    this.contributors = [];
  }
  add(e) {
    this.contributors.push(e);
  }
  contributeHeaders(e) {
    for (const t of this.contributors) t.contributeHeaderValues(e);
  }
  size() {
    return this.contributors.length;
  }
};
