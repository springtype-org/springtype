export const mergeArrays = (a: any, b: any) => {
  let mergeResult;
  let normalizedA = [];
  let normalizedB = [];
  if (a) {
    normalizedA = Array.isArray(a) ? a : [a];
  }

  if (b) {
    normalizedB = Array.isArray(b) ? b : [b];
  }

  if (normalizedA.length && normalizedB.length) {
    mergeResult = [...normalizedA, ...normalizedB];
  } else {
    mergeResult = normalizedA || normalizedB;
  }
  return mergeResult;
}
