Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.NeighborSource =
  exports.CursorHistoryStrategy =
  exports.NeighborFileType =
    undefined;
const M_Path_Parsing_Utils_maybe = require("Path-Parsing-Utils");
const M_CursorTrackerManager_maybe = require("CursorTrackerManager");
var o;
var s;
!(function (e) {
  e.Open = "Open";
  e.Cursor = "Cursor";
})((o = exports.NeighborFileType || (exports.NeighborFileType = {})));
(function (e) {
  e.None = "none";
  e.MostRecent = "mostrecent";
  e.MostCount = "mostcount";
  e.BeforeCurrentFile = "beforecurrentfile";
})((s = exports.CursorHistoryStrategy || (exports.CursorHistoryStrategy = {})));
class NeighborSource {
  constructor(e, t) {
    this.openFileStrategy = e;
    this.cursorHistoryStrategy = t;
  }
  async tryGetTextDocument(e, t) {
    try {
      return await e.getTextDocument(M_Path_Parsing_Utils_maybe.URI.parse(t));
    } catch (e) {
      return;
    }
  }
  async getCursorHistoryFiles(e, t, r, n) {
    const o = [];
    if (n === s.None) return o;
    const c = [...M_CursorTrackerManager_maybe.cursorHistoryStack].reverse();
    if (n === s.MostRecent) {
      let n = 0;
      const i = new Set();
      for (const { uri: s, offset: a } of c) {
        if (i.has(s)) continue;
        const c = await this.tryGetTextDocument(e, s);
        if (
          undefined !== c &&
          !this.fileLengthExceeded(n, c) &&
          "file" === c.uri.scheme &&
          c.fileName !== t &&
          c.languageId === r &&
          (o.push({
            uri: s,
            relativePath: await e.getRelativePath(c),
            languageId: c.languageId,
            source: c.getText(),
            offset: a,
          }),
          i.add(s),
          (n += c.getText().length),
          this.fileCountExceeded(o))
        )
          break;
      }
    } else if (n === s.BeforeCurrentFile) {
      let n = 0;
      let i = null;
      const s = new Set();
      for (const { uri: a, offset: l } of c) {
        const c = await this.tryGetTextDocument(e, a);
        if (
          undefined !== c &&
          !this.fileLengthExceeded(n, c) &&
          "file" === c.uri.scheme &&
          c.languageId === r
        ) {
          if (
            c.fileName !== t &&
            i === t &&
            !s.has(a) &&
            (s.add(a),
            o.push({
              uri: a,
              relativePath: await e.getRelativePath(c),
              languageId: c.languageId,
              source: c.getText(),
              offset: l,
            }),
            (n += c.getText().length),
            this.fileCountExceeded(o))
          )
            break;
          i = c.fileName;
        }
      }
    } else if (n === s.MostCount) {
      let n = null;
      const i = new Map();
      for (const { uri: o, offset: s, timestamp: l } of c) {
        if (null !== n && n - l > NeighborSource.MAX_MOST_RECENT_TIME_RANGE)
          break;
        const c = await this.tryGetTextDocument(e, o);
        if (
          undefined !== c &&
          "file" === c.uri.scheme &&
          c.fileName !== t &&
          c.languageId === r
        ) {
          if (null === n) {
            n = l;
          }
          const e = i.get(o) ?? {
            uri: o,
            offset: s,
            timestamp: l,
            count: 0,
            doc: c,
          };
          e.count += 1;
          i.set(o, e);
        }
      }
      const s = [...i.entries()].sort((e, t) => t[1].count - e[1].count);
      let l = 0;
      for (const [t, r] of s) {
        const n = r.doc;
        const i = r.offset;
        if (
          !this.fileLengthExceeded(l, n) &&
          (o.push({
            uri: t,
            relativePath: await e.getRelativePath(n),
            languageId: n.languageId,
            source: n.getText(),
            offset: i,
          }),
          (l += n.getText().length),
          this.fileCountExceeded(o))
        )
          break;
      }
    }
    return o;
  }
  fileCountExceeded(e) {
    return e.length >= NeighborSource.MAX_NEIGHBOR_FILES;
  }
  fileLengthExceeded(e, t) {
    return (
      e + t.getText().length > NeighborSource.MAX_NEIGHBOR_AGGREGATE_LENGTH
    );
  }
  async getOpenFiles(e, t, r) {
    const n = [];
    const o = M_CursorTrackerManager_maybe.sortByAccessTimes(e.textDocuments);
    let s = 0;
    for (const i of o)
      if (
        !this.fileLengthExceeded(s, i) &&
        ("file" == i.uri.scheme &&
          i.fileName !== t &&
          i.languageId === r &&
          (n.push({
            uri: i.uri.toString(),
            relativePath: await e.getRelativePath(i),
            languageId: i.languageId,
            source: i.getText(),
          }),
          (s += i.getText().length)),
        this.fileCountExceeded(n))
      )
        break;
    return n;
  }
  async getNeighborFiles(e, t, r) {
    const n = await this.getOpenFiles(e, t.fsPath, r);
    if (this.openFileStrategy)
      return {
        docs: n,
        neighborSource: new Map([[o.Open, n.map((e) => e.uri)]]),
      };
    {
      const i = await this.getCursorHistoryFiles(
        e,
        t.fsPath,
        r,
        this.cursorHistoryStrategy
      );
      return {
        docs: i,
        neighborSource: new Map([
          [o.Open, n.map((e) => e.uri)],
          [o.Cursor, i.map((e) => e.uri)],
        ]),
      };
    }
  }
}
exports.NeighborSource = NeighborSource;
NeighborSource.MAX_NEIGHBOR_AGGREGATE_LENGTH = 2e5;
NeighborSource.MAX_NEIGHBOR_FILES = 20;
NeighborSource.MAX_MOST_RECENT_TIME_RANGE = 18e5;
