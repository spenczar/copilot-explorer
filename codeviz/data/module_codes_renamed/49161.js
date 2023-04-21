function r(e) {
  const t = e.length;
  let r;
  let n = 0;
  let i = 0;
  for (; i < t; ) {
    n++;
    r = e.charCodeAt(i++);
    if (r >= 55296 && r <= 56319 && i < t) {
      r = e.charCodeAt(i);
      if (56320 == (64512 & r)) {
        i++;
      }
    }
  }
  return n;
}
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = r;
r.code = 'require("ajv/dist/runtime/ucs2length").default';
