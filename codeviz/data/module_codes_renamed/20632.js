const M_async_hook_jl_maybe = require("async-hook-jl");
if (global._asyncHook) {
  if (global._asyncHook.version !== require("language-marker-constants").i8)
    throw new Error("Conflicting version of async-hook-jl found");
  module.exports = global._asyncHook;
} else {
  require("StackChainManager").filter.attach(function (e, t) {
    return t.filter(function (e) {
      const t = e.getFileName();
      return !(t && t.slice(0, __dirname.length) === __dirname);
    });
  });
  module.exports = global._asyncHook = new M_async_hook_jl_maybe();
}
