Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.CopilotCompletionCache = undefined;
const n = require(70140);
class CopilotCompletionCache extends n.LRUCache {
  constructor(e = 100) {
    super(e);
  }
}
exports.CopilotCompletionCache = CopilotCompletionCache;