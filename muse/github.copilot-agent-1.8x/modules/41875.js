module.exports = (e, t) => {
  t = t || process.argv;
  const r = e.startsWith("-") ? "" : 1 === e.length ? "-" : "--";
  const n = t.indexOf(r + e);
  const i = t.indexOf("--");
  return -1 !== n && (-1 === i || n < i);
};