import { TYPE_UNDEFINED } from "./type-undefined";

// Resolves a path deep in an object
// e.g. path: Path such as: "module_a.foo"
// e.g. object data like: { "module_a": { "foo": "Foo!"} }
// returns "Foo!"
export const resolvePathInObject = (path: string | Array<string>, object: any, separator: string = '.') => {
  let splits: Array<string>;

  if (Array.isArray(path)) {
    splits = path;
  } else {
    splits = path.split(separator);
  }

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
