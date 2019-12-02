export const mergeObjects = (a: any, b: any) => {
  let mergeResult;
  if (a && b) {
    mergeResult = { ...a, ...b };
  } else {
    mergeResult = a || b;
  }
  return mergeResult;
}
