Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.isRepetitive = exports.RepetitionFilterMode = undefined;
const r = [
  {
    max_token_sequence_length: 1,
    last_tokens_to_consider: 10,
  },
  {
    max_token_sequence_length: 10,
    last_tokens_to_consider: 30,
  },
  {
    max_token_sequence_length: 20,
    last_tokens_to_consider: 45,
  },
  {
    max_token_sequence_length: 30,
    last_tokens_to_consider: 60,
  },
];
var n;
function i(e) {
  const t = (function (e) {
    const t = Array(e.length).fill(0);
    t[0] = -1;
    let r = -1;
    for (let n = 1; n < e.length; n++) {
      for (; r >= 0 && e[r + 1] !== e[n]; ) r = t[r];
      if (e[r + 1] === e[n]) {
        r++;
      }
      t[n] = r;
    }
    return t;
  })(e);
  for (const n of r)
    if (
      !(e.length < n.last_tokens_to_consider) &&
      n.last_tokens_to_consider - 1 - t[n.last_tokens_to_consider - 1] <=
        n.max_token_sequence_length
    )
      return true;
  return false;
}
!(function (e) {
  e.CLIENT = "client";
  e.PROXY = "proxy";
  e.BOTH = "both";
})((n = exports.RepetitionFilterMode || (exports.RepetitionFilterMode = {})));
exports.isRepetitive = function (e, t = n.CLIENT) {
  if (t === n.PROXY) return false;
  const r = e.slice();
  r.reverse();
  return i(r) || i(r.filter((e) => e.trim().length > 0));
};
