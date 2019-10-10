import { isPrimitive } from "../lang/is-primitive";
import { st } from "../st/st";
import { IOnDeepChangeHandler } from "./interface/ion-deep-change-handler";

const PATH_SEPARATOR = ".";
const TARGET = Symbol("target");
const UNSUBSCRIBE = Symbol("unsubscribe");

export class ChangeDetector {
  static isBuiltinWithoutMutableMethods = (value: any) => value instanceof RegExp || value instanceof Number;

  static isBuiltinWithMutableMethods = (value: any) => value instanceof Date;

  static concatPath = (path: string, property: any) => {
    if (property && property.toString) {
      if (path) {
        path += PATH_SEPARATOR;
      }
      path += property.toString();
    }
    return path;
  };

  static walkPath = (path: string, callback: Function) => {
    let index;

    while (path) {
      index = path.indexOf(PATH_SEPARATOR);

      if (index === -1) {
        index = path.length;
      }
      callback(path.slice(0, index));
      path = path.slice(index + 1);
    }
  };

  static shallowClone = (value: Array<any> | Object) => {
    if (Array.isArray(value)) {
      return value.slice();
    }
    return Object.assign({}, value);
  };

  static onChange = (object: any, onChange: IOnDeepChangeHandler, options: any = {}) => {
    const proxyTarget = Symbol("ProxyTarget");
    let inApply = false;
    let changed = false;
    let applyPath: any;
    let applyPrevious: any;
    let isUnsubscribed = false;
    const equals = options.equals || Object.is;

    let propCache: WeakMap<any, any> | null = new WeakMap();
    let pathCache: WeakMap<any, any> | null = new WeakMap();
    let proxyCache: WeakMap<any, any> | null = new WeakMap();

    const handler = {
      get(target: object, property: string | number | symbol, receiver: object) {
        if (property === proxyTarget || property === TARGET) {
          return target;
        }

        if (property === UNSUBSCRIBE && pathCache!.get(target) === "") {
          return unsubscribe(target);
        }

        const value = Reflect.get(target, property, receiver);

        if (isPrimitive(value) || ChangeDetector.isBuiltinWithoutMutableMethods(value) || property === "constructor" || options.isShallow === true) {
          return value;
        }

        // preserve invariants
        const descriptor = getOwnPropertyDescriptor(target, property);
        if (descriptor && !descriptor.configurable) {
          if (descriptor.set && !descriptor.get) {
            return undefined;
          }

          if (descriptor.writable === false) {
            return value;
          }
        }

        return buildProxy(value, ChangeDetector.concatPath(pathCache!.get(target), property));
      },

      set(target: any, property: string | number | symbol, value: any, receiver: object) {
        if (value && value[proxyTarget] !== undefined) {
          value = value[proxyTarget];
        }

        const ignore = ignoreChange(property);
        const previous = ignore ? null : Reflect.get(target, property, receiver);
        const result = Reflect.set(target[proxyTarget] || target, property, value);

        if (!ignore && !equals(previous, value)) {
          handleChange(pathCache!.get(target), property, previous, value);
        }

        return result;
      },

      defineProperty(target: any, property: string | number | symbol, descriptor: any) {
        const result = Reflect.defineProperty(target, property, descriptor);

        if (!ignoreChange(property)) {
          invalidateCachedDescriptor(target, property);

          handleChange(pathCache!.get(target), property, undefined, descriptor.value);
        }

        return result;
      },

      deleteProperty(target: any, property: string | symbol) {
        if (!Reflect.has(target, property)) {
          return true;
        }

        const ignore = ignoreChange(property);
        const previous = ignore ? null : Reflect.get(target, property);
        const result = Reflect.deleteProperty(target, property);

        if (!ignore) {
          invalidateCachedDescriptor(target, property);
          handleChange(pathCache!.get(target), property, previous);
        }
        return result;
      },

      apply(target: any, thisArg: any, argumentsList: any) {
        const compare = ChangeDetector.isBuiltinWithMutableMethods(thisArg);

        if (compare) {
          thisArg = thisArg[proxyTarget];
        }

        if (!inApply) {
          inApply = true;

          if (compare) {
            applyPrevious = thisArg.valueOf();
          }

          if (Array.isArray(thisArg) || toString.call(thisArg) === "[object Object]") {
            applyPrevious = ChangeDetector.shallowClone(thisArg[proxyTarget]);
          }

          applyPath = pathCache!.get(target);
          applyPath = applyPath.slice(0, Math.max(applyPath.lastIndexOf(PATH_SEPARATOR), 0));

          const result = Reflect.apply(target, thisArg, argumentsList);

          inApply = false;

          if (changed || (compare && !equals(applyPrevious, thisArg.valueOf()))) {
            handleChange(applyPath, "", applyPrevious, thisArg[proxyTarget] || thisArg);
            applyPrevious = null;
            changed = false;
          }
          return result;
        }
        return Reflect.apply(target, thisArg, argumentsList);
      },
    };

    const handleChange = (path: string, property: string | number | symbol, previous: any, value?: any) => {
      if (isUnsubscribed) {
        return;
      }

      if (!inApply) {
        onChange(ChangeDetector.concatPath(path, property), value, previous);
        return;
      }

      if (inApply && applyPrevious && previous !== undefined && value !== undefined && property !== "length") {
        let item = applyPrevious;

        if (path !== applyPath) {
          path = path.replace(applyPath, "").slice(1);

          ChangeDetector.walkPath(path, (key: string) => {
            item[key] = ChangeDetector.shallowClone(item[key]);
            item = item[key];
          });
        }
        item[property] = previous;
      }
      changed = true;
    };

    const getOwnPropertyDescriptor = (target: any, property: any) => {
      let props = propCache ? propCache.get(target) : undefined;

      if (props) {
        return props;
      }

      props = new Map();
      propCache!.set(target, props);

      let prop = props.get(property);
      if (!prop) {
        prop = Reflect.getOwnPropertyDescriptor(target, property);
        props.set(property, prop);
      }
      return prop;
    };

    const invalidateCachedDescriptor = (target: any, property: any) => {
      const props = propCache ? propCache.get(target) : undefined;

      if (props) {
        props.delete(property);
      }
    };

    const buildProxy = (value: any, path: any) => {
      if (isUnsubscribed) {
        return value;
      }

      pathCache!.set(value, path);

      let proxy = proxyCache!.get(value);

      if (proxy === undefined) {
        proxy = new Proxy(value, handler);
        proxyCache!.set(value, proxy);
      }
      return proxy;
    };

    const unsubscribe = (target: any) => {
      isUnsubscribed = true;
      propCache = null;
      pathCache = null;
      proxyCache = null;
      return target;
    };

    const ignoreChange = (property: string | number | symbol) => {
      return isUnsubscribed || (options.ignoreSymbols === true && typeof property === "symbol");
    };

    if (isPrimitive(object)) {
      st.warn(`You're trying to apply deep change detection on a primitive value. Returning the primitive value instead of a Proxy(value). The onChange handler function will never be called.`);
      return object;
    }

    const proxy = buildProxy(object, "");
    onChange = onChange.bind(proxy);

    return proxy;
  };
}

(<any>ChangeDetector.onChange).target = (proxy: any) => proxy[TARGET] || proxy;
(<any>ChangeDetector.onChange).unsubscribe = (proxy: any) => proxy[UNSUBSCRIBE] || proxy;

if (!st.onChange) {
  st.onChange = ChangeDetector.onChange;
}
