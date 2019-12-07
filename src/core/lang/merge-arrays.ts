export const mergeArrays = (a: any, b: any) => {
  let normalizedA = [];
  let normalizedB = [];
  if (a) {
    normalizedA = Array.isArray(a) ? a : [a];
  }
  if (b) {
    normalizedB = Array.isArray(b) ? b : [b];
  }
  return [...normalizedA, ...normalizedB];
};
