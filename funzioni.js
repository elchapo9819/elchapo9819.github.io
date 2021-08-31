
export function idOf(i) {
  return (
    (i >= 26 ? idOf(((i / 26) >> 0) - 1) : "") +
    "abcdefghijklmnopqrstuvwxyz"[i % 26 >> 0]
  );
}

export function convertLetterToNumber(str) {
  str = str.toUpperCase();
  let out = 0,
    len = str.length;
  for (var pos = 0; pos < len; pos++) {
    out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
  }
  return out;
}