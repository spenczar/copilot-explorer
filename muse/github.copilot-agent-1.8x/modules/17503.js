Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.Priorities =
  exports.PromptWishlist =
  exports.PromptElementRanges =
  exports.PromptChoices =
  exports.PromptBackground =
  exports.PromptElementKind =
    undefined;
const n = require(28684);
var i;
!(function (e) {
  e.BeforeCursor = "BeforeCursor";
  e.AfterCursor = "AfterCursor";
  e.SimilarFile = "SimilarFile";
  e.ImportedFile = "ImportedFile";
  e.LanguageMarker = "LanguageMarker";
  e.PathMarker = "PathMarker";
})((i = exports.PromptElementKind || (exports.PromptElementKind = {})));
class PromptBackground {
  constructor() {
    this.used = new Map();
    this.unused = new Map();
  }
  markUsed(e) {
    if (this.IsNeighboringTab(e)) {
      this.used.set(e.id, this.convert(e));
    }
  }
  undoMarkUsed(e) {
    if (this.IsNeighboringTab(e)) {
      this.used.delete(e.id);
    }
  }
  markUnused(e) {
    if (this.IsNeighboringTab(e)) {
      this.unused.set(e.id, this.convert(e));
    }
  }
  convert(e) {
    return {
      score: e.score.toFixed(4),
      length: e.text.length,
    };
  }
  IsNeighboringTab(e) {
    return e.kind == i.SimilarFile;
  }
}
exports.PromptBackground = PromptBackground;
class PromptChoices {
  constructor() {
    this.used = new Map();
    this.unused = new Map();
  }
  markUsed(e) {
    this.used.set(e.kind, (this.used.get(e.kind) || 0) + e.tokens);
  }
  undoMarkUsed(e) {
    this.used.set(e.kind, (this.used.get(e.kind) || 0) - e.tokens);
  }
  markUnused(e) {
    this.unused.set(e.kind, (this.used.get(e.kind) || 0) + e.tokens);
  }
}
exports.PromptChoices = PromptChoices;
class PromptElementRanges {
  constructor(e) {
    this.ranges = new Array();
    let t;
    let r = 0;
    for (const { element: n } of e)
      if (0 !== n.text.length) {
        if (t === i.BeforeCursor && n.kind === i.BeforeCursor) {
          this.ranges[this.ranges.length - 1].end += n.text.length;
        } else {
          this.ranges.push({
            kind: n.kind,
            start: r,
            end: r + n.text.length,
          });
        }
        t = n.kind;
        r += n.text.length;
      }
  }
}
exports.PromptElementRanges = PromptElementRanges;
exports.PromptWishlist = class {
  constructor(e, t) {
    this.tokenizer = e;
    this.content = [];
    this.tokenizer = e;
    this.lineEndingOption = t;
  }
  getContent() {
    return [...this.content];
  }
  convertLineEndings(e) {
    if (this.lineEndingOption === n.LineEndingOptions.ConvertToUnix) {
      e = e.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    }
    return e;
  }
  append(e, t, r, n = this.tokenizer.tokenLength(e), i = NaN) {
    e = this.convertLineEndings(e);
    const o = this.content.length;
    this.content.push({
      id: o,
      text: e,
      kind: t,
      priority: r,
      tokens: n,
      requires: [],
      excludes: [],
      score: i,
    });
    return o;
  }
  appendLineForLine(e, t, r) {
    const n = (e = this.convertLineEndings(e)).split("\n");
    for (let e = 0; e < n.length - 1; e++) n[e] += "\n";
    const i = [];
    n.forEach((e, t) => {
      if ("\n" === e && i.length > 0 && !i[i.length - 1].endsWith("\n\n")) {
        i[i.length - 1] += "\n";
      } else {
        i.push(e);
      }
    });
    const o = [];
    i.forEach((e, n) => {
      if ("" !== e) {
        o.push(this.append(e, t, r));
        if (n > 0) {
          this.content[this.content.length - 2].requires = [
            this.content[this.content.length - 1],
          ];
        }
      }
    });
    return o;
  }
  require(e, t) {
    const r = this.content.find((t) => t.id === e);
    const n = this.content.find((e) => e.id === t);
    if (r && n) {
      r.requires.push(n);
    }
  }
  exclude(e, t) {
    const r = this.content.find((t) => t.id === e);
    const n = this.content.find((e) => e.id === t);
    if (r && n) {
      r.excludes.push(n);
    }
  }
  fulfill(e) {
    const t = new PromptChoices();
    const r = new PromptBackground();
    const n = this.content.map((e, t) => ({
      element: e,
      index: t,
    }));
    n.sort((e, t) =>
      e.element.priority === t.element.priority
        ? t.index - e.index
        : t.element.priority - e.element.priority
    );
    const i = new Set();
    const c = new Set();
    let l;
    const u = [];
    let d = e;
    n.forEach((e) => {
      const n = e.element;
      const o = e.index;
      if (
        d >= 0 &&
        (d > 0 || undefined === l) &&
        n.requires.every((e) => i.has(e.id)) &&
        !c.has(n.id)
      ) {
        let s = n.tokens;
        const a = (function (e, t) {
          let r;
          let n = 1 / 0;
          for (const i of e)
            if (i.index > t && i.index < n) {
              r = i;
              n = i.index;
            }
          return r;
        })(u, o)?.element;
        if (n.text.endsWith("\n\n") && a && !a.text.match(/^\s/)) {
          s++;
        }
        if (d >= s) {
          d -= s;
          i.add(n.id);
          n.excludes.forEach((e) => c.add(e.id));
          t.markUsed(n);
          r.markUsed(n);
          u.push(e);
        } else {
          l = l ?? e;
        }
      } else {
        t.markUnused(n);
        r.markUnused(n);
      }
    });
    u.sort((e, t) => e.index - t.index);
    let p = u.reduce((e, t) => e + t.element.text, "");
    let h = this.tokenizer.tokenLength(p);
    for (; h > e; ) {
      u.sort((e, t) =>
        t.element.priority === e.element.priority
          ? t.index - e.index
          : t.element.priority - e.element.priority
      );
      const e = u.pop();
      if (e) {
        t.undoMarkUsed(e.element);
        t.markUnused(e.element);
        r.undoMarkUsed(e.element);
        r.markUnused(e.element);
        l = undefined;
      }
      u.sort((e, t) => e.index - t.index);
      p = u.reduce((e, t) => e + t.element.text, "");
      h = this.tokenizer.tokenLength(p);
    }
    const f = [...u];
    if (undefined !== l) {
      f.push(l);
      f.sort((e, t) => e.index - t.index);
      const n = f.reduce((e, t) => e + t.element.text, "");
      const i = this.tokenizer.tokenLength(n);
      if (i <= e) {
        t.markUsed(l.element);
        r.markUsed(l.element);
        const e = new PromptElementRanges(f);
        return {
          prefix: n,
          suffix: "",
          prefixLength: i,
          suffixLength: 0,
          promptChoices: t,
          promptBackground: r,
          promptElementRanges: e,
        };
      }
      t.markUnused(l.element);
      r.markUnused(l.element);
    }
    const g = new PromptElementRanges(u);
    return {
      prefix: p,
      suffix: "",
      prefixLength: h,
      suffixLength: 0,
      promptChoices: t,
      promptBackground: r,
      promptElementRanges: g,
    };
  }
};
class Priorities {
  constructor() {
    this.registeredPriorities = [0, 1];
  }
  register(e) {
    if (e > Priorities.TOP || e < Priorities.BOTTOM)
      throw new Error("Priority must be between 0 and 1");
    this.registeredPriorities.push(e);
    return e;
  }
  justAbove(...e) {
    const t = Math.max(...e);
    const r = Math.min(...this.registeredPriorities.filter((e) => e > t));
    return this.register((r + t) / 2);
  }
  justBelow(...e) {
    const t = Math.min(...e);
    const r = Math.max(...this.registeredPriorities.filter((e) => e < t));
    return this.register((r + t) / 2);
  }
  between(e, t) {
    if (
      this.registeredPriorities.some((r) => r > e && r < t) ||
      !this.registeredPriorities.includes(e) ||
      !this.registeredPriorities.includes(t)
    )
      throw new Error("Priorities must be adjacent in the list of priorities");
    return this.register((e + t) / 2);
  }
}
exports.Priorities = Priorities;
Priorities.TOP = 1;
Priorities.BOTTOM = 0;