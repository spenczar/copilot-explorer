Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.SemanticTokensBuilder = exports.SemanticTokensFeature = undefined;
const M_MessageConnectionManager_maybe = require("MessageConnectionManager");
exports.SemanticTokensFeature = (e) =>
  class extends e {
    get semanticTokens() {
      return {
        on: (e) => {
          const t = M_MessageConnectionManager_maybe.SemanticTokensRequest.type;
          this.connection.onRequest(t, (r, n) =>
            e(
              r,
              n,
              this.attachWorkDoneProgress(r),
              this.attachPartialResultProgress(t, r)
            )
          );
        },
        onDelta: (e) => {
          const t =
            M_MessageConnectionManager_maybe.SemanticTokensDeltaRequest.type;
          this.connection.onRequest(t, (r, n) =>
            e(
              r,
              n,
              this.attachWorkDoneProgress(r),
              this.attachPartialResultProgress(t, r)
            )
          );
        },
        onRange: (e) => {
          const t =
            M_MessageConnectionManager_maybe.SemanticTokensRangeRequest.type;
          this.connection.onRequest(t, (r, n) =>
            e(
              r,
              n,
              this.attachWorkDoneProgress(r),
              this.attachPartialResultProgress(t, r)
            )
          );
        },
      };
    }
  };
exports.SemanticTokensBuilder = class {
  constructor() {
    this._prevData = undefined;
    this.initialize();
  }
  initialize() {
    this._id = Date.now();
    this._prevLine = 0;
    this._prevChar = 0;
    this._data = [];
    this._dataLen = 0;
  }
  push(e, t, r, n, i) {
    let o = e;
    let s = t;
    if (this._dataLen > 0) {
      o -= this._prevLine;
      if (0 === o) {
        s -= this._prevChar;
      }
    }
    this._data[this._dataLen++] = o;
    this._data[this._dataLen++] = s;
    this._data[this._dataLen++] = r;
    this._data[this._dataLen++] = n;
    this._data[this._dataLen++] = i;
    this._prevLine = e;
    this._prevChar = t;
  }
  get id() {
    return this._id.toString();
  }
  previousResult(e) {
    if (this.id === e) {
      this._prevData = this._data;
    }
    this.initialize();
  }
  build() {
    this._prevData = undefined;
    return {
      resultId: this.id,
      data: this._data,
    };
  }
  canBuildEdits() {
    return undefined !== this._prevData;
  }
  buildEdits() {
    if (undefined !== this._prevData) {
      const e = this._prevData.length;
      const t = this._data.length;
      let r = 0;
      for (; r < t && r < e && this._prevData[r] === this._data[r]; ) r++;
      if (r < t && r < e) {
        let n = 0;
        for (
          ;
          n < t && n < e && this._prevData[e - 1 - n] === this._data[t - 1 - n];

        )
          n++;
        const i = this._data.slice(r, t - n);
        return {
          resultId: this.id,
          edits: [
            {
              start: r,
              deleteCount: e - n - r,
              data: i,
            },
          ],
        };
      }
      return r < t
        ? {
            resultId: this.id,
            edits: [
              {
                start: r,
                deleteCount: 0,
                data: this._data.slice(r),
              },
            ],
          }
        : r < e
        ? {
            resultId: this.id,
            edits: [
              {
                start: r,
                deleteCount: e - r,
              },
            ],
          }
        : {
            resultId: this.id,
            edits: [],
          };
    }
    return this.build();
  }
};
