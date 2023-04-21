if (global._stackChain) {
  if (global._stackChain.version !== require("version-constants").i8)
    throw new Error("Conflicting version of stack-chain found");
  module.exports = global._stackChain;
} else
  module.exports = global._stackChain = require("StackTraceModifierManager");
