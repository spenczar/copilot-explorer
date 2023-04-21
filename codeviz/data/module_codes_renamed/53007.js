Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.CopilotCompletionCache = undefined;
const M_LRUCacheManager_maybe = require("LRUCacheManager");
class CopilotCompletionCache extends M_LRUCacheManager_maybe.LRUCache {
  constructor(e = 100) {
    super(e);
  }
}
exports.CopilotCompletionCache = CopilotCompletionCache;
