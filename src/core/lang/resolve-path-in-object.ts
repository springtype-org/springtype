import { TYPE_UNDEFINED } from "./type-undefined";

// Resolves a path deep in an object
// e.g. path: Path such as: "module_a.foo"
// e.g. object data like: { "module_a": { "foo": "Foo!"} }
// returns "Foo!"
export const resolvePathInObject = (path: string, object: any) => {
  const splits = path.split(".");
  let value;
  const walk = (subTree: any, i: number): any => {
    if (!subTree) return;
    value = subTree[splits[i]];
    if (typeof value !== TYPE_UNDEFINED && i == splits.length - 1) {
      return value;
    } else {
      return walk(value, ++i);
    }
  };
  return walk(object, 0);
}
