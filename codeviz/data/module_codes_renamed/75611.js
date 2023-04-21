Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.Context = undefined;
exports.Context = class {
  constructor(e) {
    this.baseContext = e;
    this.constructionStack = [];
    this.instances = new Map();
    const t = new Error().stack?.split("\n");
    if (t) {
      this.constructionStack.push(...t.slice(1));
    }
  }
  get(e) {
    const t = this.tryGet(e);
    if (t) return t;
    throw new Error(`No instance of ${e.name} has been registered.\n${this}`);
  }
  tryGet(e) {
    return (
      this.instances.get(e) ||
      (this.baseContext ? this.baseContext.tryGet(e) : undefined)
    );
  }
  set(e, t) {
    if (this.tryGet(e))
      throw new Error(
        `An instance of ${e.name} has already been registered. Use forceSet() if you're sure it's a good idea.`
      );
    this.instances.set(e, t);
  }
  forceSet(e, t) {
    this.instances.set(e, t);
  }
  toString() {
    let e = "    Context created at:\n";
    for (const t of this.constructionStack || []) e += `    ${t}\n`;
    e += this.baseContext?.toString() ?? "";
    return e;
  }
  get debug() {
    const e = {};
    for (const [t, r] of this.instances) e[t.name] = r;
    return e;
  }
};
